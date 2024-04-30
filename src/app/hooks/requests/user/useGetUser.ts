import { useRecoilState } from "recoil";
import { errorState, userState } from "../../../storage/atoms";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axiosUserInstance from "../../../api/user";
import { AxiosResponse } from "axios";
import User from "../../../models/user";

export const useGetUser = (): (() => Promise<User | undefined>) => {
  const [, setUser] = useRecoilState<User | null>(userState);
  const [, setError] = useRecoilState<string | undefined>(errorState);
  const userId: string | undefined = localStorage.getItem("user_id");
  const router: NavigateFunction = useNavigate();

  const fetch = async (userId: string | undefined) => {
    if (!userId) return router("/signIn");

    try {
      const res: AxiosResponse = await axiosUserInstance.get(`/${userId}`);

      setUser(res.data);

      const { role, class_id }: { role: string; class_id: string } = res.data;
      localStorage.setItem("role", role);
      if (class_id) localStorage.setItem("class_id", class_id);

      return res.data;
    } catch (error: any) {
      router("/error");
      setError(
        error?.response?.data?.message ||
          "Произошла ошибка запроса. Попробуйте позднее"
      );
    }
  };

  return () => fetch(userId);
};

export default useGetUser;
