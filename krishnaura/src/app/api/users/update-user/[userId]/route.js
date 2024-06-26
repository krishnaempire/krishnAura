import User from "@/models/user.model.js";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/DBConfig/connectDB.js";


export const PATCH = async (req, { params }) => {
    connectDB();
    try {
        const { userId } = params;
        const { firstName, lastName, email, phoneNumber, address, city, state, pinCode } = await req.json();

        if (!isValidObjectId(userId)) {
            return NextResponse.json({ error: "Please provide a valid userId" }, { status: 400 });
        }

        // Find the user by userId
        let user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        let updateValue = {};

        if (firstName) {
            updateValue.firstName = firstName;
        }
        if (lastName) {
            updateValue.lastName = lastName;
        }
        if (email) {
            updateValue.email = email;
        }
        if (phoneNumber) {
            updateValue.phoneNumber = phoneNumber;
        }
        if (address) {
            updateValue.address = address;
        }
        if (city) {
            updateValue.city = city;
        }
        if (state) {
            updateValue.state = state;
        }
        if (pinCode) {
            updateValue.pinCode = pinCode;
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateValue,
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json(
                { error: 'Something went wrong while updating user' },
                { status: 500 }
            );
        }
        return NextResponse.json(updatedUser);
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong while updating the user" }, { status: 500 });
    }
};
