import Image from "next/image";
import React  from 'react'

const OrderCard = ({ order, product }) => {

  return (
    <div>
      <div className='w-[20rem] h-[12rem] rounded-[1.5rem] border-1 border-gray-300'>
        <div className="flex w-[95%] m-auto items-center ">
          {/* <div className="relative top-3 left">
          <Image src={product?.productImages[0]} alt="" width={352} height={288} className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-cover" />
          </div> */}
          <p>{order.paymentId}</p>

        </div>
      </div>
    </div>
  )
}

export default OrderCard
