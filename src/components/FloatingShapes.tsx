import type { CSSProperties } from "react";

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

/**
 * Decorative 3D-style objects built from CSS only (no WebGL). Purely visual, so
 * hidden from assistive tech. Each `.shape` is offset by `--px/--py` set on an
 * ancestor (see usePointerParallax); `--depth` controls how far it travels.
 */
export function FloatingShapes() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {/* Glass cube */}
      <div className="shape" style={v({ top: "4%", left: "6%", "--depth": 26, "--enter": "700ms" })}>
        <div className="shape-float cube-scene" style={v({ "--float-dur": "7s" })}>
          <div className="cube" style={v({ "--s": "3.25rem" })}>
            <i className="cube-face cube-f1" />
            <i className="cube-face cube-f2" />
            <i className="cube-face cube-f3" />
            <i className="cube-face cube-f4" />
            <i className="cube-face cube-f5" />
            <i className="cube-face cube-f6" />
          </div>
        </div>
      </div>

      {/* Orb */}
      <div className="shape" style={v({ top: "12%", right: "4%", "--depth": -18, "--enter": "820ms" })}>
        <div className="shape-float" style={v({ "--float-dur": "9s", "--float-delay": "-2s" })}>
          <div className="orb" style={v({ "--s": "2.75rem" })} />
        </div>
      </div>

      {/* Spinning ring (md and up) */}
      <div
        className="shape max-md:hidden"
        style={v({ bottom: "12%", left: "2%", "--depth": 14, "--enter": "940ms" })}
      >
        <div className="shape-float cube-scene" style={v({ "--float-dur": "8s", "--float-delay": "-4s" })}>
          <div className="ring3d" style={v({ "--s": "4.5rem" })} />
        </div>
      </div>

      {/* Glass diamond (md and up) */}
      <div
        className="shape max-md:hidden"
        style={v({ bottom: "6%", right: "10%", "--depth": -30, "--enter": "1060ms" })}
      >
        <div className="shape-float" style={v({ "--float-dur": "6s", "--float-delay": "-1s" })}>
          <div className="diamond" style={v({ "--s": "2.5rem" })} />
        </div>
      </div>
    </div>
  );
}
