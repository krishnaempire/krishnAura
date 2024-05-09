import asyncHandler from "express-async-handler";
import { NextResponse } from "next/server";
import { connectDB } from "@/DBConfig/connectDB.js";
import Order from "@/models/order.model";

connectDB()

export const GET = asyncHandler(async (req) => {
    try {
        const order = await Order.aggregate([
            { $match: {} }
        ]);

        if (!order || order.length === 0) {
            return NextResponse.json(
                { message: "No order found" }, 
                { status: 404 });
        }

        return NextResponse.json(order);
        
    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong while fetching order" }, 
            { status: 500 });
    }
});


