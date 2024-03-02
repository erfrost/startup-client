import { useState } from "react";
import styles from "./SignInPage.module.scss";
import { authValidate } from "../../utils/authValidate";
import AuthForm from "../../Components/AuthForm/AuthForm";
import AuthLayout from "../../Layouts/AuthLayout/AuthLayout";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { AuthInputErrors, AuthResponse, SignInData } from "../../interfaces";
import Notification from "../../Components/Notification/Notification";
import { AxiosResponse } from "axios";
import axiosInstance from "../../axios.config";
import { useRecoilState } from "recoil";
import { userIdState } from "../../storage/atoms";

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
  const [userId, setUserId] = useRecoilState<string | undefined>(userIdState);
  const [error, setError] = useState<string>("");
  const router: NavigateFunction = useNavigate();

  const onSubmit = async (): Promise<void> => {
    setInputErrors({ email: false, password: false });

    const errorsArray: string[] = authValidate(
      data.email,
      data.password,
      setInputErrors
    );
    setValidateErrors(errorsArray);

    try {
      if (errorsArray.length) return;
      const res: AxiosResponse = await axiosInstance.post("auth/signIn", data);
      console.log(res);
      const { user_id, access_token, refresh_token }: AuthResponse = res.data;

      setUserId(user_id);
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      router("/home");
    } catch (error: any) {
      setError(
        error?.response?.data?.message ||
          "Произошла ошибка запроса. Попробуйте позднее"
      );
    }
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
      {error && (
        <Notification type="error" title="Произошла ошибка!" text={error} />
      )}
    </AuthLayout>
  );
};

export default SignInPage;
