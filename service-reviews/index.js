const { ApolloServer, gql } = require("apollo-server");
const { countReviews, findReviews } = require("./lib");
const typeDefs = gql`
  type Query {
    totalReviews: Int!
    allReviews: [Review!]!
  }
`;

const resolvers = {
  Query: {
    totalReviews: (_, __, { countReviews }) => countReviews(),
    allReviews: (_, __, { findReviews }) => findReviews()
  }
};

const start = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context({ req }) {
      return {
        countReviews,
        findReviews
      };
    }
  });
  server.listen(process.env.PORT).then(({ url }) => {
    console.log(` ⭐️ ⭐️ ⭐️ ⭐️ ⭐️  - Review service running at: ${url}`);
  });
};

start();
