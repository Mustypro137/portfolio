import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home page", () => {
  it("renders main#main with sections in spec order", () => {
    const { container } = render(<Home />);
    expect(container.querySelector("main#main")).toBeInTheDocument();
    const ids = [...container.querySelectorAll("main section[id]")].map((s) => s.id);
    expect(ids).toEqual(["about", "experience", "skills", "why-me", "projects", "contact"]);
  });

  it("has exactly one h1", () => {
    render(<Home />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });
});
