import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import styles from "./index.module.scss";
import ClassCreate from "../../features/ClassCreate";
import useGetClasses from "../../app/hooks/requests/class/useGetClasses";
import Class from "../../app/models/class";
import ClassItem from "../../features/ClassItem";

const ClassesList = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const getClasses = useGetClasses();

  useEffect(() => {
    async function fetch() {
      const allClasses: Class[] = await getClasses();
      setClasses(allClasses);
    }

    fetch();
  }, []);

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.pageTitle}>Мои классы</span>
          <ClassCreate setClasses={setClasses} />
        </div>
        <div className={styles.classesList}>
          {classes.map((classItem: Class) => (
            <ClassItem classItem={classItem} key={classItem.class_id} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ClassesList;
