import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import styles from "./index.module.scss";
import { FiUpload } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import useUploadFile from "../../../../../app/hooks/requests/useUploadFile";
import UploadedFile from "../../../../../app/models/uploadedFile";

interface FileFormProps {
  label: string;
  files: UploadedFile[];
  setFiles: Dispatch<SetStateAction<UploadedFile[]>>;
}

const FileForm = ({ label, files, setFiles }: FileFormProps) => {
  const [blobFiles, setBlobFiles] = useState<File[]>([]);
  const uploadFile = useUploadFile();

  const onAddFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file: File = e.target.files[0];
    if (!file) return;

    const newFile: UploadedFile = await uploadFile(file);

    setFiles((prevState) => {
      return [...prevState, newFile];
    });
    setBlobFiles((prevState) => {
      return [...prevState, file];
    });
  };

  const onDelete = (fileIndex: number) => {
    const filteredFiles: UploadedFile[] = files.filter(
      (_, index: number) => index !== fileIndex
    );
    setFiles(filteredFiles);

    const filteredBlobFiles: File[] = blobFiles.filter(
      (_, index: number) => index !== fileIndex
    );
    setBlobFiles(filteredBlobFiles);
  };

  return (
    <div className={styles.container}>
      <span className={styles.label}>{label}</span>
      <div className={styles.uploadList}>
        <div className={styles.inputContainer}>
          <div className={styles.btn}>
            <FiUpload className={styles.icon} />
          </div>
          <input
            className={styles.input}
            type="file"
            onChange={(e: ChangeEvent<HTMLInputElement>) => onAddFile(e)}
          />
        </div>
        {blobFiles.map((file: File, index: number) => (
          <div className={styles.fileContainer} key={index}>
            {file.type.indexOf("image") === -1 ? (
              <div className={styles.unkownFile}>
                <span className={styles.unknownFileName}>{file.name}</span>
              </div>
            ) : (
              <img
                src={URL.createObjectURL(file)}
                alt="file"
                className={styles.file}
                key={index}
              />
            )}
            <div className={styles.hovered} onClick={() => onDelete(index)}>
              <MdDelete className={styles.deleteIcon} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileForm;
