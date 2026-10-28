import { W as s } from "./DF16-VLz.js";
import { g as b } from "./esRZB774.js";
import { a as l, r as m } from "./DN7QKg6n.js";
let f = -1;
const h = new Set(),
  w = () => {
    var t, e;
    return ((t = s.document) == null ? void 0 : t["visibilityState"]) === "hidden" && !((e = s.document) != null && e["prerendering"]) ? 0 : 1 / 0;
  };
const a = t => {
    if (T(t) && f > -1) {
      if (t.type === "visibilitychange" || t.type === "pagehide") for (const e of h) e();
      !isFinite(f) && (f = t.type === "visibilitychange" ? t.timeStamp : 0, m("prerenderingchange", a, !0));
    }
  },
  I = () => {
    var t;
    if (s.document && f < 0) {
      const e = b();
      f = (s.document.prerendering || (t = globalThis.performance.getEntriesByType("visibility-state").filter(r => r.name === "hidden" && r.startTime > e)[0]) == null ? void 0 : t.startTime) ?? w(), l("visibilitychange", a, !0), l("pagehide", a, !0), l("prerenderingchange", a, !0);
    }
    return {
      get firstHiddenTime() {
        return f;
      },
      onHidden(e) {
        h.add(e);
      }
    };
  };
function T(t) {
  var e;
  return t.type === "pagehide" || ((e = s.document) == null ? void 0 : e["visibilityState"]) === "hidden";
}
export { I as g };
