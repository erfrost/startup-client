import { atom } from "recoil";

export const userIdState = atom<string | undefined>({
  key: "userIdState",
  default: undefined,
});
