import { useState } from "react";
import Class from "../../../../app/models/class";
import ModalLayout from "../../../../layouts/ModalLayout";
import styles from "./index.module.scss";
import BlueBtn from "../../../../shared/BlueBtn";

interface ModalProps {
  classItem: Class;
  onClose: () => void;
}

const Modal = ({ classItem, onClose }: ModalProps) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const onCopyLink = () => {
    navigator.clipboard.writeText(classItem.join_link);

    setIsCopied(true);
  };

  return (
    <ModalLayout onClose={onClose} closingByClick>
      <div className={styles.title}>Параметры</div>
      <div className={styles.block}>
        <span className={styles.blockTitle}>
          Ссылка для приглашения в класс
        </span>
        <div className={styles.linkContainer}>
          <span className={styles.link}>{classItem.join_link}</span>
          <BlueBtn onClick={onCopyLink} disabled={isCopied}>
            {isCopied ? "Скопировано" : "Скопировать"}
          </BlueBtn>
        </div>
      </div>
    </ModalLayout>
  );
};

export default Modal;
