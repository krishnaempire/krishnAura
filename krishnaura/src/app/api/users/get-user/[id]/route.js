import { connectDB } from "@/DBConfig/connectDB.js";
import User from "@/models/user.model.js";
import asyncHandler from "express-async-handler";
import { NextResponse } from "next/server";

connectDB()

export const GET = asyncHandler(async (req, { params }) => {
    const { id } = params;
    
    if (!id) {
        return NextResponse.json(
            {error: "id not given"},
            {status: 400})
    }

    const user = await User.findById(id).select("-password -updatedAt -createdAt -verifyTokenExpiry -verifyToken")

    if (!user) {
        return NextResponse.json(
            {error: `no user found by username ${fullName}`})
    }

    return NextResponse.json(user)
});