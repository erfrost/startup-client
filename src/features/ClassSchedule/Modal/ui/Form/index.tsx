import { ChangeEvent, Dispatch, SetStateAction } from "react";
import styles from "./index.module.scss";

interface FormProps {
  label: string;
  placeholder: string;
  type: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const Form = ({ label, placeholder, type, value, setValue }: FormProps) => {
  return (
    <div className={styles.container}>
      <span className={styles.label}>{label}</span>
      {type === "input" && (
        <input
          className={styles.input}
          placeholder={placeholder}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
        />
      )}
      {type === "area" && (
        <textarea
          className={`${styles.input} ${styles.textarea}`}
          placeholder={placeholder}
          value={value}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setValue(e.target.value)
          }
        />
      )}
    </div>
  );
};

export default Form;
