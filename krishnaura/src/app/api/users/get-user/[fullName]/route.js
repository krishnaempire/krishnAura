import { connectDB } from "@/DBConfig/connectDB.js";
import User from "@/models/user.model.js";
import asyncHandler from "express-async-handler";
import { NextResponse } from "next/server";

connectDB()

export const GET = asyncHandler(async (req, { params }) => {
    const { fullName } = params;
    
    if (!fullName) {
        return NextResponse.json(
            {error: "Username not given"},
            {status: 400})
    }

    const user = await User.findOne({ fullName: fullName }).select("-password -updatedAt -createdAt -verifyTokenExpiry -verifyToken")

    if (!user) {
        return NextResponse.json(
            {error: `no user found by username ${fullName}`})
    }

    return NextResponse.json(user)
});