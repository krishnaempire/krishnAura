"use client"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel.jsx"
import { useRef } from "react"
import Card from "@/components/Card"

export default function page() {
  const plugin = useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true })
  )
  return (
    <div className="w-full h-[25rem] mt-[8rem] grid place-items-center">
      <Carousel
        plugins={[plugin.current]}
        className="w-full  h-[25rem] bg-slate-200"
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              {index + 1}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="my-[4rem] font-bold text-[2rem] flex justify-center">
        <div className="w-[60rem] text-center">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, quis Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>

        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-[6rem]">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />

      </div>
      <div className="my-[4rem] font-bold text-[2rem] flex justify-center">
        <div className="w-[60rem] text-center">
          <p>JWELLERY</p>

        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-[6rem]">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />

      </div>

    </div>
  )
}
