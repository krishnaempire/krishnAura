import { NextResponse } from "next/server";
import { connectDB } from "@/DBConfig/connectDB.js";
import Order from "@/models/order.model";

export const GET = async (req) => {
    connectDB();
    try {
        const order = await Order.find({});

        if (!order || order.length === 0) {
            return NextResponse.json(
                { message: "No order found" }, 
                { status: 404 }
            );
        }

        return NextResponse.json(order);

    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong while fetching order" }, 
            { status: 500 }
        );
    }
};
