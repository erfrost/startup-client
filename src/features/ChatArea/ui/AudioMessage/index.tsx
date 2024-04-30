import { FaCirclePlay } from "react-icons/fa6";
import { Message } from "../../../../app/models/message";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { FaPauseCircle } from "react-icons/fa";
import MessageInfo from "../MessageInfo";
import UploadedFile from "../../../../app/models/uploadedFile";
import formattedDuration from "../../utils/formattedDuration";
import { removeTimer, timeUpdate } from "../../utils/timeUpdate";
import setProgress from "./utils/setProgress";

interface AudioMessageProps {
  message: Message;
}

const AudioMessage = ({ message }: AudioMessageProps) => {
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [timer, setTimer] = useState("00:00");
  const [duration, setDuration] = useState<string>("00:00");
  const userId: string = localStorage.getItem("user_id");
  const audio: UploadedFile = message.content.audio;

  useEffect(() => {
    const audioPlayer: HTMLAudioElement = document.getElementById(
      `audioPlayer_${message.message_id}`
    ) as HTMLAudioElement;

    if (!audioPlayer) return;

    audioPlayer.addEventListener("loadedmetadata", () => {
      if (
        audioPlayer.duration === Infinity ||
        isNaN(Number(audioPlayer.duration))
      ) {
        audioPlayer.currentTime = 1e101;
        audioPlayer.addEventListener("timeupdate", getDuration);
      }
    });

    function getDuration(event: any) {
      event.target.currentTime = 0;
      event.target.removeEventListener("timeupdate", getDuration);

      const time: number = Math.round(event.target.duration);
      const resultDuration: any = formattedDuration(time);

      setDuration(resultDuration);
    }
  }, []);

  useEffect(() => {
    const audioPlayer: HTMLAudioElement = document.getElementById(
      `audioPlayer_${message.message_id}`
    ) as HTMLAudioElement;

    const circle: HTMLDivElement = document.getElementById(
      `circle_${message.message_id}`
    ) as HTMLDivElement;

    audioPlayer.addEventListener("pause", () => setIsPlay(false));

    if (!audioPlayer || !circle) return;

    if (isPlay) {
      audioPlayer.addEventListener("timeupdate", (e: Event) =>
        timeUpdate(setTimer, message.message_id, e)
      );
      audioPlayer.play();
    } else {
      circle.style.left = "0";
      audioPlayer.pause();
      removeTimer();
    }

    return () => {
      audioPlayer.removeEventListener("pause", () => setIsPlay(false));
    };
  }, [isPlay]);

  useEffect(() => {
    const track: HTMLDivElement = document.getElementById(
      `track_${message.message_id}`
    ) as HTMLDivElement;

    const audioPlayer: HTMLAudioElement = document.getElementById(
      `audioPlayer_${message.message_id}`
    ) as HTMLAudioElement;

    if (!track || !audioPlayer || !duration) return;

    track.addEventListener("click", (e: MouseEvent) =>
      setProgress(e, duration, audioPlayer, track)
    );

    return () => {
      track.removeEventListener("click", (e: MouseEvent) =>
        setProgress(e, duration, audioPlayer, track)
      );
    };
  }, [duration]);

  if (!audio) return;

  return (
    <div
      className={styles.container}
      style={
        message.user_id === userId
          ? { alignSelf: "flex-end" }
          : { alignSelf: "flex-start", paddingRight: "45px" }
      }
    >
      {isPlay ? (
        <FaPauseCircle
          className={styles.btn}
          onClick={() => setIsPlay(false)}
        />
      ) : (
        <FaCirclePlay className={styles.btn} onClick={() => setIsPlay(true)} />
      )}
      <div className={styles.content}>
        <audio
          src={audio.url}
          controls
          className={styles.audio}
          id={`audioPlayer_${message.message_id}`}
        ></audio>
        <div
          className={styles.lineContainer}
          id={`track_${message.message_id}`}
        >
          <div className={styles.line}>
            <div
              className={styles.circle}
              id={`circle_${message.message_id}`}
            ></div>
          </div>
        </div>
        <span className={styles.time}>
          {isPlay ? timer + " / " : null}
          {duration}
        </span>
      </div>
      <MessageInfo message={message} color="purple" />
    </div>
  );
};

export default AudioMessage;
