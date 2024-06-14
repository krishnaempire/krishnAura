import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import { NextResponse } from "next/server";
import User from "@/models/user.model.js";
import { connectDB } from "@/DBConfig/connectDB";
import jwt from "jsonwebtoken"

connectDB()

export const POST = asyncHandler(async (req) => {
    const body = await req.json()
    const { firstName, lastName, phoneNumber, email, password } = body;

    // Check if any required field is missing or empty
    if (![firstName, lastName, phoneNumber, email, password].every(Boolean)) {
        return NextResponse.json(
            { error: "All fields are required" },
            { status: 400 }
        );
    }

    const checkUser = await User.findOne({
        $or : [{ email: email}, { phoneNumber: phoneNumber}]
    })

    if (checkUser) {
        return NextResponse.json(
            {error: "user with these details already exist"},
            {status: 400})
    }

    // Validate email format
    const gmailRegex = /@gmail\.com$/;
    if (!gmailRegex.test(email)) {
        return NextResponse.json({ error: "Please enter a valid Gmail address" }, { status: 400 });
    }

    try {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: hashedPassword,
        });

        const tokenData = {
            _id: newUser?._id,
            fullName: newUser?.fullName,
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "10d" })

        const response = NextResponse.json({
            message: "Signup successfull",
            success: true,
            newUser
        })

        response.cookies.set("token", token, {
            httpOnly: true,
            // secure: true,
            sameSite: "Strict",  
            maxAge: 10 * 24 * 60 * 60 * 1000
        })

        return response

    

    } catch (error) {
        return NextResponse.json(
            { error: error.message || "Something went wrong while creating user" },
            { status: 500 }
        );
    }
});


