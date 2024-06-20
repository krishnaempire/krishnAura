import mongoose, { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/DBConfig/connectDB.js";
import Order from "@/models/order.model";

export const GET = async (req, { params }) => {
    await connectDB(); // Ensure connection is awaited

    try {
        const { userId } = params;
        const url = new URL(req.url);
        const page = parseInt(url.searchParams.get('page')) || 1;
        const limit = 1;
        const skip = (page - 1) * limit;

        if (!isValidObjectId(userId)) {
            return NextResponse.json({ error: "Please provide a valid userId" }, { status: 400 });
        }

        const userObjectId = new mongoose.Types.ObjectId(userId)

        const orders = await Order.aggregate([
            { $match: { userId: userObjectId } },
            { $skip: skip },
            { $limit: limit }
        ]);

        if (!orders || orders.length === 0) {
            return NextResponse.json({ message: "No orders found for the user" }, { status: 404 });
        }

        // Count total orders for the user
        const totalOrders = await Order.countDocuments({ userId: userObjectId });
        const totalPages = Math.ceil(totalOrders / limit);

        return NextResponse.json({
            orders,
            pagination: {
                totalOrders,
                totalPages,
                currentPage: page,
                pageSize: limit
            }
        });

    } catch (error) {
        console.error("Error fetching user orders:", error); // Improved logging
        return NextResponse.json({ error: "Something went wrong while fetching user orders" }, { status: 500 });
    }
};
