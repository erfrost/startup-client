import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import styles from "./index.module.scss";
import useGetChats from "../../app/hooks/requests/chat/useGetChats";
import ChatItem from "../../features/ChatItem";
import { Chat } from "../../app/models/chat";

const Chats = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const userId: string = localStorage.getItem("user_id");
  const getChats = useGetChats(userId);

  useEffect(() => {
    async function fetch() {
      setChats(await getChats());
    }

    fetch();
  }, []);

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Список чатов</span>
          {chats.map((chat: Chat) => (
            <ChatItem chat={chat} key={chat.chat_id} />
          ))}
        </div>
        <div className={styles.settings}></div>
      </div>
    </MainLayout>
  );
};

export default Chats;
