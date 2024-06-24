"use client";

import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { shallowEqual, useSelector } from "react-redux";
import Link from "next/link";
import profile from "../../public/profile.png"
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { ScrollShadow } from "@nextui-org/react";
import Cart from "./Cart";
import KA from "../../public/KA.png";
import Image from "next/image";
import useGetUser from "@/api/getUser";
import useCartApi from "@/api/useCartApi";
import { useRouter } from "next/navigation"; // To redirect

export default function NavBar() {
  const { getCart, addToCart } = useCartApi();
  const { updateSession } = useGetUser();
  const [refreshCart, setRefreshCart] = useState(false)
  const user = useSelector(
    (state) => state.user.userData,
    shallowEqual
  );
  const [products, setProducts] = useState()

  const handleCartClick = async () => {
    if (user?._id) {
      const product = await getCart(user?._id);
      setProducts(product)
    } else {
      const cart = JSON.parse(sessionStorage.getItem('guestCart'))
      setProducts(cart)
    }
  };


  useEffect(() => {
      handleCartClick();
  }, [refreshCart]);

  useEffect(() => {
    (async () => {
      if (user?._id) {
        return
      }
      await updateSession();
    })();
  }, []);



  return (
    <>
      <Navbar
        shouldHideOnScroll
        maxWidth="full"
        height={"7rem"}
        className="z-10 fixed top-0"
        >
        <NavbarContent justify="start">
          <NavbarBrand className="relative md:left-[1rem]">
            <Link href="/" className="font-bold Link-inherit">
              <Image src={KA} alt="" className="md:w-[12rem] md:h-[5rem] w-[9rem] h-[4rem]" />
            </Link>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="hidden sm:flex gap-10" justify="center">
          <NavbarItem>
            <Dropdown backdrop="blur">
              <DropdownTrigger>
                <Button className="pointer bg-transparent font-semibold">SHOP</Button>
              </DropdownTrigger>
              <DropdownMenu variant="faded" aria-label="Shop Categories">
                <DropdownItem key="new">
                  <Link href={"/#dress"}>Clothes</Link>
                </DropdownItem>
                <DropdownItem key="jewelry">
                  <Link href={"/#jewellery"}>Jewellery</Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} href={user?._id ? `/order` : "/auth"} color="foreground" className="font-semibold">
              Orders
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <div className="hidden sm:flex">
            <Link href={user?._id ? `/profile` : "/auth"} className="text-[1.3rem] lg:hover:scale-125 transform duration-300">
              <Image src={profile} alt='profile' width={80} height={80} className='w-[2rem] h-[2rem] rounded-full' />
            </Link>
          </div>
          <div className="sm:hidden">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant={"bordered"}
                  className="capitalize  text-[#d4a72c] rounded-[1rem] py-[1.3rem] w-[5rem] font-medium"
                >
                  Menu
                </Button>
              </DropdownTrigger>
              <DropdownMenu variant="faded" aria-label="Menu">
                <DropdownItem key="Profile">
                  <Button as={Link} href={user?._id ? `/profile` : "/auth"} className="font-semibold bg-transparent">
                    <Image src={profile} alt='profile' width={80} height={80} className='w-[2rem] h-[2rem] rounded-full' />
                  </Button>
                </DropdownItem>
                <DropdownItem key="Order">
                  <Button as={Link} href={user?._id ? `/order` : "/auth"} color="foreground" className="font-semibold bg-transparent">
                    Orders
                  </Button>
                </DropdownItem>
                <DropdownItem key="dress">
                  <Button as={Link} href={"/#dress"} className="font-semibold bg-transparent">Clothes</Button>
                </DropdownItem>
                <DropdownItem key="jewelry">
                  <Button as={Link} href={"/#jewellery"} className="font-semibold bg-transparent">Jewellery</Button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="mx-4 mt-[.4rem] ">
            <Sheet>
              <SheetTrigger
                className="text-[1.4rem] lg:hover:scale-125 transform duration-300 border-none"
                onClick={handleCartClick}
              >
                <HiOutlineShoppingBag


                />
              </SheetTrigger>
              <SheetContent>
                <ScrollShadow className=" w-full h-full border-none">
                  <Cart products={products} setRefreshCart={setRefreshCart} />
                </ScrollShadow>
              </SheetContent>
            </Sheet>
          </div>
        </NavbarContent>

      </Navbar>
    </>
  );
}
