import { AxiosResponse } from "axios";
import { useRecoilState } from "recoil";
import { errorState } from "../../../storage/atoms";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axiosEventInstance from "../../../api/event";
import { NewEvent } from "../../../../features/ClassEvents/ui/CreateModal";

export const useCreateEvent = (classId: string) => {
  const [, setError] = useRecoilState<string | undefined>(errorState);
  const router: NavigateFunction = useNavigate();

  const fetch = async (event: NewEvent) => {
    if (!classId) return router("/signIn");

    try {
      const res: AxiosResponse = await axiosEventInstance.post(
        `/createEvent/${classId}`,
        event
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

export default useCreateEvent;
