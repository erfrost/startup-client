import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Parameter } from "../..";
import styles from "./index.module.scss";
import { MdDelete } from "react-icons/md";

interface ParametersProps {
  parameters: Parameter[];
  setParams: Dispatch<SetStateAction<Parameter[]>>;
}

const Parameters = ({ parameters, setParams }: ParametersProps) => {
  const onAddParam = () => {
    setParams((prevState: Parameter[]) => [
      {
        title: "",
        value: "",
      },
      ...prevState,
    ]);
  };

  const onUpdateParameter = (
    e: ChangeEvent<HTMLInputElement>,
    key: string,
    index: number
  ) => {
    const value: string = e.target.value;

    setParams((prevState: Parameter[]) => {
      const arr: Parameter[] = [...prevState];

      const currentParam: Parameter = prevState[index];
      currentParam[key] = value;
      arr[index] = currentParam;

      return arr;
    });
  };

  const onDeleteParameter = (index: number) => {
    setParams((prevState: Parameter[]) =>
      [...prevState].filter((_, i: number) => i !== index)
    );
  };

  return (
    <>
      <div className={styles.addBtn} onClick={onAddParam}>
        Создать параметр
      </div>
      {parameters.map((param: Parameter, index: number) => (
        <div className={styles.paramContainer} key={index}>
          <input
            className={styles.input}
            placeholder="Время сбора"
            value={param.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onUpdateParameter(e, "title", index)
            }
          />
          <div className={styles.dash}></div>
          <input
            className={styles.input}
            placeholder="13:15"
            value={param.value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onUpdateParameter(e, "value", index)
            }
          />
          <div
            className={styles.iconContainer}
            onClick={() => onDeleteParameter(index)}
          >
            <MdDelete className={styles.icon} />
          </div>
        </div>
      ))}
    </>
  );
};

export default Parameters;
