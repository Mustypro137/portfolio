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

  it("shows the custom message when set, a default otherwise", () => {
    const { unmount } = render(<Contact contact={fullSite.contact} />);
    expect(screen.getByText(fullSite.contact.message!)).toBeInTheDocument();
    unmount();
    render(<Contact contact={minimalSite.contact} />);
    expect(screen.getByText(/My inbox is open/)).toBeInTheDocument();
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

describe("Contact extras", () => {
  it("offers a copy button next to the email link, and no second mailto link", () => {
    render(<Contact contact={fullSite.contact} />);
    expect(screen.getByRole("button", { name: "Copy email address" })).toBeInTheDocument();
    expect(screen.getAllByRole("link").filter((l) => l.getAttribute("href")?.startsWith("mailto:"))).toHaveLength(1);
  });

  it("keeps the heading readable as one phrase when its words are split for animation", () => {
    render(<Contact contact={fullSite.contact} />);
    expect(screen.getByRole("heading", { level: 2, name: "Get in touch" })).toBeInTheDocument();
  });
});

describe("Footer", () => {
  it("lists the same social links as Contact, plus a back-to-top button", () => {
    render(<Footer name="Jane Doe" contact={fullSite.contact} />);
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/jane");
    expect(screen.getByRole("link", { name: "LinkedIn" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Back to top", hidden: true })).toBeInTheDocument();
  });

  it("shows © current year and name", () => {
    render(<Footer name="Jane Doe" contact={fullSite.contact} />);
    expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()} Jane Doe`))).toBeInTheDocument();
  });
});
