const { NextResponse } = require("next/server")
import { transporter } from "@/utils/nodemailer.js"
import otpGenerator from "otp-generator"

export const POST = async (req) => {
    const body = await req.json()
    const email = body

    const otp = otpGenerator.generate(4, { digits: true });

    try {
        await transporter.sendMail({
            from: `KRISHNA EMPIRE <${process.env.MAIL}>`,
            to: email,
            subject: "OTP for signup",
            html: `<h1>${otp}</h1>`
        })
        return NextResponse.json({message: "OTP sent", otp}, {status: 200})

    } catch (error) {
        console.log(error.message)
        return NextResponse.json({message: "Something went wrong while sending otp"}, {status: 200})
    }
    
}
