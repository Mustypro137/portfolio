import { render, screen } from "@testing-library/react";
import { Experience } from "./Experience";
import { fullSite, minimalSite } from "@/test/fixtures";

describe("Experience", () => {
  it("renders jobs in content order with role, company, dates and highlights", () => {
    render(<Experience experience={fullSite.experience} education={fullSite.education} />);
    const roles = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(roles.slice(0, 2)).toEqual(["Senior Engineer", "Junior Engineer"]);
    expect(screen.getByText("2023 — Present")).toBeInTheDocument();
    expect(screen.getByText("Shipped A")).toBeInTheDocument();
    expect(screen.getByText("Built C")).toBeInTheDocument();
  });

  it("links company when companyUrl is set, plain text otherwise", () => {
    render(<Experience experience={fullSite.experience} />);
    const acme = screen.getByRole("link", { name: "Acme" });
    expect(acme).toHaveAttribute("href", "https://acme.example");
    expect(acme).toHaveAttribute("target", "_blank");
    expect(screen.getByText("Globex").closest("a")).toBeNull();
  });

  it("hides location when absent", () => {
    render(<Experience experience={minimalSite.experience} />);
    expect(screen.queryByText("Remote")).toBeNull();
  });

  it("shows Education list only when education has entries", () => {
    const { unmount } = render(<Experience experience={fullSite.experience} education={fullSite.education} />);
    expect(screen.getByRole("heading", { name: "Education" })).toBeInTheDocument();
    expect(screen.getByText(/State University/)).toBeInTheDocument();
    unmount();
    render(<Experience experience={minimalSite.experience} education={minimalSite.education} />);
    expect(screen.queryByRole("heading", { name: "Education" })).toBeNull();
  });
});
