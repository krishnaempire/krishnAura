import asyncHandler from "express-async-handler";
import User from "@/models/user.model.js";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/DBConfig/connectDB.js";

connectDB()

export const PATCH = asyncHandler(async (req, { params }) => {
    try {
        const { userId } = params;
        const { fullName, email, userAvatar, address } = await req.json();

        // Check if userId is a valid ObjectId
        if (!isValidObjectId(userId)) {
            return NextResponse.json({ error: "Please provide a valid userId" }, { status: 400 });
        }

        // Find the user by userId
        let user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        let updateValue = {}

        if (fullName) {
            updateValue.fullName = fullName;
        }
        if (email) {
            updateValue.email = email;
        }
        if (userAvatar) {
            updateValue.userAvatar = userAvatar;
        }
        if (address) {
            updateValue.address = address;
        }
        console.log(updateValue);


        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateValue,
            { new: true }
        )

        if (!updatedUser) {
            return NextResponse.json(
                {error: 'something went wrong while updating user'},
                {status: 500})
        }

        return NextResponse.json(updatedUser);
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong while updating the user" }, { status: 500 });
    }
});
