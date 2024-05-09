import Cart from "@/models/cart.model.js";
import Product from "@/models/product.model.js"; // Product model
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/DBConfig/connectDB.js";

connectDB();

export const GET = async (req, { params }) => {
  try {
    const { userId } = params;

    if (!isValidObjectId(userId)) {
      return NextResponse.json(
        { error: "Invalid userId." },
        { status: 400 }
      );
    }

    const cartItems = await Cart.find({ userId });

    if (!cartItems.length) {
      return NextResponse.json(
        { message: "No items in the cart." },
        { status: 200 }
      );
    }

    const cartProducts = await Promise.all(
      cartItems.map(async (cartItem) => {
        const product = await Product.findById(cartItem.productId);
        
        if (product) {
          return {
            ...product.toObject(), // Convert Mongoose document to plain object
            cartId: cartItem._id, // Include the cartId
          };
        }

        return null; // If product not found
      })
    );

    const validCartProducts = cartProducts.filter((item) => item !== null);

    return NextResponse.json(validCartProducts, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart items and products:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching cart items and products." },
      { status: 500 }
    );
  }
};
