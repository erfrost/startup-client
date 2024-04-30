import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import styles from "./index.module.scss";
import useGetInfo from "../../app/hooks/requests/user/useGetInfo";
import { useEffect, useState } from "react";
import { Chat as ChatModel } from "../../app/models/chat";
import useGetChatInfo from "../../app/hooks/requests/chat/useGetChatInfo";
import { FaArrowLeft } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import AvatarWrapper from "../../shared/AvatarWrapper";
import Divider from "../../shared/Divider";
import { UserInfo } from "../../interfaces";
import ChatArea from "../../features/ChatArea";
import onlineStatusFormatted from "../../utils/onlineStatusFormatted";

const Chat = () => {
  const [chat, setChat] = useState<ChatModel | null>(null);
  const [recipient, setRecipient] = useState<UserInfo | null>(null);
  const router: NavigateFunction = useNavigate();
  const { chat_id: chatId } = useParams();
  const getChatInfo = useGetChatInfo(chatId);
  const getUserInfo = useGetInfo();

  useEffect(() => {
    async function fetch() {
      setChat(await getChatInfo());
    }

    fetch();
  }, []);

  useEffect(() => {
    async function fetch() {
      if (!chat?.recipient_id) return;
      setRecipient(await getUserInfo(chat.recipient_id));
    }

    fetch();
  }, [chat]);

  if (!chat || !recipient) return;

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <FaArrowLeft
            className={styles.arrow}
            onClick={() => router("/chats")}
          />
          <div className={styles.userInfo}>
            <AvatarWrapper
              src={recipient.avatar_url}
              size="40px"
              onClick={() => router(`/profile/${recipient.user_id}`)}
            />
            <div className={styles.textInfo}>
              <span className={styles.nickname}>{recipient.nickname}</span>
              <span className={styles.date}>
                {recipient.online_status && (
                  <div className={styles.onlineCircle}></div>
                )}
                {onlineStatusFormatted(
                  recipient.online_status,
                  recipient.last_online_date
                )}
              </span>
            </div>
          </div>
          <FiMoreVertical className={styles.menu} />
        </div>
        <Divider />
        <ChatArea chatId={chat.chat_id} />
      </div>
    </MainLayout>
  );
};

export default Chat;
