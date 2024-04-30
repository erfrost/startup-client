import { useRecoilState } from "recoil";
import { errorState } from "../../../storage/atoms";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import axiosEventInstance from "../../../api/event";

export const useGetEvents = () => {
  const [, setError] = useRecoilState<string | undefined>(errorState);
  const userId: string | undefined = localStorage.getItem("user_id");
  const router: NavigateFunction = useNavigate();

  const fetch = async (classId: string) => {
    if (!userId) return router("/signIn");

    try {
      const res: AxiosResponse = await axiosEventInstance.get(
        `/getEvents/${classId}`
      );

      return res.data;
    } catch (error: any) {
      // router("/error");
      setError(
        error?.response?.data?.message ||
          "Произошла ошибка запроса. Попробуйте позднее"
      );
    }
  };

  return fetch;
};

export default useGetEvents;
