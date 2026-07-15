export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value) {
  return typeof value === "string" && EMAIL_RE.test(value);
}

export function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}
