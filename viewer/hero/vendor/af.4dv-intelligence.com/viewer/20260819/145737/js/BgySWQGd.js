import { W as s } from "./DF16-VLz.js";
import { a as g, r as y } from "./DN7QKg6n.js";
import { r as v } from "./cbJeQnVU.js";
const I = n => {
  var r;
  const e = s.requestIdleCallback || s.setTimeout;
  ((r = s.document) == null ? void 0 : r["visibilityState"]) === "hidden" ? n() : (n = v(n), g("visibilitychange", n, {
    once: !0,
    capture: !0
  }), g("pagehide", n, {
    once: !0,
    capture: !0
  }), e(() => {
    n(), y("visibilitychange", n, {
      capture: !0
    }), y("pagehide", n, {
      capture: !0
    });
  }));
};
export { I as w };
