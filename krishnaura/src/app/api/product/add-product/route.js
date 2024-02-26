import { connectDB } from "@/DBConfig/connectDB.js"
import Product from "@/models/product.model.js"
import { uploadOnCLoudinary } from "@/utils/cloudinary.js"
import asyncHandler from "express-async-handler"
import { NextResponse } from "next/server"

connectDB()

export const POST = asyncHandler(async (req) => {
    try {
        const body = await req.json()
        const { imgUrl, stock } = body

        if (!imgUrl || !stock) {
            return NextResponse.json(
                { error: "productImage and stock are required" },
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
            stock
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
