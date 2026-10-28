import { g as h } from "./B26jnSCd.js";
const l = 10;
let p = 0;
const b = () => h() - p;
class u {
  constructor() {
    u.prototype.__init.call(this), u.prototype.__init2.call(this);
  }
  __init() {
    this._longestInteractionList = [];
  }
  __init2() {
    this._longestInteractionMap = new Map();
  }
  _resetInteractions() {
    p = h(), this._longestInteractionList.length = 0, this._longestInteractionMap.clear();
  }
  _estimateP98LongestInteraction() {
    const t = Math.min(this._longestInteractionList.length - 1, Math.floor(b() / 50));
    return this._longestInteractionList[t];
  }
  _processEntry(t) {
    var x, i;
    if ((x = this._onBeforeProcessingEntry) == null || x.call(this, t), !(t.interactionId || t.entryType === "first-input")) return;
    const r = this._longestInteractionList.at(-1);
    let n = this._longestInteractionMap.get(t.interactionId);
    if (n || this._longestInteractionList.length < l || t.duration > r._latency) {
      if (n ? t.duration > n._latency ? (n.entries = [t], n._latency = t.duration) : t.duration === n._latency && t.startTime === n.entries[0].startTime && n.entries.push(t) : (n = {
        id: t.interactionId,
        entries: [t],
        _latency: t.duration
      }, this._longestInteractionMap.set(n.id, n), this._longestInteractionList.push(n)), this._longestInteractionList.sort((o, e) => e._latency - o._latency), this._longestInteractionList.length > l) {
        const o = this._longestInteractionList.splice(l);
        for (const e of o) this._longestInteractionMap.delete(e.id);
      }
      (i = this._onAfterProcessingINPCandidate) == null || i.call(this, n);
    }
  }
}
export { u as I };
