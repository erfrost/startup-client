import QuestionCreate from "../../../features/QuestionCreate";

export interface Navigation {
  text: string;
  link: string;
  component: () => React.JSX.Element | null;
}

export const navigation: Navigation[] = [
  {
    text: "Главная",
    link: "/Q&A",
    component: null,
  },
  {
    text: "Задать вопрос",
    link: "/Q&A?askQuestion",
    component: QuestionCreate,
  },
  {
    text: "Теги",
    link: "/Q&A?tags",
    component: null,
  },
  {
    text: "Вопросы друзей",
    link: "/Q&A?friends",
    component: null,
  },
  {
    text: "Мои вопросы",
    link: "/Q&A?myQuestions",
    component: null,
  },
  {
    text: "Сохраненные",
    link: "/Q&A?saved",
    component: null,
  },
];
