import { screen, cleanup, act } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { Route, MemoryRouter, useParams } from "react-router-dom";

import { render } from "../../utils/test-utils";
import TrackingDetails from ".";
import { GET_ORDER_DETAILS } from "./queries";

afterEach(cleanup);

describe("<TrackingDetails />", () => {
  it("should display order details for given tracking number", async () => {
    const mocks = [
      {
        request: {
          query: GET_ORDER_DETAILS,
          variables: {
            tracking_number: "00340000161200000001",
          },
        },
        result: {
          data: {
            getAllOrders: [
              {
                orderNo: "ORD-123-2018",
                street: "Landwehrstr. 39",
                zip_code: "80336",
                city: "München",
                destination_country_iso3: "DEU",
                trackings: {
                  tracking_number: "00340000161200000001",
                  deliveryStatus: [
                    {
                      status: "Scheduled",
                      status_text: "Delivery date set",
                      status_details:
                        "An appointment to make the delivery has been made. The goods will be delivered on Saturday, Apr 7th, 2018, between 9:30 am and 1:00 pm.",
                    },
                  ],
                  articles: [
                    {
                      articleNo: "A-B2-U",
                      quantity: "1",
                      product_name: "Tote Bag",
                      articleImageUrl:
                        "http://cdn.parcellab.com/img/sales-cannon/parcellab-bag.jpg",
                    },
                  ],
                },
              },
            ],
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter
          initialEntries={["tracking-details/00340000161200000001"]}
        >
          <Route path="tracking-details/:tracking_number">
            <TrackingDetails />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.queryByTestId("order-details-loading")).toBeInTheDocument();
    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));

    expect(screen.queryByTestId("order-number")).toBeInTheDocument();
    expect(screen.getByText("ORD-123-2018")).toBeInTheDocument();

    expect(screen.queryByTestId("tracking-number")).toBeInTheDocument();
    expect(screen.queryByTestId("order-status")).toBeInTheDocument();
    expect(screen.queryByTestId("order-articles")).toBeInTheDocument();
  });

  it("should display no orders message when we don't have orders matching with given email id", async () => {
    const localMocks = [
      {
        request: {
          query: GET_ORDER_DETAILS,
          variables: {
            tracking_number: "00340000161200000001",
          },
        },
        result: {
          data: { getAllOrders: [] },
        },
      },
    ];
    render(
      <MockedProvider mocks={localMocks} addTypename={false}>
        <TrackingDetails />
      </MockedProvider>
    );

    expect(screen.queryByTestId("order-details-loading")).toBeInTheDocument();
    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
    expect(
      screen.queryByTestId("no-order-details-message")
    ).toBeInTheDocument();
  });

  it("should display error message when server returns an error", async () => {
    const localMocks = [
      {
        request: {
          query: GET_ORDER_DETAILS,
          variables: {
            tracking_number: "00340000161200000001",
          },
        },
        error: new Error("An error occurred"),
      },
    ];
    render(
      <MockedProvider mocks={localMocks} addTypename={false}>
        <TrackingDetails />
      </MockedProvider>
    );

    expect(screen.queryByTestId("order-details-loading")).toBeInTheDocument();
    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
    expect(
      screen.queryByTestId("order-details-error-message")
    ).toBeInTheDocument();
  });
});
