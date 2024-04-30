import { IoMdClose } from "react-icons/io";
import styles from "./index.module.scss";
import { BlobFile } from "../..";

interface MediaProps {
  isCover?: boolean;
  file: BlobFile;
  onDeleteFile: () => void;
}

const Media = ({ isCover, file, onDeleteFile }: MediaProps) => {
  return (
    <div
      className={`${styles.container} ${isCover && styles.coverContainer}`}
      onClick={onDeleteFile}
    >
      <div className={styles.hovered}></div>
      <IoMdClose className={styles.icon} />
      {file.type.includes("image/") ? (
        <img
          src={URL.createObjectURL(file.blob)}
          alt="media"
          className={styles.file}
        />
      ) : file.type.includes("video/") ? (
        <video
          src={URL.createObjectURL(file.blob)}
          className={styles.file}
          autoPlay
          muted
        />
      ) : null}
    </div>
  );
};

export default Media;
