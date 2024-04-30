import { ReactNode, useState } from "react";
import styles from "./index.module.scss";
import { AnimatePresence, motion } from "framer-motion";

interface TooltipProps {
  children: ReactNode;
  tooltipContent: ReactNode;
}

const Tooltip = ({ children, tooltipContent }: TooltipProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0 }}
            className={styles.tooltipContent}
          >
            {tooltipContent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
