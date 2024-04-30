import { IconType } from "react-icons";
import styles from "./index.module.scss";

interface AlertTextProps {
  text: string;
  icon?: IconType;
}

const AlertText = ({ text, icon: Icon }: AlertTextProps) => {
  return (
    <div className={styles.container}>
      <span className={styles.text}>{text}</span>
      <Icon className={styles.icon} />
    </div>
  );
};

export default AlertText;
