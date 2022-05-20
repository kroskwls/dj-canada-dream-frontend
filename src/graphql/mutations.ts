import { gql } from "@apollo/client";

export const ADD_QUESTION_MUTATION = gql`
	mutation AddQuestionMutation ($input: AddQuestionInput!) {
		addQuestion (input: $input) {
			ok
			error
		}
	}
`;

export const EDIT_QUESTION_MUTATION = gql`
	mutation EditQuestionMutation ($input: EditQuestionInput!) {
		editQuestion (input: $input) {
			ok
			error
		}
	}
`;

export const DELETE_QUESTION_MUTATION = gql`
	mutation DeleteQuestionMutation ($input: DeleteQuestionInput!) {
		deleteQuestion (input: $input) {
			ok
			error
		}
	}
`;
