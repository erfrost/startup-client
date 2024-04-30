import { useState } from "react";
import { Message } from "../../../../app/models/message";
import { MessageFile } from "../../../../interfaces";
import FileRender from "../FileRender";
import MessageInfo from "../MessageInfo";
import styles from "./index.module.scss";
import FileViewModal from "../../../../shared/FileViewModal";

interface FileMessageProps {
  message: Message;
  userId: string;
}

const FileMessage = ({ message, userId }: FileMessageProps) => {
  const [modalFile, setModalFile] = useState<MessageFile | undefined>(
    undefined
  );
  const text: string = message?.content?.text;
  const files: MessageFile[] = message?.content?.files;

  if (!text) {
    return (
      <>
        <div
          className={styles.container}
          style={
            message.user_id === userId
              ? { alignSelf: "flex-end" }
              : { alignSelf: "flex-start" }
          }
        >
          <div
            className={`${styles.list} ${files.length > 2 && styles.moreFiles}`}
          >
            {files.map((file: MessageFile, index: number) => (
              <FileRender
                file={file}
                key={index}
                setModalImage={setModalFile}
                width={files.length > 2 ? "100%" : "250px"}
              />
            ))}
          </div>
          <MessageInfo isHoverOpen message={message} color="gray" />
        </div>
        {modalFile && (
          <FileViewModal file={modalFile} setModalFile={setModalFile} />
        )}
      </>
    );
  } else {
    return (
      <>
        <div
          className={styles.textContainer}
          style={
            message.user_id === userId
              ? { alignSelf: "flex-end" }
              : { alignSelf: "flex-start" }
          }
        >
          <div
            className={`${styles.list} ${files.length > 2 && styles.moreFiles}`}
          >
            {files.map((file: MessageFile, index: number) => (
              <FileRender
                file={file}
                key={index}
                setModalImage={setModalFile}
                width={files.length > 2 ? "100%" : "250px"}
              />
            ))}
          </div>
          <span className={styles.text}>{text}</span>
          <MessageInfo message={message} color="gray" />
        </div>
        {modalFile && (
          <FileViewModal file={modalFile} setModalFile={setModalFile} />
        )}
      </>
    );
  }
};

export default FileMessage;
