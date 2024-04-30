import months from "../../../../app/mock/months";

export default function getDaysArray(year: string, month: string): string[] {
  const intYear: number = parseInt(year);
  const monthIndex: number = months.indexOf(month);

  const daysCount: number = new Date(intYear, monthIndex + 1, 0).getDate();

  const daysArray: string[] = Array.from(
    { length: daysCount - 1 + 1 },
    (_, index) => (daysCount - index).toString()
  ).reverse();

  return daysArray;
}
