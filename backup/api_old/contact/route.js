import { submitContactForm } from "@/services/contact.service";
import { jsonResponse, errorResponse, parseJsonBody } from "@/lib/helpers";

export async function POST(request) {
  const body = await parseJsonBody(request);
  if (!body) return errorResponse("Invalid JSON body.");

  try {
    const submission = await submitContactForm(body);
    return jsonResponse({ success: true, id: submission.id }, { status: 201 });
  } catch (err) {
    return errorResponse(err.message || "Failed to submit contact form.", 400);
  }
}
