import { Routes, Route } from "react-router-dom";
import LandingPage from "../../pages/landing";
import SignUpPage from "../../pages/signUp";
import SignInPage from "../../pages/signIn";
import HomePage from "../../pages/home";
import ErrorPage from "../../pages/error";
import ProfilePage from "../../pages/profile";
import ClassPage from "../../pages/class";
import JoinToClass from "../../pages/joinToClass";
import ConfirmCode from "../../pages/ConfirmCode";
import ClassesList from "../../pages/ClassesList";
import MyClass from "../../pages/myClass";
import Chats from "../../pages/chats";
import Chat from "../../pages/chat";
import QuestionAnswer from "../../pages/QuestionAnswer";

const Router = () => {
  return (
    <Routes>
      // общие
      <Route path="/error" element={<ErrorPage />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/chats" element={<Chats />} />
      <Route path="/chat/:chat_id" element={<Chat />} />
      <Route path="/Q&A" element={<QuestionAnswer />} />
      // auth
      <Route path="/signIn" element={<SignInPage />} />
      <Route path="/signUp" element={<SignUpPage />} />
      <Route path="/signUp/code" element={<ConfirmCode />} />
      //
      <Route path="/home" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/joinToClass/:join_link" element={<JoinToClass />} />
      // teacher
      <Route path="/classes" element={<ClassesList />} />
      <Route path="/class/:class_id" element={<ClassPage />} />
      // student
      <Route path="/myClass" element={<MyClass />} />
    </Routes>
  );
};

export default Router;
