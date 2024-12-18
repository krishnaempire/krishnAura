import asyncHandler from "express-async-handler";
import Product from "@/models/product.model.js";
import { NextResponse } from "next/server";
import { connectDB } from "@/DBConfig/connectDB.js";

connectDB()

export const GET = async (req) => {
    try {
        const url = new URL(req.url);
        const page = parseInt(url.searchParams.get('page')) || 1;
        const limit = 3;
        
        const skip = (page - 1) * limit;

        const products = await Product.aggregate([
            { $skip: skip },
            { $limit: limit }
        ]);


        if (!products || products.length === 0) {
            return NextResponse.json(
                { message: "No products found" }, 
                { status: 404 });
        }

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
