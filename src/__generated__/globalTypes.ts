/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum QuestionStatus {
  FAIL = "FAIL",
  PASS = "PASS",
}

export interface AddQuestionInput {
  kr?: string | null;
  en?: string | null;
}

export interface DeleteQuestionInput {
  id: number;
}

export interface EditQuestionInput {
  id?: number | null;
  kr?: string | null;
  en?: string | null;
  status?: QuestionStatus | null;
  failCount?: number | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
