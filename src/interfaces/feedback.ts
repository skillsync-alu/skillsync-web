import type { Document } from ".";
import type { Match } from "./match";
import type { User } from "./user";

export enum FeedbackUserType {
  Matcher = "Matcher",
  Matchee = "Matchee",
}

export interface FeedbackMessage {
  user: User;

  userType: FeedbackUserType;

  message: string;

  timeStamp: Date;
}

export interface Feedback extends Document {
  isDeleted: boolean;

  matcher: User;

  matchee: User;

  match: Match;

  messages: FeedbackMessage[];
}
