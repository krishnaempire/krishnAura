import { connectDB } from "@/DBConfig/connectDB.js"
import Product from "@/models/product.model.js"
import asyncHandler from "express-async-handler"
import { isValidObjectId } from "mongoose"
import { NextResponse } from "next/server"

connectDB()

export const PATCH = asyncHandler( async(req, {params}) => {

    const body = await req.json()
    const { productId } = params
    const { imgUrl, stock = 0, size, color } = body

    if (!isValidObjectId(productId)) {
        return NextResponse.json(
            {error: "please provide a valid poductId"},
            {status: 400}) 
    }


    const product = await Product.findById(productId);

    if (!product) {
        return NextResponse.json(
            {error: "Product not found"},
            {status: 404})
    }


    const updateFields = {stock: product.stock + stock}

    if (imgUrl) {
        if (!updateFields.$push) {
            updateFields.$push = {};
        }
        updateFields.$push.productImages = imgUrl;
    }
    
    if (size) {
        if (!updateFields.$push) {
            updateFields.$push = {};
        }
        updateFields.$push.size = size;
    }
    
    if (color) {
        if (!updateFields.$push) {
            updateFields.$push = {};
        }
        updateFields.$push.color = color;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        updateFields,
        {new: true}
    )

    if (!updatedProduct) {
        return NextResponse.json(
            {message: "something went wrong while updating product"},
            {status: 500})
    }

    return NextResponse.json(updatedProduct)
    
})
