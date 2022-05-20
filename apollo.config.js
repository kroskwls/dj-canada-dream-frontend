require('dotenv').config({
	path: '.env'
});

module.exports = {
	client: {
		includes: ['./src/graphql/*.ts'],
		tagName: 'gql',
		service: {
			name: 'dj-canada-dream-backend',
			url: `${process.env.REACT_APP_SERVER_URI}/graphql`
		}
	}
};