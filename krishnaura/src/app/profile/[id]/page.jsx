"use client"

import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import profile from "../../../../public/profile.png"
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import useUserApi from '@/api/userApi/useUserApi'
import Link from 'next/link'

const Profile = () => {
  const router = useRouter()
  const { id } = useParams()
  const { getUser, logout } = useUserApi()
  const [user, setUser] = useState([])

  useEffect(() => {
    (async () => {
      const res = await getUser(id)
      setUser(res)
    })()
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/")

  }

  return (
    <>
      <div className='w-[50%] m-auto h-screen flex justify-center items-center'>
        <div className='flex gap-2 items-center'>

          <Image src={profile} alt='profile' width={80} height={80} className='w-[5rem] h-[5rem] rounded-full' />
          <div>
            <p className='text-[1.5rem] font-medium'>{user?.fullName}</p>
            <p className='text-[1.5rem] font-medium'>{user?.email}</p>
          </div>
          <div className='flex items-center gap-[3rem]'>
            <div className='w-[1.5px] bg-gray-300 h-[4rem] ml-3'></div>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                >
                  Open Menu
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">Orders</DropdownItem>
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
            <Button as={Link} href={`/add-product/${id}`} variant={"bordered"} >Add Product</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
