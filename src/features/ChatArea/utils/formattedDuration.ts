const formattedDuration = (time: number) => {
  const hours: number = Math.floor(time / 3600);
  const minutes: number = Math.floor((time - hours * 3600) / 60);
  const seconds: number = Math.floor(time - hours * 3600 - minutes * 60);

  let result: string = "";
  if (hours > 0) {
    result = `${String(hours).padStart(2, "0")}:`;
  }

  result += `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;

  return result;
};

export default formattedDuration;
