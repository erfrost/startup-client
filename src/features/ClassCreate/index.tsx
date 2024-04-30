import { Dispatch, SetStateAction } from "react";
import useModal from "../../app/hooks/useModal";
import styles from "./index.module.scss";
import Modal from "./ui/Modal";
import Class from "../../app/models/class";

interface ClassCreateProps {
  setClasses: Dispatch<SetStateAction<Class[]>>;
}

const ClassCreate = ({ setClasses }: ClassCreateProps) => {
  const { isOpen, onOpen, onClose } = useModal(false);

  return (
    <>
      <div className={styles.btn} onClick={onOpen}>
        Добавить класс
      </div>
      {isOpen && <Modal onClose={onClose} setClasses={setClasses} />}
    </>
  );
};

export default ClassCreate;
