import React from "react";
import styles from "./index.module.scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LandingLayout from "../../layouts/LandingLayout/LandingLayout";
import LandingBlock from "../../shared/landingBlock";

const LandingPage = () => {
  return (
    <LandingLayout>
      <div className={styles.container}>
        <div className={styles.content}>
          <motion.div
            initial={{ x: -1000 }}
            animate={{ x: 0 }}
            transition={{
              duration: 0.35,
              ease: "easeInOut",
            }}
            className={styles.headerBlock}
          >
            <div className={styles.headerText}>
              Гибкий образовательный инструмент
              <br />
              <span className={styles.grayText}>
                для школьников, студентов и преподавателей
              </span>
            </div>
            <div className={styles.btnGroup}>
              <div className={styles.blueBtn}>Перейти</div>
              <Link to="/signUp" className={styles.whiteBtn}>
                Стать пользователем
              </Link>
            </div>
          </motion.div>
          <LandingBlock
            title="У нас есть задания и тесты."
            text="Создавайте задания и проверяйте ответы студентов, загруженные в виде
            файлов или созданные во встроенном редакторе."
            iconLink="https://xieffect.ru/assets/TasksIcon.svg"
            isSingleIcon={false}
            number={1}
          />
          <LandingBlock
            title="Нужно совершить видеозвонок?"
            text="Начинайте видеоконференцию в удобное для вас время, приглашайте до 100 участников, демонстрируйте ваш экран, общайтесь в чате не выходя из браузера."
            iconLink="https://xieffect.ru/assets/VideoIcon.svg"
            isSingleIcon={true}
            number={2}
          />
          <LandingBlock
            title="Больше нравится текстовый формат общения?"
            title2="Чаты в помощь."
            text="Неограниченное общение во встроенном чате с возможностью обмена файлами."
            iconLink="https://xieffect.ru/assets/ChatIcon.svg"
            isSingleIcon={true}
            number={3}
          />
          <LandingBlock
            title="А кроме того объявления и расписание."
            title2="Все в одном месте."
            text="Создавайте объявления о важных событиях и датах внутри сообществ или используйте как блог."
            iconLink="https://xieffect.ru/assets/AnnounceIcon.svg"
            isSingleIcon={false}
            number={4}
          />
        </div>
      </div>
    </LandingLayout>
  );
};

export default LandingPage;
