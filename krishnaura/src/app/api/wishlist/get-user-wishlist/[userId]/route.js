import asyncHandler from "express-async-handler";
import Wishlist from "@/models/wishlist.model.js";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/DBConfig/connectDB.js";

connectDB()

export const GET = asyncHandler(async (req, { params }) => {
    try {
        const { userId } = params;

        // Check if userId is a valid ObjectId
        if (!isValidObjectId(userId)) {
            return NextResponse.json({ error: "Please provide a valid userId" }, { status: 400 });
        }

        // Find wishlist items by userId
        const wishlistItems = await Wishlist.find({ userId });

        if (!wishlistItems || wishlistItems.length === 0) {
            return NextResponse.json({ message: "No wishlist items found for the user" }, { status: 404 });
        }

        return NextResponse.json(wishlistItems);
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong while fetching user wishlist" }, { status: 500 });
    }
});
