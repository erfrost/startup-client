import { useRecoilState } from "recoil";
import { errorState } from "../../../storage/atoms";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import axiosClassInstance from "../../../api/class";

export const useGetTasks = (classId: string, day: string) => {
  const [, setError] = useRecoilState<string>(errorState);
  const router: NavigateFunction = useNavigate();

  const fetch = async () => {
    if (!classId) return router("/signIn");

    try {
      const res: AxiosResponse = await axiosClassInstance.get(
        `/getTasks/${classId}?date=${day}`
      );

      return res.data;
    } catch (error: any) {
      if (error.response.status !== 400) {
        // router("/error");
        setError(
          error?.response?.data?.message ||
            "Произошла ошибка запроса. Попробуйте позднее"
        );
      }
    }
  };

  return () => fetch();
};

export default useGetTasks;
