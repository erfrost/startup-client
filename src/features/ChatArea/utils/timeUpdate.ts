import { Dispatch, SetStateAction } from "react";

let timer1: NodeJS.Timeout | null;
let timer2: NodeJS.Timeout | null;

export const timeUpdate = (
  setTimer: Dispatch<SetStateAction<string>>,
  messageId: string,
  event: Event
) => {
  const circle: HTMLDivElement = document.getElementById(
    `circle_${messageId}`
  ) as HTMLDivElement;

  const target = event.target as HTMLAudioElement;

  const { duration, currentTime } = target;
  const progressPercent: number = (currentTime / duration) * 100;
  circle.style.left = progressPercent + "%";

  const time: number = Math.floor(currentTime);

  const durationHours: number = Math.floor(duration / 3600);
  const durationMinutes: number = Math.floor(
    (duration - durationHours * 3600) / 60
  );

  if (durationHours === 0) {
    let currentMinutes: number = Math.floor(time / 60);
    let currentSeconds: number = Math.floor(
      time - durationHours * 3600 - durationMinutes * 60
    );

    const result: string = `${String(currentMinutes).padStart(2, "0")}:${String(
      currentSeconds
    ).padStart(2, "0")}`;

    setTimer(result);
  } else if (durationHours > 0) {
    let currentHours: number = Math.floor(time / 3600);
    let currentMinutes: number = Math.floor(time - (currentHours * 3600) / 60);
    let currentSeconds: number = Math.floor(
      time - durationHours * 3600 - durationMinutes * 60
    );

    const result: string = `${String(currentHours).padStart(2, "0")}:${String(
      currentMinutes
    ).padStart(2, "0")}:${String(currentSeconds).padStart(2, "0")}`;

    setTimer(result);
  }
};

export const removeTimer = () => {
  clearInterval(timer1);
  clearInterval(timer2);
};
