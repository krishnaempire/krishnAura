import { NextResponse } from "next/server";
import { Resend } from "resend";

export const POST = async (req) => {
    const body = await req.json();
    const email = "krishnaempire77@gmail.com";

    const order = body.order;

    const resend = new Resend(process.env.RESEND_API_KEY);

    const formattedOrder = `
        <div>
            <p>Description: ${order.description}</p>
            <p>Name: ${order.name}</p>
            <p>Mobile: ${order.mobile}</p>
        </div>
    `;

    try {
        await resend.emails.send({
            from: 'krishnaura@krishnaaura.com',
            to: email,
            subject: "Order Details",
            html: `<div>${formattedOrder}</div>` 
        });
        return NextResponse.json({ message: "Order sent" }, { status: 200 });

    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: "Something went wrong while sending order" }, { status: 500 });
    }
};
