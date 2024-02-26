import asyncHandler from "express-async-handler";
import Product from "@/models/product.model.js";
import { NextResponse } from "next/server";
import { connectDB } from "@/DBConfig/connectDB.js";

connectDB()

export const GET = asyncHandler(async (req) => {
    try {
        const products = await Product.aggregate([
            { $match: {} }
        ]);

        if (!products || products.length === 0) {
            return NextResponse.json(
                { message: "No products found" }, 
                { status: 404 });
        }

        return NextResponse.json(products);
        
    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong while fetching products" }, 
            { status: 500 });
    }
});
