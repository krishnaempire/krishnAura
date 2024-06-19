"use client"
import React, { useState } from 'react'
import Signup from '@/components/Signup'
import { Tabs, Tab } from "@nextui-org/react";
import Login from '@/components/Login';

const Auth = () => {
  const [selected, setSelected] = useState("login");
  return (
    <>
      <div className={`mt-[7rem] flex flex-col justify-center items-center`}>
        <div className='max-w-full '>
          <Tabs
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="Login">
              <Login />
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <Signup />
            </Tab>
          </Tabs>
        </div>
      </div>

    </>
  )
}

export default Auth
