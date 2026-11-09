import { act, render, screen } from "@testing-library/react";
import { CountUp } from "./CountUp";

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

describe("CountUp", () => {
  it("always renders the final value, plus a screen-reader copy", () => {
    render(<CountUp value={40} suffix="+" />);
    expect(screen.getAllByText("40+")).toHaveLength(2);
    expect(screen.getByText("40+", { selector: ".sr-only" })).toBeInTheDocument();
  });

  it("starts from zero below the fold and counts up once visible", () => {
    vi.stubGlobal("IntersectionObserver", StubObserver);
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ top: 2000 } as DOMRect);
    let now = 0;
    const frames: FrameRequestCallback[] = [];
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => frames.push(cb));
    vi.spyOn(performance, "now").mockImplementation(() => now);

    const { container } = render(<CountUp value={100} />);
    const visual = container.querySelector('[aria-hidden="true"]')!;
    expect(visual.textContent).toBe("0");

    act(() => StubObserver.last.callback([{ isIntersecting: true }]));
    now = 1300; // past the 1200ms duration
    act(() => frames.shift()?.(now));
    expect(visual.textContent).toBe("100");
  });

  it("leaves the final value alone when reduced motion is requested", () => {
    vi.stubGlobal("IntersectionObserver", StubObserver);
    vi.stubGlobal("matchMedia", (q: string) => ({ matches: q.includes("reduce") }));
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ top: 2000 } as DOMRect);
    const { container } = render(<CountUp value={8} />);
    expect(container.querySelector('[aria-hidden="true"]')!.textContent).toBe("8");
  });
});
