import { setUser } from "@/redux/userSlice";
import { useDispatch } from "react-redux";
import useUserApi from "./userApi/useUserApi";

const getUser = () => {
  const { getUser } = useUserApi()

  const dispatch = useDispatch()
  const updateSession = async () => {
    try {
      const res = await fetch('/api/get-user', { cache: 'no-store' }, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await res.json()

      if (data.error) {
        localStorage.setItem("user", "")
        throw new Error("Re login required")
      }

      let user = await getUser(data?._id)

      if (user?._id) {
        dispatch(setUser(data))
      }

    } catch (error) {
      console.error('Error updating session:', error);
    }
  }

  return {
    updateSession
  }
}

export default getUser;