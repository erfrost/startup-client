import { ChangeEvent, useEffect, useState } from "react";
import { AuthInputErrors, SignUpData } from "../../interfaces";
import styles from "./index.module.scss";
import { authValidate } from "../../utils/authValidate";
import { Link } from "react-router-dom";
import { UserRole } from "../../enums";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import AuthForm from "../../shared/authForm";
import AuthSelect from "../../shared/authSelect/authSelect";
import useSignUp from "../../app/hooks/requests/auth/useSignUp";

const SignUpPage = () => {
  const [data, setData] = useState<SignUpData>({
    email: "",
    password: "",
    nickname: "",
    role: UserRole.Student,
  });
  const [isHidePassword, setIsHidePassword] = useState<boolean>(true);
  const [inputErrors, setInputErrors] = useState<AuthInputErrors>({
    nickname: false,
    email: false,
    password: false,
  });
  const [validateErrors, setValidateErrors] = useState<string[]>([]);
  const signUp = useSignUp();

  const onSubmit = async (): Promise<void> => {
    setInputErrors({ nickname: false, email: false, password: false });

    const errorsArray: string[] = authValidate(
      setInputErrors,
      data.email,
      data.password,
      data.nickname
    );
    setValidateErrors(errorsArray);

    if (errorsArray.length) return;

    await signUp(data);
  };

  const keyHandler = async (e: KeyboardEvent) => {
    const key: string = e.key;

    if (key === "Enter") {
      await onSubmit();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyHandler);

    return () => document.removeEventListener("keydown", keyHandler);
  }, []);

  return (
    <AuthLayout title="Регистрация">
      <AuthForm
        formTitle="Никнейм"
        value={data.nickname}
        setData={setData}
        inputErrors={inputErrors}
      />
      <AuthForm
        formTitle="Электронная почта"
        value={data.email}
        setData={setData}
        inputErrors={inputErrors}
      />
      <AuthForm
        formTitle="Пароль"
        value={data.password}
        setData={setData}
        inputErrors={inputErrors}
        isHidePassword={isHidePassword}
        setIsHidePassword={setIsHidePassword}
      />
      <AuthSelect
        label="Кто вы?"
        options={[UserRole.Student, UserRole.Teacher, UserRole.Tutor]}
        value={data.role}
        setValue={(e: ChangeEvent<HTMLSelectElement>) =>
          setData((prevState: SignUpData) => {
            return { ...prevState, role: e.target.value as UserRole };
          })
        }
      />
      <ul>
        {validateErrors.map((err: string, index: number) => (
          <li className={styles.errorText} key={index}>
            {err}
          </li>
        ))}
      </ul>
      <div className={styles.buttons}>
        <Link to="/signIn" className={styles.blueLink}>
          Войти
        </Link>
        <div className={styles.blueBtn} onClick={onSubmit}>
          Зарегистрироваться
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;
