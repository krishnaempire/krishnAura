import { connectDB } from "@/DBConfig/connectDB";
import Product from "@/models/product.model";
import asyncHandler from "express-async-handler";
import { NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";



export const PATCH = asyncHandler( async(req, {params}) =>{
    connectDB()
    try {

        const { productID } = params

        if (!isValidObjectId(productID)) {
            return NextResponse.json(
                {error: "productID missing"},
                {status: 400})
        }

        const product = await Product.findById(productID)

        if (!product) {
            return NextResponse.json(
                {error: `no product found by this ${productID} productID `},
                {status: 404})
        }

        const updateSell = await Product.findByIdAndUpdate(
            productID,
            {
                sells: product.sells + 1,
                stock: product.stock - 1
            },
            {new : true}
        )

        if (!updateSell) {
            return NextResponse.json(
                {error: `something went wrong while updating product sell `},
                {status: 500})
        }


        
        return NextResponse.json(
            {message: updateSell})
        
    } catch (error) {
        return NextResponse.json(
            {error: error.message || "something went wrong while updating product"},
            {status: 400})
    }
})