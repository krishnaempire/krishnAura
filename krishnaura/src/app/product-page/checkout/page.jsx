"use client"
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { Button }  from '@nextui-org/react'
import useProductApi from '@/api/useProductApi';
import { Checkout } from '@/components/Checkout'

const CheckoutPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const [product, setProduct] = useState()
    const { getProduct } = useProductApi()

    const id = searchParams.get('id');
    const quantity = searchParams.get('quantity');
    const size = searchParams.get('size');
    const color = searchParams.get('color');

    useEffect(() => {
        (async () => {
            const data = await getProduct(id)
            setProduct(data)
        })()
    }, [])

    const handleBack = () => {
        router.push(`/product-page/${id}`)
    }


    return (
        <>
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
                    <Checkout product={product} color={color} size={size} quantity={quantity} />
                )}
            </div>
        </>
    )
}

export default CheckoutPage
