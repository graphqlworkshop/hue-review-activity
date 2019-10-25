const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    gnar: String
  }
`;

const resolvers = {
  Query: {
    gnar: () => "gnarly!!"
  }
};

const start = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });

  server.listen(process.env.PORT).then(({ url }) => {
    console.log(`     👨‍👨‍👧‍👦   - Account service running at: ${url}`);
  });
};

start();
