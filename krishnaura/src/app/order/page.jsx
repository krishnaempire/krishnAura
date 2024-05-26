"use client"
import useOrderApi from '@/api/useOrderApi'
import useProductApi from '@/api/useProductApi'
import OrderCard from '@/components/OrderCard'
import { useToast } from '@/components/ui/use-toast'
import React, { useEffect, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { Spinner } from "@nextui-org/react"

const Orders = () => {
  const user = useSelector(
    (state) => state.user.userData,
    shallowEqual
  );
  const [product, setProduct] = useState([])
  const { toast } = useToast()
  const { getUserOrder, getAllOrder } = useOrderApi()
  const { getProduct } = useProductApi() 
  const [orders, setOrders] = useState()
  const [fetching, setFetching] = useState(true)

  console.log("render")

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orderData = await getUserOrder(user?._id)
        setOrders(orderData)

        const productArray = await Promise.all(orderData.map(async order => {
          const product = await getProduct(order.productId)
          return product
        }))
        setProduct(productArray)
      } catch (error) {
        // toast({
        //   description: "Error fetching orders"
        // })
      } finally {
        setFetching(false)
      }
    }
    const fecthAllOrder = async () => {

      try {
        const orderData = await getAllOrder()
        setOrders(orderData)

        const productArray = await Promise.all(orderData.map(async order => {
          const product = await getProduct(order.productId[0])
          return product
        }))
        setProduct(productArray)
        
      } catch (error) {
        toast({
          description: "No Orders"
        })
      } finally {
        setFetching(false)
      }
    }

    if (user?.isAdmin) {
      fecthAllOrder()
    } else {
      fetchOrders();
    }
    
  }, [user])

  if (!fetching && !orders[0]?._id ) {
    return (
      <div className='w-full h-screen flex justify-center items-center text-[1.3rem] font-medium'>
          No Orders
      </div>
  );
  }

  if (!orders && !user?._id) {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <Spinner size='lg' />
        </div>
    );
  
}

  return (
    <>
      <div className='w-full flex flex-wrap md:gap-[6rem] gap-[2rem] justify-center mb-[9rem] mt-[7rem] '>
        {orders && orders.map((order, index) => (
          <OrderCard order={order} product={product[index]} key={index} isAdmin={user?.isAdmin} />
        ))}
      </div>
    </>
  )
}

export default Orders
