import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TableHotels } from ".";

const setSearchByName = jest.fn();
const setPageInfo = jest.fn();
const deleteHotel = jest.fn();
const goToEdit = jest.fn();

const searchByName = "";
const pageInfo = {
  page: 1,
  totalPages: 10,
};
const hotels = [
  {
    name: "Hotel1new",
    address: "address1",
    rating: 4.5,
    amenities: ["pool", "laundry"],
    id: "63c89b78bb185e570ce05e91",
  },
  {
    name: "nombre 2",
    address: "direccion3",
    rating: 4,
    amenities: ["wifi", "kitchen"],
    id: "63c9a4ee4755dc3104deb13e",
  },
  {
    name: "Hotel la pasadita",
    address: "solidaridad 4",
    rating: 3,
    amenities: ["wifi", "kitchen"],
    id: "63caccf54e04957fc7e69c5e",
  },
  {
    name: "nombre 1 nuevo",
    address: "direccion3",
    rating: 4,
    amenities: ["pool", "wifi", "laundry"],
    id: "63cad3534e04957fc7e69c5f",
  },
  {
    name: "hotel test 4",
    address: "direccion, hermosillo",
    rating: 4,
    amenities: ["pool", "laundry"],
    id: "63cda7756b05f361a1a0000d",
  },
].map((hotel) => ({
  ...hotel,
  rating: hotel.rating?.toString(),
  amenities: hotel.amenities.join(", "),
}));

const inputValue = "Hotel1new";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe("TableHotels", () => {
  it("renders a TableHotels", () => {
    render(
      <TableHotels
        goToEdit={goToEdit}
        setSearchString={setSearchByName}
        searchString={searchByName}
        deleteHotel={deleteHotel}
        pageInfo={pageInfo}
        setPageInfo={setPageInfo}
        data={hotels}
      />
    );
  });

  it("On search input change", () => {
    render(
      <TableHotels
        goToEdit={goToEdit}
        setSearchString={setSearchByName}
        searchString={searchByName}
        deleteHotel={deleteHotel}
        pageInfo={pageInfo}
        setPageInfo={setPageInfo}
        data={hotels}
      />
    );

    const input = screen.getByPlaceholderText("Search by name");
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: inputValue } });
  });

  it("On click edit button", () => {
    render(
      <TableHotels
        goToEdit={goToEdit}
        setSearchString={setSearchByName}
        searchString={searchByName}
        deleteHotel={deleteHotel}
        pageInfo={pageInfo}
        setPageInfo={setPageInfo}
        data={hotels}
      />
    );

    const editBtn = screen.getByTestId("edit-btn-63c89b78bb185e570ce05e91");
    expect(editBtn).toBeInTheDocument();

    fireEvent.click(editBtn);
    expect(goToEdit).toBeCalledTimes(1);
  });

  it("On click delete button", () => {
    render(
      <TableHotels
        goToEdit={goToEdit}
        setSearchString={setSearchByName}
        searchString={searchByName}
        deleteHotel={deleteHotel}
        pageInfo={pageInfo}
        setPageInfo={setPageInfo}
        data={hotels}
      />
    );

    const deleteBtn = screen.getByTestId("delete-btn-63c89b78bb185e570ce05e91");
    expect(deleteBtn).toBeInTheDocument();

    fireEvent.click(deleteBtn);
    expect(deleteHotel).toBeCalledTimes(1);
  });

  it("render with 0 hotels", () => {
    render(
      <TableHotels
        goToEdit={goToEdit}
        setSearchString={setSearchByName}
        searchString={searchByName}
        deleteHotel={deleteHotel}
        pageInfo={pageInfo}
        setPageInfo={setPageInfo}
        data={[]}
      />
    );
  });
});
