import { LANGUAGE_COOKIE_NAME } from "@/features/i18n/constants/language.constant";
import en from "@/features/i18n/data/en.json";
import { render, screen } from "@testing-library/react";
import { afterAll, describe, it, vi } from "vitest";
import Navbar from "./navbar.component";
import { getNavbarLinks } from "./utils/get-navbar-links";

vi.mock("next/headers", () => ({
  ...vi.importActual("next/headers"),
  cookies: () => ({
    get: () => ({ name: LANGUAGE_COOKIE_NAME, value: "en" }),
  }),
}));

afterAll(() => {
  vi.clearAllMocks();
});

describe("Navbar", () => {
  it("should render a navbar", async () => {
    render(await Navbar());

    screen.getByRole("navigation");
  });

  it("should render a list of links", async () => {
    render(await Navbar());

    screen.getByRole("list");
  });

  it("should render all links in the LINKS array", async () => {
    render(await Navbar());

    getNavbarLinks(en.navbar).forEach(link => {
      screen.getByRole("link", { name: link.label });
    });
  });
});
