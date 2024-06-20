"use client"
import Image from "next/image";
import React, { useState } from 'react'
import { Button, Checkbox } from "@nextui-org/react";
import useOrderApi from "@/api/useOrderApi";
import Link from "next/link";

const OrderCard = ({ order, product, isAdmin }) => {
  const { updateOrder } = useOrderApi()
  const [isDone, setisDone] = useState(order.isDone);
  const orderId = order._id

  const handleIsDone = async() => {
    await updateOrder(orderId)
  }

  const address = order?.address.slice(0, 20) + "..";

  return (
    <div className="w-[18rem]">
      <div className={`w-[18rem] ${isAdmin ? "h-[27rem]" : "h-[26rem]"} rounded-[1.5rem] border-1 border-gray-300 ${isDone && "bg-gray-100"}`}>
        <div className="flex flex-col w-[95%] h-full m-auto items-center gap-2 justify-center ">
          <div className="flex flex-col w-[90%] items-center gap-2 ">

            <div className="">
              <Image src={product?.productImages[0]} alt={product?.name} width={352} height={288} className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-cover" />
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
              <div className="flex gap-2 items-center">
                <p className="text-[.9rem]">Color:</p>
                <p className="text-[.8rem]">{order.color.split(" ").join(", ")}</p>
              </div>
              <div className="flex gap-2 items-center">
                <p className="text-[.9rem]">Quantity:</p>
                <p className="text-[.8rem]">{order.quantity.split(" ").join(", ")}</p>
              </div>
              <div className="flex gap-2 items-center">
                <p className="text-[.9rem]">Postal Code:</p>
                <p className="text-[.8rem]">{order.postalCode}</p>
              </div>
              <div className="flex gap-2 ">
                <p className="text-[.9rem]">address:</p>
                <p className="text-[.8rem]">{address}</p>
              </div>

            </div>
          </div>
          <div>
            <Button as={Link} href={`order/${order?._id}`} className="bg-[#d4a72c] text-white">View Order</Button>
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
