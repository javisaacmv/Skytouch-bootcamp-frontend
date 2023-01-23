import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Amenities } from ".";

const mockedAmenities = [
  {
    name: "pool",
    checked: false,
  },
  {
    name: "wifi",
    checked: false,
  },
  {
    name: "laundry",
    checked: false,
  },
  {
    name: "kitchen",
    checked: true,
  },
];

const modifiedMockedAmenities = [
  {
    name: "pool",
    checked: true,
  },
  {
    name: "wifi",
    checked: false,
  },
  {
    name: "laundry",
    checked: false,
  },
  {
    name: "kitchen",
    checked: true,
  },
];

const setAmenities = jest.fn;

describe("Amenities", () => {
  it("renders a Amenities", () => {
    render(
      <Amenities amenities={mockedAmenities} setAmenities={setAmenities} />
    );

    const pool = screen.getByText("pool");
    const wifi = screen.getByText("wifi");
    const laundry = screen.getByText("laundry");
    const kitchen = screen.getByText("kitchen");

    expect(pool).toBeInTheDocument();
    expect(wifi).toBeInTheDocument();
    expect(laundry).toBeInTheDocument();
    expect(kitchen).toBeInTheDocument();

    fireEvent.click(pool);

    expect(mockedAmenities).toStrictEqual(modifiedMockedAmenities);
  });
});
