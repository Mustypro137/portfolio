import { render, screen } from "@testing-library/react";
import { About } from "./About";
import { fullSite } from "@/test/fixtures";

describe("About", () => {
  it("renders each bio paragraph, location and work preference", () => {
    const { container } = render(<About about={fullSite.about} />);
    expect(container.querySelector("section#about")).toBeInTheDocument();
    for (const p of fullSite.about.bio) expect(screen.getByText(p)).toBeInTheDocument();
    expect(screen.getByText(fullSite.about.location)).toBeInTheDocument();
    expect(screen.getByText(fullSite.about.workPreference)).toBeInTheDocument();
  });
});
