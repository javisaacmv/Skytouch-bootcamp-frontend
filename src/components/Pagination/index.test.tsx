import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Paginate } from ".";

const pageInfo = {
  page: 1,
  totalPages: 10,
};

const pageInfoWithPage0 = {
  page: 0,
  totalPages: 10,
};

const setPageInfo = jest.fn();

describe("Paginate", () => {
  it("renders a Paginate with 10 pages", () => {
    render(<Paginate pageInfo={pageInfo} setPageInfo={setPageInfo} />);

    const input = screen.getByText("10");

    expect(input).toBeInTheDocument();
    fireEvent.click(input);

    expect(setPageInfo).toBeCalled();
  });

  it("renders a Paginate with page 0", () => {
    render(<Paginate pageInfo={pageInfoWithPage0} setPageInfo={setPageInfo} />);

    const input = screen.getByText("1");

    expect(input).toBeInTheDocument();
  });
});
