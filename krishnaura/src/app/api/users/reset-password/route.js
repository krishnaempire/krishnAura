import User from "@/models/user.model.js";
import { NextResponse } from "next/server";
import { connectDB } from "@/DBConfig/connectDB.js";


export const PATCH = async (req) => {
    connectDB();
    try {
        const { email, password } = await req.json();

        // Find the user by userId
        let user = await User.findOne({email});
        console.log(user)

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        
        const updatedUser = await User.findByIdAndUpdate(
            user?._id,
            password,
            { new: true }
        );
        if (!updatedUser) {
            return NextResponse.json(
                { error: 'Something went wrong while updating user' },
                { status: 500 }
            );
        }
        return NextResponse.json({message: "Passwrod updated", updatedUser});
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong while updating the user" }, { status: 500 });
    }
};
