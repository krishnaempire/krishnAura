"use client"
import Image from "next/image";
import React, { useState } from 'react'
import { Checkbox } from "@nextui-org/react";
import useOrderApi from "@/api/useOrderApi";

const OrderCard = ({ order, product, isAdmin }) => {
  const { updateOrder } = useOrderApi()
  const [isDone, setisDone] = useState(order.isDone);
  const orderId = order._id

  const handleIsDone = async() => {
    await updateOrder(orderId)
  }


  return (
    <div className="h-screen">
      <div className={`w-[18rem] h-[23rem] ${isAdmin ? "h-[10rem]" : "h-[8rem]"} rounded-[1.5rem] border-1 border-gray-300 ${isDone && "bg-gray-100"}`}>
        <div className="flex flex-col w-[95%] h-full m-auto items-center gap-2 justify-center ">
          <div className="flex flex-col w-[90%] items-center gap-2 ">

            <div className="">
              <Image src={product?.productImages[0]} alt="" width={352} height={288} className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-cover" />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <p className="text-[.9rem]">Payment Id:</p>
                <p className="text-[.8rem]">{order.paymentId}</p>
              </div>
              <div className="flex gap-2 items-center">
                <p className="text-[.9rem]">Order Id:</p>
                <p className="text-[.8rem]">{order.orderId}</p>
              </div>
              <div className="flex gap-2 items-center">
                <p className="text-[.9rem]">phone Number:</p>
                <p className="text-[.8rem]">{order.phoneNumber}</p>
              </div>
              <div className="flex gap-2 ">
                <p className="text-[.9rem]">address:</p>
                <p className="text-[.8rem]">{order.address}</p>
              </div>

            </div>
          </div>
          {isAdmin && (
            <Checkbox isSelected={isDone} onValueChange={setisDone} onClick={handleIsDone}>
              Done
            </Checkbox>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderCard
