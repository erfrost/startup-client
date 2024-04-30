import { AxiosResponse } from "axios";
import { useRecoilState } from "recoil";
import { errorState } from "../../../storage/atoms";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axiosClassInstance from "../../../api/class";

export const useDeleteFromClass = () => {
  const [, setError] = useRecoilState<string | undefined>(errorState);
  const router: NavigateFunction = useNavigate();

  const fetch = async (classId: string, userId: string) => {
    try {
      const res: AxiosResponse = await axiosClassInstance.post(
        `/exit/${classId}?userId=${userId}`
      );

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

export default useDeleteFromClass;
