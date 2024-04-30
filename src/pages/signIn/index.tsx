import { Key, useEffect, useState } from "react";
import styles from "./index.module.scss";
import { authValidate } from "../../utils/authValidate";
import { Link } from "react-router-dom";
import { AuthInputErrors, SignInData } from "../../interfaces";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import AuthForm from "../../shared/authForm";
import useSignIn from "../../app/hooks/requests/auth/useSignIn";

const SignInPage = () => {
  const [data, setData] = useState<SignInData>({
    email: "",
    password: "",
  });
  const [isHidePassword, setIsHidePassword] = useState<boolean>(true);
  const [inputErrors, setInputErrors] = useState<AuthInputErrors>({
    email: false,
    password: false,
  });
  const [validateErrors, setValidateErrors] = useState<string[]>([]);
  const signIn = useSignIn();

  const onSubmit = async (): Promise<void> => {
    setInputErrors({ email: false, password: false });

    const errorsArray: string[] = authValidate(
      setInputErrors,
      data.email,
      data.password
    );
    setValidateErrors(errorsArray);

    if (!errorsArray.length) await signIn(data);
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
  }, [data]);

  return (
    <AuthLayout title="Вход в аккаунт">
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
      <span className={`${styles.formTitle} ${styles.link}`}>
        Восстановить пароль
      </span>
      <ul>
        {validateErrors.map((err: string, index: number) => (
          <li className={styles.errorText} key={index}>
            {err}
          </li>
        ))}
      </ul>
      <div className={styles.buttons}>
        <Link to="/signUp" className={styles.blueLink}>
          Зарегистрироваться
        </Link>
        <div className={styles.blueBtn} onClick={onSubmit}>
          Войти
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignInPage;
