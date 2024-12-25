"use client"

import useCartApi from "@/api/useCartApi";
import { Button } from "@nextui-org/react";
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useSelector } from "react-redux";

const Card = ({ product }) => {
  const { addToCart } = useCartApi()
  const router = useRouter()
  const user = useSelector(state => state.user.userData)

  const handleAddToCart = () => {
    if (user && user._id) {

      addToCart({ userId: user._id, productId: product._id });
    } else {

      const generateCartId = () => {
        return 'cartId-' + Math.random().toString(36).substring(2, 11).toUpperCase();
      };
      const cart = JSON.parse(sessionStorage.getItem('guestCart')) || [];
      const item = {
        ...product,
        cartId: generateCartId()
      }

      cart.push(item);
      sessionStorage.setItem('guestCart', JSON.stringify(cart));
    }
  };

  const description = product?.description.slice(0, 27) + ".";
  return (
    <>
      <div className="group w-[12rem] sm:w-[17rem] relative overflow-hidden rounded-lg transition-all hover:shadow-xl mb-4">
        <div className="overflow-hidden" onClick={() => router.push(`/product-page/${product?._id}`)}>
          <Image
            src={product?.productImages?.[0] || '/placeholder-image.png'}
            alt={product?.name || 'Product image'}
            width={500}
            height={500}
            className="w-full h-[12rem] sm:h-[14rem] rounded-[10px] sm:rounded-0 object-cover  transition-transform duration-300 group-hover:scale-110"
          />
          {product?.size?.[0]?.offPercentage > 0 && (
            <span className="absolute left-2 top-2 bg-white text-black px-2 py-1 rounded text-xs font-semibold">
              -{product.size[0].offPercentage}%
            </span>
          )}
        </div>
        <div className="p-3">
          <div onClick={() => router.push(`/product-page/${product?._id}`)}>
            <h3 className="mb-1 text-sm font-semibold text-gray-800 line-clamp-1">
              {product?.name || 'Product Name'}
            </h3>
            <p className="mb-1 text-xs text-gray-600 line-clamp-2">
              {product?.description.slice(0, 20) || 'Product description goes here.'}
            </p>
            <div className="mb-2 flex items-center">
              <span className="text-lg font-bold text-gray-900">
                ₹{product?.size?.[0]?.offPrice?.toFixed(2) || '0.00'}
              </span>
              {product?.size?.[0]?.price > product?.size?.[0]?.offPrice && (
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ₹{product.size[0].price.toFixed(2)}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full py-3 text-[13px] sm:text-xs font-semibold border-1 border-neutral-700 hover:border-none text-black rounded-[8px] hover:bg-[#d4a72c] hover:text-white hover:shadow-lg transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>

    </>
  )
}

export default Card
