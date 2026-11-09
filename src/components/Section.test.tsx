import { act, render, screen } from "@testing-library/react";
import { Section } from "./Section";

type Callback = (entries: { isIntersecting: boolean }[]) => void;

class StubObserver {
  static last: StubObserver;
  callback: Callback;
  observe = vi.fn();
  disconnect = vi.fn();
  constructor(cb: Callback) {
    this.callback = cb;
    StubObserver.last = this;
  }
  trigger(isIntersecting: boolean) {
    this.callback([{ isIntersecting }]);
  }
}

function renderSection() {
  const result = render(
    <Section id="about" label="01. about" title="About">
      <p>Body</p>
    </Section>,
  );
  return result.container.querySelector("section#about")!;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("Section", () => {
  it("renders id, label and heading", () => {
    const section = renderSection();
    expect(section).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "About" })).toBeInTheDocument();
    expect(screen.getByText("01. about")).toBeInTheDocument();
  });

  it("adds scroll margin for the sticky nav", () => {
    expect(renderSection()).toHaveClass("scroll-mt-24");
  });

  it("keeps content visible without IntersectionObserver", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    expect(renderSection()).not.toHaveClass("reveal-pending");
  });

  it("does not hide a section already on screen", () => {
    vi.stubGlobal("IntersectionObserver", StubObserver);
    expect(renderSection()).not.toHaveClass("reveal-pending");
  });

  it("in stagger mode leaves the section visible and reveals only the heading block", () => {
    vi.stubGlobal("IntersectionObserver", StubObserver);
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ top: 2000 } as DOMRect);
    const { container } = render(
      <Section id="about" label="01. about" title="About" stagger>
        <p>Body</p>
      </Section>,
    );
    expect(container.querySelector("section#about")).not.toHaveClass("reveal-pending");
    expect(screen.getByRole("heading", { level: 2, name: "About" }).parentElement).toHaveClass("reveal-pending");
  });

  it("hides until intersecting, then reveals and stops observing", () => {
    vi.stubGlobal("IntersectionObserver", StubObserver);
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ top: 2000 } as DOMRect);
    const section = renderSection();
    expect(section).toHaveClass("reveal-pending");
    act(() => StubObserver.last.trigger(true));
    expect(section).not.toHaveClass("reveal-pending");
    expect(StubObserver.last.disconnect).toHaveBeenCalled();
  });
});
