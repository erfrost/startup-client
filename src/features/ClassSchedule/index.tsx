import { PiArrowFatLeftFill, PiArrowFatRightFill } from "react-icons/pi";
import Day from "./Day";
import styles from "./index.module.scss";
import { onNextPage, onPrevPage } from "../../pages/class/scheduleActions";
import months from "../../app/mock/months";
import { useEffect, useState } from "react";
import monthDaysCount from "../../utils/monthDaysCount";

const ClassSchedule = () => {
  const [beginDay, setBeginDay] = useState<number | undefined>(undefined);
  const [endDay, setEndDay] = useState<number | undefined>(undefined);
  const [firstMonth, setFirstMonth] = useState<string | undefined>(undefined);
  const [secondMonth, setSecondMonth] = useState<string | undefined>(undefined);
  const [year, setYear] = useState<string | undefined>(undefined);
  const [daysArray, setDaysArray] = useState<number[]>([]);
  const role: string = localStorage.getItem("role");
  const classId: string = localStorage.getItem("class_id");

  useEffect(() => {
    const date: Date = new Date();
    const weekDay: number = date.getDay();
    const currentDay: number = date.getDate();

    setBeginDay(currentDay - (weekDay - 1));
    setEndDay(currentDay + (7 - weekDay));
    setFirstMonth(months[date.getMonth()]);
    setSecondMonth(months[date.getMonth()]);
    setYear(date.getFullYear().toString());
  }, []);

  useEffect(() => {
    setDaysArray(
      Array.from(
        { length: endDay - beginDay + 1 },
        (_, index) => endDay - index
      ).reverse()
    );
  }, [beginDay, endDay]);

  useEffect(() => {
    if (firstMonth !== secondMonth) {
      const prevMonthIndex: number = months.indexOf(firstMonth);
      const daysCount: number = monthDaysCount(year, months[prevMonthIndex]);

      const days: number[] = Array.from(
        { length: daysCount - beginDay + 1 },
        (_, index) => beginDay + index
      );

      const gjfgjfd = Array.from({ length: endDay }, (_, index) => index + 1);

      setDaysArray([...days, ...gjfgjfd]);
    }
  }, [beginDay]);

  const prevPage = () => {
    onPrevPage(
      firstMonth,
      secondMonth,
      year,
      beginDay,
      endDay,
      setFirstMonth,
      setSecondMonth,
      setBeginDay,
      setEndDay,
      setYear
    );
  };

  const nextPage = () => {
    onNextPage(
      firstMonth,
      secondMonth,
      year,
      beginDay,
      endDay,
      setFirstMonth,
      setSecondMonth,
      setBeginDay,
      setEndDay,
      setYear
    );
  };

  if (!beginDay || !endDay || !firstMonth || !secondMonth || !year) return;

  return (
    <div className={styles.block}>
      <div className={styles.header}>
        <span className={styles.blockTitle}>Расписание</span>
        <div className={styles.weekSelect}>
          <div className={styles.arrowBtn} onClick={prevPage}>
            <PiArrowFatLeftFill className={styles.icon} />
          </div>
          <span className={styles.date}>
            {beginDay} {firstMonth} - {endDay} {secondMonth} , {year}
          </span>
          <div className={styles.arrowBtn} onClick={nextPage}>
            <PiArrowFatRightFill className={styles.icon} />
          </div>
        </div>
        <div></div>
      </div>
      <div className={styles.container}>
        {daysArray.map((day: number, index: number) => (
          <Day
            key={index}
            classId={classId}
            role={role}
            day={day}
            dayOfWeekIndex={index}
            date={`${day}.${
              day < daysArray[0] ? secondMonth : firstMonth
            }.${year}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ClassSchedule;
