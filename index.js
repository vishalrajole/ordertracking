import express from "express";
import path from "path";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";

import { typeDefs } from "./src/schema.js";
import { resolvers } from "./src/resolvers.js";

// workaround for heroku and path es6 module https://techsparx.com/nodejs/esnext/dirname-es-modules.html
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const port = process.env.PORT || 4000;

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
      console.log("__dirname: ", __dirname);
      res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
  }

  await new Promise((resolve) => app.listen({ port: port }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
  return { server, app };
}

startApolloServer();
