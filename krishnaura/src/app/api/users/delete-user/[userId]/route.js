import asyncHandler from "express-async-handler";
import User from "@/models/user.model.js";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/DBConfig/connectDB.js";

connectDB()

export const DELETE = asyncHandler(async (req, { params }) => {
    try {
        const { userId } = params;

        // Check if userId is a valid ObjectId
        if (!isValidObjectId(userId)) {
            return NextResponse.json({ error: "Please provide a valid userId" }, { status: 400 });
        }

        // Find the user by userId
        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Delete the user
        await User.findByIdAndDelete(userId);

        return NextResponse.json({ message: "User deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong while deleting the user" }, { status: 500 });
    }
});
