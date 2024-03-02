import { useRef } from "react";
import styles from "./LandingBlock.module.scss";
import { motion, useInView } from "framer-motion";

interface LandingBlockProps {
  title: string;
  title2?: string;
  text: string;
  iconLink: string;
  isSingleIcon: boolean;
  number: number;
}

const LandingBlock = ({
  title,
  title2,
  text,
  iconLink,
  isSingleIcon,
  number,
}: LandingBlockProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const xOffset: number = number % 2 === 0 ? -300 : 300;

  return (
    <motion.div
      ref={ref}
      initial={{ x: xOffset, opacity: 0 }}
      animate={isInView ? { x: 0, opacity: 1 } : {}}
      transition={{
        duration: 0.55,
        delay: 0.3,
        ease: "easeInOut",
      }}
      className={styles.container}
    >
      <img
        src={iconLink}
        alt="icons"
        className={`${styles.icon} ${isSingleIcon && styles.singleIcon}`}
      />
      <div className={styles.titlesColumn}>
        <span className={styles.title}>{title}</span>
        {title2 && <span className={styles.title}>{title2}</span>}
      </div>
      <span className={styles.text}>{text}</span>
      <img
        src="https://www.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej.png"
        alt="preview"
        className={styles.image}
      />
    </motion.div>
  );
};

export default LandingBlock;
