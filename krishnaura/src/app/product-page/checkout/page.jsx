'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'
import React, { useEffect, useState } from 'react'
import { Button }  from '@nextui-org/react'
import useProductApi from '@/api/useProductApi';
import { Checkout } from '@/components/Checkout'
import { Spinner } from "@nextui-org/react"

function CheckoutPage() {
    const router = useRouter()
    const [searchParamsReady, setSearchParamsReady] = useState(false);
    const [product, setProduct] = useState()
    const { getProduct } = useProductApi()

    const id = useSearchParams.get('id');
    const quantity = useSearchParams.get('quantity');
    const size = useSearchParams.get('size');
    const color = useSearchParams.get('color');

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

    if (!searchParamsReady || !product) {
        return (
            <div className='w-full h-screen flex justify-center items-center'>
                <Spinner size='lg' />
            </div>
        );
    }

    return (
        <div className='mt-[6rem] flex '>
            <Button
                variant={"bordered"}
                className='relative top-4 left-2'
                onClick={handleBack}
                disabled={!product?._id}
            >
                Back
            </Button>
            {product?._id && (
                <Suspense fallback={<p>Loading checkout...</p>}>
                    <Checkout product={product} color={color} size={size} quantity={quantity} />
                </Suspense>
            )}
        </div>
    )
}
export default CheckoutPage
