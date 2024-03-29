"use client"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel.jsx"
import { useRef } from "react"
import Card from "@/components/Card"

const Img = [
   "https://images.unsplash.com/photo-1542396601-dca920ea2807?q=80&w=1502&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
   "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
   "https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
   "https://images.pexels.com/photos/1563355/pexels-photo-1563355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
]

export default function page() {
  const plugin = useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true })
  )
  return (
    <>
      <div className="w-full mt-[6rem] grid place-items-center">

        <Carousel
          plugins={[plugin.current]}
          className="w-full  h-[30rem] bg-slate-200 overflow-hidden"
        >
          <CarouselContent>
            {Img.map((src, index) => (
              <CarouselItem key={index}>
                <img src={src} alt className="w-full" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="my-[4rem] font-bold text-[2rem] flex justify-center">
          <div className="w-[60rem] text-center opacity-30">
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
          <div className="w-[60rem] text-center opacity-30">
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
    </>
  )
}
