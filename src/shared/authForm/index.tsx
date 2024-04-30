import { ChangeEvent, Dispatch, SetStateAction } from "react";
import styles from "./index.module.scss";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { AuthInputErrors, SignInData, SignUpData } from "../../interfaces";

interface AuthFormProps {
  formTitle: string;
  value: string;
  setData: Dispatch<SetStateAction<SignInData | SignUpData>>;
  inputErrors: AuthInputErrors;
  isHidePassword?: boolean;
  setIsHidePassword?: Dispatch<SetStateAction<boolean>>;
}

const inputErrorsCheck = (
  inputErrors: AuthInputErrors,
  formTitle: string
): boolean => {
  if (formTitle === "Никнейм" && inputErrors.nickname) return true;
  if (formTitle === "Электронная почта" && inputErrors.email) return true;
  if (formTitle === "Пароль" && inputErrors.password) return true;
  else return false;
};

const AuthForm = ({
  formTitle,
  value,
  setData,
  inputErrors,
  isHidePassword,
  setIsHidePassword,
}: AuthFormProps) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const stroke: string = e.target.value;
    const filteredString = stroke.replace(
      /[^a-zA-Zа-яА-Я0-9!@#$%^&*()-_=+ ]/g,
      ""
    );

    setData((prevState) => {
      if (stroke.length > 40) return prevState;

      if (formTitle === "Никнейм") {
        return { ...prevState, nickname: filteredString };
      } else if (formTitle === "Электронная почта") {
        return { ...prevState, email: filteredString };
      } else if (formTitle === "Пароль") {
        return { ...prevState, password: filteredString };
      }
    });
  };

  return (
    <div className={styles.form}>
      <span className={styles.formTitle}>{formTitle}</span>
      <input
        className={`${styles.input} ${
          inputErrorsCheck(inputErrors, formTitle) && styles.inputError
        }`}
        value={value}
        type={isHidePassword ? "password" : "text"}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
      />
      {formTitle === "Пароль" &&
        (isHidePassword ? (
          <FaRegEye
            className={styles.icon}
            onClick={() => setIsHidePassword(false)}
          />
        ) : (
          <FaRegEyeSlash
            className={styles.icon}
            onClick={() => setIsHidePassword(true)}
          />
        ))}
    </div>
  );
};

export default AuthForm;
