import { setUser } from '@/redux/userSlice';
import { useDispatch } from 'react-redux';

const useUserApi = () => {
  const dispatch = useDispatch()
  const signup = async (userData) => {
    try {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
          throw new Error(errorData.error);
        
      }

      const data = await response.json();
      dispatch(setUser(data.newUser))
      localStorage.setItem("userData", JSON.stringify(data.newUser))
      return data
    } catch (error) {
      console.error('Error signing up:', error.message);
      throw error;
    }
  };

  return {
    signup,
  };
};

export default useUserApi;
