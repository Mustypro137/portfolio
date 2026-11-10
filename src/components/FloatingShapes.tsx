import type { CSSProperties } from "react";

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

/**
 * Decorative 3D-style objects built from CSS only (no WebGL). Purely visual, so
 * hidden from assistive tech. Each `.shape` is offset by `--px/--py` set on an
 * ancestor (see usePointerParallax); `--depth` controls how far it travels.
 *
 * Rendered in two layers around the Hero figure: "back" objects sit behind the
 * person, "front" objects pass in front of them, which is what gives the depth.
 */
export function FloatingShapes({ layer }: { layer: "back" | "front" }) {
  if (layer === "back") {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1]">
        {/* Spinning ring (md and up) */}
        <div className="shape max-md:hidden" style={v({ bottom: "20%", left: "4%", "--depth": 14, "--enter": "940ms" })}>
          <div className="shape-float cube-scene" style={v({ "--float-dur": "8s", "--float-delay": "-4s" })}>
            <div className="ring3d" style={v({ "--s": "4.5rem" })} />
          </div>
        </div>

        {/* Glass diamond */}
        <div className="shape" style={v({ top: "8%", right: "3%", "--depth": -30, "--enter": "1060ms" })}>
          <div className="shape-float" style={v({ "--float-dur": "6s", "--float-delay": "-1s" })}>
            <div className="diamond" style={v({ "--s": "2.5rem" })} />
          </div>
        </div>

        {/* Small distant orb, kept clear of the headline */}
        <div className="shape max-md:hidden" style={v({ top: "24%", right: "13%", "--depth": 8, "--enter": "1180ms" })}>
          <div className="shape-float" style={v({ "--float-dur": "10s", "--float-delay": "-6s" })}>
            <div className="orb" style={v({ "--s": "1.25rem" })} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[4]">
      {/* Glass cube, drifting across the shoulder */}
      <div className="shape" style={v({ top: "60%", left: "9%", "--depth": 36, "--enter": "700ms" })}>
        <div className="shape-float cube-scene" style={v({ "--float-dur": "7s" })}>
          <div className="cube" style={v({ "--s": "3.5rem" })}>
            <i className="cube-face cube-f1" />
            <i className="cube-face cube-f2" />
            <i className="cube-face cube-f3" />
            <i className="cube-face cube-f4" />
            <i className="cube-face cube-f5" />
            <i className="cube-face cube-f6" />
          </div>
        </div>
      </div>

      {/* Glossy orb near the chest */}
      <div className="shape" style={v({ top: "50%", right: "0%", "--depth": -26, "--enter": "820ms" })}>
        <div className="shape-float" style={v({ "--float-dur": "9s", "--float-delay": "-2s" })}>
          <div className="orb" style={v({ "--s": "2.75rem" })} />
        </div>
      </div>
    </div>
  );
}
