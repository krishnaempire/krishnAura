"use client"

import Image from "next/image"
import Link from "next/link"

const Card = ({ product }) => {
  return (
    <>
      <div className='w-[22rem] h-[28rem] rounded-lgm   bg-gray-100'>
        <div className='w-full text-white text-center h-[18rem] bg-slate-500 rounded-lg overflow-hidden'>
          <Link href={`/product-page/${product?._id}`}>
            <Image src={product?.productImages[0]} alt="" width={352} height={288} className="object-cover h-full w-full" />
          </Link>
        </div>
        <div className='mx-4 mt-2'>
          <p className='font-bold text-[1.2rem] w-full'>{product?.description}</p>
          <div className='flex items-center mt-8'>
            <p className='text-red-500 font-semibold text-[1.1rem]'>-{product?.off}% off</p>
            <div className='ml-2 rounded-[.9rem] h-[2.4rem] w-[14rem] bg-gray-200 flex items-center justify-evenly '>
              <p className='text-[1.3rem] font-semibold'>&#8377;{product?.price}</p>
              <p className='line-through opacity-60 font-medium'>M.R.P: {`${product.offPrice}.00`}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card
