import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import useGetInfo from "../../app/hooks/requests/user/useGetInfo";
import AvatarWrapper from "../../shared/AvatarWrapper";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Chat } from "../../app/models/chat";
import useGetLastMessage from "../../app/hooks/requests/chat/useGetLastMessage";
import transformAvatar from "../../utils/transformAvatarUrl";
import { MessageFile } from "../../interfaces";
import UploadedFile from "../../app/models/uploadedFile";
import useGetCountUnreadMessages from "../../app/hooks/requests/chat/useGetCountUnreadMessages";
import { io } from "socket.io-client";

interface ChatItemProps {
  chat: Chat;
}

interface Recipient {
  user_id: string;
  avatar_url: string;
  nickname: string;
  last_online_date: string;
  online_status: boolean;
}

interface LastMessage {
  avatar_url: string;
  time: string;
  content: {
    text: string;
    files: MessageFile[];
    audio: UploadedFile;
  };
}

interface UnreadMessage {
  time: string;
  content: {
    text: string;
    files: MessageFile[];
    audio: UploadedFile;
  };
}

const userId: string = localStorage.getItem("user_id");
const socket = io(`ws://localhost:8000/chat?user_id=${userId}`);

const ChatItem = ({ chat }: ChatItemProps) => {
  const [recipient, setRecipient] = useState<Recipient | null>(null);
  const [lastMessage, setLastMessage] = useState<LastMessage | null>(null);
  const [messageText, setMessageText] = useState<string>("");
  const [countUnreadMessages, setCountUnreadMessages] = useState<number>(0);
  const router: NavigateFunction = useNavigate();
  const getInfo = useGetInfo();
  const getLastMessage = useGetLastMessage();
  const getCountUnreadMessages = useGetCountUnreadMessages();
  console.log(recipient);
  useEffect(() => {
    async function fetch() {
      setRecipient(await getInfo(chat.recipient_id));
      setLastMessage(await getLastMessage(chat.chat_id));
      setCountUnreadMessages(await getCountUnreadMessages(chat.chat_id));
    }

    fetch();
  }, []);

  useEffect(() => {
    socket.on("countUnreadMessages", (message: UnreadMessage) => {
      setCountUnreadMessages((prevState: number) => prevState + 1);
      setLastMessage((prevState) => {
        return {
          ...prevState,
          time: message.time,
          content: message.content,
        };
      });
    });
  }, []);

  useEffect(() => {
    const text: string = lastMessage?.content?.text;
    const filesCount: number = lastMessage?.content?.files?.length;
    const audio: UploadedFile = lastMessage?.content?.audio;
    let string: string = "";

    if (!text && !filesCount && !audio) string = "";

    if (text) string = text;
    else if (audio) string = "Голосовое сообщение";
    else {
      if (filesCount === 1) string = filesCount + " файл";
      else if (filesCount === 2 || filesCount === 3 || filesCount === 4) {
        string = filesCount + " файла";
      } else string = filesCount + " файлов";
    }

    setMessageText(string);
  }, [lastMessage]);

  if (!recipient) return;
  console.log(recipient);
  return (
    <div
      className={styles.container}
      onClick={() => router(`/chat/${chat.chat_id}`)}
    >
      <div className={styles.left}>
        <AvatarWrapper
          src={recipient.avatar_url}
          size="50px"
          onlineStatus={recipient.online_status}
        />
        <div className={styles.info}>
          <span className={styles.nickaname}>{recipient.nickname}</span>
          {lastMessage && (
            <div className={styles.lastMessage}>
              <img
                src={transformAvatar(lastMessage.avatar_url)}
                alt="avatar"
                className={styles.avatar}
              />
              <span className={styles.message}>{messageText}</span>
            </div>
          )}
        </div>
      </div>
      {countUnreadMessages > 0 && (
        <div className={styles.countContainer}>
          <span className={styles.count}>{countUnreadMessages}</span>
        </div>
      )}
    </div>
  );
};

export default ChatItem;
