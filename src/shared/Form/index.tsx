import { ChangeEvent } from "react";
import styles from "./index.module.scss";

interface FormProps {
  label: string;
  placeholder: string;
  value: string;
  setValue: (e: ChangeEvent<HTMLInputElement>) => void;
  colorTheme: "rose" | "blue" | "error";
}

const Form = ({
  label,
  placeholder,
  value,
  setValue,
  colorTheme,
}: FormProps) => {
  return (
    <div
      className={`${styles.form} ${
        colorTheme === "rose"
          ? styles.themeRose
          : colorTheme === "blue"
          ? styles.themeBlue
          : styles.themeError
      }`}
    >
      <span className={styles.label}>{label}</span>
      <input
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

export default Form;
