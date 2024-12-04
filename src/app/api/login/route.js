import { NextResponse } from "next/server";
import userModel from "../../../../libs/database/models/userModel";
import dbConnect from "../../../../libs/database/dbconnect";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

// To handle a GET request to /api
export async function GET(request) {
  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

// To handle a POST request to /api
export async function POST(req) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    // Parameter validation
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        {
          status: false,
          message: "Please provide a valid email address",
        },
        { status: 400 }
      );
    }

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        {
          status: false,
          message: "Please provide a valid password",
        },
        { status: 400 }
      );
    }

    const user = await userModel.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });

    if (!user) {
      return NextResponse.json(
        {
          status: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        {
          status: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.SECRET_KEY
    );

    (await cookies()).set("token", token);
    return NextResponse.json(
      {
        status: true,
        message: "Login successful",
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        message: "An error occurred while logging in",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
