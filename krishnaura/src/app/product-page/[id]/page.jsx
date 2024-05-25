"use client"
import React, { useEffect, useState } from 'react';
import useProductApi from '@/api/useProductApi';
import { useParams, useRouter } from 'next/navigation';
import { shallowEqual, useSelector } from 'react-redux';
import { Spinner } from '@nextui-org/react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function ProductPage() {
  const user = useSelector(
    (state) => state.user.userData,
    shallowEqual
  );
  const router = useRouter();
  const { getProduct } = useProductApi();
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProduct(id);
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
      }
    }
  }, [product]);

  const handleSizeClick = (sizeName) => {
    setSelectedSize(sizeName);

    const size = product.size.find((s) => s.name === sizeName);
    if (size) {
      setPrice(size.price); // Set the price based on the selected size
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
      const queryString = `checkout?id=${id}&quantity=${quantity}&size=${selectedSize}&color=${selectedColor}`;
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
    <div className="mx-auto mt-[7rem] max-w-7xl px-4 md:px-8 2xl:px-16">
      <div className="block grid-cols-9 items-start gap-x-10 pb-10 pt-7 lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20">
        {/* Images */}
        <div className="hidden  col-span-5 md:grid grid-cols-2 gap-2.5">
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
        <Carousel className="w-full max-w-xs m-auto">
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
            <p className="text-body text-sm leading-6 lg:text-base lg:leading-8">
              {product?.description}
            </p>

            {/* Price Section */}
            <div className="mt-5 flex items-center">
              <div className="text-heading pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl 2xl:pr-0 2xl:text-4xl">
                Rs {price}.00 {/* Display updated price based on the selected size */}
              </div>
              <span className="font-segoe pl-2 text-sm text-gray-400 line-through md:text-base lg:text-lg xl:text-xl">
                Rs {product?.offPrice}.00
              </span>
            </div>
          </div>

          {/* Size and Color Selection */}
          <div className="border-b border-gray-300 pb-3">
            {/* Size Selection */}
            <div className="mb-4">
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
          <div className="space-s-4 3xl:pr-48 flex items-center gap-2 border-b border-gray-300 py-8  md:pr-32 lg:pr-12 2xl:pr-32">
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
            <button
              type="button"
              onClick={handleCheckOut}
              className="h-11 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
