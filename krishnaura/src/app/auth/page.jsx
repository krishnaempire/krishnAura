"use client"
import React, { useState } from 'react'
import Signup from '@/components/Signup'

const Auth = () => {
  const [state, setState] = useState(true) 
  return (
    <>
      <div className={`w-screen h-[40rem] flex flex-col justify-center items-center`}>
      
      <Signup/>
      </div>
    </>
  )
}

export default Auth
