const neatCsv = require("neat-csv");
const { readFile } = require("fs/promises");

exports.resolvers = {
  Query: {
    getAllTrackings: async (root, args, {}) => {
      // add it in try catch
      const data = await readFile("./mocks/trackings.csv").catch((err) =>
        console.error("Failed to read file", err)
      );
      const trackings = await neatCsv(data, { separator: ";" });
      console.log("trackings data:: ", trackings);
      return trackings;
    },

    getTracking: async (root, args, {}) => {
      // add it in try catch
      const data = await readFile("./mocks/trackings.csv").catch((err) =>
        console.error("Failed to read file", err)
      );
      const trackings = await neatCsv(data, { separator: ";" });
      console.log("trackings data:: ", args.tracking_number);
      return trackings.find((tracking) => {
        return tracking.tracking_number === args.tracking_number;
      });
    },

    getAllCheckpoints: async (root, args, {}) => {
      // add it in try catch
      const data = await readFile("./mocks/checkpoints.csv").catch((err) =>
        console.error("Failed to read file", err)
      );
      const checkpoints = await neatCsv(data, { separator: ";" });
      console.log("checkpoints data:: ", checkpoints);
      return checkpoints;
    },

    getCheckpoint: async (root, args, {}) => {
      // add it in try catch
      const data = await readFile("./mocks/checkpoints.csv").catch((err) =>
        console.error("Failed to read file", err)
      );
      const checkpoints = await neatCsv(data, { separator: ";" });

      console.log("checkpoints data:: ", checkpoints);
      return checkpoints.find((checkpoint) => {
        return checkpoint.tracking_number === args.tracking_number;
      });
    },
  },
};
