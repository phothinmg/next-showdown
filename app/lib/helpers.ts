export function formatDate(date?: string) {
  const dts = date ?? Date.now();
  return new Date(dts).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    weekday: "short",
  });
}

export function decodeHtml(encodedString: string) {
  var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
  var translate: Record<string, string> = {
    nbsp: " ",
    amp: "&",
    quot: '"',
    lt: "<",
    gt: ">",
  };
  return encodedString
    .replace(translate_re, function (match, entity: string) {
      return translate[entity];
    })
    .replace(/&#(\d+);/gi, function (match, numStr) {
      var num = parseInt(numStr, 10);
      return String.fromCharCode(num);
    });
}
