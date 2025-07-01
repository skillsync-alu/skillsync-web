// import { User } from "../interfaces/user";

// export const getFullName = (user: User) => {
export const getFullName = (user: any) => {
  if (!user || (!user.firstName && !user.lastName)) {
    return "";
  }

  return `${user.firstName}${user.lastName ? ` ${user.lastName}` : ""}`;
};
