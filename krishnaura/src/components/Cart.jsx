"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from "next/link"
import { Spinner } from '@nextui-org/react';
import useCartApi from '@/api/useCartApi';
import { useRouter } from 'next/navigation';
import { shallowEqual, useSelector } from 'react-redux';


export default function Cart({ products, setRefreshCart }) {
  const { deleteCartItem } = useCartApi()
  const router = useRouter()
  const user = useSelector(
    (state) => state.user.userData,
    shallowEqual
  );
  const [totalAmount, setTotalAmount] = useState(0);

  const handleDelete = async (cartId) => {
    if (user && user?._id) {

      const success = await deleteCartItem(cartId);

      if (success) {
        setRefreshCart(prev => !prev)
      }

    } else {
      let guestCart = JSON.parse(sessionStorage.getItem('guestCart')) || [];

      guestCart = guestCart.filter(item => item.cartId !== cartId);

      sessionStorage.setItem('guestCart', JSON.stringify(guestCart));

      setRefreshCart(prev => !prev);
    }
  };

  useEffect(() => {
    if (products?.length) {
      const calculatedTotal = products.reduce((total, product) => {
        const offPrice = product.selectedSize ? product.size.find(size => size.name === product.selectedSize)?.offPrice : product.size[0].offPrice;
        return total + offPrice;
      }, 0);

      setTotalAmount(calculatedTotal);
    }
  }, [products]);


  const storeCheckoutData = (products, totalAmount) => {
    const data = {
      products,
      totalAmount,
    };
    sessionStorage.setItem("checkoutData", JSON.stringify(data)); // Store data in session storage
  };

  const handleCheckout = () => {
    if (!user?._id) {
      router.push("/auth")
      return
    }
    storeCheckoutData(products, totalAmount);
    router.push('/product-page/checkout');
  };



  if (!products?.length) {
    return (
      <div className='w-full h-screen flex justify-center items-center text-[1.3rem] font-medium'>
        No Items
      </div>
    );
  }

  if (!products) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <Spinner size='lg' />
      </div>
    );


  }
  return (
    <>
      <div className="mx-auto flex max-w-3xl flex-col space-y-4 p-6 px-2 sm:p-10 sm:px-2">
        <h2 className="text-3xl font-bold">Your cart</h2>
        <p className="mt-3 text-sm font-medium text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eius repellat ipsam, sit
          praesentium incidunt.
        </p>
        <ul className="flex flex-col divide-y divide-gray-200">
          {products.map((product, index) => (
            <li key={index} className="flex flex-col py-6 sm:flex-row sm:justify-between">
              <div className="flex w-full space-x-2 sm:space-x-4">
                <Link href={`/product-page/${product?._id}`}>
                  <Image
                    width={80}
                    height={80}
                    className="h-20 w-20 flex-shrink-0 rounded object-contain outline-none dark:border-transparent sm:h-32 sm:w-32"
                    src={product.productImages[0]}
                    alt={product.name}
                  />
                </Link>
                <div className="flex w-full flex-col justify-between pb-4">
                  <div className="flex w-full justify-between space-x-2 pb-2">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold leading-snug sm:pr-8">{product.name}</h3>
                      <p className="text-sm">{!product?.selectedColor ? product.color[0].name : product?.selectedColor}</p>
                      <p className="text-sm">
                        {product.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">
                      {product.selectedSize ?
                        product.size.find(size => size.name === product.selectedSize)?.offPrice :
                        product.size[0].offPrice}
                    </p>
                  </div>
                  <div className="flex divide-x text-sm">
                    <button type="button"
                      className="flex items-center space-x-2 px-2 py-1 pl-0"
                      onClick={() => handleDelete(product.cartId)}
                    >
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}

        </ul>
        <div className="space-y-1 text-right">
          <p>
            Total amount:
            <span className="font-semibold">{totalAmount}</span>
          </p>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible-outline-2 focus-visible-outline-offset-2 focus-visible-outline-black"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  )
}
