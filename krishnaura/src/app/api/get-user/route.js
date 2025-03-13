import { connectDB } from '@/DBConfig/connectDB';
import User from '@/models/user.model';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';


export const GET = async (req) => {
  connectDB()
  const jwtToken = cookies().get("token")?.value || ""

  if (!jwtToken) {
    return NextResponse.json({
      message: "JWT token is missing"
    });
  }
  
  try {
    // Verify and decode the JWT token
    const decoded = jwt.verify(jwtToken, process.env.TOKEN_SECRET);
    
    const user = await User.findById(decoded?._id).select("-password")
    
    return NextResponse.json(user)
    
  } catch (error) {
    // Handle verification or decoding errors
    return NextResponse.json({ error: 'Invalid JWT token' });
  }
};
