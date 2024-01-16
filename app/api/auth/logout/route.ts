import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  cookies().set("token", "");
  cookies().set("authorize", "false");
  return NextResponse.json({
    message: "Logged out",
    authorize: false,
  });
}
