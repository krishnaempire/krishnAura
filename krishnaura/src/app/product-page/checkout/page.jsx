'use client'
 
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
 
function Search() {
  const searchParams = useSearchParams()
 
  return <input placeholder="Search..." />
}
 
function CheckoutPage() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <Search />
    </Suspense>
  )
}

export default CheckoutPage