export function viewsConvert(views: number) {
  if (views < 10000 && views > 999) {
    return (views / 1000).toFixed(1) + "k";
  }
  if (views < 999999 && views > 999) {
    return Math.floor(views / 1000) + "k";
  }

  if (views < 10000000 && views > 999999) {
    return (views / 1000000).toFixed(1) + "m";
  }

  if (views < 999999999 && views > 999999) {
    return Math.floor(views / 1000000) + "m";
  }

  if (views < 10000000000 && views > 999999999) {
    return (views / 1000000000).toFixed(1) + "b";
  }

  if (views < 999999999999 && views > 999999999) {
    return Math.floor(views / 1000000000) + "b";
  }
  return views;
}
