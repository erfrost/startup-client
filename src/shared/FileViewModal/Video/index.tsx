import { FaPauseCircle } from "react-icons/fa";
import UploadedFile from "../../../app/models/uploadedFile";
import styles from "./index.module.scss";
import { FaCirclePlay } from "react-icons/fa6";
import { AiFillSound } from "react-icons/ai";
import { useEffect, useState } from "react";
import { RiVolumeMuteFill } from "react-icons/ri";
import timeUpdate from "./utils/timeUpdate";
import setProgress from "./utils/setProgress";
import setVolume from "./utils/setVolume";

interface VideoProps {
  video: UploadedFile;
  isFullScreen: boolean;
}

interface Time {
  duration: string | undefined;
  currentTime: string | undefined;
}

const Video = ({ video, isFullScreen }: VideoProps) => {
  const [isPlay, setIsPlay] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [time, setTime] = useState<Time>({
    duration: undefined,
    currentTime: undefined,
  });
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(
    null
  );
  const [videoTrack, setVideoTrack] = useState<HTMLDivElement | null>(null);
  const [volumeTrack, setVolumeTrack] = useState<HTMLDivElement | null>(null);
  const [volumeCircle, setVolumeCircle] = useState<HTMLDivElement | null>(null);

  // кладение в стейты всех элементов
  useEffect(() => {
    const videoElement: HTMLVideoElement = document.querySelector(
      ".Video_video__EcyRJ"
    );
    const videoTrack: HTMLDivElement = document.getElementById(
      `videoTrack_${video.url}`
    ) as HTMLDivElement;
    const volumeTrack: HTMLDivElement = document.getElementById(
      `volumeTrack_${video.url}`
    ) as HTMLDivElement;
    const volumeCircle: HTMLDivElement = document.getElementById(
      `volumeCircle_${video.url}`
    ) as HTMLDivElement;
    if (!videoElement || !videoTrack || !volumeTrack || !volumeCircle) return;
    setVideoElement(videoElement);
    setVideoTrack(videoTrack);
    setVolumeTrack(volumeTrack);
    setVolumeCircle(volumeCircle);
  }, []);

  // скрытие элементов управления через 3 секунды
  useEffect(() => {
    const controlsPanel: HTMLDivElement = document.querySelector(
      ".Video_controls__oNz5e"
    ) as HTMLDivElement;
    const fileName: HTMLSpanElement = document.querySelector(
      ".FileViewModal_title__1wVaq"
    ) as HTMLSpanElement;
    const btns: HTMLDivElement = document.querySelector(
      ".FileViewModal_buttonsGroup__QbGVl"
    ) as HTMLDivElement;
    if (!controlsPanel || !fileName || !btns) return;

    const hideElements = () => {
      controlsPanel.style.opacity = "0";
      fileName.style.opacity = "0";
      btns.style.opacity = "0";
    };

    let timeoutId = setTimeout(hideElements, 3000);

    const showElements = () => {
      clearTimeout(timeoutId);
      controlsPanel.style.opacity = "1";

      if (!isFullScreen) fileName.style.opacity = "1";

      btns.style.opacity = "1";

      timeoutId = setTimeout(hideElements, 3000);
    };

    document.addEventListener("mousemove", showElements);

    setTimeout(hideElements, 3000);

    return () => {
      document.removeEventListener("mousemove", showElements);
    };
  }, [isFullScreen]);

  // initialState для громкости
  useEffect(() => {
    if (!videoElement || !volumeCircle) return;

    const storageVolume: number = Number(localStorage.getItem("volume"));
    const isMute: boolean = Boolean(localStorage.getItem("isMuteVideo"));

    videoElement.volume = storageVolume || 0.5;
    volumeCircle.style.left = (storageVolume || 0.5) * 100 + "%";

    if (isMute) handleMute();
  }, [videoElement, volumeCircle]);

  // обновление времени
  useEffect(() => {
    if (!videoElement) return;

    videoElement.addEventListener("pause", () => setIsPlay(false));

    videoElement.addEventListener("timeupdate", (e: Event) =>
      timeUpdate(video.url, e, setTime)
    );

    return () => {
      videoElement.removeEventListener("pause", () => setIsPlay(false));
      videoElement.removeEventListener("timeupdate", (e: Event) =>
        timeUpdate(video.url, e, setTime)
      );
    };
  }, [videoElement]);

  // обновление прогрессбара
  useEffect(() => {
    if (!videoTrack || !time.duration) return;

    videoTrack.addEventListener("click", (e: MouseEvent) =>
      setProgress(e, time.duration)
    );

    return () => {
      videoTrack.removeEventListener("click", (e: MouseEvent) =>
        setProgress(e, time.duration)
      );
    };
  }, [time, videoTrack]);

  // обновление громкости
  useEffect(() => {
    if (!volumeTrack) return;

    volumeTrack.addEventListener("click", (e: MouseEvent) => setVolume(e));

    return () => {
      volumeTrack.removeEventListener("click", (e: MouseEvent) => setVolume(e));
    };
  }, [time, volumeTrack]);

  // обработка паузы проигрывания видео
  useEffect(() => {
    if (!videoElement) return;

    if (isPlay) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  }, [isPlay, videoElement]);

  // выключение звука
  const handleMute = () => {
    if (!videoElement || !volumeCircle) return;

    volumeCircle.style.left = "0";

    videoElement.muted = true;
    localStorage.setItem("isMuteVideo", "true");

    setIsMuted(true);
  };

  // включение звука
  const handleUnMute = () => {
    if (!videoElement || !volumeCircle) return;

    videoElement.muted = false;
    localStorage.setItem("isMuteVideo", "false");

    volumeCircle.style.left = videoElement.volume * 100 + "%";

    setIsMuted(false);
  };

  return (
    <div
      className={`${styles.container} ${
        isFullScreen && styles.fullScreenContainer
      }`}
    >
      <video
        src={video.url}
        className={styles.video}
        onClick={() => setIsPlay((prevState: boolean) => !prevState)}
      />
      <div
        className={`${styles.controls} ${
          isFullScreen && styles.fullScreenControls
        }`}
      >
        <div className={styles.trackContainer} id={`videoTrack_${video.url}`}>
          <div className={styles.track}>
            <span className={`${styles.time} ${styles.timeLeft}`}>
              {time.currentTime}
            </span>
            <div className={styles.circle} id={`circle_${video.url}`}></div>
            <span className={`${styles.time} ${styles.timeRight}`}>
              {time.duration}
            </span>
          </div>
        </div>
        <div className={styles.volumeContainer}>
          {isMuted ? (
            <RiVolumeMuteFill
              className={styles.volumeIcon}
              onClick={handleUnMute}
            />
          ) : (
            <AiFillSound className={styles.volumeIcon} onClick={handleMute} />
          )}
          <div
            className={styles.trackContainer}
            style={{ width: "auto" }}
            id={`volumeTrack_${video.url}`}
          >
            <div className={styles.volumeTrack}>
              <div
                className={styles.circle}
                id={`volumeCircle_${video.url}`}
              ></div>
            </div>
          </div>
        </div>
        {isPlay ? (
          <FaPauseCircle
            className={styles.playControlsIcon}
            onClick={() => setIsPlay((prevState: boolean) => !prevState)}
          />
        ) : (
          <FaCirclePlay
            className={styles.playControlsIcon}
            onClick={() => setIsPlay((prevState: boolean) => !prevState)}
          />
        )}
      </div>
    </div>
  );
};

export default Video;
