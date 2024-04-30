import { useRecoilState } from "recoil";
import { errorState } from "../../../storage/atoms";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axiosUserInstance from "../../../api/user";
import User from "../../../models/user";

export const useUpdateUser = () => {
  const [, setError] = useRecoilState<string | undefined>(errorState);
  const userId: string | undefined = localStorage.getItem("user_id");
  const router: NavigateFunction = useNavigate();

  const fetch = async (imageUrl: string, userData: User) => {
    if (!userId) return router("/signIn");
    let data: User = userData;

    if (imageUrl) data = { ...userData, avatar_url: imageUrl };

    try {
      await axiosUserInstance.post(`/${userId}`, data);
    } catch (error: any) {
      router("/error");
      setError(
        error?.response?.data?.message ||
          "Произошла ошибка запроса. Попробуйте позднее"
      );
    }
  };

  return fetch;
};

export default useUpdateUser;
