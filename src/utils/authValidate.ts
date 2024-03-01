import { Dispatch, SetStateAction } from "react";
import { AuthInputErrors } from "../interfaces";

interface PasswordValidateReturn {
  uppercaseCount: number;
  digitCount: number;
}

export const authValidate = (
  email: string,
  password: string,
  setValidate: Dispatch<SetStateAction<AuthInputErrors>>,
  nickname?: string
): string[] => {
  const errors: string[] = [];
  if (typeof nickname !== "undefined" && !nickname.length) {
    setValidate((prevState) => {
      return { ...prevState, nickname: true };
    });

    errors.push("Некорректный никнейм");
  }
  console.log(email, email.includes("@"));
  if (!email.includes("@")) {
    setValidate((prevState) => {
      return { ...prevState, email: true };
    });

    errors.push("Некорректный email");
  }

  if (password.length < 8) {
    setValidate((prevState) => {
      return { ...prevState, password: true };
    });

    errors.push("Пароль должен содержать не менее 7 символов");
  }

  const passwordValidateResult: PasswordValidateReturn =
    passwordValidate(password);

  if (passwordValidateResult.uppercaseCount === 0) {
    setValidate((prevState) => {
      return { ...prevState, password: true };
    });

    errors.push("Пароль должен содержать минимум 1 заглавную букву");
  }
  if (passwordValidateResult.digitCount === 0) {
    setValidate((prevState) => {
      return { ...prevState, password: true };
    });

    errors.push("Пароль должен содержать минимум 1 цифру");
  }

  return errors;
};

const passwordValidate = (password: string): PasswordValidateReturn => {
  let uppercaseCount: number = 0;
  let digitCount: number = 0;

  for (let i: number = 0; i < password.length; i++) {
    const char: string = password[i];
    if (char >= "A" && char <= "Z") uppercaseCount++;
    else if (char >= "0" && char <= "9") digitCount++;
  }

  return { uppercaseCount, digitCount };
};
