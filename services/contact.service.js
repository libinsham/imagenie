import { createContactSubmission } from "@/repositories/contact.repository";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContactForm(payload) {
  const { fullName, email, company, service, message } = payload || {};

  if (!fullName || !email || !message) {
    throw new Error("fullName, email, and message are required.");
  }
  if (!EMAIL_RE.test(email)) {
    throw new Error("Invalid email address.");
  }

  return createContactSubmission({
    fullName,
    email,
    company: company || null,
    service: service || null,
    message,
  });
}
