"use client";
import React, { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel.jsx";
import Card from "@/components/Card";
import Slider1 from "../../public/Slider1.png";
import Slider2 from "../../public/Slider2.png";
import Slider3 from "../../public/Slider3.png";
import Slider4 from "../../public/Slider4.png";
import Slider5 from "../../public/Slider5.png";
import SmSlider1 from "../../public/SmSlider1.png";
import SmSlider2 from "../../public/SmSlider2.png";
import SmSlider3 from "../../public/SmSlider3.png";
import SmSlider4 from "../../public/SmSlider4.png";
import SmSlider5 from "../../public/SmSlider5.png";
import useProductApi from "@/api/useProductApi";
import CardSkeleton from "@/components/skeleton/CardSkeleton"
import Image from "next/image";
import Footer from "@/components/Footer";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { FiFacebook } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import Review from "@/components/Reviews";

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
  const [jewellery, setJewellery] = useState([]);
  const [recentProduct, setRecentProduct] = useState([]);
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  const [fetching, setFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [screenWidth, setScreenWidth] = useState(null);

  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.addEventListener("resize", updateScreenWidth);
    return () => window.removeEventListener("resize", updateScreenWidth);
  }, []);


  const extractJewellery = (products) => {
    const jewelleryProducts = products.filter((product) => product.type === "Jewellery");
    setJewellery((prev) => {
      const uniqueJewellery = jewelleryProducts.filter(
        (newProduct) => !prev.some((existingProduct) => existingProduct._id === newProduct._id)
      );
      return [...prev, ...uniqueJewellery];
    });
  };

  const extractDress = (products) => {
    const dressProducts = products.filter((product) => product.type === "Dress");
    setProducts((prevProducts) => {
      const newProducts = dressProducts.filter(newProduct =>
        !prevProducts.some(prevProduct => prevProduct._id === newProduct._id)
      );
      return [...prevProducts, ...newProducts];
    });

  };

  const fetchMoreData = async () => {
    if (!hasMore || fetching) return;
    setFetching(true);

    try {
      const data = await getAllProduct(currentPage);
      if (data.products.length === 0) {
        setHasMore(false);
        return;
      }

      extractRecentProducts(data.products);
      extractJewellery(data.products);
      extractDress(data.products)

      setCurrentPage((prev) => prev + 1); // Increment page after successful fetch
    } catch (error) {
      console.error("Error fetching product data:", error);
    } finally {
      setFetching(false);
    }
  };


  const fetchMoreProduct = () => {
    if (!hasMore || fetching) return;
    setCurrentPage(prev => prev + 1);
  };

  useEffect(() => {
    fetchMoreData();
  }, [currentPage]);

  // Function to extract recent products
  const extractRecentProducts = (products) => {
    const currentDate = new Date();

    const recentProducts = products.filter((product) => {
      const productDate = new Date(product.createdAt);
      const diffInTime = currentDate - productDate;
      const diffInDays = diffInTime / (1000 * 3600 * 24);
      return diffInDays <= 25;
    });

    setRecentProduct((prev) => {
      const uniqueProducts = recentProducts.filter(
        (newProduct) => !prev.some((existingProduct) => existingProduct._id === newProduct._id)
      );

      return [...prev, ...uniqueProducts];
    });
  };



  const imagesToShow = screenWidth >= 768 ? Img : Img1;

  return (
    <div className="w-full mt-[5rem] sm:mt-[7rem] grid place-items-center">
      {screenWidth !== null && (
        <Carousel
          opts={{
            align: "start",
            loop: "true"
          }}
          plugins={[plugin.current]}
          className="w-full lg:h-[30rem] md:h-[18rem] h-[13rem] overflow-hidden"
        >
          <CarouselContent>
            {imagesToShow.map((src, index) => (
              <CarouselItem key={index}>
                <Image src={src} alt="" width={1000} height={100} className="w-full" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
      <div className="my-[4rem] font-bold flex justify-center">
        <div className="lg:w-[60rem] sm:w-[40rem] w-[25rem] text-wrap text-center ">
          <p className="font-bold sm:text-[2rem] text-[1.5rem]">Welcome to Divine Beauty&#44; Inspired by Krishna Ji&apos;s love.</p>
        </div>
      </div>
      <p className="text-[1.6rem] mb-[2rem]">Bestsellers</p>
      <div id="dress" className="flex flex-wrap md:gap-[6rem] gap-[2rem] w-full justify-center">
        <InfiniteScroll
          dataLength={products.length}
          next={fetchMoreProduct}
          hasMore={hasMore}
          loader={
            <div className={`grid grid-cols-2 gap-[8px] ${screenWidth >= 1024 ? "sm:grid-cols-4" : "md:grid-cols-2"} w-full place-items-center`}>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          } // Improve loading UI
        >
          <div className="text-[1.6rem]">Dress</div>
          <div className={`grid grid-cols-2 gap-[8px] ${screenWidth >= 1024 ? "sm:grid-cols-4" : "md:grid-cols-2"} w-full place-items-center my-4`}>
            {products.map((product, index) => (
              <Card product={product} key={index} />
            ))}
          </div>

          {jewellery[0]?._id && (
            <>
              <div className="text-[1.6rem]">Jewellery</div>
              <div className={`grid grid-cols-2 gap-[8px] ${screenWidth >= 1024 ? "sm:grid-cols-4" : "md:grid-cols-2"} w-full place-items-center my-4`}>
                {jewellery.map((product, index) => (
                  <Card product={product} key={index} />
                ))}
              </div>
            </>
          )}
        </InfiniteScroll>


      </div>
      {recentProduct.length ? (
        <>
          <div className="my-[4rem] font-bold text-[2rem] flex justify-center">
            <div className="text-center opacity-30">
              <p>Newly Added</p>
            </div>
          </div>
          <div id="recentProduct" className={`grid grid-cols-2 ${screenWidth >= 1024 ? "sm:grid-cols-4" : "md:grid-cols-2 gap-[2rem]"} w-full place-items-center px-4`}>
            {recentProduct.map((product, index) => (
              <Card product={product} key={index} />
            ))}
          </div>
        </>
      ) : null}

      <div className="my-[10rem]">
        <Review />
      </div>

      <div className=" flex flex-col gap-2 rounded-full px-2 py-2 fixed sm:top-52 top-40 right-5 text-[1.2rem]">
        <Link href="https://www.instagram.com/krishna_aura_" target="_blank">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-black">
            <FaInstagram />
          </div>
        </Link>
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-black">
          <FaWhatsapp />
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-black">
          <FiFacebook />
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-black">
          <FaXTwitter />
        </div>
      </div>
      <Footer />
    </div>
  );
}
