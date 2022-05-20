/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteQuestionInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteQuestionMutation
// ====================================================

export interface DeleteQuestionMutation_deleteQuestion {
  __typename: "DeleteQuestionOutput";
  ok: boolean;
  error: string | null;
}

export interface DeleteQuestionMutation {
  deleteQuestion: DeleteQuestionMutation_deleteQuestion;
}

export interface DeleteQuestionMutationVariables {
  input: DeleteQuestionInput;
}
