import expressAsyncHandler from "express-async-handler";
import { NextResponse } from 'next/server';
import { createHmac } from 'crypto';


export const POST = expressAsyncHandler(async (req) => {

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, userId, productId } = await req.json();

    const secret = process.env.RAZOR_KEY_SECRET;
    const generated_signature = createHmac('sha256', secret)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest('hex');

    if (generated_signature === razorpay_signature) {

        const orderData = {
            userId: userId,
            productId: productId,
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id
        };

        return NextResponse.json({ message: "Payment is successful", orderData }, { status: 200 });

    } else {
        console.log("Payment signature verification failed");
        return NextResponse.json({ error: "Payment signature verification failed" }, { status: 400 });
    }
});
