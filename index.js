const { ApolloServer, gql } = require("apollo-server");
const { addAccount, findAllAccounts } = require("./lib");

const typeDefs = gql`
  scalar DateTime

  type User {
    email: ID!
    name: String!
    created: DateTime!
  }

  type Query {
    me: User
    accounts: [User!]!
  }

  input CreateAccountForm {
    email: String!
    name: String!
    password: String!
  }

  type Mutation {
    createAccount(input: CreateAccountForm!): User!
  }
`;

const resolvers = {
  Query: {
    accounts: (_, __, { findAllAccounts }) => findAllAccounts()
  },
  Mutation: {
    createAccount: (_, { input }, { addAccount }) => addAccount(input)
  }
};

const start = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    mocks: true,
    mockEntireSchema: false,
    context: {
      addAccount,
      findAllAccounts
    }
  });

  server.listen(process.env.PORT).then(({ url }) => {
    console.log(`     👨‍👨‍👧‍👦   - Account service running at: ${url}`);
  });
};

start();
