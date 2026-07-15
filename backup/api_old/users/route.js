import { getAllUsers, registerUser } from "@/services/user.service";
import { jsonResponse, errorResponse, parseJsonBody } from "@/lib/helpers";

export async function GET() {
  // TODO: gate behind requireUser()/admin role check once auth exists.
  const users = await getAllUsers();
  return jsonResponse({ users });
}

export async function POST(request) {
  const body = await parseJsonBody(request);
  if (!body) return errorResponse("Invalid JSON body.");
  try {
    const user = await registerUser(body);
    return jsonResponse({ user }, { status: 201 });
  } catch (err) {
    return errorResponse(err.message || "Failed to create user.", 400);
  }
}
