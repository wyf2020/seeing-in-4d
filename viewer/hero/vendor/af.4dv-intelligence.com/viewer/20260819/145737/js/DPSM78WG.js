const f = new WeakMap();
function y(e, n) {
  try {
    return !f.get(e) && f.set(e, new n()), f.get(e);
  } catch {
    return new n();
  }
}
export { y as i };
