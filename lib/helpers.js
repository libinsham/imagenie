/**
 * Small cross-cutting helpers that don't belong to a specific domain.
 * Domain-specific formatting/validation lives in utils/ instead.
 */

export function jsonResponse(data, init = {}) {
  return Response.json(data, init);
}

export function errorResponse(message, status = 400) {
  return Response.json({ error: message }, { status });
}

export async function parseJsonBody(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}
