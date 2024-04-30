import { useRecoilState } from "recoil";
import { errorState } from "../../../storage/atoms";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import axiosClassInstance from "../../../api/class";

export const useGetSchedule = (classId: string | undefined, day: string) => {
  const [, setError] = useRecoilState<string | undefined>(errorState);
  const router: NavigateFunction = useNavigate();

  const fetch = async (classId: string | undefined) => {
    if (!classId) return router("/signIn");

    try {
      const res: AxiosResponse = await axiosClassInstance.get(
        `/schedule/${classId}?date=${day}`
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

  return () => fetch(classId);
};

export default useGetSchedule;
