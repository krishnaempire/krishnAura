"use client"
import React, { useEffect, useState } from 'react';
import useProductApi from '@/api/useProductApi';
import { useParams, useRouter } from 'next/navigation';
import { shallowEqual, useSelector } from 'react-redux';
import { Button, Modal, ModalBody, ModalContent, ModalHeader, Spinner, useDisclosure } from '@nextui-org/react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import useCartApi from '@/api/useCartApi';
import SizeChart from "../../../../public/SizeChart.png"
import { RiShareForwardLine } from "react-icons/ri";
import ProductSuggestion from '@/components/ProductSuggestion';

export default function ProductPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const user = useSelector(
    (state) => state.user.userData,
    shallowEqual
  );
  const { addToCart } = useCartApi()
  const router = useRouter();
  const { getProductById } = useProductApi();
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [price, setPrice] = useState(0);
  const [off, setOff] = useState(0);
  const [offPrice, setOffPrice] = useState(0);
  const [screenWidth, setScreenWidth] = useState(null);
  const [copied, setCopied] = useState(false);

  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.addEventListener("resize", updateScreenWidth);
    return () => window.removeEventListener("resize", updateScreenWidth);
  }, []);

  const handleShare = async () => {
    const currentUrl = window.location.href;

    // Check if the Web Share API is supported
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: "Check out this page!",
          url: currentUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback to copying the link if the Web Share API is not supported
      try {
        await navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied state
      } catch (error) {
        console.error("Failed to copy link:", error);
      }
    }
  };
  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(id);
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.color[0]?.name || '');
      setSelectedSize(product.size[0]?.name || '');

      // Set default price based on the first available size
      if (product.size.length > 0) {
        setPrice(product.size[0].price);
        setOff(product.size[0].offPercentage);
        setOffPrice(product.size[0].offPrice);
      }
    }
  }, [product]);

  const handleSizeClick = (sizeName) => {
    setSelectedSize(sizeName);

    const size = product.size.find((s) => s.name === sizeName);
    if (size) {
      setPrice(size.price); // Set the price based on the selected size
      setOff(size.offPercentage)
      setOffPrice(size.offPrice)
    }
  };

  const handleAddToCart = () => {
    if (user && user._id) {
      addToCart({ userId: user._id, productId: product._id, selectedColor: selectedColor, selectedSize: selectedSize, quantity: quantity });
    } else {
      const cart = JSON.parse(sessionStorage.getItem('guestCart')) || [];
      const item = {
        ...product,
        selectedColor: selectedColor,
        selectedSize: selectedSize,
        quantity,
        cartId: 1
      }
      cart.push(item);
      sessionStorage.setItem('guestCart', JSON.stringify(cart));
    }
  };



  const handleColorClick = (colorName) => {
    setSelectedColor(colorName);
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleCheckOut = () => {
    if (!user?._id) {
      router.push('/auth');
      return;
    }
    if (product && selectedSize && selectedColor) {
      const queryString = `checkout?id=${id}&quantity=${quantity}&size=${selectedSize}&color=${selectedColor}&cart=${false}`;
      router.push(queryString);
    }
  };

  if (!product) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  return (
    <div className={`mx-auto mt-[9rem]  ${screenWidth > 1500 ? "w-[90rem]" : "max-w-7xl"} px-4 md:px-8 2xl:px-16`}>
      <div className={`grid-cols-9 items-start gap-x-10 pb-10 pt-7 ${screenWidth > 1024 ? "grid" : "block"} lg:pb-14 xl:gap-x-14 2xl:pb-20`}>
        {/* Images */}
        <div className="hidden col-span-5 md:grid grid-cols-2 gap-2.5">
          {product?.productImages?.map((url, index) => (
            <div key={index} className="w-[20rem] h-[15rem] transition duration-150 ease-in hover:opacity-90">
              <Image
                src={url}
                width={320}
                height={240}
                alt="product image"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <Carousel className="w-full sm:hidden max-w-xs m-auto">
          <CarouselContent>
            {product?.productImages?.map((url, index) => (
              <CarouselItem key={index}>
                <Image
                  src={url}
                  width={320}
                  height={240}
                  alt="product image"
                  className="w-full h-full object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {/* Product Information */}
        <div className="col-span-4 pt-8 lg:pt-0">
          {/* Product Details */}
          <div className="mb-7 border-b border-gray-300 pb-7">
            <h2 className="text-heading mb-3.5 text-lg font-bold md:text-xl lg:text-2xl 2xl:text-3xl">
              {product?.name}
            </h2>
            <div className=" md:hidden mt-5 flex items-center">
              <div className="text-heading pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl 2xl:pr-0 2xl:text-4xl">
                Rs {offPrice}.00 {/* Display updated price based on the selected size */}
              </div>
              <span className="font-segoe pl-2 text-sm text-gray-400 line-through md:text-base lg:text-lg xl:text-xl">
                Rs {price}.00
              </span>
              <span className="font-segoe pl-2 text-sm text-red-700 line-through md:text-base lg:text-lg xl:text-xl">
                {off}%
              </span>
            </div>
            <p className="text-body text-sm leading-6 lg:text-base lg:leading-8">
              {product?.description}
            </p>

            {/* Price Section */}
            <div className="mt-5 hidden md:flex items-center">
              <div className="text-heading pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl 2xl:pr-0 2xl:text-4xl">
                Rs {offPrice}.00 {/* Display updated price based on the selected size */}
              </div>
              <span className="font-segoe pl-2 text-sm text-gray-400 line-through md:text-base lg:text-lg xl:text-xl">
                Rs {price}.00
              </span>
              <span className="font-segoe pl-2 text-sm text-red-700 line-through md:text-base lg:text-lg xl:text-xl">
                {off}%
              </span>
            </div>
          </div>

          {/* Size and Color Selection */}
          <div className="border-b border-gray-300 pb-3">
            {/* Size Selection */}
            <div className="mb-4">
              <div className='flex gap-2'>

                <Button className='mb-2' onPress={onOpen} variant={"bordered"}>Size Chart</Button>
                <Button onClick={handleShare} variant="bordered">
                  {copied ? "Link Copied!" : <><RiShareForwardLine className='text-[1.1rem]' /> Share</>}
                </Button>

              </div>
              <h3 className="text-heading mb-2.5 text-base font-semibold capitalize md:text-lg">
                Size
              </h3>
              <ul className="colors -mr-3 flex flex-wrap">
                {product?.size.map((size, index) => (
                  <li
                    key={index}
                    className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm"
                    onClick={() => handleSizeClick(size.name)}
                    style={{
                      border: `1px solid ${size.name === selectedSize ? "black" : "transparent"}`
                    }}
                  >
                    {size.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Color Selection */}
            <div className="mb-4">
              <h3 className="text-heading mb-2.5 text-base font-semibold capitalize md:text-lg">
                Color
              </h3>
              <ul className="colors -mr-3 flex flex-wrap">
                {product?.color.map((color, index) => (
                  <li
                    key={index}
                    className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm"
                    onClick={() => handleColorClick(color.name)}
                    style={{
                      border: `1px solid ${color.name === selectedColor ? "black" : "transparent"}`
                    }}
                  >
                    <span className={`block h-full w-full rounded-full`}
                      style={{ backgroundColor: color.name }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quantity and Checkout */}
          <div className=" bottom-1 space-s-4 3xl:pr-48 flex items-center gap-2 border-b border-gray-300 py-8  md:pr-32 lg:pr-12 2xl:pr-32">
            <div className="group flex h-11 flex-shrink-0 items-center justify-between overflow-hidden rounded-md border border-gray-300 md:h-12">
              {/* Increment and Decrement */}
              <button
                className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-s border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
                onClick={handleDecrement}
              >
                -
              </button>
              <span className="duration-250 text-heading flex h-full w-12 flex-shrink-0 cursor-default items-center justify-center text-base font-semibold transition-colors ease-in-out md:w-20 xl:w-24">
                {quantity}
              </span>
              <button
                className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-e border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
                onClick={handleIncrement}
              >
                +
              </button>
            </div>


            {/* Checkout Button */}
            <div className='fixed z-10 bottom-2 lg:static lg:bottom-0 flex w-[95%] gap-2 right-[.7rem]'>
              <button
                type="button"
                onClick={handleAddToCart}
                className="h-11 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Cart
              </button>
              <button
                type="button"
                onClick={handleCheckOut}
                className="h-11 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Order Now
              </button>
            </div>

          </div>
          <p className="text-body text-sm leading-6 mb-[5rem] lg:text-base lg:leading-8 whitespace-pre-wrap">
            {product?.about}
          </p>

        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className='mb-[6rem] md:mb-0'>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Size Chart</ModalHeader>
              <ModalBody>
                <Image width={1000} height={1000} alt='Size Chart' src={SizeChart} />
              </ModalBody>

            </>
          )}
        </ModalContent>
      </Modal>
      <ProductSuggestion />
    </div>
  );
}