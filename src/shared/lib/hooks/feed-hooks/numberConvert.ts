export function numberConvert(views: number) {
  if (views < 10000 && views > 1000) {
    return (views / 1000).toFixed(0) + "k";
  }
  if (views < 999999 && views > 1000) {
    return Math.floor(views / 1000) + "k";
  }

  if (views < 10000000 && views > 999999) {
    return (views / 1000000).toFixed(0) + "m";
  }

  if (views < 999999999 && views > 999999) {
    return Math.floor(views / 1000000) + "m";
  }

  if (views < 10000000000 && views > 999999999) {
    return (views / 1000000000).toFixed(0) + "b";
  }

  if (views < 999999999999 && views > 999999999) {
    return Math.floor(views / 1000000000) + "b";
  }
  return views;
}
