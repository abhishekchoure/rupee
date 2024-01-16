import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { tursoClient } from "@/lib/turso";
import { randomUUID } from "crypto";

const SALT_ROUNDS = 10;

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  let hashedPassword = "";
  let passwordMatches = false;

  // // Check if already authorized from cookie
  // const isAuthorized = request.cookies.get("authorize")?.value;
  // const clientToken = request.cookies.get("token")?.value;

  // if (isAuthorized == "true") {
  //   if (clientToken) {
  //     const queryResult = await tursoClient().execute({
  //       sql: "SELECT user_id,username FROM users where token=?",
  //       args: [clientToken],
  //     });
  //     return NextResponse.json({
  //       message: "Welcome back",
  //       user: {
  //         id: queryResult.rows[0]["user_id"],
  //         username,
  //       },
  //     });
  //   }
  // }

  // Check if username is valid
  try {
    const queryResult = await tursoClient().execute({
      sql: "SELECT password FROM users where username=?",
      args: [username],
    });
    if (queryResult.rows.length === 0) {
      return NextResponse.json({
        message: "Username is invalid",
      });
    }
    hashedPassword = queryResult.rows[0]["password"] as string;
  } catch (error) {
    return NextResponse.error();
  }

  // Check if password is valid
  try {
    passwordMatches = await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.log("COMPARING HASH ERROR : ", error);
    return NextResponse.error();
  }

  console.log(passwordMatches, hashedPassword);

  if (passwordMatches) {
    // Check if username and password pair exists
    const queryResult = await tursoClient().execute({
      sql: "SELECT user_id FROM users where username=?",
      args: [username],
    });

    const user_id = queryResult.rows[0]["user_id"] as string;

    const response = NextResponse.json({
      message: "Login Successfull",
      user: {
        id: user_id,
        username,
      },
    });

    // Setting Cookies
    response.cookies.set("authorize", "true", {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 15,
    });

    const token = randomUUID() as string;
    try {
      const queryResult = await tursoClient().execute({
        sql: "UPDATE users SET token=? WHERE username=?",
        args: [token, username],
      });
      if (queryResult.rowsAffected == 1) {
        // Providing Token in Cookie
        response.cookies.set("token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 60 * 15,
        });
      } else {
        return NextResponse.error();
      }
    } catch (error) {
      return NextResponse.error();
    }

    return response;
  } else {
    return NextResponse.json({
      message: "Passsword is invalid",
    });
  }
}
