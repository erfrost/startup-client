import { useRecoilState } from "recoil";
import { errorState } from "../../../storage/atoms";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import axiosClassInstance from "../../../api/class";

export const useGetClassUsers = (class_id: string | undefined) => {
  const [, setError] = useRecoilState<string | undefined>(errorState);
  const router: NavigateFunction = useNavigate();

  const fetch = async (classId: string | undefined) => {
    if (!classId) return router("/signIn");

    try {
      const res: AxiosResponse = await axiosClassInstance.get(
        `/students/${classId}`
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

  return () => fetch(class_id);
};

export default useGetClassUsers;
