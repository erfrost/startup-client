import styles from "./Notification.module.scss";

interface NotificationProps {
  type: string;
  title: string;
  text: string;
}

const Notification = ({ type, title, text }: NotificationProps) => {
  return (
    <div
      className={`${styles.container} ${
        type === "error"
          ? styles.error
          : type === "success"
          ? styles.success
          : type === "warning"
          ? styles.warning
          : null
      }`}
    >
      <span className={styles.title}>{title}</span>
      <span className={styles.text}>{text}</span>
    </div>
  );
};

export default Notification;
