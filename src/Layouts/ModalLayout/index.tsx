import { ReactNode, useEffect } from "react";
import styles from "./index.module.scss";
import { IoClose } from "react-icons/io5";

interface ModalLayoutProps {
  children: ReactNode;
  onClose: () => void;
  closingByClick: boolean;
}

const ModalLayout = ({
  children,
  onClose,
  closingByClick,
}: ModalLayoutProps) => {
  useEffect(() => {
    const onClick = (e: Event) => {
      if (!closingByClick) return;

      const container: Element = document.querySelector(
        ".ModalLayout_container__tB0kb"
      );
      const modal: Element | null = document.querySelector(
        ".ModalLayout_content__zngVa"
      );
      if (!modal) return;

      if (container.isEqualNode(e.target as Node)) onClose();
    };

    document.addEventListener("click", onClick);

    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>{children}</div>
      {!closingByClick && (
        <div className={styles.closeBtn} onClick={onClose}>
          <IoClose className={styles.icon} />
        </div>
      )}
    </div>
  );
};

export default ModalLayout;
