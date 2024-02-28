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
import { BsBasket3 } from "react-icons/bs";
import { Cart } from "./cart";
import { ScrollShadow } from "@nextui-org/react";

export default function NavBar() {
    const user = useSelector(state => state.user.userData)

    // console.log(userData)
    return (
        <>
            <div className="w-full">

                <Navbar shouldHideOnScroll maxWidth="full" >
                    <NavbarBrand className="relative left-[3rem]">
                        {/* <AcmeLogo /> */}
                        <Link href="/" className="font-bold Link-inherit">ACME</Link>
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
                                    <DropdownItem key="copy">Jewelry</DropdownItem>
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
                        <NavbarItem className="hidden lg:flex">
                            <Link href={'/auth'} className="text-[1.3rem]">
                                {<FaRegUser />}
                            </Link>
                        </NavbarItem>
                        <NavbarItem className="mx-4">
                            <Button className="text-[1.3rem] bg-transparent">
                                <Sheet>
                                    <SheetTrigger className="text-[1.3rem]">{<BsBasket3 />}</SheetTrigger>
                                    <SheetContent>
                                        <ScrollShadow className="w-full h-full">
                                            <Cart />
                                        </ScrollShadow>
                                    </SheetContent>
                                </Sheet>

                            </Button>

                        </NavbarItem>
                    </NavbarContent>
                </Navbar>
            </div>
        </>
    );
}
