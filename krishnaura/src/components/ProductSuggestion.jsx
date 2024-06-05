import React, { useState, useEffect } from 'react';
import useProductApi from '@/api/useProductApi';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import SuggestionCard from './SuggestionCard';
import { Card, CardBody, CardFooter } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';

const ProductSuggestion = () => {
    const { getPaginatedProducts } = useProductApi();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getPaginatedProducts(currentPage);
            if (data) {
                setProducts(data.products);
                setTotalPages(data.pagination.totalPages);
            }
        };

        fetchProducts();
    }, [currentPage]);

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <>
            <Carousel className="w-full flex justify-center mb-[5rem]">
                <CarouselContent className="-ml-1">
                    {products.map((product, index) => (
                        <CarouselItem key={index} className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/4">
                            <SuggestionCard product={product}/>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {/* <CarouselPrevious /> */}
                {/* <CarouselNext /> */}
            </Carousel>
            {/* <Carousel className="w-full flex justify-center mb-[5rem]">
                <CarouselContent className="-ml-1">
                    {products.map((product, index) => (
                        <CarouselItem key={index} className="pl-1 md:basis-1/3 lg:basis-1/4">
                            <Card shadow="sm" key={index}>
                                <CardBody className="overflow-visible p-0">
                                    <Link href={`/product-page/${product?._id}`}>
                                        <Image
                                            shadow="sm"
                                            radius="lg"
                                            width={140}
                                            height={140}
                                            alt={product?.name}
                                            className="w-full object-cover h-[140px]"
                                            src={product?.productImages[0]}
                                        />
                                    </Link>
                                </CardBody>
                                <CardFooter className="text-small justify-between">
                                    <b>{product?.name}</b>
                                    <p className="text-default-500">&#8377;{`${product.size[0].offPrice}.00`}</p>
                                </CardFooter>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel> */}
        </>
    );
};

export default ProductSuggestion;
