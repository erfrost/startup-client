import { ChangeEvent, useState } from "react";
import styles from "./index.module.scss";
import { toast } from "react-toastify";
import useCreateQuestion from "../../app/hooks/requests/Q&A/useCreateQuestion";
import { NavigateFunction, useNavigate } from "react-router-dom";

const QuestionCreate = () => {
  const [step, setStep] = useState<number>(1);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [secondDescription, setSecondDescription] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const userId: string = localStorage.getItem("user_id");
  const createQuestion = useCreateQuestion(userId);
  const router: NavigateFunction = useNavigate();

  const onNextStep = (newStep: number) => {
    if (newStep - (step + 1) !== 0) return;
    setStep(newStep);
  };

  const onCreateQuestion = async () => {
    if (step < 5) return;
    if (
      title.length < 20 ||
      description.length < 220 ||
      secondDescription.length < 220
    ) {
      return toast.warning("Ошибка в каком то поле");
    }

    await createQuestion({ title, description, secondDescription, tags });
    router("/Q&A");
  };

  return (
    <div className={styles.container}>
      <span className={styles.title}>Создание вопроса</span>
      <div className={styles.block}>
        <span className={styles.blockTitle}>Заголовок</span>
        <span className={styles.blockSubTitle}>
          Будьте конкретны и представьте, что вы задаете вопрос другому
          человеку.
        </span>
        <input
          className={styles.input}
          placeholder="Заголовок"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <div className={styles.btn} onClick={() => onNextStep(2)}>
          Дальше
        </div>
      </div>
      <div className={`${styles.block} ${step < 2 && styles.blocked}`}>
        <span className={styles.blockTitle}>Детали вашей проблемы</span>
        <span className={styles.blockSubTitle}>
          Представьте проблему и расширьте то, что вы вложили в заголовок.
          Минимум 20 символов.
        </span>
        <textarea
          className={`${styles.input} ${styles.textarea}`}
          placeholder="Детали"
          readOnly={step < 2}
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
        />
        <div className={styles.btn} onClick={() => onNextStep(3)}>
          Дальше
        </div>
      </div>
      <div className={`${styles.block} ${step < 3 && styles.blocked}`}>
        <span className={styles.blockTitle}>
          Что вы пробовали и чего ожидали?
        </span>
        <span className={styles.blockSubTitle}>
          Опишите, что вы пробовали, чего ожидали и что на самом деле
          получилось. Минимум 20 символов.
        </span>
        <textarea
          className={`${styles.input} ${styles.textarea}`}
          placeholder="Что вы пробовалии и что
          получилось"
          readOnly={step < 3}
          value={secondDescription}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setSecondDescription(e.target.value)
          }
        />
        <div className={styles.btn} onClick={() => onNextStep(4)}>
          Дальше
        </div>
      </div>
      <div className={`${styles.block} ${step < 4 && styles.blocked}`}>
        <span className={styles.blockTitle}>Теги</span>
        <span className={styles.blockSubTitle}>
          Добавьте до 5 тегов, описывающих суть вашего вопроса.
        </span>
        <input
          className={styles.input}
          placeholder="Теги"
          readOnly={step < 4}
          value={tags}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTags(e.target.value)
          }
        />
        <div className={styles.btn} onClick={() => onNextStep(5)}>
          Дальше
        </div>
      </div>
      <div
        className={`${styles.btn} ${step < 5 && styles.blockedBtn}`}
        style={{ width: "250px" }}
        onClick={onCreateQuestion}
      >
        Cоздать вопрос
      </div>
    </div>
  );
};

export default QuestionCreate;
