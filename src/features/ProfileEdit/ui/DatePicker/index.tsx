import { ChangeEvent, useState } from "react";
import styles from "./index.module.scss";
import { IoCalendarClearOutline } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import Select from "../Select";
import getDaysArray from "./utils";
import months from "../../../../app/mock/months";
import years from "../../../../app/mock/years";

interface DatePickerProps {
  label: string;
  placeholder: string;
  value: string;
  onSaveDate: (year: string, month: string, day: string) => void;
}

const DatePicker = ({
  label,
  placeholder,
  value,
  onSaveDate,
}: DatePickerProps) => {
  const [year, setYear] = useState<string>("2010");
  const [month, setMonth] = useState<string>("Январь");
  const [day, setDay] = useState<string>("1");
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <span className={styles.label}>{label}</span>
      <div
        className={styles.input}
        onClick={() => setIsActive((prevState: boolean) => !prevState)}
      >
        {value ? (
          <span className={styles.value}>{value}</span>
        ) : (
          <span className={styles.placeholder}>{placeholder}</span>
        )}
        <IoCalendarClearOutline className={styles.icon} />
      </div>
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0 }}
            className={styles.picker}
          >
            <div className={styles.header}>
              <Select
                options={months}
                value={month}
                setValue={(e: ChangeEvent<HTMLSelectElement>) =>
                  setMonth(e.target.value)
                }
              />
              <Select
                options={years}
                value={year}
                setValue={(e: ChangeEvent<HTMLSelectElement>) =>
                  setYear(e.target.value)
                }
              />
            </div>
            <div className={styles.daysList}>
              {getDaysArray(year, month).map((item: string, index: number) => (
                <div
                  className={`${styles.dayBtn} ${
                    item === day && styles.active
                  }`}
                  key={index}
                  onClick={() => setDay(item)}
                >
                  {item}
                </div>
              ))}
            </div>
            <div
              className={styles.saveBtn}
              onClick={() => {
                onSaveDate(year, month, day);
                setIsActive(false);
              }}
            >
              Cохранить
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DatePicker;
