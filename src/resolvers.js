import neatCsv from "neat-csv";
import { readFile } from "fs/promises";
import { formatTrackings } from "./utils.js";

const resolvers = {
  Query: {
    getAllOrders: async (root, args, {}) => {
      try {
        const trackingsData = await readFile("../mocks/trackings.csv").catch(
          (err) => console.error("Failed to read file", err)
        );
        const trackings = await neatCsv(trackingsData, { separator: ";" });

        const checkpointsData = await readFile(
          "../mocks/checkpoints.csv"
        ).catch((err) => console.error("Failed to read file", err));

        const checkpoints = await neatCsv(checkpointsData, { separator: ";" });

        const formattedTrackings = formatTrackings(checkpoints, trackings);

        console.log("formattedTrackings:: ", formattedTrackings);
        return formattedTrackings;
      } catch (error) {
        throw new Error("Something went wrong!");
      }
    },
  },
  Mutation: {
    login: async (root, args, {}) => {
      try {
        console.log("args.email: ", args.email);
        const length = 6; // TODO hard coded token
        const token = Math.floor(
          Math.pow(10, length - 1) +
            Math.random() *
              (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
        );
        return {
          email: args.email,
          token: token,
        };
      } catch (error) {
        throw new Error("Something went wrong!");
      }
    },
  },
};

export { resolvers };
