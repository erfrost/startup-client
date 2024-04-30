import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { FiEdit } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import UpdatedAlert from "../../../shared/UpdatedAlert";
import _, { cloneDeep } from "lodash";
import { useUpdateSchedule } from "../../../app/hooks/requests/class/useUpdateSchedule";
import { useParams } from "react-router-dom";
import useGetSchedule from "../../../app/hooks/requests/class/useGetSchedule";
import { Lesson } from "../../../app/models/lesson";
import daysOfWeek from "../../../app/mock/daysOfWeek";
import { motion } from "framer-motion";
import mock from "./mock";
import LessonItem from "../LessonItem";

interface DayProps {
  classId: string;
  role: string;
  day: number;
  dayOfWeekIndex: number;
  date: string;
}

const Day = ({ classId, role, day, dayOfWeekIndex, date }: DayProps) => {
  const [isEditActive, setIsEditActive] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [initialLessons, setInitialLessons] = useState<Lesson[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);

  const params = useParams();

  const container = useRef(null);

  const scheduleUpdate = useUpdateSchedule();
  const getSchedule = useGetSchedule(classId || params.class_id, date);
  const dayOfWeek = daysOfWeek[dayOfWeekIndex];

  useEffect(() => {
    async function fetch() {
      const schedule: Lesson[] = await getSchedule();
      if (schedule && schedule.length === 8) {
        setInitialLessons(cloneDeep(schedule));
        setLessons(schedule);
      } else {
        const newValue: any[] = mock.map((lesson) => ({ ...lesson }));
        setInitialLessons(cloneDeep(newValue));
        setLessons(newValue);
      }
    }
    fetch();
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter") setIsEditActive(false);
    });
  }, []);

  const onOpenEdit = () => {
    setIsEditActive((prevState) => !prevState);

    const input: HTMLInputElement | null = document.querySelector(
      ".LessonItem_nameInput__ZMubR"
    );
    if (!input) return;

    setTimeout(() => input.focus(), 0);
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedLessons: any[] = [...lessons];
    updatedLessons[index].name = e.target.value;

    setLessons(updatedLessons);

    if (_.isEqual(initialLessons, updatedLessons)) setIsUpdated(false);
    else setIsUpdated(true);
  };

  const onReset = () => {
    setLessons(mock);
    setIsEditActive(false);
  };

  const onSubmit = async () => {
    await scheduleUpdate(classId || params.class_id, lessons, date);
    setIsUpdated(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={styles.container}
      ref={container}
    >
      <div className={styles.header}>
        <div></div>
        <span className={styles.dayName}>
          {day} - {dayOfWeek}
        </span>
        {role === "teacher" ? (
          <div className={styles.editBtn} onClick={onOpenEdit}>
            {isEditActive ? (
              <FaCheck className={styles.icon} />
            ) : (
              <FiEdit className={styles.icon} />
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
      {lessons.map((lesson: Lesson, index: number) => (
        <LessonItem
          key={lesson.lessond_id}
          lesson={lesson}
          index={index}
          isEditActive={isEditActive}
          onChangeName={(e: ChangeEvent<HTMLInputElement>, index: number) =>
            onChangeName(e, index)
          }
          date={date}
          role={role}
        />
      ))}
      {isUpdated && <UpdatedAlert onReset={onReset} onSubmit={onSubmit} />}
    </motion.div>
  );
};

export default Day;
