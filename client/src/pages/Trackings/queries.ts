import { gql } from "@apollo/client";

export const GET_ORDERS = gql`
  query Orders($email: String) {
    getAllOrders(email: $email) {
      orderNo
      courier
      street
      zip_code
      city
      destination_country_iso3
      email
      trackings {
        tracking_number
        deliveryStatus {
          status
          status_text
        }
        articles {
          articleNo
          articleImageUrl
        }
      }
    }
  }
`;
