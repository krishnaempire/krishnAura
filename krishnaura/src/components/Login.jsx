import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { useToast } from '@/components/ui/use-toast';
import useUserApi from '@/api/userApi/useUserApi';
import { useSelector } from 'react-redux';

const Login = () => {
  const data = useSelector(state => state.user.userData)

  const { signup } = useUserApi();
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);

  const [userData, setUserData] = useState({
    credentials: "",
    password: ''
  });
  const [otp, setOtp] = useState('');
  const [otpInput, setOtpInput] = useState('');

  const toggleVisibility = () => setIsVisible(!isVisible);


  
  const handleLogin = async () => {
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

          Please Login here
          </div>
          </div>
          </div>
        
        <Input
          type='email'
          className='mt-5'
          value={userData.email}
          variant='underlined'
          placeholder='Enter your credentials'
          radius='sm'
          onChange={(e) => setUserData({ ...userData, credentials: e.target.value })}
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
        <Button className='mt-3 h-10 w-full bg-[#d4a72c] font-semibold text-[1rem] text-[#292827]'  onClick={handleLogin}>
          Login
        </Button>
      </div>

    </>
  );
};

export default Login;
