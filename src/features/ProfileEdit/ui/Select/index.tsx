import { ChangeEvent } from "react";
import styles from "./index.module.scss";
import { MdKeyboardArrowDown } from "react-icons/md";

interface SelectProps {
  options: string[];
  value: string;
  setValue: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({ options, value, setValue }: SelectProps) => {
  return (
    <div className={styles.container}>
      <select className={styles.select} value={value} onChange={setValue}>
        {options.map((option: string, index: number) => (
          <option className={styles.option} key={index}>
            {option}
          </option>
        ))}
      </select>
      <MdKeyboardArrowDown className={styles.icon} />
    </div>
  );
};

export default Select;
