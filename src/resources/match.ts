import { atom } from "recoil";
import type { PaginationResponse } from "../interfaces";
import type { Match } from "../interfaces/match";

export const userMatchesListState = atom<PaginationResponse<Match>>({
  key: "userMatchesListState",
  default: {
    list: [],
    totalCount: 0,
    totalPages: 1,
  },
});
