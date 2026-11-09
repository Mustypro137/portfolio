import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";
import { fullSite, minimalSite } from "@/test/fixtures";

describe("Hero", () => {
  it("shows name as h1, title and pitch", () => {
    render(<Hero {...fullSite} />);
    expect(screen.getByRole("heading", { level: 1, name: fullSite.name })).toBeInTheDocument();
    expect(screen.getByText(fullSite.title)).toBeInTheDocument();
    expect(screen.getByText(fullSite.pitch)).toBeInTheDocument();
  });

  it("shows the photo with alt text when provided", () => {
    render(<Hero {...fullSite} />);
    expect(screen.getByRole("img", { name: `Photo of ${fullSite.name}` })).toBeInTheDocument();
  });

  it("shows initials when no photo", () => {
    render(<Hero {...minimalSite} />);
    expect(screen.getByText("JD")).toBeInTheDocument();
    expect(screen.queryByRole("img")).toBeNull();
  });

  it("shows Open to work badge only when openToWork", () => {
    const { unmount } = render(<Hero {...fullSite} />);
    expect(screen.getByText("Open to work")).toBeInTheDocument();
    unmount();
    render(<Hero {...minimalSite} />);
    expect(screen.queryByText("Open to work")).toBeNull();
  });

  it("links View projects to #projects and Contact me to #contact", () => {
    render(<Hero {...fullSite} />);
    expect(screen.getByRole("link", { name: "View projects" })).toHaveAttribute("href", "#projects");
    expect(screen.getByRole("link", { name: "Contact me" })).toHaveAttribute("href", "#contact");
  });

  it("shows Resume only when resume is set, opening in a new tab", () => {
    const { unmount } = render(<Hero {...fullSite} />);
    const resume = screen.getByRole("link", { name: "Resume" });
    expect(resume).toHaveAttribute("href", fullSite.resume);
    expect(resume).toHaveAttribute("target", "_blank");
    expect(resume).toHaveAttribute("rel", "noopener noreferrer");
    unmount();
    render(<Hero {...minimalSite} />);
    expect(screen.queryByRole("link", { name: "Resume" })).toBeNull();
  });
});
