import { useRecoilValue } from "recoil";
import MainLayout from "../../layouts/MainLayout";
import styles from "./index.module.scss";
import { userState } from "../../app/storage/atoms";
import User from "../../app/models/user";
import { useEffect } from "react";
import useGetUser from "../../app/hooks/requests/user/useGetUser";
import ClassSchedule from "../../features/ClassSchedule";
import ClassStudents from "../../features/ClassStudents";
import ClassEvents from "../../features/ClassEvents";
import Divider from "../../shared/Divider";

const MyClass = () => {
  const user: User = useRecoilValue<User>(userState);
  const getUser = useGetUser();

  useEffect(() => {
    async function fetch() {
      await getUser();
    }

    fetch();
  }, []);

  if (!user) return null;

  return (
    <MainLayout>
      <div className={styles.container}>
        <ClassStudents />
        <Divider />
        <ClassSchedule />
        <Divider />
        <ClassEvents />
      </div>
    </MainLayout>
  );
};

export default MyClass;
