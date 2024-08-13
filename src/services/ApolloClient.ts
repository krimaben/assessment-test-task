import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://graphql.contentful.com/content/v1/spaces/h3n75a0xb6vi",
    headers: {
      Authorization: `Bearer 3R9BuNun6VNkwPQnoUFe-N_dVPA77YccpKmKGla7D54`,
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
