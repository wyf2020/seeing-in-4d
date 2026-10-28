import { bv as ne, bn as W, bK as ce, bD as be, g as oe, a5 as re, aj as he, b as le, d as pe, k as de, p as xe, q as fe, r as ge, w as ue, S as me, a3 as ke, a8 as _e, a9 as ve, aa as ye, ah as we, at as Ae, az as je, aC as Ce, aT as Fe, aU as Se, aX as Ee, aW as Re, a$ as Oe, b2 as ze, bt as Ge, a as qe, e as De, c as Pe, j as He, n as Be, u as Me, t as Le, v as Qe, O as We, P as Ke, U as Te, a1 as Je, a2 as Ne, a4 as Ue, ad as Ye, ai as Ve, aA as Xe, aV as Ie, aS as Ze, aZ as $e, b3 as et, bd as tt, be as at, bg as st, bh as it, b0 as nt, ab as ct, m as bt, br as ot, f as rt, G as ht, ax as lt, au as pt, bl as k, bm as O, s as C, aw as L, bk as z, y as dt, h as K, R as T, Q as J, bp as xt, ar as ft, as as gt, bb as Z, b9 as ut, b7 as mt, b8 as kt, b5 as _t, b6 as vt, ba as yt, aL as $, aI as wt, aJ as At, aK as jt, aM as Ct, aN as Ft, aP as St, aQ as Et, aO as Rt, b4 as Ot, aD as N, aE as U, z as D, a6 as Y } from "./C9ueuC1Q.js";
class E extends HTMLElement {
  constructor() {
    super(), this._readyPromise = new Promise(e => {
      this._readyResolve = e;
    });
  }
  get closestApp() {
    var e;
    return (e = this.parentElement) == null ? void 0 : e.closest("pc-app");
  }
  get closestEntity() {
    var e;
    return (e = this.parentElement) == null ? void 0 : e.closest("pc-entity");
  }
  _onReady() {
    this._readyResolve(), this.dispatchEvent(new CustomEvent("ready"));
  }
  ready() {
    return this._readyPromise.then(() => this);
  }
}
class zt extends HTMLElement {
  constructor() {
    super(), this.loadPromise = this.loadModule();
  }
  async loadModule() {
    const e = this.getAttribute("name"),
      a = this.getAttribute("glue"),
      t = this.getAttribute("wasm"),
      s = this.getAttribute("fallback"),
      b = {
        glueUrl: a,
        wasmUrl: t,
        fallbackUrl: s
      };
    e === "Basis" ? ne(b) : (W.setConfig(e, b), await new Promise(i => {
      W.getInstance(e, () => i());
    }));
  }
  getLoadPromise() {
    return this.loadPromise;
  }
}
customElements.define("pc-module", zt);
class Gt extends E {
  constructor() {
    super(), this._canvas = null, this._alpha = !0, this._backend = "webgl2", this._antialias = !0, this._depth = !0, this._stencil = !0, this._highResolution = !0, this._hierarchyReady = !1, this._picker = null, this._hasPointerListeners = {
      pointerenter: !1,
      pointerleave: !1,
      pointerdown: !1,
      pointerup: !1,
      pointermove: !1
    }, this._hoveredEntity = null, this._pointerHandlers = {
      pointermove: null,
      pointerdown: null,
      pointerup: null
    }, this.app = null, this._onWindowResize = this._onWindowResize.bind(this);
  }
  async connectedCallback() {
    const e = this.querySelectorAll(":scope > pc-module");
    await Promise.all(Array.from(e).map(d => d.getLoadPromise())), this._canvas = document.createElement("canvas"), this.appendChild(this._canvas);
    const a = ce(),
      t = {
        "webgpu-compute": ["webgpu-compute", "webgpu", "webgl2"],
        webgpu: ["webgpu", "webgl2"],
        webgl2: ["webgl2"],
        null: ["null"]
      },
      s = t[a],
      b = await be(this._canvas, {
        alpha: this._alpha,
        antialias: this._antialias,
        depth: this._depth,
        deviceTypes: s,
        stencil: this._stencil
      });
    b.maxPixelRatio = this._highResolution ? window.devicePixelRatio : 1;
    const i = new oe();
    i.graphicsDevice = b, i.keyboard = new re(window), i.mouse = new he(this._canvas), i.componentSystems = [le, pe, de, xe, fe, ge, ue, me, ke, _e, ve, ye, we, Ae, je, Ce, Fe, Se, Ee, Re, Oe, ze, Ge], i.resourceHandlers = [qe, De, Pe, He, Be, Me, Le, Qe, We, Ke, Te, Je, Ne, Ue, Ye, Ve, Xe, Ie, Ze, $e, et, tt, at, st, it], i.soundManager = new nt(), i.lightmapper = ct, i.batchManager = bt, i.xr = ot, this.app = new rt(this._canvas), this.app.init(i), this.app.setCanvasFillMode(ht), this.app.setCanvasResolution(lt), this._pickerCreate();
    const p = this.querySelectorAll(":scope > pc-asset");
    Array.from(p).forEach(d => {
      d.createAsset();
      const w = d.asset;
      w && this.app.assets.add(w);
    });
    const g = this.querySelectorAll(":scope > pc-material");
    Array.from(g).forEach(d => {
      d.createMaterial();
    });
    const x = this.querySelectorAll("pc-entity");
    Array.from(x).forEach(d => {
      d.createEntity(this.app);
    }), x.forEach(d => {
      d.buildHierarchy(this.app);
    }), this._hierarchyReady = !0, this.app.preload(() => {
      this.app.start(), window.addEventListener("resize", this._onWindowResize), this._onReady();
    });
  }
  disconnectedCallback() {
    this._pickerDestroy(), this.app && (this.app.destroy(), this.app = null), window.removeEventListener("resize", this._onWindowResize), this._canvas && this.contains(this._canvas) && (this.removeChild(this._canvas), this._canvas = null);
  }
  _onWindowResize() {
    this.app && this.app.resizeCanvas();
  }
  _pickerCreate() {
    const {
      width: e,
      height: a
    } = this.app.graphicsDevice;
    this._picker = new pt(this.app, e, a), this._pointerHandlers.pointermove = this._onPointerMove.bind(this), this._pointerHandlers.pointerdown = this._onPointerDown.bind(this), this._pointerHandlers.pointerup = this._onPointerUp.bind(this), ["pointermove", "pointerdown", "pointerup", "pointerenter", "pointerleave"].forEach(t => {
      this.addEventListener(t + ":connect", () => this._onPointerListenerAdded(t)), this.addEventListener(t + ":disconnect", () => this._onPointerListenerRemoved(t));
    });
  }
  _pickerDestroy() {
    this._canvas && Object.entries(this._pointerHandlers).forEach(([e, a]) => {
      a && this._canvas.removeEventListener(e, a);
    }), this._picker = null, this._pointerHandlers = {
      pointermove: null,
      pointerdown: null,
      pointerup: null
    };
  }
  _getPickerCoordinates(e) {
    const a = this._canvas.getBoundingClientRect(),
      t = this._canvas.width / a.width,
      s = this._canvas.height / a.height,
      b = (e.clientX - a.left) * t,
      i = (e.clientY - a.top) * s;
    return {
      x: b,
      y: i
    };
  }
  _onPointerMove(e) {
    if (!this._picker || !this.app) return;
    const a = this.app.root.findComponent("camera");
    if (!a) return;
    const {
      x: t,
      y: s
    } = this._getPickerCoordinates(e);
    this._picker.prepare(a, this.app.scene);
    const b = this._picker.getSelection(t, s);
    let i = null;
    if (b.length > 0) {
      let p = b[0].node;
      for (; p !== null;) {
        const g = this.querySelector('pc-entity[name="' + p.name + '"]');
        if (g) {
          i = g;
          break;
        }
        p = p.parent;
      }
    }
    this._hoveredEntity !== i && (this._hoveredEntity && this._hoveredEntity.hasListeners("pointerleave") && this._hoveredEntity.dispatchEvent(new PointerEvent("pointerleave", e)), i && i.hasListeners("pointerenter") && i.dispatchEvent(new PointerEvent("pointerenter", e))), this._hoveredEntity = i, i && i.hasListeners("pointermove") && i.dispatchEvent(new PointerEvent("pointermove", e));
  }
  _onPointerDown(e) {
    if (!this._picker || !this.app) return;
    const a = this.app.root.findComponent("camera");
    if (!a) return;
    const {
      x: t,
      y: s
    } = this._getPickerCoordinates(e);
    this._picker.prepare(a, this.app.scene);
    const b = this._picker.getSelection(t, s);
    if (b.length > 0) {
      let i = b[0].node;
      for (; i !== null;) {
        const p = this.querySelector('pc-entity[name="' + i.name + '"]');
        if (p && p.hasListeners("pointerdown")) {
          p.dispatchEvent(new PointerEvent("pointerdown", e));
          break;
        }
        i = i.parent;
      }
    }
  }
  _onPointerUp(e) {
    if (!this._picker || !this.app) return;
    const a = this.app.root.findComponent("camera");
    if (!a) return;
    const {
      x: t,
      y: s
    } = this._getPickerCoordinates(e);
    this._picker.prepare(a, this.app.scene);
    const b = this._picker.getSelection(t, s);
    if (b.length > 0) {
      const i = this.querySelector('pc-entity[name="' + b[0].node.name + '"]');
      i && i.hasListeners("pointerup") && i.dispatchEvent(new PointerEvent("pointerup", e));
    }
  }
  _onPointerListenerAdded(e) {
    if (!this._hasPointerListeners[e] && this._canvas) {
      this._hasPointerListeners[e] = !0;
      const a = e === "pointerenter" || e === "pointerleave" ? this._pointerHandlers.pointermove : this._pointerHandlers[e];
      a && this._canvas.addEventListener(e === "pointerenter" || e === "pointerleave" ? "pointermove" : e, a);
    }
  }
  _onPointerListenerRemoved(e) {
    if (!Array.from(this.querySelectorAll("pc-entity")).some(t => t.hasListeners(e)) && this._canvas) {
      this._hasPointerListeners[e] = !1;
      const t = e === "pointerenter" || e === "pointerleave" ? this._pointerHandlers.pointermove : this._pointerHandlers[e];
      t && this._canvas.removeEventListener(e === "pointerenter" || e === "pointerleave" ? "pointermove" : e, t);
    }
  }
  set alpha(e) {
    this._alpha = e;
  }
  get alpha() {
    return this._alpha;
  }
  set antialias(e) {
    this._antialias = e;
  }
  get antialias() {
    return this._antialias;
  }
  set backend(e) {
    this._backend = e;
  }
  get backend() {
    return this._backend;
  }
  set depth(e) {
    this._depth = e;
  }
  get depth() {
    return this._depth;
  }
  get hierarchyReady() {
    return this._hierarchyReady;
  }
  set highResolution(e) {
    this._highResolution = e, this.app && (this.app.graphicsDevice.maxPixelRatio = e ? window.devicePixelRatio : 1);
  }
  get highResolution() {
    return this._highResolution;
  }
  set stencil(e) {
    this._stencil = e;
  }
  get stencil() {
    return this._stencil;
  }
  static get observedAttributes() {
    return ["alpha", "antialias", "backend", "depth", "stencil", "high-resolution"];
  }
  attributeChangedCallback(e, a, t) {
    switch (e) {
      case "alpha":
        this.alpha = t !== "false";
        break;
      case "antialias":
        this.antialias = t !== "false";
        break;
      case "backend":
        (t === "webgpu" || t === "webgl2" || t === "null") && (this.backend = t);
        break;
      case "depth":
        this.depth = t !== "false";
        break;
      case "high-resolution":
        this.highResolution = t !== "false";
        break;
      case "stencil":
        this.stencil = t !== "false";
        break;
    }
  }
}
customElements.define("pc-app", Gt);
const qt = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkgrey: "#a9a9a9",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkslategrey: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370db",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#db7093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    rebeccapurple: "#663399",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
  },
  G = n => {
    const e = qt[n.toLowerCase()];
    if (e) return new C().fromString(e);
    if (n.startsWith("#")) return new C().fromString(n);
    const a = n.split(" ").map(Number);
    return new C(a);
  },
  Dt = n => {
    const [e, a, t] = n.split(" ").map(Number),
      s = new L();
    return s.setFromEulerAngles(e, a, t), s;
  },
  P = n => {
    const e = n.split(" ").map(Number);
    return new z(e);
  },
  m = n => {
    const e = n.split(" ").map(Number);
    return new k(e);
  },
  H = n => {
    const e = n.split(" ").map(Number);
    return new O(e);
  };
class Pt extends E {
  constructor() {
    super(...arguments), this._enabled = !0, this._name = "Untitled", this._position = new k(), this._rotation = new k(), this._scale = new k(1, 1, 1), this._tags = [], this._listeners = {}, this.entity = null;
  }
  createEntity(e) {
    this.entity = new dt(this.getAttribute("name") || this._name, e);
    const a = this.getAttribute("enabled");
    a && (this.entity.enabled = a !== "false");
    const t = this.getAttribute("position");
    t && this.entity.setLocalPosition(m(t));
    const s = this.getAttribute("rotation");
    s && this.entity.setLocalEulerAngles(m(s));
    const b = this.getAttribute("scale");
    b && this.entity.setLocalScale(m(b));
    const i = this.getAttribute("tags");
    i && this.entity.tags.add(i.split(",").map(g => g.trim())), ["onpointerenter", "onpointerleave", "onpointerdown", "onpointerup", "onpointermove"].forEach(g => {
      const x = this.getAttribute(g);
      if (x) {
        const d = g.substring(2),
          w = F => {
            try {
              new Function("event", x).call(this, F);
            } catch (q) {
              console.error("Error in event handler:", q);
            }
          };
        this.addEventListener(d, w);
      }
    });
  }
  buildHierarchy(e) {
    if (!this.entity) return;
    const a = this.closestEntity;
    a != null && a.entity ? a.entity.addChild(this.entity) : e.root.addChild(this.entity), this._onReady();
  }
  connectedCallback() {
    const e = this.closestApp;
    if (e && e.hierarchyReady) {
      const a = e.app;
      this.createEntity(a), this.buildHierarchy(a);
      const t = this.querySelectorAll("pc-entity");
      t.forEach(s => {
        s.createEntity(a);
      }), t.forEach(s => {
        s.buildHierarchy(a);
      });
    }
  }
  disconnectedCallback() {
    this.entity && (this.querySelectorAll("pc-entity").forEach(a => {
      a.entity = null;
    }), this.entity.destroy(), this.entity = null);
  }
  set enabled(e) {
    this._enabled = e, this.entity && (this.entity.enabled = e);
  }
  get enabled() {
    return this._enabled;
  }
  set name(e) {
    this._name = e, this.entity && (this.entity.name = e);
  }
  get name() {
    return this._name;
  }
  set position(e) {
    this._position = e, this.entity && this.entity.setLocalPosition(this._position);
  }
  get position() {
    return this._position;
  }
  set rotation(e) {
    this._rotation = e, this.entity && this.entity.setLocalEulerAngles(this._rotation);
  }
  get rotation() {
    return this._rotation;
  }
  set scale(e) {
    this._scale = e, this.entity && this.entity.setLocalScale(this._scale);
  }
  get scale() {
    return this._scale;
  }
  set tags(e) {
    this._tags = e, this.entity && (this.entity.tags.clear(), this.entity.tags.add(this._tags));
  }
  get tags() {
    return this._tags;
  }
  static get observedAttributes() {
    return ["enabled", "name", "position", "rotation", "scale", "tags", "onpointerenter", "onpointerleave", "onpointerdown", "onpointerup", "onpointermove"];
  }
  attributeChangedCallback(e, a, t) {
    switch (e) {
      case "enabled":
        this.enabled = t !== "false";
        break;
      case "name":
        this.name = t;
        break;
      case "position":
        this.position = m(t);
        break;
      case "rotation":
        this.rotation = m(t);
        break;
      case "scale":
        this.scale = m(t);
        break;
      case "tags":
        this.tags = t.split(",").map(s => s.trim());
        break;
      case "onpointerenter":
      case "onpointerleave":
      case "onpointerdown":
      case "onpointerup":
      case "onpointermove":
        if (t) {
          const s = e.substring(2),
            b = i => {
              try {
                const p = this.getAttribute(s) || "";
                new Function("event", p).call(this, i);
              } catch (p) {
                console.error("Error in event handler:", p);
              }
            };
          this.addEventListener(s, b);
        }
        break;
    }
  }
  addEventListener(e, a, t) {
    !this._listeners[e] && (this._listeners[e] = []), this._listeners[e].push(a), super.addEventListener(e, a, t), e.startsWith("pointer") && this.dispatchEvent(new CustomEvent(e + ":connect", {
      bubbles: !0
    }));
  }
  removeEventListener(e, a, t) {
    this._listeners[e] && (this._listeners[e] = this._listeners[e].filter(s => s !== a)), super.removeEventListener(e, a, t), e.startsWith("pointer") && this.dispatchEvent(new CustomEvent(e + ":disconnect", {
      bubbles: !0
    }));
  }
  hasListeners(e) {
    var a;
    return !!((a = this._listeners[e]) != null && a.length);
  }
}
customElements.define("pc-entity", Pt);
var V = function () {
  const n = function () {
    let h = !0;
    return function (o, r) {
      const c = h ? function () {
        if (r) {
          const l = r.apply(o, arguments);
          return r = null, l;
        }
      } : function () {};
      return h = !1, c;
    };
  }();
  var e = "b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q;iekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq:P8Yqdbk;3sezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhDcbhqinaqae9pmeaDaeaq9RaqaDfae6Egkcsfgocl4cifcd4hxdndndndnaoc9WGgmTmbcbhPcehsawcjdfhzalhHinaraH9Rax6midnaraHaxfgl9RcK6mbczhoinawcj;cbfaogifgoc9WfhOdndndndndnaHaic9WfgAco4fRbbaAci4coG4ciGPlbedibkaO9cb83ibaOcwf9cb83ibxikaOalRblalRbbgAco4gCaCciSgCE86bbaocGfalclfaCfgORbbaAcl4ciGgCaCciSgCE86bbaocVfaOaCfgORbbaAcd4ciGgCaCciSgCE86bbaoc7faOaCfgORbbaAciGgAaAciSgAE86bbaoctfaOaAfgARbbalRbegOco4gCaCciSgCE86bbaoc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc93faAaCfgARbbaOciGgOaOciSgOE86bbaoc94faAaOfgARbbalRbdgOco4gCaCciSgCE86bbaoc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc97faAaCfgARbbaOciGgOaOciSgOE86bbaoc98faAaOfgORbbalRbiglco4gAaAciSgAE86bbaoc99faOaAfgORbbalcl4ciGgAaAciSgAE86bbaoc9:faOaAfgORbbalcd4ciGgAaAciSgAE86bbaocufaOaAfgoRbbalciGglalciSglE86bbaoalfhlxdkaOalRbwalRbbgAcl4gCaCcsSgCE86bbaocGfalcwfaCfgORbbaAcsGgAaAcsSgAE86bbaocVfaOaAfgORbbalRbegAcl4gCaCcsSgCE86bbaoc7faOaCfgORbbaAcsGgAaAcsSgAE86bbaoctfaOaAfgORbbalRbdgAcl4gCaCcsSgCE86bbaoc91faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc4faOaAfgORbbalRbigAcl4gCaCcsSgCE86bbaoc93faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc94faOaAfgORbbalRblgAcl4gCaCcsSgCE86bbaoc95faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc96faOaAfgORbbalRbvgAcl4gCaCcsSgCE86bbaoc97faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc98faOaAfgORbbalRbogAcl4gCaCcsSgCE86bbaoc99faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc9:faOaAfgORbbalRbrglcl4gAaAcsSgAE86bbaocufaOaAfgoRbbalcsGglalcsSglE86bbaoalfhlxekaOal8Pbb83bbaOcwfalcwf8Pbb83bbalczfhlkdnaiam9pmbaiczfhoaral9RcL0mekkaiam6mialTmidnakTmbawaPfRbbhOcbhoazhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkkazcefhzaPcefgPad6hsalhHaPad9hmexvkkcbhlasceGmdxikalaxad2fhCdnakTmbcbhHcehsawcjdfhminaral9Rax6mialTmdalaxfhlawaHfRbbhOcbhoamhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkamcefhmaHcefgHad6hsaHad9hmbkaChlxikcbhocehsinaral9Rax6mdalTmealaxfhlaocefgoad6hsadao9hmbkaChlxdkcbhlasceGTmekc9:hoxikabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqalmbkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;ebf8Kjjjjbaok;yzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;siliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabavcefciGaiVcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:Ohkxekcjjjj94hkkabavcdfciGaiVcetfak87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:Ohqxekcjjjj94hqkabavcufciGaiVcetfaq87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohqxekcjjjj94hqkabavciGaiVcetfaq87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2geTmbinababydbgdcwtcw91:Yadce91cjjj;8ifcjjj98G::NUdbabclfhbaecufgembkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaiczfhiaeczfheadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklz9Kbb",
    a = "b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q;Aekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq;t9tqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk;h8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhwcbhDinaDae9pmeawaeaD9RaDawfae6Egqcsfgoc9WGgkci2hxakcethmaocl4cifcd4hPabaDad2fhscbhzdnincehHalhOcbhAdninaraO9RaP6miavcj;cbfaAak2fhCaOaPfhlcbhidnakc;ab6mbaral9Rc;Gb6mbcbhoinaCaofhidndndndndnaOaoco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklbalczfhlkdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklzalczfhlkdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklaalczfhlkdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalclfaYpQbfaXc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalcwfaYpQbfaXc:q:yjjbfRbbfhlxekaialpbbbpkl8Walczfhlkaoc;abfhiaocjefak0meaihoaral9Rc;Fb0mbkkdndnaiak9pmbaici4hoinaral9RcK6mdaCaifhXdndndndndnaOaico4fRbbaocoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpklbxikaXalpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaXalpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaXalpbbbpklbalczfhlkaocdfhoaiczfgiak6mbkkalTmbaAci6hHalhOaAcefgohAaoclSmdxekkcbhlaHceGmdkdnakTmbavcjdfazfhiavazfpbdbhYcbhXinaiavcj;cbfaXfgopblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLaoakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEaoamfpblbg3cep9Ta3aQp9op9Hp9rg3aoaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfhiaXczfgXak6mbkkazclfgzad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfhDc9:hoalmexikkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk;uzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:EPliuo97eue978Jjjjjbca9Rhidndnadcl9hmbdnaec98GglTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalae9pmeaiaeciGgvcdtgdVcbczad9R;8kbaiabalcdtfglad;8qbbdnavTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkalaiad;8qbbskdnaec98GgxTmbcbhvabhdinadczfglalpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oawaopmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgvax6mbkkaxae9pmbaiaeciGgvcitgdfcbcaad9R;8kbaiabaxcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oawaopmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalae9pmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbhdabheinaeaepbbbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepkbbaeczfheadclfgdav6mbkkdnaval9pmbaialciGgdcdtgeVcbc;abae9R;8kbaiabavcdtfgvae;8qbbdnadTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepklbkavaiae;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz9Tbb",
    t = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 3, 2, 0, 0, 5, 3, 1, 0, 1, 12, 1, 0, 10, 22, 2, 12, 0, 65, 0, 65, 0, 65, 0, 252, 10, 0, 0, 11, 7, 0, 65, 0, 253, 15, 26, 11]),
    s = new Uint8Array([32, 0, 65, 2, 1, 106, 34, 33, 3, 128, 11, 4, 13, 64, 6, 253, 10, 7, 15, 116, 127, 5, 8, 12, 40, 16, 19, 54, 20, 9, 27, 255, 113, 17, 42, 67, 24, 23, 146, 148, 18, 14, 22, 45, 70, 69, 56, 114, 101, 21, 25, 63, 75, 136, 108, 28, 118, 29, 73, 115]);
  if (typeof WebAssembly != "object") return {
    supported: !1
  };
  var b = WebAssembly.validate(t) ? a : e,
    i,
    p = WebAssembly.instantiate(g(b), {}).then(function (h) {
      i = h.instance, i.exports.__wasm_call_ctors();
    });
  function g(h) {
    for (var r = new Uint8Array(h.length), c = 0; c < h.length; ++c) {
      var l = h.charCodeAt(c);
      r[c] = l > 96 ? l - 97 : l > 64 ? l - 39 : l + 4;
    }
    for (var f = 0, c = 0; c < h.length; ++c) r[f++] = r[c] < 60 ? s[r[c]] : (r[c] - 60) * 64 + r[++c];
    return r.buffer.slice(0, f);
  }
  function x(h, o, r, c, l, f) {
    var u = i.exports.sbrk,
      S = r + 3 & -4,
      A = u(S * c),
      y = u(l.length),
      j = new Uint8Array(i.exports.memory.buffer);
    j.set(l, y);
    var R = h(A, r, c, y, l.length);
    if (R == 0 && f && f(A, S, c), o.set(j.subarray(A, A + r * c)), u(A - u(0)), R != 0) throw new Error("Malformed buffer data: " + R);
  }
  var d = {
      NONE: "",
      OCTAHEDRAL: "meshopt_decodeFilterOct",
      QUATERNION: "meshopt_decodeFilterQuat",
      EXPONENTIAL: "meshopt_decodeFilterExp"
    },
    w = {
      ATTRIBUTES: "meshopt_decodeVertexBuffer",
      TRIANGLES: "meshopt_decodeIndexBuffer",
      INDICES: "meshopt_decodeIndexSequence"
    },
    F = [],
    q = 0;
  function te(h) {
    var o = {
      object: new Worker(h),
      pending: 0,
      requests: {}
    };
    return o.object.onmessage = function (r) {
      var c = r.data;
      o.pending -= c.count, o.requests[c.id][c.action](c.value), delete o.requests[c.id];
    }, o;
  }
  function ae(h) {
    for (var o = "var instance; var ready = WebAssembly.instantiate(new Uint8Array([" + new Uint8Array(g(b)) + "]), {}).then(function(result) { instance = result.instance; instance.exports.__wasm_call_ctors(); });self.onmessage = workerProcess;" + x.toString() + ie.toString(), r = new Blob([o], {
        type: "text/javascript"
      }), c = URL.createObjectURL(r), l = 0; l < h; ++l) F[l] = te(c);
    URL.revokeObjectURL(c);
  }
  function se(h, o, r, c, l) {
    for (var f = F[0], u = 1; u < F.length; ++u) F[u].pending < f.pending && (f = F[u]);
    return new Promise(function (S, A) {
      var y = new Uint8Array(r),
        j = q++;
      f.pending += h, f.requests[j] = {
        resolve: S,
        reject: A
      }, f.object.postMessage({
        id: j,
        count: h,
        size: o,
        source: y,
        mode: c,
        filter: l
      }, [y.buffer]);
    });
  }
  function ie(h) {
    p.then(function () {
      var o = h.data;
      try {
        var r = new Uint8Array(o.count * o.size);
        x(i.exports[o.mode], r, o.count, o.size, o.source, i.exports[o.filter]), self.postMessage({
          id: o.id,
          count: o.count,
          action: "resolve",
          value: r
        }, [r.buffer]);
      } catch (c) {
        self.postMessage({
          id: o.id,
          count: o.count,
          action: "reject",
          value: c
        });
      }
    });
  }
  return {
    ready: p,
    supported: !0,
    useWorkers: function (h) {
      ae(h);
    },
    decodeVertexBuffer: function (h, o, r, c, l) {
      x(i.exports.meshopt_decodeVertexBuffer, h, o, r, c, i.exports[d[l]]);
    },
    decodeIndexBuffer: function (h, o, r, c) {
      x(i.exports.meshopt_decodeIndexBuffer, h, o, r, c);
    },
    decodeIndexSequence: function (h, o, r, c) {
      x(i.exports.meshopt_decodeIndexSequence, h, o, r, c);
    },
    decodeGltfBuffer: function (h, o, r, c, l, f) {
      x(i.exports[w[l]], h, o, r, c, i.exports[d[f]]);
    },
    decodeGltfBufferAsync: function (h, o, r, c, l) {
      return F.length > 0 ? se(h, o, r, w[c], d[l]) : p.then(function () {
        var f = new Uint8Array(h * o);
        return x(i.exports[w[c]], f, h, o, r, i.exports[d[l]]), f;
      });
    }
  };
}();
const Ht = new Map([["bin", "binary"], ["css", "css"], ["frag", "shader"], ["glb", "container"], ["glsl", "shader"], ["hdr", "texture"], ["html", "html"], ["jpg", "texture"], ["js", "script"], ["json", "json"], ["mp3", "audio"], ["mjs", "script"], ["ply", "gsplat"], ["png", "texture"], ["txt", "text"], ["vert", "shader"], ["webp", "texture"]]),
  Bt = (n, e, a) => {
    if (n.extensions && n.extensions.EXT_meshopt_compression) {
      const t = n.extensions.EXT_meshopt_compression;
      Promise.all([V.ready, e[t.buffer]]).then(s => {
        const b = s[1],
          i = t.byteOffset || 0,
          p = t.byteLength || 0,
          g = t.count,
          x = t.byteStride,
          d = new Uint8Array(g * x),
          w = new Uint8Array(b.buffer, b.byteOffset + i, p);
        V.decodeGltfBuffer(d, g, x, w, t.mode, t.filter), a(null, d);
      });
    } else a(null, null);
  };
class _ extends HTMLElement {
  constructor() {
    super(...arguments), this._lazy = !1, this.asset = null;
  }
  disconnectedCallback() {
    this.destroyAsset();
  }
  createAsset() {
    const e = this.getAttribute("id") || "",
      a = this.getAttribute("src") || "";
    let t = this.getAttribute("type");
    if (!t) {
      const s = a.split(".").pop();
      t = Ht.get(s || "") ?? null;
    }
    if (!t) {
      console.warn("Unsupported asset type: " + a);
      return;
    }
    t === "container" ? this.asset = new K(e, t, {
      url: a
    }, void 0, {
      bufferView: {
        processAsync: Bt.bind(this)
      }
    }) : this.asset = new K(e, t, {
      url: a
    }), this.asset.preload = !this._lazy;
  }
  destroyAsset() {
    this.asset && (this.asset.unload(), this.asset = null);
  }
  set lazy(e) {
    this._lazy = e, this.asset && (this.asset.preload = !e);
  }
  get lazy() {
    return this._lazy;
  }
  static get(e) {
    const a = document.querySelector('pc-asset[id="' + e + '"]');
    return a == null ? void 0 : a.asset;
  }
  static get observedAttributes() {
    return ["lazy"];
  }
  attributeChangedCallback(e, a, t) {
    e === "lazy" && (this.lazy = this.hasAttribute("lazy"));
  }
}
customElements.define("pc-asset", _);
class v extends E {
  constructor(e) {
    super(), this._enabled = !0, this._component = null, this._componentName = e;
  }
  getInitialComponentData() {
    return {};
  }
  async addComponent() {
    const e = this.closestEntity;
    if (e) {
      await e.ready();
      const a = this.getInitialComponentData();
      this._component = e.entity.addComponent(this._componentName, a);
    }
  }
  initComponent() {}
  async connectedCallback() {
    var e;
    await ((e = this.closestApp) == null ? void 0 : e.ready()), await this.addComponent(), this.initComponent(), this._onReady();
  }
  disconnectedCallback() {
    this.component && this.component.entity && (this._component.entity.removeComponent(this._componentName), this._component = null);
  }
  get component() {
    return this._component;
  }
  set enabled(e) {
    this._enabled = e, this.component && (this.component.enabled = e);
  }
  get enabled() {
    return this._enabled;
  }
  static get observedAttributes() {
    return ["enabled"];
  }
  attributeChangedCallback(e, a, t) {
    switch (e) {
      case "enabled":
        this.enabled = t !== "false";
        break;
    }
  }
}
class Mt extends v {
  constructor() {
    super("audiolistener");
  }
  get component() {
    return super.component;
  }
}
customElements.define("pc-listener", Mt);
const X = new Map([["none", Z], ["linear", ut], ["filmic", mt], ["hejl", kt], ["aces", _t], ["aces2", vt], ["neutral", yt]]);
class Lt extends v {
  constructor() {
    super("camera"), this._clearColor = new C(0.75, 0.75, 0.75, 1), this._clearColorBuffer = !0, this._clearDepthBuffer = !0, this._clearStencilBuffer = !1, this._cullFaces = !0, this._farClip = 1000, this._flipFaces = !1, this._fov = 45, this._frustumCulling = !0, this._gamma = "srgb", this._horizontalFov = !1, this._nearClip = 0.1, this._orthographic = !1, this._orthoHeight = 10, this._priority = 0, this._rect = new O(0, 0, 1, 1), this._scissorRect = new O(0, 0, 1, 1), this._tonemap = "none";
  }
  getInitialComponentData() {
    return {
      clearColor: this._clearColor,
      clearColorBuffer: this._clearColorBuffer,
      clearDepthBuffer: this._clearDepthBuffer,
      clearStencilBuffer: this._clearStencilBuffer,
      cullFaces: this._cullFaces,
      farClip: this._farClip,
      flipFaces: this._flipFaces,
      fov: this._fov,
      frustumCulling: this._frustumCulling,
      gammaCorrection: this._gamma === "srgb" ? T : J,
      horizontalFov: this._horizontalFov,
      nearClip: this._nearClip,
      orthographic: this._orthographic,
      orthoHeight: this._orthoHeight,
      priority: this._priority,
      rect: this._rect,
      scissorRect: this._scissorRect,
      toneMapping: X.get(this._tonemap)
    };
  }
  get xrAvailable() {
    var a;
    const e = (a = this.component) == null ? void 0 : a.system.app.xr;
    return e && e.supported && e.isAvailable(xt);
  }
  startXr(e, a) {
    this.component && this.xrAvailable && this.component.startXr(e, a, {
      callback: t => {
        t && console.error("WebXR Immersive VR failed to start: " + t.message);
      }
    });
  }
  endXr() {
    this.component && this.component.endXr();
  }
  get component() {
    return super.component;
  }
  set clearColor(e) {
    this._clearColor = e, this.component && (this.component.clearColor = e);
  }
  get clearColor() {
    return this._clearColor;
  }
  set clearColorBuffer(e) {
    this._clearColorBuffer = e, this.component && (this.component.clearColorBuffer = e);
  }
  get clearColorBuffer() {
    return this._clearColorBuffer;
  }
  set clearDepthBuffer(e) {
    this._clearDepthBuffer = e, this.component && (this.component.clearDepthBuffer = e);
  }
  get clearDepthBuffer() {
    return this._clearDepthBuffer;
  }
  set clearStencilBuffer(e) {
    this._clearStencilBuffer = e, this.component && (this.component.clearStencilBuffer = e);
  }
  get clearStencilBuffer() {
    return this._clearStencilBuffer;
  }
  set cullFaces(e) {
    this._cullFaces = e, this.component && (this.component.cullFaces = e);
  }
  get cullFaces() {
    return this._cullFaces;
  }
  set farClip(e) {
    this._farClip = e, this.component && (this.component.farClip = e);
  }
  get farClip() {
    return this._farClip;
  }
  set flipFaces(e) {
    this._flipFaces = e, this.component && (this.component.flipFaces = e);
  }
  get flipFaces() {
    return this._flipFaces;
  }
  set fov(e) {
    this._fov = e, this.component && (this.component.fov = e);
  }
  get fov() {
    return this._fov;
  }
  set frustumCulling(e) {
    this._frustumCulling = e, this.component && (this.component.frustumCulling = e);
  }
  get frustumCulling() {
    return this._frustumCulling;
  }
  set gamma(e) {
    this._gamma = e, this.component && (this.component.gammaCorrection = e === "srgb" ? T : J);
  }
  get gamma() {
    return this._gamma;
  }
  set horizontalFov(e) {
    this._horizontalFov = e, this.component && (this.component.horizontalFov = e);
  }
  get horizontalFov() {
    return this._horizontalFov;
  }
  set nearClip(e) {
    this._nearClip = e, this.component && (this.component.nearClip = e);
  }
  get nearClip() {
    return this._nearClip;
  }
  set orthographic(e) {
    this._orthographic = e, this.component && (this.component.projection = e ? ft : gt);
  }
  get orthographic() {
    return this._orthographic;
  }
  set orthoHeight(e) {
    this._orthoHeight = e, this.component && (this.component.orthoHeight = e);
  }
  get orthoHeight() {
    return this._orthoHeight;
  }
  set priority(e) {
    this._priority = e, this.component && (this.component.priority = e);
  }
  get priority() {
    return this._priority;
  }
  set rect(e) {
    this._rect = e, this.component && (this.component.rect = e);
  }
  get rect() {
    return this._rect;
  }
  set scissorRect(e) {
    this._scissorRect = e, this.component && (this.component.scissorRect = e);
  }
  get scissorRect() {
    return this._scissorRect;
  }
  set tonemap(e) {
    this._tonemap = e, this.component && (this.component.toneMapping = X.get(e) ?? Z);
  }
  get tonemap() {
    return this._tonemap;
  }
  static get observedAttributes() {
    return [...super.observedAttributes, "clear-color", "clear-color-buffer", "clear-depth-buffer", "clear-stencil-buffer", "cull-faces", "far-clip", "flip-faces", "fov", "frustum-culling", "gamma", "horizontal-fov", "near-clip", "orthographic", "ortho-height", "priority", "rect", "scissor-rect", "tonemap"];
  }
  attributeChangedCallback(e, a, t) {
    switch (super.attributeChangedCallback(e, a, t), e) {
      case "clear-color":
        this.clearColor = G(t);
        break;
      case "clear-color-buffer":
        this.clearColorBuffer = t !== "false";
        break;
      case "clear-depth-buffer":
        this.clearDepthBuffer = t !== "false";
        break;
      case "clear-stencil-buffer":
        this.clearStencilBuffer = t !== "false";
        break;
      case "cull-faces":
        this.cullFaces = t !== "false";
        break;
      case "far-clip":
        this.farClip = parseFloat(t);
        break;
      case "flip-faces":
        this.flipFaces = t !== "true";
        break;
      case "fov":
        this.fov = parseFloat(t);
        break;
      case "frustum-culling":
        this.frustumCulling = t !== "false";
        break;
      case "gamma":
        this.gamma = t;
        break;
      case "horizontal-fov":
        this.horizontalFov = this.hasAttribute("horizontal-fov");
        break;
      case "near-clip":
        this.nearClip = parseFloat(t);
        break;
      case "orthographic":
        this.orthographic = this.hasAttribute("orthographic");
        break;
      case "ortho-height":
        this.orthoHeight = parseFloat(t);
        break;
      case "priority":
        this.priority = parseFloat(t);
        break;
      case "rect":
        this.rect = H(t);
        break;
      case "scissor-rect":
        this.scissorRect = H(t);
        break;
      case "tonemap":
        this.tonemap = t;
        break;
    }
  }
}
customElements.define("pc-camera", Lt);
class Qt extends v {
  constructor() {
    super("collision"), this._angularOffset = new L(), this._axis = 1, this._convexHull = !1, this._halfExtents = new k(0.5, 0.5, 0.5), this._height = 2, this._linearOffset = new k(), this._radius = 0.5, this._type = "box";
  }
  getInitialComponentData() {
    return {
      axis: this._axis,
      angularOffset: this._angularOffset,
      convexHull: this._convexHull,
      halfExtents: this._halfExtents,
      height: this._height,
      linearOffset: this._linearOffset,
      radius: this._radius,
      type: this._type
    };
  }
  get component() {
    return super.component;
  }
  set angularOffset(e) {
    this._angularOffset = e, this.component && (this.component.angularOffset = e);
  }
  get angularOffset() {
    return this._angularOffset;
  }
  set axis(e) {
    this._axis = e, this.component && (this.component.axis = e);
  }
  get axis() {
    return this._axis;
  }
  set convexHull(e) {
    this._convexHull = e, this.component && (this.component.convexHull = e);
  }
  get convexHull() {
    return this._convexHull;
  }
  set halfExtents(e) {
    this._halfExtents = e, this.component && (this.component.halfExtents = e);
  }
  get halfExtents() {
    return this._halfExtents;
  }
  set height(e) {
    this._height = e, this.component && (this.component.height = e);
  }
  get height() {
    return this._height;
  }
  set linearOffset(e) {
    this._linearOffset = e, this.component && (this.component.linearOffset = e);
  }
  get linearOffset() {
    return this._linearOffset;
  }
  set radius(e) {
    this._radius = e, this.component && (this.component.radius = e);
  }
  get radius() {
    return this._radius;
  }
  set type(e) {
    this._type = e, this.component && (this.component.type = e);
  }
  get type() {
    return this._type;
  }
  static get observedAttributes() {
    return [...super.observedAttributes, "angular-offset", "axis", "convex-hull", "half-extents", "height", "linear-offset", "radius", "type"];
  }
  attributeChangedCallback(e, a, t) {
    switch (super.attributeChangedCallback(e, a, t), e) {
      case "angular-offset":
        this.angularOffset = Dt(t);
        break;
      case "axis":
        this.axis = parseInt(t, 10);
        break;
      case "convex-hull":
        this.convexHull = this.hasAttribute("convex-hull");
        break;
      case "half-extents":
        this.halfExtents = m(t);
        break;
      case "height":
        this.height = parseFloat(t);
        break;
      case "linear-offset":
        this.linearOffset = m(t);
        break;
      case "radius":
        this.radius = parseFloat(t);
        break;
      case "type":
        this.type = t;
        break;
    }
  }
}
customElements.define("pc-collision", Qt);
class Wt extends v {
  constructor() {
    super("element"), this._anchor = new O(0.5, 0.5, 0.5, 0.5), this._asset = "", this._autoWidth = !0, this._color = new C(1, 1, 1, 1), this._fontSize = 32, this._lineHeight = 32, this._pivot = new z(0.5, 0.5), this._text = "", this._type = "group", this._width = 0, this._wrapLines = !1;
  }
  initComponent() {
    this.component._text._material.useFog = !0;
  }
  getInitialComponentData() {
    return {
      anchor: this._anchor,
      autoWidth: this._autoWidth,
      color: this._color,
      fontAsset: _.get(this._asset).id,
      fontSize: this._fontSize,
      lineHeight: this._lineHeight,
      pivot: this._pivot,
      type: this._type,
      text: this._text,
      width: this._width,
      wrapLines: this._wrapLines
    };
  }
  get component() {
    return super.component;
  }
  set anchor(e) {
    this._anchor = e, this.component && (this.component.anchor = e);
  }
  get anchor() {
    return this._anchor;
  }
  set asset(e) {
    this._asset = e;
    const a = _.get(e);
    this.component && a && (this.component.fontAsset = a.id);
  }
  get asset() {
    return this._asset;
  }
  set autoWidth(e) {
    this._autoWidth = e, this.component && (this.component.autoWidth = e);
  }
  get autoWidth() {
    return this._autoWidth;
  }
  set color(e) {
    this._color = e, this.component && (this.component.color = e);
  }
  get color() {
    return this._color;
  }
  set fontSize(e) {
    this._fontSize = e, this.component && (this.component.fontSize = e);
  }
  get fontSize() {
    return this._fontSize;
  }
  set lineHeight(e) {
    this._lineHeight = e, this.component && (this.component.lineHeight = e);
  }
  get lineHeight() {
    return this._lineHeight;
  }
  set pivot(e) {
    this._pivot = e, this.component && (this.component.pivot = e);
  }
  get pivot() {
    return this._pivot;
  }
  set text(e) {
    this._text = e, this.component && (this.component.text = e);
  }
  get text() {
    return this._text;
  }
  set type(e) {
    this._type = e, this.component && (this.component.type = e);
  }
  get type() {
    return this._type;
  }
  set width(e) {
    this._width = e, this.component && (this.component.width = e);
  }
  get width() {
    return this._width;
  }
  set wrapLines(e) {
    this._wrapLines = e, this.component && (this.component.wrapLines = e);
  }
  get wrapLines() {
    return this._wrapLines;
  }
  static get observedAttributes() {
    return [...super.observedAttributes, "anchor", "asset", "auto-width", "color", "font-size", "line-height", "pivot", "text", "type", "width", "wrap-lines"];
  }
  attributeChangedCallback(e, a, t) {
    switch (super.attributeChangedCallback(e, a, t), e) {
      case "anchor":
        this.anchor = H(t);
        break;
      case "asset":
        this.asset = t;
        break;
      case "auto-width":
        this.autoWidth = t !== "false";
        break;
      case "color":
        this.color = G(t);
        break;
      case "font-size":
        this.fontSize = Number(t);
        break;
      case "line-height":
        this.lineHeight = Number(t);
        break;
      case "pivot":
        this.pivot = P(t);
        break;
      case "text":
        this.text = t;
        break;
      case "type":
        this.type = t;
        break;
      case "width":
        this.width = Number(t);
        break;
      case "wrap-lines":
        this.wrapLines = this.hasAttribute(e);
        break;
    }
  }
}
customElements.define("pc-element", Wt);
const I = new Map([["pcf1-16f", wt], ["pcf1-32f", At], ["pcf3-16f", jt], ["pcf3-32f", $], ["pcf5-16f", Ct], ["pcf5-32f", Ft], ["vsm-16f", St], ["vsm-32f", Et], ["pcss-32f", Rt]]);
class Kt extends v {
  constructor() {
    super("light"), this._castShadows = !1, this._color = new C(1, 1, 1), this._innerConeAngle = 40, this._intensity = 1, this._normalOffsetBias = 0.05, this._outerConeAngle = 45, this._range = 10, this._shadowBias = 0.2, this._shadowDistance = 16, this._shadowIntensity = 1, this._shadowResolution = 1024, this._shadowType = "pcf3-32f", this._type = "directional", this._vsmBias = 0.01, this._vsmBlurSize = 11;
  }
  getInitialComponentData() {
    return {
      castShadows: this._castShadows,
      color: this._color,
      innerConeAngle: this._innerConeAngle,
      intensity: this._intensity,
      normalOffsetBias: this._normalOffsetBias,
      outerConeAngle: this._outerConeAngle,
      range: this._range,
      shadowBias: this._shadowBias,
      shadowDistance: this._shadowDistance,
      shadowIntensity: this._shadowIntensity,
      shadowResolution: this._shadowResolution,
      shadowType: I.get(this._shadowType),
      type: this._type,
      vsmBias: this._vsmBias,
      vsmBlurSize: this._vsmBlurSize
    };
  }
  get component() {
    return super.component;
  }
  set castShadows(e) {
    this._castShadows = e, this.component && (this.component.castShadows = e);
  }
  get castShadows() {
    return this._castShadows;
  }
  set color(e) {
    this._color = e, this.component && (this.component.color = e);
  }
  get color() {
    return this._color;
  }
  set innerConeAngle(e) {
    this._innerConeAngle = e, this.component && (this.component.innerConeAngle = e);
  }
  get innerConeAngle() {
    return this._innerConeAngle;
  }
  set intensity(e) {
    this._intensity = e, this.component && (this.component.intensity = e);
  }
  get intensity() {
    return this._intensity;
  }
  set normalOffsetBias(e) {
    this._normalOffsetBias = e, this.component && (this.component.normalOffsetBias = e);
  }
  get normalOffsetBias() {
    return this._normalOffsetBias;
  }
  set outerConeAngle(e) {
    this._outerConeAngle = e, this.component && (this.component.outerConeAngle = e);
  }
  get outerConeAngle() {
    return this._outerConeAngle;
  }
  set range(e) {
    this._range = e, this.component && (this.component.range = e);
  }
  get range() {
    return this._range;
  }
  set shadowBias(e) {
    this._shadowBias = e, this.component && (this.component.shadowBias = e);
  }
  get shadowBias() {
    return this._shadowBias;
  }
  set shadowDistance(e) {
    this._shadowDistance = e, this.component && (this.component.shadowDistance = e);
  }
  get shadowDistance() {
    return this._shadowDistance;
  }
  set shadowIntensity(e) {
    this._shadowIntensity = e, this.component && (this.component.shadowIntensity = e);
  }
  get shadowIntensity() {
    return this._shadowIntensity;
  }
  set shadowResolution(e) {
    this._shadowResolution = e, this.component && (this.component.shadowResolution = e);
  }
  get shadowResolution() {
    return this._shadowResolution;
  }
  set shadowType(e) {
    this._shadowType = e, this.component && (this.component.shadowType = I.get(e) ?? $);
  }
  get shadowType() {
    return this._shadowType;
  }
  set type(e) {
    if (!["directional", "omni", "spot"].includes(e)) {
      console.warn("Invalid light type '" + e + "', using default type '" + this._type + "'.");
      return;
    }
    this._type = e, this.component && (this.component.type = e);
  }
  get type() {
    return this._type;
  }
  set vsmBias(e) {
    this._vsmBias = e, this.component && (this.component.vsmBias = e);
  }
  get vsmBias() {
    return this._vsmBias;
  }
  set vsmBlurSize(e) {
    this._vsmBlurSize = e, this.component && (this.component.vsmBlurSize = e);
  }
  get vsmBlurSize() {
    return this._vsmBlurSize;
  }
  static get observedAttributes() {
    return [...super.observedAttributes, "color", "cast-shadows", "intensity", "inner-cone-angle", "normal-offset-bias", "outer-cone-angle", "range", "shadow-bias", "shadow-distance", "shadow-intensity", "shadow-resolution", "shadow-type", "type", "vsm-bias", "vsm-blur-size"];
  }
  attributeChangedCallback(e, a, t) {
    switch (super.attributeChangedCallback(e, a, t), e) {
      case "color":
        this.color = G(t);
        break;
      case "cast-shadows":
        this.castShadows = this.hasAttribute("cast-shadows");
        break;
      case "inner-cone-angle":
        this.innerConeAngle = Number(t);
        break;
      case "intensity":
        this.intensity = Number(t);
        break;
      case "normal-offset-bias":
        this.normalOffsetBias = Number(t);
        break;
      case "outer-cone-angle":
        this.outerConeAngle = Number(t);
        break;
      case "range":
        this.range = Number(t);
        break;
      case "shadow-bias":
        this.shadowBias = Number(t);
        break;
      case "shadow-distance":
        this.shadowDistance = Number(t);
        break;
      case "shadow-resolution":
        this.shadowResolution = Number(t);
        break;
      case "shadow-intensity":
        this.shadowIntensity = Number(t);
        break;
      case "shadow-type":
        this.shadowType = t;
        break;
      case "type":
        this.type = t;
        break;
      case "vsm-bias":
        this.vsmBias = Number(t);
        break;
      case "vsm-blur-size":
        this.vsmBlurSize = Number(t);
        break;
    }
  }
}
customElements.define("pc-light", Kt);
class Tt extends v {
  constructor() {
    super("particlesystem"), this._asset = "";
  }
  getInitialComponentData() {
    var a;
    const e = _.get(this._asset);
    if (!e) return {};
    if (e.resource.colorMapAsset) {
      const t = e.resource.colorMapAsset,
        s = (a = _.get(t)) == null ? void 0 : a.id;
      s && (e.resource.colorMapAsset = s);
    }
    return e.resource;
  }
  get component() {
    return super.component;
  }
  applyConfig(e) {
    if (this.component) for (const a in e) e.hasOwnProperty(a) && (this.component[a] = e[a]);
  }
  async _loadAsset() {
    var s;
    const e = await ((s = this.closestApp) == null ? void 0 : s.ready()),
      a = e == null ? void 0 : e.app,
      t = _.get(this._asset);
    t && (t.loaded ? this.applyConfig(t.resource) : (t.once("load", () => {
      this.applyConfig(t.resource);
    }), a.assets.load(t)));
  }
  set asset(e) {
    this._asset = e, this.isConnected && this._loadAsset();
  }
  get asset() {
    return this._asset;
  }
  play() {
    this.component && this.component.play();
  }
  pause() {
    this.component && this.component.pause();
  }
  reset() {
    this.component && this.component.reset();
  }
  stop() {
    this.component && this.component.stop();
  }
  static get observedAttributes() {
    return [...super.observedAttributes, "asset"];
  }
  attributeChangedCallback(e, a, t) {
    switch (super.attributeChangedCallback(e, a, t), e) {
      case "asset":
        this.asset = t;
        break;
    }
  }
}
class B extends HTMLElement {
  constructor() {
    super(...arguments), this._diffuse = new C(1, 1, 1), this._diffuseMap = "", this._metalnessMap = "", this._normalMap = "", this._roughnessMap = "", this.material = null;
  }
  createMaterial() {
    this.material = new Ot(), this.material.glossInvert = !1, this.material.useMetalness = !1, this.material.diffuse = this._diffuse, this.diffuseMap = this._diffuseMap, this.metalnessMap = this._metalnessMap, this.normalMap = this._normalMap, this.roughnessMap = this._roughnessMap, this.material.update();
  }
  disconnectedCallback() {
    this.material && (this.material.destroy(), this.material = null);
  }
  setMap(e, a) {
    if (this.material) {
      const t = _.get(e);
      t && (t.loaded ? (this.material[a] = t.resource, this.material[a].anisotropy = 4) : t.once("load", () => {
        this.material[a] = t.resource, this.material[a].anisotropy = 4, this.material.update();
      }));
    }
  }
  set diffuse(e) {
    this._diffuse = e, this.material && (this.material.diffuse = e);
  }
  get diffuse() {
    return this._diffuse;
  }
  set diffuseMap(e) {
    this._diffuseMap = e, this.setMap(e, "diffuseMap");
  }
  get diffuseMap() {
    return this._diffuseMap;
  }
  set metalnessMap(e) {
    this._metalnessMap = e, this.setMap(e, "metalnessMap");
  }
  get metalnessMap() {
    return this._metalnessMap;
  }
  set normalMap(e) {
    this._normalMap = e, this.setMap(e, "normalMap");
  }
  get normalMap() {
    return this._normalMap;
  }
  set roughnessMap(e) {
    this._roughnessMap = e, this.setMap(e, "glossMap");
  }
  get roughnessMap() {
    return this._roughnessMap;
  }
  static get(e) {
    const a = document.querySelector('pc-material[id="' + e + '"]');
    return a == null ? void 0 : a.material;
  }
  static get observedAttributes() {
    return ["diffuse", "diffuse-map", "metalness-map", "normal-map", "roughness-map"];
  }
  attributeChangedCallback(e, a, t) {
    switch (e) {
      case "diffuse":
        this.diffuse = G(t);
        break;
      case "diffuse-map":
        this.diffuseMap = t;
        break;
      case "metalness-map":
        this.metalnessMap = t;
        break;
      case "normal-map":
        this.normalMap = t;
        break;
      case "roughness-map":
        this.roughnessMap = t;
        break;
    }
  }
}
customElements.define("pc-material", B);
class Jt extends v {
  constructor() {
    super("render"), this._castShadows = !0, this._material = "", this._receiveShadows = !0, this._type = "asset";
  }
  getInitialComponentData() {
    return {
      type: this._type,
      castShadows: this._castShadows,
      material: B.get(this._material),
      receiveShadows: this._receiveShadows
    };
  }
  get component() {
    return super.component;
  }
  set type(e) {
    this._type = e, this.component && (this.component.type = e);
  }
  get type() {
    return this._type;
  }
  set castShadows(e) {
    this._castShadows = e, this.component && (this.component.castShadows = e);
  }
  get castShadows() {
    return this._castShadows;
  }
  set material(e) {
    this._material = e, this.component && (this.component.material = B.get(e));
  }
  get material() {
    return this._material;
  }
  set receiveShadows(e) {
    this._receiveShadows = e, this.component && (this.component.receiveShadows = e);
  }
  get receiveShadows() {
    return this._receiveShadows;
  }
  static get observedAttributes() {
    return [...super.observedAttributes, "cast-shadows", "material", "receive-shadows", "type"];
  }
  attributeChangedCallback(e, a, t) {
    switch (super.attributeChangedCallback(e, a, t), e) {
      case "cast-shadows":
        this.castShadows = t !== "false";
        break;
      case "material":
        this.material = t;
        break;
      case "receive-shadows":
        this.receiveShadows = t !== "false";
        break;
      case "type":
        this.type = t;
        break;
    }
  }
}
customElements.define("pc-render", Jt);
class Nt extends v {
  constructor() {
    super("rigidbody"), this._angularDamping = 0, this._angularFactor = new k(1, 1, 1), this._friction = 0.5, this._linearDamping = 0, this._linearFactor = new k(1, 1, 1), this._mass = 1, this._restitution = 0, this._rollingFriction = 0, this._type = "static";
  }
  getInitialComponentData() {
    return {
      angularDamping: this._angularDamping,
      angularFactor: this._angularFactor,
      friction: this._friction,
      linearDamping: this._linearDamping,
      linearFactor: this._linearFactor,
      mass: this._mass,
      restitution: this._restitution,
      rollingFriction: this._rollingFriction,
      type: this._type
    };
  }
  get component() {
    return super.component;
  }
  set angularDamping(e) {
    this._angularDamping = e, this.component && (this.component.angularDamping = e);
  }
  get angularDamping() {
    return this._angularDamping;
  }
  set angularFactor(e) {
    this._angularFactor = e, this.component && (this.component.angularFactor = e);
  }
  get angularFactor() {
    return this._angularFactor;
  }
  set friction(e) {
    this._friction = e, this.component && (this.component.friction = e);
  }
  get friction() {
    return this._friction;
  }
  set linearDamping(e) {
    this._linearDamping = e, this.component && (this.component.linearDamping = e);
  }
  get linearDamping() {
    return this._linearDamping;
  }
  set linearFactor(e) {
    this._linearFactor = e, this.component && (this.component.linearFactor = e);
  }
  get linearFactor() {
    return this._linearFactor;
  }
  set mass(e) {
    this._mass = e, this.component && (this.component.mass = e);
  }
  get mass() {
    return this._mass;
  }
  set restitution(e) {
    this._restitution = e, this.component && (this.component.restitution = e);
  }
  get restitution() {
    return this._restitution;
  }
  set rollingFriction(e) {
    this._rollingFriction = e, this.component && (this.component.rollingFriction = e);
  }
  get rollingFriction() {
    return this._rollingFriction;
  }
  set type(e) {
    this._type = e, this.component && (this.component.type = e);
  }
  get type() {
    return this._type;
  }
  static get observedAttributes() {
    return [...super.observedAttributes, "angular-damping", "angular-factor", "friction", "linear-damping", "linear-factor", "mass", "restitution", "rolling-friction", "type"];
  }
  attributeChangedCallback(e, a, t) {
    switch (super.attributeChangedCallback(e, a, t), e) {
      case "angular-damping":
        this.angularDamping = parseFloat(t);
        break;
      case "angular-factor":
        this.angularFactor = m(t);
        break;
      case "friction":
        this.friction = parseFloat(t);
        break;
      case "linear-damping":
        this.linearDamping = parseFloat(t);
        break;
      case "linear-factor":
        this.linearFactor = m(t);
        break;
      case "mass":
        this.mass = parseFloat(t);
        break;
      case "restitution":
        this.restitution = parseFloat(t);
        break;
      case "rolling-friction":
        this.rollingFriction = parseFloat(t);
        break;
      case "type":
        this.type = t;
        break;
    }
  }
}
customElements.define("pc-rigidbody", Nt);
class Ut extends v {
  constructor() {
    super("screen"), this._screenSpace = !1, this._resolution = new z(640, 320), this._referenceResolution = new z(640, 320), this._priority = 0, this._blend = !1, this._scaleBlend = 0.5;
  }
  getInitialComponentData() {
    return {
      priority: this._priority,
      referenceResolution: this._referenceResolution,
      resolution: this._resolution,
      scaleBlend: this._scaleBlend,
      scaleMode: this._blend ? N : U,
      screenSpace: this._screenSpace
    };
  }
  get component() {
    return super.component;
  }
  set priority(e) {
    this._priority = e, this.component && (this.component.priority = this._priority);
  }
  get priority() {
    return this._priority;
  }
  set referenceResolution(e) {
    this._referenceResolution = e, this.component && (this.component.referenceResolution = this._referenceResolution);
  }
  get referenceResolution() {
    return this._referenceResolution;
  }
  set resolution(e) {
    this._resolution = e, this.component && (this.component.resolution = this._resolution);
  }
  get resolution() {
    return this._resolution;
  }
  set scaleBlend(e) {
    this._scaleBlend = e, this.component && (this.component.scaleBlend = this._scaleBlend);
  }
  get scaleBlend() {
    return this._scaleBlend;
  }
  set blend(e) {
    this._blend = e, this.component && (this.component.scaleMode = this._blend ? N : U);
  }
  get blend() {
    return this._blend;
  }
  set screenSpace(e) {
    this._screenSpace = e, this.component && (this.component.screenSpace = this._screenSpace);
  }
  get screenSpace() {
    return this._screenSpace;
  }
  static get observedAttributes() {
    return [...super.observedAttributes, "blend", "screen-space", "resolution", "reference-resolution", "priority", "scale-blend"];
  }
  attributeChangedCallback(e, a, t) {
    switch (super.attributeChangedCallback(e, a, t), e) {
      case "priority":
        this.priority = parseInt(t, 10);
        break;
      case "reference-resolution":
        this.referenceResolution = P(t);
        break;
      case "resolution":
        this.resolution = P(t);
        break;
      case "scale-blend":
        this.scaleBlend = parseFloat(t);
        break;
      case "blend":
        this.blend = this.hasAttribute("blend");
        break;
      case "screen-space":
        this.screenSpace = this.hasAttribute("screen-space");
        break;
    }
  }
}
customElements.define("pc-screen", Ut);
class Yt extends v {
  constructor() {
    super("script"), this.observer = new MutationObserver(this.handleMutations.bind(this)), this.observer.observe(this, {
      childList: !0
    }), this.addEventListener("scriptattributeschange", this.handleScriptAttributesChange.bind(this)), this.addEventListener("scriptenablechange", this.handleScriptEnableChange.bind(this));
  }
  initComponent() {
    this.querySelectorAll(":scope > pc-script").forEach(e => {
      const a = e.getAttribute("name"),
        t = e.getAttribute("attributes");
      a && this.createScript(a, t);
    });
  }
  convertAttributes(e) {
    if (typeof e == "string") {
      if (e.startsWith("asset:")) {
        const a = e.slice(6),
          t = document.querySelector("pc-asset#" + a);
        if (t) return t.asset;
      }
      if (e.startsWith("entity:")) {
        const a = e.slice(7),
          t = document.querySelector('pc-entity[name="' + a + '"]');
        if (t) return t.entity;
      }
      if (e.startsWith("vec2:")) {
        const a = e.slice(5).split(",").map(Number);
        if (a.length === 2 && a.every(t => !isNaN(t))) return new z(a[0], a[1]);
      }
      if (e.startsWith("vec3:")) {
        const a = e.slice(5).split(",").map(Number);
        if (a.length === 3 && a.every(t => !isNaN(t))) return new k(a[0], a[1], a[2]);
      }
      if (e.startsWith("vec4:")) {
        const a = e.slice(5).split(",").map(Number);
        if (a.length === 4 && a.every(t => !isNaN(t))) return new O(a[0], a[1], a[2], a[3]);
      }
      if (e.startsWith("color:")) {
        const a = e.slice(6).split(",").map(Number);
        if (a.length === 4 && a.every(t => !isNaN(t))) return new C(a[0], a[1], a[2], a[3]);
      }
      return e;
    }
    if (Array.isArray(e)) return e.length > 0 && typeof e[0] == "object" ? e.map(a => this.convertAttributes(a)) : e.map(a => this.convertAttributes(a));
    if (e && typeof e == "object") {
      const a = {};
      for (const t in e) a[t] = this.convertAttributes(e[t]);
      return a;
    }
    return e;
  }
  preprocessAttributes(e) {
    return this.convertAttributes(e);
  }
  mergeDeep(e, a) {
    for (const t in a) a[t] && typeof a[t] == "object" && !Array.isArray(a[t]) ? ((!e[t] || typeof e[t] != "object") && (e[t] = {}), this.mergeDeep(e[t], a[t])) : e[t] = a[t];
    return e;
  }
  applyAttributes(e, a) {
    try {
      const t = a ? JSON.parse(a) : {},
        s = this.convertAttributes(t);
      this.mergeDeep(e, s);
    } catch (t) {
      console.error("Error parsing attributes JSON string " + a + ":", t);
    }
  }
  handleScriptAttributesChange(e) {
    const a = e.target,
      t = a.getAttribute("name");
    if (!t || !this.component) return;
    const s = this.component.get(t);
    s && this.applyAttributes(s, e.detail.attributes);
  }
  handleScriptEnableChange(e) {
    const a = e.target,
      t = a.getAttribute("name");
    if (!t || !this.component) return;
    const s = this.component.get(t);
    s && (s.enabled = e.detail.enabled);
  }
  createScript(e, a) {
    if (!this.component) return null;
    let t = {};
    if (a) try {
      t = JSON.parse(a), t = this.preprocessAttributes(t);
    } catch (s) {
      console.error("Error parsing attributes JSON string " + a + ":", s);
    }
    return this.component.create(e, {
      properties: t
    });
  }
  destroyScript(e) {
    this.component && this.component.destroy(e);
  }
  handleMutations(e) {
    for (const a of e) a.addedNodes.forEach(t => {
      if (t instanceof HTMLElement && t.tagName.toLowerCase() === "pc-script") {
        const s = t.getAttribute("name"),
          b = t.getAttribute("attributes");
        s && this.createScript(s, b);
      }
    }), a.removedNodes.forEach(t => {
      if (t instanceof HTMLElement && t.tagName.toLowerCase() === "pc-script") {
        const s = t.getAttribute("name");
        s && this.destroyScript(s);
      }
    });
  }
  disconnectedCallback() {
    var e;
    this.observer.disconnect(), (e = super.disconnectedCallback) == null || e.call(this);
  }
  get component() {
    return super.component;
  }
}
customElements.define("pc-scripts", Yt);
class Vt extends HTMLElement {
  constructor() {
    super(...arguments), this._attributes = "{}", this._enabled = !0, this._name = "";
  }
  set scriptAttributes(e) {
    this._attributes = e, this.dispatchEvent(new CustomEvent("scriptattributeschange", {
      detail: {
        attributes: e
      },
      bubbles: !0
    }));
  }
  get scriptAttributes() {
    return this._attributes;
  }
  set enabled(e) {
    this._enabled = e, this.dispatchEvent(new CustomEvent("scriptenablechange", {
      detail: {
        enabled: e
      },
      bubbles: !0
    }));
  }
  get enabled() {
    return this._enabled;
  }
  set name(e) {
    this._name = e;
  }
  get name() {
    return this._name;
  }
  static get observedAttributes() {
    return ["attributes", "enabled", "name"];
  }
  attributeChangedCallback(e, a, t) {
    switch (e) {
      case "attributes":
        this.scriptAttributes = t;
        break;
      case "enabled":
        this.enabled = t !== "false";
        break;
      case "name":
        this.name = t;
        break;
    }
  }
}
customElements.define("pc-script", Vt);
class ee extends v {
  constructor() {
    super("sound"), this._distanceModel = "linear", this._maxDistance = 10000, this._pitch = 1, this._positional = !1, this._refDistance = 1, this._rollOffFactor = 1, this._volume = 1;
  }
  getInitialComponentData() {
    return {
      distanceModel: this._distanceModel,
      maxDistance: this._maxDistance,
      pitch: this._pitch,
      positional: this._positional,
      refDistance: this._refDistance,
      rollOffFactor: this._rollOffFactor,
      volume: this._volume
    };
  }
  get component() {
    return super.component;
  }
  set distanceModel(e) {
    this._distanceModel = e, this.component && (this.component.distanceModel = e);
  }
  get distanceModel() {
    return this._distanceModel;
  }
  set maxDistance(e) {
    this._maxDistance = e, this.component && (this.component.maxDistance = e);
  }
  get maxDistance() {
    return this._maxDistance;
  }
  set pitch(e) {
    this._pitch = e, this.component && (this.component.pitch = e);
  }
  get pitch() {
    return this._pitch;
  }
  set positional(e) {
    this._positional = e, this.component && (this.component.positional = e);
  }
  get positional() {
    return this._positional;
  }
  set refDistance(e) {
    this._refDistance = e, this.component && (this.component.refDistance = e);
  }
  get refDistance() {
    return this._refDistance;
  }
  set rollOffFactor(e) {
    this._rollOffFactor = e, this.component && (this.component.rollOffFactor = e);
  }
  get rollOffFactor() {
    return this._rollOffFactor;
  }
  set volume(e) {
    this._volume = e, this.component && (this.component.volume = e);
  }
  get volume() {
    return this._volume;
  }
  static get observedAttributes() {
    return [...super.observedAttributes, "distance-model", "max-distance", "pitch", "positional", "ref-distance", "roll-off-factor", "volume"];
  }
  attributeChangedCallback(e, a, t) {
    switch (super.attributeChangedCallback(e, a, t), e) {
      case "distance-model":
        this.distanceModel = t;
        break;
      case "max-distance":
        this.maxDistance = parseFloat(t);
        break;
      case "pitch":
        this.pitch = parseFloat(t);
        break;
      case "positional":
        this.positional = this.hasAttribute("positional");
        break;
      case "ref-distance":
        this.refDistance = parseFloat(t);
        break;
      case "roll-off-factor":
        this.rollOffFactor = parseFloat(t);
        break;
      case "volume":
        this.volume = parseFloat(t);
        break;
    }
  }
}
customElements.define("pc-sounds", ee);
class Xt extends E {
  constructor() {
    super(...arguments), this._asset = "", this._autoPlay = !1, this._duration = null, this._loop = !1, this._name = "", this._overlap = !1, this._pitch = 1, this._startTime = 0, this._volume = 1, this.soundSlot = null;
  }
  async connectedCallback() {
    var a;
    await ((a = this.soundElement) == null ? void 0 : a.ready());
    const e = {
      autoPlay: this._autoPlay,
      loop: this._loop,
      overlap: this._overlap,
      pitch: this._pitch,
      startTime: this._startTime,
      volume: this._volume
    };
    this._duration && (e.duration = this._duration), this.soundSlot = this.soundElement.component.addSlot(this._name, e), this.asset = this._asset, this._autoPlay && this.soundSlot.play(), this._onReady();
  }
  disconnectedCallback() {
    this.soundElement.component.removeSlot(this._name);
  }
  get soundElement() {
    const e = this.parentElement;
    return e instanceof ee ? e : (console.warn("pc-sound-slot must be a direct child of a pc-sound element"), null);
  }
  set asset(e) {
    var a;
    if (this._asset = e, this.soundSlot) {
      const t = (a = _.get(e)) == null ? void 0 : a.id;
      t && (this.soundSlot.asset = t);
    }
  }
  get asset() {
    return this._asset;
  }
  set autoPlay(e) {
    this._autoPlay = e, this.soundSlot && (this.soundSlot.autoPlay = e);
  }
  get autoPlay() {
    return this._autoPlay;
  }
  set duration(e) {
    this._duration = e, this.soundSlot && (this.soundSlot.duration = e);
  }
  get duration() {
    return this._duration;
  }
  set loop(e) {
    this._loop = e, this.soundSlot && (this.soundSlot.loop = e);
  }
  get loop() {
    return this._loop;
  }
  set name(e) {
    this._name = e, this.soundSlot && (this.soundSlot.name = e);
  }
  get name() {
    return this._name;
  }
  set overlap(e) {
    this._overlap = e, this.soundSlot && (this.soundSlot.overlap = e);
  }
  get overlap() {
    return this._overlap;
  }
  set pitch(e) {
    this._pitch = e, this.soundSlot && (this.soundSlot.pitch = e);
  }
  get pitch() {
    return this._pitch;
  }
  set startTime(e) {
    this._startTime = e, this.soundSlot && (this.soundSlot.startTime = e);
  }
  get startTime() {
    return this._startTime;
  }
  set volume(e) {
    this._volume = e, this.soundSlot && (this.soundSlot.volume = e);
  }
  get volume() {
    return this._volume;
  }
  static get observedAttributes() {
    return ["asset", "auto-play", "duration", "loop", "name", "overlap", "pitch", "start-time", "volume"];
  }
  attributeChangedCallback(e, a, t) {
    switch (e) {
      case "asset":
        this.asset = t;
        break;
      case "auto-play":
        this.autoPlay = this.hasAttribute("auto-play");
        break;
      case "duration":
        this.duration = parseFloat(t);
        break;
      case "loop":
        this.loop = this.hasAttribute("loop");
        break;
      case "name":
        this.name = t;
        break;
      case "overlap":
        this.overlap = this.hasAttribute("overlap");
        break;
      case "pitch":
        this.pitch = parseFloat(t);
        break;
      case "start-time":
        this.startTime = parseFloat(t);
        break;
      case "volume":
        this.volume = parseFloat(t);
        break;
    }
  }
}
customElements.define("pc-sound", Xt);
class It extends v {
  constructor() {
    super("gsplat"), this._asset = "", this._castShadows = !1;
  }
  getInitialComponentData() {
    return {
      asset: _.get(this._asset),
      castShadows: this._castShadows
    };
  }
  get component() {
    return super.component;
  }
  set asset(e) {
    this._asset = e;
    const a = _.get(e);
    this.component && a && (this.component.asset = a);
  }
  get asset() {
    return this._asset;
  }
  set castShadows(e) {
    this._castShadows = e, this.component && (this.component.castShadows = e);
  }
  get castShadows() {
    return this._castShadows;
  }
  static get observedAttributes() {
    return [...super.observedAttributes, "asset", "cast-shadows"];
  }
  attributeChangedCallback(e, a, t) {
    switch (super.attributeChangedCallback(e, a, t), e) {
      case "asset":
        this.asset = t;
        break;
      case "cast-shadows":
        this.castShadows = this.hasAttribute("cast-shadows");
        break;
    }
  }
}
customElements.define("pc-splat", It);
class Zt extends E {
  constructor() {
    super(...arguments), this._asset = "", this._entity = null;
  }
  connectedCallback() {
    this._loadModel(), this._onReady();
  }
  disconnectedCallback() {
    this._unloadModel();
  }
  _instantiate(e) {
    this._entity = e.instantiateRenderEntity(), e.animations.length > 0 && (this._entity.addComponent("anim"), this._entity.anim.assignAnimation("animation", e.animations[0].resource));
    const a = this.closestEntity;
    if (a) a.ready().then(() => {
      a.entity.addChild(this._entity);
    });else {
      const t = this.closestApp;
      t && t.ready().then(() => {
        t.app.root.addChild(this._entity);
      });
    }
  }
  async _loadModel() {
    var s;
    this._unloadModel();
    const e = await ((s = this.closestApp) == null ? void 0 : s.ready()),
      a = e == null ? void 0 : e.app,
      t = _.get(this._asset);
    t && (t.loaded ? this._instantiate(t.resource) : (t.once("load", () => {
      this._instantiate(t.resource);
    }), a.assets.load(t)));
  }
  _unloadModel() {
    var e;
    (e = this._entity) == null || e.destroy(), this._entity = null;
  }
  set asset(e) {
    this._asset = e, this.isConnected && this._loadModel();
  }
  get asset() {
    return this._asset;
  }
  static get observedAttributes() {
    return ["asset"];
  }
  attributeChangedCallback(e, a, t) {
    switch (e) {
      case "asset":
        this.asset = t;
        break;
    }
  }
}
customElements.define("pc-model", Zt);
class $t extends E {
  constructor() {
    super(...arguments), this._fog = "none", this._fogColor = new C(1, 1, 1), this._fogDensity = 0, this._fogStart = 0, this._fogEnd = 1000, this._gravity = new k(0, -9.81, 0), this.scene = null;
  }
  async connectedCallback() {
    var e;
    await ((e = this.closestApp) == null ? void 0 : e.ready()), this.scene = this.closestApp.app.scene, this.updateSceneSettings(), this._onReady();
  }
  updateSceneSettings() {
    this.scene && (this.scene.fog.type = this._fog, this.scene.fog.color = this._fogColor, this.scene.fog.density = this._fogDensity, this.scene.fog.start = this._fogStart, this.scene.fog.end = this._fogEnd, this.parentElement.app.systems.rigidbody.gravity.copy(this._gravity));
  }
  set fog(e) {
    this._fog = e, this.scene && (this.scene.fog.type = e);
  }
  get fog() {
    return this._fog;
  }
  set fogColor(e) {
    this._fogColor = e, this.scene && (this.scene.fog.color = e);
  }
  get fogColor() {
    return this._fogColor;
  }
  set fogDensity(e) {
    this._fogDensity = e, this.scene && (this.scene.fog.density = e);
  }
  get fogDensity() {
    return this._fogDensity;
  }
  set fogStart(e) {
    this._fogStart = e, this.scene && (this.scene.fog.start = e);
  }
  get fogStart() {
    return this._fogStart;
  }
  set fogEnd(e) {
    this._fogEnd = e, this.scene && (this.scene.fog.end = e);
  }
  get fogEnd() {
    return this._fogEnd;
  }
  set gravity(e) {
    this._gravity = e, this.scene && this.parentElement.app.systems.rigidbody.gravity.copy(e);
  }
  get gravity() {
    return this._gravity;
  }
  static get observedAttributes() {
    return ["fog", "fog-color", "fog-density", "fog-start", "fog-end", "gravity"];
  }
  attributeChangedCallback(e, a, t) {
    switch (e) {
      case "fog":
        this.fog = t;
        break;
      case "fog-color":
        this.fogColor = G(t);
        break;
      case "fog-density":
        this.fogDensity = parseFloat(t);
        break;
      case "fog-start":
        this.fogStart = parseFloat(t);
        break;
      case "fog-end":
        this.fogEnd = parseFloat(t);
        break;
      case "gravity":
        this.gravity = m(t);
        break;
    }
  }
}
customElements.define("pc-scene", $t);
class ea extends E {
  constructor() {
    super(...arguments), this._asset = "", this._center = new k(0, 0.01, 0), this._intensity = 1, this._rotation = new k(), this._level = 0, this._lighting = !1, this._scale = new k(100, 100, 100), this._type = "infinite", this._scene = null;
  }
  connectedCallback() {
    this._loadSkybox(), this._onReady();
  }
  disconnectedCallback() {
    this._unloadSkybox();
  }
  _generateSkybox(e) {
    if (!this._scene) return;
    const a = e.resource,
      t = D.generateSkyboxCubemap(a);
    if (t.anisotropy = 4, this._scene.skybox = t, this._lighting) {
      const b = D.generateLightingSource(a),
        i = D.generateAtlas(b);
      this._scene.envAtlas = i;
    }
    const s = this._scene.layers.getLayerById(Y);
    s && (s.enabled = this._type !== "none"), this._scene.sky.type = this._type, this._scene.sky.node.setLocalScale(this._scale), this._scene.sky.center = this._center, this._scene.skyboxIntensity = this._intensity, this._scene.skyboxMip = this._level;
  }
  async _loadSkybox() {
    var s;
    const e = await ((s = this.closestApp) == null ? void 0 : s.ready()),
      a = e == null ? void 0 : e.app;
    if (!a) return;
    const t = _.get(this._asset);
    t && (this._scene = a.scene, t.loaded ? this._generateSkybox(t) : (t.once("load", () => {
      this._generateSkybox(t);
    }), a.assets.load(t)));
  }
  _unloadSkybox() {
    var e, a;
    this._scene && ((e = this._scene.skybox) == null || e.destroy(), this._scene.skybox = null, (a = this._scene.envAtlas) == null || a.destroy(), this._scene.envAtlas = null, this._scene = null);
  }
  set asset(e) {
    this._asset = e, this.isConnected && this._loadSkybox();
  }
  get asset() {
    return this._asset;
  }
  set center(e) {
    this._center = e, this._scene && (this._scene.sky.center = this._center);
  }
  get center() {
    return this._center;
  }
  set intensity(e) {
    this._intensity = e, this._scene && (this._scene.skyboxIntensity = this._intensity);
  }
  get intensity() {
    return this._intensity;
  }
  set level(e) {
    this._level = e, this._scene && (this._scene.skyboxMip = this._level);
  }
  get level() {
    return this._level;
  }
  set lighting(e) {
    this._lighting = e;
  }
  get lighting() {
    return this._lighting;
  }
  set rotation(e) {
    this._rotation = e, this._scene && (this._scene.skyboxRotation = new L().setFromEulerAngles(e));
  }
  get rotation() {
    return this._rotation;
  }
  set scale(e) {
    this._scale = e, this._scene && this._scene.sky.node.setLocalScale(this._scale);
  }
  get scale() {
    return this._scale;
  }
  set type(e) {
    if (this._type = e, this._scene) {
      this._scene.sky.type = this._type;
      const a = this._scene.layers.getLayerById(Y);
      a && (a.enabled = this._type !== "none");
    }
  }
  get type() {
    return this._type;
  }
  static get observedAttributes() {
    return ["asset", "center", "intensity", "level", "lighting", "rotation", "scale", "type"];
  }
  attributeChangedCallback(e, a, t) {
    switch (e) {
      case "asset":
        this.asset = t;
        break;
      case "center":
        this.center = m(t);
        break;
      case "intensity":
        this.intensity = parseFloat(t);
        break;
      case "level":
        this.level = parseInt(t, 10);
        break;
      case "lighting":
        this.lighting = this.hasAttribute(e);
        break;
      case "rotation":
        this.rotation = m(t);
        break;
      case "scale":
        this.scale = m(t);
        break;
      case "type":
        this.type = t;
        break;
    }
  }
}
customElements.define("pc-sky", ea);
