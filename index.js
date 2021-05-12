const express = require("express");
const path = require("path");

// Bring in GraphQL-Express middleware
const { ApolloServer } = require("apollo-server-express");

const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  app.use((req, res) => {
    res.status(200);
    res.send("Hello!");
    res.end();
  });

  await new Promise((resolve) => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}

startApolloServer();
