import { IoMdClose, IoMdDownload } from "react-icons/io";
import styles from "./index.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { MessageFile } from "../../interfaces";
import Video from "./Video";

interface FileViewModalProps {
  file: MessageFile;
  setModalFile: Dispatch<SetStateAction<MessageFile>>;
}

const FileViewModal = ({ file, setModalFile }: FileViewModalProps) => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const modalContainer: HTMLDivElement = document.querySelector(
        ".FileViewModal_container__RG3Jb"
      );
      if (!modalContainer) return;

      if (modalContainer.isEqualNode(e.target as Node)) setModalFile(undefined);
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    const handleEscapeClick = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isFullScreen) setIsFullScreen(false);
        else setModalFile(undefined);
      }
    };
    document.addEventListener("keydown", handleEscapeClick);

    return () => {
      document.removeEventListener("keydown", handleEscapeClick);
    };
  }, [isFullScreen]);

  const handleDownload = async () => {
    const response: Response = await fetch(file.url);
    const blob: Blob = await response.blob();

    const downloadLink: HTMLAnchorElement = document.createElement("a");

    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = file.name;
    downloadLink.click();
  };

  // скрытие элементов управления через 3 секунды
  useEffect(() => {
    const fileName: HTMLSpanElement = document.querySelector(
      ".FileViewModal_title__1wVaq"
    ) as HTMLSpanElement;
    const btns: HTMLDivElement = document.querySelector(
      ".FileViewModal_buttonsGroup__QbGVl"
    ) as HTMLDivElement;
    if (!fileName || !btns) return;

    const hideElements = () => {
      fileName.style.opacity = "0";
      btns.style.opacity = "0";
    };

    let timeoutId = setTimeout(hideElements, 3000);

    const showElements = () => {
      clearTimeout(timeoutId);

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

  return (
    <div
      className={`${styles.container} ${
        isFullScreen && styles.fullScreenContainer
      }`}
    >
      <span
        className={styles.title}
        style={isFullScreen ? { opacity: 0 } : null}
      >
        {file.name}
      </span>
      {file.type.startsWith("image/") ? (
        <img
          src={file.url}
          alt="image"
          className={`${styles.image} ${
            isFullScreen && styles.fullScreenImage
          }`}
        />
      ) : file.type.startsWith("video/") ? (
        <Video video={file} isFullScreen={isFullScreen} />
      ) : null}
      <div className={styles.buttonsGroup}>
        <div className={styles.btn}>
          <IoMdDownload className={styles.icon} onClick={handleDownload} />
        </div>

        <div
          className={styles.btn}
          onClick={() => setIsFullScreen((prevState: boolean) => !prevState)}
        >
          {isFullScreen ? (
            <MdFullscreenExit className={styles.icon} />
          ) : (
            <MdFullscreen className={styles.icon} />
          )}
        </div>
        <div className={styles.btn} onClick={() => setModalFile(undefined)}>
          <IoMdClose className={styles.icon} />
        </div>
      </div>
    </div>
  );
};

export default FileViewModal;
