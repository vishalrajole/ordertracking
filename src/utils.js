import { groupBy, values, flatten, filter } from "lodash-es";

/***
 * plug trackings into checkpoints to generate object with following format
 * { orderNo, courier, street, zip_code, city, trackings:{ tracking_number, deliveryStatus:{}, articles:{}}}
 * this will ensure in future one order can have multiple trackings
 *
 * At last, we sorting trackings with date in desc order
 */
export const formatTrackings = (checkpoints, trackings) => {
  const groupedCheckpoints = groupBy(checkpoints, "tracking_number");
  const trackingsGroupedByOrderNo = groupBy(trackings, "orderNo");

  const formatedData = flatten(
    values(trackingsGroupedByOrderNo).map((trackings) => {
      const trackingsGroupedByTrackingNo = groupBy(
        trackings,
        "tracking_number"
      );

      return Object.values(trackingsGroupedByTrackingNo).map((tracking) => {
        const {
          orderNo,
          tracking_number,
          courier,
          street,
          zip_code,
          city,
          destination_country_iso3,
          email,
        } = tracking[0];

        let deliveryStatus = groupedCheckpoints[tracking_number].map(
          ({ timestamp, status, status_text, status_details, location }) => ({
            timestamp,
            status,
            status_text,
            status_details,
            location,
          })
        );

        // Sort delivery status by desc timestamp
        deliveryStatus = deliveryStatus.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );

        return {
          orderNo,
          courier,
          street,
          zip_code,
          city,
          destination_country_iso3,
          email,
          trackings: {
            tracking_number,
            deliveryStatus,
            articles: tracking.map(
              ({ articleNo, articleImageUrl, quantity, product_name }) => ({
                articleNo,
                articleImageUrl,
                quantity,
                product_name,
              })
            ),
          },
        };
      });
    })
  );

  return formatedData;
};

export const filterByEmail = (trackings, email) =>
  filter(trackings, (tracking) => tracking.email === email);

export const filterByTrackingNumber = (trackings, tracking_number) =>
  filter(
    trackings,
    (tracking) => tracking.trackings.tracking_number === tracking_number
  );
