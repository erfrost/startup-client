import { ChangeEvent, Dispatch, SetStateAction } from "react";
import styles from "./index.module.scss";
import { FaRegSmile } from "react-icons/fa";

interface InputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const Input = ({ value, setValue }: InputProps) => {
  return (
    <div className={styles.container}>
      <input
        placeholder="Напишите сообщение..."
        className={styles.input}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
      />
      <FaRegSmile className={styles.icon} />
    </div>
  );
};

export default Input;
