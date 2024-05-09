import { connectDB } from "@/DBConfig/connectDB.js"
import Product from "@/models/product.model.js"
import { uploadOnCLoudinary } from "@/utils/cloudinary.js"
import asyncHandler from "express-async-handler"
import { NextResponse } from "next/server"

connectDB()

export const POST = asyncHandler(async (req) => {
    try {
        const { imgUrl, stock, color, size, name, type, off, offPrice, description } = await req.json()
        
        if (!imgUrl || !stock || !color || !size || !type || !off || !offPrice || !description || !name) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            )
        }


        const uploadedUrls = []

        for (const url of imgUrl) {
            const uploadedImage = await uploadOnCLoudinary(url)
            if (!uploadedImage) {
                return NextResponse.json(
                    { error: "something went wrong while uploading product" },
                    { status: 400 }
                )
            }
            uploadedUrls.push(uploadedImage.url)
        }

        const product = await Product.create({
            productImages: uploadedUrls,
            name,
            stock,
            color,
            size,
            type,
            description,
            off,
            offPrice
        })

        if (!product) {
            return NextResponse.json(
                { error: "something went wrong while creating product" },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: "product Created", product },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: error.message || "something went wrong while creating product" },
            { status: 400 }
        )
    }
})
