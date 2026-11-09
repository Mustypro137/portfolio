import { fireEvent, render } from "@testing-library/react";
import { SmoothAnchors } from "./SmoothAnchors";

const smoothScrollTo = vi.hoisted(() => vi.fn());
vi.mock("@/lib/smoothScroll", () => ({ smoothScrollTo }));

function setup() {
  const view = render(
    <>
      <SmoothAnchors />
      <a href="#about">About</a>
      <a href="#">Top</a>
      <a href="#missing">Missing</a>
      <a href="#about" data-instant>
        Skip
      </a>
      <a href="#about" target="_blank" rel="noreferrer">
        New tab
      </a>
      <a href="https://example.com">External</a>
      <section id="about" style={{ scrollMarginTop: "96px" }} />
    </>,
  );
  const link = (name: string) => view.getByText(name);
  return { link, section: view.container.querySelector("#about") as HTMLElement };
}

beforeEach(() => {
  smoothScrollTo.mockClear();
  vi.spyOn(history, "pushState");
  window.history.replaceState(null, "", "/");
});
afterEach(() => vi.restoreAllMocks());

describe("SmoothAnchors", () => {
  it("takes over an in-page link: smooth scroll, URL update and focus on the section", () => {
    const { link, section } = setup();
    const notPrevented = fireEvent.click(link("About"));
    expect(notPrevented).toBe(false); // default jump was prevented
    expect(smoothScrollTo).toHaveBeenCalledOnce();
    expect(history.pushState).toHaveBeenCalledWith(null, "", "#about");
    expect(section).toHaveAttribute("tabindex", "-1");
    expect(section).toHaveFocus();
  });

  it("aims below the sticky header by honouring the section's scroll margin", () => {
    const { link, section } = setup();
    vi.spyOn(section, "getBoundingClientRect").mockReturnValue({ top: 500 } as DOMRect);
    Object.defineProperty(window, "scrollY", { value: 200, configurable: true });
    fireEvent.click(link("About"));
    const targetY = smoothScrollTo.mock.calls[0][0] as () => number;
    expect(targetY()).toBe(500 + 200 - 96);
  });

  it('scrolls to the top for href="#" and drops the hash from the URL', () => {
    const { link } = setup();
    window.history.replaceState(null, "", "/#about");
    fireEvent.click(link("Top"));
    const targetY = smoothScrollTo.mock.calls[0][0] as () => number;
    expect(targetY()).toBe(0);
    expect(history.pushState).toHaveBeenCalledWith(null, "", "/");
  });

  it("leaves everything else to the browser", () => {
    const { link } = setup();
    expect(fireEvent.click(link("Missing"))).toBe(true); // unknown anchor
    expect(fireEvent.click(link("Skip"))).toBe(true); // data-instant
    expect(fireEvent.click(link("New tab"))).toBe(true);
    expect(fireEvent.click(link("External"))).toBe(true);
    expect(fireEvent.click(link("About"), { ctrlKey: true })).toBe(true); // open-in-new-tab shortcut
    expect(fireEvent.click(link("About"), { button: 1 })).toBe(true); // middle click
    expect(smoothScrollTo).not.toHaveBeenCalled();
  });
});
