"use client"
import React, { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel.jsx";
import Card from "@/components/Card";
import useProductApi from "@/api/useProductApi";
import Image from "next/image";

const Img = [
  "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1563355/pexels-photo-1563355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
];

export default function Page() {
  const { getProduct } = useProductApi();
  const [products, setProducts] = useState([]);
  const plugin = useRef(Autoplay({ delay: 6000, stopOnInteraction: true }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProduct();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();
  }, []);

  const filterProductsByType = (type) => products.filter((product) => product.type === type);

  return (
    <div className="w-full mt-[7rem] grid place-items-center">
      <Carousel
        plugins={[plugin.current]}
        className="w-full  h-[30rem] bg-slate-200 overflow-hidden"
      >
        <CarouselContent>
          {Img.map((src, index) => (
            <CarouselItem key={index}>
              <Image src={src} alt="" width={1000} height={100} className="w-full" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="my-[4rem] font-bold text-[2rem] flex justify-center">
        <div className="w-[60rem] text-center opacity-30">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, quis Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
        </div>
      </div>
      <div id="dress" className="grid grid-cols-3 gap-x-[6rem]">
        {filterProductsByType("Dress").map((product, index) => (
          <Card product={product} key={index} />
        ))}
      </div>
      <div className="my-[4rem] font-bold text-[2rem] flex justify-center">
        <div className="w-[60rem] text-center opacity-30">
          <p>JEWELLERY</p>
        </div>
      </div>
      <div id="jewellery" className="grid grid-cols-3 gap-x-[6rem]">
        {filterProductsByType("Jewellery").map((product, index) => (
          <Card product={product} key={index} />
        ))}
      </div>
    </div>
  );
}
