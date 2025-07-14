import { atom } from "recoil";
import { Currency, type PaginationResponse } from "../interfaces";
import implementPersist from "../utilities/implement-persist";
import { UserType, type User } from "../interfaces/user";

export const defaultUser: User = {
  currency: Currency.NGN,
  email: "",
  firstName: "",
  id: "",
  isDeleted: false,
  lastName: "",
  phoneCode: "RW",
  type: UserType.User,
  username: "",
  avatar: "",
  skillsOfferred: [],
  skillsWanted: [],
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

export const tutorsListState = atom<PaginationResponse<User>>({
  default: {
    list: [],
    totalCount: 0,
    totalPages: 1,
  },
  key: "tutorsListState",
});

export const starredTutorsListState = atom<PaginationResponse<User>>({
  default: {
    list: [],
    totalCount: 0,
    totalPages: 1,
  },
  key: "starredTutorsListState",
});

export const matchedTutorsListState = atom<PaginationResponse<User>>({
  default: {
    list: [],
    totalCount: 0,
    totalPages: 1,
  },
  key: "matchedTutorsListState",
});
