"use client"
import Image from 'next/image'
import React, { Suspense, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useToast } from './ui/use-toast'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import useOrderApi from '@/api/useOrderApi'
import useCartApi from '@/api/useCartApi'

function extractCartIds(products) {
  return products.map((product) => product.cartId || null);
}

function extractProductIds(products) {
  return products.map((product) => product._id || null);
}
function extractColor(products) {
  return products.map((product) => product.color[0].name || null).flat().join(" ");
}
function extractSize(products) {
  return products.map((product) => product.size[0].name || null).flat().join(" ");
}

export function Checkout({ product, size, color, quantity }) {

  const { addOrder } = useOrderApi()
  const { deleteCartItems } = useCartApi()
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [addressVerified, setAddressVerified] = useState(false)
  const { toast } = useToast()
  const user = useSelector(state => state.user.userData)
  const [cartIds, setCartId] = useState()
  const [countdown, setCountdown] = useState(5);
  const [redirect, setRedirect] = useState("")
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productId, setProductId] = useState();
  const [sizes, setSizes] = useState();
  const [colors, setColors] = useState();
  const [userData, setUserData] = useState({
    fullName: user?.fullName || "",
    phoneNumber: user?.phoneNumber || "",
    address: user?.address || "",
    postalCode: ""
  })

  
  const userId = user?._id
  

  useEffect(() => {

    sessionStorage.setItem("checkoutData", false)
    sessionStorage.setItem("guestCart", false)

    setProductId(product[0]?._id)
    if (product[0]?.cartId) {
      const cartId = extractCartIds(product);
      const productIds = extractProductIds(product);
      const colors = extractColor(product)
      const sizes = extractSize(product)
      setColors(colors)
      setSizes(sizes)
      setProductId(productIds)
      setCartId(cartId)
    }

    const getPriceForSize = (products, size) => {
      if (!products[0].cartId) {
        const sizeForPrice = products[0].size.find((s) => s.name === size);
        return sizeForPrice ? sizeForPrice.price : 0;

      } else {
        return products.reduce((total, product) => {
          const sizePrice = product.size[0]?.price || 0;
          return total + sizePrice;
        }, 0);
      }
    };

    const newPrice = getPriceForSize(product, size);
    setTotalPrice(quantity * newPrice || 1 * newPrice)
    setPrice(newPrice);
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    if (!redirect) {
      return
    }
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown > 0) {
          return prevCountdown - 1;
        } else {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [redirect]);

  const closeAndRedirect = () => {
    router.push('/');
  };

  const handlePayment = async () => {
    if (!addressVerified || !phoneVerified) {
      toast({
        description: "Check mark the fields"
      })
      return
    }
    if (!userData.phoneNumber || !userData.address || !userData.postalCode) {
      return toast({
        description: "Fill all the fields"
      })
    }
    const res = await fetch("/api/payment/create-order", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ totalPrice })
    })

    const data = await res.json()

    var options = {
      "key": process.env.RAZOR_KEY_ID,
      "amount": data.amount,
      "currency": "INR",
      "name": "Acme Corp",
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": data.id,
      "handler": async (response) => {
        const value = {
          ...response,
          userId,
          productId: productId?.length ? productId : [productId]
        }
        const res = await fetch("/api/payment/payment-verification", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(value)
        })
        const payment = await res.json()

        if (payment.error) {
          return toast({
            description: "Payment Invalid"
          });
        }
        let orderData = payment.orderData

        if (!orderData.color) {
          orderData.color = color || colors;
        }
        if (!orderData.size) {
          orderData.size = size || sizes;
        }
        if (!orderData.quantity) {
          orderData.quantity = quantity || 1;
        }

        orderData = {
          ...orderData,
          totalPrice,
          address: userData.address,
          phoneNumber: userData.phoneNumber,
          postalCode: userData.postalCode
        }
        console.log(orderData)

        await addOrder(orderData)
        if (cartIds) {
          deleteCartItems(cartIds)
        }

        onOpen()
        setRedirect(true)
      },
      "prefill": {
        "name": user.fullName,
        "email": user.email,
        "contact": user.phoneNumber
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#212120"
      }
    };
    const razor = new window.Razorpay(options);
    razor.open();

  }

  return (
    <>
      {product && (

        < div className="mx-auto my-4 max-w-4xl md:my-6">
          <div className="overflow-hidden  rounded-xl shadow">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Contact Info */}
              <div className="px-5 py-6 text-gray-900 md:px-8">
                <div className="flow-root">
                  <div className="-my-6 divide-y divide-gray-200">
                    <div className="py-6">
                      <form>
                        <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                          <div>
                            <h3
                              id="contact-info-heading"
                              className="text-lg font-semibold text-gray-900"
                            >
                              Contact information
                            </h3>

                            <div className="mt-4 w-full flex flex-col gap-4">
                              <div>

                                <label
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  htmlFor="name"
                                >
                                  Full Name
                                </label>
                                <input
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                  type="text"
                                  value={userData.fullName}
                                  onChange={handleInputChange}
                                  placeholder="Enter your name"
                                  name="fullName"
                                ></input>
                              </div>
                              <div>

                                <label
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  htmlFor="name"
                                >
                                  Phone Number
                                </label>
                                <input
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                  type="text"
                                  value={userData.phoneNumber}
                                  onChange={handleInputChange}
                                  placeholder="Enter your phone number"
                                  name="phoneNumber"
                                ></input>
                                <Checkbox isSelected={phoneVerified} onValueChange={setPhoneVerified}>
                                  Phone Verified</Checkbox>
                              </div>
                            </div>
                          </div>
                          <hr className="my-8" />
                          <div className="mt-10">
                            <h3 className="text-lg font-semibold text-gray-900">Shipping address</h3>

                            <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                              <div className="sm:col-span-3">
                                <label
                                  htmlFor="address"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Address
                                </label>
                                <div className="mt-1">
                                  <input
                                    type="text"
                                    value={userData.address}
                                    onChange={handleInputChange}
                                    name="address"
                                    autoComplete="street-address"
                                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                  />
                                </div>
                                <Checkbox isSelected={addressVerified} onValueChange={setAddressVerified}>
                                  Address Verified</Checkbox>
                              </div>

                              <div>
                                <label
                                  htmlFor="postal-code"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Postal code
                                </label>
                                <div className="mt-1">
                                  <input
                                    type="text"
                                    name="postalCode"
                                    value={userData.postalCode}
                                    onChange={handleInputChange}
                                    autoComplete="postal-code"
                                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr className="my-8" />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* Product List */}
              <div className="bg-gray-100 px-5 py-6 md:px-8">
                <div className="flow-root">
                  <ul className="-my-7 divide-y divide-gray-200">
                    {product.map((product, index) => (

                      <li
                        key={index}
                        className="flex items-stretch justify-between space-x-5 py-7"
                      >
                        <div className="flex flex-1 items-stretch">
                          <div className="flex-shrink-0">
                            {/* <img
                          className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-contain"
                          src={product.imageSrc}
                          alt={product.imageSrc}
                        /> */}
                            <Image src={product?.productImages[0]} alt="" width={352} height={288} className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-cover" />
                          </div>
                          <div className="ml-5 flex flex-col justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-bold">{product.name}</p>
                              <p className="mt-1.5 text-sm font-medium text-gray-500">
                                {color || product.color[0].name}
                              </p>
                              <p className="mt-1.5 text-sm font-medium text-gray-500">
                                {size || product.size[0].name}
                              </p>
                            </div>
                            <p className="mt-4 text-xs font-medium ">{quantity || 1}</p>
                          </div>
                        </div>
                        <div className="ml-auto flex flex-col items-end justify-between">
                          <p className="text-right text-sm font-bold text-gray-900">Rs: {product.size[0].price}</p>
                          <button
                            type="button"
                            className="-m-2 inline-flex rounded p-2 text-gray-400 transition-all duration-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                          >
                            <span className="sr-only">Remove</span>
                            {/* <X className="h-5 w-5" /> */}
                          </button>
                        </div>
                      </li>
                    ))}

                  </ul>
                </div>
                <hr className="mt-6 border-gray-200" />
                <form action="#" className="mt-6">
                  <div className="sm:flex sm:space-x-2.5 md:flex-col md:space-x-0 lg:flex-row lg:space-x-2.5">
                    {/* <div className="flex-grow">
                  <input
                    className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Enter coupon code"
                  />
                </div> */}
                    <div className="mt-4 sm:mt-0 md:mt-4 lg:mt-0">
                      <button
                        onClick={handlePayment}
                        type="button"
                        className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        Make Payment
                      </button>
                    </div>
                  </div>
                </form>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center justify-between text-gray-600">
                    <p className="text-sm font-medium">Sub total</p>
                    <p className="text-sm font-medium">{quantity ? `${quantity} x ${price}` : price}</p>
                  </li>
                  <li className="flex items-center justify-between text-gray-900">
                    <p className="text-sm font-medium ">Total</p>
                    <p className="text-sm font-bold ">{totalPrice}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal
        isOpen={isOpen}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Success</ModalHeader>
              <ModalBody>
                <p>
                  Thankyou for shopping with us
                </p>
                <div className='flex justify-center'>
                  <p>redirect to home in: {countdown}</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color={"primary"} variant={"ghost"} onPress={closeAndRedirect}>
                  Home
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
