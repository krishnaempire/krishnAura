"use client"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel.jsx"
import { useEffect, useRef, useState } from "react"
import Card from "@/components/Card"
import Image from "next/image"
import useProductApi from "@/api/useProductApi"

const Img = [
  "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1563355/pexels-photo-1563355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
]

export default function page() {
  const { getProduct } = useProductApi()
  const [product, setProduct] = useState()


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProduct();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []);


  const plugin = useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true })
  )
  return (
    <>
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
        {product?.map((product, index) => (
          product?.type === "Dress" ? (
            <div id="dress" className="grid grid-cols-3 gap-x-[6rem]" key={index}>
              <Card product={product} />
            </div>
          ) : (
            <div id="jewellery" key={index}>
              <div className="my-[4rem] font-bold text-[2rem] flex justify-center">
                <div className="w-[60rem] text-center opacity-30">
                  <p>JEWELLERY</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-x-[6rem]">
                <Card product={product} />
              </div>
            </div>
          )
        ))}

      </div>
    </>
  )
}
