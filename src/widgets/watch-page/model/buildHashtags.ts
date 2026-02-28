function normalizeTag(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-zа-я0-9]+/gi, "")
    .slice(0, 18);
}

export function buildHashtags(title: string, author: string) {
  const titleTag = normalizeTag(title.split(" ").slice(0, 2).join(""));
  const authorTag = normalizeTag(author);

  return [`#youtube`, `#watch`, `#${authorTag || "creator"}`, `#${titleTag || "video"}`];
}
