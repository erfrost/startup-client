import { useRecoilState } from "recoil";
import { errorState } from "../../../storage/atoms";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axiosChatInstance from "../../../api/chat";

export const useCreateChat = () => {
  const [, setError] = useRecoilState<string | undefined>(errorState);
  const router: NavigateFunction = useNavigate();

  const fetch = async (userId: string, recipientId: string) => {
    if (!userId || !recipientId) return router("/signIn");
    try {
      await axiosChatInstance.post("createChat", {
        user_id: userId,
        recipient_id: recipientId,
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

export default useCreateChat;
