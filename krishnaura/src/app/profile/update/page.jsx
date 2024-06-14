"use client"
import React, { useEffect, useState } from 'react';
import { Input, Button, Spinner } from "@nextui-org/react";
import { shallowEqual, useSelector } from 'react-redux';
import useUserApi from '@/api/userApi/useUserApi';
import { useToast } from '@/components/ui/use-toast';
import useGetUser from '@/api/getUser';

const UpdateProfile = () => {
    const { updateSession } = useGetUser()
    const { toast } = useToast()
    const { update } = useUserApi();
    const [updating, setUpdating] = useState(false)
    const user = useSelector(
        (state) => state.user.userData,
        shallowEqual
    );
    const id = user?._id
    const [userData, setUserData] = useState({
        email: user?.email || "",
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        phoneNumber: user?.phoneNumber || "",
        address: user?.address || "",
        city: user?.city || "",
        state: user?.state || "",
        pinCode: user?.pinCode || ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleUpdate = async () => {
        if (!userData.email || !userData.phoneNumber || !userData.address || !userData.firstName || !userData.lastName || !userData.city || !userData.state || !userData.pinCode || !userData.state) {
            return toast({
                description: "Fill all the fields"
            })
        }
        try {
            setUpdating(true)
            await update(userData, id);

            await updateSession()

            toast({
                description: 'Profile updated successfully!'
            })
            return
        } catch (error) {
            console.error('Error updating profile:', error);
            toast({
                description: 'Failed to update profile. Please try again later'
            })
        } finally {
            setUpdating(false)
        }
    };

    useEffect(() => {
        (async () => {
            await updateSession()
        })()
    }, [])

    useEffect(() => {
        setUserData(prevUserData => ({
            ...prevUserData,
            email: user?.email || "",
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            phoneNumber: user?.phoneNumber || "",
            address: user?.address || "",
            city: user?.city || "",
            state: user?.state || "",
            pinCode: user?.pinCode || ""
        }));
    }, [user]);

    if (!user?._id) {
        return (
            <div className='w-full h-screen flex justify-center items-center'>
                <Spinner size='lg' />
            </div>
        );
    }

    return (
        <div className='mt-[8rem]  mb-[10rem] w-full flex justify-center z-0'>
            <div className='flex flex-col gap-3 w-[25rem]'>
                <Input
                    name='email'
                    type="email"
                    label="Email"
                    variant="bordered"
                    value={userData.email}
                    onChange={handleInputChange}
                />
                <Input
                    name='firstName'
                    type="text"
                    label="First Name"
                    variant="bordered"
                    value={userData.firstName}
                    onChange={handleInputChange}
                />
                <Input
                    name='lastName'
                    type="text"
                    label="Last Name"
                    variant="bordered"
                    value={userData.lastName}
                    onChange={handleInputChange}
                />
                <Input
                    name='phoneNumber'
                    type="text"
                    label="Phone Number"
                    variant="bordered"
                    value={userData.phoneNumber}
                    onChange={handleInputChange}
                />
                <Input
                    name='address'
                    type="text"
                    label="Address"
                    variant="bordered"
                    value={userData.address}
                    onChange={handleInputChange}
                />
                <Input
                    name='city'
                    type="text"
                    label="City"
                    variant="bordered"
                    value={userData.city}
                    onChange={handleInputChange}
                />
                <Input
                    name='state'
                    type="text"
                    label="State"
                    variant="bordered"
                    value={userData.state}
                    onChange={handleInputChange}
                />
                <Input
                    name='pinCode'
                    type="text"
                    label="Pin Code"
                    variant="bordered"
                    value={userData.pinCode}
                    onChange={handleInputChange}
                />
                <Button isLoading={updating} className='bg-[#d4a72c] font-medium text-white' onClick={handleUpdate}>
                    Update
                </Button>
            </div>
        </div>
    );
};

export default UpdateProfile;
