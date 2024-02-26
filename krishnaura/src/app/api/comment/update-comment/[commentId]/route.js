import asyncHandler from "express-async-handler";
import Comment from "@/models/comment.model.js";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/DBConfig/connectDB.js";

connectDB()

export const PATCH = asyncHandler(async (req, { params }) => {
    try {
        const { commentId } = params;
        const { content, rating } = await req.json();



        // Check if commentId is a valid ObjectId
        if (!isValidObjectId(commentId)) {
            return NextResponse.json({ error: "Please provide a valid commentId" }, { status: 400 });
        }

        // // Find the comment by commentId
        let comment = await Comment.findById(commentId);

        if (!comment) {
            return NextResponse.json({ message: "Comment not found" }, { status: 404 });
        }

        const updateValue = {}

        if (content) {
            updateValue.content = content
        }
        if (rating) {
            updateValue.rating = rating
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            updateValue,
            { new: true }
        )

        if (!updatedComment) {
            return NextResponse.json(
                { message: "Something went wrong while updating the comment" },
                { status: 500 }
            )
        }

        return NextResponse.json(updatedComment);
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong while updating the comment" }, { status: 500 });
    }
});
