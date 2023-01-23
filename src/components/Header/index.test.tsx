import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { HeaderMenuColored } from ".";

const links = [
  { link: "/", label: "Home" },
  { link: "/create", label: "Create" },
];

describe("HeaderMenuColored", () => {
  it("renders a HeaderMenuColored", () => {
    render(<HeaderMenuColored links={links} />);

    const homeLink = screen.getByText("Home");
    const createLink = screen.getByText("Create");

    expect(homeLink).toBeInTheDocument();
    expect(createLink).toBeInTheDocument();
  });
});
