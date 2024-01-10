import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { LINKS } from "./constants";
import Navbar from "./navbar.component";

describe("Navbar", () => {
  it("should render a navbar", () => {
    render(<Navbar />);

    screen.getByRole("navigation");
  });

  it("should render a list of links", () => {
    render(<Navbar />);

    screen.getByRole("list");
  });

  it("should render all links in the LINKS array", () => {
    render(<Navbar />);

    LINKS.forEach(link => {
      screen.getByRole("link", { name: link.label });
    });
  });
});
