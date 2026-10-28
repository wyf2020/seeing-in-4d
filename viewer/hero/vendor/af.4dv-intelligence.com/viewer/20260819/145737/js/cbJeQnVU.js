const g = e => {
  let n = !1;
  return () => {
    !n && (e(), n = !0);
  };
};
export { g as r };
