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
      localStorage.setItem("user", JSON.stringify(data.newUser))

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
    update
  };
};

export default useUserApi;
