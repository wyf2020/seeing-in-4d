const g = (o, n) => o > n[1] ? "poor" : o > n[0] ? "needs-improvement" : "good",
  p = (o, n, r, u) => {
    let c, t;
    return i => {
      n.value >= 0 && (i || u) && (t = n.value - (c ?? 0), (t || c === void 0) && (c = n.value, n.delta = t, n.rating = g(n.value, r), o(n)));
    };
  };
export { p as b };
