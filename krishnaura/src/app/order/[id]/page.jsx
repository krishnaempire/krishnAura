"use client"
import useProductApi from '@/api/useProductApi'
import OrderCard from '@/components/orderCard'
import { useToast } from '@/components/ui/use-toast'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Order = () => {
  const [product, setProduct] = useState([])
  const { toast } = useToast()
  const { getUserOrder, getProduct } = useProductApi()
  const { id } = useParams()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orderData = await getUserOrder(id)
        setOrders(orderData)

        const productArray = await Promise.all(orderData.map(async order => {
          const product = await getProduct(order.productId)
          return product
        }))
        setProduct(productArray)
      } catch (error) {
        toast({
          description: "Error fetching orders"
        })
      }
    }
    fetchOrders();
  }, [id])


  return (
    <>
      <div className='w-[70%] m-auto mt-[9rem] grid grid-cols-3 gap-[2rem]'>
        {orders && orders.map((order, index) => (
          <OrderCard order={order} product={product[index]} key={index} />
        ))}
      </div>
    </>
  )
}

export default Order
