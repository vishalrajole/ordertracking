const { gql } = require("apollo-server-express");

exports.typeDefs = gql`
  type Tracking {
    orderNo: ID
    tracking_number: String
    courier: String
    street: String
    zip_code: String
    city: String
    destination_country_iso3: String
    email: String
    articleNo: String
    articleImageUrl: String
    quantity: String
    product_name: String
  }

  type Checkpoint {
    tracking_number: ID
    location: String
    timestamp: String
    status: String
    status_text: String
    status_detail: String
  }

  type User {
    email: String!
  }

  type Query {
    getAllTrackings: [Tracking]
    getTracking(tracking_number: ID!): Tracking

    getAllCheckpoints: [Checkpoint]
    getCheckpoint(tracking_number: ID!): Checkpoint
  }
`;
