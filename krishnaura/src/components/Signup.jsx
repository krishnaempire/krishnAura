import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { Modal, ModalContent, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import { useToast } from '@/components/ui/use-toast';
import useUserApi from '@/api/userApi/useUserApi';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const router = useRouter()
  const { signup } = useUserApi();
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: ''
  });
  const [otp, setOtp] = useState('');
  const [otpInput, setOtpInput] = useState('');

  const toggleVisibility = () => setIsVisible(!isVisible);


  const handleOTP = async () => {
    if (!validateEmail(userData.email)) {
      showErrorToast('Please enter a valid email address');
      return;
    }

    if (!validatePhoneNumber(userData.phoneNumber)) {
      showErrorToast('Please enter a valid phone number');
      return;
    }

    if (userData.password.length < 6) {
      showErrorToast('Password must be at least 6 characters long');
      return;
    }

    try {
      const res = await fetch('/api/sendmail/send-mail', {
        method: 'POST',
        body: JSON.stringify(userData.email),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (data.error) {
        showErrorToast(data.error);
      } else {
        showSuccessToast('OTP has been sent');
        setOtp(data.otp);
        onOpen(); // Open the modal after OTP is sent
      }
    } catch (error) {
      console.error(error.message || 'Something went wrong');
    }
  };

  const handleSignup = async () => {
    if (otp !== otpInput) {
      showErrorToast('Invalid OTP');
      return;
    }

    try {
      const res = await signup(userData);
      if (res.error) {
        showErrorToast(res.error);
      } else {
        showSuccessToast('Signup successful');
        setUserData({ email: '', phoneNumber: '', password: '' });
        router.push("/")
      }
    } catch (err) {
      showErrorToast(err.message);
    }
  };

  const validateEmail = (email) => {
    // Regex for validating email address
    const emailRegex = /@gmail\.com$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Regex for validating phone number
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

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
      <div className='w-[25rem]'>
        <div className='w-full text-center mb-4 text-[1.8rem] font-semibold'>
          <div>

          Hello! 
          <div>

          Please Sign up here
          </div>
          </div>
          </div>
        <Input
          type='text'
          value={userData.fullName}
          variant='underlined'
          placeholder='Enter your Full Name'
          radius='sm'
          onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
        />
        <Input
          type='email'
          className='mt-5'
          value={userData.email}
          variant='underlined'
          placeholder='Enter your email'
          radius='sm'
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <Input
          className='mt-5'
          value={userData.phoneNumber}
          type='text'
          placeholder='Enter your phone number'
          variant='underlined'
          radius='sm'
          onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
        />
        <Input
          className='mt-5'
          value={userData.password}
          placeholder='Enter your password'
          radius='sm'
          variant='underlined'
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          endContent={
            <button className='focus:outline-none' type='button'  onClick={toggleVisibility}>
              {isVisible ? 'Hide' : 'Show'}
            </button>
          }
          type={isVisible ? 'text' : 'password'}
        />
        <Button className='mt-3 h-10 w-full bg-[#d4a72c] font-semibold text-[1rem] text-[#292827]'  onClick={handleOTP}>
          Send OTP
        </Button>
      </div>

      <div>
        <Modal
          className='w-[20rem]'
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement='top-center'>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody>
                  <div className='w-full font-semibold flex justify-center'>
                    <div className='flex flex-col'>
                      <p className='text-[1.5rem]'>Enter OTP</p>
                      <p>sent to email</p>
                    </div>
                  </div>
                  <div className='w-full flex justify-center items-center'>

                  {/* <div className='w-[4rem] flex justify-center items-center'> */}
                  <Input
                    value={otpInput}
                    className='text-[2rem] p-2'
                    autoFocus
                    onChange={(e) => setOtpInput(e.target.value)}
                  />

                  {/* </div> */}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color='primary' className='w-full' onClick={handleOTP}>
                    Resend OTP
                  </Button>
                  <Button color='primary' onClick={handleSignup} className='w-full' >
                    Sign Up
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default Signup;
