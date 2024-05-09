import Cart from "@/models/cart.model.js";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/DBConfig/connectDB.js";


export const POST = async (req) => {
    connectDB();
    try {
        const { userId, productId } = await req.json();

        // Check if userId and productId are valid ObjectId
        if (!isValidObjectId(userId) || !isValidObjectId(productId)) {
            return NextResponse.json(
                { error: "Invalid userId or productId." },
                { status: 400 }
            );
        }

        // Check if the item already exists in the cart
        const existingCartItem = await Cart.findOne({ userId, productId });

        if (existingCartItem) {
            return NextResponse.json(
                { message: "Product is already in the cart." },
                { status: 200 }
            );
        }

        // Create a new cart item if it doesn't exist
        const newCartItem = await Cart.create({ userId, productId });

        return NextResponse.json({newCartItem}, { status: 201 });
    } catch (error) {
        console.error("Error adding product to cart:", error);
        return NextResponse.json(
            { error: "Something went wrong while adding the product to the cart." },
            { status: 500 }
        );
    }
};
