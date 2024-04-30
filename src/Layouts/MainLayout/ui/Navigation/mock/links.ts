import { RiTimeFill } from "react-icons/ri";
import { FaClipboardList, FaQuestionCircle } from "react-icons/fa";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { FaChildren } from "react-icons/fa6";
import { IoIosHome } from "react-icons/io";
import { LinkInterface } from "../interfaces";

export const studentLinks: LinkInterface[] = [
  {
    text: "Главная",
    icon: IoIosHome,
    to: "/home",
    active: false,
  },
  {
    text: "Мой класс",
    icon: FaChildren,
    to: "/myClass",
    active: false,
  },
  {
    text: "Расписание",
    icon: FaClipboardList,
    to: "#",
    active: false,
  },
  {
    text: "Вопрос - ответ",
    icon: FaQuestionCircle,
    to: "/Q&A",
    active: false,
  },
  {
    text: "Чаты",
    icon: BsFillChatLeftTextFill,
    to: "/chats",
    active: false,
  },
];

export const teacherLinks: LinkInterface[] = [
  {
    text: "Главная",
    icon: IoIosHome,
    to: "/home",
    active: false,
  },
  {
    text: "Мои классы",
    icon: FaChildren,
    to: "/classes",
    active: false,
  },
  {
    text: "Расписание",
    icon: FaClipboardList,
    to: "#",
    active: false,
  },
  {
    text: "Вопрос - ответ",
    icon: FaQuestionCircle,
    to: "/Q&A",
    active: false,
  },
  {
    text: "Чаты",
    icon: BsFillChatLeftTextFill,
    to: "/chats",
    active: false,
  },
];
