import { gql } from "@apollo/client";

export const ALL_QUESTIONS_QUERY = gql`
	query AllQuestionsQuery {
		allQuestions {
			ok
			error
			questions {
				id
				createdAt
				kr
				en
				status
				failCount
			}
		}
	}
`;