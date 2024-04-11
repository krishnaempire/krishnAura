'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'
import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import useProductApi from '@/api/useProductApi';
import { Checkout } from '@/components/Checkout'
import { Spinner } from "@nextui-org/react"

function CheckoutPage() {
    const router = useRouter()
    // const searchParams = useSearchParams()
    const [searchParamsReady, setSearchParamsReady] = useState(false);
    const [product, setProduct] = useState()
    const { getProduct } = useProductApi()

    // const id = searchParams.get('id');
    // const quantity = searchParams.get('quantity');
    // const size = searchParams.get('size');
    // const color = searchParams.get('color');
    const id = 123
    const quantity = 1
    const size = "xl"
    const color = "green"
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProduct(id)
                setProduct(data)
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };
        fetchData();
    }, [])

    useEffect(() => {
        if (id !== null && quantity !== null && size !== null && color !== null) {
            setSearchParamsReady(true);
        }
    }, [id, quantity, size, color]);

    const handleBack = () => {
        router.push(`/product-page/${id}`)
    }

    // if (!searchParamsReady || !product) {
    //     return (
    //         <div className='w-full h-screen flex justify-center items-center'>
    //             <Spinner size='lg' />
    //         </div>
    //     );
    // }

    

    return (
        <div className='mt-[6rem] flex '>
            <Suspense>
                <div>hello</div>
            </Suspense>
        </div>
    )
}
export default CheckoutPage
