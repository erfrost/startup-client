import { AxiosResponse } from "axios";
import { useRecoilState } from "recoil";
import { errorState } from "../../../storage/atoms";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axiosClassInstance from "../../../api/class";

export const useAddClass = () => {
  const [, setError] = useRecoilState<string | undefined>(errorState);
  const userId: string | undefined = localStorage.getItem("user_id");
  const router: NavigateFunction = useNavigate();

  const fetch = async (className: string) => {
    if (!userId) return router("/signIn");

    try {
      const res: AxiosResponse = await axiosClassInstance.post(`/${userId}`, {
        className,
      });

      return res.data;
    } catch (error: any) {
      if (error.response.status !== 400) {
        router("/error");
        setError(
          error?.response?.data?.message ||
            "Произошла ошибка запроса. Попробуйте позднее"
        );
      }
    }
  };

  return fetch;
};

export default useAddClass;
