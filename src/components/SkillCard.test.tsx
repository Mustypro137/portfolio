import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SkillCard } from "./SkillCard";

const group = {
  group: "Frontend",
  items: [
    { name: "React", strong: true, note: "A UI library." },
    { name: "CSS" },
  ],
};

describe("SkillCard", () => {
  it("shows a hint first, then the note of the skill that is clicked", async () => {
    render(<SkillCard group={group} />);
    expect(screen.getByText(/quick note/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "React" }));
    expect(screen.getByText(/A UI library\./)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "React" })).toHaveAttribute("aria-pressed", "true");
  });

  it("shows a note on keyboard focus", async () => {
    render(<SkillCard group={group} />);
    await userEvent.tab();
    expect(screen.getByRole("button", { name: "React" })).toHaveFocus();
    expect(screen.getByText(/A UI library\./)).toBeInTheDocument();
  });

  it("renders skills without a note as plain, non-interactive chips", () => {
    render(<SkillCard group={group} />);
    expect(screen.queryByRole("button", { name: "CSS" })).toBeNull();
    expect(screen.getByText("CSS")).toBeInTheDocument();
  });

  it("omits the note area when no skill has a note", () => {
    render(<SkillCard group={{ group: "Tools", items: [{ name: "Git" }] }} />);
    expect(screen.queryByText(/quick note/i)).toBeNull();
  });
});
