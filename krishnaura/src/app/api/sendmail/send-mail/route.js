const { NextResponse } = require("next/server")
import { transporter } from "@/utils/nodemailer.js"

export const POST = async (req) => {
    const body = await req.json()
    const email = body

    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        await transporter.sendMail({
            from: `KRISHNA EMPIRE <${process.env.MAIL}>`,
            to: email,
            subject: "OTP for signup",
            html: `<h1>${verifyCode}</h1>`
        })
        return NextResponse.json({message: "OTP sent", verifyCode}, {status: 200})

    } catch (error) {
        console.log(error.message)
        return NextResponse.json({message: "Something went wrong while sending otp"}, {status: 200})
    }
    
}
