import { render } from "@testing-library/react";
import { ScrollRail } from "./ScrollRail";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function renderRail() {
  const { container } = render(
    <ScrollRail as="ol">
      <li data-node data-testid="early" data-top="100" />
      <li data-node data-testid="late" data-top="800" />
    </ScrollRail>,
  );
  return container.firstElementChild as HTMLElement;
}

describe("ScrollRail", () => {
  it("fills the line and lights only the nodes the reading line has passed", () => {
    // Reading line sits at 60% of the viewport (jsdom height 768 => ~461px).
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
      const top = this.dataset.top ? Number(this.dataset.top) : 0;
      return { top, height: this.dataset.top ? 0 : 1000 } as DOMRect;
    });
    const rail = renderRail();
    expect(Number(rail.style.getPropertyValue("--progress"))).toBeCloseTo(0.4608, 3);
    expect(rail.querySelector('[data-testid="early"]')).toHaveAttribute("data-lit", "true");
    expect(rail.querySelector('[data-testid="late"]')).toHaveAttribute("data-lit", "false");
  });

  it("shows a complete rail when reduced motion is requested", () => {
    vi.stubGlobal("matchMedia", (query: string) => ({ matches: query.includes("reduce") }));
    const rail = renderRail();
    expect(rail.style.getPropertyValue("--progress")).toBe("1");
    expect(rail.querySelector('[data-testid="late"]')).toHaveAttribute("data-lit", "true");
  });

  it("renders a decorative line that assistive tech ignores", () => {
    const rail = renderRail();
    expect(rail.querySelector(".rail-line")).toHaveAttribute("aria-hidden", "true");
  });
});
