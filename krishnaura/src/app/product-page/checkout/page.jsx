'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { Button }  from '@nextui-org/react'
import useProductApi from '@/api/useProductApi';
import { Checkout } from '@/components/Checkout'

function CheckoutPage() {
    const router = useRouter()
    const searchParams = useSearchParams();
    const [product, setProduct] = useState()
    const { getProduct } = useProductApi()

    const id = searchParams.get('id');
    const quantity = searchParams.get('quantity');
    const size = searchParams.get('size');
    const color = searchParams.get('color');

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

    const handleBack = () => {
        router.push(`/product-page/${id}`)
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
    )
}

export default CheckoutPage
