import { AxiosResponse } from "axios";
import { useRecoilState } from "recoil";
import { errorState } from "../../../storage/atoms";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axiosQAInstance from "../../../api/Q&A";

export const useCreateQuestion = (userId: string) => {
  const [, setError] = useRecoilState<string | undefined>(errorState);
  const router: NavigateFunction = useNavigate();

  const fetch = async (question: any) => {
    if (!userId) return router("/signIn");

    try {
      const res: AxiosResponse = await axiosQAInstance.post(
        `/createQuestion/${userId}`,
        question
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

export default useCreateQuestion;
