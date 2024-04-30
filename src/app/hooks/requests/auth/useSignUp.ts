import { useRecoilState } from "recoil";
import { errorState } from "../../../storage/atoms";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import axiosAuthInstance from "../../../api/auth";
import { AuthResponse, SignUpData } from "../../../../interfaces";

export const useSignUp = () => {
  const [, setError] = useRecoilState<string | undefined>(errorState);
  const router: NavigateFunction = useNavigate();

  const fetch = async (data: SignUpData) => {
    try {
      const res: AxiosResponse = await axiosAuthInstance.post(
        "/createUser",
        data
      );

      const { user_id, access_token, refresh_token }: AuthResponse = res.data;

      localStorage.setItem("user_id", user_id);
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      router("code");
    } catch (error: any) {
      if (error.response.status === 400) {
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

export default useSignUp;
