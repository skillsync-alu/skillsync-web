import { atom } from "recoil";
import { Currency } from "../interfaces";
import implementPersist from "../utilities/implement-persist";

// #TODO: change this to the correct type
type User = any;

// export const defaultUser: User = {
export const defaultUser = {
  currency: Currency.NGN,
  email: "",
  firstName: "",
  id: "",
  isDeleted: false,
  lastName: "",
  phoneCode: "RW",
  // type: UserType.User,
  username: "",
  avatar: "",
};

export const userState = atom<User>({
  key: "userState",
  default: defaultUser,
  effects_UNSTABLE: implementPersist("userState"),
});

export const UnAuthorizedSessionState = atom<string>({
  default: "",
  key: "UnAuthorizedSessionState",
  effects_UNSTABLE: implementPersist("UnAuthorizedSessionState"),
});
