import asyncHandler from "express-async-handler";
import Order from "@/models/order.model.js";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/DBConfig/connectDB.js";


export const GET = asyncHandler(async (req, { params }) => {
    connectDB()
    try {
        const { userId } = params;

        if (!isValidObjectId(userId)) {
            return NextResponse.json({ error: "Please provide a valid userId" }, { status: 400 });
        }

        const orders = await Order.find({ userId });

        if (!orders || orders.length === 0) {
            return NextResponse.json({ message: "No orders found for the user" }, { status: 404 });
        }

        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong while fetching user orders" }, { status: 500 });
    }
});
