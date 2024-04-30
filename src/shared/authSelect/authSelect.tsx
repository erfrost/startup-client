import { ChangeEvent } from "react";
import styles from "./authSelect.module.scss";
import { MdKeyboardArrowDown } from "react-icons/md";

interface AuthSelectProps {
  label: string;
  options: string[];
  value: string;
  setValue: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const AuthSelect = ({ label, options, value, setValue }: AuthSelectProps) => {
  return (
    <div className={styles.container}>
      <span className={styles.label}>{label}</span>
      <div className={styles.selectContainer}>
        <select className={styles.select} value={value} onChange={setValue}>
          {options.map((option: string, index: number) => (
            <option className={styles.option} key={index}>
              {option}
            </option>
          ))}
        </select>
        <MdKeyboardArrowDown className={styles.arrow} />
      </div>
    </div>
  );
};

export default AuthSelect;
