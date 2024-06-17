import Order from "@/models/order.model.js";
import { NextResponse } from "next/server";
import { connectDB } from "@/DBConfig/connectDB.js";

export const GET = async (req) => {
    connectDB();
    try {
        const url = new URL(req.url);
        const page = parseInt(url.searchParams.get('page')) || 1;
        const limit = 4;

        const skip = (page - 1) * limit;

        const orders = await Order.aggregate([
            { $match: {} },
            { $skip: skip },
            { $limit: limit }
        ]);

        if (!orders || orders.length === 0) {
            return NextResponse.json(
                { message: "No orders found" },
                { status: 404 }
            );
        }

        const totalOrders = await Order.countDocuments({});
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
        return NextResponse.json(
            { error: "Something went wrong while fetching orders" },
            { status: 500 }
        );
    }
};
