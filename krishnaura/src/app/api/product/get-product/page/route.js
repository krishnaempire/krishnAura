import Product from "@/models/product.model.js";
import { NextResponse } from "next/server";
import { connectDB } from "@/DBConfig/connectDB.js";


export const GET = async (req) => {
    connectDB();
    try {
        
        const url = new URL(req.url);
        const page = parseInt(url.searchParams.get('page')) || 1;
        const limit = parseInt(url.searchParams.get('limit')) || 5;

        
        const skip = (page - 1) * limit;

        const products = await Product.aggregate([
            { $match: {} },
            { $skip: skip },
            { $limit: limit }
        ]);

        if (!products || products.length === 0) {
            return NextResponse.json(
                { message: "No products found" }, 
                { status: 404 }
            );
        }

        
        const totalProducts = await Product.countDocuments({});
        const totalPages = Math.ceil(totalProducts / limit);

        return NextResponse.json({
            products,
            pagination: {
                totalProducts,
                totalPages,
                currentPage: page,
                pageSize: limit
            }
        });
        
    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong while fetching products" }, 
            { status: 500 }
        );
    }
};
