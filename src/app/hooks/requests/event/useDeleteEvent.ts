import { AxiosResponse } from "axios";
import { useRecoilState } from "recoil";
import { errorState } from "../../../storage/atoms";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axiosEventInstance from "../../../api/event";

export const useDeleteEvent = () => {
  const [, setError] = useRecoilState<string | undefined>(errorState);
  const router: NavigateFunction = useNavigate();

  const fetch = async (eventId: string) => {
    if (!eventId) return router("/signIn");

    try {
      const res: AxiosResponse = await axiosEventInstance.delete(
        `/deleteEvent/${eventId}`
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

export default useDeleteEvent;
