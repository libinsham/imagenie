export function formatDate(date, locale = "en-US") {
  const d = date instanceof Date ? date : new Date(date);
  return d.toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });
}

export function truncate(text, maxLength = 140) {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}
