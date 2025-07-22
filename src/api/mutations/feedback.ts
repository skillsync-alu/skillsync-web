import { gql } from "@apollo/client";
import type { Feedback } from "../../interfaces/feedback";

export const UPDATE_FEEDBACK = gql`
  mutation updateFeedback($input: UpdateFeedbackInput!) {
    updateFeedback(input: $input) {
      id
    }
  }
`;

export interface UpdateFeedbackInput {
  input: { match: string; message: string };
}

export interface UpdateFeedbackResponse {
  updateFeedback: Feedback;
}
