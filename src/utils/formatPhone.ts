export const formatPhone = (prevState: string, value: string) => {
  const numbers = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "(",
    ")",
    "-",
    " ",
  ];
  if (value.length === 0) return "";
  if (!numbers.includes(value[value.length - 1])) return prevState;
  if (value.length > 18) return prevState;

  const cleaned = value.replace(/\D/g, "");

  const match = cleaned.match(/^(\d{1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);

  if (match) {
    let formattedNumber = match[1];
    if (match[2]) {
      formattedNumber += ` (${match[2]}`;
    }
    if (match[3]) {
      formattedNumber += `) ${match[3]}`;
    }
    if (match[4]) {
      formattedNumber += `-${match[4]}`;
    }
    if (match[5]) {
      formattedNumber += `-${match[5]}`;
    }
    return "+" + formattedNumber;
  }

  return value;
};

export default formatPhone;
