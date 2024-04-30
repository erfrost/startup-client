import { Dispatch, SetStateAction } from "react";
import { MessageFile } from "../../../../interfaces";
import styles from "./index.module.scss";
import { FaFile } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";

interface FileRenderProps {
  file: MessageFile;
  setModalImage: Dispatch<SetStateAction<MessageFile>>;
  width: string;
}

const FileRender = ({ file, setModalImage, width }: FileRenderProps) => {
  return (
    <>
      {file.type.startsWith("image/") ? (
        <img
          src={file.url}
          alt="image"
          className={styles.mediaFile}
          onClick={() => setModalImage(file)}
          style={{ width }}
        />
      ) : file.type.startsWith("video/") ? (
        <div
          className={styles.videoContainer}
          onClick={() => setModalImage(file)}
        >
          <FaCirclePlay className={styles.playIcon} />
          <video className={styles.mediaFile} src={file.url} />
        </div>
      ) : (
        <div className={styles.unknownFile} style={{ width }}>
          <div className={styles.content}>
            <FaFile className={styles.icon} />
            <span className={styles.name}>
              {file.name.length > 16
                ? file.name.slice(0, 16) + "..."
                : file.name}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default FileRender;
