import User from "@/models/user.model.js";
import { NextResponse } from "next/server";
import { connectDB } from "@/DBConfig/connectDB.js";
import bcrypt from "bcrypt"


export const PATCH = async (req) => {
    connectDB();
    try {
        const { email, password } = await req.json();
    
        let user = await User.findOne({email});

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const updatedUser = await User.findByIdAndUpdate(
            user?._id,
            {
                password: hashedPassword
            },
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
