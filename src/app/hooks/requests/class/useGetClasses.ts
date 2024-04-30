import { useRecoilState } from "recoil";
import { errorState } from "../../../storage/atoms";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import axiosClassInstance from "../../../api/class";
import Class from "../../../models/class";

export const useGetClasses = (): (() => Promise<Class[] | undefined>) => {
  const [, setError] = useRecoilState<string | undefined>(errorState);
  const userId: string | undefined = localStorage.getItem("user_id");
  const router: NavigateFunction = useNavigate();

  const fetch = async (userId: string | undefined) => {
    if (!userId) return router("/signIn");

    try {
      const res: AxiosResponse = await axiosClassInstance.get(`/${userId}`);

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

export default useGetClasses;
