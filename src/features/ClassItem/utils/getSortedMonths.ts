import months from "../../../app/mock/months";

export const getSortedMonths = (): string[] => {
  const date: Date = new Date();
  const index: number = date.getMonth();
  const month: string = months[index];

  if (index === -1) return months;

  const beforeIndex: string[] = months.slice(0, index);
  const afterIndex: string[] = months.slice(index + 1, months.length);

  return [...afterIndex, ...beforeIndex, month];
};

export default getSortedMonths;
