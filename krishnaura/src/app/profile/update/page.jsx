"use client"
import React, { useState } from 'react';
import { Input, Button } from "@nextui-org/react";
import { useSelector } from 'react-redux';
import useUserApi from '@/api/userApi/useUserApi';
import { useToast } from '@/components/ui/use-toast';
import { useDispatch } from 'react-redux';
import getUser from '@/api/getUser';

const UpdateProfile = () => {
    const { updateSession } = getUser()
    const { toast } = useToast()
    const { update } = useUserApi();
    const [ updating, setUpdating ] = useState(false)
    const user = useSelector(state => state.user.userData);
    const id = user?._id
    const [userData, setUserData] = useState({
        email: user?.email || "",
        fullName: user?.fullName || "",
        phoneNumber: user?.phoneNumber || "",
        address: user?.address || ""
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleUpdate = async () => {
        if (!userData.email || !userData.phoneNumber || !userData.address || !userData.fullName) {
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

    return (
        <div className='mt-[8rem] h-[20rem] mb-[10rem] w-full flex justify-center z-0'>
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
                    name='fullName'
                    type="text"
                    label="Full Name"
                    variant="bordered"
                    value={userData.fullName}
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
                <Button isLoading={updating} className='bg-[#d4a72c] font-medium text-white' onClick={handleUpdate}>
                    Update
                </Button>
            </div>
        </div>
    );
};

export default UpdateProfile;
