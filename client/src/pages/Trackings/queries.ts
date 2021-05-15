import { gql } from "@apollo/client";

export const GET_ORDERS = gql`
  query Orders($email: String) {
    getAllOrders(email: $email) {
      orderNo
      street
      zip_code
      city
      destination_country_iso3
      trackings {
        tracking_number
        deliveryStatus {
          status_text
        }
      }
    }
  }
`;
