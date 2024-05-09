import { connectDB } from "@/DBConfig/connectDB";
import Cart from "@/models/cart.model.js";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";


export const DELETE = async (req) => {
    connectDB();
    try {
        const { cartIds } = await req.json();

        const cartIdArray = Array.isArray(cartIds) ? cartIds : [cartIds];

        if (cartIdArray.some(id => !isValidObjectId(id))) {
            return NextResponse.json({ error: "One or more invalid cart IDs provided" }, { status: 400 });
        }

        const result = await Cart.deleteMany({ _id: { $in: cartIdArray } });
        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "No cart items found with the given ID" }, { status: 404 });
        }

        return NextResponse.json({ message: "All cart items with the specified ID deleted successfully" });

    } catch (error) {
        console.error("Error deleting cart items:", error.message);
        return NextResponse.json({ error: "Something went wrong while deleting cart items" }, { status: 500 });
    }
};
