import Cart from "@/models/cart.model.js";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/DBConfig/connectDB.js";

export const POST = async (req) => {
    connectDB();
    try {
        const { userId, productId, selectedSize, selectedColor, quantity } = await req.json();
        console.log(selectedColor, selectedSize)
        if (!isValidObjectId(userId) || !isValidObjectId(productId)) {
            return NextResponse.json(
                { error: "Invalid userId or productId." },
                { status: 400 }
            );
        }

        const cartItemData = { userId, productId };
        if (selectedSize) cartItemData.selectedSize = selectedSize;
        if (selectedColor) cartItemData.selectedColor = selectedColor;
        if (quantity) cartItemData.quantity = quantity;

        const newCartItem = await Cart.create(cartItemData);
        
        return NextResponse.json({ newCartItem }, { status: 201 });
    } catch (error) {
        console.error("Error adding product to cart:", error);
        return NextResponse.json(
            { error: "Something went wrong while adding the product to the cart." },
            { status: 500 }
        );
    }
};
