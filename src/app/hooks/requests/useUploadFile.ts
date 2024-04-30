import { AxiosResponse } from "axios";
import { useRecoilState } from "recoil";
import { errorState } from "../../storage/atoms";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axiosDefaultInstance from "../../api/default";

export const useUploadFile = () => {
  const [, setError] = useRecoilState<string | undefined>(errorState);
  // const router: NavigateFunction = useNavigate();

  const fetch = async (file: File) => {
    try {
      const formData: FormData = new FormData();
      formData.append("file", file);

      const res: AxiosResponse = await axiosDefaultInstance.post(
        "/uploadFile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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

export default useUploadFile;
