import { ChangeEvent, useEffect, useState } from "react";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import styles from "./index.module.scss";
import useConfirmCode from "../../app/hooks/requests/auth/useConfirmCode";
import { NavigateFunction, useNavigate } from "react-router-dom";

const ConfirmCode = () => {
  const [code, setCode] = useState<string[]>(["", "", "", "", ""]);
  const [isValidCode, setIsValidCode] = useState<boolean>(true);
  const router: NavigateFunction = useNavigate();
  const sendCode = useConfirmCode();

  useEffect(() => {
    async function request() {
      if (!code.includes("")) {
        const isValid: boolean = await sendCode(code.join(""));

        if (isValid) router("/home");
        else setIsValidCode(false);
      }
    }

    request();
  }, [code]);

  const onChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value: string = e.target.value;
    if (value.length > 1) return;

    let newCode: string[] = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);

    const currentInput: HTMLElement | null = document.getElementById(
      `input_${index}`
    );
    if (!currentInput) return;
    currentInput.blur();

    const nextInput: HTMLElement | null = document.getElementById(
      `input_${value.length ? index + 1 : index - 1}`
    );
    if (!nextInput) return;
    nextInput.focus();
  };

  return (
    <AuthLayout title="Код Подтверждения">
      <div className={styles.inputsList}>
        {code.map((value: string, index) => (
          <input
            className={`${styles.input} ${!isValidCode && styles.error}`}
            id={`input_${index}`}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, index)}
            key={index}
          />
        ))}
      </div>
    </AuthLayout>
  );
};

export default ConfirmCode;
