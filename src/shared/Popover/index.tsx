import { ReactElement, ReactNode, useEffect, useRef } from "react";
import styles from "./index.module.scss";
import useModal from "../../app/hooks/useModal";
import { AnimatePresence, motion } from "framer-motion";

interface PopoverProps {
  children: ReactElement<{ className?: string }>;
  popoverContent: ReactNode;
}

const Popover = ({ children, popoverContent }: PopoverProps) => {
  const { isOpen, onClose, toggle } = useModal(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!btnRef.current || !e.target) return;

      if (containerRef.current?.contains(e.target as Node)) return;
      if (btnRef.current.contains(e.target as Node)) return;

      onClose();
    };

    document.addEventListener("mousedown", onClickOutside);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div onClick={toggle} ref={btnRef}>
        {children}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0 }}
            className={styles.popoverContent}
          >
            {popoverContent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Popover;
