import neatCsv from "neat-csv";
import { readFile } from "fs/promises";

import {
  formatTrackings,
  filterByEmail,
  filterByTrackingNumber,
} from "./utils.js";

const resolvers = {
  Query: {
    getAllOrders: async (root, args, {}) => {
      try {
        let filteredTrackings = [];
        const { email, tracking_number } = args;
        const trackingsData = await readFile("../mocks/trackings.csv").catch(
          (err) => console.error("Failed to read file", err)
        );
        const trackings = await neatCsv(trackingsData, { separator: ";" });

        const checkpointsData = await readFile(
          "../mocks/checkpoints.csv"
        ).catch((err) => console.error("Failed to read file", err));

        const checkpoints = await neatCsv(checkpointsData, { separator: ";" });

        const formattedTrackings = formatTrackings(checkpoints, trackings);

        // Note: since we are reading from csv, filtering data here. we can also execute, queries on db
        if (email) {
          filteredTrackings = filterByEmail(formattedTrackings, email);
        } else if (tracking_number) {
          filteredTrackings = filterByTrackingNumber(
            formattedTrackings,
            tracking_number
          );
        }

        return filteredTrackings;
      } catch (error) {
        throw new Error("Something went wrong!");
      }
    },
  },
  Mutation: {
    login: async (root, args, {}) => {
      try {
        const length = 6; // intentionlly hard coded token, jwt would be better in case we want to habdle auth
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
