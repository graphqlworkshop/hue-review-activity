const { ApolloServer } = require("apollo-server");
const { ApolloGateway, RemoteGraphQLDataSource } = require("@apollo/gateway");
const fetch = require("node-fetch");

const gateway = new ApolloGateway({
  serviceList: [
    { name: "users", url: "http://localhost:4000" },
    { name: "reviews", url: "http://localhost:4001" },
    { name: "colors", url: "http://localhost:4002" }
  ],
  buildService({ url }) {
    return new RemoteGraphQLDataSource({
      url,
      async willSendRequest({ request, context }) {
        if (context.authorization) {
          const query = `
              query findUserEmail { me { email } }
            `;
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: context.authorization
            },
            body: JSON.stringify({ query })
          };
          const { data } = await fetch("http://localhost:4000", options)
            .then(res => res.json())
            .catch(console.error);
          if (data && data.me) {
            request.http.headers.set("user-email", data.me.email);
          }
          request.http.headers.set("authorization", context.authorization);
          request.http.headers.set("app-id", "hue-review");
        }
      }
    });
  }
});

const start = async () => {
  const { schema, executor } = await gateway.load();
  const server = new ApolloServer({
    schema,
    executor,
    context: ({ req }) => ({ authorization: req.headers.authorization })
  });
  server.listen(process.env.PORT).then(({ url }) => {
    console.log(
      `      🎨  🖍  👩‍💻  ✅   - The Hue Review Gateway API running at ${url}`
    );
  });
};

start();
