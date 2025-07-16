import type { Document } from ".";
import type { User } from "./user";

export enum MatchStatusType {
  Draft = "Draft",
  Deleted = "Deleted",
  RejectedByStudent = "RejectedByStudent",
  RejectedByTutor = "RejectedByTutor",
  AcceptedByStudent = "AcceptedByStudent",
  AcceptedByTutor = "AcceptedByTutor",
  Confirmed = "Confirmed",
}

export interface MatchStatus {
  message: string;

  details?: string;

  type: MatchStatusType;

  timeStamp: Date;

  createdBy?: User;
}

export interface Match extends Document {
  matcher: User;

  matchee: User;

  skillsOfferred: string[];

  skillsWanted: string[];

  isDeleted: boolean;

  isConfirmed: boolean;

  status: MatchStatusType;

  statuses: MatchStatus[];
}
