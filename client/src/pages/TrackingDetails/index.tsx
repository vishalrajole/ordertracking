import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import { GET_ORDER_DETAILS } from "./queries";
import Loading from "../../components/Loading";
import Card from "../../components/Card";
import {
  Image,
  Article,
  Quantity,
  ArticleInfo,
  ArticleNo,
  SubText,
} from "./style";
import { GroupWrapper, Label, Value } from "../../styles/form";

interface ArticleInterface {
  articleNo: string;
  quantity: string;
  product_name: string;
  articleImageUrl: string;
}
interface RouteParams {
  [key: string]: string;
  tracking_number: string;
}

const TrackingDetails = () => {
  let { tracking_number } = useParams<RouteParams>();

  const { loading, error, data } = useQuery(GET_ORDER_DETAILS, {
    variables: { tracking_number },
  });

  const tracking = data?.getAllOrders[0] || [];
  let articles = [];
  if (tracking) {
    articles = data?.getAllOrders[0]?.trackings?.articles || [];
  }

  return (
    <Card toBack={"/trackings"}>
      {loading ? (
        <Loading
          dataTestId="order-details-loading"
          message="Loading order details"
        />
      ) : (
        <>
          {error && (
            <div data-testid="order-details-error-message">
              Apologize, Something went wrong. We didn't fetch orders for given
              email.
            </div>
          )}
          {tracking.orderNo ? (
            <GroupWrapper>
              <Label data-testid="order-number">Order Number</Label>
              <Value> {tracking.orderNo}</Value>
            </GroupWrapper>
          ) : (
            <div data-testid="no-order-details-message">
              Apologize, Something went wrong. We couldn't fetch order details
              for given tracking number.
            </div>
          )}

          {tracking.street && (
            <GroupWrapper>
              <Label>Delivery Address</Label>
              <Value>
                {`${tracking.street}`}
                <br />
                {`${tracking.zip_code} ${tracking.city}`}
              </Value>
            </GroupWrapper>
          )}

          {tracking?.trackings?.tracking_number && (
            <Card isSmall={true}>
              <GroupWrapper>
                <Label data-testid="tracking-number">Tracking Number</Label>
                <Value>{tracking?.trackings?.tracking_number}</Value>
              </GroupWrapper>
              <GroupWrapper>
                <Label data-testid="order-status">Current Status</Label>
                <Value>
                  {tracking?.trackings?.deliveryStatus[0]?.status_text}
                </Value>
                <SubText>
                  {tracking?.trackings?.deliveryStatus[0]?.status_details}
                </SubText>
              </GroupWrapper>
            </Card>
          )}

          {articles.length > 0 && (
            <Card isSmall={true}>
              <Label data-testid="order-articles"> Articles </Label>

              {articles.map((article: ArticleInterface) => (
                <>
                  {/* handled corner case when articls dont have all data required for given tracking number */}
                  {article.articleNo ? (
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
                  ) : (
                    <div>
                      Apologize, Something went wrong. We couldn't fetch
                      articles for given tracking number.
                    </div>
                  )}
                </>
              ))}
            </Card>
          )}
        </>
      )}
    </Card>
  );
};

export default TrackingDetails;
