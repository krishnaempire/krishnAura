import asyncHandler from "express-async-handler";
import Comment from "@/models/comment.model.js";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/DBConfig/connectDB.js";

export const GET = asyncHandler(async (req, { params }) => {
    connectDB()
    try {
        const { userId } = params;

        // Check if userId is a valid ObjectId
        if (!isValidObjectId(userId)) {
            return NextResponse.json(
                { error: "Please provide a valid userId" }, 
                { status: 400 });
        }

        // Find comments by userId
        const comments = await Comment.find({ userId });

        if (!comments || comments.length === 0) {
            return NextResponse.json(
                { message: "No comments found for the user" }, 
                { status: 404 });
        }

        return NextResponse.json(comments);

    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong while fetching user comments" }, 
            { status: 500 });
    }
});
