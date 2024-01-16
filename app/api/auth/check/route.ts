import { NextRequest, NextResponse } from "next/server";
import { tursoClient } from "@/lib/turso";

export async function GET(request: NextRequest) {
  const isAuthorized = request.cookies.get("authorize")?.value;
  const clientToken = request.cookies.get("token")?.value;

  if (isAuthorized == "true") {
    if (clientToken && clientToken !== "") {
      const queryResult = await tursoClient().execute({
        sql: "SELECT user_id,username FROM users where token=?",
        args: [clientToken],
      });
      return NextResponse.json({
        message: "Welcome back",
        user: {
          id: queryResult.rows[0]["user_id"],
          username: queryResult.rows[0]["username"],
        },
        authorize: true,
      });
    } else {
      return NextResponse.json({
        message: "You are not authorized",
        authorize: false,
      });
    }
  } else {
    return NextResponse.json({
      message: "You are not authorized",
      authorize: false,
    });
  }
}
