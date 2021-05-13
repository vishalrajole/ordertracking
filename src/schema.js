import { gql } from "apollo-server-express";

const typeDefs = gql`
  type DeliveryStatus {
    status: String
    status_text: String
  }
  type Articles {
    articleNo: String
    articleImageUrl: String
    quantity: String
    product_name: String
  }

  type Tracking {
    tracking_number: String
    deliveryStatus: [DeliveryStatus]
    articles: [Articles]
  }
  type Orders {
    orderNo: ID
    courier: String
    street: String
    zip_code: String
    city: String
    destination_country_iso3: String
    email: String
    trackings: Tracking
  }

  type User {
    email: String
    token: String
  }

  type Query {
    getAllOrders(email: String): [Orders]
  }

  type Mutation {
    login(email: String!): User
  }
`;

export { typeDefs };

// type Tracking {
//   orderNo: ID
//   tracking_number: String
//   courier: String
//   street: String
//   zip_code: String
//   city: String
//   destination_country_iso3: String
//   email: String
//   articleNo: String
//   articleImageUrl: String
//   quantity: String
//   product_name: String
// }
