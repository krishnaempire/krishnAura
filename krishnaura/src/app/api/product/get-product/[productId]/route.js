import asyncHandler from "express-async-handler";
import Product from "@/models/product.model.js";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export const GET = asyncHandler(async (req, { params }) => {
    try {
        const { productId } = params;

        if (!isValidObjectId(productId)) {
            return NextResponse.json(
                { error: "Please provide a valid productId" }, 
                { status: 400 });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return NextResponse.json(
                { error: "Product not found" }, 
                { status: 404 });
        }

        return NextResponse.json(product);
        
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong while fetching the product" }, { status: 500 });
    }
});
