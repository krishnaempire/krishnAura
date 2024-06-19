import React, { useState } from 'react';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import { useToast } from '@/components/ui/use-toast';
import useUserApi from '@/api/userApi/useUserApi';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const Login = () => {
  // const data = useSelector(state => state.user.userData)
  const { resetPassword } = useUserApi()
  const { isOpen, onOpenChange, onClose, onOpen } = useDisclosure()
  const router = useRouter()
  const { login } = useUserApi();
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleNewPassword, setIsVisibleNewPassword] = useState(false);
  const [OTP, setOTP] = useState("")
  const [enterOTP, setEnterOTP] = useState("")
  const [wrongOTP, setWrongOTP] = useState(false)
  const [newPassword, setNewPassword] = useState()


  const [userData, setUserData] = useState({
    credentials: "",
    password: ''
  });
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async () => {

    try {
      const res = await login(userData);
      if (res.error) {
        showErrorToast(res.error);
      } else {
        showSuccessToast('Login successful');
        setUserData({ email: '', phoneNumber: '', password: '' });
        router.push("/")
      }
    } catch (err) {
      showErrorToast(err.message);
    }
  };


  const handleSendOTP = async () => {
    const res = await fetch("/api/sendmail/send-forgot-pass-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application.json"
      },
      body: JSON.stringify(userData.credentials)
    })
    const data = await res.json()
    if (data.verifyCode) {
      setOTP(Number(data.verifyCode))
    }
  }

  const handleVerifyOTP = () => {
    if (OTP == enterOTP) {
      setIsVisibleNewPassword(true)
      return
    }
    setWrongOTP(true)
    setTimeout(() => {
      setWrongOTP(false)
    }, 2000)
  }

  const handleUpdatePassword = async () => {
    if (newPassword.length < 6) {
      showErrorToast('Password must be at least 6 characters long');
      return;
    }
    try {
      const res = await resetPassword(userData.credentials, newPassword)
      if (res.error) {
        showErrorToast(res.error);
      } else {
        showSuccessToast('Password Reset Successfull');
        setUserData({ credentials: "" });
        onClose()
      }
    } catch (err) {
      showErrorToast(err.message);
    }
  }

  const showErrorToast = (message) => {
    toast({
      title: 'Uh oh! Something went wrong.',
      description: message,
    });
  };

  const showSuccessToast = (message) => {
    toast({
      description: message,
    });
  };

  return (
    <>
      <div className="mx-auto w-[23rem] md:max-w-md space-y-6 py-12">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <p className="text-muted-foreground">Sign in to your account to continue shopping with us.</p>
        </div>
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-muted" />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              required={true}
              value={userData.email}
              placeholder='Enter your email or phone number'
              radius='sm'
              onChange={(e) => setUserData({ ...userData, credentials: e.target.value })}

            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              type={isVisible ? 'text' : 'password'}
              required={true}
              value={userData.password}
              placeholder='Enter your password'
              radius='sm'
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              endContent={
                <button className='focus:outline-none' type='button' onClick={toggleVisibility}>
                  {isVisible ? 'Hide' : 'Show'}
                </button>
              }
            />
          </div>
          <div className='flex justify-center'>
            <p className='text-blue-500 hover:text-blue-800 cursor-pointer' onClick={onOpen}>Forgot pass?</p>
          </div>
          <Button type="submit" className="w-full bg-[#d4a72c] font-semibold text-[1rem] text-white "
          onClick={handleLogin}
          >
            Sign In
          </Button>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="w-[23rem]"
        placement='center'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Reset Password</ModalHeader>
              <ModalBody>
                <div className={`w-full flex justify-center ${isVisibleNewPassword ? "hidden" : "block"}`}>
                  <input
                    type="text"
                    value={userData.credentials}
                    placeholder="Enter email"
                    className=" bg-gray-200 text-[.8rem] px-[1.5rem] rounded-[.7rem] mr-1"
                    onChange={e => setUserData({ ...userData, credentials: e.target.value })}
                  />
                  <Button color={"primary"} onClick={handleSendOTP} >Send OTP</Button>

                </div>
                <div className={`w-full flex h-[2.5rem] ${OTP ? "block" : "hidden"} ${isVisibleNewPassword ? "hidden" : "block"}`}>

                  <input
                    type="text"
                    value={enterOTP}
                    placeholder="Enter OTP"
                    className=" bg-gray-200 px-[1rem] rounded-[.7rem] mr-1"
                    onChange={e => setEnterOTP(e.target.value)}
                  />
                  <Button color={"primary"} onClick={handleVerifyOTP} >{wrongOTP ? "Wrong" : "Verify"}</Button>
                </div>

                <div className={`flex flex-col gap-2 ${isVisibleNewPassword ? "block" : "hidden"}`}>
                  <input
                    type="text"
                    value={newPassword}
                    placeholder={"Enter your new password"}
                    className="bg-gray-200 px-4 rounded-lg h-10"
                    onChange={e => setNewPassword(e.target.value)}
                  />
                </div>
              </ModalBody>
              <ModalFooter>

                <Button color={"primary"} variant={"ghost"} className={`${isVisibleNewPassword ? "block" : "hidden"}`} onClick={handleUpdatePassword}>
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>


    </>
  );
};

export default Login;
