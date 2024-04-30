import { IoMdClose } from "react-icons/io";
import styles from "./index.module.scss";
import { Dispatch, SetStateAction } from "react";
import UploadedFile from "../../../../app/models/uploadedFile";
import { FaFile } from "react-icons/fa";

interface FilesListProps {
  files: UploadedFile[];
  setFiles: Dispatch<SetStateAction<UploadedFile[]>>;
}

const FilesList = ({ files, setFiles }: FilesListProps) => {
  const handleDeleteFile = (fileIndex: number) => {
    setFiles((prevState: UploadedFile[]) => {
      const arr: UploadedFile[] = [...prevState];
      return arr.filter((_, index: number) => index !== fileIndex);
    });
  };

  return files.length ? (
    <div className={styles.container}>
      {files.map((file: UploadedFile, index: number) => (
        <div className={styles.fileContainer} key={index}>
          {file.type.startsWith("image/") ? (
            <img src={file.url} alt="file" className={styles.file} />
          ) : file.type.startsWith("video/") ? (
            <video className={styles.file} src={file.url} autoPlay loop muted />
          ) : (
            <div className={styles.unkownFile}>
              <FaFile className={styles.fileIcon} />
              <span className={styles.fileName}>
                {file.name.length > 18
                  ? file.name.slice(0, 18) + "..."
                  : file.name}
              </span>
            </div>
          )}
          <div className={styles.hovered}></div>
          <div
            className={styles.iconContainer}
            onClick={() => handleDeleteFile(index)}
          >
            <IoMdClose className={styles.icon} />
          </div>
        </div>
      ))}
    </div>
  ) : null;
};

export default FilesList;
