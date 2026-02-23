const dominantColorCache = new Map<string, string>();
const inFlightCache = new Map<string, Promise<string>>();

const TARGET_PIXELS = 4096;
const PIXEL_STEP = 8;
const LIGHTEN_MIX = 0.3;
const MIN_LUMINANCE = 110;

function toLuminance(r: number, g: number, b: number) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function brightenColor(
  r: number,
  g: number,
  b: number,
): [number, number, number] {
  let nr = Math.round(r + (255 - r) * LIGHTEN_MIX);
  let ng = Math.round(g + (255 - g) * LIGHTEN_MIX);
  let nb = Math.round(b + (255 - b) * LIGHTEN_MIX);

  const luminance = toLuminance(nr, ng, nb);
  if (luminance < MIN_LUMINANCE) {
    const boost = MIN_LUMINANCE / Math.max(luminance, 1);
    nr = Math.min(255, Math.round(nr * boost));
    ng = Math.min(255, Math.round(ng * boost));
    nb = Math.min(255, Math.round(nb * boost));
  }

  return [nr, ng, nb];
}

export async function getDominantColor(url: string): Promise<string> {
  const cached = dominantColorCache.get(url);
  if (cached) return cached;

  const inFlight = inFlightCache.get(url);
  if (inFlight) return inFlight;

  const task = (async () => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.src = url;

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Failed to load image"));
    });

    const sourceWidth = img.naturalWidth || img.width;
    const sourceHeight = img.naturalHeight || img.height;
    const ratio = Math.max(
      1,
      Math.sqrt((sourceWidth * sourceHeight) / TARGET_PIXELS),
    );
    const width = Math.max(1, Math.floor(sourceWidth / ratio));
    const height = Math.max(1, Math.floor(sourceHeight / ratio));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) throw new Error("Canvas context not available");

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    const { data } = ctx.getImageData(0, 0, width, height);
    const colorCount = new Map<number, number>();
    let maxCount = 0;
    let dominant = 0xffffff;

    for (let i = 0; i < data.length; i += 4 * PIXEL_STEP) {
      const alpha = data[i + 3];
      if (alpha < 128) continue;

      const r = data[i] >> 3;
      const g = data[i + 1] >> 3;
      const b = data[i + 2] >> 3;
      const key = (r << 10) | (g << 5) | b;

      const count = (colorCount.get(key) ?? 0) + 1;
      colorCount.set(key, count);

      if (count > maxCount) {
        maxCount = count;
        dominant = key;
      }
    }

    const r = ((dominant >> 10) & 31) << 3;
    const g = ((dominant >> 5) & 31) << 3;
    const b = (dominant & 31) << 3;
    const [lr, lg, lb] = brightenColor(r, g, b);

    const result = `${lr},${lg},${lb}`;
    dominantColorCache.set(url, result);
    return result;
  })();

  inFlightCache.set(url, task);
  try {
    return await task;
  } finally {
    inFlightCache.delete(url);
  }
}
