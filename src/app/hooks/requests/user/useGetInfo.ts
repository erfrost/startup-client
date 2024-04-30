import { useRecoilState } from "recoil";
import { errorState } from "../../../storage/atoms";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axiosUserInstance from "../../../api/user";
import { AxiosResponse } from "axios";

export const useGetInfo = () => {
  const [, setError] = useRecoilState<string | undefined>(errorState);
  const router: NavigateFunction = useNavigate();

  const fetch = async (userId: string) => {
    if (!userId) return router("/signIn");

    try {
      const res: AxiosResponse = await axiosUserInstance.get(
        `/getInfo/${userId}`
      );

      return res.data;
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

export default useGetInfo;
