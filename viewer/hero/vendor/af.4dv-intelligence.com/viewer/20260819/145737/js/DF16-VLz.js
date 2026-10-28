const x = typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__,
  g = globalThis,
  w = "10.53.1";
function J() {
  return ut(g), g;
}
function ut(t) {
  const e = t.__SENTRY__ = t.__SENTRY__ || {};
  return e.version = e.version || w, e[w] = e[w] || {};
}
function M(t, e, n = g) {
  const r = n.__SENTRY__ = n.__SENTRY__ || {},
    s = r[w] = r[w] || {};
  return s[t] || (s[t] = e());
}
const An = ["debug", "info", "warn", "error", "log", "assert", "trace"],
  Nn = "Sentry Logger ",
  st = {};
function $(t) {
  if (!("console" in g)) return t();
  const e = g.console,
    n = {},
    r = Object.keys(st);
  r.forEach(s => {
    const i = st[s];
    n[s] = e[s], e[s] = i;
  });
  try {
    return t();
  } finally {
    r.forEach(s => {
      e[s] = n[s];
    });
  }
}
function wn() {
  Dt().enabled = !0;
}
function On() {
  Dt().enabled = !1;
}
function Me() {
  return Dt().enabled;
}
function Rn(...t) {
  Ct("log", ...t);
}
function kn(...t) {
  Ct("warn", ...t);
}
function Cn(...t) {
  Ct("error", ...t);
}
function Ct(t, ...e) {
  x && Me() && $(() => {
    g.console[t](Nn + "[" + t + "]:", ...e);
  });
}
function Dt() {
  return x ? M("loggerSettings", () => ({
    enabled: !1
  })) : {
    enabled: !1
  };
}
const l = {
    enable: wn,
    disable: On,
    isEnabled: Me,
    log: Rn,
    warn: kn,
    error: Cn
  },
  Fe = 50,
  Dn = "?",
  Ht = /\(error: (.*)\)/,
  Wt = /captureMessage|captureException/;
function Pn(...t) {
  const e = t.sort((n, r) => n[0] - r[0]).map(n => n[1]);
  return (n, r = 0, s = 0) => {
    const i = [],
      o = n.split(`
`);
    for (let a = r; a < o.length; a++) {
      let c = o[a];
      c.length > 1024 && (c = c.slice(0, 1024));
      const u = Ht.test(c) ? c.replace(Ht, "$1") : c;
      if (!u.includes("Error: ")) {
        for (const d of e) {
          const p = d(u);
          if (p) {
            i.push(p);
            break;
          }
        }
        if (i.length >= Fe + s) break;
      }
    }
    return Ln(i.slice(s));
  };
}
function Zi(t) {
  return Array.isArray(t) ? Pn(...t) : t;
}
function Ln(t) {
  if (!t.length) return [];
  const e = Array.from(t);
  return /sentryWrapped/.test(et(e).function || "") && e.pop(), e.reverse(), Wt.test(et(e).function || "") && (e.pop(), Wt.test(et(e).function || "") && e.pop()), e.slice(0, Fe).map(n => ({
    ...n,
    filename: n.filename || et(e).filename,
    function: n.function || Dn
  }));
}
function et(t) {
  return t[t.length - 1] || {};
}
const ht = "<anonymous>";
function je(t) {
  try {
    return !t || typeof t != "function" ? ht : t.name || ht;
  } catch {
    return ht;
  }
}
function zt(t) {
  const e = t.exception;
  if (e) {
    const n = [];
    try {
      return e.values.forEach(r => {
        r.stacktrace.frames && n.push(...r.stacktrace.frames);
      }), n;
    } catch {
      return;
    }
  }
}
function Ue(t) {
  return "__v_isVNode" in t && t.__v_isVNode ? "[VueVNode]" : "[VueViewModel]";
}
const H = {},
  Vt = {};
function pt(t, e) {
  return H[t] = H[t] || [], H[t].push(e), () => {
    const n = H[t];
    if (n) {
      const r = n.indexOf(e);
      r !== -1 && n.splice(r, 1);
    }
  };
}
function dt(t, e) {
  if (!Vt[t]) {
    Vt[t] = !0;
    try {
      e();
    } catch (n) {
      x && l.error("Error while instrumenting " + t, n);
    }
  }
}
function C(t, e) {
  const n = t && H[t];
  if (n) for (const r of n) try {
    r(e);
  } catch (s) {
    x && l.error(`Error while triggering instrumentation handler.
Type: ` + t + `
Name: ` + je(r) + `
Error:`, s);
  }
}
let gt = null;
function Qi(t) {
  const e = "error";
  pt(e, t), dt(e, Mn);
}
function Mn() {
  gt = g.onerror, g.onerror = function (t, e, n, r, s) {
    return C("error", {
      column: r,
      error: s,
      line: n,
      msg: t,
      url: e
    }), gt ? gt.apply(this, arguments) : !1;
  }, g.onerror.__SENTRY_INSTRUMENTED__ = !0;
}
let mt = null;
function to(t) {
  const e = "unhandledrejection";
  pt(e, t), dt(e, Fn);
}
function Fn() {
  mt = g.onunhandledrejection, g.onunhandledrejection = function (t) {
    return C("unhandledrejection", t), mt ? mt.apply(this, arguments) : !0;
  }, g.onunhandledrejection.__SENTRY_INSTRUMENTED__ = !0;
}
const Be = Object.prototype.toString;
function Pt(t) {
  switch (Be.call(t)) {
    case "[object Error]":
    case "[object Exception]":
    case "[object DOMException]":
    case "[object WebAssembly.Exception]":
      return !0;
    default:
      return N(t, Error);
  }
}
function F(t, e) {
  return Be.call(t) === "[object " + e + "]";
}
function eo(t) {
  return F(t, "ErrorEvent");
}
function no(t) {
  return F(t, "DOMError");
}
function ro(t) {
  return F(t, "DOMException");
}
function it(t) {
  return F(t, "String");
}
function Ge(t) {
  return typeof t == "object" && t !== null && "__sentry_template_string__" in t && "__sentry_template_values__" in t;
}
function He(t) {
  return t === null || Ge(t) || typeof t != "object" && typeof t != "function";
}
function ot(t) {
  return F(t, "Object");
}
function jn(t) {
  return typeof Event < "u" && N(t, Event);
}
function Un(t) {
  return typeof Element < "u" && N(t, Element);
}
function Bn(t) {
  return F(t, "RegExp");
}
function K(t) {
  return !!(t != null && t.then && typeof t.then == "function");
}
function Gn(t) {
  return ot(t) && "nativeEvent" in t && "preventDefault" in t && "stopPropagation" in t;
}
function N(t, e) {
  try {
    return t instanceof e;
  } catch {
    return !1;
  }
}
function We(t) {
  return !!(typeof t == "object" && t !== null && (t.__isVue || t._isVue || t.__v_isVNode));
}
function ze(t) {
  return typeof Request < "u" && N(t, Request);
}
const Lt = g,
  Hn = 80;
function Wn(t, e = {}) {
  if (!t) return "<unknown>";
  try {
    let n = t;
    const r = 5,
      s = [];
    let i = 0,
      o = 0;
    const a = " > ",
      c = a.length;
    let u;
    const d = Array.isArray(e) ? e : e.keyAttrs,
      p = !Array.isArray(e) && e.maxStringLength || Hn;
    for (; n && i++ < r && (u = zn(n, d), !(u === "html" || i > 1 && o + s.length * c + u.length >= p));) s.push(u), o += u.length, n = n.parentNode;
    return s.reverse().join(a);
  } catch {
    return "<unknown>";
  }
}
function zn(t, e) {
  const n = t,
    r = [];
  if (!(n != null && n.tagName)) return "";
  if (Lt.HTMLElement && n instanceof HTMLElement && n.dataset) {
    if (n.dataset.sentryComponent) return n.dataset.sentryComponent;
    if (n.dataset.sentryElement) return n.dataset.sentryElement;
  }
  r.push(n.tagName.toLowerCase());
  const s = e != null && e.length ? e.filter(i => n.getAttribute(i)).map(i => [i, n.getAttribute(i)]) : null;
  if (s != null && s.length) s.forEach(i => {
    r.push("[" + i[0] + '="' + i[1] + '"]');
  });else {
    n.id && r.push("#" + n.id);
    const i = n.className;
    if (i && it(i)) {
      const o = i.split(/\s+/);
      for (const a of o) r.push("." + a);
    }
  }
  for (const i of ["aria-label", "type", "name", "title", "alt"]) {
    const o = n.getAttribute(i);
    o && r.push("[" + i + '="' + o + '"]');
  }
  return r.join("");
}
function so() {
  try {
    return Lt.document.location.href;
  } catch {
    return "";
  }
}
function io(t, e = 5) {
  if (!Lt.HTMLElement) return null;
  let n = t;
  for (let r = 0; r < e; r++) {
    if (!n) return null;
    if (n instanceof HTMLElement) {
      if (n.dataset.sentryComponent) return n.dataset.sentryComponent;
      if (n.dataset.sentryElement) return n.dataset.sentryElement;
    }
    n = n.parentNode;
  }
  return null;
}
function Ve(t, e, n) {
  if (!(e in t)) return;
  const r = t[e];
  if (typeof r != "function") return;
  const s = n(r);
  typeof s == "function" && Vn(s, r);
  try {
    t[e] = s;
  } catch {
    x && l.log('Failed to replace method "' + e + '" in object', t);
  }
}
function z(t, e, n) {
  try {
    Object.defineProperty(t, e, {
      value: n,
      writable: !0,
      configurable: !0
    });
  } catch {
    x && l.log('Failed to add non-enumerable property "' + String(e) + '" to object', t);
  }
}
function Vn(t, e) {
  try {
    const n = e.prototype || {};
    t.prototype = e.prototype = n, z(t, "__sentry_original__", e);
  } catch {}
}
function Yn(t) {
  return t.__sentry_original__;
}
function Ye(t) {
  if (Pt(t)) return {
    message: t.message,
    name: t.name,
    stack: t.stack,
    ...Jt(t)
  };
  if (jn(t)) {
    const e = {
      type: t.type,
      target: Yt(t.target),
      currentTarget: Yt(t.currentTarget),
      ...Jt(t)
    };
    return typeof CustomEvent < "u" && N(t, CustomEvent) && (e.detail = t.detail), e;
  } else return t;
}
function Yt(t) {
  try {
    return Un(t) ? Wn(t) : Object.prototype.toString.call(t);
  } catch {
    return "<unknown>";
  }
}
function Jt(t) {
  return typeof t == "object" && t !== null ? Object.fromEntries(Object.entries(t)) : {};
}
function oo(t) {
  const e = Object.keys(Ye(t));
  return e.sort(), e[0] ? e.join(", ") : "[object has no keys]";
}
let R;
function q(t) {
  if (R !== void 0) return R ? R(t) : t();
  const e = Symbol.for("__SENTRY_SAFE_RANDOM_ID_WRAPPER__"),
    n = g;
  return e in n && typeof n[e] == "function" ? (R = n[e], R(t)) : (R = null, t());
}
function at() {
  return q(() => Math.random());
}
function X() {
  return q(() => Date.now());
}
function bt(t, e = 0) {
  return typeof t != "string" || e === 0 || t.length <= e ? t : t.slice(0, e) + "...";
}
function ao(t, e) {
  if (!Array.isArray(t)) return "";
  const n = [];
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    try {
      We(s) ? n.push(Ue(s)) : n.push(String(s));
    } catch {
      n.push("[value cannot be serialized]");
    }
  }
  return n.join(e);
}
function W(t, e, n = !1) {
  return it(t) ? Bn(e) ? e.test(t) : it(e) ? n ? t === e : t.includes(e) : typeof e == "function" ? e(t) : !1 : !1;
}
function Z(t, e = [], n = !1) {
  for (const r of e) if (W(t, r, n)) return !0;
  return !1;
}
function Jn() {
  const t = g;
  return t.crypto || t.msCrypto;
}
let yt;
function $n() {
  return at() * 16;
}
function v(t = Jn()) {
  try {
    if (t != null && t.randomUUID) return q(() => t.randomUUID()).replace(/-/g, "");
  } catch {}
  return !yt && (yt = "100000001000" + 4000 + 8000 + 100000000000), yt.replace(/[018]/g, e => (e ^ ($n() & 15) >> e / 4).toString(16));
}
function Je(t) {
  var e, n;
  return (n = (e = t.exception) == null ? void 0 : e.values) == null ? void 0 : n[0];
}
function k(t) {
  const {
    message: e,
    event_id: n
  } = t;
  if (e) return e;
  const r = Je(t);
  return r ? r.type && r.value ? r.type + ": " + r.value : r.type || r.value || n || "<unknown>" : n || "<unknown>";
}
function co(t, e, n) {
  const r = t.exception = t.exception || {},
    s = r.values = r.values || [],
    i = s[0] = s[0] || {};
  !i.value && (i.value = e || ""), !i.type && (i.type = "Error");
}
function Kn(t, e) {
  const n = Je(t);
  if (!n) return;
  const r = {
      type: "generic",
      handled: !0
    },
    s = n.mechanism;
  if (n.mechanism = {
    ...r,
    ...s,
    ...e
  }, e && "data" in e) {
    const i = {
      ...(s == null ? void 0 : s.data),
      ...e.data
    };
    n.mechanism.data = i;
  }
}
function $t(t) {
  if (qn(t)) return !0;
  try {
    z(t, "__sentry_captured__", !0);
  } catch {}
  return !1;
}
function qn(t) {
  try {
    return t.__sentry_captured__;
  } catch {}
}
const $e = 1e3;
function Q() {
  return X() / $e;
}
function Xn() {
  const {
    performance: t
  } = g;
  if (!(t != null && t.now) || !t.timeOrigin) return Q;
  const e = t.timeOrigin;
  return () => (e + q(() => t.now())) / $e;
}
let Kt;
function D() {
  return (Kt ?? (Kt = Xn()))();
}
let Et = null;
function Zn() {
  var o;
  const {
    performance: t
  } = g;
  if (!(t != null && t.now)) return;
  const e = 300000,
    n = q(() => t.now()),
    r = X(),
    s = t.timeOrigin;
  if (typeof s == "number" && Math.abs(s + n - r) < e) return s;
  const i = (o = t.timing) == null ? void 0 : o["navigationStart"];
  return typeof i == "number" && Math.abs(i + n - r) < e ? i : r - n;
}
function uo() {
  return Et === null && (Et = Zn()), Et;
}
function Qn(t) {
  const e = D(),
    n = {
      sid: v(),
      init: !0,
      timestamp: e,
      started: e,
      duration: 0,
      status: "ok",
      errors: 0,
      ignoreDuration: !1,
      toJSON: () => er(n)
    };
  return t && P(n, t), n;
}
function P(t, e = {}) {
  if (e.user && (!t.ipAddress && e.user.ip_address && (t.ipAddress = e.user.ip_address), !t.did && !e.did && (t.did = e.user.id || e.user.email || e.user.username)), t.timestamp = e.timestamp || D(), e.abnormal_mechanism && (t.abnormal_mechanism = e.abnormal_mechanism), e.ignoreDuration && (t.ignoreDuration = e.ignoreDuration), e.sid && (t.sid = e.sid.length === 32 ? e.sid : v()), e.init !== void 0 && (t.init = e.init), !t.did && e.did && (t.did = "" + e.did), typeof e.started == "number" && (t.started = e.started), t.ignoreDuration) t.duration = void 0;else if (typeof e.duration == "number") t.duration = e.duration;else {
    const n = t.timestamp - t.started;
    t.duration = n >= 0 ? n : 0;
  }
  e.release && (t.release = e.release), e.environment && (t.environment = e.environment), !t.ipAddress && e.ipAddress && (t.ipAddress = e.ipAddress), !t.userAgent && e.userAgent && (t.userAgent = e.userAgent), typeof e.errors == "number" && (t.errors = e.errors), e.status && (t.status = e.status);
}
function tr(t, e) {
  let n = {};
  t.status === "ok" && (n = {
    status: "exited"
  }), P(t, n);
}
function er(t) {
  return {
    sid: "" + t.sid,
    init: t.init,
    started: new Date(t.started * 1000).toISOString(),
    timestamp: new Date(t.timestamp * 1e3).toISOString(),
    status: t.status,
    errors: t.errors,
    did: typeof t.did == "number" || typeof t.did == "string" ? "" + t.did : void 0,
    duration: t.duration,
    abnormal_mechanism: t.abnormal_mechanism,
    attrs: {
      release: t.release,
      environment: t.environment,
      ip_address: t.ipAddress,
      user_agent: t.userAgent
    }
  };
}
function tt(t, e, n = 2) {
  if (!e || typeof e != "object" || n <= 0) return e;
  if (t && Object.keys(e).length === 0) return t;
  const r = {
    ...t
  };
  for (const s in e) Object.prototype.hasOwnProperty.call(e, s) && (r[s] = tt(r[s], e[s], n - 1));
  return r;
}
function qt() {
  return v();
}
function Ke() {
  return v().substring(16);
}
const _t = "_sentrySpan";
function Xt(t, e) {
  e ? z(t, _t, e) : delete t[_t];
}
function It(t) {
  return t[_t];
}
const nr = 100;
class b {
  constructor() {
    this._notifyingListeners = !1, this._scopeListeners = [], this._eventProcessors = [], this._breadcrumbs = [], this._attachments = [], this._user = {}, this._tags = {}, this._attributes = {}, this._extra = {}, this._contexts = {}, this._sdkProcessingMetadata = {}, this._propagationContext = {
      traceId: qt(),
      sampleRand: at()
    };
  }
  clone() {
    const e = new b();
    return e._breadcrumbs = [...this._breadcrumbs], e._tags = {
      ...this._tags
    }, e._attributes = {
      ...this._attributes
    }, e._extra = {
      ...this._extra
    }, e._contexts = {
      ...this._contexts
    }, this._contexts.flags && (e._contexts.flags = {
      values: [...this._contexts.flags.values]
    }), e._user = this._user, e._level = this._level, e._session = this._session, e._transactionName = this._transactionName, e._fingerprint = this._fingerprint, e._eventProcessors = [...this._eventProcessors], e._attachments = [...this._attachments], e._sdkProcessingMetadata = {
      ...this._sdkProcessingMetadata
    }, e._propagationContext = {
      ...this._propagationContext
    }, e._client = this._client, e._lastEventId = this._lastEventId, e._conversationId = this._conversationId, Xt(e, It(this)), e;
  }
  setClient(e) {
    this._client = e;
  }
  setLastEventId(e) {
    this._lastEventId = e;
  }
  getClient() {
    return this._client;
  }
  lastEventId() {
    return this._lastEventId;
  }
  addScopeListener(e) {
    this._scopeListeners.push(e);
  }
  addEventProcessor(e) {
    return this._eventProcessors.push(e), this;
  }
  setUser(e) {
    return this._user = e || {
      email: void 0,
      id: void 0,
      ip_address: void 0,
      username: void 0
    }, this._session && P(this._session, {
      user: e
    }), this._notifyScopeListeners(), this;
  }
  getUser() {
    return this._user;
  }
  setConversationId(e) {
    return this._conversationId = e || void 0, this._notifyScopeListeners(), this;
  }
  setTags(e) {
    return this._tags = {
      ...this._tags,
      ...e
    }, this._notifyScopeListeners(), this;
  }
  setTag(e, n) {
    return this.setTags({
      [e]: n
    });
  }
  setAttributes(e) {
    return this._attributes = {
      ...this._attributes,
      ...e
    }, this._notifyScopeListeners(), this;
  }
  setAttribute(e, n) {
    return this.setAttributes({
      [e]: n
    });
  }
  removeAttribute(e) {
    return e in this._attributes && (delete this._attributes[e], this._notifyScopeListeners()), this;
  }
  setExtras(e) {
    return this._extra = {
      ...this._extra,
      ...e
    }, this._notifyScopeListeners(), this;
  }
  setExtra(e, n) {
    return this._extra = {
      ...this._extra,
      [e]: n
    }, this._notifyScopeListeners(), this;
  }
  setFingerprint(e) {
    return this._fingerprint = e, this._notifyScopeListeners(), this;
  }
  setLevel(e) {
    return this._level = e, this._notifyScopeListeners(), this;
  }
  setTransactionName(e) {
    return this._transactionName = e, this._notifyScopeListeners(), this;
  }
  setContext(e, n) {
    return n === null ? delete this._contexts[e] : this._contexts[e] = n, this._notifyScopeListeners(), this;
  }
  setSession(e) {
    return e ? this._session = e : delete this._session, this._notifyScopeListeners(), this;
  }
  getSession() {
    return this._session;
  }
  update(e) {
    if (!e) return this;
    const n = typeof e == "function" ? e(this) : e,
      r = n instanceof b ? n.getScopeData() : ot(n) ? e : void 0,
      {
        tags: s,
        attributes: i,
        extra: o,
        user: a,
        contexts: c,
        level: u,
        fingerprint: d = [],
        propagationContext: p,
        conversationId: h
      } = r || {};
    return this._tags = {
      ...this._tags,
      ...s
    }, this._attributes = {
      ...this._attributes,
      ...i
    }, this._extra = {
      ...this._extra,
      ...o
    }, this._contexts = {
      ...this._contexts,
      ...c
    }, a && Object.keys(a).length && (this._user = a), u && (this._level = u), d.length && (this._fingerprint = d), p && (this._propagationContext = p), h && (this._conversationId = h), this;
  }
  clear() {
    return this._breadcrumbs = [], this._tags = {}, this._attributes = {}, this._extra = {}, this._user = {}, this._contexts = {}, this._level = void 0, this._transactionName = void 0, this._fingerprint = void 0, this._session = void 0, this._conversationId = void 0, Xt(this, void 0), this._attachments = [], this.setPropagationContext({
      traceId: qt(),
      sampleRand: at()
    }), this._notifyScopeListeners(), this;
  }
  addBreadcrumb(e, n) {
    var i;
    const r = typeof n == "number" ? n : nr;
    if (r <= 0) return this;
    const s = {
      timestamp: Q(),
      ...e,
      message: e.message ? bt(e.message, 2048) : e.message
    };
    return this._breadcrumbs.push(s), this._breadcrumbs.length > r && (this._breadcrumbs = this._breadcrumbs.slice(-r), (i = this._client) == null || i.recordDroppedEvent("buffer_overflow", "log_item")), this._notifyScopeListeners(), this;
  }
  getLastBreadcrumb() {
    return this._breadcrumbs[this._breadcrumbs.length - 1];
  }
  clearBreadcrumbs() {
    return this._breadcrumbs = [], this._notifyScopeListeners(), this;
  }
  addAttachment(e) {
    return this._attachments.push(e), this;
  }
  clearAttachments() {
    return this._attachments = [], this;
  }
  getScopeData() {
    return {
      breadcrumbs: this._breadcrumbs,
      attachments: this._attachments,
      contexts: this._contexts,
      tags: this._tags,
      attributes: this._attributes,
      extra: this._extra,
      user: this._user,
      level: this._level,
      fingerprint: this._fingerprint || [],
      eventProcessors: this._eventProcessors,
      propagationContext: this._propagationContext,
      sdkProcessingMetadata: this._sdkProcessingMetadata,
      transactionName: this._transactionName,
      span: It(this),
      conversationId: this._conversationId
    };
  }
  setSDKProcessingMetadata(e) {
    return this._sdkProcessingMetadata = tt(this._sdkProcessingMetadata, e, 2), this;
  }
  setPropagationContext(e) {
    return this._propagationContext = e, this;
  }
  getPropagationContext() {
    return this._propagationContext;
  }
  captureException(e, n) {
    const r = (n == null ? void 0 : n.event_id) || v();
    if (!this._client) return x && l.warn("No client configured on scope - will not capture exception!"), r;
    const s = new Error("Sentry syntheticException");
    return this._client.captureException(e, {
      originalException: e,
      syntheticException: s,
      ...n,
      event_id: r
    }, this), r;
  }
  captureMessage(e, n, r) {
    const s = (r == null ? void 0 : r.event_id) || v();
    if (!this._client) return x && l.warn("No client configured on scope - will not capture message!"), s;
    const i = (r == null ? void 0 : r["syntheticException"]) ?? new Error(e);
    return this._client.captureMessage(e, n, {
      originalException: e,
      syntheticException: i,
      ...r,
      event_id: s
    }, this), s;
  }
  captureEvent(e, n) {
    const r = e.event_id || (n == null ? void 0 : n.event_id) || v();
    return this._client ? (this._client.captureEvent(e, {
      ...n,
      event_id: r
    }, this), r) : (x && l.warn("No client configured on scope - will not capture event!"), r);
  }
  _notifyScopeListeners() {
    !this._notifyingListeners && (this._notifyingListeners = !0, this._scopeListeners.forEach(e => {
      e(this);
    }), this._notifyingListeners = !1);
  }
}
function rr() {
  return M("defaultCurrentScope", () => new b());
}
function sr() {
  return M("defaultIsolationScope", () => new b());
}
const Zt = t => t instanceof Promise && !t[qe],
  qe = Symbol("chained PromiseLike"),
  ir = (t, e, n) => {
    const r = t.then(s => (e(s), s), s => {
      throw n(s), s;
    });
    return Zt(r) && Zt(t) ? r : or(t, r);
  },
  or = (t, e) => {
    if (!e) return t;
    let n = !1;
    for (const r in t) {
      if (r in e) continue;
      n = !0;
      const s = t[r];
      typeof s == "function" ? Object.defineProperty(e, r, {
        value: (...i) => s.apply(t, i),
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[r] = s;
    }
    return n && Object.assign(e, {
      [qe]: !0
    }), e;
  };
class ar {
  constructor(e, n) {
    let r;
    e ? r = e : r = new b();
    let s;
    n ? s = n : s = new b(), this._stack = [{
      scope: r
    }], this._isolationScope = s;
  }
  withScope(e) {
    const n = this._pushScope();
    let r;
    try {
      r = e(n);
    } catch (s) {
      throw this._popScope(), s;
    }
    return K(r) ? ir(r, () => this._popScope(), () => this._popScope()) : (this._popScope(), r);
  }
  getClient() {
    return this.getStackTop().client;
  }
  getScope() {
    return this.getStackTop().scope;
  }
  getIsolationScope() {
    return this._isolationScope;
  }
  getStackTop() {
    return this._stack[this._stack.length - 1];
  }
  _pushScope() {
    const e = this.getScope().clone();
    return this._stack.push({
      client: this.getClient(),
      scope: e
    }), e;
  }
  _popScope() {
    return this._stack.length <= 1 ? !1 : !!this._stack.pop();
  }
}
function L() {
  const t = J(),
    e = ut(t);
  return e.stack = e.stack || new ar(rr(), sr());
}
function cr(t) {
  return L().withScope(t);
}
function ur(t, e) {
  const n = L();
  return n.withScope(() => (n.getStackTop().scope = t, e(t)));
}
function Qt(t) {
  return L().withScope(() => t(L().getIsolationScope()));
}
function pr() {
  return {
    withIsolationScope: Qt,
    withScope: cr,
    withSetScope: ur,
    withSetIsolationScope: (t, e) => Qt(e),
    getCurrentScope: () => L().getScope(),
    getIsolationScope: () => L().getIsolationScope()
  };
}
function ft(t) {
  const e = ut(t);
  return e.acs ? e.acs : pr();
}
function dr(t) {
  return typeof t == "object" && t != null && !Array.isArray(t) && Object.keys(t).includes("value");
}
function fr(t, e) {
  const {
      value: n,
      unit: r
    } = dr(t) ? t : {
      value: t,
      unit: void 0
    },
    s = lr(n),
    i = r && typeof r == "string" ? {
      unit: r
    } : {};
  if (s) return {
    ...s,
    ...i
  };
  if (!e || e === "skip-undefined" && n === void 0) return;
  let o = "";
  try {
    o = JSON.stringify(n) ?? "";
  } catch {}
  return {
    value: o,
    type: "string",
    ...i
  };
}
function te(t, e = !1) {
  const n = {};
  for (const [r, s] of Object.entries(t ?? {})) {
    const i = fr(s, e);
    i && (n[r] = i);
  }
  return n;
}
function lr(t) {
  const e = typeof t == "string" ? "string" : typeof t == "boolean" ? "boolean" : typeof t == "number" && !Number.isNaN(t) ? Number.isInteger(t) ? "integer" : "double" : null;
  if (e) return {
    value: t,
    type: e
  };
}
function _() {
  const t = J();
  return ft(t).getCurrentScope();
}
function S() {
  const t = J();
  return ft(t).getIsolationScope();
}
function xr() {
  return M("globalScope", () => new b());
}
function po(...t) {
  const e = J(),
    n = ft(e);
  if (t.length === 2) {
    const [r, s] = t;
    return r ? n.withSetScope(r, s) : n.withScope(s);
  }
  return n.withScope(t[0]);
}
function j() {
  return _().getClient();
}
function hr(t) {
  const e = t.getPropagationContext(),
    {
      traceId: n,
      parentSpanId: r,
      propagationSpanId: s
    } = e,
    i = {
      trace_id: n,
      span_id: s || Ke()
    };
  return r && (i.parent_span_id = r), i;
}
const gr = "sentry.source",
  mr = "sentry.sample_rate",
  yr = "sentry.previous_trace_sample_rate",
  Er = "sentry.op",
  Sr = "sentry.origin";
const Xe = "sentry.profile_id",
  Ze = "sentry.exclusive_time",
  vr = "gen_ai.conversation.id",
  br = 0,
  _r = 1;
function Ir(t) {
  if (t) {
    if (typeof t == "object" && "deref" in t && typeof t.deref == "function") try {
      return t.deref();
    } catch {
      return;
    }
    return t;
  }
}
const Tr = "_sentryScope",
  Ar = "_sentryIsolationScope";
function Qe(t) {
  const e = t;
  return {
    scope: e[Tr],
    isolationScope: Ir(e[Ar])
  };
}
const ee = "sentry-";
function Nr(t) {
  const e = wr(t);
  if (!e) return;
  const n = Object.entries(e).reduce((r, [s, i]) => {
    if (s.startsWith(ee)) {
      const o = s.slice(ee.length);
      r[o] = i;
    }
    return r;
  }, {});
  return Object.keys(n).length > 0 ? n : void 0;
}
function wr(t) {
  if (!(!t || !it(t) && !Array.isArray(t))) return Array.isArray(t) ? t.reduce((e, n) => {
    const r = ne(n);
    return Object.entries(r).forEach(([s, i]) => {
      e[s] = i;
    }), e;
  }, {}) : ne(t);
}
function ne(t) {
  return t.split(",").map(e => {
    const n = e.indexOf("=");
    if (n === -1) return [];
    const r = e.slice(0, n),
      s = e.slice(n + 1);
    return [r, s].map(i => {
      try {
        return decodeURIComponent(i.trim());
      } catch {
        return;
      }
    });
  }).reduce((e, [n, r]) => (n && r && (e[n] = r), e), {});
}
const Or = /^o(\d+)\./,
  Rr = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)((?:\[[:.%\w]+\]|[\w.-]+))(?::(\d+))?\/(.+)/;
function kr(t) {
  return t === "http" || t === "https";
}
function U(t, e = !1) {
  const {
    host: n,
    path: r,
    pass: s,
    port: i,
    projectId: o,
    protocol: a,
    publicKey: c
  } = t;
  return a + "://" + c + (e && s ? ":" + s : "") + ("@" + n + (i ? ":" + i : "") + "/" + (r && r + "/") + o);
}
function Cr(t) {
  const e = Rr.exec(t);
  if (!e) return $(() => {
    console.error("Invalid Sentry Dsn: " + t);
  }), void 0;
  const [n, r, s = "", i = "", o = "", a = ""] = e.slice(1);
  let c = "",
    u = a;
  const d = u.split("/");
  if (d.length > 1 && (c = d.slice(0, -1).join("/"), u = d.pop()), u) {
    const p = u.match(/^\d+/);
    p && (u = p[0]);
  }
  return tn({
    host: i,
    pass: s,
    path: c,
    projectId: u,
    port: o,
    protocol: n,
    publicKey: r
  });
}
function tn(t) {
  return {
    protocol: t.protocol,
    publicKey: t.publicKey || "",
    pass: t.pass || "",
    host: t.host,
    port: t.port || "",
    path: t.path || "",
    projectId: t.projectId
  };
}
function Dr(t) {
  if (!x) return !0;
  const {
    port: e,
    projectId: n,
    protocol: r
  } = t;
  return ["protocol", "publicKey", "host", "projectId"].find(o => t[o] ? !1 : (l.error("Invalid Sentry Dsn: " + o + " missing"), !0)) ? !1 : n.match(/^\d+$/) ? kr(r) ? e && isNaN(parseInt(e, 10)) ? (l.error("Invalid Sentry Dsn: Invalid port " + e), !1) : !0 : (l.error("Invalid Sentry Dsn: Invalid protocol " + r), !1) : (l.error("Invalid Sentry Dsn: Invalid projectId " + n), !1);
}
function Pr(t) {
  const e = t.match(Or);
  return e == null ? void 0 : e[1];
}
function Lr(t) {
  const e = t.getOptions(),
    {
      host: n
    } = t.getDsn() || {};
  let r;
  return e.orgId ? r = String(e.orgId) : n && (r = Pr(n)), r;
}
function en(t) {
  const e = typeof t == "string" ? Cr(t) : tn(t);
  if (!(!e || !Dr(e))) return e;
}
function Mr(t) {
  if (typeof t == "boolean") return Number(t);
  const e = typeof t == "string" ? parseFloat(t) : t;
  if (!(typeof e != "number" || isNaN(e) || e < 0 || e > 1)) return e;
}
const nn = 1;
let re = !1;
function Fr(t) {
  const {
      spanId: e,
      traceId: n,
      isRemote: r
    } = t.spanContext(),
    s = r ? e : lt(t).parent_span_id,
    i = Qe(t).scope,
    o = r ? (i == null ? void 0 : i.getPropagationContext()["propagationSpanId"]) || Ke() : e;
  return {
    parent_span_id: s,
    span_id: o,
    trace_id: n
  };
}
function jr(t) {
  return t && t.length > 0 ? t.map(({
    context: {
      spanId: e,
      traceId: n,
      traceFlags: r,
      ...s
    },
    attributes: i
  }) => ({
    span_id: e,
    trace_id: n,
    sampled: r === nn,
    attributes: i,
    ...s
  })) : void 0;
}
function se(t) {
  return typeof t == "number" ? ie(t) : Array.isArray(t) ? t[0] + t[1] / 1000000000 : t instanceof Date ? ie(t.getTime()) : D();
}
function ie(t) {
  return t > 9999999999 ? t / 1000 : t;
}
function lt(t) {
  if (Hr(t)) return t.getSpanJSON();
  const {
    spanId: e,
    traceId: n
  } = t.spanContext();
  if (Gr(t)) {
    const {
      attributes: r,
      startTime: s,
      name: i,
      endTime: o,
      status: a,
      links: c
    } = t;
    return {
      span_id: e,
      trace_id: n,
      data: r,
      description: i,
      parent_span_id: Ur(t),
      start_timestamp: se(s),
      timestamp: se(o) || void 0,
      status: zr(a),
      op: r[Er],
      origin: r[Sr],
      links: jr(c)
    };
  }
  return {
    span_id: e,
    trace_id: n,
    start_timestamp: 0,
    data: {}
  };
}
function Ur(t) {
  var e;
  return "parentSpanId" in t ? t.parentSpanId : "parentSpanContext" in t ? (e = t.parentSpanContext) == null ? void 0 : e.spanId : void 0;
}
function Br(t) {
  var e;
  return {
    ...t,
    attributes: te(t.attributes),
    links: (e = t.links) == null ? void 0 : e.map(n => ({
      ...n,
      attributes: te(n.attributes)
    }))
  };
}
function Gr(t) {
  const e = t;
  return !!e.attributes && !!e.startTime && !!e.name && !!e.endTime && !!e.status;
}
function Hr(t) {
  return typeof t.getSpanJSON == "function";
}
function Wr(t) {
  const {
    traceFlags: e
  } = t.spanContext();
  return e === nn;
}
function zr(t) {
  if (!(!t || t.code === br)) return t.code === _r ? "ok" : t.message || "internal_error";
}
const Vr = "_sentryRootSpan",
  rn = Yr;
function Yr(t) {
  return t[Vr] || t;
}
function fo() {
  const t = J(),
    e = ft(t);
  return e.getActiveSpan ? e.getActiveSpan() : It(_());
}
function oe() {
  !re && ($(() => {
    console.warn("[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`.");
  }), re = !0);
}
function Jr(t) {
  var n;
  if (typeof __SENTRY_TRACING__ == "boolean" && !__SENTRY_TRACING__) return !1;
  const e = (n = j()) == null ? void 0 : n.getOptions();
  return !!e && (e.tracesSampleRate != null || !!e.tracesSampler);
}
function ae(t) {
  l.log("Ignoring span " + t.op + " - " + t.description + " because it matches `ignoreSpans`.");
}
function ce(t, e) {
  if (!(e != null && e.length)) return !1;
  for (const n of e) {
    if (qr(n)) {
      if (t.description && W(t.description, n)) return x && ae(t), !0;
      continue;
    }
    const r = !!n.attributes && Object.keys(n.attributes).length > 0;
    if (!n.name && !n.op && !r) continue;
    const s = n.name ? t.description && W(t.description, n.name) : !0,
      i = n.op ? t.op && W(t.op, n.op) : !0,
      o = n.attributes ? Object.entries(n.attributes).every(([a, c]) => {
        var u;
        return $r((u = t.attributes) == null ? void 0 : u[a], c);
      }) : !0;
    if (s && i && o) return x && ae(t), !0;
  }
  return !1;
}
function $r(t, e) {
  return typeof t == "string" && (typeof e == "string" || e instanceof RegExp) ? W(t, e) : Array.isArray(t) && Array.isArray(e) ? t.length === e.length && t.every((n, r) => n === e[r]) : t === e;
}
function Kr(t, e) {
  const n = e.parent_span_id,
    r = e.span_id;
  if (n) for (const s of t) s.parent_span_id === r && (s.parent_span_id = n);
}
function qr(t) {
  return typeof t == "string" || t instanceof RegExp;
}
const Mt = "production",
  Xr = "_frozenDsc";
function sn(t, e) {
  const n = e.getOptions(),
    {
      publicKey: r
    } = e.getDsn() || {},
    s = {
      environment: n.environment || Mt,
      release: n.release,
      public_key: r,
      trace_id: t,
      org_id: Lr(e)
    };
  return e.emit("createDsc", s), s;
}
function Zr(t, e) {
  const n = e.getPropagationContext();
  return n.dsc || sn(n.traceId, t);
}
function Qr(t) {
  var m;
  const e = j();
  if (!e) return {};
  const n = rn(t),
    r = lt(n),
    s = r.data,
    i = n.spanContext().traceState,
    o = (i == null ? void 0 : i.get("sentry.sample_rate")) ?? s[mr] ?? s[yr];
  function a(y) {
    return (typeof o == "number" || typeof o == "string") && (y.sample_rate = "" + o), y;
  }
  const c = n[Xr];
  if (c) return a(c);
  const u = i == null ? void 0 : i.get("sentry.dsc"),
    d = u && Nr(u);
  if (d) return a(d);
  const p = sn(t.spanContext().traceId, e),
    h = s[gr] ?? s["sentry.span.source"],
    f = r.description;
  return h !== "url" && f && (p.transaction = f), Jr() && (p.sampled = String(Wr(n)), p.sample_rand = (i == null ? void 0 : i.get("sentry.sample_rand")) ?? ((m = Qe(n).scope) == null ? void 0 : m.getPropagationContext().sampleRand.toString())), a(p), e.emit("createDsc", p, n), p;
}
function ts(t) {
  return !!t && typeof t == "function" && "_streamed" in t && !!t._streamed;
}
const es = Symbol.for("sentry.skipNormalization"),
  ns = Symbol.for("sentry.overrideNormalizationDepth");
function rs(t) {
  return !!t[es];
}
function ss(t) {
  const e = t[ns];
  return typeof e == "number" ? e : void 0;
}
function T(t, e = 100, n = 1 / 0) {
  try {
    return Tt("", t, e, n);
  } catch (r) {
    return {
      ERROR: "**non-serializable** (" + r + ")"
    };
  }
}
function is(t, e = 3, n = 102400) {
  const r = T(t, e);
  return us(r) > n ? is(t, e - 1, n) : r;
}
function Tt(t, e, n = 1 / 0, r = 1 / 0, s = ps()) {
  const [i, o] = s;
  if (e == null || ["boolean", "string"].includes(typeof e) || typeof e == "number" && Number.isFinite(e)) return e;
  const a = os(t, e);
  if (!a.startsWith("[object ")) return a;
  if (rs(e)) return e;
  const c = ss(e),
    u = c !== void 0 ? c : n;
  if (u === 0) return a.replace("object ", "");
  if (i(e)) return "[Circular ~]";
  const d = e;
  if (d && typeof d.toJSON == "function") try {
    const m = d.toJSON();
    return Tt("", m, u - 1, r, s);
  } catch {}
  const p = Array.isArray(e) ? [] : {};
  let h = 0;
  const f = Ye(e);
  for (const m in f) {
    if (!Object.prototype.hasOwnProperty.call(f, m)) continue;
    if (h >= r) {
      p[m] = "[MaxProperties ~]";
      break;
    }
    const y = f[m];
    p[m] = Tt(m, y, u - 1, r, s), h++;
  }
  return o(e), p;
}
function os(t, e) {
  try {
    if (t === "domain" && e && typeof e == "object" && e._events) return "[Domain]";
    if (t === "domainEmitter") return "[DomainEmitter]";
    if (typeof global < "u" && e === global) return "[Global]";
    if (typeof window < "u" && e === window) return "[Window]";
    if (typeof document < "u" && e === document) return "[Document]";
    if (We(e)) return Ue(e);
    if (Gn(e)) return "[SyntheticEvent]";
    if (typeof e == "number" && !Number.isFinite(e)) return "[" + e + "]";
    if (typeof e == "function") return "[Function: " + je(e) + "]";
    if (typeof e == "symbol") return "[" + String(e) + "]";
    if (typeof e == "bigint") return "[BigInt: " + String(e) + "]";
    const n = as(e);
    return /^HTML(\w*)Element$/.test(n) ? "[HTMLElement: " + n + "]" : "[object " + n + "]";
  } catch (n) {
    return "**non-serializable** (" + n + ")";
  }
}
function as(t) {
  const e = Object.getPrototypeOf(t);
  return e != null && e["constructor"] ? e.constructor.name : "null prototype";
}
function cs(t) {
  return ~-encodeURI(t).split(/%..|./).length;
}
function us(t) {
  return cs(JSON.stringify(t));
}
function ps() {
  const t = new WeakSet();
  function e(r) {
    return t.has(r) ? !0 : (t.add(r), !1);
  }
  function n(r) {
    t.delete(r);
  }
  return [e, n];
}
function B(t, e = []) {
  return [t, e];
}
function ue(t, e) {
  const [n, r] = t;
  return [n, [...r, e]];
}
function At(t, e) {
  const n = t[1];
  for (const r of n) {
    const s = r[0].type;
    if (e(r, s)) return !0;
  }
  return !1;
}
function ds(t, e) {
  return At(t, (n, r) => e.includes(r));
}
function Nt(t) {
  const e = ut(g);
  return e.encodePolyfill ? e.encodePolyfill(t) : new TextEncoder().encode(t);
}
function fs(t) {
  const [e, n] = t;
  let r = JSON.stringify(e);
  function s(i) {
    typeof r == "string" ? r = typeof i == "string" ? r + i : [Nt(r), i] : r.push(typeof i == "string" ? Nt(i) : i);
  }
  for (const i of n) {
    const [o, a] = i;
    if (s(`
` + JSON.stringify(o) + `
`), typeof a == "string" || a instanceof Uint8Array) s(a);else {
      let c;
      try {
        c = JSON.stringify(a);
      } catch {
        c = JSON.stringify(T(a));
      }
      s(c);
    }
  }
  return typeof r == "string" ? r : ls(r);
}
function ls(t) {
  const e = t.reduce((s, i) => s + i.length, 0),
    n = new Uint8Array(e);
  let r = 0;
  for (const s of t) n.set(s, r), r += s.length;
  return n;
}
function xs(t) {
  const e = typeof t.data == "string" ? Nt(t.data) : t.data;
  return [{
    type: "attachment",
    length: e.length,
    filename: t.filename,
    content_type: t.contentType,
    attachment_type: t.attachmentType
  }, e];
}
const on = {
  sessions: "session",
  event: "error",
  client_report: "internal",
  user_report: "default",
  profile_chunk: "profile",
  replay_event: "replay",
  replay_recording: "replay",
  check_in: "monitor",
  raw_security: "security",
  log: "log_item",
  trace_metric: "metric"
};
function hs(t) {
  return t in on;
}
function pe(t) {
  return hs(t) ? on[t] : t;
}
function an(t) {
  if (!(t != null && t.sdk)) return;
  const {
    name: e,
    version: n
  } = t.sdk;
  return {
    name: e,
    version: n
  };
}
function gs(t, e, n, r) {
  var i;
  const s = (i = t.sdkProcessingMetadata) == null ? void 0 : i["dynamicSamplingContext"];
  return {
    event_id: t.event_id,
    sent_at: new Date().toISOString(),
    ...(e && {
      sdk: e
    }),
    ...(!!n && r && {
      dsn: U(r)
    }),
    ...(s && {
      trace: s
    })
  };
}
function ms(t, e) {
  var r, s, i, o;
  if (!e) return t;
  const n = t.sdk || {};
  return t.sdk = {
    ...n,
    name: n.name || e.name,
    version: n.version || e.version,
    integrations: [...(((r = t.sdk) == null ? void 0 : r["integrations"]) || []), ...(e.integrations || [])],
    packages: [...(((s = t.sdk) == null ? void 0 : s.packages) || []), ...(e.packages || [])],
    settings: (i = t.sdk) != null && i.settings || e.settings ? {
      ...((o = t.sdk) == null ? void 0 : o.settings),
      ...e.settings
    } : void 0
  }, t;
}
function ys(t, e, n, r) {
  const s = an(n),
    i = {
      sent_at: new Date().toISOString(),
      ...(s && {
        sdk: s
      }),
      ...(!!r && e && {
        dsn: U(e)
      })
    },
    o = "aggregates" in t ? [{
      type: "sessions"
    }, t] : [{
      type: "session"
    }, t.toJSON()];
  return B(i, [o]);
}
function Es(t, e, n, r) {
  const s = an(n),
    i = t.type && t.type !== "replay_event" ? t.type : "event";
  ms(t, n == null ? void 0 : n.sdk);
  const o = gs(t, s, r, e);
  return delete t.sdkProcessingMetadata, B(o, [[{
    type: i
  }, t]]);
}
function Ss(t) {
  return t.getOptions().traceLifecycle === "stream";
}
function vs(t, e) {
  const {
    fingerprint: n,
    span: r,
    breadcrumbs: s,
    sdkProcessingMetadata: i
  } = e;
  bs(t, e), r && Ts(t, r), As(t, n), _s(t, s), Is(t, i);
}
function de(t, e) {
  const {
    extra: n,
    tags: r,
    attributes: s,
    user: i,
    contexts: o,
    level: a,
    sdkProcessingMetadata: c,
    breadcrumbs: u,
    fingerprint: d,
    eventProcessors: p,
    attachments: h,
    propagationContext: f,
    transactionName: m,
    span: y
  } = e;
  G(t, "extra", n), G(t, "tags", r), G(t, "attributes", s), G(t, "user", i), G(t, "contexts", o), t.sdkProcessingMetadata = tt(t.sdkProcessingMetadata, c, 2), a && (t.level = a), m && (t.transactionName = m), y && (t.span = y), u.length && (t.breadcrumbs = [...t.breadcrumbs, ...u]), d.length && (t.fingerprint = [...t.fingerprint, ...d]), p.length && (t.eventProcessors = [...t.eventProcessors, ...p]), h.length && (t.attachments = [...t.attachments, ...h]), t.propagationContext = {
    ...t.propagationContext,
    ...f
  };
}
function G(t, e, n) {
  t[e] = tt(t[e], n, 1);
}
function cn(t, e) {
  const n = xr().getScopeData();
  return t && de(n, t.getScopeData()), e && de(n, e.getScopeData()), n;
}
function bs(t, e) {
  const {
    extra: n,
    tags: r,
    user: s,
    contexts: i,
    level: o,
    transactionName: a
  } = e;
  Object.keys(n).length && (t.extra = {
    ...n,
    ...t.extra
  }), Object.keys(r).length && (t.tags = {
    ...r,
    ...t.tags
  }), Object.keys(s).length && (t.user = {
    ...s,
    ...t.user
  }), Object.keys(i).length && (t.contexts = {
    ...i,
    ...t.contexts
  }), o && (t.level = o), a && t.type !== "transaction" && (t.transaction = a);
}
function _s(t, e) {
  const n = [...(t.breadcrumbs || []), ...e];
  t.breadcrumbs = n.length ? n : void 0;
}
function Is(t, e) {
  t.sdkProcessingMetadata = {
    ...t.sdkProcessingMetadata,
    ...e
  };
}
function Ts(t, e) {
  t.contexts = {
    trace: Fr(e),
    ...t.contexts
  }, t.sdkProcessingMetadata = {
    dynamicSamplingContext: Qr(e),
    ...t.sdkProcessingMetadata
  };
  const n = rn(e),
    r = lt(n).description;
  r && !t.transaction && t.type === "transaction" && (t.transaction = r);
}
function As(t, e) {
  t.fingerprint = t.fingerprint ? Array.isArray(t.fingerprint) ? t.fingerprint : [t.fingerprint] : [], e && (t.fingerprint = t.fingerprint.concat(e)), !t.fingerprint.length && delete t.fingerprint;
}
const Ns = "thismessage:/";
function ws(t) {
  return "isRelative" in t;
}
function Os(t, e) {
  const n = t.indexOf("://") <= 0 && t.indexOf("//") !== 0,
    r = n ? Ns : void 0;
  try {
    if ("canParse" in URL && !URL.canParse(t, r)) return;
    const s = new URL(t, r);
    return n ? {
      isRelative: n,
      pathname: s.pathname,
      search: s.search,
      hash: s.hash
    } : s;
  } catch {}
}
function lo(t) {
  if (!t) return {};
  const e = t.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
  if (!e) return {};
  const n = e[6] || "",
    r = e[8] || "";
  return {
    host: e[4],
    path: e[5],
    protocol: e[2],
    search: n,
    hash: r,
    relative: e[5] + n + r
  };
}
function xo(t, e = !0) {
  if (t.startsWith("data:")) {
    const n = t.match(/^data:([^;,]+)/),
      r = n ? n[1] : "text/plain",
      s = t.includes(";base64,"),
      i = t.indexOf(",");
    let o = "";
    if (e && i !== -1) {
      const a = t.slice(i + 1);
      o = a.length > 10 ? a.slice(0, 10) + "... [truncated]" : a;
    }
    return "data:" + r + (s ? ",base64" : "") + (o ? "," + o : "");
  }
  return t;
}
function ho(t, e) {
  const n = t.attributes ?? (t.attributes = {});
  Object.entries(e).forEach(([r, s]) => {
    s != null && !(r in n) && (n[r] = s);
  });
}
const St = 0,
  fe = 1,
  le = 2;
function Ft(t) {
  return new V(e => {
    e(t);
  });
}
function jt(t) {
  return new V((e, n) => {
    n(t);
  });
}
class V {
  constructor(e) {
    this._state = St, this._handlers = [], this._runExecutor(e);
  }
  then(e, n) {
    return new V((r, s) => {
      this._handlers.push([!1, i => {
        if (!e) r(i);else try {
          r(e(i));
        } catch (o) {
          s(o);
        }
      }, i => {
        if (!n) s(i);else try {
          r(n(i));
        } catch (o) {
          s(o);
        }
      }]), this._executeHandlers();
    });
  }
  catch(e) {
    return this.then(n => n, e);
  }
  finally(e) {
    return new V((n, r) => {
      let s, i;
      return this.then(o => {
        i = !1, s = o, e && e();
      }, o => {
        i = !0, s = o, e && e();
      }).then(() => {
        if (i) {
          r(s);
          return;
        }
        n(s);
      });
    });
  }
  _executeHandlers() {
    if (this._state === St) return;
    const e = this._handlers.slice();
    this._handlers = [], e.forEach(n => {
      n[0] || (this._state === fe && n[1](this._value), this._state === le && n[2](this._value), n[0] = !0);
    });
  }
  _runExecutor(e) {
    const n = (i, o) => {
        if (this._state === St) {
          if (K(o)) {
            o.then(r, s);
            return;
          }
          this._state = i, this._value = o, this._executeHandlers();
        }
      },
      r = i => {
        n(fe, i);
      },
      s = i => {
        n(le, i);
      };
    try {
      e(r, s);
    } catch (i) {
      s(i);
    }
  }
}
function Rs(t, e, n, r = 0) {
  try {
    const s = wt(e, n, t, r);
    return K(s) ? s : Ft(s);
  } catch (s) {
    return jt(s);
  }
}
function wt(t, e, n, r) {
  const s = n[r];
  if (!t || !s) return t;
  const i = s({
    ...t
  }, e);
  return x && i === null && l.log('Event processor "' + (s.id || "?") + '" dropped event'), K(i) ? i.then(o => wt(o, e, n, r + 1)) : wt(i, e, n, r + 1);
}
let I, xe, he, A;
function ks(t) {
  const e = g._sentryDebugIds,
    n = g._debugIds;
  if (!e && !n) return {};
  const r = e ? Object.keys(e) : [],
    s = n ? Object.keys(n) : [];
  if (A && r.length === xe && s.length === he) return A;
  xe = r.length, he = s.length, A = {}, !I && (I = {});
  const i = (o, a) => {
    for (const c of o) {
      const u = a[c],
        d = I == null ? void 0 : I[c];
      if (d && A && u) A[d[0]] = u, I && (I[c] = [d[0], u]);else if (u) {
        const p = t(c);
        for (let h = p.length - 1; h >= 0; h--) {
          const f = p[h],
            m = f == null ? void 0 : f.filename;
          if (m && A && I) {
            A[m] = u, I[c] = [m, u];
            break;
          }
        }
      }
    }
  };
  return e && i(r, e), n && i(s, n), A;
}
function Cs(t, e, n, r, s, i) {
  const {
      normalizeDepth: o = 3,
      normalizeMaxBreadth: a = 1e3
    } = t,
    c = {
      ...e,
      event_id: e.event_id || n.event_id || v(),
      timestamp: e.timestamp || Q()
    },
    u = n.integrations || t.integrations.map(E => E.name);
  Ds(c, t), Ms(c, u), s && s.emit("applyFrameMetadata", e), e.type === void 0 && Ps(c, t.stackParser);
  const d = js(r, n.captureContext);
  n.mechanism && Kn(c, n.mechanism);
  const p = s ? s.getEventProcessors() : [],
    h = cn(i, d),
    f = [...(n.attachments || []), ...h.attachments];
  f.length && (n.attachments = f), vs(c, h);
  const m = [...p, ...h.eventProcessors];
  return (n.data && n.data.__sentry__ === !0 ? Ft(c) : Rs(m, c, n)).then(E => (E && Ls(E), typeof o == "number" && o > 0 ? Fs(E, o, a) : E));
}
function Ds(t, e) {
  var a, c;
  const {
    environment: n,
    release: r,
    dist: s,
    maxValueLength: i
  } = e;
  t.environment = t.environment || n || Mt, !t.release && r && (t.release = r), !t.dist && s && (t.dist = s);
  const o = t.request;
  o != null && o.url && i && (o.url = bt(o.url, i)), i && ((c = (a = t.exception) == null ? void 0 : a.values) == null || c.forEach(u => {
    u.value && (u.value = bt(u.value, i));
  }));
}
function Ps(t, e) {
  var r, s;
  const n = ks(e);
  (s = (r = t.exception) == null ? void 0 : r.values) == null || s.forEach(i => {
    var o, a;
    (a = (o = i.stacktrace) == null ? void 0 : o.frames) == null || a.forEach(c => {
      c.filename && (c.debug_id = n[c.filename]);
    });
  });
}
function Ls(t) {
  var r, s;
  const e = {};
  if ((s = (r = t.exception) == null ? void 0 : r.values) == null || s.forEach(i => {
    var o, a;
    (a = (o = i.stacktrace) == null ? void 0 : o.frames) == null || a.forEach(c => {
      c.debug_id && (c.abs_path ? e[c.abs_path] = c.debug_id : c.filename && (e[c.filename] = c.debug_id), delete c.debug_id);
    });
  }), Object.keys(e).length === 0) return;
  t.debug_meta = t.debug_meta || {}, t.debug_meta.images = t.debug_meta.images || [];
  const n = t.debug_meta.images;
  Object.entries(e).forEach(([i, o]) => {
    n.push({
      type: "sourcemap",
      code_file: i,
      debug_id: o
    });
  });
}
function Ms(t, e) {
  e.length > 0 && (t.sdk = t.sdk || {}, t.sdk.integrations = [...(t.sdk.integrations || []), ...e]);
}
function Fs(t, e, n) {
  var s, i;
  if (!t) return null;
  const r = {
    ...t,
    ...(t.breadcrumbs && {
      breadcrumbs: t.breadcrumbs.map(o => ({
        ...o,
        ...(o.data && {
          data: T(o.data, e, n)
        })
      }))
    }),
    ...(t.user && {
      user: T(t.user, e, n)
    }),
    ...(t.contexts && {
      contexts: T(t.contexts, e, n)
    }),
    ...(t.extra && {
      extra: T(t.extra, e, n)
    })
  };
  return (s = t.contexts) != null && s.trace && r.contexts && (r.contexts.trace = t.contexts.trace, t.contexts.trace.data && (r.contexts.trace.data = T(t.contexts.trace.data, e, n))), t.spans && (r.spans = t.spans.map(o => ({
    ...o,
    ...(o.data && {
      data: T(o.data, e, n)
    })
  }))), (i = t.contexts) != null && i.flags && r.contexts && (r.contexts.flags = T(t.contexts.flags, 3, n)), r;
}
function js(t, e) {
  if (!e) return t;
  const n = t ? t.clone() : new b();
  return n.update(e), n;
}
function Us(t) {
  if (t) return Bs(t) ? {
    captureContext: t
  } : Hs(t) ? {
    captureContext: t
  } : t;
}
function Bs(t) {
  return t instanceof b || typeof t == "function";
}
const Gs = ["user", "level", "extra", "contexts", "tags", "fingerprint", "propagationContext"];
function Hs(t) {
  return Object.keys(t).some(e => Gs.includes(e));
}
function go(t, e) {
  return _().captureException(t, Us(e));
}
function mo(t, e) {
  return _().captureEvent(t, e);
}
function yo(t, e) {
  S().setContext(t, e);
}
function Eo(t) {
  S().setTags(t);
}
function So(t, e) {
  S().setTag(t, e);
}
function vo(t) {
  S().setUser(t);
}
function bo() {
  return S().lastEventId();
}
function _o(t) {
  S().addEventProcessor(t);
}
function Io(t) {
  const e = S(),
    {
      user: n
    } = cn(e, _()),
    {
      userAgent: r
    } = g.navigator || {},
    s = Qn({
      user: n,
      ...(r && {
        userAgent: r
      }),
      ...t
    }),
    i = e.getSession();
  return (i == null ? void 0 : i.status) === "ok" && P(i, {
    status: "exited"
  }), un(), e.setSession(s), s;
}
function un() {
  const t = S(),
    e = _(),
    n = e.getSession() || t.getSession();
  n && tr(n), pn(), t.setSession();
}
function pn() {
  const t = S(),
    e = j(),
    n = t.getSession();
  n && e && e.captureSession(n);
}
function To(t = !1) {
  if (t) {
    un();
    return;
  }
  pn();
}
const Ws = "7";
function dn(t) {
  const e = t.protocol ? t.protocol + ":" : "",
    n = t.port ? ":" + t.port : "";
  return e + "//" + t.host + n + (t.path ? "/" + t.path : "") + "/api/";
}
function zs(t) {
  return "" + dn(t) + t.projectId + "/envelope/";
}
function Vs(t, e) {
  const n = {
    sentry_version: Ws
  };
  return t.publicKey && (n.sentry_key = t.publicKey), e && (n.sentry_client = e.name + "/" + e.version), new URLSearchParams(n).toString();
}
function Ys(t, e, n) {
  return e || zs(t) + "?" + Vs(t, n);
}
function Ao(t, e) {
  const n = en(t);
  if (!n) return "";
  const r = dn(n) + "embed/error-page/";
  let s = "dsn=" + U(n);
  for (const i in e) if (i !== "dsn" && i !== "onClose") if (i === "user") {
    const o = e.user;
    if (!o) continue;
    o.name && (s += "&name=" + encodeURIComponent(o.name)), o.email && (s += "&email=" + encodeURIComponent(o.email));
  } else s += "&" + encodeURIComponent(i) + "=" + encodeURIComponent(e[i]);
  return r + "?" + s;
}
const ge = [];
function Js(t) {
  const e = {};
  return t.forEach(n => {
    const {
        name: r
      } = n,
      s = e[r];
    s && !s.isDefaultInstance && n.isDefaultInstance || (e[r] = n);
  }), Object.values(e);
}
function No(t) {
  const e = t.defaultIntegrations || [],
    n = t.integrations;
  e.forEach(s => {
    s.isDefaultInstance = !0;
  });
  let r;
  if (Array.isArray(n)) r = [...e, ...n];else if (typeof n == "function") {
    const s = n(e);
    r = Array.isArray(s) ? s : [s];
  } else r = e;
  return Js(r);
}
function $s(t, e) {
  const n = {};
  return e.forEach(r => {
    r != null && r["beforeSetup"] && r.beforeSetup(t);
  }), e.forEach(r => {
    r && fn(t, r, n);
  }), n;
}
function me(t, e) {
  for (const n of e) n != null && n["afterAllSetup"] && n.afterAllSetup(t);
}
function fn(t, e, n) {
  if (n[e.name]) {
    x && l.log("Integration skipped because it was already installed: " + e.name);
    return;
  }
  if (n[e.name] = e, !ge.includes(e.name) && typeof e.setupOnce == "function" && (e.setupOnce(), ge.push(e.name)), e.setup && typeof e.setup == "function" && e.setup(t), typeof e.preprocessEvent == "function") {
    const r = e.preprocessEvent.bind(e);
    t.on("preprocessEvent", (s, i) => r(s, i, t));
  }
  if (typeof e.processEvent == "function") {
    const r = e.processEvent.bind(e),
      s = Object.assign((i, o) => r(i, o, t), {
        id: e.name
      });
    t.addEventProcessor(s);
  }
  ["processSpan", "processSegmentSpan"].forEach(r => {
    const s = e[r];
    typeof s == "function" && t.on(r, i => s.call(e, i, t));
  }), x && l.log("Integration installed: " + e.name);
}
function wo(t) {
  return t;
}
function Ks() {
  return typeof __SENTRY_BROWSER_BUNDLE__ < "u" && !!__SENTRY_BROWSER_BUNDLE__;
}
function Oo() {
  return "npm";
}
function qs() {
  return !Ks() && Object.prototype.toString.call(typeof process < "u" ? process : 0) === "[object process]";
}
function Ut() {
  return typeof window < "u" && (!qs() || Xs());
}
function Xs() {
  const t = g.process;
  return (t == null ? void 0 : t.type) === "renderer";
}
function Zs(t, e) {
  const n = e ? "auto" : "never";
  return [{
    type: "log",
    item_count: t.length,
    content_type: "application/vnd.sentry.items.log+json"
  }, {
    version: 2,
    ...(Ut() && {
      ingest_settings: {
        infer_ip: n,
        infer_user_agent: n
      }
    }),
    items: t
  }];
}
function Qs(t, e, n, r, s) {
  const i = {};
  return e != null && e.sdk && (i.sdk = {
    name: e.sdk.name,
    version: e.sdk.version
  }), n && r && (i.dsn = U(r)), B(i, [Zs(t, s)]);
}
function ye(t, e) {
  const n = e ?? ti(t) ?? [];
  if (n.length === 0) return;
  const r = t.getOptions(),
    s = Qs(n, r._metadata, r.tunnel, t.getDsn(), r.sendDefaultPii);
  ln().set(t, []), t.emit("flushLogs"), t.sendEnvelope(s);
}
function ti(t) {
  return ln().get(t);
}
function ln() {
  return M("clientToLogBufferMap", () => new WeakMap());
}
function ei(t, e) {
  const n = e ? "auto" : "never";
  return [{
    type: "trace_metric",
    item_count: t.length,
    content_type: "application/vnd.sentry.items.trace-metric+json"
  }, {
    version: 2,
    ...(Ut() && {
      ingest_settings: {
        infer_ip: n,
        infer_user_agent: n
      }
    }),
    items: t
  }];
}
function ni(t, e, n, r, s) {
  const i = {};
  return e != null && e.sdk && (i.sdk = {
    name: e.sdk.name,
    version: e.sdk.version
  }), n && r && (i.dsn = U(r)), B(i, [ei(t, s)]);
}
function ri(t, e) {
  const n = e ?? si(t) ?? [];
  if (n.length === 0) return;
  const r = t.getOptions(),
    s = ni(n, r._metadata, r.tunnel, t.getDsn(), r.sendDefaultPii);
  xn().set(t, []), t.emit("flushMetrics"), t.sendEnvelope(s);
}
function si(t) {
  return xn().get(t);
}
function xn() {
  return M("clientToMetricBufferMap", () => new WeakMap());
}
function ii(t) {
  const e = {
    trace_id: t.trace_id,
    span_id: t.span_id,
    parent_span_id: t.parent_span_id,
    name: t.description || "",
    start_timestamp: t.start_timestamp,
    end_timestamp: t.timestamp || t.start_timestamp,
    status: !t.status || t.status === "ok" || t.status === "cancelled" ? "ok" : "error",
    is_segment: !1,
    attributes: {
      ...t.data
    },
    links: t.links
  };
  return Br(e);
}
function oi(t, e) {
  var i, o, a;
  if (t.type !== "transaction" || !((i = t.spans) != null && i.length) || !((o = t.sdkProcessingMetadata) != null && o["hasGenAiSpans"]) || !e.getOptions().streamGenAiSpans || Ss(e)) return;
  const n = [],
    r = [];
  for (const c of t.spans) (a = c.op) != null && a.startsWith("gen_ai.") ? n.push(ii(c)) : r.push(c);
  if (n.length === 0) return;
  t.spans = r;
  const s = e.getOptions().sendDefaultPii ? "auto" : "never";
  return [{
    type: "span",
    item_count: n.length,
    content_type: "application/vnd.sentry.items.span.v2+json"
  }, {
    version: 2,
    ...(Ut() && {
      ingest_settings: {
        infer_ip: s,
        infer_user_agent: s
      }
    }),
    items: n
  }];
}
function hn(t) {
  return typeof t == "object" && typeof t.unref == "function" && t.unref(), t;
}
const Bt = Symbol.for("SentryBufferFullError");
function gn(t = 100) {
  const e = new Set();
  function n() {
    return e.size < t;
  }
  function r(o) {
    e.delete(o);
  }
  function s(o) {
    if (!n()) return jt(Bt);
    const a = o();
    return e.add(a), a.then(() => r(a), () => r(a)), a;
  }
  function i(o) {
    if (!e.size) return Ft(!0);
    const a = Promise.allSettled(Array.from(e)).then(() => !0);
    if (!o) return a;
    const c = [a, new Promise(u => hn(setTimeout(() => u(!1), o)))];
    return Promise.race(c);
  }
  return {
    get $() {
      return Array.from(e);
    },
    add: s,
    drain: i
  };
}
const ai = 60000;
function ci(t, e = X()) {
  const n = parseInt("" + t, 10);
  if (!isNaN(n)) return n * 1000;
  const r = Date.parse("" + t);
  return isNaN(r) ? ai : r - e;
}
function ui(t, e) {
  return t[e] || t.all || 0;
}
function pi(t, e, n = X()) {
  return ui(t, e) > n;
}
function di(t, {
  statusCode: e,
  headers: n
}, r = X()) {
  const s = {
      ...t
    },
    i = n == null ? void 0 : n["x-sentry-rate-limits"],
    o = n == null ? void 0 : n["retry-after"];
  if (i) for (const a of i.trim().split(",")) {
    const [c, u,,, d] = a.split(":", 5),
      p = parseInt(c, 10),
      h = (isNaN(p) ? 60 : p) * 1e3;
    if (!u) s.all = r + h;else for (const f of u.split(";")) f === "metric_bucket" ? (!d || d.split(";").includes("custom")) && (s[f] = r + h) : s[f] = r + h;
  } else o ? s.all = r + ci(o, r) : e === 429 && (s.all = r + 60000);
  return s;
}
const mn = 64;
function Ro(t, e, n = gn(t.bufferSize || mn)) {
  let r = {};
  const s = o => n.drain(o);
  function i(o) {
    const a = [];
    if (At(o, (p, h) => {
      const f = pe(h);
      pi(r, f) ? t.recordDroppedEvent("ratelimit_backoff", f) : a.push(p);
    }), a.length === 0) return Promise.resolve({});
    const c = B(o[0], a),
      u = p => {
        if (ds(c, ["client_report"])) {
          x && l.warn("Dropping client report. Will not send outcomes (reason: " + p + ").");
          return;
        }
        At(c, (h, f) => {
          t.recordDroppedEvent(p, pe(f));
        });
      },
      d = () => e({
        body: fs(c)
      }).then(p => p.statusCode === 413 ? (x && l.error("Sentry responded with status code 413. Envelope was discarded due to exceeding size limits."), u("send_error"), p) : (x && p.statusCode !== void 0 && (p.statusCode < 200 || p.statusCode >= 300) && l.warn("Sentry responded with status code " + p.statusCode + " to sent event."), r = di(r, p), p), p => {
        throw u("network_error"), x && l.error("Encountered error running transport request:", p), p;
      });
    return n.add(d).then(p => p, p => {
      if (p === Bt) return x && l.error("Skipped sending event because buffer is full."), u("queue_overflow"), Promise.resolve({});
      throw p;
    });
  }
  return {
    send: i,
    flush: s
  };
}
function fi(t, e, n) {
  const r = [{
    type: "client_report"
  }, {
    timestamp: Q(),
    discarded_events: t
  }];
  return B(e ? {
    dsn: e
  } : {}, [r]);
}
function yn(t) {
  const e = [];
  t.message && e.push(t.message);
  try {
    const n = t.exception.values[t.exception.values.length - 1];
    n != null && n.value && (e.push(n.value), n.type && e.push(n.type + ": " + n.value));
  } catch {}
  return e;
}
function li(t) {
  var c;
  const {
    trace_id: e,
    parent_span_id: n,
    span_id: r,
    status: s,
    origin: i,
    data: o,
    op: a
  } = ((c = t.contexts) == null ? void 0 : c.trace) ?? {};
  return {
    data: o ?? {},
    description: t.transaction,
    op: a,
    parent_span_id: n,
    span_id: r ?? "",
    start_timestamp: t.start_timestamp ?? 0,
    status: s,
    timestamp: t.timestamp,
    trace_id: e ?? "",
    origin: i,
    profile_id: o == null ? void 0 : o[Xe],
    exclusive_time: o == null ? void 0 : o[Ze],
    measurements: t.measurements,
    is_segment: !0
  };
}
function xi(t) {
  return {
    type: "transaction",
    timestamp: t.timestamp,
    start_timestamp: t.start_timestamp,
    transaction: t.description,
    contexts: {
      trace: {
        trace_id: t.trace_id,
        span_id: t.span_id,
        parent_span_id: t.parent_span_id,
        op: t.op,
        status: t.status,
        origin: t.origin,
        data: {
          ...t.data,
          ...(t.profile_id && {
            [Xe]: t.profile_id
          }),
          ...(t.exclusive_time && {
            [Ze]: t.exclusive_time
          })
        }
      }
    },
    measurements: t.measurements
  };
}
const Ee = "Not capturing exception because it's already been captured.",
  Se = "Discarded session because of missing or non-string release",
  En = Symbol.for("SentryInternalError"),
  Sn = Symbol.for("SentryDoNotSendEventError"),
  hi = 5000;
function nt(t) {
  return {
    message: t,
    [En]: !0
  };
}
function vt(t) {
  return {
    message: t,
    [Sn]: !0
  };
}
function ve(t) {
  return !!t && typeof t == "object" && En in t;
}
function be(t) {
  return !!t && typeof t == "object" && Sn in t;
}
function _e(t, e, n, r, s) {
  let i = 0,
    o,
    a = !1;
  t.on(n, () => {
    i = 0, clearTimeout(o), a = !1;
  }), t.on(e, c => {
    i += r(c), i >= 800000 ? s(t) : !a && (a = !0, o = hn(setTimeout(() => {
      s(t);
    }, hi)));
  }), t.on("flush", () => {
    s(t);
  });
}
class ko {
  constructor(e) {
    var r, s, i;
    if (this._options = e, this._integrations = {}, this._numProcessing = 0, this._outcomes = {}, this._hooks = {}, this._eventProcessors = [], this._promiseBuffer = gn(((r = e.transportOptions) == null ? void 0 : r.bufferSize) ?? mn), e.dsn ? this._dsn = en(e.dsn) : x && l.warn("No DSN provided, client will not send events."), this._dsn) {
      const o = Ys(this._dsn, e.tunnel, e._metadata ? e._metadata.sdk : void 0);
      this._transport = e.transport({
        tunnel: this._options.tunnel,
        recordDroppedEvent: this.recordDroppedEvent.bind(this),
        ...e.transportOptions,
        url: o
      });
    }
    this._options.enableLogs = this._options.enableLogs ?? ((s = this._options._experiments) == null ? void 0 : s.enableLogs), this._options.enableLogs && _e(this, "afterCaptureLog", "flushLogs", Ei, ye), (this._options.enableMetrics ?? ((i = this._options._experiments) == null ? void 0 : i["enableMetrics"]) ?? !0) && _e(this, "afterCaptureMetric", "flushMetrics", yi, ri);
  }
  captureException(e, n, r) {
    const s = v();
    if ($t(e)) return x && l.log(Ee), s;
    const i = {
      event_id: s,
      ...n
    };
    return this._process(() => this.eventFromException(e, i).then(o => this._captureEvent(o, i, r)).then(o => o), "error"), i.event_id;
  }
  captureMessage(e, n, r, s) {
    const i = {
        event_id: v(),
        ...r
      },
      o = Ge(e) ? e : String(e),
      a = He(e),
      c = a ? this.eventFromMessage(o, n, i) : this.eventFromException(e, i);
    return this._process(() => c.then(u => this._captureEvent(u, i, s)), a ? "unknown" : "error"), i.event_id;
  }
  captureEvent(e, n, r) {
    const s = v();
    if (n != null && n["originalException"] && $t(n.originalException)) return x && l.log(Ee), s;
    const i = {
        event_id: s,
        ...n
      },
      o = e.sdkProcessingMetadata || {},
      a = o.capturedSpanScope,
      c = o.capturedSpanIsolationScope,
      u = Ie(e.type);
    return this._process(() => this._captureEvent(e, i, a || r, c), u), i.event_id;
  }
  captureSession(e) {
    this.sendSession(e), P(e, {
      init: !1
    });
  }
  getDsn() {
    return this._dsn;
  }
  getOptions() {
    return this._options;
  }
  getSdkMetadata() {
    return this._options._metadata;
  }
  getTransport() {
    return this._transport;
  }
  async flush(e) {
    const n = this._transport;
    if (this.emit("flush"), !n) return !0;
    const r = await this._isClientDoneProcessing(e),
      s = await n.flush(e);
    return r && s;
  }
  async close(e) {
    ye(this);
    const n = await this.flush(e);
    return this.getOptions().enabled = !1, this.emit("close"), n;
  }
  getEventProcessors() {
    return this._eventProcessors;
  }
  addEventProcessor(e) {
    this._eventProcessors.push(e);
  }
  init() {
    (this._isEnabled() || this._options.integrations.some(({
      name: e
    }) => e.startsWith("Spotlight"))) && this._setupIntegrations();
  }
  getIntegrationByName(e) {
    return this._integrations[e];
  }
  addIntegration(e) {
    const n = this._integrations[e.name];
    !n && e.beforeSetup && e.beforeSetup(this), fn(this, e, this._integrations), !n && me(this, [e]);
  }
  sendEvent(e, n = {}) {
    this.emit("beforeSendEvent", e, n);
    const r = oi(e, this);
    let s = Es(e, this._dsn, this._options._metadata, this._options.tunnel);
    for (const i of n.attachments || []) s = ue(s, xs(i));
    r && (s = ue(s, r)), this.sendEnvelope(s).then(i => this.emit("afterSendEvent", e, i));
  }
  sendSession(e) {
    const {
      release: n,
      environment: r = Mt
    } = this._options;
    if ("aggregates" in e) {
      const i = e.attrs || {};
      if (!i.release && !n) {
        x && l.warn(Se);
        return;
      }
      i.release = i.release || n, i.environment = i.environment || r, e.attrs = i;
    } else {
      if (!e.release && !n) {
        x && l.warn(Se);
        return;
      }
      e.release = e.release || n, e.environment = e.environment || r;
    }
    this.emit("beforeSendSession", e);
    const s = ys(e, this._dsn, this._options._metadata, this._options.tunnel);
    this.sendEnvelope(s);
  }
  recordDroppedEvent(e, n, r = 1) {
    if (this._options.sendClientReports) {
      const s = e + ":" + n;
      x && l.log('Recording outcome: "' + s + '"' + (r > 1 ? " (" + r + " times)" : "")), this._outcomes[s] = (this._outcomes[s] || 0) + r;
    }
  }
  on(e, n) {
    const r = this._hooks[e] = this._hooks[e] || new Set(),
      s = (...i) => n(...i);
    return r.add(s), () => {
      r.delete(s);
    };
  }
  emit(e, ...n) {
    const r = this._hooks[e];
    r && r.forEach(s => s(...n));
  }
  async sendEnvelope(e) {
    if (this.emit("beforeEnvelope", e), this._isEnabled() && this._transport) try {
      return await this._transport.send(e);
    } catch (n) {
      return x && l.error("Error while sending envelope:", n), {};
    }
    return x && l.error("Transport disabled"), {};
  }
  registerCleanup(e) {}
  dispose() {}
  _setupIntegrations() {
    const {
      integrations: e
    } = this._options;
    this._integrations = $s(this, e), me(this, e);
  }
  _updateSessionFromEvent(e, n) {
    var c, u;
    let r = n.level === "fatal",
      s = !1;
    const i = (c = n.exception) == null ? void 0 : c.values;
    if (i) {
      s = !0, r = !1;
      for (const d of i) if (((u = d.mechanism) == null ? void 0 : u.handled) === !1) {
        r = !0;
        break;
      }
    }
    const o = e.status === "ok";
    (o && e.errors === 0 || o && r) && (P(e, {
      ...(r && {
        status: "crashed"
      }),
      errors: e.errors || Number(s || r)
    }), this.captureSession(e));
  }
  async _isClientDoneProcessing(e) {
    let n = 0;
    for (; !e || n < e;) {
      if (await new Promise(r => setTimeout(r, 1)), !this._numProcessing) return !0;
      n++;
    }
    return !1;
  }
  _isEnabled() {
    return this.getOptions().enabled !== !1 && this._transport !== void 0;
  }
  _prepareEvent(e, n, r, s) {
    const i = this.getOptions(),
      o = Object.keys(this._integrations);
    return !n.integrations && o != null && o.length && (n.integrations = o), this.emit("preprocessEvent", e, n), !e.type && s.setLastEventId(e.event_id || n.event_id), Cs(i, e, n, r, this, s).then(a => {
      var u;
      if (a === null) return a;
      this.emit("postprocessEvent", a, n), a.contexts = {
        trace: {
          ...((u = a.contexts) == null ? void 0 : u.trace),
          ...hr(r)
        },
        ...a.contexts
      };
      const c = Zr(this, r);
      return a.sdkProcessingMetadata = {
        dynamicSamplingContext: c,
        ...a.sdkProcessingMetadata
      }, a;
    });
  }
  _captureEvent(e, n = {}, r = _(), s = S()) {
    return x && Ot(e) && l.log("Captured error event `" + (yn(e)[0] || "<unknown>") + "`"), this._processEvent(e, n, r, s).then(i => i.event_id, i => {
      x && (be(i) ? l.log(i.message) : ve(i) ? l.warn(i.message) : l.warn(i));
    });
  }
  _processEvent(e, n, r, s) {
    const i = this.getOptions(),
      {
        sampleRate: o
      } = i,
      a = vn(e),
      c = Ot(e),
      u = e.type || "error",
      d = "before send for type `" + u + "`",
      p = typeof o > "u" ? void 0 : Mr(o);
    if (c && typeof p == "number" && at() > p) return this.recordDroppedEvent("sample_rate", "error"), jt(vt("Discarding event because it's not included in the random sample (sampling rate = " + o + ")"));
    const h = Ie(e.type);
    return this._prepareEvent(e, n, r, s).then(f => {
      var O;
      if (f === null) throw this.recordDroppedEvent("event_processor", h), vt("An event processor returned `null`, will not send event.");
      if (((O = n.data) == null ? void 0 : O.__sentry__) === !0) return f;
      const y = mi(this, i, f, n);
      return gi(y, d);
    }).then(f => {
      var O;
      if (f === null) {
        if (this.recordDroppedEvent("before_send", h), a) {
          const E = e.spans || [],
            xt = 1 + E.length;
          this.recordDroppedEvent("before_send", "span", xt);
        }
        throw vt(d + " returned `null`, will not send event.");
      }
      const m = r.getSession() || s.getSession();
      if (c && m && this._updateSessionFromEvent(m, f), a) {
        const E = ((O = f.sdkProcessingMetadata) == null ? void 0 : O["spanCountBeforeProcessing"]) || 0,
          xt = f.spans ? f.spans.length : 0,
          Gt = E - xt;
        Gt > 0 && this.recordDroppedEvent("before_send", "span", Gt);
      }
      const y = f.transaction_info;
      if (a && y && f.transaction !== e.transaction) {
        const E = "custom";
        f.transaction_info = {
          ...y,
          source: E
        };
      }
      return this.sendEvent(f, n), f;
    }).then(null, f => {
      throw be(f) || ve(f) ? f : (this.captureException(f, {
        mechanism: {
          handled: !1,
          type: "internal"
        },
        data: {
          __sentry__: !0
        },
        originalException: f
      }), nt(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ` + f));
    });
  }
  _process(e, n) {
    this._numProcessing++, this._promiseBuffer.add(e).then(r => (this._numProcessing--, r), r => (this._numProcessing--, r === Bt && this.recordDroppedEvent("queue_overflow", n), r));
  }
  _clearOutcomes() {
    const e = this._outcomes;
    return this._outcomes = {}, Object.entries(e).map(([n, r]) => {
      const [s, i] = n.split(":");
      return {
        reason: s,
        category: i,
        quantity: r
      };
    });
  }
  _flushOutcomes() {
    x && l.log("Flushing outcomes...");
    const e = this._clearOutcomes();
    if (e.length === 0) {
      x && l.log("No outcomes to send");
      return;
    }
    if (!this._dsn) {
      x && l.log("No dsn provided, will not send outcomes");
      return;
    }
    x && l.log("Sending outcomes:", e);
    const n = fi(e, this._options.tunnel && U(this._dsn));
    this.sendEnvelope(n);
  }
}
function Ie(t) {
  return t === "replay_event" ? "replay" : t || "error";
}
function gi(t, e) {
  const n = e + " must return `null` or a valid event.";
  if (K(t)) return t.then(r => {
    if (!ot(r) && r !== null) throw nt(n);
    return r;
  }, r => {
    throw nt(e + " rejected with " + r);
  });
  if (!ot(t) && t !== null) throw nt(n);
  return t;
}
function mi(t, e, n, r) {
  const {
      beforeSend: s,
      beforeSendTransaction: i,
      ignoreSpans: o
    } = e,
    a = !ts(e.beforeSendSpan) && e.beforeSendSpan;
  let c = n;
  if (Ot(c) && s) return s(c, r);
  if (vn(c)) {
    if (a || o) {
      const u = li(c);
      if (o != null && o.length && ce({
        description: u.description,
        op: u.op,
        attributes: u.data
      }, o)) return null;
      if (a) {
        const d = a(u);
        d ? c = tt(n, xi(d)) : oe();
      }
      if (c.spans) {
        const d = [],
          p = c.spans;
        for (const f of p) {
          if (o != null && o.length && ce({
            description: f.description,
            op: f.op,
            attributes: f.data
          }, o)) {
            Kr(p, f);
            continue;
          }
          if (a) {
            const m = a(f);
            m ? d.push(m) : (oe(), d.push(f));
          } else d.push(f);
        }
        const h = c.spans.length - d.length;
        h && t.recordDroppedEvent("before_send", "span", h), c.spans = d;
      }
    }
    if (i) {
      if (c.spans) {
        const u = c.spans.length;
        c.sdkProcessingMetadata = {
          ...n.sdkProcessingMetadata,
          spanCountBeforeProcessing: u
        };
      }
      return i(c, r);
    }
  }
  return c;
}
function Ot(t) {
  return t.type === void 0;
}
function vn(t) {
  return t.type === "transaction";
}
function yi(t) {
  let e = 0;
  return t.name && (e += t.name.length * 2), e += 8, e + bn(t.attributes);
}
function Ei(t) {
  let e = 0;
  return t.message && (e += t.message.length * 2), e + bn(t.attributes);
}
function bn(t) {
  if (!t) return 0;
  let e = 0;
  return Object.values(t).forEach(n => {
    Array.isArray(n) ? e += n.length * Te(n[0]) : He(n) ? e += Te(n) : e += 100;
  }), e;
}
function Te(t) {
  return typeof t == "string" ? t.length * 2 : typeof t == "number" ? 8 : typeof t == "boolean" ? 4 : 0;
}
function Co(t, e) {
  e.debug === !0 && (x ? l.enable() : $(() => {
    console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.");
  })), _().update(e.initialScope);
  const r = new t(e);
  return Si(r), r.init(), r;
}
function Si(t) {
  _().setClient(t);
}
function Do(t, e) {
  const n = e == null ? void 0 : e.getDsn(),
    r = e == null ? void 0 : e.getOptions().tunnel;
  return bi(t, n) || vi(t, r);
}
function vi(t, e) {
  return e ? Ae(t) === Ae(e) : !1;
}
function bi(t, e) {
  const n = Os(t);
  return !n || ws(n) || !e ? !1 : _i(n.hostname, e.host) && /(^|&|\?)sentry_key=/.test(n.search);
}
function _i(t, e) {
  return t === e || e.length > 0 && t.endsWith("." + e);
}
function Ae(t) {
  return t[t.length - 1] === "/" ? t.slice(0, -1) : t;
}
function Po(t) {
  var e;
  "aggregates" in t ? ((e = t.attrs) == null ? void 0 : e.ip_address) === void 0 && (t.attrs = {
    ...t.attrs,
    ip_address: "{{auto}}"
  }) : t.ipAddress === void 0 && (t.ipAddress = "{{auto}}");
}
function Lo(t, e, n = [e], r = "npm") {
  const s = (t._metadata = t._metadata || {}).sdk = t._metadata.sdk || {};
  !s.name && (s.name = "sentry.javascript." + e, s.packages = n.map(i => ({
    name: r + ":@sentry/" + i,
    version: w
  })), s.version = w);
}
function Mo(t, e, n) {
  let r, s, i;
  const o = n != null && n.maxWait ? Math.max(n.maxWait, e) : 0,
    a = (n == null ? void 0 : n["setTimeoutImpl"]) || setTimeout;
  function c() {
    return u(), r = t(), r;
  }
  function u() {
    s !== void 0 && clearTimeout(s), i !== void 0 && clearTimeout(i), s = i = void 0;
  }
  function d() {
    return s !== void 0 || i !== void 0 ? c() : r;
  }
  function p() {
    return s && clearTimeout(s), s = a(c, e), o && i === void 0 && (i = a(c, o)), r;
  }
  return p.cancel = u, p.flush = d, p;
}
const Ii = 100;
function Fo(t, e) {
  const n = j(),
    r = S();
  if (!n) return;
  const {
    beforeBreadcrumb: s = null,
    maxBreadcrumbs: i = Ii
  } = n.getOptions();
  if (i <= 0) return;
  const o = Q(),
    a = {
      timestamp: o,
      ...t
    },
    c = s ? $(() => s(a, e)) : a;
  c !== null && (n.emit && n.emit("beforeAddBreadcrumb", c, e), r.addBreadcrumb(c, i));
}
let Ne;
const Ti = "FunctionToString",
  we = new WeakMap(),
  Ai = () => ({
    name: Ti,
    setupOnce() {
      Ne = Function.prototype.toString;
      try {
        Function.prototype.toString = function (...t) {
          const e = Yn(this),
            n = we.has(j()) && e !== void 0 ? e : this;
          return Ne.apply(n, t);
        };
      } catch {}
    },
    setup(t) {
      we.set(t, !0);
    }
  }),
  jo = Ai,
  Ni = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/, /^ResizeObserver loop completed with undelivered notifications.$/, /^Cannot redefine property: googletag$/, /^Can't find variable: gmo$/, /^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/, /can't redefine non-configurable property "solana"/, /vv\(\)\.getRestrictions is not a function/, /Can't find variable: _AutofillCallbackHandler/, /Object Not Found Matching Id:\d+, MethodName:simulateEvent/, /^Java exception was raised during method invocation$/],
  wi = "EventFilters",
  Oi = (t = {}) => {
    let e;
    return {
      name: wi,
      setup(n) {
        const r = n.getOptions();
        e = Oe(t, r);
      },
      processEvent(n, r, s) {
        if (!e) {
          const i = s.getOptions();
          e = Oe(t, i);
        }
        return Ri(n, e) ? null : n;
      }
    };
  },
  Uo = (t = {}) => ({
    ...Oi(t),
    name: "InboundFilters"
  });
function Oe(t = {}, e = {}) {
  return {
    allowUrls: [...(t.allowUrls || []), ...(e.allowUrls || [])],
    denyUrls: [...(t.denyUrls || []), ...(e.denyUrls || [])],
    ignoreErrors: [...(t.ignoreErrors || []), ...(e.ignoreErrors || []), ...(t.disableErrorDefaults ? [] : Ni)],
    ignoreTransactions: [...(t.ignoreTransactions || []), ...(e.ignoreTransactions || [])]
  };
}
function Ri(t, e) {
  if (t.type) {
    if (t.type === "transaction" && Ci(t, e.ignoreTransactions)) return x && l.warn("Event dropped due to being matched by `ignoreTransactions` option.\nEvent: " + k(t)), !0;
  } else {
    if (ki(t, e.ignoreErrors)) return x && l.warn("Event dropped due to being matched by `ignoreErrors` option.\nEvent: " + k(t)), !0;
    if (Mi(t)) return x && l.warn(`Event dropped due to not having an error message, error type or stacktrace.
Event: ` + k(t)), !0;
    if (Di(t, e.denyUrls)) return x && l.warn("Event dropped due to being matched by `denyUrls` option.\nEvent: " + k(t) + `.
Url: ` + ct(t)), !0;
    if (!Pi(t, e.allowUrls)) return x && l.warn("Event dropped due to not being matched by `allowUrls` option.\nEvent: " + k(t) + `.
Url: ` + ct(t)), !0;
  }
  return !1;
}
function ki(t, e) {
  return e != null && e.length ? yn(t).some(n => Z(n, e)) : !1;
}
function Ci(t, e) {
  if (!(e != null && e.length)) return !1;
  const n = t.transaction;
  return n ? Z(n, e) : !1;
}
function Di(t, e) {
  if (!(e != null && e.length)) return !1;
  const n = ct(t);
  return n ? Z(n, e) : !1;
}
function Pi(t, e) {
  if (!(e != null && e.length)) return !0;
  const n = ct(t);
  return n ? Z(n, e) : !0;
}
function Li(t = []) {
  for (let e = t.length - 1; e >= 0; e--) {
    const n = t[e];
    if (n && n.filename !== "<anonymous>" && n.filename !== "[native code]") return n.filename || null;
  }
  return null;
}
function ct(t) {
  var e, n;
  try {
    const r = [...(((e = t.exception) == null ? void 0 : e.values) ?? [])].reverse().find(i => {
        var o, a, c;
        return ((o = i.mechanism) == null ? void 0 : o.parent_id) === void 0 && ((c = (a = i.stacktrace) == null ? void 0 : a.frames) == null ? void 0 : c.length);
      }),
      s = (n = r == null ? void 0 : r.stacktrace) == null ? void 0 : n.frames;
    return s ? Li(s) : null;
  } catch {
    return x && l.error("Cannot extract url for event " + k(t)), null;
  }
}
function Mi(t) {
  var e, n;
  return (n = (e = t.exception) == null ? void 0 : e.values) != null && n.length ? !t.message && !t.exception.values.some(r => r.stacktrace || r.type && r.type !== "Error" || r.value) : !1;
}
function Bo(t, e, n, r, s, i) {
  var a;
  if (!((a = s.exception) != null && a.values) || !i || !N(i.originalException, Error)) return;
  const o = s.exception.values.length > 0 ? s.exception.values[s.exception.values.length - 1] : void 0;
  o && (s.exception.values = Rt(t, e, r, i.originalException, n, s.exception.values, o, 0));
}
function Rt(t, e, n, r, s, i, o, a) {
  if (i.length >= n + 1) return i;
  let c = [...i];
  if (N(r[s], Error)) {
    Re(o, a, r);
    const u = t(e, r[s]),
      d = c.length;
    ke(u, s, d, a), c = Rt(t, e, n, r[s], s, [u, ...c], u, d);
  }
  return _n(r) && r.errors.forEach((u, d) => {
    if (N(u, Error)) {
      Re(o, a, r);
      const p = t(e, u),
        h = c.length;
      ke(p, "errors[" + d + "]", h, a), c = Rt(t, e, n, u, s, [p, ...c], p, h);
    }
  }), c;
}
function _n(t) {
  return Array.isArray(t.errors);
}
function Re(t, e, n) {
  t.mechanism = {
    handled: !0,
    type: "auto.core.linked_errors",
    ...(_n(n) && {
      is_exception_group: !0
    }),
    ...t.mechanism,
    exception_id: e
  };
}
function ke(t, e, n, r) {
  t.mechanism = {
    handled: !0,
    ...t.mechanism,
    type: "chained",
    source: e,
    exception_id: n,
    parent_id: r
  };
}
function Fi(t) {
  return Pt(t) && "__sentry_fetch_url_host__" in t && typeof t.__sentry_fetch_url_host__ == "string";
}
function Go(t) {
  return Fi(t) ? t.message + " (" + t.__sentry_fetch_url_host__ + ")" : t.message;
}
const Ce = new Set([]);
function Ho(t) {
  const e = "console",
    n = pt(e, t);
  return dt(e, ji), n;
}
function ji() {
  "console" in g && An.forEach(function (t) {
    t in g.console && Ve(g.console, t, function (e) {
      return st[t] = e, function (...n) {
        const r = n[0],
          s = st[t],
          i = Ce.size && typeof r == "string" && Z(r, Ce);
        !i && C("console", {
          args: n,
          level: t
        }), (!i || x && l.isEnabled()) && (s == null || s.apply(g.console, n));
      };
    });
  });
}
function Wo(t) {
  return t === "warn" ? "warning" : ["fatal", "error", "warning", "log", "info", "debug"].includes(t) ? t : "log";
}
const Ui = "Dedupe",
  Bi = () => {
    let t;
    return {
      name: Ui,
      processEvent(e) {
        if (e.type) return e;
        try {
          if (Gi(e, t)) return x && l.warn("Event dropped due to being a duplicate of previously captured event."), null;
        } catch {}
        return t = e;
      }
    };
  },
  zo = Bi;
function Gi(t, e) {
  return e ? !!(Hi(t, e) || Wi(t, e)) : !1;
}
function Hi(t, e) {
  const n = t.message,
    r = e.message;
  return !(!n && !r || n && !r || !n && r || n !== r || !Tn(t, e) || !In(t, e));
}
function Wi(t, e) {
  const n = De(e),
    r = De(t);
  return !(!n || !r || n.type !== r.type || n.value !== r.value || !Tn(t, e) || !In(t, e));
}
function In(t, e) {
  let n = zt(t),
    r = zt(e);
  if (!n && !r) return !0;
  if (n && !r || !n && r || (n = n, r = r, r.length !== n.length)) return !1;
  for (let s = 0; s < r.length; s++) {
    const i = r[s],
      o = n[s];
    if (i.filename !== o.filename || i.lineno !== o.lineno || i.colno !== o.colno || i.function !== o.function) return !1;
  }
  return !0;
}
function Tn(t, e) {
  let n = t.fingerprint,
    r = e.fingerprint;
  if (!n && !r) return !0;
  if (n && !r || !n && r) return !1;
  n = n, r = r;
  try {
    return n.join("") === r.join("");
  } catch {
    return !1;
  }
}
function De(t) {
  var e, n;
  return (n = (e = t.exception) == null ? void 0 : e.values) == null ? void 0 : n[0];
}
const zi = "ConversationId",
  Vi = () => ({
    name: zi,
    setup(t) {
      t.on("spanStart", e => {
        const n = _().getScopeData(),
          r = S().getScopeData(),
          s = n.conversationId || r.conversationId;
        if (s) {
          const {
            op: i,
            data: o,
            description: a
          } = lt(e);
          if (!(i != null && i.startsWith("gen_ai.")) && !o["ai.operationId"] && !(a != null && a.startsWith("ai."))) return;
          e.setAttribute(vr, s);
        }
      });
    }
  }),
  Vo = Vi;
function Yo(t) {
  if (t !== void 0) return t >= 400 && t < 500 ? "warning" : t >= 500 ? "error" : void 0;
}
const Y = g;
function Jo() {
  return "history" in Y && !!Y.history;
}
function Yi() {
  if (!("fetch" in Y)) return !1;
  try {
    return new Headers(), new Request("data:,"), new Response(), !0;
  } catch {
    return !1;
  }
}
function Pe(t) {
  return t && /^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString());
}
function Ji() {
  var n;
  if (typeof EdgeRuntime == "string") return !0;
  if (!Yi()) return !1;
  if (Pe(Y.fetch)) return !0;
  let t = !1;
  const e = Y.document;
  if (e && typeof e.createElement == "function") try {
    const r = e.createElement("iframe");
    r.hidden = !0, e.head.appendChild(r), (n = r.contentWindow) != null && n.fetch && (t = Pe(r.contentWindow.fetch)), e.head.removeChild(r);
  } catch (r) {
    x && l.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", r);
  }
  return t;
}
function $o(t, e) {
  const n = "fetch",
    r = pt(n, t);
  return dt(n, () => $i(void 0, e)), r;
}
function $i(t, e = !1) {
  e && !Ji() || Ve(g, "fetch", function (n) {
    return function (...r) {
      const s = new Error(),
        {
          method: i,
          url: o
        } = Ki(r),
        a = {
          args: r,
          fetchData: {
            method: i,
            url: o
          },
          startTimestamp: D() * 1000,
          virtualError: s,
          headers: qi(r)
        };
      return C("fetch", {
        ...a
      }), n.apply(g, r).then(async c => (C("fetch", {
        ...a,
        endTimestamp: D() * 1000,
        response: c
      }), c), c => {
        C("fetch", {
          ...a,
          endTimestamp: D() * 1000,
          error: c
        }), Pt(c) && c.stack === void 0 && (c.stack = s.stack, z(c, "framesToPop", 1));
        const u = j(),
          d = (u == null ? void 0 : u.getOptions()["enhanceFetchErrorMessages"]) ?? "always";
        if (d !== !1 && c instanceof TypeError && (c.message === "Failed to fetch" || c.message === "Load failed" || c.message === "NetworkError when attempting to fetch resource.")) try {
          const h = new URL(a.fetchData.url),
            f = h.host;
          d === "always" ? c.message = c.message + " (" + f + ")" : z(c, "__sentry_fetch_url_host__", f);
        } catch {}
        throw c;
      });
    };
  });
}
function rt(t, e) {
  return !!t && typeof t == "object" && !!t[e];
}
function Le(t) {
  return typeof t == "string" ? t : t ? rt(t, "url") ? t.url : t.toString ? t.toString() : "" : "";
}
function Ki(t) {
  if (t.length === 0) return {
    method: "GET",
    url: ""
  };
  if (t.length === 2) {
    const [n, r] = t;
    return {
      url: Le(n),
      method: rt(r, "method") ? String(r.method).toUpperCase() : ze(n) && rt(n, "method") ? String(n.method).toUpperCase() : "GET"
    };
  }
  const e = t[0];
  return {
    url: Le(e),
    method: rt(e, "method") ? String(e.method).toUpperCase() : "GET"
  };
}
function qi(t) {
  const [e, n] = t;
  try {
    if (typeof n == "object" && n !== null && "headers" in n && n.headers) return new Headers(n.headers);
    if (ze(e)) return new Headers(e.headers);
  } catch {}
}
const Xi = g,
  Ko = (t = !0) => {
    var n, r;
    const e = (r = (n = Xi.performance) == null ? void 0 : n["getEntriesByType"]) == null ? void 0 : r.call(n, "navigation")[0];
    if (!t || e && e.responseStart > 0 && e.responseStart < performance.now()) return e;
  };
export { Oo as $, l as A, zo as B, ko as C, wo as D, oo as E, Ve as F, g as G, jo as H, fo as I, Yo as J, j as K, io as L, _ as M, Qr as N, k as O, je as P, No as Q, S as R, gr as S, so as T, Dn as U, Ko as V, Xi as W, Yn as X, Ao as Y, rn as Z, ye as _, ri as a, an as a0, Wn as a1, Uo as a2, Co as a3, Ut as a4, no as a5, ro as a6, Pt as a7, eo as a8, jn as a9, Io as aA, Z as aB, xo as aC, Jo as aD, D as aE, C as aF, di as aG, v as aH, po as aI, Pe as aa, Ge as ab, ot as ac, He as ad, pi as ae, Do as af, it as ag, bo as ah, gn as ai, Vn as aj, dt as ak, T as al, is as am, Mr as an, lo as ao, Cs as ap, Ft as aq, ao as ar, ho as as, yo as at, So as au, Eo as av, vo as aw, Wo as ax, lt as ay, Zi as az, Go as b, Po as c, Fo as d, Ho as e, _o as f, Kn as g, co as h, $o as i, Qi as j, to as k, pt as l, z as m, Bo as n, Lo as o, uo as p, mo as q, go as r, To as s, $ as t, Vo as u, B as v, gs as w, Pn as x, Ro as y, Mo as z };
