import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import { GET_ORDER_DETAILS } from "./queries";
import Loading from "../../components/Loading";
import Card from "../../components/Card";
import { Image, Article, Quantity, ArticleInfo, ArticleNo } from "./style";
import { GroupWrapper, Label, Value } from "../../styles/form";

interface ArticleInterface {
  articleNo: string;
  quantity: string;
  product_name: string;
  articleImageUrl: string;
}
interface RouteParams {
  tracking_number: string;
}

const TrackingDetails = () => {
  let { tracking_number } = useParams<RouteParams>();

  console.log("tracking_number: ", tracking_number);
  const { loading, error, data } = useQuery(GET_ORDER_DETAILS, {
    variables: { tracking_number },
  });

  console.log("ida: ", data);

  const tracking = data?.getAllOrders[0];
  const articles = data?.getAllOrders[0].trackings?.articles;

  return (
    <Card toBack={"/trackings"}>
      {loading ? (
        <Loading message="Loading order details" />
      ) : (
        <>
          {error && (
            <div>
              Apologize, Something went wrong. We didn't fetch orders for given
              email.
            </div>
          )}
          <GroupWrapper>
            <Label>Order Number</Label>
            <Value> {tracking.orderNo}</Value>
          </GroupWrapper>
          <GroupWrapper>
            <Label>Delivery Address</Label>
            <Value>
              {`${tracking.street} ${tracking.zip_code} ${tracking.city}`}
            </Value>
          </GroupWrapper>
          <Card isSmall={true}>
            <GroupWrapper>
              <Label>Tracking Number</Label>
              <Value>{tracking?.trackings?.tracking_number}</Value>
            </GroupWrapper>
            <GroupWrapper>
              <Label>Current Status</Label>
              <Value>
                {tracking?.trackings?.deliveryStatus[0]?.status_text}
              </Value>
              <p>{tracking?.trackings?.deliveryStatus[0]?.status_details}</p>
            </GroupWrapper>
          </Card>
          {articles.length && (
            <Card isSmall={true}>
              <Label> Articles </Label>

              {articles.map((article: ArticleInterface) => (
                <Article key={article.articleNo}>
                  {article.quantity && (
                    <Quantity>{`x${article.quantity}`}</Quantity>
                  )}
                  {article.articleImageUrl && (
                    <Image
                      src={article.articleImageUrl}
                      alt={article.product_name}
                    />
                  )}
                  {article.product_name && (
                    <ArticleInfo>
                      {article.product_name}
                      <ArticleNo>{article.articleNo}</ArticleNo>
                    </ArticleInfo>
                  )}
                </Article>
              ))}
            </Card>
          )}
        </>
      )}
    </Card>
  );
};

export default TrackingDetails;
