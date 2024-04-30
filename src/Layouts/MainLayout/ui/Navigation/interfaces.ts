import { IconType } from "react-icons";

export interface LinkInterface {
  text: string;
  icon: IconType;
  to: string;
  active: boolean;
}
