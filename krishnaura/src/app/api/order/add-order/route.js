import asyncHandler from "express-async-handler";
import Order from "@/models/order.model.js";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/DBConfig/connectDB.js";

connectDB()

export const POST = asyncHandler(async (req) => {
    try {
        const body = await req.json()
        const { userId, productId, orderId, paymentId, address, phoneNumber, color, quantity, postalCode, size, totalPrice } = body;

        console.log("userId:", userId);
        console.log("productId:", productId);
        console.log("orderId:", orderId);
        console.log("paymentId:", paymentId);
        console.log("address:", address);
        console.log("phoneNumber:", phoneNumber);
        console.log("color:", color);
        console.log("quantity:", quantity);
        console.log("postalCode:", postalCode);
        console.log("size:", size);
        console.log("totalPrice:", totalPrice);

        if (!isValidObjectId(userId) || !orderId || !paymentId || !address || !phoneNumber || !color || !quantity || !postalCode || !size || !totalPrice) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 });
        }

        const newOrder = await Order.create({ userId, productId, orderId, paymentId, address, phoneNumber, color, quantity, postalCode, size, price: totalPrice });

        return NextResponse.json(newOrder, { status: 201 });

    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong while adding the order" },
            { status: 500 });
    }
});
