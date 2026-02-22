export async function getDominantColor(url: string): Promise<string> {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = url;

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Failed to load image"));
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context not available");

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const colorCount: Record<string, number> = {};
  let maxCount = 0;
  let dominant: [number, number, number] = [0, 0, 0];

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i],
      g = data[i + 1],
      b = data[i + 2];
    const key = `${r},${g},${b}`;
    const count = (colorCount[key] ?? 0) + 1;
    colorCount[key] = count;
    if (count > maxCount) {
      maxCount = count;
      dominant = [r, g, b];
    }
  }

  let [r, g, b] = dominant;
  if (r === 0 && g === 0 && b === 0) r = g = b = 255; // если черный

  return `${r},${g},${b}`; // формат для CSS переменной
}
