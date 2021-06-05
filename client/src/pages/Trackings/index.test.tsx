import { screen, cleanup, waitFor, act } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import { render } from "../../utils/test-utils";
import Trackings from ".";
import { GET_ORDERS } from "./queries";

afterEach(cleanup);

beforeEach(() => {
  localStorage.setItem("email", "test@success.com");
});

describe("<Trackings />", () => {
  it("should display orders for given email", async () => {
    const mocks = [
      {
        request: {
          query: GET_ORDERS,
          variables: {
            email: localStorage.getItem("email"),
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
                      status_text: "Delivery date set",
                    },
                    {
                      status_text: "Delivery is being prepared",
                    },
                    {
                      status_text: "Pick-up planned",
                    },
                    {
                      status_text: "Dispatched",
                    },
                    {
                      status_text: "Finishing",
                    },
                    {
                      status_text: "Order processed",
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
        <Trackings />
      </MockedProvider>
    );

    expect(screen.queryByTestId("order-loading")).toBeInTheDocument();
    await act(() => new Promise((resolve) => setTimeout(resolve, 0))); // wait for response

    expect(screen.queryByTestId("order-number")).toBeInTheDocument();
    expect(screen.getByText("ORD-123-2018")).toBeInTheDocument();
    expect(screen.getByText("Delivery date set")).toBeInTheDocument();
  });

  it("should display no orders message when we don't have orders matching with given email id", async () => {
    localStorage.setItem("email", "test@test.com");
    const localMocks = [
      {
        request: {
          query: GET_ORDERS,
          variables: {
            email: localStorage.getItem("email"),
          },
        },
        result: {
          data: { getAllOrders: [] },
        },
      },
    ];
    render(
      <MockedProvider mocks={localMocks} addTypename={false}>
        <Trackings />
      </MockedProvider>
    );

    expect(screen.queryByTestId("order-loading")).toBeInTheDocument();
    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
    expect(screen.queryByTestId("no-orders-message")).toBeInTheDocument();
  });

  it("should display error message when server returns an error", async () => {
    const localMocks = [
      {
        request: {
          query: GET_ORDERS,
          variables: {
            email: "test@test.com",
          },
        },
        error: new Error("An error occurred"),
      },
    ];
    render(
      <MockedProvider mocks={localMocks} addTypename={false}>
        <Trackings />
      </MockedProvider>
    );

    expect(screen.queryByTestId("order-loading")).toBeInTheDocument();
    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
    expect(screen.queryByTestId("orders-error-message")).toBeInTheDocument();
  });
});
