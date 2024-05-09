"use client";
import useOrderApi from "@/api/useOrderApi";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "@nextui-org/react"; // For loading indication
import Image from "next/image";
import Link from "next/link";

const Order = () => {
  const { getOrder } = useOrderApi();
  const { orderId } = useParams(); // Get orderId from route parameters
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null); // To track errors

  // Fetch the order data when the component mounts or orderId changes
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const fetchedOrder = await getOrder(orderId);
        setOrder(fetchedOrder); // Set the fetched order data
        setLoading(false); // Loading is complete
      } catch (err) {
        setError("Failed to fetch order details");
        setLoading(false); // Stop loading on error
      }
    };

    if (orderId) {
      fetchOrder(); 
    } else {
      setError("Order ID is missing"); 
      setLoading(false);
    }
  }, [orderId]); 

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!order) {
    return <div className="text-center">Order not found</div>;
  }


  return (
    <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
    <h2 className="text-3xl font-bold">Order Details</h2>
    <div className="mt-3 text-sm">
      Check the status of recent and old orders & discover more products
    </div>
    <div className="mt-8 flex flex-col overflow-hidden rounded-lg border border-gray-300 md:flex-row">
      <div className="w-full border-r border-gray-300 bg-gray-100 md:max-w-xs">
        <div className="p-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
            {/* {[
              ['Order ID', '#74557994327'],
              ['Date', '4 March, 2023'],
              ['Total Amount', '₹84,499'],
              ['Order Status', 'Confirmed'], */}
            {/* // ].map(([key, value]) => ( */}
              <div  className="mb-4">
                <div className="text-sm font-semibold">Order Id</div>
                <div className="text-sm font-medium text-gray-700">{order?.orderId}</div>
              </div>
              <div className="mb-4">
                <div className="text-sm font-semibold">Total Amount</div>
                <div className="text-sm font-medium text-gray-700">{order?.price}</div>
              </div>
              <div className="mb-4">
                <div className="text-sm font-semibold">Order Status</div>
                <div className="text-sm font-medium text-gray-700">{order?.isDone ? "Confirmed" : "Pending" }</div>
              </div>
              <div className="mb-4">
                <div className="text-sm font-semibold">Address</div>
                <div className="text-sm font-medium text-gray-700">{order?.address}</div>
              </div>
              <div className="mb-4">
                <div className="text-sm font-semibold">Size</div>
                <div className="text-sm font-medium text-gray-700">{order?.size}</div>
              </div>
              <div className="mb-4">
                <div className="text-sm font-semibold">Color</div>
                <div className="text-sm font-medium text-gray-700">{order?.color}</div>
              </div>
              <div className="mb-4">
                <div className="text-sm font-semibold">Quantity</div>
                <div className="text-sm font-medium text-gray-700">{order?.quantity}</div>
              </div>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="p-8">
          <ul className="-my-7 divide-y divide-gray-200">
            {order.products.map((product) => (
              <li
                key={product._id}
                className="flex flex-col justify-between space-x-5 py-7 md:flex-row"
              >
                <div className="flex flex-1 items-stretch">
                  <div className="flex-shrink-0">
                    <Image
                      width={80}
                      height={80}
                      className="h-20 w-20 rounded-lg border border-gray-200 object-cover"
                      src={product.productImages[0]}
                      alt={product.imageSrc}
                    />
                  </div>

                  <div className="ml-5 flex flex-col justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-900">{product.name}</p>
                      <p className="mt-1.5 text-sm font-medium text-gray-500">{product.description}</p>
                    </div>

                  </div>
                </div>

                <div className="ml-auto flex flex-col items-end justify-between">
                  <p className="text-right text-sm font-bold text-gray-900">{product.size[0].price}</p>
                <Button as={Link} href={`/product-page/${product?._id}`} className="bg-[#d4a72c] text-white">Buy</Button>
                </div>
              </li>
            ))}
          </ul>
          <hr className="my-8 border-t border-t-gray-200" />
        </div>
      </div>
    </div>
  </div>
  );
};

export default Order;
