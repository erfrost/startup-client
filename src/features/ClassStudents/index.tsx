import { useEffect, useState } from "react";
import useGetClassUsers from "../../app/hooks/requests/class/useGetClassUsers";
import User from "../../app/models/user";
import AvatarWrapper from "../../shared/AvatarWrapper";
import transformAvatar from "../../utils/transformAvatarUrl";
import styles from "./index.module.scss";
import Popover from "../../shared/Popover";
import { FiMoreVertical } from "react-icons/fi";
import useDeleteFromClass from "../../app/hooks/requests/class/useDeleteFromClass";
import { MdContentCopy } from "react-icons/md";
import useGetClassLink from "../../app/hooks/requests/class/useGetClassLink";
import useCreateChat from "../../app/hooks/requests/chat/useCreateChat";
import { NavigateFunction, useNavigate } from "react-router-dom";

const ClassStudents = () => {
  const [students, setStudents] = useState<User[]>([]);
  const [joinLink, setJoinLink] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const role: string = localStorage.getItem("role");
  const classId: string = localStorage.getItem("class_id");
  const router: NavigateFunction = useNavigate();
  const getClassUsers = useGetClassUsers(classId);
  const deleteFromClass = useDeleteFromClass();
  const getLink = useGetClassLink(classId);
  const createChat = useCreateChat();

  useEffect(() => {
    async function fetch() {
      if (role !== "teacher") return;
      const link: string = await getLink();
      setJoinLink(link);
    }

    fetch();
  }, []);

  const onCopyLink = () => {
    navigator.clipboard.writeText(joinLink);
    setIsCopied(true);
  };

  useEffect(() => {
    async function fetch() {
      setStudents(await getClassUsers());
    }

    fetch();
  }, []);

  const onDeleteStudent = async (userId: string) => {
    await deleteFromClass(classId, userId);

    const newStudentsList: User[] = students.filter(
      (student: User) => student.user_id !== userId
    );
    setStudents(newStudentsList);
  };

  const onChatOpen = async (recipientId: string) => {
    const userId: string = localStorage.getItem("user_id");
    await createChat(userId, recipientId);
    router("/chats");
  };

  return (
    <div className={styles.block}>
      <div className={styles.header}>
        <span className={styles.blockTitle}>Ученики</span>
        <div className={styles.linkContainer}>
          <span className={styles.text}>
            {isCopied ? "Скопировано" : "Скопировать ссылку для приглашения"}
          </span>
          <div className={styles.copyBtn} onClick={onCopyLink}>
            <MdContentCopy className={styles.copyIcon} />
          </div>
        </div>
      </div>
      <div className={styles.studentsList}>
        {students?.map((student: User) => (
          <div className={styles.student} key={student.user_id}>
            <AvatarWrapper src={student.avatar_url} size="35px" />
            <span className={styles.nickname}>{student.nickname}</span>
            <Popover
              popoverContent={
                <>
                  <div
                    className={styles.btn}
                    onClick={() => onChatOpen(student.user_id)}
                  >
                    Открыть диалог
                  </div>
                  {role === "teacher" && (
                    <div
                      className={styles.btn}
                      onClick={() => onDeleteStudent(student.user_id)}
                    >
                      Иключить из класса
                    </div>
                  )}
                </>
              }
            >
              <div className={styles.iconBtn}>
                <FiMoreVertical className={styles.icon} />
              </div>
            </Popover>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassStudents;
