import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import Home from "./page";

describe("Home", () => {
  it("should render the home page", () => {
    render(<Home />);
  });
});
