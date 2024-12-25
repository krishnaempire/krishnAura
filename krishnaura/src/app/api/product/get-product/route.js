import Product from "@/models/product.model.js";
import { NextResponse } from "next/server";
import { connectDB } from "@/DBConfig/connectDB.js";

export const GET = async (req) => {
    connectDB()
    try {
        const url = new URL(req.url);
        const page = parseInt(url.searchParams.get('page')) || 1;
        const limit = 3;
        
        const skip = (page - 1) * limit;

        const products = await Product.aggregate([
            { $skip: skip },
            { $limit: limit }
        ]);

        const totalOrders = await Product.countDocuments({});
        const totalPages = Math.ceil(totalOrders / limit);
        
        return NextResponse.json({
            products,
            pagination: {
                totalOrders,
                totalPages,
                currentPage: page,
                pageSize: limit
            }
        });

        
    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong while fetching products" }, 
            { status: 500 });
    }
};
