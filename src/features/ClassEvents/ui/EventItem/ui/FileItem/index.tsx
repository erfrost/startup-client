import { useState } from "react";
import { EventFile } from "../../../../../../app/models/event";
import FileViewModal from "../../../../../../shared/FileViewModal";
import styles from "./index.module.scss";

interface FileItemProps {
  file: EventFile;
}

const FileItem = ({ file }: FileItemProps) => {
  const [viewFile, setViewFile] = useState<EventFile | undefined>(undefined);

  return (
    <>
      {file.type.startsWith("image/") ? (
        <img
          src={file.url}
          alt="image"
          className={styles.file}
          onClick={() => setViewFile(file)}
        />
      ) : file.type.startsWith("video/") ? (
        <video
          src={file.url}
          className={styles.file}
          autoPlay
          muted
          loop
          onClick={() => setViewFile(file)}
        />
      ) : null}
      {viewFile && <FileViewModal file={file} setModalFile={setViewFile} />}
    </>
  );
};

export default FileItem;
