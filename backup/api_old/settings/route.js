import { jsonResponse, errorResponse, parseJsonBody } from "@/lib/helpers";

// TODO: back this with a real Settings model once dashboard/settings is built.
const settings = { siteName: "Imagenie" };

export async function GET() {
  return jsonResponse({ settings });
}

export async function PATCH(request) {
  const body = await parseJsonBody(request);
  if (!body) return errorResponse("Invalid JSON body.");
  return errorResponse("Settings persistence is not implemented yet.", 501);
}
