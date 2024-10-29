"use client";
import useOrderApi from "@/api/useOrderApi";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, Checkbox, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, useDisclosure } from "@nextui-org/react"; // For loading indication
import Image from "next/image";
import Link from "next/link";
import { shallowEqual, useSelector } from "react-redux";

const Order = () => {
  
  const { getOrder, cancelOrderInShipway, returnReasonShipway, createReturnOrder, updateOrder } = useOrderApi();
  const { orderId } = useParams();
  const user = useSelector(
    (state) => state.user.userData,
    shallowEqual
  );
  const cancelModal = useDisclosure({ id: "cancelModal" });
  const returnModal = useDisclosure({ id: "returnModal" });
  const [isBankAcc, setIsBankAcc] = useState(false)
  const [order, setOrder] = useState(null);
  const [reason, setReason] = useState("");
  const [reasonId, setRessonId] = useState("");
  const [returnPayment, setReturnPayment] = useState("");
  const [priceList, setPriceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    address: user?.address || "",
    city: user?.city || "",
    pinCode: user?.pinCode || "",
    city: user.city,
    state: user.state
  })

  useEffect(() => {
    setUserData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      address: user?.address || "",
      city: user?.city || "",
      pinCode: user?.pinCode || "",
      city: user.city,
      state: user.state
    })
  }, [user])

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const fetchedOrder = await getOrder(orderId);
        setOrder(fetchedOrder);
        setLoading(false);
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

  useEffect(() => {
    if (order) {
      const sizesArray = order.size.split(" ");

      const newPriceList = sizesArray.flatMap((size) =>
        order.products
          .map((product) => product.size.find((s) => s.name === size)?.offPrice || 0)
          .filter(price => price !== 0)
      );

      setPriceList(newPriceList);
    }
  }, [order]);


  const handleCancelOrder = () => {
    cancelOrderInShipway(order?.orderId);
    const cancel = true
    updateOrder(orderId, cancel)
    cancelModal.onClose();
  };

  const handleCreateReason = async () => {
    try {
      const result = await returnReasonShipway(reason);
      setRessonId(result.id)
    } catch (error) {
      console.error('Failed to cancel order:', error);
    }
  };

  const handleCreateReturnOrder = async () => {


    const generateOrderId = () => {
      return 'ORD-' + Math.random().toString(36).substring(2, 11).toUpperCase();
    };

    const orderData = {
      ...order,
      ...userData,
      returnPayment,
      priceList: priceList,
      orderId: generateOrderId(),
      order_date: formatDate(new Date()),
      reason,
      reasonId
    };
    
    try {
      await createReturnOrder(orderData, order.products);
      returnModal.onClose()
    } catch (error) {
      console.error('Failed to cancel order:', error);
    }
  };

  function formatDate(date) {
    const padTo2Digits = (num) => num.toString().padStart(2, '0');

    return (
      date.getFullYear() +
      '-' +
      padTo2Digits(date.getMonth() + 1) +
      '-' +
      padTo2Digits(date.getDate()) +
      ' ' +
      padTo2Digits(date.getHours()) +
      ':' +
      padTo2Digits(date.getMinutes()) +
      ':' +
      padTo2Digits(date.getSeconds())
    );
  }


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

  const handleCheckboxChange = () => {
    setIsBankAcc(prev => !prev);
  };

  return (
    <>
      <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0 mt-[1rem]">
        <h2 className="text-3xl font-bold">Order Details</h2>
        <div className="mt-3 text-sm">
          Check the status of recent and old orders & discover more products
        </div>
        <div className="mt-8 flex flex-col overflow-hidden rounded-lg border border-gray-300 md:flex-row">
          <div className="w-full border-r border-gray-300 bg-gray-100 md:max-w-xs">
            <div className="p-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                <div className="mb-4">
                  <div className="text-sm font-semibold">Total Amount</div>
                  <div className="text-sm font-medium text-gray-700">{order?.price}</div>
                </div>
                <div className="mb-4">
                  <div className="text-sm font-semibold">Order Id</div>
                  <div className="text-sm font-medium text-gray-700">{order?.orderId}</div>
                </div>
                <div className="mb-4">
                  <div className="text-sm font-semibold">Order Status</div>
                  <div className="text-sm font-medium text-gray-700">{order?.isDone ? "Confirmed" : "Pending"}</div>
                </div>
                <div className="mb-4">
                  <div className="text-sm font-semibold">Address</div>
                  <div className="text-sm font-medium text-gray-700">{order?.address}</div>
                </div>
                <div className="mb-4">
                  <div className="text-sm font-semibold">Size</div>
                  <div className="text-sm font-medium text-gray-700">{order?.size.split(" ").join(", ")}</div>
                </div>
                <div className="mb-4">
                  <div className="text-sm font-semibold">Color</div>
                  <div className="text-sm font-medium text-gray-700">{order?.color.split(" ").join(", ")}</div>
                </div>
                <div className="mb-4">
                  <div className="text-sm font-semibold">Quantity</div>
                  <div className="text-sm font-medium text-gray-700">{order?.quantity.split(" ").join(", ")}</div>
                </div>
                <div className="mb-4">
                  <Button className="bg-[#d4a72c] text-white" onClick={cancelModal.onOpen}>Cancel Order</Button>
                </div>
                <div className="mb-4">
                  <Button className="bg-[#d4a72c] text-white" onClick={returnModal.onOpen}>Return Order</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="p-8">
              <ul className="-my-7 divide-y divide-gray-200">
                {order.products.map((product, index) => (
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
                      <p className="text-right text-sm font-bold text-gray-900">{priceList[index]}</p>
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

      <Modal
        isOpen={cancelModal.isOpen}
        onOpenChange={cancelModal.onOpenChange}
        className="w-[23rem]"
        placement='center'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Order Cancel</ModalHeader>
              <ModalBody>
                <div className="w-full flex justify-center">
                  <p className="font-bold text-[1.2rem]">
                    Are you sure you want to cancel the order?
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color={"primary"} variant={"ghost"} onPress={handleCancelOrder}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={returnModal.isOpen}
        onOpenChange={returnModal.onOpenChange}
        className="w-[23rem]"
        placement='center'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Return Order</ModalHeader>
              <ModalBody>
                <div className="w-full flex justify-center">
                  <input
                    type="text"
                    value={reason}
                    placeholder="Your Reason"
                    className=" bg-gray-200 px-[1rem] rounded-[.7rem] mr-1"
                    onChange={e => setReason(e.target.value)}
                  />
                  <Button color={"primary"} onClick={handleCreateReason}>Apply</Button>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-medium">
                    Payment receiving method
                  </p>
                  <Checkbox isSelected={isBankAcc} onChange={handleCheckboxChange}>
                    On Bank Account
                  </Checkbox>
                  <input
                    type="text"
                    value={returnPayment}
                    placeholder={isBankAcc ? "Enter your bank Acc No*" : "Enter your UPI ID"}
                    className="bg-gray-200 px-4 rounded-lg h-10"
                    onChange={e => setReturnPayment(e.target.value)}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color={"primary"} variant={"ghost"} onPress={handleCreateReturnOrder}>
                  Proceed
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Order;