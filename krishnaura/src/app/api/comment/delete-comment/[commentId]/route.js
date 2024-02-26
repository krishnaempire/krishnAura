import asyncHandler from "express-async-handler";
import Comment from "@/models/comment.model.js";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/DBConfig/connectDB.js";

connectDB()

export const DELETE = asyncHandler(async (req, { params }) => {
    try {
        const { commentId } = params;

        // Check if commentId is a valid ObjectId
        if (!isValidObjectId(commentId)) {
            return NextResponse.json({ error: "Please provide a valid commentId" }, { status: 400 });
        }

        // Find the comment by commentId
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return NextResponse.json({ message: "Comment not found" }, { status: 404 });
        }

        // Delete the comment
        await Comment.findByIdAndDelete(commentId);

        return NextResponse.json({ message: "Comment deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong while deleting the comment" }, { status: 500 });
    }
});
