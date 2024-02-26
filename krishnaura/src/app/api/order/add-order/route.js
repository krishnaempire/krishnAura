import asyncHandler from "express-async-handler";
import Order from "@/models/order.model.js";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/DBConfig/connectDB.js";

connectDB()

export const POST = asyncHandler(async (req) => {
    try {
        const body = await req.json()
        const { userId, productId } = body;

        if (!isValidObjectId(userId) || !isValidObjectId(productId)) {
            return NextResponse.json(
                { error: "Please provide valid userId and productId" }, 
                { status: 400 });
        }

        const newOrder = await Order.create({ userId, productId });

        return NextResponse.json(newOrder, { status: 201 });

    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong while adding the order" }, 
            { status: 500 });
    }
});
