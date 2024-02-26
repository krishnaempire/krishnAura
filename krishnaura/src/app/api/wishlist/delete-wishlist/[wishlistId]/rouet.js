import asyncHandler from "express-async-handler";
import Wishlist from "@/models/wishlist.model.js";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/DBConfig/connectDB.js";

connectDB()

export const DELETE = asyncHandler(async (req, { params }) => {
    try {
        const { wishlistId } = params;

        // Check if wishlistId is a valid ObjectId
        if (!isValidObjectId(wishlistId)) {
            return NextResponse.json({ error: "Please provide a valid wishlistId" }, { status: 400 });
        }

        // Find the wishlist item by wishlistId
        const wishlistItem = await Wishlist.findById(wishlistId);

        if (!wishlistItem) {
            return NextResponse.json({ message: "Wishlist item not found" }, { status: 404 });
        }

        // Delete the wishlist item
        await Wishlist.findByIdAndDelete(wishlistId);

        return NextResponse.json({ message: "Wishlist item deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong while deleting the wishlist item" }, { status: 500 });
    }
});
