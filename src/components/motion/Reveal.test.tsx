import { act, render } from "@testing-library/react";
import { Reveal } from "./Reveal";

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
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("Reveal", () => {
  it("renders children with its variant and stagger delay", () => {
    const { container } = render(
      <Reveal variant="left" delay={160}>
        <p>Hello</p>
      </Reveal>,
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el).toHaveTextContent("Hello");
    expect(el).toHaveAttribute("data-reveal", "left");
    expect(el.style.getPropertyValue("--reveal-delay")).toBe("160ms");
  });

  it("never hides content when IntersectionObserver is missing", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    const { container } = render(<Reveal>Body</Reveal>);
    expect(container.firstElementChild).not.toHaveClass("reveal-pending");
  });

  it("hides below the fold, then plays the entrance once visible", () => {
    vi.stubGlobal("IntersectionObserver", StubObserver);
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ top: 2000 } as DOMRect);
    const { container } = render(<Reveal>Body</Reveal>);
    const el = container.firstElementChild as HTMLElement;
    expect(el).toHaveClass("reveal-pending");
    act(() => StubObserver.last.callback([{ isIntersecting: true }]));
    expect(el).not.toHaveClass("reveal-pending");
    expect(el).toHaveClass("reveal-in");
  });
});
