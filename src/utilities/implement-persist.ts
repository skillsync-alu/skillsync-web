import { type AtomEffect, type RecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";
import { handleErrorMessage } from "./error-handling";

export default function implementPersist<T>(key: string) {
  if (!key) {
    return [];
  }

  return [recoilPersist({ key }).persistAtom] as AtomEffect<T>[];
}

export function removePersistentState<T>(state: RecoilState<T>) {
  try {
    if (!window.localStorage) {
      return;
    }

    return window.localStorage.removeItem(state.key);
  } catch (error) {
    handleErrorMessage(error);
  }
}
