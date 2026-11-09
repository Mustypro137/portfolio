import { render, screen } from "@testing-library/react";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { fullSite, minimalSite } from "@/test/fixtures";

describe("Contact", () => {
  it("renders email as mailto link without new tab", () => {
    const { container } = render(<Contact contact={fullSite.contact} />);
    expect(container.querySelector("section#contact")).toBeInTheDocument();
    const email = screen.getByRole("link", { name: "jane@example.com" });
    expect(email).toHaveAttribute("href", "mailto:jane@example.com");
    expect(email).not.toHaveAttribute("target");
  });

  it("renders GitHub always, LinkedIn and other links only when set", () => {
    const { unmount } = render(<Contact contact={fullSite.contact} />);
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/jane");
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", "https://linkedin.com/in/jane");
    expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute("target", "_blank");
    unmount();
    render(<Contact contact={minimalSite.contact} />);
    expect(screen.getByRole("link", { name: "GitHub" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "LinkedIn" })).toBeNull();
  });
});

describe("Footer", () => {
  it("shows © current year and name", () => {
    render(<Footer name="Jane Doe" contact={fullSite.contact} />);
    expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()} Jane Doe`))).toBeInTheDocument();
  });
});
