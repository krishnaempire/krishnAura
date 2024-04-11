'use client'
 
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
 
function Search() {
    
    return <input placeholder="Search..." />
}

function CheckoutPage() {
    const searchParams = useSearchParams()
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <Search />
    </Suspense>
  )
}

export default CheckoutPage