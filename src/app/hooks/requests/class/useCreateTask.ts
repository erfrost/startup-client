import { useRecoilState } from "recoil";
import { errorState } from "../../../storage/atoms";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axiosClassInstance from "../../../api/class";
import UploadedFile from "../../../models/uploadedFile";

interface Task {
  title: string;
  description: string;
  files: UploadedFile[];
}

export const useCreateTask = (classId: string, date: string) => {
  const [, setError] = useRecoilState<string | undefined>(errorState);
  const router: NavigateFunction = useNavigate();

  const fetch = async (task: Task) => {
    if (!classId) return router("/signIn");

    try {
      await axiosClassInstance.post(`/createTask/${classId}`, {
        ...task,
        date,
      });
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

export default useCreateTask;
