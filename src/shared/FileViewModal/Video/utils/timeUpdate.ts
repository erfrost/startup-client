import { Dispatch, SetStateAction } from "react";
import formattedDuration from "../../../../features/ChatArea/utils/formattedDuration";

interface Time {
  duration: string | undefined;
  currentTime: string | undefined;
}

const timeUpdate = (
  videoUrl: string,
  event: Event,
  setTime: Dispatch<SetStateAction<Time>>
) => {
  const circle: HTMLDivElement = document.getElementById(
    `circle_${videoUrl}`
  ) as HTMLDivElement;
  if (!circle) return;

  const target: HTMLVideoElement = event.target as HTMLVideoElement;
  const { duration, currentTime } = target;

  const resultDuration: string = formattedDuration(duration);
  const resultCurrentTime: string = formattedDuration(currentTime);

  const progressPercent: number = (currentTime / duration) * 100;
  circle.style.left = progressPercent + "%";

  setTime({
    duration: resultDuration,
    currentTime: resultCurrentTime,
  });
};

export default timeUpdate;
