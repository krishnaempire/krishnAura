"use client"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel.jsx"
import { useRef } from "react"

export default function page() {
  const plugin = useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true })
  )
  return (
    <div className="w-full h-[25rem]">

      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-xs h-[15rem] bg-slate-200"
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              {index + 1}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>


    </div>
  )
}
