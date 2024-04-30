import { Location, useLocation } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import styles from "./index.module.scss";
import { Navigation, navigation } from "./mock/navigation";
import QuestionCreate from "../../features/QuestionCreate";

const QuestionAnswer = () => {
  const location: Location = useLocation();
  const currentPage: string = location.search.slice(1);

  const renderPage = () => {
    if (currentPage === "") return null;
    if (currentPage === "askQuestion") return <QuestionCreate />;
    if (currentPage === "tags") return null;
    if (currentPage === "friends") return null;
    if (currentPage === "myQuestions") return null;
    if (currentPage === "saved") return null;
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.block}>
          <div className={styles.page}>
            <span className={styles.title}>Вопрос - ответ</span>
            <input className={styles.input} placeholder="Ваш вопрос..." />
            {renderPage()}
          </div>
          <div className={styles.navigation}>
            {navigation.map((nav: Navigation, index: number) => (
              <a href={nav.link} className={styles.navBtn} key={index}>
                {nav.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default QuestionAnswer;
