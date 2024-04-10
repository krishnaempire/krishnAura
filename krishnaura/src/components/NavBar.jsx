"use client"
import React, { useEffect } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useSelector } from "react-redux"
import Link from "next/link";
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { ScrollShadow } from "@nextui-org/react";
import Cart from "./Cart";
import KA from "../../public/KA.png"
import Image from "next/image";
import getUser from "@/api/getUser";



export default function NavBar() {
    const { updateSession } = getUser()
    const user = useSelector(state => state.user.userData)

    useEffect(() => {
        (async () => {
            await updateSession()
        })()
    }, [])


    return (
        <>
            <Navbar shouldHideOnScroll maxWidth="full" height={"7rem"} className="z-10 fixed top-0" >
                <NavbarBrand className="relative left-[3rem]">
                    {/* <AcmeLogo /> */}
                    <Link href="/" className="font-bold Link-inherit">
                        <Image src={KA} alt="" className="w-[12rem] h-[12rem]" />
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
                                    <DropdownItem key="new">
                                        <Link href={"/#dress"}>Clothes</Link>
                                    </DropdownItem>
                                    <DropdownItem key="copy">
                                        <Link href={"/#jewellery"}>Jewellery</Link>
                                    </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>
                    <NavbarItem isActive>
                        <Button as={Link} href={user?._id ? `/order/${user?._id}` : "/auth"} color="foreground" className="font-semibold">
                            Orders
                        </Button>
                    </NavbarItem>
                    {/* <NavbarItem>
                        <Button color="foreground" className="font-semibold" >
                            Integrations
                        </Button>
                    </NavbarItem> */}
                </NavbarContent>
                <NavbarContent justify="end">
                    <div className="hidden lg:flex">

                        <Link href={user?._id ? `/profile/${user?._id}` : "/auth"} className="text-[1.3rem] hover:scale-125 transform duration-300">
                            <FaRegUser />
                        </Link>
                    </div>
                    <div className="mx-4 mt-1.5">
                        <Sheet>
                            <SheetTrigger disabled={true} className="text-[1.4rem] hover:scale-125 transform duration-300 border-none">
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
