const p = (c, e, n = {}) => {
  try {
    if (PerformanceObserver.supportedEntryTypes.includes(c)) {
      const o = new PerformanceObserver(x => {
        Promise.resolve().then(() => {
          e(x.getEntries());
        });
      });
      return o.observe({
        type: c,
        buffered: !0,
        ...n
      }), o;
    }
  } catch {}
};
export { p as o };
