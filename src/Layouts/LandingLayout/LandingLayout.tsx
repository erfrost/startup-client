import React from "react";
import { ReactNode } from "react";
import styles from "./LandingLayout.module.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

interface LandingLayoutProps {
  children: ReactNode;
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={logo} alt="logo" />
        {/* <div className={styles.navigation}>
          <span className={styles.navBtn}>Ученикам</span>
          <span className={styles.navBtn}>Учителям</span>
          <span className={styles.navBtn}>Репетиторам</span>
        </div> */}
        <Link to="/signIn" className={styles.authBtn}>
          Войти
        </Link>
      </div>
      {children}
    </div>
  );
};

export default LandingLayout;
