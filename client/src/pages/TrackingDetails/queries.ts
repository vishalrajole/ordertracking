import { gql } from "@apollo/client";

export const GET_ALL_TRACKINGS = gql`
  query Trackings($email: String) {
    getAllTrackings(email: $email) {
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
