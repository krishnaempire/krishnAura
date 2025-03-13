import { Resend } from "resend"
import VerificationEmail from "../../../../../emails/VerificationEmail"
import { NextResponse } from "next/server"

export const POST = async (req) => {
    const body = await req.json()
    const email = body

    const resend = new Resend(process.env.RESEND_API_KEY);

    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        await resend.emails.send({
            from: 'krishnaura@krishnaaura.com',
            to: email,
            subject: "OTP for signup",
            react: VerificationEmail({otp: verifyCode })
        })
        return NextResponse.json({message: "OTP sent", verifyCode}, {status: 200})

    } catch (error) {
        console.log(error.message)
        return NextResponse.json({message: "Something went wrong while sending otp"}, {status: 200})
    }
    
}
