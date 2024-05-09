import { instance } from "@/utils/razorpay.js";
import expressAsyncHandler from "express-async-handler";
import { NextResponse } from 'next/server';

export const POST = expressAsyncHandler(async (req) => {
    const { totalPrice } = await req.json()
    try {
        var options = {
            amount: Number(totalPrice * 100),
            currency: "INR"
        };
        const order = await instance.orders.create(options);
        
        return NextResponse.json(order, {status: 201})
    } catch (error) {
        return NextResponse.json({ error: "Failed to create order" });
    }
});
