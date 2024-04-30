import _ from "lodash";
import Class from "../../app/models/class";
import Diagram from "../../shared/Diagram";
import SettingsBtn from "../../shared/SettingsBtn";
import styles from "./index.module.scss";
import months from "../../app/mock/months";
import getSortedMonths from "./utils/getSortedMonths";
import BlueBtn from "../../shared/BlueBtn";
import { Link } from "react-router-dom";
import useModal from "../../app/hooks/useModal";
import Modal from "./ui/Modal";

const sortedMonths: string[] = getSortedMonths();

const data = {
  labels: sortedMonths,
  datasets: [
    {
      label: "Средний балл класса",
      data: sortedMonths.map(() => _.random(2, 5)),
      backgroundColor: "#1FC6C6",
    },
  ],
};

interface ClassItemProps {
  classItem: Class;
}

const ClassItem = ({ classItem }: ClassItemProps) => {
  const { isOpen, onOpen, onClose, toggle } = useModal(false);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.name}>{classItem.class_name}</div>
        <SettingsBtn onClick={onOpen} />
      </div>
      <div className={styles.classContent}>
        <Diagram columns={months} data={data} />
        <div className={styles.right}>
          <div className={styles.topStudents}>
            <span className={styles.topBold}>Лучшие ученики</span>
            <span className={styles.topItem}>1. Дмитрий Ленц, балл - 2.7</span>
            <span className={styles.topItem}>
              2. Кирилл Яковлев, балл - 2.7
            </span>
            <span className={styles.topItem}>
              3. Алексей Елтовский, балл - 2.7
            </span>
          </div>
          <Link to={`/class/${classItem.class_id}`} className={styles.link}>
            <BlueBtn width="100%">Перейти</BlueBtn>
          </Link>
        </div>
      </div>
      {isOpen && <Modal classItem={classItem} onClose={onClose} />}
    </div>
  );
};

export default ClassItem;
