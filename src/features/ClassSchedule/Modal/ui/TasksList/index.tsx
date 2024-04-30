import { useEffect, useState } from "react";
import useGetTasks from "../../../../../app/hooks/requests/class/useGetTasks";
import styles from "./index.module.scss";
import { Task } from "../../../../../app/models/task";
import UploadedFile from "../../../../../app/models/uploadedFile";
import useDeleteTask from "../../../../../app/hooks/requests/class/useDeleteTask";

interface TasksListProps {
  classId: string;
  date: string;
}

const TasksList = ({ classId, date }: TasksListProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const storageClassId: string | undefined = localStorage.getItem("class_id");
  const getTasks = useGetTasks(classId || storageClassId, date);
  const deleteTask = useDeleteTask();

  useEffect(() => {
    async function fetch() {
      const tasks: Task[] = await getTasks();
      setTasks(tasks);
    }

    fetch();
  }, []);

  const onDeleteTask = async (taskId: string) => {
    await deleteTask(classId, taskId);

    const filteredTasks = tasks.filter(
      (task: Task) => task.class_task_id !== taskId
    );
    setTasks(filteredTasks);
  };

  return (
    <div className={styles.container}>
      <span className={styles.title}>Задания</span>
      <div className={styles.list}>
        {tasks.length ? (
          tasks.map((task: Task, index: number) => (
            <div className={styles.task} key={task.class_task_id}>
              <div className={styles.header}>
                <span className={styles.taskTitle}>
                  {index + 1}. {task.title}
                </span>
                <div
                  className={styles.btn}
                  onClick={() => onDeleteTask(task.class_task_id)}
                >
                  Удалить
                </div>
              </div>
              <span className={styles.taskDescription}>{task.description}</span>
              <div className={styles.filesList}>
                {task.files.map((file: UploadedFile, index: number) =>
                  file.type.indexOf("image") === -1 ? (
                    <a
                      href={file.url}
                      target="_blank"
                      className={styles.unkownFile}
                    >
                      <span className={styles.unknownFileName}>
                        {file.name}
                      </span>
                    </a>
                  ) : (
                    <a href={file.url} target="_blank">
                      <img
                        src={file.url}
                        alt="file"
                        className={styles.file}
                        key={index}
                      />
                    </a>
                  )
                )}
              </div>
            </div>
          ))
        ) : (
          <span className={styles.taskDescription}>Заданий нет</span>
        )}
      </div>
    </div>
  );
};

export default TasksList;
