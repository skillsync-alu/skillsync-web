import type { User } from "../interfaces/user";

export const getFullName = (user: User) => {
  if (!user || (!user.firstName && !user.lastName)) {
    return "";
  }

  return `${user.firstName}${user.lastName ? ` ${user.lastName}` : ""}`;
};
