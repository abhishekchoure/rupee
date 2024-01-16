import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { tursoClient } from "@/lib/turso";
import { randomUUID } from "crypto";

const SALT_ROUNDS = 10;

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  // check if user already exists
  try {
    const queryResult = await tursoClient().execute({
      sql: "SELECT username FROM users where username=?",
      args: [username],
    });

    if (queryResult.rows.length == 1) {
      return NextResponse.json({
        message: "Username already exists !",
      });
    }
  } catch (error) {
    console.log("USER ALREADY EXIST QUERY ERROR :", error);
    return NextResponse.json({
      error,
    });
  }
  const userID = randomUUID();
  let hashedPassword = "";

  // Hash Password
  try {
    hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  } catch (error) {
    console.log("HASHING ERROR :", error);
    return NextResponse.json({
      error,
    });
  }

  // Register User into users table
  try {
    const insertQueryResult = await tursoClient().execute({
      sql: "INSERT INTO users (user_id, username, password) values (?,?,?)",
      args: [userID, username, hashedPassword],
    });

    if (insertQueryResult.rowsAffected == 1) {
      return NextResponse.json({
        message: "Your registeration is successful",
        user: {
          id: userID,
          username,
        },
      });
    }
  } catch (error) {
    console.log("INSERT USER QUERY ERROR : ", error);
    return NextResponse.json({
      error,
    });
  }
}
