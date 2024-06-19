import { setUser } from '@/redux/userSlice';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import useCartApi from '../useCartApi';

const useUserApi = () => {
  const dispatch = useDispatch()
  const { addToCart } = useCartApi();
  const user = useSelector(
    (state) => state.user.userData,
    shallowEqual
  );

  
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

      const cart = JSON.parse(sessionStorage.getItem('guestCart')) || [];

      if (cart) {
        cart?.forEach((item) => {
          addToCart({ userId: user._id, productId: item._id });
        });
        sessionStorage.removeItem('guestCart');
      }

      localStorage.setItem("user", JSON.stringify(data.newUser))
      return data

    } catch (error) {
      console.error('Error signing up:', error.message);
      throw error;
    }
  };

  const login = async (userData) => {
    try {
      const response = await fetch('/api/users/login', {
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

      dispatch(setUser(data.user))

      const cart = JSON.parse(sessionStorage.getItem('guestCart')) || [];

      if (cart) {
        cart?.forEach((item) => {
          addToCart({ userId: user._id, productId: item._id });
        });
        sessionStorage.removeItem('guestCart');
      }


      return data
    } catch (error) {
      console.error('Error signing up:', error.message);
      throw error;
    }
  };

  const update = async (userData, id) => {
    try {
      const response = await fetch(`/api/users/update-user/${id}`, {
        method: 'PATCH',
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

      return data
    } catch (error) {
      console.error('Error signing up:', error.message);
      throw error;
    }
  };

  const resetPassword = async (email, password) => {
    try {
      const response = await fetch('/api/users/reset-password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });

      if (!response.ok) {
        const errorData = await response.json();
          throw new Error(errorData.error); 
      }
      const data = await response.json();

      return data

    } catch (error) {
      console.error('Error reseting password:', error.message);
      throw error;
    }
  };

  const getUser = async (id) => {
    try {
      const response = await fetch(`/api/users/get-user/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
          throw new Error(errorData.error);
        
      }

      const data = await response.json();
      return data
    } catch (error) {
      console.error('Error getting user', error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(`/api/users/logout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
          throw new Error(errorData.error);
        
      }
      dispatch(setUser(""))
      // sessionStorage.setItem("guestCart", "")

    } catch (error) {
      console.error('Error getting user', error.message);
      throw error;
    }
  };

  return {
    signup,
    login,
    getUser,
    logout,
    update,
    resetPassword
  };
};

export default useUserApi;
