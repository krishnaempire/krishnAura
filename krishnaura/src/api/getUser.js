import { setUser } from "@/redux/userSlice";
import { useDispatch } from "react-redux";
import useUserApi from "./userApi/useUserApi";
import { useEffect, useCallback } from "react"; // Added useCallback import

const useGetUser = () => { // Renamed function to useGetUser and added 'use' prefix
  const { getUser } = useUserApi();
  const dispatch = useDispatch();

  const updateSession = useCallback(async () => { // Wrapped updateSession with useCallback
    try {
      const res = await fetch('/api/get-user', { cache: 'no-store' }, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await res.json()

      if (data.error) {
        localStorage.setItem("user", "");
        throw new Error("Re login required");
      }

      let user = await getUser(data?._id)

      if (user?._id) {
        dispatch(setUser(data));
      }

    } catch (error) {
      console.error('Error updating session:', error);
    }
  }, [getUser, dispatch]); // Added dependencies to useCallback

  useEffect(() => {
    updateSession(); // Call updateSession when component mounts or when updateSession changes
  }, [updateSession]); // Added updateSession to dependency array

  return {
    updateSession
  };
}

export default useGetUser;
