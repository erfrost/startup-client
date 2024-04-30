import styles from "./index.module.scss";
import { motion } from "framer-motion";

interface UpdatedAlertProps {
  onReset: () => void;
  onSubmit: () => void;
}

const UpdatedAlert = ({ onReset, onSubmit }: UpdatedAlertProps) => {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <span className={styles.text}>У вас есть несохранённые изменения</span>
      <div className={styles.buttonGroup}>
        <div className={`${styles.btn} ${styles.whiteBtn}`} onClick={onReset}>
          Сброс
        </div>
        <div className={`${styles.btn} ${styles.greenBtn}`} onClick={onSubmit}>
          Сохранить изменения
        </div>
      </div>
    </motion.div>
  );
};

export default UpdatedAlert;
