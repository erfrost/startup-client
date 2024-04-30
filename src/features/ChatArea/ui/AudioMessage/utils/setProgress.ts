const setProgress = (
  e: MouseEvent,
  duration: string,
  audio: HTMLAudioElement,
  track: HTMLDivElement
) => {
  if (!audio || !track) return;

  const arr: string[] = duration.split(":");
  let durationSec: number | undefined = undefined;

  if (arr.length === 2) {
    const minutes: number = Number(arr[0]);
    const seconds: number = Number(arr[1]);
    durationSec = minutes * 60 + seconds;
  } else if (arr.length === 3) {
    const hours: number = Number(arr[0]);
    const minutes: number = Number(arr[1]);
    const seconds: number = Number(arr[2]);
    durationSec = hours * 3600 + minutes * 60 + seconds;
  }

  const width: number = track.clientWidth;
  const clickX: number = e.offsetX;

  if (width < 30) return;

  audio.currentTime = (clickX / width) * durationSec;
};

export default setProgress;
