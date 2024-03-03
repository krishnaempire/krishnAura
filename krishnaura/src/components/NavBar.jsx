"use client"
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useSelector } from "react-redux";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { ScrollShadow } from "@nextui-org/react";
import Cart from "./Cart";
// import Image from "next/image";
import KA from "../../public/KA.png"
import Image from "next/image";



export default function NavBar() {
    const user = useSelector(state => state.user.userData)

    // console.log(userData)
    return (
        <>
            <Navbar shouldHideOnScroll  maxWidth="full" height={"8rem"} className="z-10 fixed top-0" >
                <NavbarBrand className="relative left-[3rem]">
                    {/* <AcmeLogo /> */}
                    <Link href="/" className="font-bold Link-inherit">
                        <Image src={KA} className="w-[12rem] h-[12rem]"/>
                    </Link>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-10" justify="center">
                    <NavbarItem>
                        <Dropdown backdrop="blur">

                            <DropdownTrigger>
                                <Button
                                    className="pointer bg-transparent font-semibold"
                                >
                                    SHOP
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu variant="faded" aria-label="Static Actions">
                                <DropdownItem key="new">Clothes</DropdownItem>
                                <DropdownItem key="copy">Jewellery</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>
                    <NavbarItem isActive>
                        <Button color="foreground" className="font-semibold">
                            Customers
                        </Button>
                    </NavbarItem>
                    <NavbarItem>
                        <Button color="foreground" className="font-semibold" >
                            Integrations
                        </Button>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    <div className="hidden lg:flex">
                        <Link href="/auth" className="text-[1.3rem] hover:scale-125 transform duration-300">
                            <FaRegUser />
                        </Link>
                    </div>
                    <div className="mx-4 mt-1.5">
                        <Sheet>
                            <SheetTrigger className="text-[1.4rem] hover:scale-125 transform duration-300 border-none">
                            <HiOutlineShoppingBag />
                            </SheetTrigger>
                            <SheetContent>
                                <ScrollShadow className="w-full h-full border-none">
                                    <Cart />
                                </ScrollShadow>
                            </SheetContent>
                        </Sheet>
                    </div>
                </NavbarContent>

            </Navbar>
        </>
    );
}
