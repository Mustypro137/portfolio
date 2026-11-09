import { render, screen } from "@testing-library/react";
import { Skills } from "./Skills";
import { fullSite } from "@/test/fixtures";

describe("Skills", () => {
  it("renders a heading per group and a chip per skill", () => {
    render(<Skills skills={fullSite.skills} />);
    expect(screen.getByRole("heading", { name: "Frontend" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Backend" })).toBeInTheDocument();
    for (const name of ["React", "CSS", "Node.js"]) expect(screen.getByText(name)).toBeInTheDocument();
  });

  it("highlights strong skills", () => {
    render(<Skills skills={fullSite.skills} />);
    expect(screen.getByText("React")).toHaveAttribute("data-strong", "true");
    expect(screen.getByText("CSS")).not.toHaveAttribute("data-strong");
  });
});
