import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { GET_ORDERS } from "./queries";
import Loading from "../../components/Loading";
import Card from "../../components/Card";
import { GridCol2 } from "./styles";
import { GroupWrapper, Label, Value } from "../../styles/form";

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
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_ORDERS, {
    // temporary using localstorage to pass email id, token authentication is alternate better approach
    variables: { email: localStorage.getItem("email") },
  });

  const goToTrackingDetails = (tracking_number: string) => {
    navigate(`/tracking-details/${tracking_number}`);
  };

  const getTitle = () =>
    data?.getAllOrders.length ? "Your Orders" : "No Orders";

  return (
    <Card title={getTitle()} toBack={"/login"}>
      {loading ? (
        <Loading dataTestId="order-loading" message="Loading orders" />
      ) : (
        <>
          {!data?.getAllOrders.length && !error && (
            <div data-testid="no-orders-message">
              Apologize, we didn't find any order for given email. Please use
              same email used while ordering a product.
            </div>
          )}
          {error && (
            <div data-testid="orders-error-message">
              Apologize, Something went wrong. We didn't fetch orders for given
              email.
            </div>
          )}
          {data?.getAllOrders.map((tracking: TrackingInterface) => (
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
                  <Label data-testid="order-number">Order Number</Label>
                  <Value> {tracking.orderNo}</Value>
                </GroupWrapper>
                <GroupWrapper>
                  <Label>Current Status</Label>
                  <Value>
                    {tracking?.trackings?.deliveryStatus[0]?.status_text}
                  </Value>
                </GroupWrapper>
              </GridCol2>
              <GroupWrapper>
                <Label>Delivery Address</Label>
                <Value>
                  {`${tracking.street}`}
                  <br />
                  {`${tracking.zip_code} ${tracking.city}`}
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
