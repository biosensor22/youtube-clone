export function extractYouTubeId(thumbnail: string) {
  const match = thumbnail.match(/\/vi(?:_webp)?\/([^/]+)/i);
  return match ? match[1] : null;
}
