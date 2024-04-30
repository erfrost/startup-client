import { IoSettingsOutline } from "react-icons/io5";
import styles from "./index.module.scss";

interface SettingsBtnProps {
  onClick: () => void;
}

const SettingsBtn = ({ onClick }: SettingsBtnProps) => {
  return (
    <div className={styles.iconBtn} onClick={onClick}>
      <IoSettingsOutline className={styles.icon} />
    </div>
  );
};

export default SettingsBtn;
