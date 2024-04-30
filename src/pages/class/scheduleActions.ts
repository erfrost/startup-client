import { Dispatch, SetStateAction } from "react";
import monthDaysCount from "../../utils/monthDaysCount";
import months from "../../app/mock/months";

export const onPrevPage = (
  firstMonth: string,
  secondMonth: string,
  year: string,
  beginDay: number,
  endDay: number,
  setFirstMonth: Dispatch<SetStateAction<string>>,
  setSecondMonth: Dispatch<SetStateAction<string>>,
  setBeginDay: Dispatch<SetStateAction<number>>,
  setEndDay: Dispatch<SetStateAction<number>>,
  setYear: Dispatch<SetStateAction<string>>
) => {
  const calcBeginDay = (newValue: number) => {
    const prevMonthIndex: number = months.indexOf(firstMonth) - 1;
    const daysCount: number = monthDaysCount(year, months[prevMonthIndex]);

    setBeginDay(daysCount + newValue);

    if (prevMonthIndex < 0) {
      setFirstMonth(months[11]);
      setYear((prevState: string) => (Number(prevState) - 1).toString());
    }
    setFirstMonth(months[prevMonthIndex < 0 ? 11 : prevMonthIndex]);
  };

  const calcEndDay = (newValue: number) => {
    const prevMonthIndex: number = months.indexOf(secondMonth) - 1;
    const month: string = months[prevMonthIndex];
    const daysCount: number = monthDaysCount(year, month);

    setEndDay(daysCount + newValue);
    setSecondMonth(months[prevMonthIndex < 0 ? 11 : prevMonthIndex]);
  };

  const newBeginDay: number = beginDay - 7;
  const newEndDay: number = endDay - 7;

  if (newBeginDay > 0) setBeginDay((prevState: number) => prevState - 7);
  if (newEndDay > 0) setEndDay((prevState: number) => prevState - 7);

  if (newBeginDay <= 0) {
    calcBeginDay(newBeginDay);
  }
  if (newEndDay <= 0) {
    calcEndDay(newEndDay);
  }
};

export const onNextPage = (
  firstMonth: string,
  secondMonth: string,
  year: string,
  beginDay: number,
  endDay: number,
  setFirstMonth: Dispatch<SetStateAction<string>>,
  setSecondMonth: Dispatch<SetStateAction<string>>,
  setBeginDay: Dispatch<SetStateAction<number>>,
  setEndDay: Dispatch<SetStateAction<number>>,
  setYear: Dispatch<SetStateAction<string>>
) => {
  const monthIndex: number = months.indexOf(firstMonth);
  const daysCount: number = monthDaysCount(year, months[monthIndex]);

  const calcEndDay = (newValue: number) => {
    const monthIndex: number = months.indexOf(secondMonth);
    const month: string = months[monthIndex];
    const daysCount: number = monthDaysCount(year, month);

    setEndDay(newValue - daysCount);

    const nextMonthIndex: number = monthIndex + 1;
    if (nextMonthIndex > 11) {
      setSecondMonth(months[0]);
      setYear((prevState: string) => (Number(prevState) + 1).toString());
    } else setSecondMonth(months[nextMonthIndex]);
  };

  const calcBeginDay = (newValue: number) => {
    const monthIndex: number = months.indexOf(firstMonth);
    const daysCount: number = monthDaysCount(year, months[monthIndex]);

    setBeginDay(newValue - daysCount);

    const nextMonthIndex: number = monthIndex + 1;
    setFirstMonth(months[nextMonthIndex > 11 ? 0 : nextMonthIndex]);
  };

  const newBeginDay: number = beginDay + 7;
  const newEndDay: number = endDay + 7;

  if (newEndDay <= daysCount) setEndDay((prevState: number) => prevState + 7);
  if (newBeginDay <= daysCount)
    setBeginDay((prevState: number) => prevState + 7);

  if (newEndDay > daysCount) {
    calcEndDay(newEndDay);
  }
  if (newBeginDay > daysCount) {
    calcBeginDay(newBeginDay);
  }
};
