import asyncHandler from "express-async-handler";
import Wishlist from "@/models/wishlist.model.js";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/DBConfig/connectDB.js";


export const POST = asyncHandler(async (req) => {
    connectDB()
    try {
        const { userId, productId } = await req.json();

        if (!isValidObjectId(userId) || !isValidObjectId(productId)) {
            return NextResponse.json({ error: "Please provide valid userId and productId" }, { status: 400 });
        }

        const newWishlistItem = await Wishlist.create({ userId, productId });

        return NextResponse.json(newWishlistItem, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: "Something went wrong while adding the product to the wishlist" }, { status: 500 });
    }
});
