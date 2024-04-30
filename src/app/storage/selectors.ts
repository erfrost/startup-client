import { selector } from "recoil";
import { errorState, userState } from "./atoms";

export const userSelector = selector({
  key: "userSelector",
  get: ({ get }) => get(userState),
  set: ({ set }, value) => set(userState, value),
});

export const errorSelector = selector({
  key: "errorSelector",
  get: ({ get }) => get(errorState),
  set: ({ set }, value) => set(errorState, value),
});
