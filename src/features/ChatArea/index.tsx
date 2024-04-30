import styles from "./index.module.scss";
import Input from "./ui/Input";
import { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import Divider from "../../shared/Divider";
import { io } from "socket.io-client";
import { Message } from "../../app/models/message";
import useGetMessages from "../../app/hooks/requests/chat/useGetMessages";
import FileInput from "./ui/FileInput";
import FilesList from "./ui/FilesList";
import UploadedFile from "../../app/models/uploadedFile";
import FileMessage from "./ui/FileMessage";
import TextMessage from "./ui/TextMessage";
import AudioInput from "./ui/AudioInput";
import AudioMessage from "./ui/AudioMessage";

interface ChatAreaProps {
  chatId: string;
}

const userId: string = localStorage.getItem("user_id");
const socket = io(`ws://localhost:8000/chat?user_id=${userId}`);

const ChatArea = ({ chatId }: ChatAreaProps) => {
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const getMessages = useGetMessages();

  const readMessages = () => {
    socket.emit("read", {
      chat_id: chatId,
      user_id: userId,
    });
  };

  const sendMessage = (audio?: UploadedFile | undefined) => {
    if ((audio && text) || (audio && files.length)) return;

    socket.emit("message", {
      chat_id: chatId,
      user_id: userId,
      content: {
        text,
        files: files,
        audio,
      },
    });

    setText("");
    setFiles([]);
  };

  const keyHandler = (e: KeyboardEvent) => {
    const key: string = e.key;

    if (key === "Enter" && (text.length || files.length)) {
      sendMessage();
    }
  };

  useEffect(() => {
    async function fetch() {
      setMessages(await getMessages(chatId, userId));
    }

    fetch();
    readMessages();
  }, []);

  useEffect(() => {
    socket.on("message", (message: Message) => {
      setMessages((prevState: Message[]) => [...prevState, message]);

      readMessages();
    });

    return () => {
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    socket.on("read", (messagesIds: string[]) => {
      setMessages((prevState: Message[]) => {
        const arr: Message[] = [...prevState];
        return arr.map((message: Message) => {
          if (messagesIds.includes(message.message_id)) {
            return {
              ...message,
              isRead: true,
            };
          } else return message;
        });
      });
    });

    return () => {
      socket.off("read");
    };
  }, [messages.length]);

  useEffect(() => {
    document.addEventListener("keydown", keyHandler);

    return () => document.removeEventListener("keydown", keyHandler);
  }, [text]);

  useEffect(() => {
    const chatArea: HTMLDivElement = document.querySelector(
      ".ChatArea_area__gAgSx"
    );

    if (!chatArea) return;

    chatArea.scrollTop = chatArea.scrollHeight;
  }, [messages]);

  return (
    <div className={styles.container}>
      <div className={styles.area}>
        {messages.map((message: Message) =>
          message.content.text && !message.content.files.length ? (
            <TextMessage
              message={message}
              userId={userId}
              key={message.message_id}
            />
          ) : message.content.files.length ? (
            <FileMessage
              message={message}
              userId={userId}
              key={message.message_id}
            />
          ) : message.content.audio ? (
            <AudioMessage message={message} key={message.message_id} />
          ) : null
        )}
      </div>
      <Divider />
      <div className={styles.footer}>
        <div className={styles.footerTop}>
          <FileInput files={files} setFiles={setFiles} />
          <Input value={text} setValue={setText} />
          {text.length || files.length ? (
            <div className={styles.iconContainer}>
              <IoSend
                key="send"
                className={styles.icon}
                onClick={() => sendMessage()}
              />
            </div>
          ) : (
            <AudioInput sendMessage={sendMessage} />
          )}
        </div>
        <FilesList files={files} setFiles={setFiles} />
      </div>
    </div>
  );
};

export default ChatArea;
