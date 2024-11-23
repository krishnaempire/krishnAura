"use client";

import { cn } from "@/lib/utils";
import { Avatar } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = false,
    className,
    rotate
}) => {
    const containerRef = React.useRef(null);
    const scrollerRef = React.useRef(null);

    useEffect(() => {
        addAnimation();
    }, []);
    const [start, setStart] = useState(false);
    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }
    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "forwards"
                );
            } else {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "reverse"
                );
            }
        }
    };
    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "20s");
            } else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "40s");
            } else {
                containerRef.current.style.setProperty("--animation-duration", "80s");
            }
        }
    };
    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative max-w-7xl overflow-hidden",
                className
            )}
        >
            <div
                ref={scrollerRef}
                className={cn(
                    " flex min-w-full shrink-0 gap-8 w-max flex-nowrap",
                    start && "animate-scroll ",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
            >
                {items.map((item, idx) => (
                    <div key={item.name} className={`w-[15rem] h-[17rem] sm:w-[18rem] sm:h-[14rem] border-[1px]  border-[#000000] bg-[#FFD700)] rounded-[1.2rem]`}
                    >
                        <div className=" relative top-6 left-4 w-[90%] flex flex-col gap-4" >
                            <div className='flex items-center'>
                                <Avatar src='' className='w-[3rem] h-[3rem]' />
                                <div className='ml-[.5rem] text-[1rem] '>
                                    <p>username</p>
                                    <p>full name</p>
                                </div>
                            </div>
                            <div className="text-[.9rem]">
                                {item.quote}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};