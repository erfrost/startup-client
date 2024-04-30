import {
  Location,
  NavigateFunction,
  useLocation,
  useNavigate,
} from "react-router-dom";
import styles from "./index.module.scss";
import { useEffect } from "react";
import useJoinClass from "../../app/hooks/requests/class/useJoinClass";
import { motion } from "framer-motion";

const JoinToClass = () => {
  const joinClass = useJoinClass();
  const router: NavigateFunction = useNavigate();
  const { pathname }: Location = useLocation();

  useEffect(() => {
    async function fetch() {
      await joinClass(`http://localhost:3000${pathname}`);
      setTimeout(() => router("/home"), 2000);
    }

    fetch();
  }, []);

  return (
    <div className={styles.container}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className={styles.spinner}
      >
        <div className={`${styles.line} ${styles.line1}`}></div>
        <div className={`${styles.line} ${styles.line2}`}></div>
        <div className={`${styles.line} ${styles.line3}`}></div>
      </motion.div>
    </div>
  );
};

export default JoinToClass;
