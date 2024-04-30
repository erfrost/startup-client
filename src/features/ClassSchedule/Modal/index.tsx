import { useState } from "react";
import ModalLayout from "../../../layouts/ModalLayout";
import styles from "./index.module.scss";
import Form from "./ui/Form";
import { IoClose } from "react-icons/io5";
import FileForm from "./ui/FileForm";
import useCreateTask from "../../../app/hooks/requests/class/useCreateTask";
import { useParams } from "react-router-dom";
import TasksList from "./ui/TasksList";
import UploadedFile from "../../../app/models/uploadedFile";

interface ModalProps {
  onClose: () => void;
  date: string;
  role: string;
}

const Modal = ({ onClose, date, role }: ModalProps) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const { class_id: classId } = useParams();

  const createTask = useCreateTask(classId, date);

  const onSubmit = async () => {
    await createTask({ title, description, files });
    onClose();
  };

  return (
    <ModalLayout onClose={onClose} closingByClick={false}>
      <div className={styles.container}>
        <TasksList classId={classId} date={date} />
        {role === "teacher" && (
          <>
            <div className={styles.divider}></div>
            <div className={styles.column}>
              <div className={styles.header}>
                <span className={styles.modalTitle}>
                  Добавление домашнего задания
                </span>
              </div>
              <Form
                label="Название"
                placeholder="Название задания"
                type="input"
                value={title}
                setValue={setTitle}
              />
              <Form
                label="Описание"
                placeholder="Описание задания"
                type="area"
                value={description}
                setValue={setDescription}
              />
              <FileForm
                label="Прикрепить файлы"
                setFiles={setFiles}
                files={files}
              />
              <div className={styles.submitBtn} onClick={onSubmit}>
                Создать задание
              </div>
            </div>
          </>
        )}
      </div>
    </ModalLayout>
  );
};

export default Modal;
