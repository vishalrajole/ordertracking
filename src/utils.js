import { groupBy, values, flatten } from "lodash-es";

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

        const deliveryStatus = groupedCheckpoints[tracking_number].map(
          ({ status, status_text }) => ({ status, status_text })
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
