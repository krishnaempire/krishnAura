'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react' // Import useState and useEffect
import useProductApi from '@/api/useProductApi';
import { Checkout } from '@/components/Checkout'
import { Spinner, Button } from "@nextui-org/react" // Assuming Button is imported from @nextui-org/react

function CheckoutComponent() {
    const router = useRouter();
    const { getProduct } = useProductApi();
    const [product, setProduct] = useState();
    const [searchParamsReady, setSearchParamsReady] = useState(false);

    const searchParams = useSearchParams()
    const id = searchParams.get('id');
    const quantity = searchParams.get('quantity');
    const size = searchParams.get('size');
    const color = searchParams.get('color');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProduct(id)
                setProduct(data)
                setSearchParamsReady(true);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };
        fetchData();
    }, [getProduct, id])

    const handleBack = () => {
        router.push(`/product-page/${id}`);
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
                <Checkout product={product} color={color} size={size} quantity={quantity} />
            )}
        </div>
    );
}

function CheckoutPage() {
    return (
        <Suspense>
            <CheckoutComponent />
        </Suspense>

    )
}

export default CheckoutPage;
