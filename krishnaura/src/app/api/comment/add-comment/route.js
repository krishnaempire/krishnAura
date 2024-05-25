import asyncHandler from "express-async-handler";
import Comment from "@/models/comment.model.js";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import Product from "@/models/product.model.js";
import User from "@/models/user.model.js";
import Order from "@/models/order.model.js";
import { connectDB } from "@/DBConfig/connectDB.js";


export const POST = asyncHandler(async (req) => {
    connectDB()
    try {
        const body = await req.json();
        const { userId, productId, content, rating } = body;

        if (!isValidObjectId(userId) || !isValidObjectId(productId)) {
            return NextResponse.json(
                { error: "Please provide valid userId and productId" },
                { status: 400 });
        }

        if(!content){
            return NextResponse.json(
                {error: "content can not be empty"},
                {status: 400})
        }

        const user = await User.findById(userId);
        const product = await Product.findById(productId);

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 });
        }
        if (!product) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 });
        }

        const isOrder = await Order.findOne({userId: userId}) 

        if (!isOrder) {
            return NextResponse.json(
                {error: "You did not bought the product"})
        }
        
        const newComment = await Comment.create({
            userId,
            productId,
            content,
            rating
        });

        return NextResponse.json(newComment, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong while adding the comment" }, { status: 500 });
    }
});
