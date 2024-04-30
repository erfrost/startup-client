import { ReactNode, useEffect } from "react";
import styles from "./index.module.scss";
import Header from "./ui/Header";
import Navigation from "./ui/Navigation";
import ServiceLayout from "../ServiceLayout";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  useEffect(() => {
    document.body.style.backgroundColor = "#F9F4FD";

    return () => {
      document.body.style.backgroundColor = "white";
    };
  }, []);

  return (
    <ServiceLayout>
      <div className={styles.container}>
        <Header />
        <div className={styles.navigation}>
          <Navigation />
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </ServiceLayout>
  );
};

export default MainLayout;
