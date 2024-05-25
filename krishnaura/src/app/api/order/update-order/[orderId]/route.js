import asyncHandler from "express-async-handler";
import Order from "@/models/order.model.js";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/DBConfig/connectDB.js";


export const PATCH = asyncHandler(async (req, { params }) => {
    connectDB();
    try {
        const { orderId } = params;

        if (!isValidObjectId(orderId)) {
            return NextResponse.json({ error: "Please provide a valid orderId" }, { status: 400 });
        }

        const order = await Order.findOne({ _id: orderId });

        if (!order) {
            return NextResponse.json({ error: "No order found for the orderId" }, { status: 404 });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { isDone: !order.isDone },
            { new: true }
        );

        if (!updatedOrder) {
            return NextResponse.json({ error: "Failed to update the order" }, { status: 404 });
        }

        return NextResponse.json({ success: true, updatedOrder }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong while updating the order" }, { status: 500 });
    }
});
