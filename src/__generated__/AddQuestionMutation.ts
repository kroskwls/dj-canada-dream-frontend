/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddQuestionInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: AddQuestionMutation
// ====================================================

export interface AddQuestionMutation_addQuestion {
  __typename: "AddQuestionOutput";
  ok: boolean;
  error: string | null;
}

export interface AddQuestionMutation {
  addQuestion: AddQuestionMutation_addQuestion;
}

export interface AddQuestionMutationVariables {
  input: AddQuestionInput;
}
