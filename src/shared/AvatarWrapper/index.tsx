import styles from "./index.module.scss";
import transformAvatar from "../../utils/transformAvatarUrl";

interface AvatarWrapperProps {
  src: string;
  size: string;
  onlineStatus?: boolean;
  onClick?: () => void;
}

const AvatarWrapper = ({
  src,
  size,
  onlineStatus,
  onClick,
}: AvatarWrapperProps) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`${styles.container} ${onlineStatus && styles.onlineStatus}`}
      onClick={onClick}
    >
      <img src={transformAvatar(src)} alt="avatar" className={styles.avatar} />
    </div>
  );
};

export default AvatarWrapper;
