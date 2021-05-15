import { useQuery } from "@apollo/client";
import { useHistory, Link } from "react-router-dom";

import { GET_ORDERS } from "./queries";
import Loading from "../../components/Loading";
import Card from "../../components/Card";
import { GridCol2 } from "./styles";
import { GroupWrapper, Label, Value } from "../../styles/form";
import { getByTitle } from "@testing-library/dom";

interface TrackingInterface {
  orderNo: string;
  street: string;
  zip_code: string;
  city: string;
  destination_country_iso3: string;
  trackings: {
    tracking_number: string;
    deliveryStatus: [
      {
        status_text: String;
      }
    ];
  };
}

const Trackings = () => {
  const history = useHistory();

  const { loading, error, data } = useQuery(GET_ORDERS, {
    variables: { email: localStorage.getItem("email") },
  });

  if (error) return <p>Error :(</p>;

  const goToTrackingDetails = (tracking_number: string) => {
    history.push(`/tracking-details/${tracking_number}`);
  };
  const getTitle = () =>
    data?.getAllOrders.length ? "Your Orders" : "No Orders";

  return (
    <Card title={getTitle()} toBack={"/login"}>
      {loading ? (
        <Loading message="Loading orders" />
      ) : (
        <>
          {!data.getAllOrders.length && (
            <div>
              Apologize, we didn't find any order for given email. Please use
              same email used while ordering a product
            </div>
          )}
          {error && (
            <div>
              Apologize, Something went wrong. We didn't fetch orders for given
              email.
            </div>
          )}
          {data.getAllOrders.map((tracking: TrackingInterface) => (
            <Card
              isClickable={true}
              isSmall={true}
              key={tracking.orderNo}
              onClick={() =>
                goToTrackingDetails(tracking.trackings.tracking_number)
              }
            >
              <GridCol2>
                <GroupWrapper>
                  <Label>Order Number</Label>
                  <Value> {tracking.orderNo}</Value>
                </GroupWrapper>
                <GroupWrapper>
                  <Label>Curreny Status</Label>
                  <Value>
                    {tracking?.trackings?.deliveryStatus[0]?.status_text}
                  </Value>
                </GroupWrapper>
              </GridCol2>
              <GroupWrapper>
                <Label>Delivery Address</Label>
                <Value>
                  {`${tracking.street} ${tracking.zip_code} ${tracking.city}`}
                </Value>
              </GroupWrapper>
            </Card>
          ))}
        </>
      )}
    </Card>
  );
};

export default Trackings;
