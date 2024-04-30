import { ReactNode } from "react";
import styles from "./index.module.scss";

interface BlueBtnProps {
  children: ReactNode;
  fontSize?: string;
  width?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const BlueBtn = ({
  children,
  fontSize,
  width,
  onClick,
  disabled,
}: BlueBtnProps) => {
  return (
    <div
      style={{ fontSize, width }}
      className={`${styles.btn} ${disabled && styles.disabled}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default BlueBtn;
