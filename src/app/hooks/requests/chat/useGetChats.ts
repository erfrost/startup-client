import { useRecoilState } from "recoil";
import { errorState } from "../../../storage/atoms";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axiosChatInstance from "../../../api/chat";
import { AxiosResponse } from "axios";

export const useGetChats = (userId: string) => {
  const [, setError] = useRecoilState<string | undefined>(errorState);
  const router: NavigateFunction = useNavigate();

  const fetch = async () => {
    try {
      if (!userId) return router("/signIn");

      const res: AxiosResponse = await axiosChatInstance.get(
        `getChats/${userId}`
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

export default useGetChats;
