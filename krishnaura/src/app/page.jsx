"use client"
import React, { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel.jsx";
import Card from "@/components/Card";
import Slider1 from "../../public/Slider1.png"
import Slider2 from "../../public/Slider2.png"
import Slider3 from "../../public/Slider3.png"
import Slider4 from "../../public/Slider4.png"
import Slider5 from "../../public/Slider5.png"
import SmSlider1 from "../../public/SmSlider1.png"
import SmSlider2 from "../../public/SmSlider2.png"
import SmSlider3 from "../../public/SmSlider3.png"
import SmSlider4 from "../../public/SmSlider4.png"
import SmSlider5 from "../../public/SmSlider5.png"
import useProductApi from "@/api/useProductApi";
import Image from "next/image";
import Footer from "@/components/Footer";
import { Pagination } from "@nextui-org/react";

const Img = [
  Slider1,
  Slider2,
  Slider3,
  Slider4,
  Slider5
];

const Img1 = [
  SmSlider1,
  SmSlider2,
  SmSlider3,
  SmSlider4,
  SmSlider5
];

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { getAllProduct } = useProductApi();
  const [products, setProducts] = useState([]);
  const plugin = useRef(Autoplay({ delay: 6000, stopOnInteraction: true }));
  const [fetching, setFetching] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateScreenWidth); // Add event listener for screen resize
    return () => {
      window.removeEventListener('resize', updateScreenWidth); // Cleanup on component unmount
    };
  }, []);

  useEffect(() => {
    const fetchData = async (page) => {
      setFetching(true);
      try {
        const data = await getAllProduct(page);
        setProducts(data.products);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setFetching(false);
      }
    };
    fetchData(currentPage);
  }, [currentPage]);

  const filterProductsByType = (type) => products.filter((product) => product.type === type);

  const imagesToShow = screenWidth >= 768 ? Img : Img1;

  return (
    <div className="w-full mt-[7rem] grid place-items-center">
      <Carousel
        plugins={[plugin.current]}
        className="w-full lg:h-[30rem] md:h-[18rem] h-[13rem]  bg-slate-200 overflow-hidden"
      >
        <CarouselContent>
          {imagesToShow.map((src, index) => (
            <CarouselItem key={index}>
              <Image src={src} alt="" width={1000} height={100} className="w-full" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="my-[4rem] font-bold flex justify-center">
        <div className="lg:w-[60rem] sm:w-[40rem] w-[25rem] text-wrap text-center opacity-30">
          <p className="font-bold sm:text-[2rem] text-[1.5rem]">Welcome to the World of Divine Beauty</p>
          <p className="sm:text-[1.5rem] font-medium">Celebrate your Laddu Gopal with our exclusive, handcrafted dresses, each designed to bring out the divine charm and grace.</p>
        </div>
      </div>
      <div id="dress" className="flex flex-wrap md:gap-[6rem] gap-[2rem] w-full justify-center">
        {filterProductsByType("Dress").map((product, index) => (
          <Card product={product} key={index} />
        ))}
      </div>
      <div className="my-[4rem] font-bold text-[2rem] flex justify-center">
        <div className="text-center opacity-30">
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
