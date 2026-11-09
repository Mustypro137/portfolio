import { render, screen } from "@testing-library/react";
import { WhyMe } from "./WhyMe";
import { fullSite } from "@/test/fixtures";

describe("WhyMe", () => {
  it("renders a card per trait with title and example", () => {
    const { container } = render(<WhyMe traits={fullSite.traits} />);
    expect(container.querySelector("section#why-me")).toBeInTheDocument();
    for (const t of fullSite.traits) {
      expect(screen.getByRole("heading", { name: t.title })).toBeInTheDocument();
      expect(screen.getByText(t.example)).toBeInTheDocument();
    }
  });
});
