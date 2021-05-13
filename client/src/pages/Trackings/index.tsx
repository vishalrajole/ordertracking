import { useQuery } from "@apollo/client";

import { GET_ORDERS } from "./queries";
import Loading from "../../components/Loading";
import { Container } from "./styles";

interface TrackingInterface {
  orderNo: string;
  tracking_number: string;
  street: string;
  zip_code: string;
  city: string;
  destination_country_iso3: string;
}

const Trackings = () => {
  const { loading, error, data } = useQuery(GET_ORDERS, {
    variables: { email: localStorage.getItem("email") },
  });

  if (loading) return <Loading message="loading trackings" />;
  if (error) return <p>Error :(</p>;

  console.log("ida: ", data);
  return (
    <Container>
      {data.getAllOrders.map((tracking: TrackingInterface) => (
        <div key={tracking.orderNo}>
          <div>Order Number {tracking.orderNo}</div>
          <div>
            address {`${tracking.street} ${tracking.zip_code} ${tracking.city}`}
          </div>
        </div>
      ))}
    </Container>
  );
};

export default Trackings;
