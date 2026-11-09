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

  it("hides the GitHub link when a project has no public repo", () => {
    const privateRepo = { name: "Delta", description: "Private repo.", tech: ["CSS"], demo: "https://delta.example" };
    render(<Projects projects={[privateRepo]} githubProfile={profile} />);
    expect(screen.queryByRole("link", { name: "GitHub repo for Delta" })).toBeNull();
    expect(screen.queryByText("GitHub ↗")).toBeNull();
    expect(screen.getByRole("link", { name: "Live demo of Delta" })).toBeInTheDocument();
  });

  it("shows a labelled placeholder, hidden from assistive tech, when there is no screenshot", () => {
    const { container } = render(<Projects projects={minimalSite.projects} githubProfile={profile} />);
    const placeholder = container.querySelector(".ph");
    expect(placeholder).toBeInTheDocument();
    expect(placeholder).toHaveAttribute("aria-hidden", "true");
    expect(placeholder).toHaveTextContent(/Placeholder/);
    expect(screen.queryByRole("img")).toBeNull();
  });

  it("shows the featured project first, with its own label and a single heading", () => {
    const projects = [
      { name: "Plain", description: "Plain one.", tech: ["CSS"], demo: "https://plain.example" },
      { name: "Star", description: "The star.", tech: ["Next.js"], demo: "https://star.example", featured: true },
    ];
    render(<Projects projects={projects} githubProfile={profile} />);
    const names = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(names).toEqual(["Star", "Plain"]);
    expect(screen.getByText("Featured project")).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { name: "Star" })).toHaveLength(1);
  });

  it("makes each card clickable through a hidden, unfocusable link, leaving one real demo link", () => {
    const projects = [{ name: "Solo", description: "Only.", tech: ["CSS"], demo: "https://solo.example" }];
    const { container } = render(<Projects projects={projects} githubProfile={profile} />);
    const cover = container.querySelector('a[aria-hidden="true"]');
    expect(cover).toHaveAttribute("href", "https://solo.example");
    expect(cover).toHaveAttribute("tabindex", "-1");
    expect(screen.getAllByRole("link", { name: /Live demo of Solo/ })).toHaveLength(1);
  });

  it("links See more on GitHub to the profile", () => {
    render(<Projects projects={fullSite.projects} githubProfile={profile} />);
    expect(screen.getByRole("link", { name: /See more on GitHub/ })).toHaveAttribute("href", profile);
  });
});
