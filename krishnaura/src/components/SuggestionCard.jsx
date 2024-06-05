"use client"

import useCartApi from "@/api/useCartApi";
import { Button } from "@nextui-org/react";
import Image from "next/image"
import Link from "next/link"
import { useSelector } from "react-redux";

const SuggestionCard = ({ product }) => {
  const { addToCart } = useCartApi()
  const user = useSelector(state => state.user.userData)

  const handleAddToCart = () => {
    if (user && user._id) {
      addToCart({ userId: user._id, productId: product._id });
    } else {
      const cart = JSON.parse(sessionStorage.getItem('guestCart')) || [];
      const item ={
        ...product,
        cartId: 1
      }
      cart.push(item);
      sessionStorage.setItem('guestCart', JSON.stringify(cart));
    }
  };

  const description = product?.description.slice(0, 20) + ".";
  return (
    <>
      <div className='w-[12rem]  rounded-lg bg-gray-100 hover:shadow-lg'>
        <div className='w-full text-white text-center h-[10rem] bg-slate-500 rounded-lg overflow-hidden'>
          <Link href={`/product-page/${product?._id}`}>
            <Image src={product?.productImages[0]} alt="" width={352} height={288} className="object-cover h-full w-full" />
          </Link>
        </div>
        <div className='mx-4 mt-2 flex flex-col gap-[1px]'>
          <p className='font-medium text-[.8rem] w-full'>{product?.name}</p>
          <p className='font-medium sm:text-[.7rem] md:text-[1rem] w-full'>{description}</p>
          <div className='flex flex-col  justify-between mt-2'>
              <p className='text-[1rem] line-through opacity-60 font-semibold'>&#8377;{`${product.size[0].price}.00`}</p>
              <p className='text-[1rem] opacity-90 font-semibold'>&#8377;{`${product.size[0].offPrice}.00`}</p>
            <p className='text-red-400 font-semibold text-[1rem]'>-{product?.size[0].offPercentage}% off</p>
            {/* <div className='ml-2 rounded-[.9rem] h-[2.2rem] w-[11rem] flex items-center justify-evenly '> */}
            {/* <Button onClick={handleAddToCart} className="h-[2rem] bg-[#d4a72c] text-white hover:shadow-lg hover:bg-white hover:text-[#d4a72c]">Cart</Button> */}
              {/* <p className='line-through opacity-60 text-[.9rem] font-medium'>M.R.P: {product?.size[0].price}</p> */}
            {/* </div> */}
          </div>
          <div className="flex justify-end w-full">
          </div>
        </div>
      </div>
    </>
  )
}

export default SuggestionCard
