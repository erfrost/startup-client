import { GoPaperclip } from "react-icons/go";
import styles from "./index.module.scss";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import useUploadFile from "../../../../app/hooks/requests/useUploadFile";
import UploadedFile from "../../../../app/models/uploadedFile";
import { toast } from "react-toastify";

interface FileInputProps {
  files: UploadedFile[];
  setFiles: Dispatch<SetStateAction<UploadedFile[]>>;
}

const FileInput = ({ files, setFiles }: FileInputProps) => {
  const uploadFile = useUploadFile();
  const onSelectFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const filesList: FileList = e.target?.files;
    const selectedFiles: File[] = Array.from(filesList);

    if (!filesList.length) return;
    if (files.length + selectedFiles.length > 8)
      return toast.warning(
        "Не все файлы загружены! Нельзя загружать больше 8 файлов за раз"
      );

    const uploadedFiles: UploadedFile[] = await Promise.all(
      selectedFiles.map(async (file: File) => {
        return await uploadFile(file);
      })
    );

    setFiles((prevState: UploadedFile[]) => [...prevState, ...uploadedFiles]);
  };

  return (
    <div className={styles.container}>
      <input
        onChange={onSelectFile}
        type="file"
        multiple
        className={styles.input}
      />
      <div className={styles.iconContainer}>
        <GoPaperclip className={styles.icon} />
      </div>
    </div>
  );
};

export default FileInput;
