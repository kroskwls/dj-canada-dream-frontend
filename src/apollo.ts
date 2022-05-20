import { ApolloClient, InMemoryCache } from "@apollo/client";

const uri = `${process.env.REACT_APP_SERVER_URI}/graphql`;
export const client = new ApolloClient({
	uri, cache: new InMemoryCache()
});