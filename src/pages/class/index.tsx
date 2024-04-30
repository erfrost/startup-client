import MainLayout from "../../layouts/MainLayout";
import styles from "./index.module.scss";
import Divider from "../../shared/Divider";
import ClassStudents from "../../features/ClassStudents";
import ClassSchedule from "../../features/ClassSchedule";
import ClassEvents from "../../features/ClassEvents";

const ClassPage = () => {
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

export default ClassPage;
