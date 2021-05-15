import express from "express";
import { path, dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
// Bring in GraphQL-Express middleware
import { ApolloServer } from "apollo-server-express";

import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  const app = express();
  app.use(cors("*"));
  server.applyMiddleware({ app });

  if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }

  await new Promise((resolve) =>
    app.listen({ port: process.env.PORT || 4000 }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
  );
  return { server, app };
}

startApolloServer();
