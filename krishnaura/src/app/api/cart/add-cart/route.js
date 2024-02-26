import asyncHandler from "express-async-handler";
import Cart from "@/models/cart.model.js";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/DBConfig/connectDB.js";

connectDB()

export const POST = asyncHandler(async (req ) => {
    try {
        const { userId, productId } = await req.json();

        // Check if userId and productId are valid ObjectId
        if (!isValidObjectId(userId) || !isValidObjectId(productId)) {
            return NextResponse.json({ error: "Please provide valid userId and productId" }, { status: 400 });
        }

        // Create a new cart item
        const newCartItem = await Cart.create({ userId, productId });

        return NextResponse.json(newCartItem, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong while adding the product to the cart" }, { status: 500 });
    }
});
