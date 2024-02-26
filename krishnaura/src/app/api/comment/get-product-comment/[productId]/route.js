import asyncHandler from "express-async-handler";
import Comment from "@/models/comment.model.js";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/DBConfig/connectDB.js";

connectDB()
export const GET = asyncHandler(async (req, { params }) => {
    try {
        const { productId } = params;

        // Check if productId is a valid ObjectId
        if (!isValidObjectId(productId)) {
            return NextResponse.json(
                { error: "Please provide a valid productId" }, 
                { status: 400 });
        }

        // Find comments by productId
        const comments = await Comment.find({ productId });

        if (!comments || comments.length === 0) {
            return NextResponse.json(
                { message: "No comments found for the product" }, 
                { status: 404 });
        }

        return NextResponse.json(comments);

    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong while fetching product comments" }, 
            { status: 500 });
    }
});
