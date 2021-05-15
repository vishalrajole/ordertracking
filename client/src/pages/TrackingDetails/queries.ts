import { gql } from "@apollo/client";

export const GET_ORDER_DETAILS = gql`
  query Orders($tracking_number: String) {
    getAllOrders(tracking_number: $tracking_number) {
      orderNo
      street
      zip_code
      city
      destination_country_iso3
      trackings {
        tracking_number
        deliveryStatus {
          status
          status_text
          status_details
        }
        articles {
          articleNo
          quantity
          product_name
          articleImageUrl
        }
      }
    }
  }
`;
