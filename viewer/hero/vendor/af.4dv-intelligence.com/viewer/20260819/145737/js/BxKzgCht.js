class f {
  constructor() {
    f.prototype.__init.call(this), f.prototype.__init2.call(this);
  }
  __init() {
    this._sessionValue = 0;
  }
  __init2() {
    this._sessionEntries = [];
  }
  _processEntry(t) {
    var u;
    if (t.hadRecentInput) return;
    const n = this._sessionEntries[0],
      i = this._sessionEntries[this._sessionEntries.length - 1];
    this._sessionValue && n && i && t.startTime - i.startTime < 1e3 && t.startTime - n.startTime < 5000 ? (this._sessionValue += t.value, this._sessionEntries.push(t)) : (this._sessionValue = t.value, this._sessionEntries = [t]), (u = this._onAfterProcessingUnexpectedShift) == null || u.call(this, t);
  }
}
export { f as L };
