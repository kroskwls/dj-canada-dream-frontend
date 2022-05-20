import { ApolloClient, InMemoryCache } from "@apollo/client";

const uri = `${process.env.REACT_APP_SERVER_URI}/graphql`;
console.log(uri);
export const client = new ApolloClient({
	uri, cache: new InMemoryCache()
});