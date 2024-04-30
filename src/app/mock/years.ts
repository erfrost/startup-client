export const years: string[] = Array.from(
  { length: 2024 - 1940 + 1 },
  (_, index) => (2024 - index).toString()
);

export default years;
