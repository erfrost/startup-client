import { ReactNode } from "react";
import styles from "./AuthLayout.module.scss";
import { IoMdArrowRoundBack } from "react-icons/io";
import logo from "../../assets/logo.svg";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
}

const AuthLayout = ({ children, title }: AuthLayoutProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.routeBtn} onClick={() => window.history.back()}>
        <IoMdArrowRoundBack className={styles.icon} />
        <span className={styles.text}>Назад</span>
      </div>
      <div className={styles.content}>
        <div className={styles.formsContainer}>
          <div className={styles.header}>
            <img src={logo} alt="logo" />
            <span className={styles.title}>{title}</span>
          </div>
          <div className={styles.forms}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
