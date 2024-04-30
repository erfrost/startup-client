import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./index.module.scss";
import { LuSearch } from "react-icons/lu";

interface SearchInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onEnterClick: () => void;
}

const SearchInput = ({ value, setValue, onEnterClick }: SearchInputProps) => {
  const [focus, setFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    input.addEventListener("focus", () => setFocus(true));
    input.addEventListener("blur", () => setFocus(false));

    return () => {
      input.addEventListener("focus", () => setFocus(true));
      input.addEventListener("blur", () => setFocus(false));
    };
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && focus === true) onEnterClick();
    });
  }, [focus]);

  return (
    <div className={styles.container}>
      <LuSearch className={styles.icon} />
      <input
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setValue((prevState) => {
            const value: string = e.target.value;
            if (value.length > 100) return prevState;
            else return value;
          })
        }
        ref={inputRef}
        className={styles.input}
        placeholder="Искать"
      />
    </div>
  );
};

export default SearchInput;
