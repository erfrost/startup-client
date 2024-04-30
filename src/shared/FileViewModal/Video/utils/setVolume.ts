const setVolume = (e: MouseEvent) => {
  const track: HTMLDivElement = e.target as HTMLDivElement;

  const videoElement: HTMLVideoElement = document.querySelector(
    ".Video_video__EcyRJ"
  );

  if (!videoElement) return;

  const volume: number = e.offsetX / track.clientWidth;

  videoElement.volume = volume;

  localStorage.setItem("volume", String(volume));

  const circle: HTMLDivElement = track.querySelector(".Video_circle__b5ARn");
  if (!circle) return;

  circle.style.left = volume * 100 + "%";
};

export default setVolume;
