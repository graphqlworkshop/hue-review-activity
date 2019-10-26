const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");
const { countReviews, findReviews } = require("./lib");

const typeDefs = gql`
  type Review {
    id: ID!
  }

  type Query {
    totalReviews: Int!
    allReviews: [Review!]!
  }
`;

const resolvers = {
  Query: {
    totalReviews: (_, __, { countReviews, appID }) => countReviews(appID),
    allReviews: (_, __, { findReviews, appID }) => findReviews(appID)
  }
};

const start = async () => {
  const server = new ApolloServer({
    schema: buildFederatedSchema([
      {
        resolvers,
        typeDefs
      }
    ]),
    context({ req }) {
      return {
        countReviews,
        findReviews,
        addReview,
        findAllItemReviews,
        findReviewById
      };
    }
  });
  server.listen(process.env.PORT).then(({ url }) => {
    console.log(`     👨‍👨‍👧‍👦   - Account service running at: ${url}`);
  });
};

start();
