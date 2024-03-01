import { selector } from "recoil";
import { userIdState } from "./atoms";

export const userIdSelector = selector({
  key: "userIdSelector",
  get: ({ get }) => get(userIdState),
  set: ({ set }, value) =>
    set(userIdState, (state) => ({ ...state, value: value })),
});
