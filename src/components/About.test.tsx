import { render, screen } from "@testing-library/react";
import { About } from "./About";
import { fullSite, minimalSite } from "@/test/fixtures";

describe("About", () => {
  it("renders each bio paragraph, location and work preference", () => {
    const { container } = render(<About about={fullSite.about} />);
    expect(container.querySelector("section#about")).toBeInTheDocument();
    for (const p of fullSite.about.bio) expect(screen.getByText(p)).toBeInTheDocument();
    expect(screen.getByText(fullSite.about.location)).toBeInTheDocument();
    expect(screen.getByText(fullSite.about.workPreference)).toBeInTheDocument();
  });

  it("renders the story with its heading, paragraphs and quote when set", () => {
    render(<About about={fullSite.about} />);
    const story = fullSite.about.story!;
    expect(screen.getByRole("heading", { level: 3, name: story.title })).toBeInTheDocument();
    for (const p of story.paragraphs) expect(screen.getByText(p)).toBeInTheDocument();
    expect(screen.getByText(story.quote!).closest("blockquote")).toBeInTheDocument();
  });

  it("shows a decorative portrait only when a photo is given", () => {
    const { container, unmount } = render(<About about={fullSite.about} photo="/me.png" />);
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("alt", "");
    unmount();
    render(<About about={fullSite.about} />);
    expect(document.querySelector("img")).toBeNull();
  });

  it("hides the story when not set", () => {
    render(<About about={minimalSite.about} />);
    expect(screen.queryByRole("heading", { level: 3 })).toBeNull();
    expect(document.querySelector("blockquote")).toBeNull();
  });
});
