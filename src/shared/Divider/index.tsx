import styles from "./index.module.scss";

interface DividerProps {
  width?: string;
  height?: string;
}

const Divider = ({ width, height }: DividerProps) => {
  return <div style={{ width, height }} className={styles.container}></div>;
};

export default Divider;
