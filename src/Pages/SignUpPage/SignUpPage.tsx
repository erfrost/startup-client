import { useState } from "react";
import { AuthInputErrors, AuthResponse, SignUpData } from "../../interfaces";
import AuthForm from "../../Components/AuthForm/AuthForm";
import AuthLayout from "../../Layouts/AuthLayout/AuthLayout";
import styles from "./SignUpPage.module.scss";
import { authValidate } from "../../utils/authValidate";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { UserRole } from "../../enums";
import axiosInstance from "../../axios.config";
import Notification from "../../Components/Notification/Notification";
import { AxiosResponse } from "axios";
import { useRecoilState } from "recoil";
import { userIdState } from "../../storage/atoms";

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
  const [userId, setUserId] = useRecoilState<string | undefined>(userIdState);
  const [error, setError] = useState<string>("");
  const router: NavigateFunction = useNavigate();

  const onSubmit = async (): Promise<void> => {
    setError("");
    setInputErrors({ nickname: false, email: false, password: false });

    const errorsArray: string[] = authValidate(
      data.email,
      data.password,
      setInputErrors,
      data.nickname
    );
    setValidateErrors(errorsArray);

    try {
      if (errorsArray.length) return;
      const res: AxiosResponse = await axiosInstance.post(
        "auth/createUser",
        data
      );
      console.log(res);
      const { user_id, access_token, refresh_token }: AuthResponse = res.data;

      setUserId(user_id);
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      router("/home");
    } catch (error: any) {
      if (error.response.status === 400) {
        setError(
          error?.response?.data?.message ||
            "Произошла ошибка запроса. Попробуйте позднее"
        );
      }
    }
  };

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
      {error && (
        <Notification type="error" title="Произошла ошибка!" text={error} />
      )}
    </AuthLayout>
  );
};

export default SignUpPage;
