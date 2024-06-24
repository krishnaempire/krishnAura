'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react' // Import useState and useEffect
import useProductApi from '@/api/useProductApi';
import { Checkout } from '@/components/Checkout'
import { Spinner, Button } from "@nextui-org/react" // Assuming Button is imported from @nextui-org/react

function CheckoutComponent() {
    const router = useRouter();
    const { getProductById } = useProductApi();
    const [product, setProduct] = useState();
    const [searchParamsReady, setSearchParamsReady] = useState(false);

    const searchParams = useSearchParams()
    const id = searchParams.get('id');
    const quantity = searchParams.get('quantity');
    const size = searchParams.get('size');
    const color = searchParams.get('color');
    const cart = searchParams.get('cart');
    
    useEffect(() => {
        const sessionData = JSON.parse(sessionStorage.getItem("checkoutData"));
        if (cart === "true") {
            console.log("sesion")
            setProduct(sessionData.products);
            setSearchParamsReady(true);
        } else {
            // If no session storage data, fetch from the server
            const fetchData = async () => {
                try {
                    let data = await getProductById(id);
                    data = [data]
                    setProduct(data);
                    setSearchParamsReady(true);
                } catch (error) {
                    console.error("Error fetching product data:", error);
                }
            };
            fetchData();
        }
    }, []);

    const handleBack = () => {
        if (!id) {
            router.push("/")
        }
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
        <div className='mt-[6rem] md:flex '>
            {!product[0]?.cartId &&

                <Button
                    variant={"bordered"}
                    className='relative top-4 left-2'
                    onClick={handleBack}
                    disabled={!product[0]?._id}
                >
                    Back
                </Button>
            }
            {product.length > 0 && (
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
