import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Nav, NAV_LINKS } from "./Nav";

const menuButton = () => screen.getByRole("button", { name: /menu/i });

describe("Nav", () => {
  it("renders name linking to top and all six section links", () => {
    render(<Nav name="Jane Doe" />);
    expect(screen.getByRole("link", { name: "Jane Doe" })).toHaveAttribute("href", "#");
    expect(NAV_LINKS).toHaveLength(6);
    for (const { href, label } of NAV_LINKS) {
      const links = screen.getAllByRole("link", { name: label });
      expect(links[0]).toHaveAttribute("href", href);
    }
  });

  it("menu button toggles aria-expanded and the panel", async () => {
    render(<Nav name="Jane Doe" />);
    expect(menuButton()).toHaveAttribute("aria-expanded", "false");
    expect(menuButton()).toHaveAttribute("aria-controls", "mobile-menu");
    expect(document.getElementById("mobile-menu")).toBeNull();
    await userEvent.click(menuButton());
    expect(menuButton()).toHaveAttribute("aria-expanded", "true");
    expect(document.getElementById("mobile-menu")).toBeInTheDocument();
  });

  it("closes the menu on Escape", async () => {
    render(<Nav name="Jane Doe" />);
    await userEvent.click(menuButton());
    await userEvent.keyboard("{Escape}");
    expect(menuButton()).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the menu when a link is tapped", async () => {
    render(<Nav name="Jane Doe" />);
    await userEvent.click(menuButton());
    const panel = document.getElementById("mobile-menu")!;
    await userEvent.click(within(panel).getByRole("link", { name: "Projects" }));
    expect(menuButton()).toHaveAttribute("aria-expanded", "false");
  });

  it("marks the bar as scrolled after scrolling", () => {
    render(<Nav name="Jane Doe" />);
    const header = screen.getByRole("banner");
    expect(header).toHaveAttribute("data-scrolled", "false");
    Object.defineProperty(window, "scrollY", { value: 50, configurable: true });
    fireEvent.scroll(window);
    expect(header).toHaveAttribute("data-scrolled", "true");
  });
});
