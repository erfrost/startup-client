import { atom } from "recoil";
import User from "../models/user";

export const userState = atom<User | null>({
  key: "userState",
  default: null,
});

export const errorState = atom<string | undefined>({
  key: "errorState",
  default: undefined,
});
