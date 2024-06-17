import Order from "@/models/order.model.js";
import Product from "@/models/product.model.js"; 
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/DBConfig/connectDB.js";

export const GET = async (req, { params }) => {
    connectDB();
    
    try {
        const { orderId } = params;

        if (!isValidObjectId(orderId)) {
            return NextResponse.json({ error: "Please provide a valid orderId" }, { status: 400 });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        const productIds = order.productId;

        if (!productIds || productIds.length === 0) {
            return NextResponse.json({ error: "No products found in the order" }, { status: 404 });
        }

        const products = await Product.find({ _id: { $in: productIds } });

        if (!products || products.length === 0) {
            return NextResponse.json({ error: "No products found for the given productIds" }, { status: 404 });
        }

        const reversedProducts = products.reverse();

        const orderWithProducts = {
            ...order.toObject(),
            products: reversedProducts,
        };

        return NextResponse.json(orderWithProducts, { status: 200 });

    } catch (error) {
        console.error("Error fetching order:", error.message);
        return NextResponse.json({ error: "Something went wrong while fetching the order" }, { status: 500 });
    }
};
