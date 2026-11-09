import { cancelSmoothScroll, smoothScrollTo } from "./smoothScroll";

let now = 0;
let frames: FrameRequestCallback[] = [];
let scrollTo: ReturnType<typeof vi.fn>;

/** Runs queued animation frames at the given times (ms since start). */
function runFrames(times: number[]) {
  for (const t of times) {
    now = t;
    frames.shift()?.(t);
  }
}

beforeEach(() => {
  now = 0;
  frames = [];
  vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => frames.push(cb));
  vi.stubGlobal("cancelAnimationFrame", () => {
    frames = [];
  });
  vi.spyOn(performance, "now").mockImplementation(() => now);
  scrollTo = vi.fn();
  vi.stubGlobal("scrollTo", scrollTo);
  Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
});

afterEach(() => {
  cancelSmoothScroll();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("smoothScrollTo", () => {
  it("eases from the current position to the target and lands exactly on it", () => {
    smoothScrollTo(() => 1000);
    runFrames([100, 400, 700, 1500]); // 1000px takes ~700ms; the last frame is past the end
    const tops = scrollTo.mock.calls.map(([arg]) => arg.top as number);
    expect(tops[0]).toBeGreaterThan(0);
    expect(tops[0]).toBeLessThan(150); // gentle start
    expect(tops).toEqual([...tops].sort((a, b) => a - b)); // never moves backwards
    expect(tops[tops.length - 1]).toBe(1000);
    expect(scrollTo.mock.calls.every(([arg]) => arg.behavior === "instant")).toBe(true);
  });

  it("re-reads the target every frame, so a layout shift mid-scroll still lands correctly", () => {
    let target = 1000;
    smoothScrollTo(() => target);
    runFrames([100]);
    target = 1400; // e.g. a menu closed and the section moved
    runFrames([2000]);
    expect(scrollTo.mock.calls.at(-1)?.[0].top).toBe(1400);
  });

  it("stops as soon as the user scrolls", () => {
    smoothScrollTo(() => 1000);
    runFrames([100]);
    const before = scrollTo.mock.calls.length;
    window.dispatchEvent(new Event("wheel"));
    runFrames([300, 600]);
    expect(scrollTo.mock.calls.length).toBe(before);
  });

  it("a new scroll replaces the one in progress", () => {
    smoothScrollTo(() => 1000);
    runFrames([100]);
    smoothScrollTo(() => 0);
    now = 0;
    runFrames([5000]);
    expect(scrollTo.mock.calls.at(-1)?.[0].top).toBe(0);
  });

  it("jumps instantly, without animating, under reduced motion", () => {
    vi.stubGlobal("matchMedia", (q: string) => ({ matches: q.includes("reduce") }));
    smoothScrollTo(() => 800);
    expect(scrollTo).toHaveBeenCalledOnce();
    expect(scrollTo).toHaveBeenCalledWith({ top: 800, behavior: "instant" });
    expect(frames).toHaveLength(0);
  });
});
