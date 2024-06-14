import { NextResponse } from 'next/server';
import { connectDB } from '@/DBConfig/connectDB.js';
import Order from '@/models/order.model.js';
import { isValidObjectId } from 'mongoose';

export const POST = async (req) => {
    try {
        await connectDB();
        
        const body = await req.json();
        
        const { userId, productId, orderId, paymentId, address, phoneNumber, color, quantity, pinCode, size, paymentType, totalPrice } = body;

        if (!isValidObjectId(userId) || !orderId || !address || !phoneNumber || !color || !quantity || !pinCode || !size || !totalPrice || !paymentType) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        const newOrder = await Order.create({
            userId,
            productId,
            orderId,
            paymentId: paymentId || "None",
            address,
            phoneNumber,
            color,
            quantity,
            pinCode,
            size,
            price: totalPrice,
            paymentType
        });

        return NextResponse.json(newOrder, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Something went wrong while adding the order" },
            { status: 500 }
        );
    }
};
