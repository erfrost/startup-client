import { useRecoilState } from "recoil";
import styles from "./index.module.scss";
import { errorState } from "../../app/storage/atoms";
import { useEffect } from "react";

const ErrorPage = () => {
  const [error, setError] = useRecoilState<string | undefined>(errorState);

  useEffect(() => setError(undefined), []);

  return <div className={styles.container}>{error}</div>;
};

export default ErrorPage;
