import { IoIosArrowDown } from "react-icons/io";
import { Event, EventFile, EventParameter } from "../../../../app/models/event";
import styles from "./index.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import FileItem from "./ui/FileItem";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import useModal from "../../../../app/hooks/useModal";
import ModalLayout from "../../../../layouts/ModalLayout";
import useDeleteEvent from "../../../../app/hooks/requests/event/useDeleteEvent";

interface EventItemProps {
  event: Event;
  setEvents: Dispatch<SetStateAction<Event[]>>;
}

const EventItem = ({ event, setEvents }: EventItemProps) => {
  const { isOpen, onOpen, onClose } = useModal(false);
  const [isMoreInfo, setIsMoreInfo] = useState<boolean>(false);
  const role: string = localStorage.getItem("role");
  const deleteEvent = useDeleteEvent();

  const onDeleteEvent = async () => {
    await deleteEvent(event.event_id);
    setEvents((prevState: Event[]) =>
      [...prevState].filter((e: Event) => e.event_id !== event.event_id)
    );
  };

  return (
    <div className={styles.container}>
      {role === "teacher" && (
        <div className={styles.buttonsGroup}>
          <div className={styles.groupBtn}>
            <MdModeEditOutline className={styles.groupIcon} />
          </div>
          <div className={styles.groupBtn} onClick={onOpen}>
            <MdDelete className={styles.groupIcon} />
          </div>
        </div>
      )}
      {event.cover && (
        <div
          className={`${styles.header} ${
            !event.files.length &&
            !event.parameters.length &&
            styles.borderRadius
          }`}
          style={{ backgroundImage: `url(${event.cover})` }}
        ></div>
      )}
      <div className={styles.content}>
        <span className={styles.title}>{event.title}</span>
        <span className={styles.description}>{event.description}</span>
        <div
          className={styles.arrowContainer}
          onClick={() => setIsMoreInfo((prevState: boolean) => !prevState)}
        >
          <span className={styles.arrowText}>Подробнее</span>
          <IoIosArrowDown className={styles.icon} />
        </div>
        <AnimatePresence>
          <motion.div
            initial={{ height: 0 }}
            animate={isMoreInfo ? { height: "auto" } : {}}
            className={styles.accordion}
          >
            {event.parameters.length ? (
              <div className={styles.block}>
                <span className={styles.infoTitle}>
                  Дополнительная информация:
                </span>
                <div className={styles.files}>
                  {event.parameters.map((param: EventParameter) => (
                    <span
                      className={styles.parameter}
                      key={param.event_parameter_id}
                    >
                      {param.title}
                      <div className={styles.dash}></div>
                      {param.value}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            {event.files.length ? (
              <div className={styles.block}>
                <span className={styles.infoTitle}>Изображения и видео:</span>
                <div className={styles.files}>
                  {event.files.map((file: EventFile) => (
                    <FileItem key={file.event_file_id} file={file} />
                  ))}
                </div>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
      {isOpen && (
        <ModalLayout onClose={onClose} closingByClick>
          <span className={styles.modalTitle}>Подтвердите удаление</span>
          <div className={styles.modalButtonsGroup}>
            <div className={styles.whiteBtn} onClick={onClose}>
              Отменить
            </div>
            <div className={styles.blueBtn} onClick={onDeleteEvent}>
              Удалить
            </div>
          </div>
        </ModalLayout>
      )}
    </div>
  );
};

export default EventItem;
