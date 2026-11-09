import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BackToTop } from "./BackToTop";

const smoothScrollTo = vi.hoisted(() => vi.fn());
vi.mock("@/lib/smoothScroll", () => ({ smoothScrollTo }));

afterEach(() => {
  vi.restoreAllMocks();
  Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
});

function scrollTo(y: number) {
  Object.defineProperty(window, "scrollY", { value: y, configurable: true });
  act(() => {
    window.dispatchEvent(new Event("scroll"));
  });
}

// The scroll handler is rAF-throttled; run frames synchronously in tests.
beforeEach(() => {
  vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
    cb(0);
    return 1;
  });
});
afterAll(() => vi.unstubAllGlobals());

describe("BackToTop", () => {
  it("is hidden at the top and appears after scrolling down", () => {
    render(<BackToTop />);
    const button = screen.getByRole("button", { name: "Back to top", hidden: true });
    expect(button).toHaveAttribute("data-visible", "false");
    scrollTo(1200);
    expect(button).toHaveAttribute("data-visible", "true");
  });

  it("glides to the top and moves focus to the site name link", async () => {
    smoothScrollTo.mockClear();
    document.body.insertAdjacentHTML("afterbegin", '<header><a href="#">Jane</a></header>');
    render(<BackToTop />);
    scrollTo(1200);
    await userEvent.click(screen.getByRole("button", { name: "Back to top" }));
    expect(smoothScrollTo).toHaveBeenCalledOnce();
    expect((smoothScrollTo.mock.calls[0][0] as () => number)()).toBe(0);
    expect(document.querySelector("header a")).toHaveFocus();
    document.querySelector("header")?.remove();
  });
});
