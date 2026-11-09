import { render, screen } from "@testing-library/react";
import { Projects } from "./Projects";
import { fullSite, minimalSite } from "@/test/fixtures";

const profile = "https://github.com/jane";

describe("Projects", () => {
  it("renders each project's name, description and tech tags", () => {
    render(<Projects projects={fullSite.projects} githubProfile={profile} />);
    for (const p of fullSite.projects) {
      expect(screen.getByRole("heading", { name: p.name })).toBeInTheDocument();
      expect(screen.getByText(p.description)).toBeInTheDocument();
    }
    expect(screen.getByText("Go")).toBeInTheDocument();
  });

  it("shows screenshot with alt only when image is set", () => {
    const { unmount } = render(<Projects projects={fullSite.projects} githubProfile={profile} />);
    expect(screen.getByRole("img", { name: "Screenshot of Alpha" })).toBeInTheDocument();
    unmount();
    render(<Projects projects={minimalSite.projects} githubProfile={profile} />);
    expect(screen.queryByRole("img")).toBeNull();
  });

  it("shows GitHub link always and Live demo only when demo is set", () => {
    render(<Projects projects={fullSite.projects} githubProfile={profile} />);
    const repo = screen.getByRole("link", { name: "GitHub repo for Alpha" });
    expect(repo).toHaveAttribute("href", "https://github.com/jane/alpha");
    expect(repo).toHaveAttribute("target", "_blank");
    expect(repo).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByRole("link", { name: "Live demo of Alpha" })).toHaveAttribute("href", "https://alpha.example");
    expect(screen.getByRole("link", { name: "GitHub repo for Beta" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Live demo of Beta" })).toBeNull();
  });

  it("links See more on GitHub to the profile", () => {
    render(<Projects projects={fullSite.projects} githubProfile={profile} />);
    expect(screen.getByRole("link", { name: /See more on GitHub/ })).toHaveAttribute("href", profile);
  });
});
