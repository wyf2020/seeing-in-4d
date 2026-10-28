import { o as y } from "./D1UKPKVr.js";
let g = 0,
  s = 1 / 0,
  f = 0;
const h = o => {
  o.forEach(n => {
    n.interactionId && (s = Math.min(s, n.interactionId), f = Math.max(f, n.interactionId), g = f ? (f - s) / 7 + 1 : 0);
  });
};
let d;
const w = () => d ? g : performance.interactionCount || 0,
  m = () => {
    "interactionCount" in performance || d || (d = y("event", h, {
      type: "event",
      buffered: !0,
      durationThreshold: 0
    }));
  };
export { w as g, m as i };
