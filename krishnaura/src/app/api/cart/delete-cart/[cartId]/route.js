import asyncHandler from "express-async-handler";
import Cart from "@/models/cart.model.js";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/DBConfig/connectDB.js";

connectDB()

export const DELETE = asyncHandler(async (req, { params }) => {
    try {
        const { cartId } = params;
        console.log(cartId)
        // Check if cartItemId is a valid ObjectId
        if (!isValidObjectId(cartId)) {
            return NextResponse.json({ error: "Please provide a valid cartItemId" }, { status: 400 });
        }

        // Find the cart item by cartItemId
        const cartItem = await Cart.findById(cartId);
        
        if (!cartItem) {
            return NextResponse.json({ message: "Cart item not found" }, { status: 404 });
        }
        
        // Delete the cart item
        await Cart.findByIdAndDelete(cartId);

        return NextResponse.json({ message: "Cart item deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong while deleting the cart item" }, { status: 500 });
    }
});
