import { useRecoilState } from "recoil";
import { errorState } from "../../../storage/atoms";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import axiosClassInstance from "../../../api/class";

export const useGetClassLink = (classId: string) => {
  const [, setError] = useRecoilState<string | undefined>(errorState);
  const router: NavigateFunction = useNavigate();

  const fetch = async () => {
    try {
      const res: AxiosResponse = await axiosClassInstance.get(
        `/link/${classId}`
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

export default useGetClassLink;
