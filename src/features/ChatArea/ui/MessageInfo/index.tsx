import { IoCheckmarkDoneSharp } from "react-icons/io5";
import styles from "./index.module.scss";
import { Message } from "../../../../app/models/message";

interface MessageInfoProps {
  message: Message;
  isHoverOpen?: boolean;
  color: "purple" | "gray";
}

const MessageInfo = ({ message, isHoverOpen, color }: MessageInfoProps) => {
  const userId: string = localStorage.getItem("user_id");
  if (!userId) return;

  return (
    <div
      className={`${styles.container} ${
        isHoverOpen && styles.hoveredContainer
      }`}
    >
      <span
        className={`${styles.time} ${
          color === "purple"
            ? styles.purple
            : color === "gray"
            ? styles.gray
            : null
        }`}
      >
        {message.time}
      </span>
      {message.user_id === userId && (
        <IoCheckmarkDoneSharp
          className={`${styles.checkIcon} ${
            message.isRead ? styles.checkIconActive : false
          }`}
        />
      )}
    </div>
  );
};

export default MessageInfo;
