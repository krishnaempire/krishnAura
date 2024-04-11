"use client"
import useOrderApi from '@/api/useOrderApi'
import useProductApi from '@/api/useProductApi'
import OrderCard from '@/components/OrderCard'
import { useToast } from '@/components/ui/use-toast'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from "@nextui-org/react"

const Order = () => {
  const user = useSelector(state => state.user.userData)
  const [product, setProduct] = useState([])
  const { toast } = useToast()
  const { getUserOrder, getAllOrder } = useOrderApi()
  const { getProduct } = useProductApi() 
  const { id } = useParams()
  const [orders, setOrders] = useState()
  const [fetching, setFetching] = useState(true)


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
      } finally {
        setFetching(false)
      }
    }
    const fecthAllOrder = async () => {
      try {

        const orderData = await getAllOrder()
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
      } finally {
        setFetching(false)
      }
    }

    if (user.isAdmin) {
      fecthAllOrder()
    } else {
      fetchOrders();
    }
    
  }, [id])

  if (!fetching) {
    return (
      <div className='w-full h-screen flex justify-center items-center text-[1.3rem] font-medium'>
          No Orders
      </div>
  );
  }

  if (!orders) {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <Spinner size='lg' />
        </div>
    );
  
}

  return (
    <>
      <div className='w-full h-screen place-items-center mt-[9rem] grid grid-cols-3 mb-[9rem] '>
        {orders && orders.map((order, index) => (
          <OrderCard order={order} product={product[index]} key={index} isAdmin={user?.isAdmin} />
        ))}
      </div>
    </>
  )
}

export default Order
