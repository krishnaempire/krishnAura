"use client";
import useOrderApi from '@/api/useOrderApi';
import useProductApi from '@/api/useProductApi';
import OrderCard from '@/components/OrderCard';
import { useToast } from '@/components/ui/use-toast';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Pagination, Spinner } from "@nextui-org/react";

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const user = useSelector(
    (state) => state.user.userData,
    shallowEqual
  );
  const [product, setProduct] = useState([]);
  const { toast } = useToast();
  const { getUserOrder, getAllOrder } = useOrderApi();
  const { getProduct } = useProductApi();
  const [orders, setOrders] = useState([]);
  const [fetching, setFetching] = useState(true);

  const fetchOrders = async (page) => {
    try {
      const orderData = await getUserOrder(user?._id, page);
      setOrders(orderData.orders);
      setTotalPages(orderData.pagination.totalPages);

      const productArray = await Promise.all(orderData.orders.map(async (order) => {
        const product = await getProduct(order.productId);
        return product;
      }));
      setProduct(productArray);
    } catch (error) {
      toast({
        description: "Error fetching orders",
      });
    } finally {
      setFetching(false);
    }
  };

  const fetchAllOrders = async (page) => {
    try {
      const orderData = await getAllOrder(page);
      setOrders(orderData.orders);
      setTotalPages(orderData.pagination.totalPages);
      
      const productArray = await Promise.all(orderData.orders.map(async (order) => {
        const product = await getProduct(order.productId[0]);
        return product;
      }));
      setProduct(productArray);
    } catch (error) {
      toast({
        description: "No Orders",
      });
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    setFetching(true);
    if (user?.isAdmin) {
      fetchAllOrders(currentPage);
    } else {
      fetchOrders(currentPage);
    }
  }, [user, currentPage]);

  if (!fetching && (!orders || orders.length === 0)) {
    return (
      <div className='w-full h-screen flex justify-center items-center text-[1.3rem] font-medium'>
        No Orders
      </div>
    );
  }

  if (fetching || !orders) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  return (
    <>
      <div className='w-full flex flex-wrap md:gap-[6rem] gap-[2rem] justify-center mb-[6rem] mt-[7rem] '>
        {orders && orders.map((order, index) => (
          <OrderCard order={order} product={product[index]} key={index} isAdmin={user?.isAdmin} />
        ))}
      </div>
      <div className="overflow-hidden flex justify-center mb-5">
        <Pagination
          total={totalPages}
          classNames={{
            cursor: "bg-gradient-to-b shadow-lg from-default-900 to-default-800 text-white font-bold",
          }}
          page={currentPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
};

export default Orders;
