'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function Search() {
    const searchParams = useSearchParams()

    const id = searchParams.get('id');
    const quantity = searchParams.get('quantity');
    const size = searchParams.get('size');
    const color = searchParams.get('color');
    return { id, quantity, size, color };
}

function Searchbar() {
    // const { id, quantity, size, color } = Search();
    return (
        <Suspense>
            <div className='mt-[10rem]'>hello</div>
        </Suspense>
    )
}

export default Searchbar