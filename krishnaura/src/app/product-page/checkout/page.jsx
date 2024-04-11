'use client'
 
import { Checkout } from '@/components/Checkout'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
 
function Search() {
  const searchParams = useSearchParams()
 
  
}
 
function CheckoutPage() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <Checkout />
    </Suspense>
  )
}

export default CheckoutPage