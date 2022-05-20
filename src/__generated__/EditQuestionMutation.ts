/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditQuestionInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: EditQuestionMutation
// ====================================================

export interface EditQuestionMutation_editQuestion {
  __typename: "EditQuestionOutput";
  ok: boolean;
  error: string | null;
}

export interface EditQuestionMutation {
  editQuestion: EditQuestionMutation_editQuestion;
}

export interface EditQuestionMutationVariables {
  input: EditQuestionInput;
}
