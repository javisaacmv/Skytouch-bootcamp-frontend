import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ContainedTextInput } from ".";

const setValue = jest.fn();
const inputValue = "testing...";

describe("ContainedTextInput", () => {
  it("renders a ContainedTextInput", () => {
    render(
      <ContainedTextInput
        label="test"
        placeholder="what's the hotel's name?"
        value={""}
        onChange={(e) => setValue(e.target.value)}
      />
    );

    const input = screen.getByTestId("contained-input-test");

    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: inputValue } });

    expect(setValue).toHaveBeenCalledWith(inputValue);
  });
});
