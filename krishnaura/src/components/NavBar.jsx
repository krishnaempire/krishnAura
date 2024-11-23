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
import { FaRegUser } from "react-icons/fa6";

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
    <div className={"bg-[#F4E1D2] w-full text-black sm:text-[.8rem] z-20 text-[.7rem] hidden sm:fixed top-0 py-2 sm:flex justify-center items-center"}><span>FLAT25 for upto Rs.500OFF on 2000 I FLAT10 for 10%OFF on Rs.899</span></div>
      <Navbar
        shouldHideOnScroll
        maxWidth="full"
        height={"7rem"}
        className="bg-[#FFFFF0] z-10 fixed top-0 sm:top-[2rem]"
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
          <NavbarItem>
            <Button as={Link} href={`/bulk-order`} color="foreground" className="font-semibold">
              Bulk Order
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <div className="hidden sm:flex">
            <Link href={user?._id ? `/profile` : "/auth"} className="text-[1.3rem] lg:hover:scale-125 transform duration-300">
              <FaRegUser />
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
                <DropdownItem key="bulkorder">
                  <Button as={Link} href={`/bulk-order`} color="foreground" className="font-semibold">
                    Bulk Order
                  </Button>
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
