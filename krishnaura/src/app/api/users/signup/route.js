import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import { NextResponse } from "next/server";
import User from "@/models/user.model.js";
import { connectDB } from "@/DBConfig/connectDB";

connectDB()

export const GET = asyncHandler(async (req) => {
    const body = await req.json()
    console.log(body)
    const { fullName, phoneNumber, email, password } = body;
    console.log(fullName)

    // Check if any required field is missing or empty
    if (![fullName, phoneNumber, email, password].every(Boolean)) {
        return NextResponse.json(
            { error: "All fields are required" },
            { status: 400 }
        );
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
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
        });

        // Return success response
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            newUser,
        });

    } catch (error) {
        return NextResponse.json(
            { error: error.message || "Something went wrong while creating user" },
            { status: 500 }
        );
    }
});


