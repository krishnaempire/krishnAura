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
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { ScrollShadow } from "@nextui-org/react";
import Cart from "./Cart";
import KA from "../../public/KA.png";
import Image from "next/image";
import useGetUser from "@/api/getUser";
import useCartApi from "@/api/useCartApi";
import { useRouter } from "next/navigation"; // To redirect

export default function NavBar() {

  const { getCart } = useCartApi();
  const { updateSession } = useGetUser();
  const [refreshCart, setRefreshCart] = useState(false)

  const user = useSelector(
    (state) => state.user.userData,
    shallowEqual
  );
  const router = useRouter(); // Used for redirection
  const [products, setProducts] = useState()

  const handleCartClick = async () => {
    console.log("trigger")
    if (user?._id) {
      const product = await getCart(user?._id);
      setProducts(product)
    } else {
      router.push("/auth");
    }
  };

  useEffect(() => {
    if (refreshCart) {
      handleCartClick();
    }
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
      <Navbar shouldHideOnScroll maxWidth="full" height={"7rem"} className="z-10 fixed top-0">
        <NavbarBrand className="relative left-[1rem]">
          <Link href="/" className="font-bold Link-inherit">
            <Image src={KA} alt="" className="md:w-[12rem] md:h-[5rem] w-[9rem] h-[4rem]" />
          </Link>
        </NavbarBrand>
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
            <Link href={user?._id ? `/profile/${user?._id}` : "/auth"} className="text-[1.3rem] hover:scale-125 transform duration-300">
              <FaRegUser />
            </Link>
          </div>
          <div className="sm:hidden">
          <Dropdown>
                <DropdownTrigger>
                  <Button
                    className="capitalize bg-[#d4a72c] text-white rounded-[1rem] py-[1.5rem] w-[7.3rem] font-medium"
                  >
                    Menu
                  </Button>
                </DropdownTrigger>
              <DropdownMenu variant="faded" aria-label="Menu">
                <DropdownItem key="Profile">
                  <Link href={user?._id ? `/profile/${user?._id}` : "/auth"} className="font-semibold">
                    Profile
                  </Link>
                </DropdownItem>
                <DropdownItem key="Order">
                  <Link href={user?._id ? `/order` : "/auth"} color="foreground" className="font-semibold">
                    Orders
                  </Link>
                </DropdownItem>
                <DropdownItem key="dress">
                  <Link href={"/#dress"} className="font-semibold">Clothes</Link>
                </DropdownItem>
                <DropdownItem key="jewelry">
                  <Link href={"/#jewellery"} className="font-semibold">Jewellery</Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="mx-4 ">
            <Sheet>
              <SheetTrigger
                className="text-[1.4rem] hover:scale-125 transform duration-300 border-none"
                onClick={handleCartClick}
                disabled={!user?._id}
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
