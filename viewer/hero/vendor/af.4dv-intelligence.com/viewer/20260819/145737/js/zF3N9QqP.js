import { V as _, W as l } from "./DF16-VLz.js";
import { g as b } from "./rY-vbMDO.js";
import { g } from "./esRZB774.js";
const w = (f, o = -1) => {
  var t, x;
  const n = _();
  let r = "navigate";
  return n && ((t = l.document) != null && t["prerendering"] || g() > 0 ? r = "prerender" : (x = l.document) != null && x["wasDiscarded"] ? r = "restore" : n.type && (r = n.type.replace(/_/g, "-"))), {
    name: f,
    value: o,
    rating: "good",
    delta: 0,
    entries: [],
    id: b(),
    navigationType: r
  };
};
export { w as i };
