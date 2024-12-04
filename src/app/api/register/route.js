"use server";
import { NextResponse } from "next/server";
import userModel from "../../../../libs/database/models/userModel";
import dbConnect from "../../../../libs/database/dbconnect";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(request) {
  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

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

    if (!password || typeof password !== "string" || password.length < 6) {
      return NextResponse.json(
        {
          status: false,
          message: "Password must be at least 6 characters long",
        },
        { status: 400 }
      );
    }

    const existingUser = await userModel.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });
    if (existingUser) {
      return NextResponse.json({
        status: false,
        message: "Email already exists",
      });
    }

    const newuser = new userModel({
      email,
      password,
      role: "ADMIN",
    });
    await newuser.save();
    const token = jwt.sign(
      { _id: newuser._id, role: "ADMIN" },
      process.env.SECRET_KEY
    );
    (await cookies()).set("token", token);
    return NextResponse.json(
      {
        status: true,
        message: "User created successfully",
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        message: "An error occurred while registering user",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
