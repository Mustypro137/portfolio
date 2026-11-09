import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CopyEmailButton } from "./CopyEmailButton";

afterEach(() => {
  vi.restoreAllMocks();
});

function stubClipboard(writeText: () => Promise<void>) {
  const spy = vi.fn(writeText);
  Object.defineProperty(navigator, "clipboard", { value: { writeText: spy }, configurable: true });
  return spy;
}

describe("CopyEmailButton", () => {
  it("copies the address and confirms visibly and to screen readers", async () => {
    const writeText = stubClipboard(() => Promise.resolve());
    render(<CopyEmailButton email="jane@example.com" />);
    expect(screen.getByText("Copy email")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Copy email address" }));

    expect(writeText).toHaveBeenCalledWith("jane@example.com");
    await waitFor(() => expect(screen.getByText("Copied")).toBeInTheDocument());
    expect(screen.getByRole("status")).toHaveTextContent("Email address copied");
  });

  it("says so when copying is not possible", async () => {
    stubClipboard(() => Promise.reject(new Error("denied")));
    render(<CopyEmailButton email="jane@example.com" />);
    await userEvent.click(screen.getByRole("button", { name: "Copy email address" }));
    await waitFor(() => expect(screen.getByText("Copy failed")).toBeInTheDocument());
    expect(screen.getByRole("status")).toHaveTextContent("Use the email link instead");
  });
});
