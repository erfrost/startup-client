import { ChangeEvent } from "react";
import useModal from "../../../app/hooks/useModal";
import { Lesson } from "../../../app/models/lesson";
import styles from "./index.module.scss";
import Modal from "../Modal";

interface LessonProps {
  lesson: Lesson;
  index: number;
  isEditActive: boolean;
  onChangeName: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
  date: string;
  role: string;
}

const LessonItem = ({
  lesson,
  index,
  isEditActive,
  onChangeName,
  date,
  role,
}: LessonProps) => {
  const { isOpen, onOpen, onClose } = useModal(false);

  const onOpenModal = () => {
    if (!isEditActive) onOpen();
  };

  return (
    <>
      <div
        className={`${styles.lesson} ${isEditActive && styles.hoveredDisabled}`}
        key={index}
        onClick={onOpenModal}
      >
        <span className={styles.number}>{index + 1}.</span>
        <span className={styles.time}>{lesson.time}</span>
        <input
          className={`${styles.nameInput} ${
            isEditActive && styles.nameInputActive
          }`}
          value={lesson.name}
          disabled={!isEditActive}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChangeName(e, index)
          }
        />
      </div>
      {isOpen && <Modal onClose={onClose} date={date} role={role} />}
    </>
  );
};

export default LessonItem;
