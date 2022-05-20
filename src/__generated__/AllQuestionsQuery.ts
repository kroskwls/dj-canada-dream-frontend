/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuestionStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: AllQuestionsQuery
// ====================================================

export interface AllQuestionsQuery_allQuestions_questions {
  __typename: "Question";
  id: number;
  createdAt: any;
  kr: string;
  en: string;
  status: QuestionStatus;
  failCount: number;
}

export interface AllQuestionsQuery_allQuestions {
  __typename: "AllQuestionsOutput";
  ok: boolean;
  error: string | null;
  questions: AllQuestionsQuery_allQuestions_questions[] | null;
}

export interface AllQuestionsQuery {
  allQuestions: AllQuestionsQuery_allQuestions;
}
