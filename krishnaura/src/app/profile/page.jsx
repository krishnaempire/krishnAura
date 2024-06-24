"use client"

import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import profile from "../../../public/profile.png"
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import useUserApi from '@/api/userApi/useUserApi'
import Link from 'next/link'
import { shallowEqual, useSelector } from 'react-redux'

const Profile = () => {
  const router = useRouter()
  const { id } = useParams()
  const user = useSelector(
    (state) => state.user.userData,
    shallowEqual
  );
  const { logout } = useUserApi()

  
  const handleLogout = () => {
    logout()
    router.push("/")

  }

  return (
    <>
      <div className='w-[50%] m-auto h-screen flex justify-center items-center'>
        <div className='flex flex-col gap-2 items-center '>

          <Image src={profile} alt='profile' width={80} height={80} className='w-[5rem] h-[5rem] rounded-full' />
          <div>
            <p className='text-[1.5rem] font-medium'>{user?.fullName}</p>
            <p className='text-[1.5rem] font-medium'>{user?.email}</p>
          </div>
          <div className='flex  justify-center items-center gap-[3rem]'>
            <div className='flex justify-center  items-center md:gap-[3rem] gap-[1rem] '>

              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="bordered"
                  >
                    Open Menu
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="new">
                    <Link as={Link} href={user?._id ? `/order` : "/auth"} color="foreground" className="font-semibold bg-transparent">
                      Orders
                    </Link>
                  </DropdownItem>
                  <DropdownItem key="copy">
                    <Link href={"update"}>
                      Update Profile
                    </Link>
                  </DropdownItem>
                  <DropdownItem key="delete" className="text-danger" color="danger" onClick={handleLogout}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              {user.isAdmin && (
                <Button as={Link} href={`/add-product/${id}`} variant={"bordered"} >Add Product</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
