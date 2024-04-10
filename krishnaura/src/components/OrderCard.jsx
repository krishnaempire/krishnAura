import Image from "next/image";
import React from 'react'

const OrderCard = ({ order, product }) => {

  return (
    <div>
      <div className='w-[22rem] h-[8rem] rounded-[1.5rem] border-1 border-gray-300'>
        <div className="flex w-[95%] h-full m-auto items-center gap-2 ">
          <div className="">
            <Image src={product?.productImages[0]} alt="" width={352} height={288} className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-cover" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center">
              <p className="text-[.9rem]">Payment Id:</p>
              <p className="text-[.8rem]">{order.paymentId}</p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-[.9rem]">Order Id:</p>
              <p className="text-[.8rem]">{order.orderId}</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default OrderCard
