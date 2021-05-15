import express from "express";
import path from "path";
// Bring in GraphQL-Express middleware
import { ApolloServer } from "apollo-server-express";

import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  app.use(express.static("public"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
  });

  await new Promise((resolve) =>
    app.listen({ port: process.env.PORT || 4000 }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
  );
  return { server, app };
}

startApolloServer();
