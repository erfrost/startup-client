import { IoCheckmarkDoneSharp } from "react-icons/io5";
import styles from "./index.module.scss";
import { Message } from "../../../../app/models/message";
import MessageInfo from "../MessageInfo";

interface TextMessageProps {
  message: Message;
  userId: string;
}

const TextMessage = ({ message, userId }: TextMessageProps) => {
  return (
    <div
      className={styles.container}
      style={
        message.user_id === userId
          ? { alignSelf: "flex-end" }
          : { alignSelf: "flex-start", paddingRight: "45px" }
      }
    >
      {/* {message.content.files && <FileMessage content={message.content} />} */}
      <span className={styles.text}> {message.content.text}</span>
      <MessageInfo message={message} color="gray" />
    </div>
  );
};

export default TextMessage;
