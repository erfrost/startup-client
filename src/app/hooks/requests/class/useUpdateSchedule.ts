import { AxiosResponse } from "axios";
import { useRecoilState } from "recoil";
import { errorState } from "../../../storage/atoms";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axiosClassInstance from "../../../api/class";

export const useUpdateSchedule = () => {
  const [, setError] = useRecoilState<string | undefined>(errorState);
  const router: NavigateFunction = useNavigate();

  const fetch = async (classId: string, schedule: any, date: string) => {
    if (!classId) return router("/signIn");

    try {
      const res: AxiosResponse = await axiosClassInstance.post(
        `/schedule/${classId}`,
        { date: date, schedule }
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

  return (classId: string, lessons: any, date: string) =>
    fetch(classId, lessons, date);
};

export default useUpdateSchedule;
