import months from "../app/mock/months";

export const monthDaysCount = (year: string, month: string): number => {
  const intYear: number = parseInt(year);
  const monthIndex: number = months.indexOf(month);

  const daysCount: number = new Date(intYear, monthIndex + 1, 0).getDate();

  return daysCount;
};

export default monthDaysCount;
