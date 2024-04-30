import { BiMicrophone } from "react-icons/bi";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import useUploadFile from "../../../../app/hooks/requests/useUploadFile";
import UploadedFile from "../../../../app/models/uploadedFile";

const initialTime: string = "00:00:00";

interface AudioInputProps {
  sendMessage: (audio?: UploadedFile | undefined) => void;
}

const AudioInput = ({ sendMessage }: AudioInputProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [time, setTime] = useState<string>(initialTime);
  const uploadFile = useUploadFile();
  const isHelp: boolean = Boolean(localStorage.getItem("voice_chat_help"));

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isActive) {
      let secondsElapsed = 0;

      intervalId = setInterval(() => {
        secondsElapsed++;
        setTime(formatTime(secondsElapsed));
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isActive]);

  function formatTime(totalSeconds: number): string {
    const hours: string = String(Math.floor(totalSeconds / 3600)).padStart(
      2,
      "0"
    );
    const minutes: string = String(
      Math.floor((totalSeconds % 3600) / 60)
    ).padStart(2, "0");
    const seconds: string = String(totalSeconds % 60).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  }

  const onStartRecord = async () => {
    setTime(initialTime);
    setIsActive(true);

    setTimeout(() => localStorage.setItem("voice_chat_help", "true"), 4000);

    const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    if (!stream) return;

    const mediaRecorder: MediaRecorder = new MediaRecorder(stream);
    setMediaRecorder(mediaRecorder);

    mediaRecorder.start();
  };

  const onStopRecord = async () => {
    setIsActive(false);

    if (!mediaRecorder) return;

    mediaRecorder.ondataavailable = async (e: BlobEvent) => {
      const blob: Blob = e.data;
      if (blob.size === 0) return console.log("почему size 0????");
      const audioFile: File = new File([e.data], "audio_file.webm", {
        type: "audio/webm",
      });

      const currentTime: string[] = time.split(":");

      const allSeconds: number =
        Number(currentTime[0]) * 3600 +
        Number(currentTime[1]) * 60 +
        Number(currentTime[2]);

      if (allSeconds < 1 || !audioFile) return;

      const uploadedAudio: UploadedFile = await uploadFile(audioFile);

      sendMessage(uploadedAudio);
    };

    mediaRecorder.stop();
  };

  return (
    <div
      className={styles.container}
      onMouseDown={onStartRecord}
      onMouseUp={onStopRecord}
    >
      {isActive && !isHelp && (
        <div
          className={styles.help}
          onMouseUp={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            e.preventDefault()
          }
        >
          <span>
            Чтобы поставить голосовое сообщение на удержание, отведите курсор в
            сторону.
          </span>
          <span>
            {" "}
            Чтобы его отправить, нажмите на красный микрофон повторно.
          </span>
        </div>
      )}
      <BiMicrophone
        key="microphone"
        className={`${styles.icon} ${isActive && styles.active}`}
      />
      {isActive && (
        <div className={styles.timer}>
          <div className={styles.circle}></div>
          <span className={styles.time}>{time}</span>
        </div>
      )}
    </div>
  );
};

export default AudioInput;
