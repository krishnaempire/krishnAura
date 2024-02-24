import { connectDB } from "@/dbConfig/dbConfig.js"
import User from "@/models/user.model.js"
import bcrypt from "bcrypt"
import asyncHandler from "express-async-handler"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

connectDB()
export const POST = asyncHandler(async (req) => {

    try {
        const body = await req.json()

        const { credentials, password } = body

        if (!(credentials || password)) {
            return NextResponse.json(
                { error: "Both fields are required" },
                { status: 400 })
        }

        const user = await User.findOne({
            $or: [{ email: credentials }, { phoneNumber: credentials }]
        })

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const validPassword = await bcrypt.compare(password, user?.password)

        if (!validPassword) {
            return NextResponse.json(
                { error: "Invalid password" },
                { status: 400 })
        }

        const tokenData = {
            _id: user?._id,
            username: user?.username,
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "10d" })

        const response = NextResponse.json({
            message: "Login successfull",
            success: true,
            user
        })

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",  
            maxAge: 10 * 24 * 60 * 60 * 1000
        })

        return response

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }

})