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
import Footer from "@/components/Footer";
import { Pagination, Spinner } from "@nextui-org/react";

const Img = [
  "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1563355/pexels-photo-1563355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
];

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { getAllProduct } = useProductApi();
  const [products, setProducts] = useState([]);
  const plugin = useRef(Autoplay({ delay: 6000, stopOnInteraction: true }));
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchData = async (page) => {
      setFetching(true)
      try {
        const data = await getAllProduct(page);
        setProducts(data.products);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setFetching(false)
      }
    };
    fetchData(currentPage);
  }, [currentPage]);


  // if (!products) {
  //   return (
  //     <div className='w-full h-screen flex justify-center items-center'>
  //       <Spinner size='lg' />
  //     </div>
  //   );
  // }



  const filterProductsByType = (type) => products.filter((product) => product.type === type);

  return (
    <div className="w-full mt-[7rem] grid place-items-center">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-[15rem]  md:h-[30rem]  bg-slate-200 overflow-hidden"
      >
        <CarouselContent>
          {Img.map((src, index) => (
            <CarouselItem key={index}>
              <Image src={src} alt="" width={1000} height={100} className="w-full " />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="my-[4rem] font-bold sm:text-[2rem] text-[1.5rem] flex justify-center">
        <div className="lg:w-[60rem] sm:w-[40rem] w-[25rem] text-wrap text-center opacity-30">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, quis Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
        </div>
      </div>
      <div id="dress" className="flex flex-wrap md:gap-[6rem] gap-[2rem] w-full justify-center">
        {filterProductsByType("Dress").map((product, index) => (
          <Card product={product} key={index} />
        ))}
      </div>
      <div className="my-[4rem] font-bold text-[2rem] flex justify-center">
        <div className=" text-center opacity-30">
          <p>JEWELLERY</p>
        </div>
      </div>
      <div id="jewellery" className="flex flex-wrap md:gap-[6rem] gap-[2rem] w-full justify-center">
        {filterProductsByType("Jewellery").map((product, index) => (
          <Card product={product} key={index} />
        ))}
      </div>
      <div className="overflow-hidden flex justify-center mb-5 mt-[4rem]">
        <Pagination
          total={totalPages}
          classNames={{
            cursor: "bg-gradient-to-b shadow-lg from-default-900 to-default-800 text-white font-bold",
          }}
          page={currentPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
      <Footer />
    </div>
  );
}
