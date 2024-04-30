import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Form from "../../../../shared/Form";
import styles from "./index.module.scss";
import useAddClass from "../../../../app/hooks/requests/class/useAddClass";
import Class from "../../../../app/models/class";
import ModalLayout from "../../../../layouts/ModalLayout";

interface ModalProps {
  onClose: () => void;
  setClasses: Dispatch<SetStateAction<Class[]>>;
}

interface Field {
  fieldName: string;
  value: string;
  error: boolean;
}

const Modal = ({ onClose, setClasses }: ModalProps) => {
  const [className, setClassName] = useState<Field>({
    fieldName: "className",
    value: "",
    error: false,
  });
  const addClass = useAddClass();

  const onAddClass = async () => {
    if (!className.value)
      setClassName((prevState: Field) => {
        return { ...prevState, error: true };
      });

    const newClass: Class = await addClass(className.value);

    if (newClass) {
      setClasses((prevState: Class[]) => {
        return [newClass, ...prevState];
      });
      onClose();
    }
  };

  return (
    <ModalLayout onClose={onClose} closingByClick>
      <span className={styles.title}>Cоздание класса</span>
      <Form
        label="Название класса"
        placeholder="11 А"
        value={className.value}
        setValue={(e: ChangeEvent<HTMLInputElement>) =>
          setClassName((prevState: Field) => {
            const value: string = e.target.value;
            if (value.length)
              setClassName((prevState: Field) => {
                return { ...prevState, error: false };
              });
            return { ...prevState, value };
          })
        }
        colorTheme={className.error ? "error" : "blue"}
      />
      <div className={styles.submitBtn} onClick={onAddClass}>
        Создать
      </div>
    </ModalLayout>
  );
};

export default Modal;
