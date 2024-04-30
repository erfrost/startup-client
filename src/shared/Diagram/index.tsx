import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import _ from "lodash";
import styles from "./index.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DiagramProps {
  columns: string[];
  data: any;
}

const Diagram = ({ columns, data }: DiagramProps) => {
  return <Bar className={styles.diagram} data={data} />;
};

export default Diagram;
