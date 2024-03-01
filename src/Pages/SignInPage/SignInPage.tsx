import { useState } from "react";
import styles from "./SignInPage.module.scss";
import { authValidate } from "../../utils/authValidate";
import AuthForm from "../../Components/AuthForm/AuthForm";
import AuthLayout from "../../Layouts/AuthLayout/AuthLayout";
import { Link } from "react-router-dom";
import { AuthInputErrors, SignInData } from "../../interfaces";
import Notification from "../../Components/Notification/Notification";

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

  const onSubmit = (): void => {
    setInputErrors({ email: false, password: false });
    setValidateErrors(authValidate(data.email, data.password, setInputErrors));
  };

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
