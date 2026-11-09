import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "./ThemeToggle";

const html = document.documentElement;

afterEach(() => {
  html.classList.remove("dark");
  localStorage.clear();
});

describe("ThemeToggle", () => {
  it("switches from light to dark and remembers the choice", async () => {
    render(<ThemeToggle />);
    await userEvent.click(screen.getByRole("button", { name: "Switch to dark theme" }));
    expect(html).toHaveClass("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(await screen.findByRole("button", { name: "Switch to light theme" })).toBeInTheDocument();
  });

  it("switches from dark to light and remembers the choice", async () => {
    html.classList.add("dark");
    render(<ThemeToggle />);
    await userEvent.click(screen.getByRole("button", { name: "Switch to light theme" }));
    expect(html).not.toHaveClass("dark");
    expect(localStorage.getItem("theme")).toBe("light");
  });
});
