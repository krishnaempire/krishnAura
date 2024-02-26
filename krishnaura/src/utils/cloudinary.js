import {v2 as cloudinary} from 'cloudinary';
import { NextResponse } from 'next/server';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLODINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCLoudinary = async(localPath) => {
    try {

        const res = await cloudinary.uploader.upload(localPath, {
            resource_type: "auto"
        })

        if (!res) {
            return NextResponse.json(
                {error: "somethign went wrong while uploading"},
                {status: 500})
        }

        return res

        
    } catch (error) {
        return NextResponse.json(
            {error: error.message || "Something went wrong while uploading"}, 
            {status: 500})
    }
}

export {
    uploadOnCLoudinary
}