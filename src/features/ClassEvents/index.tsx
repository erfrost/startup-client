import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { Event } from "../../app/models/event";
import useGetEvents from "../../app/hooks/requests/event/useGetEvents";
import useModal from "../../app/hooks/useModal";
import EventItem from "./ui/EventItem";
import CreateModal from "./ui/CreateModal";

const ClassEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const { isOpen, onOpen, onClose } = useModal(false);
  const role: string = localStorage.getItem("role");
  const classId: string = localStorage.getItem("class_id");
  const getEvents = useGetEvents();

  useEffect(() => {
    async function fetch() {
      const fetchedEvents: Event[] = await getEvents(classId);

      setEvents((prevState: Event[]) => [...prevState, ...fetchedEvents]);
    }

    fetch();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.title}>Мероприятия</span>
          {role === "teacher" && (
            <div className={styles.createBtn} onClick={onOpen}>
              Создать
            </div>
          )}
        </div>
        {events.length ? (
          <div className={styles.list}>
            {events.map((event: Event) => (
              <EventItem
                key={event.event_id}
                event={event}
                setEvents={setEvents}
              />
            ))}
          </div>
        ) : (
          <span className={styles.emptyEventsText}>Пока что пусто</span>
        )}
      </div>
      {isOpen && <CreateModal onClose={onClose} setEvents={setEvents} />}
    </>
  );
};

export default ClassEvents;
