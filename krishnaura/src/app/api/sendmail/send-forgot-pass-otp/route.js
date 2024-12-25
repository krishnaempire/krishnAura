import { Resend } from "resend";
import { NextResponse } from "next/server";
import ForgotPassEmail from "../../../../../emails/ForgotPassEmail";

export const POST = async (req) => {
    const body = await req.json()
    const email = body

    const resend = new Resend(process.env.RESEND_API_KEY);

    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Krishna Aura Password reset',
            react: ForgotPassEmail({otp: verifyCode }),
        });
        return NextResponse.json({ success: true, message: 'Verification email sent successfully.', verifyCode });
    } catch (emailError) {
        console.error('Error sending verification email:', emailError);
        return NextResponse.json({ success: false, message: 'Failed to send verification email.' });
    }
}    

