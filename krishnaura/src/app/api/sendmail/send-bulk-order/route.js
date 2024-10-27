const { NextResponse } = require("next/server");
import { transporter } from "@/utils/nodemailer.js";

export const POST = async (req) => {
    const body = await req.json();
    const email = "krishnaempire77@gmail.com";

    const order = body.order;

    const formattedOrder = `
        <div>
            <p>Description: ${order.description}</p>
            <p>Name: ${order.name}</p>
            <p>Mobile: ${order.mobile}</p>
        </div>
    `;

    try {
        await transporter.sendMail({
            from: `KRISHNA EMPIRE <${process.env.MAIL}>`,
            to: email,
            subject: "Order Details",
            html: `<div>${formattedOrder}</div>` // Insert formatted order
        });
        return NextResponse.json({ message: "Order sent" }, { status: 200 });

    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: "Something went wrong while sending order" }, { status: 500 });
    }
};
