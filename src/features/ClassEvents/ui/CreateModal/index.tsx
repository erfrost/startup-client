import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import ModalLayout from "../../../../layouts/ModalLayout";
import styles from "./index.module.scss";
import { FiUpload } from "react-icons/fi";
import UploadedFile from "../../../../app/models/uploadedFile";
import useUploadFile from "../../../../app/hooks/requests/useUploadFile";
import Media from "./ui/Media";
import { toast } from "react-toastify";
import Parameters from "./ui/Parameters";
import Divider from "../../../../shared/Divider";
import useCreateEvent from "../../../../app/hooks/requests/event/useCreateEvent";
import { Event } from "../../../../app/models/event";

interface ModalProps {
  onClose: () => void;
  setEvents: Dispatch<SetStateAction<Event[]>>;
}

export interface NewEvent {
  title: string;
  description: string;
  files: UploadedFile[];
  cover: string;
  parameters: Parameter[];
}

export interface BlobFile {
  blob: Blob;
  type: string;
}

export interface Parameter {
  title: string;
  value: string;
}

const CreateModal = ({ onClose, setEvents }: ModalProps) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [blobFiles, setBlobFiles] = useState<BlobFile[]>([]);
  const [coverFile, setCoverFile] = useState<UploadedFile | null>(null);
  const [blobCover, setBlobCover] = useState<BlobFile | null>(null);
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const classId: string = localStorage.getItem("class_id");
  const uploadFile = useUploadFile();
  const createEvent = useCreateEvent(classId);

  const onAddFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file: File = e.target.files[0];
    if (!file) return;
    if (blobFiles.length === 3 || files.length === 3) {
      return toast.warning("Можно загрузить до 3 фото или видео файлов");
    }

    const newFile: UploadedFile = await uploadFile(file);

    setFiles((prevState) => {
      return [...prevState, newFile];
    });
    setBlobFiles((prevState) => {
      return [...prevState, { blob: file, type: file.type }];
    });
  };

  const onDeleteFile = (index: number) => {
    setBlobFiles((prevState: BlobFile[]) => {
      return [...prevState].filter((_, i: number) => i !== index);
    });
    setFiles((prevState: UploadedFile[]) => {
      return [...prevState].filter((_, i: number) => i !== index);
    });
  };

  const onAddCover = async (e: ChangeEvent<HTMLInputElement>) => {
    const file: File = e.target.files[0];
    if (!file) return;

    const newFile: UploadedFile = await uploadFile(file);

    setBlobCover({ blob: file, type: file.type });
    setCoverFile(newFile);
  };

  const onDeleteCover = () => {
    setBlobCover(null);
    setCoverFile(null);
  };

  const onCreateEvent = async () => {
    if (!title) {
      return toast.warning("Название мероприятия обязательно для заполнения");
    }

    const data: NewEvent = {
      title,
      description,
      files,
      cover: coverFile?.url,
      parameters,
    };

    const newEvent: Event = await createEvent(data);
    setEvents((prevState: Event[]) => [newEvent, ...prevState]);
    onClose();
  };

  return (
    <ModalLayout onClose={onClose} closingByClick={false}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.column}>
            <span
              className={styles.title}
              style={{ fontSize: "22px", fontWeight: 500 }}
            >
              Создание мероприятия
            </span>
            <div className={styles.forms}>
              <input
                className={styles.input}
                placeholder="Название"
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
              />
              <textarea
                className={`${styles.input} ${styles.textarea}`}
                placeholder="Описание"
                value={description}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setDescription(e.target.value)
                }
              />
            </div>
            <span className={styles.title}>Добавление фото и видео</span>
            <div className={styles.filesList}>
              <div className={styles.fileInputContainer}>
                <input
                  className={styles.fileInput}
                  type="file"
                  accept="image/*, video/*"
                  onChange={onAddFile}
                />
                <FiUpload className={styles.icon} />
              </div>
              {blobFiles.map((file: BlobFile, index: number) => (
                <Media
                  key={index}
                  file={file}
                  onDeleteFile={() => onDeleteFile(index)}
                />
              ))}
            </div>
            <span className={styles.title}>Загрузка фона</span>
            {blobCover ? (
              <Media isCover file={blobCover} onDeleteFile={onDeleteCover} />
            ) : (
              <div
                className={styles.fileInputContainer}
                style={{ width: "100%", height: "200px" }}
              >
                <input
                  className={styles.fileInput}
                  type="file"
                  accept="image/*"
                  onChange={onAddCover}
                />
                <FiUpload className={styles.icon} />
              </div>
            )}
          </div>
          <div className={styles.column} style={{ width: "525px" }}>
            <span className={styles.title}>Добавление параметров</span>
            <Parameters parameters={parameters} setParams={setParameters} />
          </div>
        </div>
        <Divider />
        <div
          className={`${styles.createBtn} ${!title && styles.disabledBtn}`}
          onClick={onCreateEvent}
        >
          Создать мероприятие
        </div>
      </div>
    </ModalLayout>
  );
};

export default CreateModal;
