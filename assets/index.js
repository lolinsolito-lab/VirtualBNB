(function() {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver(i => {
    for (const s of i)
      if (s.type === "childList")
        for (const o of s.addedNodes) o.tagName === "LINK" && o.rel === "modulepreload" && r(o)
  }).observe(document, {
    childList: !0,
    subtree: !0
  });

  function n(i) {
    const s = {};
    return i.integrity && (s.integrity = i.integrity), i.referrerPolicy && (s.referrerPolicy = i.referrerPolicy), i
      .crossOrigin === "use-credentials" ? s.credentials = "include" : i.crossOrigin === "anonymous" ? s.credentials =
      "omit" : s.credentials = "same-origin", s
  }

  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const s = n(i);
    fetch(i.href, s)
  }
})();
var $d = {
    exports: {}
  },
  ks = {},
  Wd = {
    exports: {}
  },
  L = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Yr = Symbol.for("react.element"),
  Vm = Symbol.for("react.portal"),
  Mm = Symbol.for("react.fragment"),
  Rm = Symbol.for("react.strict_mode"),
  Dm = Symbol.for("react.profiler"),
  Lm = Symbol.for("react.provider"),
  Im = Symbol.for("react.context"),
  _m = Symbol.for("react.forward_ref"),
  Om = Symbol.for("react.suspense"),
  Fm = Symbol.for("react.memo"),
  Bm = Symbol.for("react.lazy"),
  xu = Symbol.iterator;

function Um(e) {
  return e === null || typeof e != "object" ? null : (e = xu && e[xu] || e["@@iterator"], typeof e == "function" ? e :
    null)
}
var Hd = {
    isMounted: function() {
      return !1
    },
    enqueueForceUpdate: function() {},
    enqueueReplaceState: function() {},
    enqueueSetState: function() {}
  },
  Kd = Object.assign,
  Gd = {};

function Kn(e, t, n) {
  this.props = e, this.context = t, this.refs = Gd, this.updater = n || Hd
}
Kn.prototype.isReactComponent = {};
Kn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error(
    "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState")
};
Kn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate")
};

function Qd() {}
Qd.prototype = Kn.prototype;

function $a(e, t, n) {
  this.props = e, this.context = t, this.refs = Gd, this.updater = n || Hd
}
var Wa = $a.prototype = new Qd;
Wa.constructor = $a;
Kd(Wa, Kn.prototype);
Wa.isPureReactComponent = !0;
var yu = Array.isArray,
  Yd = Object.prototype.hasOwnProperty,
  Ha = {
    current: null
  },
  Xd = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  };

function Zd(e, t, n) {
  var r, i = {},
    s = null,
    o = null;
  if (t != null)
    for (r in t.ref !== void 0 && (o = t.ref), t.key !== void 0 && (s = "" + t.key), t) Yd.call(t, r) && !Xd
      .hasOwnProperty(r) && (i[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) i.children = n;
  else if (1 < a) {
    for (var l = Array(a), c = 0; c < a; c++) l[c] = arguments[c + 2];
    i.children = l
  }
  if (e && e.defaultProps)
    for (r in a = e.defaultProps, a) i[r] === void 0 && (i[r] = a[r]);
  return {
    $$typeof: Yr,
    type: e,
    key: s,
    ref: o,
    props: i,
    _owner: Ha.current
  }
}

function $m(e, t) {
  return {
    $$typeof: Yr,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner
  }
}

function Ka(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Yr
}

function Wm(e) {
  var t = {
    "=": "=0",
    ":": "=2"
  };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n]
  })
}
var wu = /\/+/g;

function Ws(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Wm("" + e.key) : t.toString(36)
}

function bi(e, t, n, r, i) {
  var s = typeof e;
  (s === "undefined" || s === "boolean") && (e = null);
  var o = !1;
  if (e === null) o = !0;
  else switch (s) {
    case "string":
    case "number":
      o = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case Yr:
        case Vm:
          o = !0
      }
  }
  if (o) return o = e, i = i(o), e = r === "" ? "." + Ws(o, 0) : r, yu(i) ? (n = "", e != null && (n = e.replace(wu,
    "$&/") + "/"), bi(i, t, n, "", function(c) {
    return c
  })) : i != null && (Ka(i) && (i = $m(i, n + (!i.key || o && o.key === i.key ? "" : ("" + i.key).replace(wu,
    "$&/") + "/") + e)), t.push(i)), 1;
  if (o = 0, r = r === "" ? "." : r + ":", yu(e))
    for (var a = 0; a < e.length; a++) {
      s = e[a];
      var l = r + Ws(s, a);
      o += bi(s, t, n, l, i)
    } else if (l = Um(e), typeof l == "function")
      for (e = l.call(e), a = 0; !(s = e.next()).done;) s = s.value, l = r + Ws(s, a++), o += bi(s, t, n, l, i);
    else if (s === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t ===
      "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) +
    "). If you meant to render a collection of children, use an array instead.");
  return o
}

function ai(e, t, n) {
  if (e == null) return e;
  var r = [],
    i = 0;
  return bi(e, r, "", "", function(s) {
    return t.call(n, s, i++)
  }), r
}

function Hm(e) {
  if (e._status === -1) {
    var t = e._result;
    t = t(), t.then(function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n)
    }, function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n)
    }), e._status === -1 && (e._status = 0, e._result = t)
  }
  if (e._status === 1) return e._result.default;
  throw e._result
}
var ye = {
    current: null
  },
  zi = {
    transition: null
  },
  Km = {
    ReactCurrentDispatcher: ye,
    ReactCurrentBatchConfig: zi,
    ReactCurrentOwner: Ha
  };

function qd() {
  throw Error("act(...) is not supported in production builds of React.")
}
L.Children = {
  map: ai,
  forEach: function(e, t, n) {
    ai(e, function() {
      t.apply(this, arguments)
    }, n)
  },
  count: function(e) {
    var t = 0;
    return ai(e, function() {
      t++
    }), t
  },
  toArray: function(e) {
    return ai(e, function(t) {
      return t
    }) || []
  },
  only: function(e) {
    if (!Ka(e)) throw Error("React.Children.only expected to receive a single React element child.");
    return e
  }
};
L.Component = Kn;
L.Fragment = Mm;
L.Profiler = Dm;
L.PureComponent = $a;
L.StrictMode = Rm;
L.Suspense = Om;
L.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Km;
L.act = qd;
L.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e +
    ".");
  var r = Kd({}, e.props),
    i = e.key,
    s = e.ref,
    o = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (s = t.ref, o = Ha.current), t.key !== void 0 && (i = "" + t.key), e.type && e.type
      .defaultProps) var a = e.type.defaultProps;
    for (l in t) Yd.call(t, l) && !Xd.hasOwnProperty(l) && (r[l] = t[l] === void 0 && a !== void 0 ? a[l] : t[l])
  }
  var l = arguments.length - 2;
  if (l === 1) r.children = n;
  else if (1 < l) {
    a = Array(l);
    for (var c = 0; c < l; c++) a[c] = arguments[c + 2];
    r.children = a
  }
  return {
    $$typeof: Yr,
    type: e.type,
    key: i,
    ref: s,
    props: r,
    _owner: o
  }
};
L.createContext = function(e) {
  return e = {
    $$typeof: Im,
    _currentValue: e,
    _currentValue2: e,
    _threadCount: 0,
    Provider: null,
    Consumer: null,
    _defaultValue: null,
    _globalName: null
  }, e.Provider = {
    $$typeof: Lm,
    _context: e
  }, e.Consumer = e
};
L.createElement = Zd;
L.createFactory = function(e) {
  var t = Zd.bind(null, e);
  return t.type = e, t
};
L.createRef = function() {
  return {
    current: null
  }
};
L.forwardRef = function(e) {
  return {
    $$typeof: _m,
    render: e
  }
};
L.isValidElement = Ka;
L.lazy = function(e) {
  return {
    $$typeof: Bm,
    _payload: {
      _status: -1,
      _result: e
    },
    _init: Hm
  }
};
L.memo = function(e, t) {
  return {
    $$typeof: Fm,
    type: e,
    compare: t === void 0 ? null : t
  }
};
L.startTransition = function(e) {
  var t = zi.transition;
  zi.transition = {};
  try {
    e()
  } finally {
    zi.transition = t
  }
};
L.unstable_act = qd;
L.useCallback = function(e, t) {
  return ye.current.useCallback(e, t)
};
L.useContext = function(e) {
  return ye.current.useContext(e)
};
L.useDebugValue = function() {};
L.useDeferredValue = function(e) {
  return ye.current.useDeferredValue(e)
};
L.useEffect = function(e, t) {
  return ye.current.useEffect(e, t)
};
L.useId = function() {
  return ye.current.useId()
};
L.useImperativeHandle = function(e, t, n) {
  return ye.current.useImperativeHandle(e, t, n)
};
L.useInsertionEffect = function(e, t) {
  return ye.current.useInsertionEffect(e, t)
};
L.useLayoutEffect = function(e, t) {
  return ye.current.useLayoutEffect(e, t)
};
L.useMemo = function(e, t) {
  return ye.current.useMemo(e, t)
};
L.useReducer = function(e, t, n) {
  return ye.current.useReducer(e, t, n)
};
L.useRef = function(e) {
  return ye.current.useRef(e)
};
L.useState = function(e) {
  return ye.current.useState(e)
};
L.useSyncExternalStore = function(e, t, n) {
  return ye.current.useSyncExternalStore(e, t, n)
};
L.useTransition = function() {
  return ye.current.useTransition()
};
L.version = "18.3.1";
Wd.exports = L;
var C = Wd.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Gm = C,
  Qm = Symbol.for("react.element"),
  Ym = Symbol.for("react.fragment"),
  Xm = Object.prototype.hasOwnProperty,
  Zm = Gm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  qm = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  };

function Jd(e, t, n) {
  var r, i = {},
    s = null,
    o = null;
  n !== void 0 && (s = "" + n), t.key !== void 0 && (s = "" + t.key), t.ref !== void 0 && (o = t.ref);
  for (r in t) Xm.call(t, r) && !qm.hasOwnProperty(r) && (i[r] = t[r]);
  if (e && e.defaultProps)
    for (r in t = e.defaultProps, t) i[r] === void 0 && (i[r] = t[r]);
  return {
    $$typeof: Qm,
    type: e,
    key: s,
    ref: o,
    props: i,
    _owner: Zm.current
  }
}
ks.Fragment = Ym;
ks.jsx = Jd;
ks.jsxs = Jd;
$d.exports = ks;
var u = $d.exports,
  Ro = {},
  ef = {
    exports: {}
  },
  Ve = {},
  tf = {
    exports: {}
  },
  nf = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
  function t(E, M) {
    var R = E.length;
    E.push(M);
    e: for (; 0 < R;) {
      var X = R - 1 >>> 1,
        ie = E[X];
      if (0 < i(ie, M)) E[X] = M, E[R] = ie, R = X;
      else break e
    }
  }

  function n(E) {
    return E.length === 0 ? null : E[0]
  }

  function r(E) {
    if (E.length === 0) return null;
    var M = E[0],
      R = E.pop();
    if (R !== M) {
      E[0] = R;
      e: for (var X = 0, ie = E.length, si = ie >>> 1; X < si;) {
        var $t = 2 * (X + 1) - 1,
          $s = E[$t],
          Wt = $t + 1,
          oi = E[Wt];
        if (0 > i($s, R)) Wt < ie && 0 > i(oi, $s) ? (E[X] = oi, E[Wt] = R, X = Wt) : (E[X] = $s, E[$t] = R, X =
        $t);
        else if (Wt < ie && 0 > i(oi, R)) E[X] = oi, E[Wt] = R, X = Wt;
        else break e
      }
    }
    return M
  }

  function i(E, M) {
    var R = E.sortIndex - M.sortIndex;
    return R !== 0 ? R : E.id - M.id
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var s = performance;
    e.unstable_now = function() {
      return s.now()
    }
  } else {
    var o = Date,
      a = o.now();
    e.unstable_now = function() {
      return o.now() - a
    }
  }
  var l = [],
    c = [],
    d = 1,
    f = null,
    p = 3,
    v = !1,
    x = !1,
    y = !1,
    S = typeof setTimeout == "function" ? setTimeout : null,
    m = typeof clearTimeout == "function" ? clearTimeout : null,
    h = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);

  function g(E) {
    for (var M = n(c); M !== null;) {
      if (M.callback === null) r(c);
      else if (M.startTime <= E) r(c), M.sortIndex = M.expirationTime, t(l, M);
      else break;
      M = n(c)
    }
  }

  function w(E) {
    if (y = !1, g(E), !x)
      if (n(l) !== null) x = !0, ii(k);
      else {
        var M = n(c);
        M !== null && ee(w, M.startTime - E)
      }
  }

  function k(E, M) {
    x = !1, y && (y = !1, m(j), j = -1), v = !0;
    var R = p;
    try {
      for (g(M), f = n(l); f !== null && (!(f.expirationTime > M) || E && !re());) {
        var X = f.callback;
        if (typeof X == "function") {
          f.callback = null, p = f.priorityLevel;
          var ie = X(f.expirationTime <= M);
          M = e.unstable_now(), typeof ie == "function" ? f.callback = ie : f === n(l) && r(l), g(M)
        } else r(l);
        f = n(l)
      }
      if (f !== null) var si = !0;
      else {
        var $t = n(c);
        $t !== null && ee(w, $t.startTime - M), si = !1
      }
      return si
    } finally {
      f = null, p = R, v = !1
    }
  }
  var P = !1,
    T = null,
    j = -1,
    D = 5,
    V = -1;

  function re() {
    return !(e.unstable_now() - V < D)
  }

  function vt() {
    if (T !== null) {
      var E = e.unstable_now();
      V = E;
      var M = !0;
      try {
        M = T(!0, E)
      } finally {
        M ? Ut() : (P = !1, T = null)
      }
    } else P = !1
  }
  var Ut;
  if (typeof h == "function") Ut = function() {
    h(vt)
  };
  else if (typeof MessageChannel < "u") {
    var Zn = new MessageChannel,
      vu = Zn.port2;
    Zn.port1.onmessage = vt, Ut = function() {
      vu.postMessage(null)
    }
  } else Ut = function() {
    S(vt, 0)
  };

  function ii(E) {
    T = E, P || (P = !0, Ut())
  }

  function ee(E, M) {
    j = S(function() {
      E(e.unstable_now())
    }, M)
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e
    .unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e
    .unstable_cancelCallback = function(E) {
      E.callback = null
    }, e.unstable_continueExecution = function() {
      x || v || (x = !0, ii(k))
    }, e.unstable_forceFrameRate = function(E) {
      0 > E || 125 < E ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
        ) : D = 0 < E ? Math.floor(1e3 / E) : 5
    }, e.unstable_getCurrentPriorityLevel = function() {
      return p
    }, e.unstable_getFirstCallbackNode = function() {
      return n(l)
    }, e.unstable_next = function(E) {
      switch (p) {
        case 1:
        case 2:
        case 3:
          var M = 3;
          break;
        default:
          M = p
      }
      var R = p;
      p = M;
      try {
        return E()
      } finally {
        p = R
      }
    }, e.unstable_pauseExecution = function() {}, e.unstable_requestPaint = function() {}, e
    .unstable_runWithPriority = function(E, M) {
      switch (E) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          E = 3
      }
      var R = p;
      p = E;
      try {
        return M()
      } finally {
        p = R
      }
    }, e.unstable_scheduleCallback = function(E, M, R) {
      var X = e.unstable_now();
      switch (typeof R == "object" && R !== null ? (R = R.delay, R = typeof R == "number" && 0 < R ? X + R : X) : R =
        X, E) {
        case 1:
          var ie = -1;
          break;
        case 2:
          ie = 250;
          break;
        case 5:
          ie = 1073741823;
          break;
        case 4:
          ie = 1e4;
          break;
        default:
          ie = 5e3
      }
      return ie = R + ie, E = {
        id: d++,
        callback: M,
        priorityLevel: E,
        startTime: R,
        expirationTime: ie,
        sortIndex: -1
      }, R > X ? (E.sortIndex = R, t(c, E), n(l) === null && E === n(c) && (y ? (m(j), j = -1) : y = !0, ee(w, R -
        X))) : (E.sortIndex = ie, t(l, E), x || v || (x = !0, ii(k))), E
    }, e.unstable_shouldYield = re, e.unstable_wrapCallback = function(E) {
      var M = p;
      return function() {
        var R = p;
        p = M;
        try {
          return E.apply(this, arguments)
        } finally {
          p = R
        }
      }
    }
})(nf);
tf.exports = nf;
var Jm = tf.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var e0 = C,
  ze = Jm;

function N(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t +=
    "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
}
var rf = new Set,
  Cr = {};

function un(e, t) {
  Ln(e, t), Ln(e + "Capture", t)
}

function Ln(e, t) {
  for (Cr[e] = t, e = 0; e < t.length; e++) rf.add(t[e])
}
var dt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
  Do = Object.prototype.hasOwnProperty,
  t0 =
  /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  ku = {},
  Su = {};

function n0(e) {
  return Do.call(Su, e) ? !0 : Do.call(ku, e) ? !1 : t0.test(e) ? Su[e] = !0 : (ku[e] = !0, !1)
}

function r0(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !==
        "aria-");
    default:
      return !1
  }
}

function i0(e, t, n, r) {
  if (t === null || typeof t > "u" || r0(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null) switch (n.type) {
    case 3:
      return !t;
    case 4:
      return t === !1;
    case 5:
      return isNaN(t);
    case 6:
      return isNaN(t) || 1 > t
  }
  return !1
}

function we(e, t, n, r, i, s, o) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = i, this
    .mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = s, this.removeEmptyString = o
}
var ce = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
.split(" ").forEach(function(e) {
  ce[e] = new we(e, 0, !1, e, null, !1, !1)
});
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"]
].forEach(function(e) {
  var t = e[0];
  ce[t] = new we(t, 1, !1, e[1], null, !1, !1)
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  ce[e] = new we(e, 2, !1, e.toLowerCase(), null, !1, !1)
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  ce[e] = new we(e, 2, !1, e, null, !1, !1)
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
.split(" ").forEach(function(e) {
  ce[e] = new we(e, 3, !1, e.toLowerCase(), null, !1, !1)
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  ce[e] = new we(e, 3, !0, e, null, !1, !1)
});
["capture", "download"].forEach(function(e) {
  ce[e] = new we(e, 4, !1, e, null, !1, !1)
});
["cols", "rows", "size", "span"].forEach(function(e) {
  ce[e] = new we(e, 6, !1, e, null, !1, !1)
});
["rowSpan", "start"].forEach(function(e) {
  ce[e] = new we(e, 5, !1, e.toLowerCase(), null, !1, !1)
});
var Ga = /[\-:]([a-z])/g;

function Qa(e) {
  return e[1].toUpperCase()
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
.split(" ").forEach(function(e) {
  var t = e.replace(Ga, Qa);
  ce[t] = new we(t, 1, !1, e, null, !1, !1)
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Ga, Qa);
  ce[t] = new we(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1)
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Ga, Qa);
  ce[t] = new we(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1)
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ce[e] = new we(e, 1, !1, e.toLowerCase(), null, !1, !1)
});
ce.xlinkHref = new we("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ce[e] = new we(e, 1, !1, e.toLowerCase(), null, !0, !0)
});

function Ya(e, t, n, r) {
  var i = ce.hasOwnProperty(t) ? ce[t] : null;
  (i !== null ? i.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") &&
  (i0(t, n, i, r) && (n = null), r || i === null ? n0(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" +
    n)) : i.mustUseProperty ? e[i.propertyName] = n === null ? i.type === 3 ? !1 : "" : n : (t = i.attributeName, r =
    i.attributeNamespace, n === null ? e.removeAttribute(t) : (i = i.type, n = i === 3 || i === 4 && n === !0 ? "" :
      "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))))
}
var gt = e0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  li = Symbol.for("react.element"),
  pn = Symbol.for("react.portal"),
  hn = Symbol.for("react.fragment"),
  Xa = Symbol.for("react.strict_mode"),
  Lo = Symbol.for("react.profiler"),
  sf = Symbol.for("react.provider"),
  of = Symbol.for("react.context"),
  Za = Symbol.for("react.forward_ref"),
  Io = Symbol.for("react.suspense"),
  _o = Symbol.for("react.suspense_list"),
  qa = Symbol.for("react.memo"),
  wt = Symbol.for("react.lazy"),
  af = Symbol.for("react.offscreen"),
  ju = Symbol.iterator;

function qn(e) {
  return e === null || typeof e != "object" ? null : (e = ju && e[ju] || e["@@iterator"], typeof e == "function" ? e :
    null)
}
var G = Object.assign,
  Hs;

function ar(e) {
  if (Hs === void 0) try {
    throw Error()
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Hs = t && t[1] || ""
  }
  return `
` + Hs + e
}
var Ks = !1;

function Gs(e, t) {
  if (!e || Ks) return "";
  Ks = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (t = function() {
          throw Error()
        }, Object.defineProperty(t.prototype, "props", {
          set: function() {
            throw Error()
          }
        }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(t, [])
        } catch (c) {
          var r = c
        }
        Reflect.construct(e, [], t)
      } else {
        try {
          t.call()
        } catch (c) {
          r = c
        }
        e.call(t.prototype)
      }
    else {
      try {
        throw Error()
      } catch (c) {
        r = c
      }
      e()
    }
  } catch (c) {
    if (c && r && typeof c.stack == "string") {
      for (var i = c.stack.split(`
`), s = r.stack.split(`
`), o = i.length - 1, a = s.length - 1; 1 <= o && 0 <= a && i[o] !== s[a];) a--;
      for (; 1 <= o && 0 <= a; o--, a--)
        if (i[o] !== s[a]) {
          if (o !== 1 || a !== 1)
            do
              if (o--, a--, 0 > a || i[o] !== s[a]) {
                var l = `
` + i[o].replace(" at new ", " at ");
                return e.displayName && l.includes("<anonymous>") && (l = l.replace("<anonymous>", e.displayName)), l
              } while (1 <= o && 0 <= a);
          break
        }
    }
  } finally {
    Ks = !1, Error.prepareStackTrace = n
  }
  return (e = e ? e.displayName || e.name : "") ? ar(e) : ""
}

function s0(e) {
  switch (e.tag) {
    case 5:
      return ar(e.type);
    case 16:
      return ar("Lazy");
    case 13:
      return ar("Suspense");
    case 19:
      return ar("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Gs(e.type, !1), e;
    case 11:
      return e = Gs(e.type.render, !1), e;
    case 1:
      return e = Gs(e.type, !0), e;
    default:
      return ""
  }
}

function Oo(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case hn:
      return "Fragment";
    case pn:
      return "Portal";
    case Lo:
      return "Profiler";
    case Xa:
      return "StrictMode";
    case Io:
      return "Suspense";
    case _o:
      return "SuspenseList"
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case of:
      return (e.displayName || "Context") + ".Consumer";
    case sf:
      return (e._context.displayName || "Context") + ".Provider";
    case Za:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" :
        "ForwardRef"), e;
    case qa:
      return t = e.displayName || null, t !== null ? t : Oo(e.type) || "Memo";
    case wt:
      t = e._payload, e = e._init;
      try {
        return Oo(e(t))
      } catch {}
  }
  return null
}

function o0(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" :
        "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Oo(t);
    case 8:
      return t === Xa ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t
  }
  return null
}

function Rt(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return ""
  }
}

function lf(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio")
}

function a0(e) {
  var t = lf(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var i = n.get,
      s = n.set;
    return Object.defineProperty(e, t, {
      configurable: !0,
      get: function() {
        return i.call(this)
      },
      set: function(o) {
        r = "" + o, s.call(this, o)
      }
    }), Object.defineProperty(e, t, {
      enumerable: n.enumerable
    }), {
      getValue: function() {
        return r
      },
      setValue: function(o) {
        r = "" + o
      },
      stopTracking: function() {
        e._valueTracker = null, delete e[t]
      }
    }
  }
}

function ui(e) {
  e._valueTracker || (e._valueTracker = a0(e))
}

function uf(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return e && (r = lf(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1
}

function Wi(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body
  } catch {
    return e.body
  }
}

function Fo(e, t) {
  var n = t.checked;
  return G({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked
  })
}

function Nu(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  n = Rt(t.value != null ? t.value : n), e._wrapperState = {
    initialChecked: r,
    initialValue: n,
    controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
  }
}

function cf(e, t) {
  t = t.checked, t != null && Ya(e, "checked", t, !1)
}

function Bo(e, t) {
  cf(e, t);
  var n = Rt(t.value),
    r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" +
    n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return
  }
  t.hasOwnProperty("value") ? Uo(e, t.type, n) : t.hasOwnProperty("defaultValue") && Uo(e, t.type, Rt(t.defaultValue)),
    t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked)
}

function Pu(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n)
}

function Uo(e, t, n) {
  (t !== "number" || Wi(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e
    .defaultValue !== "" + n && (e.defaultValue = "" + n))
}
var lr = Array.isArray;

function zn(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
    for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i),
      i && r && (e[n].defaultSelected = !0)
  } else {
    for (n = "" + Rt(n), t = null, i = 0; i < e.length; i++) {
      if (e[i].value === n) {
        e[i].selected = !0, r && (e[i].defaultSelected = !0);
        return
      }
      t !== null || e[i].disabled || (t = e[i])
    }
    t !== null && (t.selected = !0)
  }
}

function $o(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(N(91));
  return G({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue
  })
}

function Tu(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(N(92));
      if (lr(n)) {
        if (1 < n.length) throw Error(N(93));
        n = n[0]
      }
      t = n
    }
    t == null && (t = ""), n = t
  }
  e._wrapperState = {
    initialValue: Rt(n)
  }
}

function df(e, t) {
  var n = Rt(t.value),
    r = Rt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e
    .defaultValue = n)), r != null && (e.defaultValue = "" + r)
}

function Cu(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t)
}

function ff(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml"
  }
}

function Wo(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? ff(t) : e === "http://www.w3.org/2000/svg" && t ===
    "foreignObject" ? "http://www.w3.org/1999/xhtml" : e
}
var ci, pf = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, i) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, i)
    })
  } : e
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (ci = ci || document.createElement("div"), ci.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t =
      ci.firstChild; e.firstChild;) e.removeChild(e.firstChild);
    for (; t.firstChild;) e.appendChild(t.firstChild)
  }
});

function Er(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return
    }
  }
  e.textContent = t
}
var hr = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  },
  l0 = ["Webkit", "ms", "Moz", "O"];
Object.keys(hr).forEach(function(e) {
  l0.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), hr[t] = hr[e]
  })
});

function hf(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || hr
    .hasOwnProperty(e) && hr[e] ? ("" + t).trim() : t + "px"
}

function mf(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        i = hf(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : e[n] = i
    }
}
var u0 = G({
  menuitem: !0
}, {
  area: !0,
  base: !0,
  br: !0,
  col: !0,
  embed: !0,
  hr: !0,
  img: !0,
  input: !0,
  keygen: !0,
  link: !0,
  meta: !0,
  param: !0,
  source: !0,
  track: !0,
  wbr: !0
});

function Ho(e, t) {
  if (t) {
    if (u0[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(N(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(N(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(N(61))
    }
    if (t.style != null && typeof t.style != "object") throw Error(N(62))
  }
}

function Ko(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0
  }
}
var Go = null;

function Ja(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e
    .nodeType === 3 ? e.parentNode : e
}
var Qo = null,
  An = null,
  Vn = null;

function Eu(e) {
  if (e = qr(e)) {
    if (typeof Qo != "function") throw Error(N(280));
    var t = e.stateNode;
    t && (t = Ts(t), Qo(e.stateNode, e.type, t))
  }
}

function gf(e) {
  An ? Vn ? Vn.push(e) : Vn = [e] : An = e
}

function vf() {
  if (An) {
    var e = An,
      t = Vn;
    if (Vn = An = null, Eu(e), t)
      for (e = 0; e < t.length; e++) Eu(t[e])
  }
}

function xf(e, t) {
  return e(t)
}

function yf() {}
var Qs = !1;

function wf(e, t, n) {
  if (Qs) return e(t, n);
  Qs = !0;
  try {
    return xf(e, t, n)
  } finally {
    Qs = !1, (An !== null || Vn !== null) && (yf(), vf())
  }
}

function br(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Ts(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")),
      e = !r;
      break e;
    default:
      e = !1
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(N(231, t, typeof n));
  return n
}
var Yo = !1;
if (dt) try {
  var Jn = {};
  Object.defineProperty(Jn, "passive", {
    get: function() {
      Yo = !0
    }
  }), window.addEventListener("test", Jn, Jn), window.removeEventListener("test", Jn, Jn)
} catch {
  Yo = !1
}

function c0(e, t, n, r, i, s, o, a, l) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c)
  } catch (d) {
    this.onError(d)
  }
}
var mr = !1,
  Hi = null,
  Ki = !1,
  Xo = null,
  d0 = {
    onError: function(e) {
      mr = !0, Hi = e
    }
  };

function f0(e, t, n, r, i, s, o, a, l) {
  mr = !1, Hi = null, c0.apply(d0, arguments)
}

function p0(e, t, n, r, i, s, o, a, l) {
  if (f0.apply(this, arguments), mr) {
    if (mr) {
      var c = Hi;
      mr = !1, Hi = null
    } else throw Error(N(198));
    Ki || (Ki = !0, Xo = c)
  }
}

function cn(e) {
  var t = e,
    n = e;
  if (e.alternate)
    for (; t.return;) t = t.return;
  else {
    e = t;
    do t = e, t.flags & 4098 && (n = t.return), e = t.return; while (e)
  }
  return t.tag === 3 ? n : null
}

function kf(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated
  }
  return null
}

function bu(e) {
  if (cn(e) !== e) throw Error(N(188))
}

function h0(e) {
  var t = e.alternate;
  if (!t) {
    if (t = cn(e), t === null) throw Error(N(188));
    return t !== e ? null : e
  }
  for (var n = e, r = t;;) {
    var i = n.return;
    if (i === null) break;
    var s = i.alternate;
    if (s === null) {
      if (r = i.return, r !== null) {
        n = r;
        continue
      }
      break
    }
    if (i.child === s.child) {
      for (s = i.child; s;) {
        if (s === n) return bu(i), e;
        if (s === r) return bu(i), t;
        s = s.sibling
      }
      throw Error(N(188))
    }
    if (n.return !== r.return) n = i, r = s;
    else {
      for (var o = !1, a = i.child; a;) {
        if (a === n) {
          o = !0, n = i, r = s;
          break
        }
        if (a === r) {
          o = !0, r = i, n = s;
          break
        }
        a = a.sibling
      }
      if (!o) {
        for (a = s.child; a;) {
          if (a === n) {
            o = !0, n = s, r = i;
            break
          }
          if (a === r) {
            o = !0, r = s, n = i;
            break
          }
          a = a.sibling
        }
        if (!o) throw Error(N(189))
      }
    }
    if (n.alternate !== r) throw Error(N(190))
  }
  if (n.tag !== 3) throw Error(N(188));
  return n.stateNode.current === n ? e : t
}

function Sf(e) {
  return e = h0(e), e !== null ? jf(e) : null
}

function jf(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null;) {
    var t = jf(e);
    if (t !== null) return t;
    e = e.sibling
  }
  return null
}
var Nf = ze.unstable_scheduleCallback,
  zu = ze.unstable_cancelCallback,
  m0 = ze.unstable_shouldYield,
  g0 = ze.unstable_requestPaint,
  q = ze.unstable_now,
  v0 = ze.unstable_getCurrentPriorityLevel,
  el = ze.unstable_ImmediatePriority,
  Pf = ze.unstable_UserBlockingPriority,
  Gi = ze.unstable_NormalPriority,
  x0 = ze.unstable_LowPriority,
  Tf = ze.unstable_IdlePriority,
  Ss = null,
  Je = null;

function y0(e) {
  if (Je && typeof Je.onCommitFiberRoot == "function") try {
    Je.onCommitFiberRoot(Ss, e, void 0, (e.current.flags & 128) === 128)
  } catch {}
}
var Ge = Math.clz32 ? Math.clz32 : S0,
  w0 = Math.log,
  k0 = Math.LN2;

function S0(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (w0(e) / k0 | 0) | 0
}
var di = 64,
  fi = 4194304;

function ur(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e
  }
}

function Qi(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    i = e.suspendedLanes,
    s = e.pingedLanes,
    o = n & 268435455;
  if (o !== 0) {
    var a = o & ~i;
    a !== 0 ? r = ur(a) : (s &= o, s !== 0 && (r = ur(s)))
  } else o = n & ~i, o !== 0 ? r = ur(o) : s !== 0 && (r = ur(s));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & i) && (i = r & -r, s = t & -t, i >= s || i === 16 && (s & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0)
    for (e = e.entanglements, t &= r; 0 < t;) n = 31 - Ge(t), i = 1 << n, r |= e[n], t &= ~i;
  return r
}

function j0(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1
  }
}

function N0(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, s = e.pendingLanes; 0 < s;) {
    var o = 31 - Ge(s),
      a = 1 << o,
      l = i[o];
    l === -1 ? (!(a & n) || a & r) && (i[o] = j0(a, t)) : l <= t && (e.expiredLanes |= a), s &= ~a
  }
}

function Zo(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
}

function Cf() {
  var e = di;
  return di <<= 1, !(di & 4194240) && (di = 64), e
}

function Ys(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t
}

function Xr(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Ge(t),
    e[t] = n
}

function P0(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e
    .entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n;) {
    var i = 31 - Ge(n),
      s = 1 << i;
    t[i] = 0, r[i] = -1, e[i] = -1, n &= ~s
  }
}

function tl(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n;) {
    var r = 31 - Ge(n),
      i = 1 << r;
    i & t | e[r] & t && (e[r] |= t), n &= ~i
  }
}
var _ = 0;

function Ef(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1
}
var bf, nl, zf, Af, Vf, qo = !1,
  pi = [],
  Tt = null,
  Ct = null,
  Et = null,
  zr = new Map,
  Ar = new Map,
  St = [],
  T0 =
  "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit"
  .split(" ");

function Au(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Tt = null;
      break;
    case "dragenter":
    case "dragleave":
      Ct = null;
      break;
    case "mouseover":
    case "mouseout":
      Et = null;
      break;
    case "pointerover":
    case "pointerout":
      zr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Ar.delete(t.pointerId)
  }
}

function er(e, t, n, r, i, s) {
  return e === null || e.nativeEvent !== s ? (e = {
    blockedOn: t,
    domEventName: n,
    eventSystemFlags: r,
    nativeEvent: s,
    targetContainers: [i]
  }, t !== null && (t = qr(t), t !== null && nl(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !==
    null && t.indexOf(i) === -1 && t.push(i), e)
}

function C0(e, t, n, r, i) {
  switch (t) {
    case "focusin":
      return Tt = er(Tt, e, t, n, r, i), !0;
    case "dragenter":
      return Ct = er(Ct, e, t, n, r, i), !0;
    case "mouseover":
      return Et = er(Et, e, t, n, r, i), !0;
    case "pointerover":
      var s = i.pointerId;
      return zr.set(s, er(zr.get(s) || null, e, t, n, r, i)), !0;
    case "gotpointercapture":
      return s = i.pointerId, Ar.set(s, er(Ar.get(s) || null, e, t, n, r, i)), !0
  }
  return !1
}

function Mf(e) {
  var t = Xt(e.target);
  if (t !== null) {
    var n = cn(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = kf(n), t !== null) {
          e.blockedOn = t, Vf(e.priority, function() {
            zf(n)
          });
          return
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return
      }
    }
  }
  e.blockedOn = null
}

function Ai(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length;) {
    var n = Jo(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      Go = r, n.target.dispatchEvent(r), Go = null
    } else return t = qr(n), t !== null && nl(t), e.blockedOn = n, !1;
    t.shift()
  }
  return !0
}

function Vu(e, t, n) {
  Ai(e) && n.delete(t)
}

function E0() {
  qo = !1, Tt !== null && Ai(Tt) && (Tt = null), Ct !== null && Ai(Ct) && (Ct = null), Et !== null && Ai(Et) && (Et =
    null), zr.forEach(Vu), Ar.forEach(Vu)
}

function tr(e, t) {
  e.blockedOn === t && (e.blockedOn = null, qo || (qo = !0, ze.unstable_scheduleCallback(ze.unstable_NormalPriority,
    E0)))
}

function Vr(e) {
  function t(i) {
    return tr(i, e)
  }
  if (0 < pi.length) {
    tr(pi[0], e);
    for (var n = 1; n < pi.length; n++) {
      var r = pi[n];
      r.blockedOn === e && (r.blockedOn = null)
    }
  }
  for (Tt !== null && tr(Tt, e), Ct !== null && tr(Ct, e), Et !== null && tr(Et, e), zr.forEach(t), Ar.forEach(t), n =
    0; n < St.length; n++) r = St[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < St.length && (n = St[0], n.blockedOn === null);) Mf(n), n.blockedOn === null && St.shift()
}
var Mn = gt.ReactCurrentBatchConfig,
  Yi = !0;

function b0(e, t, n, r) {
  var i = _,
    s = Mn.transition;
  Mn.transition = null;
  try {
    _ = 1, rl(e, t, n, r)
  } finally {
    _ = i, Mn.transition = s
  }
}

function z0(e, t, n, r) {
  var i = _,
    s = Mn.transition;
  Mn.transition = null;
  try {
    _ = 4, rl(e, t, n, r)
  } finally {
    _ = i, Mn.transition = s
  }
}

function rl(e, t, n, r) {
  if (Yi) {
    var i = Jo(e, t, n, r);
    if (i === null) so(e, t, r, Xi, n), Au(e, r);
    else if (C0(i, e, t, n, r)) r.stopPropagation();
    else if (Au(e, r), t & 4 && -1 < T0.indexOf(e)) {
      for (; i !== null;) {
        var s = qr(i);
        if (s !== null && bf(s), s = Jo(e, t, n, r), s === null && so(e, t, r, Xi, n), s === i) break;
        i = s
      }
      i !== null && r.stopPropagation()
    } else so(e, t, r, null, n)
  }
}
var Xi = null;

function Jo(e, t, n, r) {
  if (Xi = null, e = Ja(r), e = Xt(e), e !== null)
    if (t = cn(e), t === null) e = null;
    else if (n = t.tag, n === 13) {
    if (e = kf(t), e !== null) return e;
    e = null
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null
  } else t !== e && (e = null);
  return Xi = e, null
}

function Rf(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (v0()) {
        case el:
          return 1;
        case Pf:
          return 4;
        case Gi:
        case x0:
          return 16;
        case Tf:
          return 536870912;
        default:
          return 16
      }
    default:
      return 16
  }
}
var Nt = null,
  il = null,
  Vi = null;

function Df() {
  if (Vi) return Vi;
  var e, t = il,
    n = t.length,
    r, i = "value" in Nt ? Nt.value : Nt.textContent,
    s = i.length;
  for (e = 0; e < n && t[e] === i[e]; e++);
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === i[s - r]; r++);
  return Vi = i.slice(e, 1 < r ? 1 - r : void 0)
}

function Mi(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e ||
    e === 13 ? e : 0
}

function hi() {
  return !0
}

function Mu() {
  return !1
}

function Me(e) {
  function t(n, r, i, s, o) {
    this._reactName = n, this._targetInst = i, this.type = r, this.nativeEvent = s, this.target = o, this
      .currentTarget = null;
    for (var a in e) e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(s) : s[a]);
    return this.isDefaultPrevented = (s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1) ? hi : Mu,
      this.isPropagationStopped = Mu, this
  }
  return G(t.prototype, {
    preventDefault: function() {
      this.defaultPrevented = !0;
      var n = this.nativeEvent;
      n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1),
        this.isDefaultPrevented = hi)
    },
    stopPropagation: function() {
      var n = this.nativeEvent;
      n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
        this.isPropagationStopped = hi)
    },
    persist: function() {},
    isPersistent: hi
  }), t
}
var Gn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now()
    },
    defaultPrevented: 0,
    isTrusted: 0
  },
  sl = Me(Gn),
  Zr = G({}, Gn, {
    view: 0,
    detail: 0
  }),
  A0 = Me(Zr),
  Xs, Zs, nr, js = G({}, Zr, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: ol,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e
        .relatedTarget
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== nr && (nr && e.type === "mousemove" ? (Xs = e.screenX - nr
        .screenX, Zs = e.screenY - nr.screenY) : Zs = Xs = 0, nr = e), Xs)
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Zs
    }
  }),
  Ru = Me(js),
  V0 = G({}, js, {
    dataTransfer: 0
  }),
  M0 = Me(V0),
  R0 = G({}, Zr, {
    relatedTarget: 0
  }),
  qs = Me(R0),
  D0 = G({}, Gn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }),
  L0 = Me(D0),
  I0 = G({}, Gn, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData
    }
  }),
  _0 = Me(I0),
  O0 = G({}, Gn, {
    data: 0
  }),
  Du = Me(O0),
  F0 = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  },
  B0 = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  },
  U0 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };

function $0(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = U0[e]) ? !!t[e] : !1
}

function ol() {
  return $0
}
var W0 = G({}, Zr, {
    key: function(e) {
      if (e.key) {
        var t = F0[e.key] || e.key;
        if (t !== "Unidentified") return t
      }
      return e.type === "keypress" ? (e = Mi(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type ===
        "keydown" || e.type === "keyup" ? B0[e.keyCode] || "Unidentified" : ""
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: ol,
    charCode: function(e) {
      return e.type === "keypress" ? Mi(e) : 0
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
    },
    which: function(e) {
      return e.type === "keypress" ? Mi(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
    }
  }),
  H0 = Me(W0),
  K0 = G({}, js, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }),
  Lu = Me(K0),
  G0 = G({}, Zr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: ol
  }),
  Q0 = Me(G0),
  Y0 = G({}, Gn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }),
  X0 = Me(Y0),
  Z0 = G({}, js, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0
    },
    deltaZ: 0,
    deltaMode: 0
  }),
  q0 = Me(Z0),
  J0 = [9, 13, 27, 32],
  al = dt && "CompositionEvent" in window,
  gr = null;
dt && "documentMode" in document && (gr = document.documentMode);
var eg = dt && "TextEvent" in window && !gr,
  Lf = dt && (!al || gr && 8 < gr && 11 >= gr),
  Iu = " ",
  _u = !1;

function If(e, t) {
  switch (e) {
    case "keyup":
      return J0.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1
  }
}

function _f(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null
}
var mn = !1;

function tg(e, t) {
  switch (e) {
    case "compositionend":
      return _f(t);
    case "keypress":
      return t.which !== 32 ? null : (_u = !0, Iu);
    case "textInput":
      return e = t.data, e === Iu && _u ? null : e;
    default:
      return null
  }
}

function ng(e, t) {
  if (mn) return e === "compositionend" || !al && If(e, t) ? (e = Df(), Vi = il = Nt = null, mn = !1, e) : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which)
      }
      return null;
    case "compositionend":
      return Lf && t.locale !== "ko" ? null : t.data;
    default:
      return null
  }
}
var rg = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0
};

function Ou(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!rg[e.type] : t === "textarea"
}

function Of(e, t, n, r) {
  gf(r), t = Zi(t, "onChange"), 0 < t.length && (n = new sl("onChange", "change", null, n, r), e.push({
    event: n,
    listeners: t
  }))
}
var vr = null,
  Mr = null;

function ig(e) {
  Xf(e, 0)
}

function Ns(e) {
  var t = xn(e);
  if (uf(t)) return e
}

function sg(e, t) {
  if (e === "change") return t
}
var Ff = !1;
if (dt) {
  var Js;
  if (dt) {
    var eo = "oninput" in document;
    if (!eo) {
      var Fu = document.createElement("div");
      Fu.setAttribute("oninput", "return;"), eo = typeof Fu.oninput == "function"
    }
    Js = eo
  } else Js = !1;
  Ff = Js && (!document.documentMode || 9 < document.documentMode)
}

function Bu() {
  vr && (vr.detachEvent("onpropertychange", Bf), Mr = vr = null)
}

function Bf(e) {
  if (e.propertyName === "value" && Ns(Mr)) {
    var t = [];
    Of(t, Mr, e, Ja(e)), wf(ig, t)
  }
}

function og(e, t, n) {
  e === "focusin" ? (Bu(), vr = t, Mr = n, vr.attachEvent("onpropertychange", Bf)) : e === "focusout" && Bu()
}

function ag(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Ns(Mr)
}

function lg(e, t) {
  if (e === "click") return Ns(t)
}

function ug(e, t) {
  if (e === "input" || e === "change") return Ns(t)
}

function cg(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
}
var Ye = typeof Object.is == "function" ? Object.is : cg;

function Rr(e, t) {
  if (Ye(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var i = n[r];
    if (!Do.call(t, i) || !Ye(e[i], t[i])) return !1
  }
  return !0
}

function Uu(e) {
  for (; e && e.firstChild;) e = e.firstChild;
  return e
}

function $u(e, t) {
  var n = Uu(e);
  e = 0;
  for (var r; n;) {
    if (n.nodeType === 3) {
      if (r = e + n.textContent.length, e <= t && r >= t) return {
        node: n,
        offset: t - e
      };
      e = r
    }
    e: {
      for (; n;) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e
        }
        n = n.parentNode
      }
      n = void 0
    }
    n = Uu(n)
  }
}

function Uf(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Uf(e, t.parentNode) :
    "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1
}

function $f() {
  for (var e = window, t = Wi(); t instanceof e.HTMLIFrameElement;) {
    try {
      var n = typeof t.contentWindow.location.href == "string"
    } catch {
      n = !1
    }
    if (n) e = t.contentWindow;
    else break;
    t = Wi(e.document)
  }
  return t
}

function ll(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e
    .type === "password") || t === "textarea" || e.contentEditable === "true")
}

function dg(e) {
  var t = $f(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Uf(n.ownerDocument.documentElement, n)) {
    if (r !== null && ll(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd =
        Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var i = n.textContent.length,
          s = Math.min(r.start, i);
        r = r.end === void 0 ? s : Math.min(r.end, i), !e.extend && s > r && (i = r, r = s, s = i), i = $u(n, s);
        var o = $u(n, r);
        i && o && (e.rangeCount !== 1 || e.anchorNode !== i.node || e.anchorOffset !== i.offset || e.focusNode !== o
          .node || e.focusOffset !== o.offset) && (t = t.createRange(), t.setStart(i.node, i.offset), e
          .removeAllRanges(), s > r ? (e.addRange(t), e.extend(o.node, o.offset)) : (t.setEnd(o.node, o.offset), e
            .addRange(t)))
      }
    }
    for (t = [], e = n; e = e.parentNode;) e.nodeType === 1 && t.push({
      element: e,
      left: e.scrollLeft,
      top: e.scrollTop
    });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e
      .element.scrollTop = e.top
  }
}
var fg = dt && "documentMode" in document && 11 >= document.documentMode,
  gn = null,
  ea = null,
  xr = null,
  ta = !1;

function Wu(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  ta || gn == null || gn !== Wi(r) || (r = gn, "selectionStart" in r && ll(r) ? r = {
    start: r.selectionStart,
    end: r.selectionEnd
  } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
    anchorNode: r.anchorNode,
    anchorOffset: r.anchorOffset,
    focusNode: r.focusNode,
    focusOffset: r.focusOffset
  }), xr && Rr(xr, r) || (xr = r, r = Zi(ea, "onSelect"), 0 < r.length && (t = new sl("onSelect", "select", null, t,
    n), e.push({
    event: t,
    listeners: r
  }), t.target = gn)))
}

function mi(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n
}
var vn = {
    animationend: mi("Animation", "AnimationEnd"),
    animationiteration: mi("Animation", "AnimationIteration"),
    animationstart: mi("Animation", "AnimationStart"),
    transitionend: mi("Transition", "TransitionEnd")
  },
  to = {},
  Wf = {};
dt && (Wf = document.createElement("div").style, "AnimationEvent" in window || (delete vn.animationend.animation,
    delete vn.animationiteration.animation, delete vn.animationstart.animation), "TransitionEvent" in window ||
  delete vn.transitionend.transition);

function Ps(e) {
  if (to[e]) return to[e];
  if (!vn[e]) return e;
  var t = vn[e],
    n;
  for (n in t)
    if (t.hasOwnProperty(n) && n in Wf) return to[e] = t[n];
  return e
}
var Hf = Ps("animationend"),
  Kf = Ps("animationiteration"),
  Gf = Ps("animationstart"),
  Qf = Ps("transitionend"),
  Yf = new Map,
  Hu =
  "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel"
  .split(" ");

function _t(e, t) {
  Yf.set(e, t), un(t, [e])
}
for (var no = 0; no < Hu.length; no++) {
  var ro = Hu[no],
    pg = ro.toLowerCase(),
    hg = ro[0].toUpperCase() + ro.slice(1);
  _t(pg, "on" + hg)
}
_t(Hf, "onAnimationEnd");
_t(Kf, "onAnimationIteration");
_t(Gf, "onAnimationStart");
_t("dblclick", "onDoubleClick");
_t("focusin", "onFocus");
_t("focusout", "onBlur");
_t(Qf, "onTransitionEnd");
Ln("onMouseEnter", ["mouseout", "mouseover"]);
Ln("onMouseLeave", ["mouseout", "mouseover"]);
Ln("onPointerEnter", ["pointerout", "pointerover"]);
Ln("onPointerLeave", ["pointerout", "pointerover"]);
un("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
un("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
un("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
un("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
un("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
un("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var cr =
  "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting"
  .split(" "),
  mg = new Set("cancel close invalid load scroll toggle".split(" ").concat(cr));

function Ku(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, p0(r, t, void 0, e), e.currentTarget = null
}

function Xf(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      i = r.event;
    r = r.listeners;
    e: {
      var s = void 0;
      if (t)
        for (var o = r.length - 1; 0 <= o; o--) {
          var a = r[o],
            l = a.instance,
            c = a.currentTarget;
          if (a = a.listener, l !== s && i.isPropagationStopped()) break e;
          Ku(i, a, c), s = l
        } else
          for (o = 0; o < r.length; o++) {
            if (a = r[o], l = a.instance, c = a.currentTarget, a = a.listener, l !== s && i.isPropagationStopped())
              break e;
            Ku(i, a, c), s = l
          }
    }
  }
  if (Ki) throw e = Xo, Ki = !1, Xo = null, e
}

function F(e, t) {
  var n = t[oa];
  n === void 0 && (n = t[oa] = new Set);
  var r = e + "__bubble";
  n.has(r) || (Zf(t, e, 2, !1), n.add(r))
}

function io(e, t, n) {
  var r = 0;
  t && (r |= 4), Zf(n, e, r, t)
}
var gi = "_reactListening" + Math.random().toString(36).slice(2);

function Dr(e) {
  if (!e[gi]) {
    e[gi] = !0, rf.forEach(function(n) {
      n !== "selectionchange" && (mg.has(n) || io(n, !1, e), io(n, !0, e))
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[gi] || (t[gi] = !0, io("selectionchange", !1, t))
  }
}

function Zf(e, t, n, r) {
  switch (Rf(t)) {
    case 1:
      var i = b0;
      break;
    case 4:
      i = z0;
      break;
    default:
      i = rl
  }
  n = i.bind(null, t, n, e), i = void 0, !Yo || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0),
    r ? i !== void 0 ? e.addEventListener(t, n, {
      capture: !0,
      passive: i
    }) : e.addEventListener(t, n, !0) : i !== void 0 ? e.addEventListener(t, n, {
      passive: i
    }) : e.addEventListener(t, n, !1)
}

function so(e, t, n, r, i) {
  var s = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (;;) {
    if (r === null) return;
    var o = r.tag;
    if (o === 3 || o === 4) {
      var a = r.stateNode.containerInfo;
      if (a === i || a.nodeType === 8 && a.parentNode === i) break;
      if (o === 4)
        for (o = r.return; o !== null;) {
          var l = o.tag;
          if ((l === 3 || l === 4) && (l = o.stateNode.containerInfo, l === i || l.nodeType === 8 && l.parentNode ===
              i)) return;
          o = o.return
        }
      for (; a !== null;) {
        if (o = Xt(a), o === null) return;
        if (l = o.tag, l === 5 || l === 6) {
          r = s = o;
          continue e
        }
        a = a.parentNode
      }
    }
    r = r.return
  }
  wf(function() {
    var c = s,
      d = Ja(n),
      f = [];
    e: {
      var p = Yf.get(e);
      if (p !== void 0) {
        var v = sl,
          x = e;
        switch (e) {
          case "keypress":
            if (Mi(n) === 0) break e;
          case "keydown":
          case "keyup":
            v = H0;
            break;
          case "focusin":
            x = "focus", v = qs;
            break;
          case "focusout":
            x = "blur", v = qs;
            break;
          case "beforeblur":
          case "afterblur":
            v = qs;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            v = Ru;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = M0;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = Q0;
            break;
          case Hf:
          case Kf:
          case Gf:
            v = L0;
            break;
          case Qf:
            v = X0;
            break;
          case "scroll":
            v = A0;
            break;
          case "wheel":
            v = q0;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = _0;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = Lu
        }
        var y = (t & 4) !== 0,
          S = !y && e === "scroll",
          m = y ? p !== null ? p + "Capture" : null : p;
        y = [];
        for (var h = c, g; h !== null;) {
          g = h;
          var w = g.stateNode;
          if (g.tag === 5 && w !== null && (g = w, m !== null && (w = br(h, m), w != null && y.push(Lr(h, w,
            g)))), S) break;
          h = h.return
        }
        0 < y.length && (p = new v(p, x, null, n, d), f.push({
          event: p,
          listeners: y
        }))
      }
    }
    if (!(t & 7)) {
      e: {
        if (p = e === "mouseover" || e === "pointerover", v = e === "mouseout" || e === "pointerout", p && n !==
          Go && (x = n.relatedTarget || n.fromElement) && (Xt(x) || x[ft])) break e;
        if ((v || p) && (p = d.window === d ? d : (p = d.ownerDocument) ? p.defaultView || p.parentWindow : window,
            v ? (x = n.relatedTarget || n.toElement, v = c, x = x ? Xt(x) : null, x !== null && (S = cn(x), x !==
              S || x.tag !== 5 && x.tag !== 6) && (x = null)) : (v = null, x = c), v !== x)) {
          if (y = Ru, w = "onMouseLeave", m = "onMouseEnter", h = "mouse", (e === "pointerout" || e ===
              "pointerover") && (y = Lu, w = "onPointerLeave", m = "onPointerEnter", h = "pointer"), S = v == null ?
            p : xn(v), g = x == null ? p : xn(x), p = new y(w, h + "leave", v, n, d), p.target = S, p
            .relatedTarget = g, w = null, Xt(d) === c && (y = new y(m, h + "enter", x, n, d), y.target = g, y
              .relatedTarget = S, w = y), S = w, v && x) t: {
            for (y = v, m = x, h = 0, g = y; g; g = fn(g)) h++;
            for (g = 0, w = m; w; w = fn(w)) g++;
            for (; 0 < h - g;) y = fn(y),
            h--;
            for (; 0 < g - h;) m = fn(m),
            g--;
            for (; h--;) {
              if (y === m || m !== null && y === m.alternate) break t;
              y = fn(y), m = fn(m)
            }
            y = null
          }
          else y = null;
          v !== null && Gu(f, p, v, y, !1), x !== null && S !== null && Gu(f, S, x, y, !0)
        }
      }
      e: {
        if (p = c ? xn(c) : window, v = p.nodeName && p.nodeName.toLowerCase(), v === "select" || v === "input" && p
          .type === "file") var k = sg;
        else if (Ou(p))
          if (Ff) k = ug;
          else {
            k = ag;
            var P = og
          }
        else(v = p.nodeName) && v.toLowerCase() === "input" && (p.type === "checkbox" || p.type === "radio") && (k =
          lg);
        if (k && (k = k(e, c))) {
          Of(f, k, n, d);
          break e
        }
        P && P(e, p, c),
        e === "focusout" && (P = p._wrapperState) && P.controlled && p.type === "number" && Uo(p, "number", p.value)
      }
      switch (P = c ? xn(c) : window, e) {
        case "focusin":
          (Ou(P) || P.contentEditable === "true") && (gn = P, ea = c, xr = null);
          break;
        case "focusout":
          xr = ea = gn = null;
          break;
        case "mousedown":
          ta = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ta = !1, Wu(f, n, d);
          break;
        case "selectionchange":
          if (fg) break;
        case "keydown":
        case "keyup":
          Wu(f, n, d)
      }
      var T;
      if (al) e: {
        switch (e) {
          case "compositionstart":
            var j = "onCompositionStart";
            break e;
          case "compositionend":
            j = "onCompositionEnd";
            break e;
          case "compositionupdate":
            j = "onCompositionUpdate";
            break e
        }
        j = void 0
      }
      else mn ? If(e, n) && (j = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (j =
        "onCompositionStart");j && (Lf && n.locale !== "ko" && (mn || j !== "onCompositionStart" ? j ===
        "onCompositionEnd" && mn && (T = Df()) : (Nt = d, il = "value" in Nt ? Nt.value : Nt.textContent, mn = !0)
        ), P = Zi(c, j), 0 < P.length && (j = new Du(j, e, null, n, d), f.push({
        event: j,
        listeners: P
      }), T ? j.data = T : (T = _f(n), T !== null && (j.data = T)))),
      (T = eg ? tg(e, n) : ng(e, n)) && (c = Zi(c, "onBeforeInput"), 0 < c.length && (d = new Du("onBeforeInput",
        "beforeinput", null, n, d), f.push({
        event: d,
        listeners: c
      }), d.data = T))
    }
    Xf(f, t)
  })
}

function Lr(e, t, n) {
  return {
    instance: e,
    listener: t,
    currentTarget: n
  }
}

function Zi(e, t) {
  for (var n = t + "Capture", r = []; e !== null;) {
    var i = e,
      s = i.stateNode;
    i.tag === 5 && s !== null && (i = s, s = br(e, n), s != null && r.unshift(Lr(e, s, i)), s = br(e, t), s != null && r
      .push(Lr(e, s, i))), e = e.return
  }
  return r
}

function fn(e) {
  if (e === null) return null;
  do e = e.return; while (e && e.tag !== 5);
  return e || null
}

function Gu(e, t, n, r, i) {
  for (var s = t._reactName, o = []; n !== null && n !== r;) {
    var a = n,
      l = a.alternate,
      c = a.stateNode;
    if (l !== null && l === r) break;
    a.tag === 5 && c !== null && (a = c, i ? (l = br(n, s), l != null && o.unshift(Lr(n, l, a))) : i || (l = br(n, s),
      l != null && o.push(Lr(n, l, a)))), n = n.return
  }
  o.length !== 0 && e.push({
    event: t,
    listeners: o
  })
}
var gg = /\r\n?/g,
  vg = /\u0000|\uFFFD/g;

function Qu(e) {
  return (typeof e == "string" ? e : "" + e).replace(gg, `
`).replace(vg, "")
}

function vi(e, t, n) {
  if (t = Qu(t), Qu(e) !== t && n) throw Error(N(425))
}

function qi() {}
var na = null,
  ra = null;

function ia(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" ||
    typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML
    .__html != null
}
var sa = typeof setTimeout == "function" ? setTimeout : void 0,
  xg = typeof clearTimeout == "function" ? clearTimeout : void 0,
  Yu = typeof Promise == "function" ? Promise : void 0,
  yg = typeof queueMicrotask == "function" ? queueMicrotask : typeof Yu < "u" ? function(e) {
    return Yu.resolve(null).then(e).catch(wg)
  } : sa;

function wg(e) {
  setTimeout(function() {
    throw e
  })
}

function oo(e, t) {
  var n = t,
    r = 0;
  do {
    var i = n.nextSibling;
    if (e.removeChild(n), i && i.nodeType === 8)
      if (n = i.data, n === "/$") {
        if (r === 0) {
          e.removeChild(i), Vr(t);
          return
        }
        r--
      } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = i
  } while (n);
  Vr(t)
}

function bt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
      if (t === "/$") return null
    }
  }
  return e
}

function Xu(e) {
  e = e.previousSibling;
  for (var t = 0; e;) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--
      } else n === "/$" && t++
    }
    e = e.previousSibling
  }
  return null
}
var Qn = Math.random().toString(36).slice(2),
  qe = "__reactFiber$" + Qn,
  Ir = "__reactProps$" + Qn,
  ft = "__reactContainer$" + Qn,
  oa = "__reactEvents$" + Qn,
  kg = "__reactListeners$" + Qn,
  Sg = "__reactHandles$" + Qn;

function Xt(e) {
  var t = e[qe];
  if (t) return t;
  for (var n = e.parentNode; n;) {
    if (t = n[ft] || n[qe]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
        for (e = Xu(e); e !== null;) {
          if (n = e[qe]) return n;
          e = Xu(e)
        }
      return t
    }
    e = n, n = e.parentNode
  }
  return null
}

function qr(e) {
  return e = e[qe] || e[ft], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e
}

function xn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(N(33))
}

function Ts(e) {
  return e[Ir] || null
}
var aa = [],
  yn = -1;

function Ot(e) {
  return {
    current: e
  }
}

function B(e) {
  0 > yn || (e.current = aa[yn], aa[yn] = null, yn--)
}

function O(e, t) {
  yn++, aa[yn] = e.current, e.current = t
}
var Dt = {},
  ge = Ot(Dt),
  je = Ot(!1),
  rn = Dt;

function In(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Dt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var i = {},
    s;
  for (s in n) i[s] = t[s];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e
    .__reactInternalMemoizedMaskedChildContext = i), i
}

function Ne(e) {
  return e = e.childContextTypes, e != null
}

function Ji() {
  B(je), B(ge)
}

function Zu(e, t, n) {
  if (ge.current !== Dt) throw Error(N(168));
  O(ge, t), O(je, n)
}

function qf(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var i in r)
    if (!(i in t)) throw Error(N(108, o0(e) || "Unknown", i));
  return G({}, n, r)
}

function es(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Dt, rn = ge.current, O(ge, e), O(je, je
    .current), !0
}

function qu(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(N(169));
  n ? (e = qf(e, t, rn), r.__reactInternalMemoizedMergedChildContext = e, B(je), B(ge), O(ge, e)) : B(je), O(je, n)
}
var st = null,
  Cs = !1,
  ao = !1;

function Jf(e) {
  st === null ? st = [e] : st.push(e)
}

function jg(e) {
  Cs = !0, Jf(e)
}

function Ft() {
  if (!ao && st !== null) {
    ao = !0;
    var e = 0,
      t = _;
    try {
      var n = st;
      for (_ = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0); while (r !== null)
      }
      st = null, Cs = !1
    } catch (i) {
      throw st !== null && (st = st.slice(e + 1)), Nf(el, Ft), i
    } finally {
      _ = t, ao = !1
    }
  }
  return null
}
var wn = [],
  kn = 0,
  ts = null,
  ns = 0,
  Le = [],
  Ie = 0,
  sn = null,
  ot = 1,
  at = "";

function Kt(e, t) {
  wn[kn++] = ns, wn[kn++] = ts, ts = e, ns = t
}

function ep(e, t, n) {
  Le[Ie++] = ot, Le[Ie++] = at, Le[Ie++] = sn, sn = e;
  var r = ot;
  e = at;
  var i = 32 - Ge(r) - 1;
  r &= ~(1 << i), n += 1;
  var s = 32 - Ge(t) + i;
  if (30 < s) {
    var o = i - i % 5;
    s = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, ot = 1 << 32 - Ge(t) + i | n << i | r, at = s + e
  } else ot = 1 << s | n << i | r, at = e
}

function ul(e) {
  e.return !== null && (Kt(e, 1), ep(e, 1, 0))
}

function cl(e) {
  for (; e === ts;) ts = wn[--kn], wn[kn] = null, ns = wn[--kn], wn[kn] = null;
  for (; e === sn;) sn = Le[--Ie], Le[Ie] = null, at = Le[--Ie], Le[Ie] = null, ot = Le[--Ie], Le[Ie] = null
}
var Ee = null,
  Ce = null,
  $ = !1,
  Ke = null;

function tp(e, t) {
  var n = _e(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |=
    16) : t.push(n)
}

function Ju(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e
        .stateNode = t, Ee = e, Ce = bt(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Ee = e, Ce = null,
        !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = sn !== null ? {
        id: ot,
        overflow: at
      } : null, e.memoizedState = {
        dehydrated: t,
        treeContext: n,
        retryLane: 1073741824
      }, n = _e(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Ee = e, Ce = null, !0) : !1;
    default:
      return !1
  }
}

function la(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0
}

function ua(e) {
  if ($) {
    var t = Ce;
    if (t) {
      var n = t;
      if (!Ju(e, t)) {
        if (la(e)) throw Error(N(418));
        t = bt(n.nextSibling);
        var r = Ee;
        t && Ju(e, t) ? tp(r, n) : (e.flags = e.flags & -4097 | 2, $ = !1, Ee = e)
      }
    } else {
      if (la(e)) throw Error(N(418));
      e.flags = e.flags & -4097 | 2, $ = !1, Ee = e
    }
  }
}

function ec(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;) e = e.return;
  Ee = e
}

function xi(e) {
  if (e !== Ee) return !1;
  if (!$) return ec(e), $ = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !ia(e.type, e
      .memoizedProps)), t && (t = Ce)) {
    if (la(e)) throw np(), Error(N(418));
    for (; t;) tp(e, t), t = bt(t.nextSibling)
  }
  if (ec(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(N(317));
    e: {
      for (e = e.nextSibling, t = 0; e;) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Ce = bt(e.nextSibling);
              break e
            }
            t--
          } else n !== "$" && n !== "$!" && n !== "$?" || t++
        }
        e = e.nextSibling
      }
      Ce = null
    }
  } else Ce = Ee ? bt(e.stateNode.nextSibling) : null;
  return !0
}

function np() {
  for (var e = Ce; e;) e = bt(e.nextSibling)
}

function _n() {
  Ce = Ee = null, $ = !1
}

function dl(e) {
  Ke === null ? Ke = [e] : Ke.push(e)
}
var Ng = gt.ReactCurrentBatchConfig;

function rr(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(N(309));
        var r = n.stateNode
      }
      if (!r) throw Error(N(147, e));
      var i = r,
        s = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === s ? t.ref : (t =
        function(o) {
          var a = i.refs;
          o === null ? delete a[s] : a[s] = o
        }, t._stringRef = s, t)
    }
    if (typeof e != "string") throw Error(N(284));
    if (!n._owner) throw Error(N(290, e))
  }
  return e
}

function yi(e, t) {
  throw e = Object.prototype.toString.call(t), Error(N(31, e === "[object Object]" ? "object with keys {" + Object.keys(
    t).join(", ") + "}" : e))
}

function tc(e) {
  var t = e._init;
  return t(e._payload)
}

function rp(e) {
  function t(m, h) {
    if (e) {
      var g = m.deletions;
      g === null ? (m.deletions = [h], m.flags |= 16) : g.push(h)
    }
  }

  function n(m, h) {
    if (!e) return null;
    for (; h !== null;) t(m, h), h = h.sibling;
    return null
  }

  function r(m, h) {
    for (m = new Map; h !== null;) h.key !== null ? m.set(h.key, h) : m.set(h.index, h), h = h.sibling;
    return m
  }

  function i(m, h) {
    return m = Mt(m, h), m.index = 0, m.sibling = null, m
  }

  function s(m, h, g) {
    return m.index = g, e ? (g = m.alternate, g !== null ? (g = g.index, g < h ? (m.flags |= 2, h) : g) : (m.flags |= 2,
      h)) : (m.flags |= 1048576, h)
  }

  function o(m) {
    return e && m.alternate === null && (m.flags |= 2), m
  }

  function a(m, h, g, w) {
    return h === null || h.tag !== 6 ? (h = mo(g, m.mode, w), h.return = m, h) : (h = i(h, g), h.return = m, h)
  }

  function l(m, h, g, w) {
    var k = g.type;
    return k === hn ? d(m, h, g.props.children, w, g.key) : h !== null && (h.elementType === k || typeof k ==
      "object" && k !== null && k.$$typeof === wt && tc(k) === h.type) ? (w = i(h, g.props), w.ref = rr(m, h, g), w
      .return = m, w) : (w = Fi(g.type, g.key, g.props, null, m.mode, w), w.ref = rr(m, h, g), w.return = m, w)
  }

  function c(m, h, g, w) {
    return h === null || h.tag !== 4 || h.stateNode.containerInfo !== g.containerInfo || h.stateNode.implementation !==
      g.implementation ? (h = go(g, m.mode, w), h.return = m, h) : (h = i(h, g.children || []), h.return = m, h)
  }

  function d(m, h, g, w, k) {
    return h === null || h.tag !== 7 ? (h = tn(g, m.mode, w, k), h.return = m, h) : (h = i(h, g), h.return = m, h)
  }

  function f(m, h, g) {
    if (typeof h == "string" && h !== "" || typeof h == "number") return h = mo("" + h, m.mode, g), h.return = m, h;
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case li:
          return g = Fi(h.type, h.key, h.props, null, m.mode, g), g.ref = rr(m, null, h), g.return = m, g;
        case pn:
          return h = go(h, m.mode, g), h.return = m, h;
        case wt:
          var w = h._init;
          return f(m, w(h._payload), g)
      }
      if (lr(h) || qn(h)) return h = tn(h, m.mode, g, null), h.return = m, h;
      yi(m, h)
    }
    return null
  }

  function p(m, h, g, w) {
    var k = h !== null ? h.key : null;
    if (typeof g == "string" && g !== "" || typeof g == "number") return k !== null ? null : a(m, h, "" + g, w);
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case li:
          return g.key === k ? l(m, h, g, w) : null;
        case pn:
          return g.key === k ? c(m, h, g, w) : null;
        case wt:
          return k = g._init, p(m, h, k(g._payload), w)
      }
      if (lr(g) || qn(g)) return k !== null ? null : d(m, h, g, w, null);
      yi(m, g)
    }
    return null
  }

  function v(m, h, g, w, k) {
    if (typeof w == "string" && w !== "" || typeof w == "number") return m = m.get(g) || null, a(h, m, "" + w, k);
    if (typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case li:
          return m = m.get(w.key === null ? g : w.key) || null, l(h, m, w, k);
        case pn:
          return m = m.get(w.key === null ? g : w.key) || null, c(h, m, w, k);
        case wt:
          var P = w._init;
          return v(m, h, g, P(w._payload), k)
      }
      if (lr(w) || qn(w)) return m = m.get(g) || null, d(h, m, w, k, null);
      yi(h, w)
    }
    return null
  }

  function x(m, h, g, w) {
    for (var k = null, P = null, T = h, j = h = 0, D = null; T !== null && j < g.length; j++) {
      T.index > j ? (D = T, T = null) : D = T.sibling;
      var V = p(m, T, g[j], w);
      if (V === null) {
        T === null && (T = D);
        break
      }
      e && T && V.alternate === null && t(m, T), h = s(V, h, j), P === null ? k = V : P.sibling = V, P = V, T = D
    }
    if (j === g.length) return n(m, T), $ && Kt(m, j), k;
    if (T === null) {
      for (; j < g.length; j++) T = f(m, g[j], w), T !== null && (h = s(T, h, j), P === null ? k = T : P.sibling = T,
        P = T);
      return $ && Kt(m, j), k
    }
    for (T = r(m, T); j < g.length; j++) D = v(T, m, j, g[j], w), D !== null && (e && D.alternate !== null && T.delete(D
      .key === null ? j : D.key), h = s(D, h, j), P === null ? k = D : P.sibling = D, P = D);
    return e && T.forEach(function(re) {
      return t(m, re)
    }), $ && Kt(m, j), k
  }

  function y(m, h, g, w) {
    var k = qn(g);
    if (typeof k != "function") throw Error(N(150));
    if (g = k.call(g), g == null) throw Error(N(151));
    for (var P = k = null, T = h, j = h = 0, D = null, V = g.next(); T !== null && !V.done; j++, V = g.next()) {
      T.index > j ? (D = T, T = null) : D = T.sibling;
      var re = p(m, T, V.value, w);
      if (re === null) {
        T === null && (T = D);
        break
      }
      e && T && re.alternate === null && t(m, T), h = s(re, h, j), P === null ? k = re : P.sibling = re, P = re, T = D
    }
    if (V.done) return n(m, T), $ && Kt(m, j), k;
    if (T === null) {
      for (; !V.done; j++, V = g.next()) V = f(m, V.value, w), V !== null && (h = s(V, h, j), P === null ? k = V : P
        .sibling = V, P = V);
      return $ && Kt(m, j), k
    }
    for (T = r(m, T); !V.done; j++, V = g.next()) V = v(T, m, j, V.value, w), V !== null && (e && V.alternate !==
      null && T.delete(V.key === null ? j : V.key), h = s(V, h, j), P === null ? k = V : P.sibling = V, P = V);
    return e && T.forEach(function(vt) {
      return t(m, vt)
    }), $ && Kt(m, j), k
  }

  function S(m, h, g, w) {
    if (typeof g == "object" && g !== null && g.type === hn && g.key === null && (g = g.props.children), typeof g ==
      "object" && g !== null) {
      switch (g.$$typeof) {
        case li:
          e: {
            for (var k = g.key, P = h; P !== null;) {
              if (P.key === k) {
                if (k = g.type, k === hn) {
                  if (P.tag === 7) {
                    n(m, P.sibling), h = i(P, g.props.children), h.return = m, m = h;
                    break e
                  }
                } else if (P.elementType === k || typeof k == "object" && k !== null && k.$$typeof === wt && tc(k) ===
                  P.type) {
                  n(m, P.sibling), h = i(P, g.props), h.ref = rr(m, P, g), h.return = m, m = h;
                  break e
                }
                n(m, P);
                break
              } else t(m, P);
              P = P.sibling
            }
            g.type === hn ? (h = tn(g.props.children, m.mode, w, g.key), h.return = m, m = h) : (w = Fi(g.type, g.key,
              g.props, null, m.mode, w), w.ref = rr(m, h, g), w.return = m, m = w)
          }
          return o(m);
        case pn:
          e: {
            for (P = g.key; h !== null;) {
              if (h.key === P)
                if (h.tag === 4 && h.stateNode.containerInfo === g.containerInfo && h.stateNode.implementation === g
                  .implementation) {
                  n(m, h.sibling), h = i(h, g.children || []), h.return = m, m = h;
                  break e
                } else {
                  n(m, h);
                  break
                }
              else t(m, h);
              h = h.sibling
            }
            h = go(g, m.mode, w),
            h.return = m,
            m = h
          }
          return o(m);
        case wt:
          return P = g._init, S(m, h, P(g._payload), w)
      }
      if (lr(g)) return x(m, h, g, w);
      if (qn(g)) return y(m, h, g, w);
      yi(m, g)
    }
    return typeof g == "string" && g !== "" || typeof g == "number" ? (g = "" + g, h !== null && h.tag === 6 ? (n(m, h
      .sibling), h = i(h, g), h.return = m, m = h) : (n(m, h), h = mo(g, m.mode, w), h.return = m, m = h), o(m)) : n(
      m, h)
  }
  return S
}
var On = rp(!0),
  ip = rp(!1),
  rs = Ot(null),
  is = null,
  Sn = null,
  fl = null;

function pl() {
  fl = Sn = is = null
}

function hl(e) {
  var t = rs.current;
  B(rs), e._currentValue = t
}

function ca(e, t, n) {
  for (; e !== null;) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r
        .childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return
  }
}

function Rn(e, t) {
  is = e, fl = Sn = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Se = !0), e
    .firstContext = null)
}

function Fe(e) {
  var t = e._currentValue;
  if (fl !== e)
    if (e = {
        context: e,
        memoizedValue: t,
        next: null
      }, Sn === null) {
      if (is === null) throw Error(N(308));
      Sn = e, is.dependencies = {
        lanes: 0,
        firstContext: e
      }
    } else Sn = Sn.next = e;
  return t
}
var Zt = null;

function ml(e) {
  Zt === null ? Zt = [e] : Zt.push(e)
}

function sp(e, t, n, r) {
  var i = t.interleaved;
  return i === null ? (n.next = n, ml(t)) : (n.next = i.next, i.next = n), t.interleaved = n, pt(e, r)
}

function pt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null;) e.childLanes |= t, n = e.alternate, n !== null &&
    (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null
}
var kt = !1;

function gl(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: {
      pending: null,
      interleaved: null,
      lanes: 0
    },
    effects: null
  }
}

function op(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
    baseState: e.baseState,
    firstBaseUpdate: e.firstBaseUpdate,
    lastBaseUpdate: e.lastBaseUpdate,
    shared: e.shared,
    effects: e.effects
  })
}

function lt(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null
  }
}

function zt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, I & 2) {
    var i = r.pending;
    return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, pt(e, n)
  }
  return i = r.interleaved, i === null ? (t.next = t, ml(r)) : (t.next = i.next, i.next = t), r.interleaved = t, pt(e,
    n)
}

function Ri(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, tl(e, n)
  }
}

function nc(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && (r = r.updateQueue, n === r)) {
    var i = null,
      s = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var o = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null
        };
        s === null ? i = s = o : s = s.next = o, n = n.next
      } while (n !== null);
      s === null ? i = s = t : s = s.next = t
    } else i = s = t;
    n = {
      baseState: r.baseState,
      firstBaseUpdate: i,
      lastBaseUpdate: s,
      shared: r.shared,
      effects: r.effects
    }, e.updateQueue = n;
    return
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t
}

function ss(e, t, n, r) {
  var i = e.updateQueue;
  kt = !1;
  var s = i.firstBaseUpdate,
    o = i.lastBaseUpdate,
    a = i.shared.pending;
  if (a !== null) {
    i.shared.pending = null;
    var l = a,
      c = l.next;
    l.next = null, o === null ? s = c : o.next = c, o = l;
    var d = e.alternate;
    d !== null && (d = d.updateQueue, a = d.lastBaseUpdate, a !== o && (a === null ? d.firstBaseUpdate = c : a.next = c,
      d.lastBaseUpdate = l))
  }
  if (s !== null) {
    var f = i.baseState;
    o = 0, d = c = l = null, a = s;
    do {
      var p = a.lane,
        v = a.eventTime;
      if ((r & p) === p) {
        d !== null && (d = d.next = {
          eventTime: v,
          lane: 0,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null
        });
        e: {
          var x = e,
            y = a;
          switch (p = t, v = n, y.tag) {
            case 1:
              if (x = y.payload, typeof x == "function") {
                f = x.call(v, f, p);
                break e
              }
              f = x;
              break e;
            case 3:
              x.flags = x.flags & -65537 | 128;
            case 0:
              if (x = y.payload, p = typeof x == "function" ? x.call(v, f, p) : x, p == null) break e;
              f = G({}, f, p);
              break e;
            case 2:
              kt = !0
          }
        }
        a.callback !== null && a.lane !== 0 && (e.flags |= 64, p = i.effects, p === null ? i.effects = [a] : p.push(a))
      } else v = {
        eventTime: v,
        lane: p,
        tag: a.tag,
        payload: a.payload,
        callback: a.callback,
        next: null
      }, d === null ? (c = d = v, l = f) : d = d.next = v, o |= p;
      if (a = a.next, a === null) {
        if (a = i.shared.pending, a === null) break;
        p = a, a = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null
      }
    } while (!0);
    if (d === null && (l = f), i.baseState = l, i.firstBaseUpdate = c, i.lastBaseUpdate = d, t = i.shared.interleaved,
      t !== null) {
      i = t;
      do o |= i.lane, i = i.next; while (i !== t)
    } else s === null && (i.shared.lanes = 0);
    an |= o, e.lanes = o, e.memoizedState = f
  }
}

function rc(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null)
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        i = r.callback;
      if (i !== null) {
        if (r.callback = null, r = n, typeof i != "function") throw Error(N(191, i));
        i.call(r)
      }
    }
}
var Jr = {},
  et = Ot(Jr),
  _r = Ot(Jr),
  Or = Ot(Jr);

function qt(e) {
  if (e === Jr) throw Error(N(174));
  return e
}

function vl(e, t) {
  switch (O(Or, t), O(_r, e), O(et, Jr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Wo(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Wo(t, e)
  }
  B(et), O(et, t)
}

function Fn() {
  B(et), B(_r), B(Or)
}

function ap(e) {
  qt(Or.current);
  var t = qt(et.current),
    n = Wo(t, e.type);
  t !== n && (O(_r, e), O(et, n))
}

function xl(e) {
  _r.current === e && (B(et), B(_r))
}
var W = Ot(0);

function os(e) {
  for (var t = e; t !== null;) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t
    } else if (t.child !== null) {
      t.child.return = t, t = t.child;
      continue
    }
    if (t === e) break;
    for (; t.sibling === null;) {
      if (t.return === null || t.return === e) return null;
      t = t.return
    }
    t.sibling.return = t.return, t = t.sibling
  }
  return null
}
var lo = [];

function yl() {
  for (var e = 0; e < lo.length; e++) lo[e]._workInProgressVersionPrimary = null;
  lo.length = 0
}
var Di = gt.ReactCurrentDispatcher,
  uo = gt.ReactCurrentBatchConfig,
  on = 0,
  K = null,
  te = null,
  se = null,
  as = !1,
  yr = !1,
  Fr = 0,
  Pg = 0;

function de() {
  throw Error(N(321))
}

function wl(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!Ye(e[n], t[n])) return !1;
  return !0
}

function kl(e, t, n, r, i, s) {
  if (on = s, K = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Di.current = e === null || e
    .memoizedState === null ? bg : zg, e = n(r, i), yr) {
    s = 0;
    do {
      if (yr = !1, Fr = 0, 25 <= s) throw Error(N(301));
      s += 1, se = te = null, t.updateQueue = null, Di.current = Ag, e = n(r, i)
    } while (yr)
  }
  if (Di.current = ls, t = te !== null && te.next !== null, on = 0, se = te = K = null, as = !1, t) throw Error(N(300));
  return e
}

function Sl() {
  var e = Fr !== 0;
  return Fr = 0, e
}

function Ze() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null
  };
  return se === null ? K.memoizedState = se = e : se = se.next = e, se
}

function Be() {
  if (te === null) {
    var e = K.alternate;
    e = e !== null ? e.memoizedState : null
  } else e = te.next;
  var t = se === null ? K.memoizedState : se.next;
  if (t !== null) se = t, te = e;
  else {
    if (e === null) throw Error(N(310));
    te = e, e = {
      memoizedState: te.memoizedState,
      baseState: te.baseState,
      baseQueue: te.baseQueue,
      queue: te.queue,
      next: null
    }, se === null ? K.memoizedState = se = e : se = se.next = e
  }
  return se
}

function Br(e, t) {
  return typeof t == "function" ? t(e) : t
}

function co(e) {
  var t = Be(),
    n = t.queue;
  if (n === null) throw Error(N(311));
  n.lastRenderedReducer = e;
  var r = te,
    i = r.baseQueue,
    s = n.pending;
  if (s !== null) {
    if (i !== null) {
      var o = i.next;
      i.next = s.next, s.next = o
    }
    r.baseQueue = i = s, n.pending = null
  }
  if (i !== null) {
    s = i.next, r = r.baseState;
    var a = o = null,
      l = null,
      c = s;
    do {
      var d = c.lane;
      if ((on & d) === d) l !== null && (l = l.next = {
        lane: 0,
        action: c.action,
        hasEagerState: c.hasEagerState,
        eagerState: c.eagerState,
        next: null
      }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
      else {
        var f = {
          lane: d,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        l === null ? (a = l = f, o = r) : l = l.next = f, K.lanes |= d, an |= d
      }
      c = c.next
    } while (c !== null && c !== s);
    l === null ? o = r : l.next = a, Ye(r, t.memoizedState) || (Se = !0), t.memoizedState = r, t.baseState = o, t
      .baseQueue = l, n.lastRenderedState = r
  }
  if (e = n.interleaved, e !== null) {
    i = e;
    do s = i.lane, K.lanes |= s, an |= s, i = i.next; while (i !== e)
  } else i === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch]
}

function fo(e) {
  var t = Be(),
    n = t.queue;
  if (n === null) throw Error(N(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    i = n.pending,
    s = t.memoizedState;
  if (i !== null) {
    n.pending = null;
    var o = i = i.next;
    do s = e(s, o.action), o = o.next; while (o !== i);
    Ye(s, t.memoizedState) || (Se = !0), t.memoizedState = s, t.baseQueue === null && (t.baseState = s), n
      .lastRenderedState = s
  }
  return [s, r]
}

function lp() {}

function up(e, t) {
  var n = K,
    r = Be(),
    i = t(),
    s = !Ye(r.memoizedState, i);
  if (s && (r.memoizedState = i, Se = !0), r = r.queue, jl(fp.bind(null, n, r, e), [e]), r.getSnapshot !== t || s ||
    se !== null && se.memoizedState.tag & 1) {
    if (n.flags |= 2048, Ur(9, dp.bind(null, n, r, i, t), void 0, null), oe === null) throw Error(N(349));
    on & 30 || cp(n, t, i)
  }
  return i
}

function cp(e, t, n) {
  e.flags |= 16384, e = {
    getSnapshot: t,
    value: n
  }, t = K.updateQueue, t === null ? (t = {
    lastEffect: null,
    stores: null
  }, K.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e))
}

function dp(e, t, n, r) {
  t.value = n, t.getSnapshot = r, pp(t) && hp(e)
}

function fp(e, t, n) {
  return n(function() {
    pp(t) && hp(e)
  })
}

function pp(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Ye(e, n)
  } catch {
    return !0
  }
}

function hp(e) {
  var t = pt(e, 1);
  t !== null && Qe(t, e, 1, -1)
}

function ic(e) {
  var t = Ze();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = {
    pending: null,
    interleaved: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: Br,
    lastRenderedState: e
  }, t.queue = e, e = e.dispatch = Eg.bind(null, K, e), [t.memoizedState, e]
}

function Ur(e, t, n, r) {
  return e = {
    tag: e,
    create: t,
    destroy: n,
    deps: r,
    next: null
  }, t = K.updateQueue, t === null ? (t = {
    lastEffect: null,
    stores: null
  }, K.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r =
    n.next, n.next = e, e.next = r, t.lastEffect = e)), e
}

function mp() {
  return Be().memoizedState
}

function Li(e, t, n, r) {
  var i = Ze();
  K.flags |= e, i.memoizedState = Ur(1 | t, n, void 0, r === void 0 ? null : r)
}

function Es(e, t, n, r) {
  var i = Be();
  r = r === void 0 ? null : r;
  var s = void 0;
  if (te !== null) {
    var o = te.memoizedState;
    if (s = o.destroy, r !== null && wl(r, o.deps)) {
      i.memoizedState = Ur(t, n, s, r);
      return
    }
  }
  K.flags |= e, i.memoizedState = Ur(1 | t, n, s, r)
}

function sc(e, t) {
  return Li(8390656, 8, e, t)
}

function jl(e, t) {
  return Es(2048, 8, e, t)
}

function gp(e, t) {
  return Es(4, 2, e, t)
}

function vp(e, t) {
  return Es(4, 4, e, t)
}

function xp(e, t) {
  if (typeof t == "function") return e = e(), t(e),
    function() {
      t(null)
    };
  if (t != null) return e = e(), t.current = e,
    function() {
      t.current = null
    }
}

function yp(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Es(4, 4, xp.bind(null, t, e), n)
}

function Nl() {}

function wp(e, t) {
  var n = Be();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && wl(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e)
}

function kp(e, t) {
  var n = Be();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && wl(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e)
}

function Sp(e, t, n) {
  return on & 21 ? (Ye(n, t) || (n = Cf(), K.lanes |= n, an |= n, e.baseState = !0), t) : (e.baseState && (e
    .baseState = !1, Se = !0), e.memoizedState = n)
}

function Tg(e, t) {
  var n = _;
  _ = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = uo.transition;
  uo.transition = {};
  try {
    e(!1), t()
  } finally {
    _ = n, uo.transition = r
  }
}

function jp() {
  return Be().memoizedState
}

function Cg(e, t, n) {
  var r = Vt(e);
  if (n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Np(e)) Pp(t, n);
  else if (n = sp(e, t, n, r), n !== null) {
    var i = xe();
    Qe(n, e, r, i), Tp(n, t, r)
  }
}

function Eg(e, t, n) {
  var r = Vt(e),
    i = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
  if (Np(e)) Pp(t, i);
  else {
    var s = e.alternate;
    if (e.lanes === 0 && (s === null || s.lanes === 0) && (s = t.lastRenderedReducer, s !== null)) try {
      var o = t.lastRenderedState,
        a = s(o, n);
      if (i.hasEagerState = !0, i.eagerState = a, Ye(a, o)) {
        var l = t.interleaved;
        l === null ? (i.next = i, ml(t)) : (i.next = l.next, l.next = i), t.interleaved = i;
        return
      }
    } catch {} finally {}
    n = sp(e, t, i, r), n !== null && (i = xe(), Qe(n, e, r, i), Tp(n, t, r))
  }
}

function Np(e) {
  var t = e.alternate;
  return e === K || t !== null && t === K
}

function Pp(e, t) {
  yr = as = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t
}

function Tp(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, tl(e, n)
  }
}
var ls = {
    readContext: Fe,
    useCallback: de,
    useContext: de,
    useEffect: de,
    useImperativeHandle: de,
    useInsertionEffect: de,
    useLayoutEffect: de,
    useMemo: de,
    useReducer: de,
    useRef: de,
    useState: de,
    useDebugValue: de,
    useDeferredValue: de,
    useTransition: de,
    useMutableSource: de,
    useSyncExternalStore: de,
    useId: de,
    unstable_isNewReconciler: !1
  },
  bg = {
    readContext: Fe,
    useCallback: function(e, t) {
      return Ze().memoizedState = [e, t === void 0 ? null : t], e
    },
    useContext: Fe,
    useEffect: sc,
    useImperativeHandle: function(e, t, n) {
      return n = n != null ? n.concat([e]) : null, Li(4194308, 4, xp.bind(null, t, e), n)
    },
    useLayoutEffect: function(e, t) {
      return Li(4194308, 4, e, t)
    },
    useInsertionEffect: function(e, t) {
      return Li(4, 2, e, t)
    },
    useMemo: function(e, t) {
      var n = Ze();
      return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e
    },
    useReducer: function(e, t, n) {
      var r = Ze();
      return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: t
      }, r.queue = e, e = e.dispatch = Cg.bind(null, K, e), [r.memoizedState, e]
    },
    useRef: function(e) {
      var t = Ze();
      return e = {
        current: e
      }, t.memoizedState = e
    },
    useState: ic,
    useDebugValue: Nl,
    useDeferredValue: function(e) {
      return Ze().memoizedState = e
    },
    useTransition: function() {
      var e = ic(!1),
        t = e[0];
      return e = Tg.bind(null, e[1]), Ze().memoizedState = e, [t, e]
    },
    useMutableSource: function() {},
    useSyncExternalStore: function(e, t, n) {
      var r = K,
        i = Ze();
      if ($) {
        if (n === void 0) throw Error(N(407));
        n = n()
      } else {
        if (n = t(), oe === null) throw Error(N(349));
        on & 30 || cp(r, t, n)
      }
      i.memoizedState = n;
      var s = {
        value: n,
        getSnapshot: t
      };
      return i.queue = s, sc(fp.bind(null, r, s, e), [e]), r.flags |= 2048, Ur(9, dp.bind(null, r, s, n, t), void 0,
        null), n
    },
    useId: function() {
      var e = Ze(),
        t = oe.identifierPrefix;
      if ($) {
        var n = at,
          r = ot;
        n = (r & ~(1 << 32 - Ge(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Fr++, 0 < n && (t += "H" + n
          .toString(32)), t += ":"
      } else n = Pg++, t = ":" + t + "r" + n.toString(32) + ":";
      return e.memoizedState = t
    },
    unstable_isNewReconciler: !1
  },
  zg = {
    readContext: Fe,
    useCallback: wp,
    useContext: Fe,
    useEffect: jl,
    useImperativeHandle: yp,
    useInsertionEffect: gp,
    useLayoutEffect: vp,
    useMemo: kp,
    useReducer: co,
    useRef: mp,
    useState: function() {
      return co(Br)
    },
    useDebugValue: Nl,
    useDeferredValue: function(e) {
      var t = Be();
      return Sp(t, te.memoizedState, e)
    },
    useTransition: function() {
      var e = co(Br)[0],
        t = Be().memoizedState;
      return [e, t]
    },
    useMutableSource: lp,
    useSyncExternalStore: up,
    useId: jp,
    unstable_isNewReconciler: !1
  },
  Ag = {
    readContext: Fe,
    useCallback: wp,
    useContext: Fe,
    useEffect: jl,
    useImperativeHandle: yp,
    useInsertionEffect: gp,
    useLayoutEffect: vp,
    useMemo: kp,
    useReducer: fo,
    useRef: mp,
    useState: function() {
      return fo(Br)
    },
    useDebugValue: Nl,
    useDeferredValue: function(e) {
      var t = Be();
      return te === null ? t.memoizedState = e : Sp(t, te.memoizedState, e)
    },
    useTransition: function() {
      var e = fo(Br)[0],
        t = Be().memoizedState;
      return [e, t]
    },
    useMutableSource: lp,
    useSyncExternalStore: up,
    useId: jp,
    unstable_isNewReconciler: !1
  };

function We(e, t) {
  if (e && e.defaultProps) {
    t = G({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t
  }
  return t
}

function da(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : G({}, t, n), e.memoizedState = n, e.lanes === 0 && (e
    .updateQueue.baseState = n)
}
var bs = {
  isMounted: function(e) {
    return (e = e._reactInternals) ? cn(e) === e : !1
  },
  enqueueSetState: function(e, t, n) {
    e = e._reactInternals;
    var r = xe(),
      i = Vt(e),
      s = lt(r, i);
    s.payload = t, n != null && (s.callback = n), t = zt(e, s, i), t !== null && (Qe(t, e, i, r), Ri(t, e, i))
  },
  enqueueReplaceState: function(e, t, n) {
    e = e._reactInternals;
    var r = xe(),
      i = Vt(e),
      s = lt(r, i);
    s.tag = 1, s.payload = t, n != null && (s.callback = n), t = zt(e, s, i), t !== null && (Qe(t, e, i, r), Ri(t,
      e, i))
  },
  enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var n = xe(),
      r = Vt(e),
      i = lt(n, r);
    i.tag = 2, t != null && (i.callback = t), t = zt(e, i, r), t !== null && (Qe(t, e, r, n), Ri(t, e, r))
  }
};

function oc(e, t, n, r, i, s, o) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, s, o) : t
    .prototype && t.prototype.isPureReactComponent ? !Rr(n, r) || !Rr(i, s) : !0
}

function Cp(e, t, n) {
  var r = !1,
    i = Dt,
    s = t.contextType;
  return typeof s == "object" && s !== null ? s = Fe(s) : (i = Ne(t) ? rn : ge.current, r = t.contextTypes, s = (r =
      r != null) ? In(e, i) : Dt), t = new t(n, s), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state :
    null, t.updater = bs, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e
      .__reactInternalMemoizedUnmaskedChildContext = i, e.__reactInternalMemoizedMaskedChildContext = s), t
}

function ac(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t
    .UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && bs
    .enqueueReplaceState(t, t.state, null)
}

function fa(e, t, n, r) {
  var i = e.stateNode;
  i.props = n, i.state = e.memoizedState, i.refs = {}, gl(e);
  var s = t.contextType;
  typeof s == "object" && s !== null ? i.context = Fe(s) : (s = Ne(t) ? rn : ge.current, i.context = In(e, s)), i
    .state = e.memoizedState, s = t.getDerivedStateFromProps, typeof s == "function" && (da(e, t, s, n), i.state = e
      .memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate ==
    "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (t =
      i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i
      .UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), t !== i.state && bs
      .enqueueReplaceState(i, i.state, null), ss(e, n, i, r), i.state = e.memoizedState), typeof i.componentDidMount ==
    "function" && (e.flags |= 4194308)
}

function Bn(e, t) {
  try {
    var n = "",
      r = t;
    do n += s0(r), r = r.return; while (r);
    var i = n
  } catch (s) {
    i = `
Error generating stack: ` + s.message + `
` + s.stack
  }
  return {
    value: e,
    source: t,
    stack: i,
    digest: null
  }
}

function po(e, t, n) {
  return {
    value: e,
    source: null,
    stack: n ?? null,
    digest: t ?? null
  }
}

function pa(e, t) {
  try {
    console.error(t.value)
  } catch (n) {
    setTimeout(function() {
      throw n
    })
  }
}
var Vg = typeof WeakMap == "function" ? WeakMap : Map;

function Ep(e, t, n) {
  n = lt(-1, n), n.tag = 3, n.payload = {
    element: null
  };
  var r = t.value;
  return n.callback = function() {
    cs || (cs = !0, ja = r), pa(e, t)
  }, n
}

function bp(e, t, n) {
  n = lt(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var i = t.value;
    n.payload = function() {
      return r(i)
    }, n.callback = function() {
      pa(e, t)
    }
  }
  var s = e.stateNode;
  return s !== null && typeof s.componentDidCatch == "function" && (n.callback = function() {
    pa(e, t), typeof r != "function" && (At === null ? At = new Set([this]) : At.add(this));
    var o = t.stack;
    this.componentDidCatch(t.value, {
      componentStack: o !== null ? o : ""
    })
  }), n
}

function lc(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Vg;
    var i = new Set;
    r.set(t, i)
  } else i = r.get(t), i === void 0 && (i = new Set, r.set(t, i));
  i.has(n) || (i.add(n), e = Kg.bind(null, e, t, n), t.then(e, e))
}

function uc(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return
  } while (e !== null);
  return null
}

function cc(e, t, n, r, i) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = i, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |=
    131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = lt(-1, 1), t.tag = 2, zt(n,
      t, 1))), n.lanes |= 1), e)
}
var Mg = gt.ReactCurrentOwner,
  Se = !1;

function ve(e, t, n, r) {
  t.child = e === null ? ip(t, null, n, r) : On(t, e.child, n, r)
}

function dc(e, t, n, r, i) {
  n = n.render;
  var s = t.ref;
  return Rn(t, i), r = kl(e, t, n, r, s, i), n = Sl(), e !== null && !Se ? (t.updateQueue = e.updateQueue, t.flags &= -
    2053, e.lanes &= ~i, ht(e, t, i)) : ($ && n && ul(t), t.flags |= 1, ve(e, t, r, i), t.child)
}

function fc(e, t, n, r, i) {
  if (e === null) {
    var s = n.type;
    return typeof s == "function" && !Vl(s) && s.defaultProps === void 0 && n.compare === null && n.defaultProps ===
      void 0 ? (t.tag = 15, t.type = s, zp(e, t, s, r, i)) : (e = Fi(n.type, null, r, t, t.mode, i), e.ref = t.ref, e
        .return = t, t.child = e)
  }
  if (s = e.child, !(e.lanes & i)) {
    var o = s.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Rr, n(o, r) && e.ref === t.ref) return ht(e, t, i)
  }
  return t.flags |= 1, e = Mt(s, r), e.ref = t.ref, e.return = t, t.child = e
}

function zp(e, t, n, r, i) {
  if (e !== null) {
    var s = e.memoizedProps;
    if (Rr(s, r) && e.ref === t.ref)
      if (Se = !1, t.pendingProps = r = s, (e.lanes & i) !== 0) e.flags & 131072 && (Se = !0);
      else return t.lanes = e.lanes, ht(e, t, i)
  }
  return ha(e, t, n, r, i)
}

function Ap(e, t, n) {
  var r = t.pendingProps,
    i = r.children,
    s = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1)) t.memoizedState = {
      baseLanes: 0,
      cachePool: null,
      transitions: null
    }, O(Nn, Te), Te |= n;
    else {
      if (!(n & 1073741824)) return e = s !== null ? s.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t
        .memoizedState = {
          baseLanes: e,
          cachePool: null,
          transitions: null
        }, t.updateQueue = null, O(Nn, Te), Te |= e, null;
      t.memoizedState = {
        baseLanes: 0,
        cachePool: null,
        transitions: null
      }, r = s !== null ? s.baseLanes : n, O(Nn, Te), Te |= r
    }
  else s !== null ? (r = s.baseLanes | n, t.memoizedState = null) : r = n, O(Nn, Te), Te |= r;
  return ve(e, t, i, n), t.child
}

function Vp(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152)
}

function ha(e, t, n, r, i) {
  var s = Ne(n) ? rn : ge.current;
  return s = In(t, s), Rn(t, i), n = kl(e, t, n, r, s, i), r = Sl(), e !== null && !Se ? (t.updateQueue = e.updateQueue,
    t.flags &= -2053, e.lanes &= ~i, ht(e, t, i)) : ($ && r && ul(t), t.flags |= 1, ve(e, t, n, i), t.child)
}

function pc(e, t, n, r, i) {
  if (Ne(n)) {
    var s = !0;
    es(t)
  } else s = !1;
  if (Rn(t, i), t.stateNode === null) Ii(e, t), Cp(t, n, r), fa(t, n, r, i), r = !0;
  else if (e === null) {
    var o = t.stateNode,
      a = t.memoizedProps;
    o.props = a;
    var l = o.context,
      c = n.contextType;
    typeof c == "object" && c !== null ? c = Fe(c) : (c = Ne(n) ? rn : ge.current, c = In(t, c));
    var d = n.getDerivedStateFromProps,
      f = typeof d == "function" || typeof o.getSnapshotBeforeUpdate == "function";
    f || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" ||
      (a !== r || l !== c) && ac(t, o, r, c), kt = !1;
    var p = t.memoizedState;
    o.state = p, ss(t, r, o, i), l = t.memoizedState, a !== r || p !== l || je.current || kt ? (typeof d ==
      "function" && (da(t, n, d, r), l = t.memoizedState), (a = kt || oc(t, n, a, r, p, l, c)) ? (f || typeof o
        .UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o
          .componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount ==
          "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |=
          4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t
        .memoizedState = l), o.props = r, o.state = l, o.context = c, r = a) : (typeof o.componentDidMount ==
      "function" && (t.flags |= 4194308), r = !1)
  } else {
    o = t.stateNode, op(e, t), a = t.memoizedProps, c = t.type === t.elementType ? a : We(t.type, a), o.props = c, f = t
      .pendingProps, p = o.context, l = n.contextType, typeof l == "object" && l !== null ? l = Fe(l) : (l = Ne(n) ?
        rn : ge.current, l = In(t, l));
    var v = n.getDerivedStateFromProps;
    (d = typeof v == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o
      .UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (a !== f ||
        p !== l) && ac(t, o, r, l), kt = !1, p = t.memoizedState, o.state = p, ss(t, r, o, i);
    var x = t.memoizedState;
    a !== f || p !== x || je.current || kt ? (typeof v == "function" && (da(t, n, v, r), x = t.memoizedState), (c =
        kt || oc(t, n, c, r, p, x, l) || !1) ? (d || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o
        .componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r,
          x, l), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, x, l)), typeof o
        .componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t
          .flags |= 1024)) : (typeof o.componentDidUpdate != "function" || a === e.memoizedProps && p === e
        .memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps &&
        p === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = x), o.props = r, o.state =
      x, o.context = l, r = c) : (typeof o.componentDidUpdate != "function" || a === e.memoizedProps && p === e
      .memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps &&
      p === e.memoizedState || (t.flags |= 1024), r = !1)
  }
  return ma(e, t, n, r, s, i)
}

function ma(e, t, n, r, i, s) {
  Vp(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o) return i && qu(t, n, !1), ht(e, t, s);
  r = t.stateNode, Mg.current = t;
  var a = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && o ? (t.child = On(t, e.child, null, s), t.child = On(t, null, a, s)) : ve(e, t, a,
    s), t.memoizedState = r.state, i && qu(t, n, !0), t.child
}

function Mp(e) {
  var t = e.stateNode;
  t.pendingContext ? Zu(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Zu(e, t.context, !1), vl(e,
    t.containerInfo)
}

function hc(e, t, n, r, i) {
  return _n(), dl(i), t.flags |= 256, ve(e, t, n, r), t.child
}
var ga = {
  dehydrated: null,
  treeContext: null,
  retryLane: 0
};

function va(e) {
  return {
    baseLanes: e,
    cachePool: null,
    transitions: null
  }
}

function Rp(e, t, n) {
  var r = t.pendingProps,
    i = W.current,
    s = !1,
    o = (t.flags & 128) !== 0,
    a;
  if ((a = o) || (a = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0), a ? (s = !0, t.flags &= -129) : (
      e === null || e.memoizedState !== null) && (i |= 1), O(W, i & 1), e === null) return ua(t), e = t.memoizedState,
    e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes =
      1073741824 : t.lanes = 1, null) : (o = r.children, e = r.fallback, s ? (r = t.mode, s = t.child, o = {
        mode: "hidden",
        children: o
      }, !(r & 1) && s !== null ? (s.childLanes = 0, s.pendingProps = o) : s = Vs(o, r, 0, null), e = tn(e, r, n,
        null), s.return = t, e.return = t, s.sibling = e, t.child = s, t.child.memoizedState = va(n), t
      .memoizedState = ga, e) : Pl(t, o));
  if (i = e.memoizedState, i !== null && (a = i.dehydrated, a !== null)) return Rg(e, t, o, r, a, i, n);
  if (s) {
    s = r.fallback, o = t.mode, i = e.child, a = i.sibling;
    var l = {
      mode: "hidden",
      children: r.children
    };
    return !(o & 1) && t.child !== i ? (r = t.child, r.childLanes = 0, r.pendingProps = l, t.deletions = null) : (r =
        Mt(i, l), r.subtreeFlags = i.subtreeFlags & 14680064), a !== null ? s = Mt(a, s) : (s = tn(s, o, n, null), s
        .flags |= 2), s.return = t, r.return = t, r.sibling = s, t.child = r, r = s, s = t.child, o = e.child
      .memoizedState, o = o === null ? va(n) : {
        baseLanes: o.baseLanes | n,
        cachePool: null,
        transitions: o.transitions
      }, s.memoizedState = o, s.childLanes = e.childLanes & ~n, t.memoizedState = ga, r
  }
  return s = e.child, e = s.sibling, r = Mt(s, {
    mode: "visible",
    children: r.children
  }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t
    .deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r
}

function Pl(e, t) {
  return t = Vs({
    mode: "visible",
    children: t
  }, e.mode, 0, null), t.return = e, e.child = t
}

function wi(e, t, n, r) {
  return r !== null && dl(r), On(t, e.child, null, n), e = Pl(t, t.pendingProps.children), e.flags |= 2, t
    .memoizedState = null, e
}

function Rg(e, t, n, r, i, s, o) {
  if (n) return t.flags & 256 ? (t.flags &= -257, r = po(Error(N(422))), wi(e, t, o, r)) : t.memoizedState !== null ? (t
    .child = e.child, t.flags |= 128, null) : (s = r.fallback, i = t.mode, r = Vs({
      mode: "visible",
      children: r.children
    }, i, 0, null), s = tn(s, i, o, null), s.flags |= 2, r.return = t, s.return = t, r.sibling = s, t.child = r, t
    .mode & 1 && On(t, e.child, null, o), t.child.memoizedState = va(o), t.memoizedState = ga, s);
  if (!(t.mode & 1)) return wi(e, t, o, null);
  if (i.data === "$!") {
    if (r = i.nextSibling && i.nextSibling.dataset, r) var a = r.dgst;
    return r = a, s = Error(N(419)), r = po(s, r, void 0), wi(e, t, o, r)
  }
  if (a = (o & e.childLanes) !== 0, Se || a) {
    if (r = oe, r !== null) {
      switch (o & -o) {
        case 4:
          i = 2;
          break;
        case 16:
          i = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          i = 32;
          break;
        case 536870912:
          i = 268435456;
          break;
        default:
          i = 0
      }
      i = i & (r.suspendedLanes | o) ? 0 : i, i !== 0 && i !== s.retryLane && (s.retryLane = i, pt(e, i), Qe(r, e, i, -
        1))
    }
    return Al(), r = po(Error(N(421))), wi(e, t, o, r)
  }
  return i.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Gg.bind(null, e), i._reactRetry = t, null) : (e = s
    .treeContext, Ce = bt(i.nextSibling), Ee = t, $ = !0, Ke = null, e !== null && (Le[Ie++] = ot, Le[Ie++] = at, Le[
      Ie++] = sn, ot = e.id, at = e.overflow, sn = t), t = Pl(t, r.children), t.flags |= 4096, t)
}

function mc(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), ca(e.return, t, n)
}

function ho(e, t, n, r, i) {
  var s = e.memoizedState;
  s === null ? e.memoizedState = {
    isBackwards: t,
    rendering: null,
    renderingStartTime: 0,
    last: r,
    tail: n,
    tailMode: i
  } : (s.isBackwards = t, s.rendering = null, s.renderingStartTime = 0, s.last = r, s.tail = n, s.tailMode = i)
}

function Dp(e, t, n) {
  var r = t.pendingProps,
    i = r.revealOrder,
    s = r.tail;
  if (ve(e, t, r.children, n), r = W.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null;) {
      if (e.tag === 13) e.memoizedState !== null && mc(e, n, t);
      else if (e.tag === 19) mc(e, n, t);
      else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue
      }
      if (e === t) break e;
      for (; e.sibling === null;) {
        if (e.return === null || e.return === t) break e;
        e = e.return
      }
      e.sibling.return = e.return, e = e.sibling
    }
    r &= 1
  }
  if (O(W, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (i) {
    case "forwards":
      for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && os(e) === null && (i = n), n = n
      .sibling;
      n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), ho(t, !1, i, n, s);
      break;
    case "backwards":
      for (n = null, i = t.child, t.child = null; i !== null;) {
        if (e = i.alternate, e !== null && os(e) === null) {
          t.child = i;
          break
        }
        e = i.sibling, i.sibling = n, n = i, i = e
      }
      ho(t, !0, n, null, s);
      break;
    case "together":
      ho(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null
  }
  return t.child
}

function Ii(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2)
}

function ht(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), an |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(N(153));
  if (t.child !== null) {
    for (e = t.child, n = Mt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n
      .sibling = Mt(e, e.pendingProps), n.return = t;
    n.sibling = null
  }
  return t.child
}

function Dg(e, t, n) {
  switch (t.tag) {
    case 3:
      Mp(t), _n();
      break;
    case 5:
      ap(t);
      break;
    case 1:
      Ne(t.type) && es(t);
      break;
    case 4:
      vl(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        i = t.memoizedProps.value;
      O(rs, r._currentValue), r._currentValue = i;
      break;
    case 13:
      if (r = t.memoizedState, r !== null) return r.dehydrated !== null ? (O(W, W.current & 1), t.flags |= 128, null) :
        n & t.child.childLanes ? Rp(e, t, n) : (O(W, W.current & 1), e = ht(e, t, n), e !== null ? e.sibling : null);
      O(W, W.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return Dp(e, t, n);
        t.flags |= 128
      }
      if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), O(W, W.current),
        r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Ap(e, t, n)
  }
  return ht(e, t, n)
}
var Lp, xa, Ip, _p;
Lp = function(e, t) {
  for (var n = t.child; n !== null;) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      n.child.return = n, n = n.child;
      continue
    }
    if (n === t) break;
    for (; n.sibling === null;) {
      if (n.return === null || n.return === t) return;
      n = n.return
    }
    n.sibling.return = n.return, n = n.sibling
  }
};
xa = function() {};
Ip = function(e, t, n, r) {
  var i = e.memoizedProps;
  if (i !== r) {
    e = t.stateNode, qt(et.current);
    var s = null;
    switch (n) {
      case "input":
        i = Fo(e, i), r = Fo(e, r), s = [];
        break;
      case "select":
        i = G({}, i, {
          value: void 0
        }), r = G({}, r, {
          value: void 0
        }), s = [];
        break;
      case "textarea":
        i = $o(e, i), r = $o(e, r), s = [];
        break;
      default:
        typeof i.onClick != "function" && typeof r.onClick == "function" && (e.onclick = qi)
    }
    Ho(n, r);
    var o;
    n = null;
    for (c in i)
      if (!r.hasOwnProperty(c) && i.hasOwnProperty(c) && i[c] != null)
        if (c === "style") {
          var a = i[c];
          for (o in a) a.hasOwnProperty(o) && (n || (n = {}), n[o] = "")
        } else c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !==
          "suppressHydrationWarning" && c !== "autoFocus" && (Cr.hasOwnProperty(c) ? s || (s = []) : (s = s || [])
            .push(c, null));
    for (c in r) {
      var l = r[c];
      if (a = i != null ? i[c] : void 0, r.hasOwnProperty(c) && l !== a && (l != null || a != null))
        if (c === "style")
          if (a) {
            for (o in a) !a.hasOwnProperty(o) || l && l.hasOwnProperty(o) || (n || (n = {}), n[o] = "");
            for (o in l) l.hasOwnProperty(o) && a[o] !== l[o] && (n || (n = {}), n[o] = l[o])
          } else n || (s || (s = []), s.push(c, n)), n = l;
      else c === "dangerouslySetInnerHTML" ? (l = l ? l.__html : void 0, a = a ? a.__html : void 0, l != null && a !==
        l && (s = s || []).push(c, l)) : c === "children" ? typeof l != "string" && typeof l != "number" || (s =
        s || []).push(c, "" + l) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (Cr
        .hasOwnProperty(c) ? (l != null && c === "onScroll" && F("scroll", e), s || a === l || (s = [])) : (s = s ||
          []).push(c, l))
    }
    n && (s = s || []).push("style", n);
    var c = s;
    (t.updateQueue = c) && (t.flags |= 4)
  }
};
_p = function(e, t, n, r) {
  n !== r && (t.flags |= 4)
};

function ir(e, t) {
  if (!$) switch (e.tailMode) {
    case "hidden":
      t = e.tail;
      for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
      n === null ? e.tail = null : n.sibling = null;
      break;
    case "collapsed":
      n = e.tail;
      for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
      r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null
  }
}

function fe(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 14680064, r |= i.flags &
      14680064, i.return = e, i = i.sibling;
  else
    for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i
      .sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t
}

function Lg(e, t, n) {
  var r = t.pendingProps;
  switch (cl(t), t.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return fe(t), null;
    case 1:
      return Ne(t.type) && Ji(), fe(t), null;
    case 3:
      return r = t.stateNode, Fn(), B(je), B(ge), yl(), r.pendingContext && (r.context = r.pendingContext, r
        .pendingContext = null), (e === null || e.child === null) && (xi(t) ? t.flags |= 4 : e === null || e
        .memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Ke !== null && (Ta(Ke), Ke = null))), xa(
        e, t), fe(t), null;
    case 5:
      xl(t);
      var i = qt(Or.current);
      if (n = t.type, e !== null && t.stateNode != null) Ip(e, t, n, r, i), e.ref !== t.ref && (t.flags |= 512, t
        .flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(N(166));
          return fe(t), null
        }
        if (e = qt(et.current), xi(t)) {
          r = t.stateNode, n = t.type;
          var s = t.memoizedProps;
          switch (r[qe] = t, r[Ir] = s, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              F("cancel", r), F("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              F("load", r);
              break;
            case "video":
            case "audio":
              for (i = 0; i < cr.length; i++) F(cr[i], r);
              break;
            case "source":
              F("error", r);
              break;
            case "img":
            case "image":
            case "link":
              F("error", r), F("load", r);
              break;
            case "details":
              F("toggle", r);
              break;
            case "input":
              Nu(r, s), F("invalid", r);
              break;
            case "select":
              r._wrapperState = {
                wasMultiple: !!s.multiple
              }, F("invalid", r);
              break;
            case "textarea":
              Tu(r, s), F("invalid", r)
          }
          Ho(n, s), i = null;
          for (var o in s)
            if (s.hasOwnProperty(o)) {
              var a = s[o];
              o === "children" ? typeof a == "string" ? r.textContent !== a && (s.suppressHydrationWarning !== !0 && vi(
                  r.textContent, a, e), i = ["children", a]) : typeof a == "number" && r.textContent !== "" + a && (s
                  .suppressHydrationWarning !== !0 && vi(r.textContent, a, e), i = ["children", "" + a]) : Cr
                .hasOwnProperty(o) && a != null && o === "onScroll" && F("scroll", r)
            } switch (n) {
            case "input":
              ui(r), Pu(r, s, !0);
              break;
            case "textarea":
              ui(r), Cu(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof s.onClick == "function" && (r.onclick = qi)
          }
          r = i, t.updateQueue = r, r !== null && (t.flags |= 4)
        } else {
          o = i.nodeType === 9 ? i : i.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = ff(n)), e ===
            "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = o.createElement("div"), e.innerHTML =
              "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = o.createElement(
            n, {
              is: r.is
            }) : (e = o.createElement(n), n === "select" && (o = e, r.multiple ? o.multiple = !0 : r.size && (o.size = r
              .size))) : e = o.createElementNS(e, n), e[qe] = t, e[Ir] = r, Lp(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (o = Ko(n, r), n) {
              case "dialog":
                F("cancel", e), F("close", e), i = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                F("load", e), i = r;
                break;
              case "video":
              case "audio":
                for (i = 0; i < cr.length; i++) F(cr[i], e);
                i = r;
                break;
              case "source":
                F("error", e), i = r;
                break;
              case "img":
              case "image":
              case "link":
                F("error", e), F("load", e), i = r;
                break;
              case "details":
                F("toggle", e), i = r;
                break;
              case "input":
                Nu(e, r), i = Fo(e, r), F("invalid", e);
                break;
              case "option":
                i = r;
                break;
              case "select":
                e._wrapperState = {
                  wasMultiple: !!r.multiple
                }, i = G({}, r, {
                  value: void 0
                }), F("invalid", e);
                break;
              case "textarea":
                Tu(e, r), i = $o(e, r), F("invalid", e);
                break;
              default:
                i = r
            }
            Ho(n, i),
            a = i;
            for (s in a)
              if (a.hasOwnProperty(s)) {
                var l = a[s];
                s === "style" ? mf(e, l) : s === "dangerouslySetInnerHTML" ? (l = l ? l.__html : void 0, l != null &&
                    pf(e, l)) : s === "children" ? typeof l == "string" ? (n !== "textarea" || l !== "") && Er(e, l) :
                  typeof l == "number" && Er(e, "" + l) : s !== "suppressContentEditableWarning" && s !==
                  "suppressHydrationWarning" && s !== "autoFocus" && (Cr.hasOwnProperty(s) ? l != null && s ===
                    "onScroll" && F("scroll", e) : l != null && Ya(e, s, l, o))
              } switch (n) {
              case "input":
                ui(e), Pu(e, r, !1);
                break;
              case "textarea":
                ui(e), Cu(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Rt(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, s = r.value, s != null ? zn(e, !!r.multiple, s, !1) : r.defaultValue !=
                  null && zn(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof i.onClick == "function" && (e.onclick = qi)
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1
            }
          }
          r && (t.flags |= 4)
        }
        t.ref !== null && (t.flags |= 512, t.flags |= 2097152)
      }
      return fe(t), null;
    case 6:
      if (e && t.stateNode != null) _p(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(N(166));
        if (n = qt(Or.current), qt(et.current), xi(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[qe] = t, (s = r.nodeValue !== n) && (e = Ee, e !== null)) switch (
            e.tag) {
            case 3:
              vi(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && vi(r.nodeValue, n, (e.mode & 1) !== 0)
          }
          s && (t.flags |= 4)
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[qe] = t, t.stateNode = r
      }
      return fe(t), null;
    case 13:
      if (B(W), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if ($ && Ce !== null && t.mode & 1 && !(t.flags & 128)) np(), _n(), t.flags |= 98560, s = !1;
        else if (s = xi(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!s) throw Error(N(318));
            if (s = t.memoizedState, s = s !== null ? s.dehydrated : null, !s) throw Error(N(317));
            s[qe] = t
          } else _n(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          fe(t), s = !1
        } else Ke !== null && (Ta(Ke), Ke = null), s = !0;
        if (!s) return t.flags & 65536 ? t : null
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r &&
        (t.child.flags |= 8192, t.mode & 1 && (e === null || W.current & 1 ? ne === 0 && (ne = 3) : Al())), t
        .updateQueue !== null && (t.flags |= 4), fe(t), null);
    case 4:
      return Fn(), xa(e, t), e === null && Dr(t.stateNode.containerInfo), fe(t), null;
    case 10:
      return hl(t.type._context), fe(t), null;
    case 17:
      return Ne(t.type) && Ji(), fe(t), null;
    case 19:
      if (B(W), s = t.memoizedState, s === null) return fe(t), null;
      if (r = (t.flags & 128) !== 0, o = s.rendering, o === null)
        if (r) ir(s, !1);
        else {
          if (ne !== 0 || e !== null && e.flags & 128)
            for (e = t.child; e !== null;) {
              if (o = os(e), o !== null) {
                for (t.flags |= 128, ir(s, !1), r = o.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t
                  .subtreeFlags = 0, r = n, n = t.child; n !== null;) s = n, e = r, s.flags &= 14680066, o = s
                  .alternate, o === null ? (s.childLanes = 0, s.lanes = e, s.child = null, s.subtreeFlags = 0, s
                    .memoizedProps = null, s.memoizedState = null, s.updateQueue = null, s.dependencies = null, s
                    .stateNode = null) : (s.childLanes = o.childLanes, s.lanes = o.lanes, s.child = o.child, s
                    .subtreeFlags = 0, s.deletions = null, s.memoizedProps = o.memoizedProps, s.memoizedState = o
                    .memoizedState, s.updateQueue = o.updateQueue, s.type = o.type, e = o.dependencies, s.dependencies =
                    e === null ? null : {
                      lanes: e.lanes,
                      firstContext: e.firstContext
                    }), n = n.sibling;
                return O(W, W.current & 1 | 2), t.child
              }
              e = e.sibling
            }
          s.tail !== null && q() > Un && (t.flags |= 128, r = !0, ir(s, !1), t.lanes = 4194304)
        }
      else {
        if (!r)
          if (e = os(o), e !== null) {
            if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), ir(s, !0), s
              .tail === null && s.tailMode === "hidden" && !o.alternate && !$) return fe(t), null
          } else 2 * q() - s.renderingStartTime > Un && n !== 1073741824 && (t.flags |= 128, r = !0, ir(s, !1), t
            .lanes = 4194304);
        s.isBackwards ? (o.sibling = t.child, t.child = o) : (n = s.last, n !== null ? n.sibling = o : t.child = o, s
          .last = o)
      }
      return s.tail !== null ? (t = s.tail, s.rendering = t, s.tail = t.sibling, s.renderingStartTime = q(), t.sibling =
        null, n = W.current, O(W, r ? n & 1 | 2 : n & 1), t) : (fe(t), null);
    case 22:
    case 23:
      return zl(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r &&
        t.mode & 1 ? Te & 1073741824 && (fe(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : fe(t), null;
    case 24:
      return null;
    case 25:
      return null
  }
  throw Error(N(156, t.tag))
}

function Ig(e, t) {
  switch (cl(t), t.tag) {
    case 1:
      return Ne(t.type) && Ji(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return Fn(), B(je), B(ge), yl(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return xl(t), null;
    case 13:
      if (B(W), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(N(340));
        _n()
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return B(W), null;
    case 4:
      return Fn(), null;
    case 10:
      return hl(t.type._context), null;
    case 22:
    case 23:
      return zl(), null;
    case 24:
      return null;
    default:
      return null
  }
}
var ki = !1,
  he = !1,
  _g = typeof WeakSet == "function" ? WeakSet : Set,
  z = null;

function jn(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function") try {
      n(null)
    } catch (r) {
      Y(e, t, r)
    } else n.current = null
}

function ya(e, t, n) {
  try {
    n()
  } catch (r) {
    Y(e, t, r)
  }
}
var gc = !1;

function Og(e, t) {
  if (na = Yi, e = $f(), ll(e)) {
    if ("selectionStart" in e) var n = {
      start: e.selectionStart,
      end: e.selectionEnd
    };
    else e: {
      n = (n = e.ownerDocument) && n.defaultView || window;
      var r = n.getSelection && n.getSelection();
      if (r && r.rangeCount !== 0) {
        n = r.anchorNode;
        var i = r.anchorOffset,
          s = r.focusNode;
        r = r.focusOffset;
        try {
          n.nodeType, s.nodeType
        } catch {
          n = null;
          break e
        }
        var o = 0,
          a = -1,
          l = -1,
          c = 0,
          d = 0,
          f = e,
          p = null;
        t: for (;;) {
          for (var v; f !== n || i !== 0 && f.nodeType !== 3 || (a = o + i), f !== s || r !== 0 && f.nodeType !==
            3 || (l = o + r), f.nodeType === 3 && (o += f.nodeValue.length), (v = f.firstChild) !== null;) p = f,
            f = v;
          for (;;) {
            if (f === e) break t;
            if (p === n && ++c === i && (a = o), p === s && ++d === r && (l = o), (v = f.nextSibling) !== null)
              break;
            f = p, p = f.parentNode
          }
          f = v
        }
        n = a === -1 || l === -1 ? null : {
          start: a,
          end: l
        }
      } else n = null
    }
    n = n || {
      start: 0,
      end: 0
    }
  } else n = null;
  for (ra = {
      focusedElem: e,
      selectionRange: n
    }, Yi = !1, z = t; z !== null;)
    if (t = z, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, z = e;
    else
      for (; z !== null;) {
        t = z;
        try {
          var x = t.alternate;
          if (t.flags & 1024) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              break;
            case 1:
              if (x !== null) {
                var y = x.memoizedProps,
                  S = x.memoizedState,
                  m = t.stateNode,
                  h = m.getSnapshotBeforeUpdate(t.elementType === t.type ? y : We(t.type, y), S);
                m.__reactInternalSnapshotBeforeUpdate = h
              }
              break;
            case 3:
              var g = t.stateNode.containerInfo;
              g.nodeType === 1 ? g.textContent = "" : g.nodeType === 9 && g.documentElement && g.removeChild(g
                .documentElement);
              break;
            case 5:
            case 6:
            case 4:
            case 17:
              break;
            default:
              throw Error(N(163))
          }
        } catch (w) {
          Y(t, t.return, w)
        }
        if (e = t.sibling, e !== null) {
          e.return = t.return, z = e;
          break
        }
        z = t.return
      }
  return x = gc, gc = !1, x
}

function wr(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var i = r = r.next;
    do {
      if ((i.tag & e) === e) {
        var s = i.destroy;
        i.destroy = void 0, s !== void 0 && ya(t, n, s)
      }
      i = i.next
    } while (i !== r)
  }
}

function zs(e, t) {
  if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
    var n = t = t.next;
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r()
      }
      n = n.next
    } while (n !== t)
  }
}

function wa(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n
    }
    typeof t == "function" ? t(e) : t.current = e
  }
}

function Op(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, Op(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e
      .stateNode, t !== null && (delete t[qe], delete t[Ir], delete t[oa], delete t[kg], delete t[Sg])), e.stateNode =
    null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null,
    e.stateNode = null, e.updateQueue = null
}

function Fp(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4
}

function vc(e) {
  e: for (;;) {
    for (; e.sibling === null;) {
      if (e.return === null || Fp(e.return)) return null;
      e = e.return
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child
    }
    if (!(e.flags & 2)) return e.stateNode
  }
}

function ka(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e,
    t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n
      ._reactRootContainer, n != null || t.onclick !== null || (t.onclick = qi));
  else if (r !== 4 && (e = e.child, e !== null))
    for (ka(e, t, n), e = e.sibling; e !== null;) ka(e, t, n), e = e.sibling
}

function Sa(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null))
    for (Sa(e, t, n), e = e.sibling; e !== null;) Sa(e, t, n), e = e.sibling
}
var ae = null,
  He = !1;

function xt(e, t, n) {
  for (n = n.child; n !== null;) Bp(e, t, n), n = n.sibling
}

function Bp(e, t, n) {
  if (Je && typeof Je.onCommitFiberUnmount == "function") try {
    Je.onCommitFiberUnmount(Ss, n)
  } catch {}
  switch (n.tag) {
    case 5:
      he || jn(n, t);
    case 6:
      var r = ae,
        i = He;
      ae = null, xt(e, t, n), ae = r, He = i, ae !== null && (He ? (e = ae, n = n.stateNode, e.nodeType === 8 ? e
        .parentNode.removeChild(n) : e.removeChild(n)) : ae.removeChild(n.stateNode));
      break;
    case 18:
      ae !== null && (He ? (e = ae, n = n.stateNode, e.nodeType === 8 ? oo(e.parentNode, n) : e.nodeType === 1 && oo(e,
        n), Vr(e)) : oo(ae, n.stateNode));
      break;
    case 4:
      r = ae, i = He, ae = n.stateNode.containerInfo, He = !0, xt(e, t, n), ae = r, He = i;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!he && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        i = r = r.next;
        do {
          var s = i,
            o = s.destroy;
          s = s.tag, o !== void 0 && (s & 2 || s & 4) && ya(n, t, o), i = i.next
        } while (i !== r)
      }
      xt(e, t, n);
      break;
    case 1:
      if (!he && (jn(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount()
      } catch (a) {
        Y(n, t, a)
      }
      xt(e, t, n);
      break;
    case 21:
      xt(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (he = (r = he) || n.memoizedState !== null, xt(e, t, n), he = r) : xt(e, t, n);
      break;
    default:
      xt(e, t, n)
  }
}

function xc(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new _g), t.forEach(function(r) {
      var i = Qg.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(i, i))
    })
  }
}

function Ue(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      try {
        var s = e,
          o = t,
          a = o;
        e: for (; a !== null;) {
          switch (a.tag) {
            case 5:
              ae = a.stateNode, He = !1;
              break e;
            case 3:
              ae = a.stateNode.containerInfo, He = !0;
              break e;
            case 4:
              ae = a.stateNode.containerInfo, He = !0;
              break e
          }
          a = a.return
        }
        if (ae === null) throw Error(N(160));
        Bp(s, o, i), ae = null, He = !1;
        var l = i.alternate;
        l !== null && (l.return = null), i.return = null
      } catch (c) {
        Y(i, t, c)
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null;) Up(t, e), t = t.sibling
}

function Up(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Ue(t, e), Xe(e), r & 4) {
        try {
          wr(3, e, e.return), zs(3, e)
        } catch (y) {
          Y(e, e.return, y)
        }
        try {
          wr(5, e, e.return)
        } catch (y) {
          Y(e, e.return, y)
        }
      }
      break;
    case 1:
      Ue(t, e), Xe(e), r & 512 && n !== null && jn(n, n.return);
      break;
    case 5:
      if (Ue(t, e), Xe(e), r & 512 && n !== null && jn(n, n.return), e.flags & 32) {
        var i = e.stateNode;
        try {
          Er(i, "")
        } catch (y) {
          Y(e, e.return, y)
        }
      }
      if (r & 4 && (i = e.stateNode, i != null)) {
        var s = e.memoizedProps,
          o = n !== null ? n.memoizedProps : s,
          a = e.type,
          l = e.updateQueue;
        if (e.updateQueue = null, l !== null) try {
          a === "input" && s.type === "radio" && s.name != null && cf(i, s), Ko(a, o);
          var c = Ko(a, s);
          for (o = 0; o < l.length; o += 2) {
            var d = l[o],
              f = l[o + 1];
            d === "style" ? mf(i, f) : d === "dangerouslySetInnerHTML" ? pf(i, f) : d === "children" ? Er(i, f) : Ya(
              i, d, f, c)
          }
          switch (a) {
            case "input":
              Bo(i, s);
              break;
            case "textarea":
              df(i, s);
              break;
            case "select":
              var p = i._wrapperState.wasMultiple;
              i._wrapperState.wasMultiple = !!s.multiple;
              var v = s.value;
              v != null ? zn(i, !!s.multiple, v, !1) : p !== !!s.multiple && (s.defaultValue != null ? zn(i, !!s
                .multiple, s.defaultValue, !0) : zn(i, !!s.multiple, s.multiple ? [] : "", !1))
          }
          i[Ir] = s
        } catch (y) {
          Y(e, e.return, y)
        }
      }
      break;
    case 6:
      if (Ue(t, e), Xe(e), r & 4) {
        if (e.stateNode === null) throw Error(N(162));
        i = e.stateNode, s = e.memoizedProps;
        try {
          i.nodeValue = s
        } catch (y) {
          Y(e, e.return, y)
        }
      }
      break;
    case 3:
      if (Ue(t, e), Xe(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Vr(t.containerInfo)
      } catch (y) {
        Y(e, e.return, y)
      }
      break;
    case 4:
      Ue(t, e), Xe(e);
      break;
    case 13:
      Ue(t, e), Xe(e), i = e.child, i.flags & 8192 && (s = i.memoizedState !== null, i.stateNode.isHidden = s, !s || i
        .alternate !== null && i.alternate.memoizedState !== null || (El = q())), r & 4 && xc(e);
      break;
    case 22:
      if (d = n !== null && n.memoizedState !== null, e.mode & 1 ? (he = (c = he) || d, Ue(t, e), he = c) : Ue(t, e),
        Xe(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !d && e.mode & 1)
          for (z = e, d = e.child; d !== null;) {
            for (f = z = d; z !== null;) {
              switch (p = z, v = p.child, p.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  wr(4, p, p.return);
                  break;
                case 1:
                  jn(p, p.return);
                  var x = p.stateNode;
                  if (typeof x.componentWillUnmount == "function") {
                    r = p, n = p.return;
                    try {
                      t = r, x.props = t.memoizedProps, x.state = t.memoizedState, x.componentWillUnmount()
                    } catch (y) {
                      Y(r, n, y)
                    }
                  }
                  break;
                case 5:
                  jn(p, p.return);
                  break;
                case 22:
                  if (p.memoizedState !== null) {
                    wc(f);
                    continue
                  }
              }
              v !== null ? (v.return = p, z = v) : wc(f)
            }
            d = d.sibling
          }
        e: for (d = null, f = e;;) {
          if (f.tag === 5) {
            if (d === null) {
              d = f;
              try {
                i = f.stateNode, c ? (s = i.style, typeof s.setProperty == "function" ? s.setProperty("display",
                  "none", "important") : s.display = "none") : (a = f.stateNode, l = f.memoizedProps.style, o = l !=
                  null && l.hasOwnProperty("display") ? l.display : null, a.style.display = hf("display", o))
              } catch (y) {
                Y(e, e.return, y)
              }
            }
          } else if (f.tag === 6) {
            if (d === null) try {
              f.stateNode.nodeValue = c ? "" : f.memoizedProps
            } catch (y) {
              Y(e, e.return, y)
            }
          } else if ((f.tag !== 22 && f.tag !== 23 || f.memoizedState === null || f === e) && f.child !== null) {
            f.child.return = f, f = f.child;
            continue
          }
          if (f === e) break e;
          for (; f.sibling === null;) {
            if (f.return === null || f.return === e) break e;
            d === f && (d = null), f = f.return
          }
          d === f && (d = null), f.sibling.return = f.return, f = f.sibling
        }
      }
      break;
    case 19:
      Ue(t, e), Xe(e), r & 4 && xc(e);
      break;
    case 21:
      break;
    default:
      Ue(t, e), Xe(e)
  }
}

function Xe(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null;) {
          if (Fp(n)) {
            var r = n;
            break e
          }
          n = n.return
        }
        throw Error(N(160))
      }
      switch (r.tag) {
        case 5:
          var i = r.stateNode;
          r.flags & 32 && (Er(i, ""), r.flags &= -33);
          var s = vc(e);
          Sa(e, s, i);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo,
            a = vc(e);
          ka(e, a, o);
          break;
        default:
          throw Error(N(161))
      }
    }
    catch (l) {
      Y(e, e.return, l)
    }
    e.flags &= -3
  }
  t & 4096 && (e.flags &= -4097)
}

function Fg(e, t, n) {
  z = e, $p(e)
}

function $p(e, t, n) {
  for (var r = (e.mode & 1) !== 0; z !== null;) {
    var i = z,
      s = i.child;
    if (i.tag === 22 && r) {
      var o = i.memoizedState !== null || ki;
      if (!o) {
        var a = i.alternate,
          l = a !== null && a.memoizedState !== null || he;
        a = ki;
        var c = he;
        if (ki = o, (he = l) && !c)
          for (z = i; z !== null;) o = z, l = o.child, o.tag === 22 && o.memoizedState !== null ? kc(i) : l !== null ? (
            l.return = o, z = l) : kc(i);
        for (; s !== null;) z = s, $p(s), s = s.sibling;
        z = i, ki = a, he = c
      }
      yc(e)
    } else i.subtreeFlags & 8772 && s !== null ? (s.return = i, z = s) : yc(e)
  }
}

function yc(e) {
  for (; z !== null;) {
    var t = z;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            he || zs(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !he)
              if (n === null) r.componentDidMount();
              else {
                var i = t.elementType === t.type ? n.memoizedProps : We(t.type, n.memoizedProps);
                r.componentDidUpdate(i, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate)
              } var s = t.updateQueue;
            s !== null && rc(t, s, r);
            break;
          case 3:
            var o = t.updateQueue;
            if (o !== null) {
              if (n = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  n = t.child.stateNode;
                  break;
                case 1:
                  n = t.child.stateNode
              }
              rc(t, o, n)
            }
            break;
          case 5:
            var a = t.stateNode;
            if (n === null && t.flags & 4) {
              n = a;
              var l = t.memoizedProps;
              switch (t.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  l.autoFocus && n.focus();
                  break;
                case "img":
                  l.src && (n.src = l.src)
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (t.memoizedState === null) {
              var c = t.alternate;
              if (c !== null) {
                var d = c.memoizedState;
                if (d !== null) {
                  var f = d.dehydrated;
                  f !== null && Vr(f)
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(N(163))
        }
        he || t.flags & 512 && wa(t)
      } catch (p) {
        Y(t, t.return, p)
      }
    }
    if (t === e) {
      z = null;
      break
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, z = n;
      break
    }
    z = t.return
  }
}

function wc(e) {
  for (; z !== null;) {
    var t = z;
    if (t === e) {
      z = null;
      break
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, z = n;
      break
    }
    z = t.return
  }
}

function kc(e) {
  for (; z !== null;) {
    var t = z;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            zs(4, t)
          } catch (l) {
            Y(t, n, l)
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var i = t.return;
            try {
              r.componentDidMount()
            } catch (l) {
              Y(t, i, l)
            }
          }
          var s = t.return;
          try {
            wa(t)
          } catch (l) {
            Y(t, s, l)
          }
          break;
        case 5:
          var o = t.return;
          try {
            wa(t)
          } catch (l) {
            Y(t, o, l)
          }
      }
    } catch (l) {
      Y(t, t.return, l)
    }
    if (t === e) {
      z = null;
      break
    }
    var a = t.sibling;
    if (a !== null) {
      a.return = t.return, z = a;
      break
    }
    z = t.return
  }
}
var Bg = Math.ceil,
  us = gt.ReactCurrentDispatcher,
  Tl = gt.ReactCurrentOwner,
  Oe = gt.ReactCurrentBatchConfig,
  I = 0,
  oe = null,
  J = null,
  ue = 0,
  Te = 0,
  Nn = Ot(0),
  ne = 0,
  $r = null,
  an = 0,
  As = 0,
  Cl = 0,
  kr = null,
  ke = null,
  El = 0,
  Un = 1 / 0,
  it = null,
  cs = !1,
  ja = null,
  At = null,
  Si = !1,
  Pt = null,
  ds = 0,
  Sr = 0,
  Na = null,
  _i = -1,
  Oi = 0;

function xe() {
  return I & 6 ? q() : _i !== -1 ? _i : _i = q()
}

function Vt(e) {
  return e.mode & 1 ? I & 2 && ue !== 0 ? ue & -ue : Ng.transition !== null ? (Oi === 0 && (Oi = Cf()), Oi) : (e = _,
    e !== 0 || (e = window.event, e = e === void 0 ? 16 : Rf(e.type)), e) : 1
}

function Qe(e, t, n, r) {
  if (50 < Sr) throw Sr = 0, Na = null, Error(N(185));
  Xr(e, n, r), (!(I & 2) || e !== oe) && (e === oe && (!(I & 2) && (As |= n), ne === 4 && jt(e, ue)), Pe(e, r), n ===
    1 && I === 0 && !(t.mode & 1) && (Un = q() + 500, Cs && Ft()))
}

function Pe(e, t) {
  var n = e.callbackNode;
  N0(e, t);
  var r = Qi(e, e === oe ? ue : 0);
  if (r === 0) n !== null && zu(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && zu(n), t === 1) e.tag === 0 ? jg(Sc.bind(null, e)) : Jf(Sc.bind(null, e)), yg(function() {
      !(I & 6) && Ft()
    }), n = null;
    else {
      switch (Ef(r)) {
        case 1:
          n = el;
          break;
        case 4:
          n = Pf;
          break;
        case 16:
          n = Gi;
          break;
        case 536870912:
          n = Tf;
          break;
        default:
          n = Gi
      }
      n = Zp(n, Wp.bind(null, e))
    }
    e.callbackPriority = t, e.callbackNode = n
  }
}

function Wp(e, t) {
  if (_i = -1, Oi = 0, I & 6) throw Error(N(327));
  var n = e.callbackNode;
  if (Dn() && e.callbackNode !== n) return null;
  var r = Qi(e, e === oe ? ue : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = fs(e, r);
  else {
    t = r;
    var i = I;
    I |= 2;
    var s = Kp();
    (oe !== e || ue !== t) && (it = null, Un = q() + 500, en(e, t));
    do try {
      Wg();
      break
    } catch (a) {
      Hp(e, a)
    }
    while (!0);
    pl(), us.current = s, I = i, J !== null ? t = 0 : (oe = null, ue = 0, t = ne)
  }
  if (t !== 0) {
    if (t === 2 && (i = Zo(e), i !== 0 && (r = i, t = Pa(e, i))), t === 1) throw n = $r, en(e, 0), jt(e, r), Pe(e, q()),
      n;
    if (t === 6) jt(e, r);
    else {
      if (i = e.current.alternate, !(r & 30) && !Ug(i) && (t = fs(e, r), t === 2 && (s = Zo(e), s !== 0 && (r = s, t =
          Pa(e, s))), t === 1)) throw n = $r, en(e, 0), jt(e, r), Pe(e, q()), n;
      switch (e.finishedWork = i, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(N(345));
        case 2:
          Gt(e, ke, it);
          break;
        case 3:
          if (jt(e, r), (r & 130023424) === r && (t = El + 500 - q(), 10 < t)) {
            if (Qi(e, 0) !== 0) break;
            if (i = e.suspendedLanes, (i & r) !== r) {
              xe(), e.pingedLanes |= e.suspendedLanes & i;
              break
            }
            e.timeoutHandle = sa(Gt.bind(null, e, ke, it), t);
            break
          }
          Gt(e, ke, it);
          break;
        case 4:
          if (jt(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, i = -1; 0 < r;) {
            var o = 31 - Ge(r);
            s = 1 << o, o = t[o], o > i && (i = o), r &= ~s
          }
          if (r = i, r = q() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ?
              3e3 : 4320 > r ? 4320 : 1960 * Bg(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = sa(Gt.bind(null, e, ke, it), r);
            break
          }
          Gt(e, ke, it);
          break;
        case 5:
          Gt(e, ke, it);
          break;
        default:
          throw Error(N(329))
      }
    }
  }
  return Pe(e, q()), e.callbackNode === n ? Wp.bind(null, e) : null
}

function Pa(e, t) {
  var n = kr;
  return e.current.memoizedState.isDehydrated && (en(e, t).flags |= 256), e = fs(e, t), e !== 2 && (t = ke, ke = n,
    t !== null && Ta(t)), e
}

function Ta(e) {
  ke === null ? ke = e : ke.push.apply(ke, e)
}

function Ug(e) {
  for (var t = e;;) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null))
        for (var r = 0; r < n.length; r++) {
          var i = n[r],
            s = i.getSnapshot;
          i = i.value;
          try {
            if (!Ye(s(), i)) return !1
          } catch {
            return !1
          }
        }
    }
    if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
    else {
      if (t === e) break;
      for (; t.sibling === null;) {
        if (t.return === null || t.return === e) return !0;
        t = t.return
      }
      t.sibling.return = t.return, t = t.sibling
    }
  }
  return !0
}

function jt(e, t) {
  for (t &= ~Cl, t &= ~As, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t;) {
    var n = 31 - Ge(t),
      r = 1 << n;
    e[n] = -1, t &= ~r
  }
}

function Sc(e) {
  if (I & 6) throw Error(N(327));
  Dn();
  var t = Qi(e, 0);
  if (!(t & 1)) return Pe(e, q()), null;
  var n = fs(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Zo(e);
    r !== 0 && (t = r, n = Pa(e, r))
  }
  if (n === 1) throw n = $r, en(e, 0), jt(e, t), Pe(e, q()), n;
  if (n === 6) throw Error(N(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Gt(e, ke, it), Pe(e, q()), null
}

function bl(e, t) {
  var n = I;
  I |= 1;
  try {
    return e(t)
  } finally {
    I = n, I === 0 && (Un = q() + 500, Cs && Ft())
  }
}

function ln(e) {
  Pt !== null && Pt.tag === 0 && !(I & 6) && Dn();
  var t = I;
  I |= 1;
  var n = Oe.transition,
    r = _;
  try {
    if (Oe.transition = null, _ = 1, e) return e()
  } finally {
    _ = r, Oe.transition = n, I = t, !(I & 6) && Ft()
  }
}

function zl() {
  Te = Nn.current, B(Nn)
}

function en(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, xg(n)), J !== null)
    for (n = J.return; n !== null;) {
      var r = n;
      switch (cl(r), r.tag) {
        case 1:
          r = r.type.childContextTypes, r != null && Ji();
          break;
        case 3:
          Fn(), B(je), B(ge), yl();
          break;
        case 5:
          xl(r);
          break;
        case 4:
          Fn();
          break;
        case 13:
          B(W);
          break;
        case 19:
          B(W);
          break;
        case 10:
          hl(r.type._context);
          break;
        case 22:
        case 23:
          zl()
      }
      n = n.return
    }
  if (oe = e, J = e = Mt(e.current, null), ue = Te = t, ne = 0, $r = null, Cl = As = an = 0, ke = kr = null, Zt !==
    null) {
    for (t = 0; t < Zt.length; t++)
      if (n = Zt[t], r = n.interleaved, r !== null) {
        n.interleaved = null;
        var i = r.next,
          s = n.pending;
        if (s !== null) {
          var o = s.next;
          s.next = i, r.next = o
        }
        n.pending = r
      } Zt = null
  }
  return e
}

function Hp(e, t) {
  do {
    var n = J;
    try {
      if (pl(), Di.current = ls, as) {
        for (var r = K.memoizedState; r !== null;) {
          var i = r.queue;
          i !== null && (i.pending = null), r = r.next
        }
        as = !1
      }
      if (on = 0, se = te = K = null, yr = !1, Fr = 0, Tl.current = null, n === null || n.return === null) {
        ne = 1, $r = t, J = null;
        break
      }
      e: {
        var s = e,
          o = n.return,
          a = n,
          l = t;
        if (t = ue, a.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
          var c = l,
            d = a,
            f = d.tag;
          if (!(d.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var p = d.alternate;
            p ? (d.updateQueue = p.updateQueue, d.memoizedState = p.memoizedState, d.lanes = p.lanes) : (d
              .updateQueue = null, d.memoizedState = null)
          }
          var v = uc(o);
          if (v !== null) {
            v.flags &= -257, cc(v, o, a, s, t), v.mode & 1 && lc(s, c, t), t = v, l = c;
            var x = t.updateQueue;
            if (x === null) {
              var y = new Set;
              y.add(l), t.updateQueue = y
            } else x.add(l);
            break e
          } else {
            if (!(t & 1)) {
              lc(s, c, t), Al();
              break e
            }
            l = Error(N(426))
          }
        } else if ($ && a.mode & 1) {
          var S = uc(o);
          if (S !== null) {
            !(S.flags & 65536) && (S.flags |= 256), cc(S, o, a, s, t), dl(Bn(l, a));
            break e
          }
        }
        s = l = Bn(l, a),
        ne !== 4 && (ne = 2),
        kr === null ? kr = [s] : kr.push(s),
        s = o;do {
          switch (s.tag) {
            case 3:
              s.flags |= 65536, t &= -t, s.lanes |= t;
              var m = Ep(s, l, t);
              nc(s, m);
              break e;
            case 1:
              a = l;
              var h = s.type,
                g = s.stateNode;
              if (!(s.flags & 128) && (typeof h.getDerivedStateFromError == "function" || g !== null && typeof g
                  .componentDidCatch == "function" && (At === null || !At.has(g)))) {
                s.flags |= 65536, t &= -t, s.lanes |= t;
                var w = bp(s, a, t);
                nc(s, w);
                break e
              }
          }
          s = s.return
        } while (s !== null)
      }
      Qp(n)
    } catch (k) {
      t = k, J === n && n !== null && (J = n = n.return);
      continue
    }
    break
  } while (!0)
}

function Kp() {
  var e = us.current;
  return us.current = ls, e === null ? ls : e
}

function Al() {
  (ne === 0 || ne === 3 || ne === 2) && (ne = 4), oe === null || !(an & 268435455) && !(As & 268435455) || jt(oe, ue)
}

function fs(e, t) {
  var n = I;
  I |= 2;
  var r = Kp();
  (oe !== e || ue !== t) && (it = null, en(e, t));
  do try {
    $g();
    break
  } catch (i) {
    Hp(e, i)
  }
  while (!0);
  if (pl(), I = n, us.current = r, J !== null) throw Error(N(261));
  return oe = null, ue = 0, ne
}

function $g() {
  for (; J !== null;) Gp(J)
}

function Wg() {
  for (; J !== null && !m0();) Gp(J)
}

function Gp(e) {
  var t = Xp(e.alternate, e, Te);
  e.memoizedProps = e.pendingProps, t === null ? Qp(e) : J = t, Tl.current = null
}

function Qp(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Ig(n, t), n !== null) {
        n.flags &= 32767, J = n;
        return
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        ne = 6, J = null;
        return
      }
    } else if (n = Lg(n, t, Te), n !== null) {
      J = n;
      return
    }
    if (t = t.sibling, t !== null) {
      J = t;
      return
    }
    J = t = e
  } while (t !== null);
  ne === 0 && (ne = 5)
}

function Gt(e, t, n) {
  var r = _,
    i = Oe.transition;
  try {
    Oe.transition = null, _ = 1, Hg(e, t, n, r)
  } finally {
    Oe.transition = i, _ = r
  }
  return null
}

function Hg(e, t, n, r) {
  do Dn(); while (Pt !== null);
  if (I & 6) throw Error(N(327));
  n = e.finishedWork;
  var i = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(N(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var s = n.lanes | n.childLanes;
  if (P0(e, s), e === oe && (J = oe = null, ue = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Si || (Si = !0,
      Zp(Gi, function() {
        return Dn(), null
      })), s = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || s) {
    s = Oe.transition, Oe.transition = null;
    var o = _;
    _ = 1;
    var a = I;
    I |= 4, Tl.current = null, Og(e, n), Up(n, e), dg(ra), Yi = !!na, ra = na = null, e.current = n, Fg(n), g0(), I = a,
      _ = o, Oe.transition = s
  } else e.current = n;
  if (Si && (Si = !1, Pt = e, ds = i), s = e.pendingLanes, s === 0 && (At = null), y0(n.stateNode), Pe(e, q()), t !==
    null)
    for (r = e.onRecoverableError, n = 0; n < t.length; n++) i = t[n], r(i.value, {
      componentStack: i.stack,
      digest: i.digest
    });
  if (cs) throw cs = !1, e = ja, ja = null, e;
  return ds & 1 && e.tag !== 0 && Dn(), s = e.pendingLanes, s & 1 ? e === Na ? Sr++ : (Sr = 0, Na = e) : Sr = 0, Ft(),
    null
}

function Dn() {
  if (Pt !== null) {
    var e = Ef(ds),
      t = Oe.transition,
      n = _;
    try {
      if (Oe.transition = null, _ = 16 > e ? 16 : e, Pt === null) var r = !1;
      else {
        if (e = Pt, Pt = null, ds = 0, I & 6) throw Error(N(331));
        var i = I;
        for (I |= 4, z = e.current; z !== null;) {
          var s = z,
            o = s.child;
          if (z.flags & 16) {
            var a = s.deletions;
            if (a !== null) {
              for (var l = 0; l < a.length; l++) {
                var c = a[l];
                for (z = c; z !== null;) {
                  var d = z;
                  switch (d.tag) {
                    case 0:
                    case 11:
                    case 15:
                      wr(8, d, s)
                  }
                  var f = d.child;
                  if (f !== null) f.return = d, z = f;
                  else
                    for (; z !== null;) {
                      d = z;
                      var p = d.sibling,
                        v = d.return;
                      if (Op(d), d === c) {
                        z = null;
                        break
                      }
                      if (p !== null) {
                        p.return = v, z = p;
                        break
                      }
                      z = v
                    }
                }
              }
              var x = s.alternate;
              if (x !== null) {
                var y = x.child;
                if (y !== null) {
                  x.child = null;
                  do {
                    var S = y.sibling;
                    y.sibling = null, y = S
                  } while (y !== null)
                }
              }
              z = s
            }
          }
          if (s.subtreeFlags & 2064 && o !== null) o.return = s, z = o;
          else e: for (; z !== null;) {
            if (s = z, s.flags & 2048) switch (s.tag) {
              case 0:
              case 11:
              case 15:
                wr(9, s, s.return)
            }
            var m = s.sibling;
            if (m !== null) {
              m.return = s.return, z = m;
              break e
            }
            z = s.return
          }
        }
        var h = e.current;
        for (z = h; z !== null;) {
          o = z;
          var g = o.child;
          if (o.subtreeFlags & 2064 && g !== null) g.return = o, z = g;
          else e: for (o = h; z !== null;) {
            if (a = z, a.flags & 2048) try {
              switch (a.tag) {
                case 0:
                case 11:
                case 15:
                  zs(9, a)
              }
            } catch (k) {
              Y(a, a.return, k)
            }
            if (a === o) {
              z = null;
              break e
            }
            var w = a.sibling;
            if (w !== null) {
              w.return = a.return, z = w;
              break e
            }
            z = a.return
          }
        }
        if (I = i, Ft(), Je && typeof Je.onPostCommitFiberRoot == "function") try {
          Je.onPostCommitFiberRoot(Ss, e)
        } catch {}
        r = !0
      }
      return r
    } finally {
      _ = n, Oe.transition = t
    }
  }
  return !1
}

function jc(e, t, n) {
  t = Bn(n, t), t = Ep(e, t, 1), e = zt(e, t, 1), t = xe(), e !== null && (Xr(e, 1, t), Pe(e, t))
}

function Y(e, t, n) {
  if (e.tag === 3) jc(e, e, n);
  else
    for (; t !== null;) {
      if (t.tag === 3) {
        jc(t, e, n);
        break
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (At ===
            null || !At.has(r))) {
          e = Bn(n, e), e = bp(t, e, 1), t = zt(t, e, 1), e = xe(), t !== null && (Xr(t, 1, e), Pe(t, e));
          break
        }
      }
      t = t.return
    }
}

function Kg(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = xe(), e.pingedLanes |= e.suspendedLanes & n, oe === e && (ue & n) === n && (ne === 4 ||
    ne === 3 && (ue & 130023424) === ue && 500 > q() - El ? en(e, 0) : Cl |= n), Pe(e, t)
}

function Yp(e, t) {
  t === 0 && (e.mode & 1 ? (t = fi, fi <<= 1, !(fi & 130023424) && (fi = 4194304)) : t = 1);
  var n = xe();
  e = pt(e, t), e !== null && (Xr(e, t, n), Pe(e, n))
}

function Gg(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), Yp(e, n)
}

function Qg(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        i = e.memoizedState;
      i !== null && (n = i.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(N(314))
  }
  r !== null && r.delete(t), Yp(e, n)
}
var Xp;
Xp = function(e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || je.current) Se = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return Se = !1, Dg(e, t, n);
      Se = !!(e.flags & 131072)
    }
  else Se = !1, $ && t.flags & 1048576 && ep(t, ns, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Ii(e, t), e = t.pendingProps;
      var i = In(t, ge.current);
      Rn(t, n), i = kl(null, t, r, e, i, n);
      var s = Sl();
      return t.flags |= 1, typeof i == "object" && i !== null && typeof i.render == "function" && i.$$typeof ===
        void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Ne(r) ? (s = !0, es(t)) : s = !1, t
          .memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, gl(t), i.updater = bs, t
          .stateNode = i, i._reactInternals = t, fa(t, r, e, n), t = ma(null, t, r, !0, s, n)) : (t.tag = 0, $ && s &&
          ul(t), ve(null, t, i, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Ii(e, t), e = t.pendingProps, i = r._init, r = i(r._payload), t.type = r, i = t.tag = Xg(r), e = We(
            r, e), i) {
          case 0:
            t = ha(null, t, r, e, n);
            break e;
          case 1:
            t = pc(null, t, r, e, n);
            break e;
          case 11:
            t = dc(null, t, r, e, n);
            break e;
          case 14:
            t = fc(null, t, r, We(r.type, e), n);
            break e
        }
        throw Error(N(306, r, ""))
      }
      return t;
    case 0:
      return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : We(r, i), ha(e, t, r, i, n);
    case 1:
      return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : We(r, i), pc(e, t, r, i, n);
    case 3:
      e: {
        if (Mp(t), e === null) throw Error(N(387));r = t.pendingProps,
        s = t.memoizedState,
        i = s.element,
        op(e, t),
        ss(t, r, null, n);
        var o = t.memoizedState;
        if (r = o.element, s.isDehydrated)
          if (s = {
              element: r,
              isDehydrated: !1,
              cache: o.cache,
              pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
              transitions: o.transitions
            }, t.updateQueue.baseState = s, t.memoizedState = s, t.flags & 256) {
            i = Bn(Error(N(423)), t), t = hc(e, t, r, n, i);
            break e
          } else if (r !== i) {
          i = Bn(Error(N(424)), t), t = hc(e, t, r, n, i);
          break e
        } else
          for (Ce = bt(t.stateNode.containerInfo.firstChild), Ee = t, $ = !0, Ke = null, n = ip(t, null, r, n), t
            .child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (_n(), r === i) {
            t = ht(e, t, n);
            break e
          }
          ve(e, t, r, n)
        }
        t = t.child
      }
      return t;
    case 5:
      return ap(t), e === null && ua(t), r = t.type, i = t.pendingProps, s = e !== null ? e.memoizedProps : null, o =
        i.children, ia(r, i) ? o = null : s !== null && ia(r, s) && (t.flags |= 32), Vp(e, t), ve(e, t, o, n), t
        .child;
    case 6:
      return e === null && ua(t), null;
    case 13:
      return Rp(e, t, n);
    case 4:
      return vl(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = On(t, null, r, n) : ve(e, t,
        r, n), t.child;
    case 11:
      return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : We(r, i), dc(e, t, r, i, n);
    case 7:
      return ve(e, t, t.pendingProps, n), t.child;
    case 8:
      return ve(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ve(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, i = t.pendingProps, s = t.memoizedProps, o = i.value, O(rs, r._currentValue), r
          ._currentValue = o, s !== null)
          if (Ye(s.value, o)) {
            if (s.children === i.children && !je.current) {
              t = ht(e, t, n);
              break e
            }
          } else
            for (s = t.child, s !== null && (s.return = t); s !== null;) {
              var a = s.dependencies;
              if (a !== null) {
                o = s.child;
                for (var l = a.firstContext; l !== null;) {
                  if (l.context === r) {
                    if (s.tag === 1) {
                      l = lt(-1, n & -n), l.tag = 2;
                      var c = s.updateQueue;
                      if (c !== null) {
                        c = c.shared;
                        var d = c.pending;
                        d === null ? l.next = l : (l.next = d.next, d.next = l), c.pending = l
                      }
                    }
                    s.lanes |= n, l = s.alternate, l !== null && (l.lanes |= n), ca(s.return, n, t), a.lanes |= n;
                    break
                  }
                  l = l.next
                }
              } else if (s.tag === 10) o = s.type === t.type ? null : s.child;
              else if (s.tag === 18) {
                if (o = s.return, o === null) throw Error(N(341));
                o.lanes |= n, a = o.alternate, a !== null && (a.lanes |= n), ca(o, n, t), o = s.sibling
              } else o = s.child;
              if (o !== null) o.return = s;
              else
                for (o = s; o !== null;) {
                  if (o === t) {
                    o = null;
                    break
                  }
                  if (s = o.sibling, s !== null) {
                    s.return = o.return, o = s;
                    break
                  }
                  o = o.return
                }
              s = o
            }
        ve(e, t, i.children, n),
        t = t.child
      }
      return t;
    case 9:
      return i = t.type, r = t.pendingProps.children, Rn(t, n), i = Fe(i), r = r(i), t.flags |= 1, ve(e, t, r, n), t
        .child;
    case 14:
      return r = t.type, i = We(r, t.pendingProps), i = We(r.type, i), fc(e, t, r, i, n);
    case 15:
      return zp(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : We(r, i), Ii(e, t), t.tag = 1, Ne(r) ? (
        e = !0, es(t)) : e = !1, Rn(t, n), Cp(t, r, i), fa(t, r, i, n), ma(null, t, r, !0, e, n);
    case 19:
      return Dp(e, t, n);
    case 22:
      return Ap(e, t, n)
  }
  throw Error(N(156, t.tag))
};

function Zp(e, t) {
  return Nf(e, t)
}

function Yg(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType =
    null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this
    .updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null,
    this.childLanes = this.lanes = 0, this.alternate = null
}

function _e(e, t, n, r) {
  return new Yg(e, t, n, r)
}

function Vl(e) {
  return e = e.prototype, !(!e || !e.isReactComponent)
}

function Xg(e) {
  if (typeof e == "function") return Vl(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Za) return 11;
    if (e === qa) return 14
  }
  return 2
}

function Mt(e, t) {
  var n = e.alternate;
  return n === null ? (n = _e(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e
      .stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n
      .subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e
    .lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e
    .updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n
}

function Fi(e, t, n, r, i, s) {
  var o = 2;
  if (r = e, typeof e == "function") Vl(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else e: switch (e) {
    case hn:
      return tn(n.children, i, s, t);
    case Xa:
      o = 8, i |= 8;
      break;
    case Lo:
      return e = _e(12, n, t, i | 2), e.elementType = Lo, e.lanes = s, e;
    case Io:
      return e = _e(13, n, t, i), e.elementType = Io, e.lanes = s, e;
    case _o:
      return e = _e(19, n, t, i), e.elementType = _o, e.lanes = s, e;
    case af:
      return Vs(n, i, s, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case sf:
          o = 10;
          break e;
        case of:
          o = 9;
          break e;
        case Za:
          o = 11;
          break e;
        case qa:
          o = 14;
          break e;
        case wt:
          o = 16, r = null;
          break e
      }
      throw Error(N(130, e == null ? e : typeof e, ""))
  }
  return t = _e(o, n, t, i), t.elementType = e, t.type = r, t.lanes = s, t
}

function tn(e, t, n, r) {
  return e = _e(7, e, r, t), e.lanes = n, e
}

function Vs(e, t, n, r) {
  return e = _e(22, e, r, t), e.elementType = af, e.lanes = n, e.stateNode = {
    isHidden: !1
  }, e
}

function mo(e, t, n) {
  return e = _e(6, e, null, t), e.lanes = n, e
}

function go(e, t, n) {
  return t = _e(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = {
    containerInfo: e.containerInfo,
    pendingChildren: null,
    implementation: e.implementation
  }, t
}

function Zg(e, t, n, r, i) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null,
    this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0,
    this.eventTimes = Ys(0), this.expirationTimes = Ys(-1), this.entangledLanes = this.finishedLanes = this
    .mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this
    .entanglements = Ys(0), this.identifierPrefix = r, this.onRecoverableError = i, this
    .mutableSourceEagerHydrationData = null
}

function Ml(e, t, n, r, i, s, o, a, l) {
  return e = new Zg(e, t, n, a, l), t === 1 ? (t = 1, s === !0 && (t |= 8)) : t = 0, s = _e(3, null, null, t), e
    .current = s, s.stateNode = e, s.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null
    }, gl(s), e
}

function qg(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: pn,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n
  }
}

function qp(e) {
  if (!e) return Dt;
  e = e._reactInternals;
  e: {
    if (cn(e) !== e || e.tag !== 1) throw Error(N(170));
    var t = e;do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Ne(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e
          }
      }
      t = t.return
    } while (t !== null);
    throw Error(N(171))
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Ne(n)) return qf(e, n, t)
  }
  return t
}

function Jp(e, t, n, r, i, s, o, a, l) {
  return e = Ml(n, r, !0, e, i, s, o, a, l), e.context = qp(null), n = e.current, r = xe(), i = Vt(n), s = lt(r, i), s
    .callback = t ?? null, zt(n, s, i), e.current.lanes = i, Xr(e, i, r), Pe(e, r), e
}

function Ms(e, t, n, r) {
  var i = t.current,
    s = xe(),
    o = Vt(i);
  return n = qp(n), t.context === null ? t.context = n : t.pendingContext = n, t = lt(s, o), t.payload = {
    element: e
  }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = zt(i, t, o), e !== null && (Qe(e, i, o, s), Ri(
    e, i, o)), o
}

function ps(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode
  }
}

function Nc(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t
  }
}

function Rl(e, t) {
  Nc(e, t), (e = e.alternate) && Nc(e, t)
}

function Jg() {
  return null
}
var eh = typeof reportError == "function" ? reportError : function(e) {
  console.error(e)
};

function Dl(e) {
  this._internalRoot = e
}
Rs.prototype.render = Dl.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(N(409));
  Ms(e, t, null, null)
};
Rs.prototype.unmount = Dl.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    ln(function() {
      Ms(null, e, null, null)
    }), t[ft] = null
  }
};

function Rs(e) {
  this._internalRoot = e
}
Rs.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Af();
    e = {
      blockedOn: null,
      target: e,
      priority: t
    };
    for (var n = 0; n < St.length && t !== 0 && t < St[n].priority; n++);
    St.splice(n, 0, e), n === 0 && Mf(e)
  }
};

function Ll(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
}

function Ds(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !==
    " react-mount-point-unstable "))
}

function Pc() {}

function ev(e, t, n, r, i) {
  if (i) {
    if (typeof r == "function") {
      var s = r;
      r = function() {
        var c = ps(o);
        s.call(c)
      }
    }
    var o = Jp(t, r, e, 0, null, !1, !1, "", Pc);
    return e._reactRootContainer = o, e[ft] = o.current, Dr(e.nodeType === 8 ? e.parentNode : e), ln(), o
  }
  for (; i = e.lastChild;) e.removeChild(i);
  if (typeof r == "function") {
    var a = r;
    r = function() {
      var c = ps(l);
      a.call(c)
    }
  }
  var l = Ml(e, 0, !1, null, null, !1, !1, "", Pc);
  return e._reactRootContainer = l, e[ft] = l.current, Dr(e.nodeType === 8 ? e.parentNode : e), ln(function() {
    Ms(t, l, n, r)
  }), l
}

function Ls(e, t, n, r, i) {
  var s = n._reactRootContainer;
  if (s) {
    var o = s;
    if (typeof i == "function") {
      var a = i;
      i = function() {
        var l = ps(o);
        a.call(l)
      }
    }
    Ms(t, o, e, i)
  } else o = ev(n, t, e, i, r);
  return ps(o)
}
bf = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = ur(t.pendingLanes);
        n !== 0 && (tl(t, n | 1), Pe(t, q()), !(I & 6) && (Un = q() + 500, Ft()))
      }
      break;
    case 13:
      ln(function() {
        var r = pt(e, 1);
        if (r !== null) {
          var i = xe();
          Qe(r, e, 1, i)
        }
      }), Rl(e, 1)
  }
};
nl = function(e) {
  if (e.tag === 13) {
    var t = pt(e, 134217728);
    if (t !== null) {
      var n = xe();
      Qe(t, e, 134217728, n)
    }
    Rl(e, 134217728)
  }
};
zf = function(e) {
  if (e.tag === 13) {
    var t = Vt(e),
      n = pt(e, t);
    if (n !== null) {
      var r = xe();
      Qe(n, e, t, r)
    }
    Rl(e, t)
  }
};
Af = function() {
  return _
};
Vf = function(e, t) {
  var n = _;
  try {
    return _ = e, t()
  } finally {
    _ = n
  }
};
Qo = function(e, t, n) {
  switch (t) {
    case "input":
      if (Bo(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode;) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n
          .length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var i = Ts(r);
            if (!i) throw Error(N(90));
            uf(r), Bo(r, i)
          }
        }
      }
      break;
    case "textarea":
      df(e, n);
      break;
    case "select":
      t = n.value, t != null && zn(e, !!n.multiple, t, !1)
  }
};
xf = bl;
yf = ln;
var tv = {
    usingClientEntryPoint: !1,
    Events: [qr, xn, Ts, gf, vf, bl]
  },
  sr = {
    findFiberByHostInstance: Xt,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom"
  },
  nv = {
    bundleType: sr.bundleType,
    version: sr.version,
    rendererPackageName: sr.rendererPackageName,
    rendererConfig: sr.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: gt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function(e) {
      return e = Sf(e), e === null ? null : e.stateNode
    },
    findFiberByHostInstance: sr.findFiberByHostInstance || Jg,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var ji = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!ji.isDisabled && ji.supportsFiber) try {
    Ss = ji.inject(nv), Je = ji
  } catch {}
}
Ve.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tv;
Ve.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Ll(t)) throw Error(N(200));
  return qg(e, t, null, n)
};
Ve.createRoot = function(e, t) {
  if (!Ll(e)) throw Error(N(299));
  var n = !1,
    r = "",
    i = eh;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t
    .identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = Ml(e, 1, !1, null, null,
    n, !1, r, i), e[ft] = t.current, Dr(e.nodeType === 8 ? e.parentNode : e), new Dl(t)
};
Ve.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0) throw typeof e.render == "function" ? Error(N(188)) : (e = Object.keys(e).join(","), Error(N(268,
    e)));
  return e = Sf(t), e = e === null ? null : e.stateNode, e
};
Ve.flushSync = function(e) {
  return ln(e)
};
Ve.hydrate = function(e, t, n) {
  if (!Ds(t)) throw Error(N(200));
  return Ls(null, e, t, !0, n)
};
Ve.hydrateRoot = function(e, t, n) {
  if (!Ll(e)) throw Error(N(405));
  var r = n != null && n.hydratedSources || null,
    i = !1,
    s = "",
    o = eh;
  if (n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (s = n
      .identifierPrefix), n.onRecoverableError !== void 0 && (o = n.onRecoverableError)), t = Jp(t, null, e, 1, n ??
      null, i, !1, s, o), e[ft] = t.current, Dr(e), r)
    for (e = 0; e < r.length; e++) n = r[e], i = n._getVersion, i = i(n._source), t.mutableSourceEagerHydrationData ==
      null ? t.mutableSourceEagerHydrationData = [n, i] : t.mutableSourceEagerHydrationData.push(n, i);
  return new Rs(t)
};
Ve.render = function(e, t, n) {
  if (!Ds(t)) throw Error(N(200));
  return Ls(null, e, t, !1, n)
};
Ve.unmountComponentAtNode = function(e) {
  if (!Ds(e)) throw Error(N(40));
  return e._reactRootContainer ? (ln(function() {
    Ls(null, null, e, !1, function() {
      e._reactRootContainer = null, e[ft] = null
    })
  }), !0) : !1
};
Ve.unstable_batchedUpdates = bl;
Ve.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Ds(n)) throw Error(N(200));
  if (e == null || e._reactInternals === void 0) throw Error(N(38));
  return Ls(e, t, n, !1, r)
};
Ve.version = "18.3.1-next-f1338f8080-20240426";

function th() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(th)
    } catch (e) {
      console.error(e)
    }
}
th(), ef.exports = Ve;
var rv = ef.exports,
  Tc = rv;
Ro.createRoot = Tc.createRoot, Ro.hydrateRoot = Tc.hydrateRoot;
const Il = C.createContext({});

function _l(e) {
  const t = C.useRef(null);
  return t.current === null && (t.current = e()), t.current
}
const Is = C.createContext(null),
  Ol = C.createContext({
    transformPagePoint: e => e,
    isStatic: !1,
    reducedMotion: "never"
  });
class iv extends C.Component {
  getSnapshotBeforeUpdate(t) {
    const n = this.props.childRef.current;
    if (n && t.isPresent && !this.props.isPresent) {
      const r = this.props.sizeRef.current;
      r.height = n.offsetHeight || 0, r.width = n.offsetWidth || 0, r.top = n.offsetTop, r.left = n.offsetLeft
    }
    return null
  }
  componentDidUpdate() {}
  render() {
    return this.props.children
  }
}

function sv({
  children: e,
  isPresent: t
}) {
  const n = C.useId(),
    r = C.useRef(null),
    i = C.useRef({
      width: 0,
      height: 0,
      top: 0,
      left: 0
    }),
    {
      nonce: s
    } = C.useContext(Ol);
  return C.useInsertionEffect(() => {
    const {
      width: o,
      height: a,
      top: l,
      left: c
    } = i.current;
    if (t || !r.current || !o || !a) return;
    r.current.dataset.motionPopId = n;
    const d = document.createElement("style");
    return s && (d.nonce = s), document.head.appendChild(d), d.sheet && d.sheet.insertRule(`
          [data-motion-pop-id="${n}"] {
            position: absolute !important;
            width: ${o}px !important;
            height: ${a}px !important;
            top: ${l}px !important;
            left: ${c}px !important;
          }
        `), () => {
      document.head.removeChild(d)
    }
  }, [t]), u.jsx(iv, {
    isPresent: t,
    childRef: r,
    sizeRef: i,
    children: C.cloneElement(e, {
      ref: r
    })
  })
}
const ov = ({
  children: e,
  initial: t,
  isPresent: n,
  onExitComplete: r,
  custom: i,
  presenceAffectsLayout: s,
  mode: o
}) => {
  const a = _l(av),
    l = C.useId(),
    c = C.useCallback(f => {
      a.set(f, !0);
      for (const p of a.values())
        if (!p) return;
      r && r()
    }, [a, r]),
    d = C.useMemo(() => ({
      id: l,
      initial: t,
      isPresent: n,
      custom: i,
      onExitComplete: c,
      register: f => (a.set(f, !1), () => a.delete(f))
    }), s ? [Math.random(), c] : [n, c]);
  return C.useMemo(() => {
    a.forEach((f, p) => a.set(p, !1))
  }, [n]), C.useEffect(() => {
    !n && !a.size && r && r()
  }, [n]), o === "popLayout" && (e = u.jsx(sv, {
    isPresent: n,
    children: e
  })), u.jsx(Is.Provider, {
    value: d,
    children: e
  })
};

function av() {
  return new Map
}

function nh(e = !0) {
  const t = C.useContext(Is);
  if (t === null) return [!0, null];
  const {
    isPresent: n,
    onExitComplete: r,
    register: i
  } = t, s = C.useId();
  C.useEffect(() => {
    e && i(s)
  }, [e]);
  const o = C.useCallback(() => e && r && r(s), [s, r, e]);
  return !n && r ? [!1, o] : [!0]
}
const Ni = e => e.key || "";

function Cc(e) {
  const t = [];
  return C.Children.forEach(e, n => {
    C.isValidElement(n) && t.push(n)
  }), t
}
const Fl = typeof window < "u",
  rh = Fl ? C.useLayoutEffect : C.useEffect,
  rt = ({
    children: e,
    custom: t,
    initial: n = !0,
    onExitComplete: r,
    presenceAffectsLayout: i = !0,
    mode: s = "sync",
    propagate: o = !1
  }) => {
    const [a, l] = nh(o), c = C.useMemo(() => Cc(e), [e]), d = o && !a ? [] : c.map(Ni), f = C.useRef(!0), p = C.useRef(
      c), v = _l(() => new Map), [x, y] = C.useState(c), [S, m] = C.useState(c);
    rh(() => {
      f.current = !1, p.current = c;
      for (let w = 0; w < S.length; w++) {
        const k = Ni(S[w]);
        d.includes(k) ? v.delete(k) : v.get(k) !== !0 && v.set(k, !1)
      }
    }, [S, d.length, d.join("-")]);
    const h = [];
    if (c !== x) {
      let w = [...c];
      for (let k = 0; k < S.length; k++) {
        const P = S[k],
          T = Ni(P);
        d.includes(T) || (w.splice(k, 0, P), h.push(P))
      }
      s === "wait" && h.length && (w = h), m(Cc(w)), y(c);
      return
    }
    const {
      forceRender: g
    } = C.useContext(Il);
    return u.jsx(u.Fragment, {
      children: S.map(w => {
        const k = Ni(w),
          P = o && !a ? !1 : c === S || d.includes(k),
          T = () => {
            if (v.has(k)) v.set(k, !0);
            else return;
            let j = !0;
            v.forEach(D => {
              D || (j = !1)
            }), j && (g == null || g(), m(p.current), o && (l == null || l()), r && r())
          };
        return u.jsx(ov, {
          isPresent: P,
          initial: !f.current || n ? void 0 : !1,
          custom: P ? void 0 : t,
          presenceAffectsLayout: i,
          mode: s,
          onExitComplete: P ? void 0 : T,
          children: w
        }, k)
      })
    })
  },
  be = e => e;
let ih = be;

function Bl(e) {
  let t;
  return () => (t === void 0 && (t = e()), t)
}
const $n = (e, t, n) => {
    const r = t - e;
    return r === 0 ? 1 : (n - e) / r
  },
  ut = e => e * 1e3,
  ct = e => e / 1e3,
  lv = {
    useManualTiming: !1
  };

function uv(e) {
  let t = new Set,
    n = new Set,
    r = !1,
    i = !1;
  const s = new WeakSet;
  let o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };

  function a(c) {
    s.has(c) && (l.schedule(c), e()), c(o)
  }
  const l = {
    schedule: (c, d = !1, f = !1) => {
      const v = f && r ? t : n;
      return d && s.add(c), v.has(c) || v.add(c), c
    },
    cancel: c => {
      n.delete(c), s.delete(c)
    },
    process: c => {
      if (o = c, r) {
        i = !0;
        return
      }
      r = !0, [t, n] = [n, t], t.forEach(a), t.clear(), r = !1, i && (i = !1, l.process(c))
    }
  };
  return l
}
const Pi = ["read", "resolveKeyframes", "update", "preRender", "render", "postRender"],
  cv = 40;

function sh(e, t) {
  let n = !1,
    r = !0;
  const i = {
      delta: 0,
      timestamp: 0,
      isProcessing: !1
    },
    s = () => n = !0,
    o = Pi.reduce((m, h) => (m[h] = uv(s), m), {}),
    {
      read: a,
      resolveKeyframes: l,
      update: c,
      preRender: d,
      render: f,
      postRender: p
    } = o,
    v = () => {
      const m = performance.now();
      n = !1, i.delta = r ? 1e3 / 60 : Math.max(Math.min(m - i.timestamp, cv), 1), i.timestamp = m, i.isProcessing = !0,
        a.process(i), l.process(i), c.process(i), d.process(i), f.process(i), p.process(i), i.isProcessing = !1, n &&
        t && (r = !1, e(v))
    },
    x = () => {
      n = !0, r = !0, i.isProcessing || e(v)
    };
  return {
    schedule: Pi.reduce((m, h) => {
      const g = o[h];
      return m[h] = (w, k = !1, P = !1) => (n || x(), g.schedule(w, k, P)), m
    }, {}),
    cancel: m => {
      for (let h = 0; h < Pi.length; h++) o[Pi[h]].cancel(m)
    },
    state: i,
    steps: o
  }
}
const {
  schedule: U,
  cancel: Lt,
  state: le,
  steps: vo
} = sh(typeof requestAnimationFrame < "u" ? requestAnimationFrame : be, !0), oh = C.createContext({
  strict: !1
}), Ec = {
  animation: ["animate", "variants", "whileHover", "whileTap", "exit", "whileInView", "whileFocus", "whileDrag"],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
}, Wn = {};
for (const e in Ec) Wn[e] = {
  isEnabled: t => Ec[e].some(n => !!t[n])
};

function dv(e) {
  for (const t in e) Wn[t] = {
    ...Wn[t],
    ...e[t]
  }
}
const fv = new Set(["animate", "exit", "variants", "initial", "style", "values", "variants", "transition",
  "transformTemplate", "custom", "inherit", "onBeforeLayoutMeasure", "onAnimationStart", "onAnimationComplete",
  "onUpdate", "onDragStart", "onDrag", "onDragEnd", "onMeasureDragConstraints", "onDirectionLock",
  "onDragTransitionEnd", "_dragX", "_dragY", "onHoverStart", "onHoverEnd", "onViewportEnter", "onViewportLeave",
  "globalTapTarget", "ignoreStrict", "viewport"
]);

function hs(e) {
  return e.startsWith("while") || e.startsWith("drag") && e !== "draggable" || e.startsWith("layout") || e.startsWith(
    "onTap") || e.startsWith("onPan") || e.startsWith("onLayout") || fv.has(e)
}
let ah = e => !hs(e);

function pv(e) {
  e && (ah = t => t.startsWith("on") ? !hs(t) : e(t))
}
try {
  pv(require("@emotion/is-prop-valid").default)
} catch {}

function hv(e, t, n) {
  const r = {};
  for (const i in e) i === "values" && typeof e.values == "object" || (ah(i) || n === !0 && hs(i) || !t && !hs(i) || e
    .draggable && i.startsWith("onDrag")) && (r[i] = e[i]);
  return r
}

function mv(e) {
  if (typeof Proxy > "u") return e;
  const t = new Map,
    n = (...r) => e(...r);
  return new Proxy(n, {
    get: (r, i) => i === "create" ? e : (t.has(i) || t.set(i, e(i)), t.get(i))
  })
}
const _s = C.createContext({});

function Wr(e) {
  return typeof e == "string" || Array.isArray(e)
}

function Os(e) {
  return e !== null && typeof e == "object" && typeof e.start == "function"
}
const Ul = ["animate", "whileInView", "whileFocus", "whileHover", "whileTap", "whileDrag", "exit"],
  $l = ["initial", ...Ul];

function Fs(e) {
  return Os(e.animate) || $l.some(t => Wr(e[t]))
}

function lh(e) {
  return !!(Fs(e) || e.variants)
}

function gv(e, t) {
  if (Fs(e)) {
    const {
      initial: n,
      animate: r
    } = e;
    return {
      initial: n === !1 || Wr(n) ? n : void 0,
      animate: Wr(r) ? r : void 0
    }
  }
  return e.inherit !== !1 ? t : {}
}

function vv(e) {
  const {
    initial: t,
    animate: n
  } = gv(e, C.useContext(_s));
  return C.useMemo(() => ({
    initial: t,
    animate: n
  }), [bc(t), bc(n)])
}

function bc(e) {
  return Array.isArray(e) ? e.join(" ") : e
}
const xv = Symbol.for("motionComponentSymbol");

function Pn(e) {
  return e && typeof e == "object" && Object.prototype.hasOwnProperty.call(e, "current")
}

function yv(e, t, n) {
  return C.useCallback(r => {
    r && e.onMount && e.onMount(r), t && (r ? t.mount(r) : t.unmount()), n && (typeof n == "function" ? n(r) : Pn(
      n) && (n.current = r))
  }, [t])
}
const Wl = e => e.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(),
  wv = "framerAppearId",
  uh = "data-" + Wl(wv),
  {
    schedule: Hl
  } = sh(queueMicrotask, !1),
  ch = C.createContext({});

function kv(e, t, n, r, i) {
  var s, o;
  const {
    visualElement: a
  } = C.useContext(_s), l = C.useContext(oh), c = C.useContext(Is), d = C.useContext(Ol).reducedMotion, f = C.useRef(
    null);
  r = r || l.renderer, !f.current && r && (f.current = r(e, {
    visualState: t,
    parent: a,
    props: n,
    presenceContext: c,
    blockInitialAnimation: c ? c.initial === !1 : !1,
    reducedMotionConfig: d
  }));
  const p = f.current,
    v = C.useContext(ch);
  p && !p.projection && i && (p.type === "html" || p.type === "svg") && Sv(f.current, n, i, v);
  const x = C.useRef(!1);
  C.useInsertionEffect(() => {
    p && x.current && p.update(n, c)
  });
  const y = n[uh],
    S = C.useRef(!!y && !(!((s = window.MotionHandoffIsComplete) === null || s === void 0) && s.call(window, y)) && ((
      o = window.MotionHasOptimisedAnimation) === null || o === void 0 ? void 0 : o.call(window, y)));
  return rh(() => {
    p && (x.current = !0, window.MotionIsMounted = !0, p.updateFeatures(), Hl.render(p.render), S.current && p
      .animationState && p.animationState.animateChanges())
  }), C.useEffect(() => {
    p && (!S.current && p.animationState && p.animationState.animateChanges(), S.current && (queueMicrotask(() => {
      var m;
      (m = window.MotionHandoffMarkAsComplete) === null || m === void 0 || m.call(window, y)
    }), S.current = !1))
  }), p
}

function Sv(e, t, n, r) {
  const {
    layoutId: i,
    layout: s,
    drag: o,
    dragConstraints: a,
    layoutScroll: l,
    layoutRoot: c
  } = t;
  e.projection = new n(e.latestValues, t["data-framer-portal-id"] ? void 0 : dh(e.parent)), e.projection.setOptions({
    layoutId: i,
    layout: s,
    alwaysMeasureLayout: !!o || a && Pn(a),
    visualElement: e,
    animationType: typeof s == "string" ? s : "both",
    initialPromotionConfig: r,
    layoutScroll: l,
    layoutRoot: c
  })
}

function dh(e) {
  if (e) return e.options.allowProjection !== !1 ? e.projection : dh(e.parent)
}

function jv({
  preloadedFeatures: e,
  createVisualElement: t,
  useRender: n,
  useVisualState: r,
  Component: i
}) {
  var s, o;
  e && dv(e);

  function a(c, d) {
    let f;
    const p = {
        ...C.useContext(Ol),
        ...c,
        layoutId: Nv(c)
      },
      {
        isStatic: v
      } = p,
      x = vv(c),
      y = r(c, v);
    if (!v && Fl) {
      Pv();
      const S = Tv(p);
      f = S.MeasureLayout, x.visualElement = kv(i, y, p, t, S.ProjectionNode)
    }
    return u.jsxs(_s.Provider, {
      value: x,
      children: [f && x.visualElement ? u.jsx(f, {
        visualElement: x.visualElement,
        ...p
      }) : null, n(i, c, yv(y, x.visualElement, d), y, v, x.visualElement)]
    })
  }
  a.displayName =
    `motion.${typeof i=="string"?i:`create(${(o=(s=i.displayName)!==null&&s!==void 0?s:i.name)!==null&&o!==void 0?o:""})`}`;
  const l = C.forwardRef(a);
  return l[xv] = i, l
}

function Nv({
  layoutId: e
}) {
  const t = C.useContext(Il).id;
  return t && e !== void 0 ? t + "-" + e : e
}

function Pv(e, t) {
  C.useContext(oh).strict
}

function Tv(e) {
  const {
    drag: t,
    layout: n
  } = Wn;
  if (!t && !n) return {};
  const r = {
    ...t,
    ...n
  };
  return {
    MeasureLayout: t != null && t.isEnabled(e) || n != null && n.isEnabled(e) ? r.MeasureLayout : void 0,
    ProjectionNode: r.ProjectionNode
  }
}
const Cv = ["animate", "circle", "defs", "desc", "ellipse", "g", "image", "line", "filter", "marker", "mask",
  "metadata", "path", "pattern", "polygon", "polyline", "rect", "stop", "switch", "symbol", "svg", "text", "tspan",
  "use", "view"
];

function Kl(e) {
  return typeof e != "string" || e.includes("-") ? !1 : !!(Cv.indexOf(e) > -1 || /[A-Z]/u.test(e))
}

function zc(e) {
  const t = [{}, {}];
  return e == null || e.values.forEach((n, r) => {
    t[0][r] = n.get(), t[1][r] = n.getVelocity()
  }), t
}

function Gl(e, t, n, r) {
  if (typeof t == "function") {
    const [i, s] = zc(r);
    t = t(n !== void 0 ? n : e.custom, i, s)
  }
  if (typeof t == "string" && (t = e.variants && e.variants[t]), typeof t == "function") {
    const [i, s] = zc(r);
    t = t(n !== void 0 ? n : e.custom, i, s)
  }
  return t
}
const Ca = e => Array.isArray(e),
  Ev = e => !!(e && typeof e == "object" && e.mix && e.toValue),
  bv = e => Ca(e) ? e[e.length - 1] || 0 : e,
  me = e => !!(e && e.getVelocity);

function Bi(e) {
  const t = me(e) ? e.get() : e;
  return Ev(t) ? t.toValue() : t
}

function zv({
  scrapeMotionValuesFromProps: e,
  createRenderState: t,
  onUpdate: n
}, r, i, s) {
  const o = {
    latestValues: Av(r, i, s, e),
    renderState: t()
  };
  return n && (o.onMount = a => n({
    props: r,
    current: a,
    ...o
  }), o.onUpdate = a => n(a)), o
}
const fh = e => (t, n) => {
  const r = C.useContext(_s),
    i = C.useContext(Is),
    s = () => zv(e, t, r, i);
  return n ? s() : _l(s)
};

function Av(e, t, n, r) {
  const i = {},
    s = r(e, {});
  for (const p in s) i[p] = Bi(s[p]);
  let {
    initial: o,
    animate: a
  } = e;
  const l = Fs(e),
    c = lh(e);
  t && c && !l && e.inherit !== !1 && (o === void 0 && (o = t.initial), a === void 0 && (a = t.animate));
  let d = n ? n.initial === !1 : !1;
  d = d || o === !1;
  const f = d ? a : o;
  if (f && typeof f != "boolean" && !Os(f)) {
    const p = Array.isArray(f) ? f : [f];
    for (let v = 0; v < p.length; v++) {
      const x = Gl(e, p[v]);
      if (x) {
        const {
          transitionEnd: y,
          transition: S,
          ...m
        } = x;
        for (const h in m) {
          let g = m[h];
          if (Array.isArray(g)) {
            const w = d ? g.length - 1 : 0;
            g = g[w]
          }
          g !== null && (i[h] = g)
        }
        for (const h in y) i[h] = y[h]
      }
    }
  }
  return i
}
const Yn = ["transformPerspective", "x", "y", "z", "translateX", "translateY", "translateZ", "scale", "scaleX",
    "scaleY", "rotate", "rotateX", "rotateY", "rotateZ", "skew", "skewX", "skewY"
  ],
  dn = new Set(Yn),
  ph = e => t => typeof t == "string" && t.startsWith(e),
  hh = ph("--"),
  Vv = ph("var(--"),
  Ql = e => Vv(e) ? Mv.test(e.split("/*")[0].trim()) : !1,
  Mv = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,
  mh = (e, t) => t && typeof e == "number" ? t.transform(e) : e,
  mt = (e, t, n) => n > t ? t : n < e ? e : n,
  Xn = {
    test: e => typeof e == "number",
    parse: parseFloat,
    transform: e => e
  },
  Hr = {
    ...Xn,
    transform: e => mt(0, 1, e)
  },
  Ti = {
    ...Xn,
    default: 1
  },
  ei = e => ({
    test: t => typeof t == "string" && t.endsWith(e) && t.split(" ").length === 1,
    parse: parseFloat,
    transform: t => `${t}${e}`
  }),
  yt = ei("deg"),
  tt = ei("%"),
  A = ei("px"),
  Rv = ei("vh"),
  Dv = ei("vw"),
  Ac = {
    ...tt,
    parse: e => tt.parse(e) / 100,
    transform: e => tt.transform(e * 100)
  },
  Lv = {
    borderWidth: A,
    borderTopWidth: A,
    borderRightWidth: A,
    borderBottomWidth: A,
    borderLeftWidth: A,
    borderRadius: A,
    radius: A,
    borderTopLeftRadius: A,
    borderTopRightRadius: A,
    borderBottomRightRadius: A,
    borderBottomLeftRadius: A,
    width: A,
    maxWidth: A,
    height: A,
    maxHeight: A,
    top: A,
    right: A,
    bottom: A,
    left: A,
    padding: A,
    paddingTop: A,
    paddingRight: A,
    paddingBottom: A,
    paddingLeft: A,
    margin: A,
    marginTop: A,
    marginRight: A,
    marginBottom: A,
    marginLeft: A,
    backgroundPositionX: A,
    backgroundPositionY: A
  },
  Iv = {
    rotate: yt,
    rotateX: yt,
    rotateY: yt,
    rotateZ: yt,
    scale: Ti,
    scaleX: Ti,
    scaleY: Ti,
    scaleZ: Ti,
    skew: yt,
    skewX: yt,
    skewY: yt,
    distance: A,
    translateX: A,
    translateY: A,
    translateZ: A,
    x: A,
    y: A,
    z: A,
    perspective: A,
    transformPerspective: A,
    opacity: Hr,
    originX: Ac,
    originY: Ac,
    originZ: A
  },
  Vc = {
    ...Xn,
    transform: Math.round
  },
  Yl = {
    ...Lv,
    ...Iv,
    zIndex: Vc,
    size: A,
    fillOpacity: Hr,
    strokeOpacity: Hr,
    numOctaves: Vc
  },
  _v = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective"
  },
  Ov = Yn.length;

function Fv(e, t, n) {
  let r = "",
    i = !0;
  for (let s = 0; s < Ov; s++) {
    const o = Yn[s],
      a = e[o];
    if (a === void 0) continue;
    let l = !0;
    if (typeof a == "number" ? l = a === (o.startsWith("scale") ? 1 : 0) : l = parseFloat(a) === 0, !l || n) {
      const c = mh(a, Yl[o]);
      if (!l) {
        i = !1;
        const d = _v[o] || o;
        r += `${d}(${c}) `
      }
      n && (t[o] = c)
    }
  }
  return r = r.trim(), n ? r = n(t, i ? "" : r) : i && (r = "none"), r
}

function Xl(e, t, n) {
  const {
    style: r,
    vars: i,
    transformOrigin: s
  } = e;
  let o = !1,
    a = !1;
  for (const l in t) {
    const c = t[l];
    if (dn.has(l)) {
      o = !0;
      continue
    } else if (hh(l)) {
      i[l] = c;
      continue
    } else {
      const d = mh(c, Yl[l]);
      l.startsWith("origin") ? (a = !0, s[l] = d) : r[l] = d
    }
  }
  if (t.transform || (o || n ? r.transform = Fv(t, e.transform, n) : r.transform && (r.transform = "none")), a) {
    const {
      originX: l = "50%",
      originY: c = "50%",
      originZ: d = 0
    } = s;
    r.transformOrigin = `${l} ${c} ${d}`
  }
}
const Bv = {
    offset: "stroke-dashoffset",
    array: "stroke-dasharray"
  },
  Uv = {
    offset: "strokeDashoffset",
    array: "strokeDasharray"
  };

function $v(e, t, n = 1, r = 0, i = !0) {
  e.pathLength = 1;
  const s = i ? Bv : Uv;
  e[s.offset] = A.transform(-r);
  const o = A.transform(t),
    a = A.transform(n);
  e[s.array] = `${o} ${a}`
}

function Mc(e, t, n) {
  return typeof e == "string" ? e : A.transform(t + n * e)
}

function Wv(e, t, n) {
  const r = Mc(t, e.x, e.width),
    i = Mc(n, e.y, e.height);
  return `${r} ${i}`
}

function Zl(e, {
  attrX: t,
  attrY: n,
  attrScale: r,
  originX: i,
  originY: s,
  pathLength: o,
  pathSpacing: a = 1,
  pathOffset: l = 0,
  ...c
}, d, f) {
  if (Xl(e, c, f), d) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
    return
  }
  e.attrs = e.style, e.style = {};
  const {
    attrs: p,
    style: v,
    dimensions: x
  } = e;
  p.transform && (x && (v.transform = p.transform), delete p.transform), x && (i !== void 0 || s !== void 0 || v
    .transform) && (v.transformOrigin = Wv(x, i !== void 0 ? i : .5, s !== void 0 ? s : .5)), t !== void 0 && (p.x =
    t), n !== void 0 && (p.y = n), r !== void 0 && (p.scale = r), o !== void 0 && $v(p, o, a, l, !1)
}
const ql = () => ({
    style: {},
    transform: {},
    transformOrigin: {},
    vars: {}
  }),
  gh = () => ({
    ...ql(),
    attrs: {}
  }),
  Jl = e => typeof e == "string" && e.toLowerCase() === "svg";

function vh(e, {
  style: t,
  vars: n
}, r, i) {
  Object.assign(e.style, t, i && i.getProjectionStyles(r));
  for (const s in n) e.style.setProperty(s, n[s])
}
const xh = new Set(["baseFrequency", "diffuseConstant", "kernelMatrix", "kernelUnitLength", "keySplines", "keyTimes",
  "limitingConeAngle", "markerHeight", "markerWidth", "numOctaves", "targetX", "targetY", "surfaceScale",
  "specularConstant", "specularExponent", "stdDeviation", "tableValues", "viewBox", "gradientTransform",
  "pathLength", "startOffset", "textLength", "lengthAdjust"
]);

function yh(e, t, n, r) {
  vh(e, t, void 0, r);
  for (const i in t.attrs) e.setAttribute(xh.has(i) ? i : Wl(i), t.attrs[i])
}
const ms = {};

function Hv(e) {
  Object.assign(ms, e)
}

function wh(e, {
  layout: t,
  layoutId: n
}) {
  return dn.has(e) || e.startsWith("origin") || (t || n !== void 0) && (!!ms[e] || e === "opacity")
}

function eu(e, t, n) {
  var r;
  const {
    style: i
  } = e, s = {};
  for (const o in i)(me(i[o]) || t.style && me(t.style[o]) || wh(o, e) || ((r = n == null ? void 0 : n.getValue(o)) ===
    null || r === void 0 ? void 0 : r.liveStyle) !== void 0) && (s[o] = i[o]);
  return s
}

function kh(e, t, n) {
  const r = eu(e, t, n);
  for (const i in e)
    if (me(e[i]) || me(t[i])) {
      const s = Yn.indexOf(i) !== -1 ? "attr" + i.charAt(0).toUpperCase() + i.substring(1) : i;
      r[s] = e[i]
    } return r
}

function Kv(e, t) {
  try {
    t.dimensions = typeof e.getBBox == "function" ? e.getBBox() : e.getBoundingClientRect()
  } catch {
    t.dimensions = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    }
  }
}
const Rc = ["x", "y", "width", "height", "cx", "cy", "r"],
  Gv = {
    useVisualState: fh({
      scrapeMotionValuesFromProps: kh,
      createRenderState: gh,
      onUpdate: ({
        props: e,
        prevProps: t,
        current: n,
        renderState: r,
        latestValues: i
      }) => {
        if (!n) return;
        let s = !!e.drag;
        if (!s) {
          for (const a in i)
            if (dn.has(a)) {
              s = !0;
              break
            }
        }
        if (!s) return;
        let o = !t;
        if (t)
          for (let a = 0; a < Rc.length; a++) {
            const l = Rc[a];
            e[l] !== t[l] && (o = !0)
          }
        o && U.read(() => {
          Kv(n, r), U.render(() => {
            Zl(r, i, Jl(n.tagName), e.transformTemplate), yh(n, r)
          })
        })
      }
    })
  },
  Qv = {
    useVisualState: fh({
      scrapeMotionValuesFromProps: eu,
      createRenderState: ql
    })
  };

function Sh(e, t, n) {
  for (const r in t) !me(t[r]) && !wh(r, n) && (e[r] = t[r])
}

function Yv({
  transformTemplate: e
}, t) {
  return C.useMemo(() => {
    const n = ql();
    return Xl(n, t, e), Object.assign({}, n.vars, n.style)
  }, [t])
}

function Xv(e, t) {
  const n = e.style || {},
    r = {};
  return Sh(r, n, e), Object.assign(r, Yv(e, t)), r
}

function Zv(e, t) {
  const n = {},
    r = Xv(e, t);
  return e.drag && e.dragListener !== !1 && (n.draggable = !1, r.userSelect = r.WebkitUserSelect = r
      .WebkitTouchCallout = "none", r.touchAction = e.drag === !0 ? "none" : `pan-${e.drag==="x"?"y":"x"}`), e
    .tabIndex === void 0 && (e.onTap || e.onTapStart || e.whileTap) && (n.tabIndex = 0), n.style = r, n
}

function qv(e, t, n, r) {
  const i = C.useMemo(() => {
    const s = gh();
    return Zl(s, t, Jl(r), e.transformTemplate), {
      ...s.attrs,
      style: {
        ...s.style
      }
    }
  }, [t]);
  if (e.style) {
    const s = {};
    Sh(s, e.style, e), i.style = {
      ...s,
      ...i.style
    }
  }
  return i
}

function Jv(e = !1) {
  return (n, r, i, {
    latestValues: s
  }, o) => {
    const l = (Kl(n) ? qv : Zv)(r, s, o, n),
      c = hv(r, typeof n == "string", e),
      d = n !== C.Fragment ? {
        ...c,
        ...l,
        ref: i
      } : {},
      {
        children: f
      } = r,
      p = C.useMemo(() => me(f) ? f.get() : f, [f]);
    return C.createElement(n, {
      ...d,
      children: p
    })
  }
}

function ex(e, t) {
  return function(r, {
    forwardMotionProps: i
  } = {
    forwardMotionProps: !1
  }) {
    const o = {
      ...Kl(r) ? Gv : Qv,
      preloadedFeatures: e,
      useRender: Jv(i),
      createVisualElement: t,
      Component: r
    };
    return jv(o)
  }
}

function jh(e, t) {
  if (!Array.isArray(t)) return !1;
  const n = t.length;
  if (n !== e.length) return !1;
  for (let r = 0; r < n; r++)
    if (t[r] !== e[r]) return !1;
  return !0
}

function Bs(e, t, n) {
  const r = e.getProps();
  return Gl(r, t, n !== void 0 ? n : r.custom, e)
}
const tx = Bl(() => window.ScrollTimeline !== void 0);
class nx {
  constructor(t) {
    this.stop = () => this.runAll("stop"), this.animations = t.filter(Boolean)
  }
  get finished() {
    return Promise.all(this.animations.map(t => "finished" in t ? t.finished : t))
  }
  getAll(t) {
    return this.animations[0][t]
  }
  setAll(t, n) {
    for (let r = 0; r < this.animations.length; r++) this.animations[r][t] = n
  }
  attachTimeline(t, n) {
    const r = this.animations.map(i => {
      if (tx() && i.attachTimeline) return i.attachTimeline(t);
      if (typeof n == "function") return n(i)
    });
    return () => {
      r.forEach((i, s) => {
        i && i(), this.animations[s].stop()
      })
    }
  }
  get time() {
    return this.getAll("time")
  }
  set time(t) {
    this.setAll("time", t)
  }
  get speed() {
    return this.getAll("speed")
  }
  set speed(t) {
    this.setAll("speed", t)
  }
  get startTime() {
    return this.getAll("startTime")
  }
  get duration() {
    let t = 0;
    for (let n = 0; n < this.animations.length; n++) t = Math.max(t, this.animations[n].duration);
    return t
  }
  runAll(t) {
    this.animations.forEach(n => n[t]())
  }
  flatten() {
    this.runAll("flatten")
  }
  play() {
    this.runAll("play")
  }
  pause() {
    this.runAll("pause")
  }
  cancel() {
    this.runAll("cancel")
  }
  complete() {
    this.runAll("complete")
  }
}
class rx extends nx {
  then(t, n) {
    return Promise.all(this.animations).then(t).catch(n)
  }
}

function tu(e, t) {
  return e ? e[t] || e.default || e : void 0
}
const Ea = 2e4;

function Nh(e) {
  let t = 0;
  const n = 50;
  let r = e.next(t);
  for (; !r.done && t < Ea;) t += n, r = e.next(t);
  return t >= Ea ? 1 / 0 : t
}

function nu(e) {
  return typeof e == "function"
}

function Dc(e, t) {
  e.timeline = t, e.onfinish = null
}
const ru = e => Array.isArray(e) && typeof e[0] == "number",
  ix = {
    linearEasing: void 0
  };

function sx(e, t) {
  const n = Bl(e);
  return () => {
    var r;
    return (r = ix[t]) !== null && r !== void 0 ? r : n()
  }
}
const gs = sx(() => {
    try {
      document.createElement("div").animate({
        opacity: 0
      }, {
        easing: "linear(0, 1)"
      })
    } catch {
      return !1
    }
    return !0
  }, "linearEasing"),
  Ph = (e, t, n = 10) => {
    let r = "";
    const i = Math.max(Math.round(t / n), 2);
    for (let s = 0; s < i; s++) r += e($n(0, i - 1, s)) + ", ";
    return `linear(${r.substring(0,r.length-2)})`
  };

function Th(e) {
  return !!(typeof e == "function" && gs() || !e || typeof e == "string" && (e in ba || gs()) || ru(e) || Array.isArray(
    e) && e.every(Th))
}
const dr = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`,
  ba = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: dr([0, .65, .55, 1]),
    circOut: dr([.55, 0, 1, .45]),
    backIn: dr([.31, .01, .66, -.59]),
    backOut: dr([.33, 1.53, .69, .99])
  };

function Ch(e, t) {
  if (e) return typeof e == "function" && gs() ? Ph(e, t) : ru(e) ? dr(e) : Array.isArray(e) ? e.map(n => Ch(n, t) || ba
    .easeOut) : ba[e]
}
const $e = {
  x: !1,
  y: !1
};

function Eh() {
  return $e.x || $e.y
}

function ox(e, t, n) {
  var r;
  if (e instanceof Element) return [e];
  if (typeof e == "string") {
    let i = document;
    const s = (r = void 0) !== null && r !== void 0 ? r : i.querySelectorAll(e);
    return s ? Array.from(s) : []
  }
  return Array.from(e)
}

function bh(e, t) {
  const n = ox(e),
    r = new AbortController,
    i = {
      passive: !0,
      ...t,
      signal: r.signal
    };
  return [n, i, () => r.abort()]
}

function Lc(e) {
  return t => {
    t.pointerType === "touch" || Eh() || e(t)
  }
}

function ax(e, t, n = {}) {
  const [r, i, s] = bh(e, n), o = Lc(a => {
    const {
      target: l
    } = a, c = t(a);
    if (typeof c != "function" || !l) return;
    const d = Lc(f => {
      c(f), l.removeEventListener("pointerleave", d)
    });
    l.addEventListener("pointerleave", d, i)
  });
  return r.forEach(a => {
    a.addEventListener("pointerenter", o, i)
  }), s
}
const zh = (e, t) => t ? e === t ? !0 : zh(e, t.parentElement) : !1,
  iu = e => e.pointerType === "mouse" ? typeof e.button != "number" || e.button <= 0 : e.isPrimary !== !1,
  lx = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]);

function ux(e) {
  return lx.has(e.tagName) || e.tabIndex !== -1
}
const fr = new WeakSet;

function Ic(e) {
  return t => {
    t.key === "Enter" && e(t)
  }
}

function xo(e, t) {
  e.dispatchEvent(new PointerEvent("pointer" + t, {
    isPrimary: !0,
    bubbles: !0
  }))
}
const cx = (e, t) => {
  const n = e.currentTarget;
  if (!n) return;
  const r = Ic(() => {
    if (fr.has(n)) return;
    xo(n, "down");
    const i = Ic(() => {
        xo(n, "up")
      }),
      s = () => xo(n, "cancel");
    n.addEventListener("keyup", i, t), n.addEventListener("blur", s, t)
  });
  n.addEventListener("keydown", r, t), n.addEventListener("blur", () => n.removeEventListener("keydown", r), t)
};

function _c(e) {
  return iu(e) && !Eh()
}

function dx(e, t, n = {}) {
  const [r, i, s] = bh(e, n), o = a => {
    const l = a.currentTarget;
    if (!_c(a) || fr.has(l)) return;
    fr.add(l);
    const c = t(a),
      d = (v, x) => {
        window.removeEventListener("pointerup", f), window.removeEventListener("pointercancel", p), !(!_c(v) || !fr
          .has(l)) && (fr.delete(l), typeof c == "function" && c(v, {
          success: x
        }))
      },
      f = v => {
        d(v, n.useGlobalTarget || zh(l, v.target))
      },
      p = v => {
        d(v, !1)
      };
    window.addEventListener("pointerup", f, i), window.addEventListener("pointercancel", p, i)
  };
  return r.forEach(a => {
    !ux(a) && a.getAttribute("tabindex") === null && (a.tabIndex = 0), (n.useGlobalTarget ? window : a)
      .addEventListener("pointerdown", o, i), a.addEventListener("focus", c => cx(c, i), i)
  }), s
}

function fx(e) {
  return e === "x" || e === "y" ? $e[e] ? null : ($e[e] = !0, () => {
    $e[e] = !1
  }) : $e.x || $e.y ? null : ($e.x = $e.y = !0, () => {
    $e.x = $e.y = !1
  })
}
const Ah = new Set(["width", "height", "top", "left", "right", "bottom", ...Yn]);
let Ui;

function px() {
  Ui = void 0
}
const nt = {
  now: () => (Ui === void 0 && nt.set(le.isProcessing || lv.useManualTiming ? le.timestamp : performance.now()), Ui),
  set: e => {
    Ui = e, queueMicrotask(px)
  }
};

function su(e, t) {
  e.indexOf(t) === -1 && e.push(t)
}

function ou(e, t) {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1)
}
class au {
  constructor() {
    this.subscriptions = []
  }
  add(t) {
    return su(this.subscriptions, t), () => ou(this.subscriptions, t)
  }
  notify(t, n, r) {
    const i = this.subscriptions.length;
    if (i)
      if (i === 1) this.subscriptions[0](t, n, r);
      else
        for (let s = 0; s < i; s++) {
          const o = this.subscriptions[s];
          o && o(t, n, r)
        }
  }
  getSize() {
    return this.subscriptions.length
  }
  clear() {
    this.subscriptions.length = 0
  }
}

function Vh(e, t) {
  return t ? e * (1e3 / t) : 0
}
const Oc = 30,
  hx = e => !isNaN(parseFloat(e));
class mx {
  constructor(t, n = {}) {
    this.version = "11.18.2", this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (r, i = !0) => {
      const s = nt.now();
      this.updatedAt !== s && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(r), this
        .current !== this.prev && this.events.change && this.events.change.notify(this.current), i && this.events
        .renderRequest && this.events.renderRequest.notify(this.current)
    }, this.hasAnimated = !1, this.setCurrent(t), this.owner = n.owner
  }
  setCurrent(t) {
    this.current = t, this.updatedAt = nt.now(), this.canTrackVelocity === null && t !== void 0 && (this
      .canTrackVelocity = hx(this.current))
  }
  setPrevFrameValue(t = this.current) {
    this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt
  }
  onChange(t) {
    return this.on("change", t)
  }
  on(t, n) {
    this.events[t] || (this.events[t] = new au);
    const r = this.events[t].add(n);
    return t === "change" ? () => {
      r(), U.read(() => {
        this.events.change.getSize() || this.stop()
      })
    } : r
  }
  clearListeners() {
    for (const t in this.events) this.events[t].clear()
  }
  attach(t, n) {
    this.passiveEffect = t, this.stopPassiveEffect = n
  }
  set(t, n = !0) {
    !n || !this.passiveEffect ? this.updateAndNotify(t, n) : this.passiveEffect(t, this.updateAndNotify)
  }
  setWithVelocity(t, n, r) {
    this.set(n), this.prev = void 0, this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt - r
  }
  jump(t, n = !0) {
    this.updateAndNotify(t), this.prev = t, this.prevUpdatedAt = this.prevFrameValue = void 0, n && this.stop(), this
      .stopPassiveEffect && this.stopPassiveEffect()
  }
  get() {
    return this.current
  }
  getPrevious() {
    return this.prev
  }
  getVelocity() {
    const t = nt.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || t - this.updatedAt > Oc) return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, Oc);
    return Vh(parseFloat(this.current) - parseFloat(this.prevFrameValue), n)
  }
  start(t) {
    return this.stop(), new Promise(n => {
      this.hasAnimated = !0, this.animation = t(n), this.events.animationStart && this.events.animationStart
        .notify()
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation()
    })
  }
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()),
      this.clearAnimation()
  }
  isAnimating() {
    return !!this.animation
  }
  clearAnimation() {
    delete this.animation
  }
  destroy() {
    this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect()
  }
}

function Kr(e, t) {
  return new mx(e, t)
}

function gx(e, t, n) {
  e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, Kr(n))
}

function vx(e, t) {
  const n = Bs(e, t);
  let {
    transitionEnd: r = {},
    transition: i = {},
    ...s
  } = n || {};
  s = {
    ...s,
    ...r
  };
  for (const o in s) {
    const a = bv(s[o]);
    gx(e, o, a)
  }
}

function xx(e) {
  return !!(me(e) && e.add)
}

function za(e, t) {
  const n = e.getValue("willChange");
  if (xx(n)) return n.add(t)
}

function Mh(e) {
  return e.props[uh]
}
const Rh = (e, t, n) => (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e,
  yx = 1e-7,
  wx = 12;

function kx(e, t, n, r, i) {
  let s, o, a = 0;
  do o = t + (n - t) / 2, s = Rh(o, r, i) - e, s > 0 ? n = o : t = o; while (Math.abs(s) > yx && ++a < wx);
  return o
}

function ti(e, t, n, r) {
  if (e === t && n === r) return be;
  const i = s => kx(s, 0, 1, e, n);
  return s => s === 0 || s === 1 ? s : Rh(i(s), t, r)
}
const Dh = e => t => t <= .5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2,
  Lh = e => t => 1 - e(1 - t),
  Ih = ti(.33, 1.53, .69, .99),
  lu = Lh(Ih),
  _h = Dh(lu),
  Oh = e => (e *= 2) < 1 ? .5 * lu(e) : .5 * (2 - Math.pow(2, -10 * (e - 1))),
  uu = e => 1 - Math.sin(Math.acos(e)),
  Fh = Lh(uu),
  Bh = Dh(uu),
  Uh = e => /^0[^.\s]+$/u.test(e);

function Sx(e) {
  return typeof e == "number" ? e === 0 : e !== null ? e === "none" || e === "0" || Uh(e) : !0
}
const jr = e => Math.round(e * 1e5) / 1e5,
  cu = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;

function jx(e) {
  return e == null
}
const Nx =
  /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
  du = (e, t) => n => !!(typeof n == "string" && Nx.test(n) && n.startsWith(e) || t && !jx(n) && Object.prototype
    .hasOwnProperty.call(n, t)),
  $h = (e, t, n) => r => {
    if (typeof r != "string") return r;
    const [i, s, o, a] = r.match(cu);
    return {
      [e]: parseFloat(i),
      [t]: parseFloat(s),
      [n]: parseFloat(o),
      alpha: a !== void 0 ? parseFloat(a) : 1
    }
  },
  Px = e => mt(0, 255, e),
  yo = {
    ...Xn,
    transform: e => Math.round(Px(e))
  },
  Jt = {
    test: du("rgb", "red"),
    parse: $h("red", "green", "blue"),
    transform: ({
        red: e,
        green: t,
        blue: n,
        alpha: r = 1
      }) => "rgba(" + yo.transform(e) + ", " + yo.transform(t) + ", " + yo.transform(n) + ", " + jr(Hr.transform(r)) +
      ")"
  };

function Tx(e) {
  let t = "",
    n = "",
    r = "",
    i = "";
  return e.length > 5 ? (t = e.substring(1, 3), n = e.substring(3, 5), r = e.substring(5, 7), i = e.substring(7, 9)) : (
    t = e.substring(1, 2), n = e.substring(2, 3), r = e.substring(3, 4), i = e.substring(4, 5), t += t, n += n, r +=
    r, i += i), {
    red: parseInt(t, 16),
    green: parseInt(n, 16),
    blue: parseInt(r, 16),
    alpha: i ? parseInt(i, 16) / 255 : 1
  }
}
const Aa = {
    test: du("#"),
    parse: Tx,
    transform: Jt.transform
  },
  Tn = {
    test: du("hsl", "hue"),
    parse: $h("hue", "saturation", "lightness"),
    transform: ({
      hue: e,
      saturation: t,
      lightness: n,
      alpha: r = 1
    }) => "hsla(" + Math.round(e) + ", " + tt.transform(jr(t)) + ", " + tt.transform(jr(n)) + ", " + jr(Hr.transform(
      r)) + ")"
  },
  pe = {
    test: e => Jt.test(e) || Aa.test(e) || Tn.test(e),
    parse: e => Jt.test(e) ? Jt.parse(e) : Tn.test(e) ? Tn.parse(e) : Aa.parse(e),
    transform: e => typeof e == "string" ? e : e.hasOwnProperty("red") ? Jt.transform(e) : Tn.transform(e)
  },
  Cx =
  /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;

function Ex(e) {
  var t, n;
  return isNaN(e) && typeof e == "string" && (((t = e.match(cu)) === null || t === void 0 ? void 0 : t.length) || 0) + (
    ((n = e.match(Cx)) === null || n === void 0 ? void 0 : n.length) || 0) > 0
}
const Wh = "number",
  Hh = "color",
  bx = "var",
  zx = "var(",
  Fc = "${}",
  Ax =
  /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;

function Gr(e) {
  const t = e.toString(),
    n = [],
    r = {
      color: [],
      number: [],
      var: []
    },
    i = [];
  let s = 0;
  const a = t.replace(Ax, l => (pe.test(l) ? (r.color.push(s), i.push(Hh), n.push(pe.parse(l))) : l.startsWith(zx) ? (r
    .var.push(s), i.push(bx), n.push(l)) : (r.number.push(s), i.push(Wh), n.push(parseFloat(l))), ++s, Fc)).split(Fc);
  return {
    values: n,
    split: a,
    indexes: r,
    types: i
  }
}

function Kh(e) {
  return Gr(e).values
}

function Gh(e) {
  const {
    split: t,
    types: n
  } = Gr(e), r = t.length;
  return i => {
    let s = "";
    for (let o = 0; o < r; o++)
      if (s += t[o], i[o] !== void 0) {
        const a = n[o];
        a === Wh ? s += jr(i[o]) : a === Hh ? s += pe.transform(i[o]) : s += i[o]
      } return s
  }
}
const Vx = e => typeof e == "number" ? 0 : e;

function Mx(e) {
  const t = Kh(e);
  return Gh(e)(t.map(Vx))
}
const It = {
    test: Ex,
    parse: Kh,
    createTransformer: Gh,
    getAnimatableNone: Mx
  },
  Rx = new Set(["brightness", "contrast", "saturate", "opacity"]);

function Dx(e) {
  const [t, n] = e.slice(0, -1).split("(");
  if (t === "drop-shadow") return e;
  const [r] = n.match(cu) || [];
  if (!r) return e;
  const i = n.replace(r, "");
  let s = Rx.has(t) ? 1 : 0;
  return r !== n && (s *= 100), t + "(" + s + i + ")"
}
const Lx = /\b([a-z-]*)\(.*?\)/gu,
  Va = {
    ...It,
    getAnimatableNone: e => {
      const t = e.match(Lx);
      return t ? t.map(Dx).join(" ") : e
    }
  },
  Ix = {
    ...Yl,
    color: pe,
    backgroundColor: pe,
    outlineColor: pe,
    fill: pe,
    stroke: pe,
    borderColor: pe,
    borderTopColor: pe,
    borderRightColor: pe,
    borderBottomColor: pe,
    borderLeftColor: pe,
    filter: Va,
    WebkitFilter: Va
  },
  fu = e => Ix[e];

function Qh(e, t) {
  let n = fu(e);
  return n !== Va && (n = It), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0
}
const _x = new Set(["auto", "none", "0"]);

function Ox(e, t, n) {
  let r = 0,
    i;
  for (; r < e.length && !i;) {
    const s = e[r];
    typeof s == "string" && !_x.has(s) && Gr(s).values.length && (i = e[r]), r++
  }
  if (i && n)
    for (const s of t) e[s] = Qh(n, i)
}
const Bc = e => e === Xn || e === A,
  Uc = (e, t) => parseFloat(e.split(", ")[t]),
  $c = (e, t) => (n, {
    transform: r
  }) => {
    if (r === "none" || !r) return 0;
    const i = r.match(/^matrix3d\((.+)\)$/u);
    if (i) return Uc(i[1], t);
    {
      const s = r.match(/^matrix\((.+)\)$/u);
      return s ? Uc(s[1], e) : 0
    }
  },
  Fx = new Set(["x", "y", "z"]),
  Bx = Yn.filter(e => !Fx.has(e));

function Ux(e) {
  const t = [];
  return Bx.forEach(n => {
    const r = e.getValue(n);
    r !== void 0 && (t.push([n, r.get()]), r.set(n.startsWith("scale") ? 1 : 0))
  }), t
}
const Hn = {
  width: ({
    x: e
  }, {
    paddingLeft: t = "0",
    paddingRight: n = "0"
  }) => e.max - e.min - parseFloat(t) - parseFloat(n),
  height: ({
    y: e
  }, {
    paddingTop: t = "0",
    paddingBottom: n = "0"
  }) => e.max - e.min - parseFloat(t) - parseFloat(n),
  top: (e, {
    top: t
  }) => parseFloat(t),
  left: (e, {
    left: t
  }) => parseFloat(t),
  bottom: ({
    y: e
  }, {
    top: t
  }) => parseFloat(t) + (e.max - e.min),
  right: ({
    x: e
  }, {
    left: t
  }) => parseFloat(t) + (e.max - e.min),
  x: $c(4, 13),
  y: $c(5, 14)
};
Hn.translateX = Hn.x;
Hn.translateY = Hn.y;
const nn = new Set;
let Ma = !1,
  Ra = !1;

function Yh() {
  if (Ra) {
    const e = Array.from(nn).filter(r => r.needsMeasurement),
      t = new Set(e.map(r => r.element)),
      n = new Map;
    t.forEach(r => {
      const i = Ux(r);
      i.length && (n.set(r, i), r.render())
    }), e.forEach(r => r.measureInitialState()), t.forEach(r => {
      r.render();
      const i = n.get(r);
      i && i.forEach(([s, o]) => {
        var a;
        (a = r.getValue(s)) === null || a === void 0 || a.set(o)
      })
    }), e.forEach(r => r.measureEndState()), e.forEach(r => {
      r.suspendedScrollY !== void 0 && window.scrollTo(0, r.suspendedScrollY)
    })
  }
  Ra = !1, Ma = !1, nn.forEach(e => e.complete()), nn.clear()
}

function Xh() {
  nn.forEach(e => {
    e.readKeyframes(), e.needsMeasurement && (Ra = !0)
  })
}

function $x() {
  Xh(), Yh()
}
class pu {
  constructor(t, n, r, i, s, o = !1) {
    this.isComplete = !1, this.isAsync = !1, this.needsMeasurement = !1, this.isScheduled = !1, this
      .unresolvedKeyframes = [...t], this.onComplete = n, this.name = r, this.motionValue = i, this.element = s, this
      .isAsync = o
  }
  scheduleResolve() {
    this.isScheduled = !0, this.isAsync ? (nn.add(this), Ma || (Ma = !0, U.read(Xh), U.resolveKeyframes(Yh))) : (this
      .readKeyframes(), this.complete())
  }
  readKeyframes() {
    const {
      unresolvedKeyframes: t,
      name: n,
      element: r,
      motionValue: i
    } = this;
    for (let s = 0; s < t.length; s++)
      if (t[s] === null)
        if (s === 0) {
          const o = i == null ? void 0 : i.get(),
            a = t[t.length - 1];
          if (o !== void 0) t[0] = o;
          else if (r && n) {
            const l = r.readValue(n, a);
            l != null && (t[0] = l)
          }
          t[0] === void 0 && (t[0] = a), i && o === void 0 && i.set(t[0])
        } else t[s] = t[s - 1]
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete() {
    this.isComplete = !0, this.onComplete(this.unresolvedKeyframes, this.finalKeyframe), nn.delete(this)
  }
  cancel() {
    this.isComplete || (this.isScheduled = !1, nn.delete(this))
  }
  resume() {
    this.isComplete || this.scheduleResolve()
  }
}
const Zh = e => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e),
  Wx = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;

function Hx(e) {
  const t = Wx.exec(e);
  if (!t) return [, ];
  const [, n, r, i] = t;
  return [`--${n??r}`, i]
}

function qh(e, t, n = 1) {
  const [r, i] = Hx(e);
  if (!r) return;
  const s = window.getComputedStyle(t).getPropertyValue(r);
  if (s) {
    const o = s.trim();
    return Zh(o) ? parseFloat(o) : o
  }
  return Ql(i) ? qh(i, t, n + 1) : i
}
const Jh = e => t => t.test(e),
  Kx = {
    test: e => e === "auto",
    parse: e => e
  },
  em = [Xn, A, tt, yt, Dv, Rv, Kx],
  Wc = e => em.find(Jh(e));
class tm extends pu {
  constructor(t, n, r, i, s) {
    super(t, n, r, i, s, !0)
  }
  readKeyframes() {
    const {
      unresolvedKeyframes: t,
      element: n,
      name: r
    } = this;
    if (!n || !n.current) return;
    super.readKeyframes();
    for (let l = 0; l < t.length; l++) {
      let c = t[l];
      if (typeof c == "string" && (c = c.trim(), Ql(c))) {
        const d = qh(c, n.current);
        d !== void 0 && (t[l] = d), l === t.length - 1 && (this.finalKeyframe = c)
      }
    }
    if (this.resolveNoneKeyframes(), !Ah.has(r) || t.length !== 2) return;
    const [i, s] = t, o = Wc(i), a = Wc(s);
    if (o !== a)
      if (Bc(o) && Bc(a))
        for (let l = 0; l < t.length; l++) {
          const c = t[l];
          typeof c == "string" && (t[l] = parseFloat(c))
        } else this.needsMeasurement = !0
  }
  resolveNoneKeyframes() {
    const {
      unresolvedKeyframes: t,
      name: n
    } = this, r = [];
    for (let i = 0; i < t.length; i++) Sx(t[i]) && r.push(i);
    r.length && Ox(t, r, n)
  }
  measureInitialState() {
    const {
      element: t,
      unresolvedKeyframes: n,
      name: r
    } = this;
    if (!t || !t.current) return;
    r === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = Hn[r](t
    .measureViewportBox(), window.getComputedStyle(t.current)), n[0] = this.measuredOrigin;
    const i = n[n.length - 1];
    i !== void 0 && t.getValue(r, i).jump(i, !1)
  }
  measureEndState() {
    var t;
    const {
      element: n,
      name: r,
      unresolvedKeyframes: i
    } = this;
    if (!n || !n.current) return;
    const s = n.getValue(r);
    s && s.jump(this.measuredOrigin, !1);
    const o = i.length - 1,
      a = i[o];
    i[o] = Hn[r](n.measureViewportBox(), window.getComputedStyle(n.current)), a !== null && this.finalKeyframe ===
      void 0 && (this.finalKeyframe = a), !((t = this.removedTransforms) === null || t === void 0) && t.length && this
      .removedTransforms.forEach(([l, c]) => {
        n.getValue(l).set(c)
      }), this.resolveNoneKeyframes()
  }
}
const Hc = (e, t) => t === "zIndex" ? !1 : !!(typeof e == "number" || Array.isArray(e) || typeof e == "string" && (It
  .test(e) || e === "0") && !e.startsWith("url("));

function Gx(e) {
  const t = e[0];
  if (e.length === 1) return !0;
  for (let n = 0; n < e.length; n++)
    if (e[n] !== t) return !0
}

function Qx(e, t, n, r) {
  const i = e[0];
  if (i === null) return !1;
  if (t === "display" || t === "visibility") return !0;
  const s = e[e.length - 1],
    o = Hc(i, t),
    a = Hc(s, t);
  return !o || !a ? !1 : Gx(e) || (n === "spring" || nu(n)) && r
}
const Yx = e => e !== null;

function Us(e, {
  repeat: t,
  repeatType: n = "loop"
}, r) {
  const i = e.filter(Yx),
    s = t && n !== "loop" && t % 2 === 1 ? 0 : i.length - 1;
  return !s || r === void 0 ? i[s] : r
}
const Xx = 40;
class nm {
  constructor({
    autoplay: t = !0,
    delay: n = 0,
    type: r = "keyframes",
    repeat: i = 0,
    repeatDelay: s = 0,
    repeatType: o = "loop",
    ...a
  }) {
    this.isStopped = !1, this.hasAttemptedResolve = !1, this.createdAt = nt.now(), this.options = {
      autoplay: t,
      delay: n,
      type: r,
      repeat: i,
      repeatDelay: s,
      repeatType: o,
      ...a
    }, this.updateFinishedPromise()
  }
  calcStartTime() {
    return this.resolvedAt ? this.resolvedAt - this.createdAt > Xx ? this.resolvedAt : this.createdAt : this.createdAt
  }
  get resolved() {
    return !this._resolved && !this.hasAttemptedResolve && $x(), this._resolved
  }
  onKeyframesResolved(t, n) {
    this.resolvedAt = nt.now(), this.hasAttemptedResolve = !0;
    const {
      name: r,
      type: i,
      velocity: s,
      delay: o,
      onComplete: a,
      onUpdate: l,
      isGenerator: c
    } = this.options;
    if (!c && !Qx(t, r, i, s))
      if (o) this.options.duration = 0;
      else {
        l && l(Us(t, this.options, n)), a && a(), this.resolveFinishedPromise();
        return
      } const d = this.initPlayback(t, n);
    d !== !1 && (this._resolved = {
      keyframes: t,
      finalKeyframe: n,
      ...d
    }, this.onPostResolved())
  }
  onPostResolved() {}
  then(t, n) {
    return this.currentFinishedPromise.then(t, n)
  }
  flatten() {
    this.options.type = "keyframes", this.options.ease = "linear"
  }
  updateFinishedPromise() {
    this.currentFinishedPromise = new Promise(t => {
      this.resolveFinishedPromise = t
    })
  }
}
const H = (e, t, n) => e + (t - e) * n;

function wo(e, t, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t -
    e) * (2 / 3 - n) * 6 : e
}

function Zx({
  hue: e,
  saturation: t,
  lightness: n,
  alpha: r
}) {
  e /= 360, t /= 100, n /= 100;
  let i = 0,
    s = 0,
    o = 0;
  if (!t) i = s = o = n;
  else {
    const a = n < .5 ? n * (1 + t) : n + t - n * t,
      l = 2 * n - a;
    i = wo(l, a, e + 1 / 3), s = wo(l, a, e), o = wo(l, a, e - 1 / 3)
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(s * 255),
    blue: Math.round(o * 255),
    alpha: r
  }
}

function vs(e, t) {
  return n => n > 0 ? t : e
}
const ko = (e, t, n) => {
    const r = e * e,
      i = n * (t * t - r) + r;
    return i < 0 ? 0 : Math.sqrt(i)
  },
  qx = [Aa, Jt, Tn],
  Jx = e => qx.find(t => t.test(e));

function Kc(e) {
  const t = Jx(e);
  if (!t) return !1;
  let n = t.parse(e);
  return t === Tn && (n = Zx(n)), n
}
const Gc = (e, t) => {
    const n = Kc(e),
      r = Kc(t);
    if (!n || !r) return vs(e, t);
    const i = {
      ...n
    };
    return s => (i.red = ko(n.red, r.red, s), i.green = ko(n.green, r.green, s), i.blue = ko(n.blue, r.blue, s), i
      .alpha = H(n.alpha, r.alpha, s), Jt.transform(i))
  },
  ey = (e, t) => n => t(e(n)),
  ni = (...e) => e.reduce(ey),
  Da = new Set(["none", "hidden"]);

function ty(e, t) {
  return Da.has(e) ? n => n <= 0 ? e : t : n => n >= 1 ? t : e
}

function ny(e, t) {
  return n => H(e, t, n)
}

function hu(e) {
  return typeof e == "number" ? ny : typeof e == "string" ? Ql(e) ? vs : pe.test(e) ? Gc : sy : Array.isArray(e) ? rm :
    typeof e == "object" ? pe.test(e) ? Gc : ry : vs
}

function rm(e, t) {
  const n = [...e],
    r = n.length,
    i = e.map((s, o) => hu(s)(s, t[o]));
  return s => {
    for (let o = 0; o < r; o++) n[o] = i[o](s);
    return n
  }
}

function ry(e, t) {
  const n = {
      ...e,
      ...t
    },
    r = {};
  for (const i in n) e[i] !== void 0 && t[i] !== void 0 && (r[i] = hu(e[i])(e[i], t[i]));
  return i => {
    for (const s in r) n[s] = r[s](i);
    return n
  }
}

function iy(e, t) {
  var n;
  const r = [],
    i = {
      color: 0,
      var: 0,
      number: 0
    };
  for (let s = 0; s < t.values.length; s++) {
    const o = t.types[s],
      a = e.indexes[o][i[o]],
      l = (n = e.values[a]) !== null && n !== void 0 ? n : 0;
    r[s] = l, i[o]++
  }
  return r
}
const sy = (e, t) => {
  const n = It.createTransformer(t),
    r = Gr(e),
    i = Gr(t);
  return r.indexes.var.length === i.indexes.var.length && r.indexes.color.length === i.indexes.color.length && r
    .indexes.number.length >= i.indexes.number.length ? Da.has(e) && !i.values.length || Da.has(t) && !r.values
    .length ? ty(e, t) : ni(rm(iy(r, i), i.values), n) : vs(e, t)
};

function im(e, t, n) {
  return typeof e == "number" && typeof t == "number" && typeof n == "number" ? H(e, t, n) : hu(e)(e, t)
}
const oy = 5;

function sm(e, t, n) {
  const r = Math.max(t - oy, 0);
  return Vh(n - e(r), t - r)
}
const Q = {
    stiffness: 100,
    damping: 10,
    mass: 1,
    velocity: 0,
    duration: 800,
    bounce: .3,
    visualDuration: .3,
    restSpeed: {
      granular: .01,
      default: 2
    },
    restDelta: {
      granular: .005,
      default: .5
    },
    minDuration: .01,
    maxDuration: 10,
    minDamping: .05,
    maxDamping: 1
  },
  So = .001;

function ay({
  duration: e = Q.duration,
  bounce: t = Q.bounce,
  velocity: n = Q.velocity,
  mass: r = Q.mass
}) {
  let i, s, o = 1 - t;
  o = mt(Q.minDamping, Q.maxDamping, o), e = mt(Q.minDuration, Q.maxDuration, ct(e)), o < 1 ? (i = c => {
    const d = c * o,
      f = d * e,
      p = d - n,
      v = La(c, o),
      x = Math.exp(-f);
    return So - p / v * x
  }, s = c => {
    const f = c * o * e,
      p = f * n + n,
      v = Math.pow(o, 2) * Math.pow(c, 2) * e,
      x = Math.exp(-f),
      y = La(Math.pow(c, 2), o);
    return (-i(c) + So > 0 ? -1 : 1) * ((p - v) * x) / y
  }) : (i = c => {
    const d = Math.exp(-c * e),
      f = (c - n) * e + 1;
    return -So + d * f
  }, s = c => {
    const d = Math.exp(-c * e),
      f = (n - c) * (e * e);
    return d * f
  });
  const a = 5 / e,
    l = uy(i, s, a);
  if (e = ut(e), isNaN(l)) return {
    stiffness: Q.stiffness,
    damping: Q.damping,
    duration: e
  };
  {
    const c = Math.pow(l, 2) * r;
    return {
      stiffness: c,
      damping: o * 2 * Math.sqrt(r * c),
      duration: e
    }
  }
}
const ly = 12;

function uy(e, t, n) {
  let r = n;
  for (let i = 1; i < ly; i++) r = r - e(r) / t(r);
  return r
}

function La(e, t) {
  return e * Math.sqrt(1 - t * t)
}
const cy = ["duration", "bounce"],
  dy = ["stiffness", "damping", "mass"];

function Qc(e, t) {
  return t.some(n => e[n] !== void 0)
}

function fy(e) {
  let t = {
    velocity: Q.velocity,
    stiffness: Q.stiffness,
    damping: Q.damping,
    mass: Q.mass,
    isResolvedFromDuration: !1,
    ...e
  };
  if (!Qc(e, dy) && Qc(e, cy))
    if (e.visualDuration) {
      const n = e.visualDuration,
        r = 2 * Math.PI / (n * 1.2),
        i = r * r,
        s = 2 * mt(.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(i);
      t = {
        ...t,
        mass: Q.mass,
        stiffness: i,
        damping: s
      }
    } else {
      const n = ay(e);
      t = {
        ...t,
        ...n,
        mass: Q.mass
      }, t.isResolvedFromDuration = !0
    } return t
}

function om(e = Q.visualDuration, t = Q.bounce) {
  const n = typeof e != "object" ? {
    visualDuration: e,
    keyframes: [0, 1],
    bounce: t
  } : e;
  let {
    restSpeed: r,
    restDelta: i
  } = n;
  const s = n.keyframes[0],
    o = n.keyframes[n.keyframes.length - 1],
    a = {
      done: !1,
      value: s
    },
    {
      stiffness: l,
      damping: c,
      mass: d,
      duration: f,
      velocity: p,
      isResolvedFromDuration: v
    } = fy({
      ...n,
      velocity: -ct(n.velocity || 0)
    }),
    x = p || 0,
    y = c / (2 * Math.sqrt(l * d)),
    S = o - s,
    m = ct(Math.sqrt(l / d)),
    h = Math.abs(S) < 5;
  r || (r = h ? Q.restSpeed.granular : Q.restSpeed.default), i || (i = h ? Q.restDelta.granular : Q.restDelta.default);
  let g;
  if (y < 1) {
    const k = La(m, y);
    g = P => {
      const T = Math.exp(-y * m * P);
      return o - T * ((x + y * m * S) / k * Math.sin(k * P) + S * Math.cos(k * P))
    }
  } else if (y === 1) g = k => o - Math.exp(-m * k) * (S + (x + m * S) * k);
  else {
    const k = m * Math.sqrt(y * y - 1);
    g = P => {
      const T = Math.exp(-y * m * P),
        j = Math.min(k * P, 300);
      return o - T * ((x + y * m * S) * Math.sinh(j) + k * S * Math.cosh(j)) / k
    }
  }
  const w = {
    calculatedDuration: v && f || null,
    next: k => {
      const P = g(k);
      if (v) a.done = k >= f;
      else {
        let T = 0;
        y < 1 && (T = k === 0 ? ut(x) : sm(g, k, P));
        const j = Math.abs(T) <= r,
          D = Math.abs(o - P) <= i;
        a.done = j && D
      }
      return a.value = a.done ? o : P, a
    },
    toString: () => {
      const k = Math.min(Nh(w), Ea),
        P = Ph(T => w.next(k * T).value, k, 30);
      return k + "ms " + P
    }
  };
  return w
}

function Yc({
  keyframes: e,
  velocity: t = 0,
  power: n = .8,
  timeConstant: r = 325,
  bounceDamping: i = 10,
  bounceStiffness: s = 500,
  modifyTarget: o,
  min: a,
  max: l,
  restDelta: c = .5,
  restSpeed: d
}) {
  const f = e[0],
    p = {
      done: !1,
      value: f
    },
    v = j => a !== void 0 && j < a || l !== void 0 && j > l,
    x = j => a === void 0 ? l : l === void 0 || Math.abs(a - j) < Math.abs(l - j) ? a : l;
  let y = n * t;
  const S = f + y,
    m = o === void 0 ? S : o(S);
  m !== S && (y = m - f);
  const h = j => -y * Math.exp(-j / r),
    g = j => m + h(j),
    w = j => {
      const D = h(j),
        V = g(j);
      p.done = Math.abs(D) <= c, p.value = p.done ? m : V
    };
  let k, P;
  const T = j => {
    v(p.value) && (k = j, P = om({
      keyframes: [p.value, x(p.value)],
      velocity: sm(g, j, p.value),
      damping: i,
      stiffness: s,
      restDelta: c,
      restSpeed: d
    }))
  };
  return T(0), {
    calculatedDuration: null,
    next: j => {
      let D = !1;
      return !P && k === void 0 && (D = !0, w(j), T(j)), k !== void 0 && j >= k ? P.next(j - k) : (!D && w(j), p)
    }
  }
}
const py = ti(.42, 0, 1, 1),
  hy = ti(0, 0, .58, 1),
  am = ti(.42, 0, .58, 1),
  my = e => Array.isArray(e) && typeof e[0] != "number",
  gy = {
    linear: be,
    easeIn: py,
    easeInOut: am,
    easeOut: hy,
    circIn: uu,
    circInOut: Bh,
    circOut: Fh,
    backIn: lu,
    backInOut: _h,
    backOut: Ih,
    anticipate: Oh
  },
  Xc = e => {
    if (ru(e)) {
      ih(e.length === 4);
      const [t, n, r, i] = e;
      return ti(t, n, r, i)
    } else if (typeof e == "string") return gy[e];
    return e
  };

function vy(e, t, n) {
  const r = [],
    i = n || im,
    s = e.length - 1;
  for (let o = 0; o < s; o++) {
    let a = i(e[o], e[o + 1]);
    if (t) {
      const l = Array.isArray(t) ? t[o] || be : t;
      a = ni(l, a)
    }
    r.push(a)
  }
  return r
}

function xy(e, t, {
  clamp: n = !0,
  ease: r,
  mixer: i
} = {}) {
  const s = e.length;
  if (ih(s === t.length), s === 1) return () => t[0];
  if (s === 2 && t[0] === t[1]) return () => t[1];
  const o = e[0] === e[1];
  e[0] > e[s - 1] && (e = [...e].reverse(), t = [...t].reverse());
  const a = vy(t, r, i),
    l = a.length,
    c = d => {
      if (o && d < e[0]) return t[0];
      let f = 0;
      if (l > 1)
        for (; f < e.length - 2 && !(d < e[f + 1]); f++);
      const p = $n(e[f], e[f + 1], d);
      return a[f](p)
    };
  return n ? d => c(mt(e[0], e[s - 1], d)) : c
}

function yy(e, t) {
  const n = e[e.length - 1];
  for (let r = 1; r <= t; r++) {
    const i = $n(0, t, r);
    e.push(H(n, 1, i))
  }
}

function wy(e) {
  const t = [0];
  return yy(t, e.length - 1), t
}

function ky(e, t) {
  return e.map(n => n * t)
}

function Sy(e, t) {
  return e.map(() => t || am).splice(0, e.length - 1)
}

function xs({
  duration: e = 300,
  keyframes: t,
  times: n,
  ease: r = "easeInOut"
}) {
  const i = my(r) ? r.map(Xc) : Xc(r),
    s = {
      done: !1,
      value: t[0]
    },
    o = ky(n && n.length === t.length ? n : wy(t), e),
    a = xy(o, t, {
      ease: Array.isArray(i) ? i : Sy(t, i)
    });
  return {
    calculatedDuration: e,
    next: l => (s.value = a(l), s.done = l >= e, s)
  }
}
const jy = e => {
    const t = ({
      timestamp: n
    }) => e(n);
    return {
      start: () => U.update(t, !0),
      stop: () => Lt(t),
      now: () => le.isProcessing ? le.timestamp : nt.now()
    }
  },
  Ny = {
    decay: Yc,
    inertia: Yc,
    tween: xs,
    keyframes: xs,
    spring: om
  },
  Py = e => e / 100;
class mu extends nm {
  constructor(t) {
    super(t), this.holdTime = null, this.cancelTime = null, this.currentTime = 0, this.playbackSpeed = 1, this
      .pendingPlayState = "running", this.startTime = null, this.state = "idle", this.stop = () => {
        if (this.resolver.cancel(), this.isStopped = !0, this.state === "idle") return;
        this.teardown();
        const {
          onStop: l
        } = this.options;
        l && l()
      };
    const {
      name: n,
      motionValue: r,
      element: i,
      keyframes: s
    } = this.options, o = (i == null ? void 0 : i.KeyframeResolver) || pu, a = (l, c) => this.onKeyframesResolved(l,
      c);
    this.resolver = new o(s, a, n, r, i), this.resolver.scheduleResolve()
  }
  flatten() {
    super.flatten(), this._resolved && Object.assign(this._resolved, this.initPlayback(this._resolved.keyframes))
  }
  initPlayback(t) {
    const {
      type: n = "keyframes",
      repeat: r = 0,
      repeatDelay: i = 0,
      repeatType: s,
      velocity: o = 0
    } = this.options, a = nu(n) ? n : Ny[n] || xs;
    let l, c;
    a !== xs && typeof t[0] != "number" && (l = ni(Py, im(t[0], t[1])), t = [0, 100]);
    const d = a({
      ...this.options,
      keyframes: t
    });
    s === "mirror" && (c = a({
      ...this.options,
      keyframes: [...t].reverse(),
      velocity: -o
    })), d.calculatedDuration === null && (d.calculatedDuration = Nh(d));
    const {
      calculatedDuration: f
    } = d, p = f + i, v = p * (r + 1) - i;
    return {
      generator: d,
      mirroredGenerator: c,
      mapPercentToKeyframes: l,
      calculatedDuration: f,
      resolvedDuration: p,
      totalDuration: v
    }
  }
  onPostResolved() {
    const {
      autoplay: t = !0
    } = this.options;
    this.play(), this.pendingPlayState === "paused" || !t ? this.pause() : this.state = this.pendingPlayState
  }
  tick(t, n = !1) {
    const {
      resolved: r
    } = this;
    if (!r) {
      const {
        keyframes: j
      } = this.options;
      return {
        done: !0,
        value: j[j.length - 1]
      }
    }
    const {
      finalKeyframe: i,
      generator: s,
      mirroredGenerator: o,
      mapPercentToKeyframes: a,
      keyframes: l,
      calculatedDuration: c,
      totalDuration: d,
      resolvedDuration: f
    } = r;
    if (this.startTime === null) return s.next(0);
    const {
      delay: p,
      repeat: v,
      repeatType: x,
      repeatDelay: y,
      onUpdate: S
    } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, t) : this.speed < 0 && (this.startTime = Math.min(t -
        d / this.speed, this.startTime)), n ? this.currentTime = t : this.holdTime !== null ? this.currentTime = this
      .holdTime : this.currentTime = Math.round(t - this.startTime) * this.speed;
    const m = this.currentTime - p * (this.speed >= 0 ? 1 : -1),
      h = this.speed >= 0 ? m < 0 : m > d;
    this.currentTime = Math.max(m, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = d);
    let g = this.currentTime,
      w = s;
    if (v) {
      const j = Math.min(this.currentTime, d) / f;
      let D = Math.floor(j),
        V = j % 1;
      !V && j >= 1 && (V = 1), V === 1 && D--, D = Math.min(D, v + 1), !!(D % 2) && (x === "reverse" ? (V = 1 - V,
        y && (V -= y / f)) : x === "mirror" && (w = o)), g = mt(0, 1, V) * f
    }
    const k = h ? {
      done: !1,
      value: l[0]
    } : w.next(g);
    a && (k.value = a(k.value));
    let {
      done: P
    } = k;
    !h && c !== null && (P = this.speed >= 0 ? this.currentTime >= d : this.currentTime <= 0);
    const T = this.holdTime === null && (this.state === "finished" || this.state === "running" && P);
    return T && i !== void 0 && (k.value = Us(l, this.options, i)), S && S(k.value), T && this.finish(), k
  }
  get duration() {
    const {
      resolved: t
    } = this;
    return t ? ct(t.calculatedDuration) : 0
  }
  get time() {
    return ct(this.currentTime)
  }
  set time(t) {
    t = ut(t), this.currentTime = t, this.holdTime !== null || this.speed === 0 ? this.holdTime = t : this.driver && (
      this.startTime = this.driver.now() - t / this.speed)
  }
  get speed() {
    return this.playbackSpeed
  }
  set speed(t) {
    const n = this.playbackSpeed !== t;
    this.playbackSpeed = t, n && (this.time = ct(this.currentTime))
  }
  play() {
    if (this.resolver.isScheduled || this.resolver.resume(), !this._resolved) {
      this.pendingPlayState = "running";
      return
    }
    if (this.isStopped) return;
    const {
      driver: t = jy,
      onPlay: n,
      startTime: r
    } = this.options;
    this.driver || (this.driver = t(s => this.tick(s))), n && n();
    const i = this.driver.now();
    this.holdTime !== null ? this.startTime = i - this.holdTime : this.startTime ? this.state === "finished" && (this
        .startTime = i) : this.startTime = r ?? this.calcStartTime(), this.state === "finished" && this
      .updateFinishedPromise(), this.cancelTime = this.startTime, this.holdTime = null, this.state = "running", this
      .driver.start()
  }
  pause() {
    var t;
    if (!this._resolved) {
      this.pendingPlayState = "paused";
      return
    }
    this.state = "paused", this.holdTime = (t = this.currentTime) !== null && t !== void 0 ? t : 0
  }
  complete() {
    this.state !== "running" && this.play(), this.pendingPlayState = this.state = "finished", this.holdTime = null
  }
  finish() {
    this.teardown(), this.state = "finished";
    const {
      onComplete: t
    } = this.options;
    t && t()
  }
  cancel() {
    this.cancelTime !== null && this.tick(this.cancelTime), this.teardown(), this.updateFinishedPromise()
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.resolveFinishedPromise(), this.updateFinishedPromise(), this
      .startTime = this.cancelTime = null, this.resolver.cancel()
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0)
  }
  sample(t) {
    return this.startTime = 0, this.tick(t, !0)
  }
}
const Ty = new Set(["opacity", "clipPath", "filter", "transform"]);

function Cy(e, t, n, {
  delay: r = 0,
  duration: i = 300,
  repeat: s = 0,
  repeatType: o = "loop",
  ease: a = "easeInOut",
  times: l
} = {}) {
  const c = {
    [t]: n
  };
  l && (c.offset = l);
  const d = Ch(a, i);
  return Array.isArray(d) && (c.easing = d), e.animate(c, {
    delay: r,
    duration: i,
    easing: Array.isArray(d) ? "linear" : d,
    fill: "both",
    iterations: s + 1,
    direction: o === "reverse" ? "alternate" : "normal"
  })
}
const Ey = Bl(() => Object.hasOwnProperty.call(Element.prototype, "animate")),
  ys = 10,
  by = 2e4;

function zy(e) {
  return nu(e.type) || e.type === "spring" || !Th(e.ease)
}

function Ay(e, t) {
  const n = new mu({
    ...t,
    keyframes: e,
    repeat: 0,
    delay: 0,
    isGenerator: !0
  });
  let r = {
    done: !1,
    value: e[0]
  };
  const i = [];
  let s = 0;
  for (; !r.done && s < by;) r = n.sample(s), i.push(r.value), s += ys;
  return {
    times: void 0,
    keyframes: i,
    duration: s - ys,
    ease: "linear"
  }
}
const lm = {
  anticipate: Oh,
  backInOut: _h,
  circInOut: Bh
};

function Vy(e) {
  return e in lm
}
class Zc extends nm {
  constructor(t) {
    super(t);
    const {
      name: n,
      motionValue: r,
      element: i,
      keyframes: s
    } = this.options;
    this.resolver = new tm(s, (o, a) => this.onKeyframesResolved(o, a), n, r, i), this.resolver.scheduleResolve()
  }
  initPlayback(t, n) {
    let {
      duration: r = 300,
      times: i,
      ease: s,
      type: o,
      motionValue: a,
      name: l,
      startTime: c
    } = this.options;
    if (!a.owner || !a.owner.current) return !1;
    if (typeof s == "string" && gs() && Vy(s) && (s = lm[s]), zy(this.options)) {
      const {
        onComplete: f,
        onUpdate: p,
        motionValue: v,
        element: x,
        ...y
      } = this.options, S = Ay(t, y);
      t = S.keyframes, t.length === 1 && (t[1] = t[0]), r = S.duration, i = S.times, s = S.ease, o = "keyframes"
    }
    const d = Cy(a.owner.current, l, t, {
      ...this.options,
      duration: r,
      times: i,
      ease: s
    });
    return d.startTime = c ?? this.calcStartTime(), this.pendingTimeline ? (Dc(d, this.pendingTimeline), this
      .pendingTimeline = void 0) : d.onfinish = () => {
      const {
        onComplete: f
      } = this.options;
      a.set(Us(t, this.options, n)), f && f(), this.cancel(), this.resolveFinishedPromise()
    }, {
      animation: d,
      duration: r,
      times: i,
      type: o,
      ease: s,
      keyframes: t
    }
  }
  get duration() {
    const {
      resolved: t
    } = this;
    if (!t) return 0;
    const {
      duration: n
    } = t;
    return ct(n)
  }
  get time() {
    const {
      resolved: t
    } = this;
    if (!t) return 0;
    const {
      animation: n
    } = t;
    return ct(n.currentTime || 0)
  }
  set time(t) {
    const {
      resolved: n
    } = this;
    if (!n) return;
    const {
      animation: r
    } = n;
    r.currentTime = ut(t)
  }
  get speed() {
    const {
      resolved: t
    } = this;
    if (!t) return 1;
    const {
      animation: n
    } = t;
    return n.playbackRate
  }
  set speed(t) {
    const {
      resolved: n
    } = this;
    if (!n) return;
    const {
      animation: r
    } = n;
    r.playbackRate = t
  }
  get state() {
    const {
      resolved: t
    } = this;
    if (!t) return "idle";
    const {
      animation: n
    } = t;
    return n.playState
  }
  get startTime() {
    const {
      resolved: t
    } = this;
    if (!t) return null;
    const {
      animation: n
    } = t;
    return n.startTime
  }
  attachTimeline(t) {
    if (!this._resolved) this.pendingTimeline = t;
    else {
      const {
        resolved: n
      } = this;
      if (!n) return be;
      const {
        animation: r
      } = n;
      Dc(r, t)
    }
    return be
  }
  play() {
    if (this.isStopped) return;
    const {
      resolved: t
    } = this;
    if (!t) return;
    const {
      animation: n
    } = t;
    n.playState === "finished" && this.updateFinishedPromise(), n.play()
  }
  pause() {
    const {
      resolved: t
    } = this;
    if (!t) return;
    const {
      animation: n
    } = t;
    n.pause()
  }
  stop() {
    if (this.resolver.cancel(), this.isStopped = !0, this.state === "idle") return;
    this.resolveFinishedPromise(), this.updateFinishedPromise();
    const {
      resolved: t
    } = this;
    if (!t) return;
    const {
      animation: n,
      keyframes: r,
      duration: i,
      type: s,
      ease: o,
      times: a
    } = t;
    if (n.playState === "idle" || n.playState === "finished") return;
    if (this.time) {
      const {
        motionValue: c,
        onUpdate: d,
        onComplete: f,
        element: p,
        ...v
      } = this.options, x = new mu({
        ...v,
        keyframes: r,
        duration: i,
        type: s,
        ease: o,
        times: a,
        isGenerator: !0
      }), y = ut(this.time);
      c.setWithVelocity(x.sample(y - ys).value, x.sample(y).value, ys)
    }
    const {
      onStop: l
    } = this.options;
    l && l(), this.cancel()
  }
  complete() {
    const {
      resolved: t
    } = this;
    t && t.animation.finish()
  }
  cancel() {
    const {
      resolved: t
    } = this;
    t && t.animation.cancel()
  }
  static supports(t) {
    const {
      motionValue: n,
      name: r,
      repeatDelay: i,
      repeatType: s,
      damping: o,
      type: a
    } = t;
    if (!n || !n.owner || !(n.owner.current instanceof HTMLElement)) return !1;
    const {
      onUpdate: l,
      transformTemplate: c
    } = n.owner.getProps();
    return Ey() && r && Ty.has(r) && !l && !c && !i && s !== "mirror" && o !== 0 && a !== "inertia"
  }
}
const My = {
    type: "spring",
    stiffness: 500,
    damping: 25,
    restSpeed: 10
  },
  Ry = e => ({
    type: "spring",
    stiffness: 550,
    damping: e === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10
  }),
  Dy = {
    type: "keyframes",
    duration: .8
  },
  Ly = {
    type: "keyframes",
    ease: [.25, .1, .35, 1],
    duration: .3
  },
  Iy = (e, {
    keyframes: t
  }) => t.length > 2 ? Dy : dn.has(e) ? e.startsWith("scale") ? Ry(t[1]) : My : Ly;

function _y({
  when: e,
  delay: t,
  delayChildren: n,
  staggerChildren: r,
  staggerDirection: i,
  repeat: s,
  repeatType: o,
  repeatDelay: a,
  from: l,
  elapsed: c,
  ...d
}) {
  return !!Object.keys(d).length
}
const gu = (e, t, n, r = {}, i, s) => o => {
  const a = tu(r, e) || {},
    l = a.delay || r.delay || 0;
  let {
    elapsed: c = 0
  } = r;
  c = c - ut(l);
  let d = {
    keyframes: Array.isArray(n) ? n : [null, n],
    ease: "easeOut",
    velocity: t.getVelocity(),
    ...a,
    delay: -c,
    onUpdate: p => {
      t.set(p), a.onUpdate && a.onUpdate(p)
    },
    onComplete: () => {
      o(), a.onComplete && a.onComplete()
    },
    name: e,
    motionValue: t,
    element: s ? void 0 : i
  };
  _y(a) || (d = {
      ...d,
      ...Iy(e, d)
    }), d.duration && (d.duration = ut(d.duration)), d.repeatDelay && (d.repeatDelay = ut(d.repeatDelay)), d.from !==
    void 0 && (d.keyframes[0] = d.from);
  let f = !1;
  if ((d.type === !1 || d.duration === 0 && !d.repeatDelay) && (d.duration = 0, d.delay === 0 && (f = !0)), f && !s &&
    t.get() !== void 0) {
    const p = Us(d.keyframes, a);
    if (p !== void 0) return U.update(() => {
      d.onUpdate(p), d.onComplete()
    }), new rx([])
  }
  return !s && Zc.supports(d) ? new Zc(d) : new mu(d)
};

function Oy({
  protectedKeys: e,
  needsAnimating: t
}, n) {
  const r = e.hasOwnProperty(n) && t[n] !== !0;
  return t[n] = !1, r
}

function um(e, t, {
  delay: n = 0,
  transitionOverride: r,
  type: i
} = {}) {
  var s;
  let {
    transition: o = e.getDefaultTransition(),
    transitionEnd: a,
    ...l
  } = t;
  r && (o = r);
  const c = [],
    d = i && e.animationState && e.animationState.getState()[i];
  for (const f in l) {
    const p = e.getValue(f, (s = e.latestValues[f]) !== null && s !== void 0 ? s : null),
      v = l[f];
    if (v === void 0 || d && Oy(d, f)) continue;
    const x = {
      delay: n,
      ...tu(o || {}, f)
    };
    let y = !1;
    if (window.MotionHandoffAnimation) {
      const m = Mh(e);
      if (m) {
        const h = window.MotionHandoffAnimation(m, f, U);
        h !== null && (x.startTime = h, y = !0)
      }
    }
    za(e, f), p.start(gu(f, p, v, e.shouldReduceMotion && Ah.has(f) ? {
      type: !1
    } : x, e, y));
    const S = p.animation;
    S && c.push(S)
  }
  return a && Promise.all(c).then(() => {
    U.update(() => {
      a && vx(e, a)
    })
  }), c
}

function Ia(e, t, n = {}) {
  var r;
  const i = Bs(e, t, n.type === "exit" ? (r = e.presenceContext) === null || r === void 0 ? void 0 : r.custom : void 0);
  let {
    transition: s = e.getDefaultTransition() || {}
  } = i || {};
  n.transitionOverride && (s = n.transitionOverride);
  const o = i ? () => Promise.all(um(e, i, n)) : () => Promise.resolve(),
    a = e.variantChildren && e.variantChildren.size ? (c = 0) => {
      const {
        delayChildren: d = 0,
        staggerChildren: f,
        staggerDirection: p
      } = s;
      return Fy(e, t, d + c, f, p, n)
    } : () => Promise.resolve(),
    {
      when: l
    } = s;
  if (l) {
    const [c, d] = l === "beforeChildren" ? [o, a] : [a, o];
    return c().then(() => d())
  } else return Promise.all([o(), a(n.delay)])
}

function Fy(e, t, n = 0, r = 0, i = 1, s) {
  const o = [],
    a = (e.variantChildren.size - 1) * r,
    l = i === 1 ? (c = 0) => c * r : (c = 0) => a - c * r;
  return Array.from(e.variantChildren).sort(By).forEach((c, d) => {
    c.notify("AnimationStart", t), o.push(Ia(c, t, {
      ...s,
      delay: n + l(d)
    }).then(() => c.notify("AnimationComplete", t)))
  }), Promise.all(o)
}

function By(e, t) {
  return e.sortNodePosition(t)
}

function Uy(e, t, n = {}) {
  e.notify("AnimationStart", t);
  let r;
  if (Array.isArray(t)) {
    const i = t.map(s => Ia(e, s, n));
    r = Promise.all(i)
  } else if (typeof t == "string") r = Ia(e, t, n);
  else {
    const i = typeof t == "function" ? Bs(e, t, n.custom) : t;
    r = Promise.all(um(e, i, n))
  }
  return r.then(() => {
    e.notify("AnimationComplete", t)
  })
}
const $y = $l.length;

function cm(e) {
  if (!e) return;
  if (!e.isControllingVariants) {
    const n = e.parent ? cm(e.parent) || {} : {};
    return e.props.initial !== void 0 && (n.initial = e.props.initial), n
  }
  const t = {};
  for (let n = 0; n < $y; n++) {
    const r = $l[n],
      i = e.props[r];
    (Wr(i) || i === !1) && (t[r] = i)
  }
  return t
}
const Wy = [...Ul].reverse(),
  Hy = Ul.length;

function Ky(e) {
  return t => Promise.all(t.map(({
    animation: n,
    options: r
  }) => Uy(e, n, r)))
}

function Gy(e) {
  let t = Ky(e),
    n = qc(),
    r = !0;
  const i = l => (c, d) => {
    var f;
    const p = Bs(e, d, l === "exit" ? (f = e.presenceContext) === null || f === void 0 ? void 0 : f.custom : void 0);
    if (p) {
      const {
        transition: v,
        transitionEnd: x,
        ...y
      } = p;
      c = {
        ...c,
        ...y,
        ...x
      }
    }
    return c
  };

  function s(l) {
    t = l(e)
  }

  function o(l) {
    const {
      props: c
    } = e, d = cm(e.parent) || {}, f = [], p = new Set;
    let v = {},
      x = 1 / 0;
    for (let S = 0; S < Hy; S++) {
      const m = Wy[S],
        h = n[m],
        g = c[m] !== void 0 ? c[m] : d[m],
        w = Wr(g),
        k = m === l ? h.isActive : null;
      k === !1 && (x = S);
      let P = g === d[m] && g !== c[m] && w;
      if (P && r && e.manuallyAnimateOnMount && (P = !1), h.protectedKeys = {
          ...v
        }, !h.isActive && k === null || !g && !h.prevProp || Os(g) || typeof g == "boolean") continue;
      const T = Qy(h.prevProp, g);
      let j = T || m === l && h.isActive && !P && w || S > x && w,
        D = !1;
      const V = Array.isArray(g) ? g : [g];
      let re = V.reduce(i(m), {});
      k === !1 && (re = {});
      const {
        prevResolvedValues: vt = {}
      } = h, Ut = {
        ...vt,
        ...re
      }, Zn = ee => {
        j = !0, p.has(ee) && (D = !0, p.delete(ee)), h.needsAnimating[ee] = !0;
        const E = e.getValue(ee);
        E && (E.liveStyle = !1)
      };
      for (const ee in Ut) {
        const E = re[ee],
          M = vt[ee];
        if (v.hasOwnProperty(ee)) continue;
        let R = !1;
        Ca(E) && Ca(M) ? R = !jh(E, M) : R = E !== M, R ? E != null ? Zn(ee) : p.add(ee) : E !== void 0 && p.has(ee) ?
          Zn(ee) : h.protectedKeys[ee] = !0
      }
      h.prevProp = g, h.prevResolvedValues = re, h.isActive && (v = {
        ...v,
        ...re
      }), r && e.blockInitialAnimation && (j = !1), j && (!(P && T) || D) && f.push(...V.map(ee => ({
        animation: ee,
        options: {
          type: m
        }
      })))
    }
    if (p.size) {
      const S = {};
      p.forEach(m => {
        const h = e.getBaseTarget(m),
          g = e.getValue(m);
        g && (g.liveStyle = !0), S[m] = h ?? null
      }), f.push({
        animation: S
      })
    }
    let y = !!f.length;
    return r && (c.initial === !1 || c.initial === c.animate) && !e.manuallyAnimateOnMount && (y = !1), r = !1, y ? t(
      f) : Promise.resolve()
  }

  function a(l, c) {
    var d;
    if (n[l].isActive === c) return Promise.resolve();
    (d = e.variantChildren) === null || d === void 0 || d.forEach(p => {
      var v;
      return (v = p.animationState) === null || v === void 0 ? void 0 : v.setActive(l, c)
    }), n[l].isActive = c;
    const f = o(l);
    for (const p in n) n[p].protectedKeys = {};
    return f
  }
  return {
    animateChanges: o,
    setActive: a,
    setAnimateFunction: s,
    getState: () => n,
    reset: () => {
      n = qc(), r = !0
    }
  }
}

function Qy(e, t) {
  return typeof t == "string" ? t !== e : Array.isArray(t) ? !jh(t, e) : !1
}

function Ht(e = !1) {
  return {
    isActive: e,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  }
}

function qc() {
  return {
    animate: Ht(!0),
    whileInView: Ht(),
    whileHover: Ht(),
    whileTap: Ht(),
    whileDrag: Ht(),
    whileFocus: Ht(),
    exit: Ht()
  }
}
class Bt {
  constructor(t) {
    this.isMounted = !1, this.node = t
  }
  update() {}
}
class Yy extends Bt {
  constructor(t) {
    super(t), t.animationState || (t.animationState = Gy(t))
  }
  updateAnimationControlsSubscription() {
    const {
      animate: t
    } = this.node.getProps();
    Os(t) && (this.unmountControls = t.subscribe(this.node))
  }
  mount() {
    this.updateAnimationControlsSubscription()
  }
  update() {
    const {
      animate: t
    } = this.node.getProps(), {
      animate: n
    } = this.node.prevProps || {};
    t !== n && this.updateAnimationControlsSubscription()
  }
  unmount() {
    var t;
    this.node.animationState.reset(), (t = this.unmountControls) === null || t === void 0 || t.call(this)
  }
}
let Xy = 0;
class Zy extends Bt {
  constructor() {
    super(...arguments), this.id = Xy++
  }
  update() {
    if (!this.node.presenceContext) return;
    const {
      isPresent: t,
      onExitComplete: n
    } = this.node.presenceContext, {
      isPresent: r
    } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || t === r) return;
    const i = this.node.animationState.setActive("exit", !t);
    n && !t && i.then(() => n(this.id))
  }
  mount() {
    const {
      register: t
    } = this.node.presenceContext || {};
    t && (this.unmount = t(this.id))
  }
  unmount() {}
}
const qy = {
  animation: {
    Feature: Yy
  },
  exit: {
    Feature: Zy
  }
};

function Qr(e, t, n, r = {
  passive: !0
}) {
  return e.addEventListener(t, n, r), () => e.removeEventListener(t, n)
}

function ri(e) {
  return {
    point: {
      x: e.pageX,
      y: e.pageY
    }
  }
}
const Jy = e => t => iu(t) && e(t, ri(t));

function Nr(e, t, n, r) {
  return Qr(e, t, Jy(n), r)
}
const Jc = (e, t) => Math.abs(e - t);

function e1(e, t) {
  const n = Jc(e.x, t.x),
    r = Jc(e.y, t.y);
  return Math.sqrt(n ** 2 + r ** 2)
}
class dm {
  constructor(t, n, {
    transformPagePoint: r,
    contextWindow: i,
    dragSnapToOrigin: s = !1
  } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.handlers = {}, this
      .contextWindow = window, this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        const f = No(this.lastMoveEventInfo, this.history),
          p = this.startEvent !== null,
          v = e1(f.offset, {
            x: 0,
            y: 0
          }) >= 3;
        if (!p && !v) return;
        const {
          point: x
        } = f, {
          timestamp: y
        } = le;
        this.history.push({
          ...x,
          timestamp: y
        });
        const {
          onStart: S,
          onMove: m
        } = this.handlers;
        p || (S && S(this.lastMoveEvent, f), this.startEvent = this.lastMoveEvent), m && m(this.lastMoveEvent, f)
      }, this.handlePointerMove = (f, p) => {
        this.lastMoveEvent = f, this.lastMoveEventInfo = jo(p, this.transformPagePoint), U.update(this.updatePoint, !
          0)
      }, this.handlePointerUp = (f, p) => {
        this.end();
        const {
          onEnd: v,
          onSessionEnd: x,
          resumeAnimation: y
        } = this.handlers;
        if (this.dragSnapToOrigin && y && y(), !(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        const S = No(f.type === "pointercancel" ? this.lastMoveEventInfo : jo(p, this.transformPagePoint), this
          .history);
        this.startEvent && v && v(f, S), x && x(f, S)
      }, !iu(t)) return;
    this.dragSnapToOrigin = s, this.handlers = n, this.transformPagePoint = r, this.contextWindow = i || window;
    const o = ri(t),
      a = jo(o, this.transformPagePoint),
      {
        point: l
      } = a,
      {
        timestamp: c
      } = le;
    this.history = [{
      ...l,
      timestamp: c
    }];
    const {
      onSessionStart: d
    } = n;
    d && d(t, No(a, this.history)), this.removeListeners = ni(Nr(this.contextWindow, "pointermove", this
      .handlePointerMove), Nr(this.contextWindow, "pointerup", this.handlePointerUp), Nr(this.contextWindow,
      "pointercancel", this.handlePointerUp))
  }
  updateHandlers(t) {
    this.handlers = t
  }
  end() {
    this.removeListeners && this.removeListeners(), Lt(this.updatePoint)
  }
}

function jo(e, t) {
  return t ? {
    point: t(e.point)
  } : e
}

function ed(e, t) {
  return {
    x: e.x - t.x,
    y: e.y - t.y
  }
}

function No({
  point: e
}, t) {
  return {
    point: e,
    delta: ed(e, fm(t)),
    offset: ed(e, t1(t)),
    velocity: n1(t, .1)
  }
}

function t1(e) {
  return e[0]
}

function fm(e) {
  return e[e.length - 1]
}

function n1(e, t) {
  if (e.length < 2) return {
    x: 0,
    y: 0
  };
  let n = e.length - 1,
    r = null;
  const i = fm(e);
  for (; n >= 0 && (r = e[n], !(i.timestamp - r.timestamp > ut(t)));) n--;
  if (!r) return {
    x: 0,
    y: 0
  };
  const s = ct(i.timestamp - r.timestamp);
  if (s === 0) return {
    x: 0,
    y: 0
  };
  const o = {
    x: (i.x - r.x) / s,
    y: (i.y - r.y) / s
  };
  return o.x === 1 / 0 && (o.x = 0), o.y === 1 / 0 && (o.y = 0), o
}
const pm = 1e-4,
  r1 = 1 - pm,
  i1 = 1 + pm,
  hm = .01,
  s1 = 0 - hm,
  o1 = 0 + hm;

function Ae(e) {
  return e.max - e.min
}

function a1(e, t, n) {
  return Math.abs(e - t) <= n
}

function td(e, t, n, r = .5) {
  e.origin = r, e.originPoint = H(t.min, t.max, e.origin), e.scale = Ae(n) / Ae(t), e.translate = H(n.min, n.max, e
    .origin) - e.originPoint, (e.scale >= r1 && e.scale <= i1 || isNaN(e.scale)) && (e.scale = 1), (e.translate >=
    s1 && e.translate <= o1 || isNaN(e.translate)) && (e.translate = 0)
}

function Pr(e, t, n, r) {
  td(e.x, t.x, n.x, r ? r.originX : void 0), td(e.y, t.y, n.y, r ? r.originY : void 0)
}

function nd(e, t, n) {
  e.min = n.min + t.min, e.max = e.min + Ae(t)
}

function l1(e, t, n) {
  nd(e.x, t.x, n.x), nd(e.y, t.y, n.y)
}

function rd(e, t, n) {
  e.min = t.min - n.min, e.max = e.min + Ae(t)
}

function Tr(e, t, n) {
  rd(e.x, t.x, n.x), rd(e.y, t.y, n.y)
}

function u1(e, {
  min: t,
  max: n
}, r) {
  return t !== void 0 && e < t ? e = r ? H(t, e, r.min) : Math.max(e, t) : n !== void 0 && e > n && (e = r ? H(n, e, r
    .max) : Math.min(e, n)), e
}

function id(e, t, n) {
  return {
    min: t !== void 0 ? e.min + t : void 0,
    max: n !== void 0 ? e.max + n - (e.max - e.min) : void 0
  }
}

function c1(e, {
  top: t,
  left: n,
  bottom: r,
  right: i
}) {
  return {
    x: id(e.x, n, i),
    y: id(e.y, t, r)
  }
}

function sd(e, t) {
  let n = t.min - e.min,
    r = t.max - e.max;
  return t.max - t.min < e.max - e.min && ([n, r] = [r, n]), {
    min: n,
    max: r
  }
}

function d1(e, t) {
  return {
    x: sd(e.x, t.x),
    y: sd(e.y, t.y)
  }
}

function f1(e, t) {
  let n = .5;
  const r = Ae(e),
    i = Ae(t);
  return i > r ? n = $n(t.min, t.max - r, e.min) : r > i && (n = $n(e.min, e.max - i, t.min)), mt(0, 1, n)
}

function p1(e, t) {
  const n = {};
  return t.min !== void 0 && (n.min = t.min - e.min), t.max !== void 0 && (n.max = t.max - e.min), n
}
const _a = .35;

function h1(e = _a) {
  return e === !1 ? e = 0 : e === !0 && (e = _a), {
    x: od(e, "left", "right"),
    y: od(e, "top", "bottom")
  }
}

function od(e, t, n) {
  return {
    min: ad(e, t),
    max: ad(e, n)
  }
}

function ad(e, t) {
  return typeof e == "number" ? e : e[t] || 0
}
const ld = () => ({
    translate: 0,
    scale: 1,
    origin: 0,
    originPoint: 0
  }),
  Cn = () => ({
    x: ld(),
    y: ld()
  }),
  ud = () => ({
    min: 0,
    max: 0
  }),
  Z = () => ({
    x: ud(),
    y: ud()
  });

function De(e) {
  return [e("x"), e("y")]
}

function mm({
  top: e,
  left: t,
  right: n,
  bottom: r
}) {
  return {
    x: {
      min: t,
      max: n
    },
    y: {
      min: e,
      max: r
    }
  }
}

function m1({
  x: e,
  y: t
}) {
  return {
    top: t.min,
    right: e.max,
    bottom: t.max,
    left: e.min
  }
}

function g1(e, t) {
  if (!t) return e;
  const n = t({
      x: e.left,
      y: e.top
    }),
    r = t({
      x: e.right,
      y: e.bottom
    });
  return {
    top: n.y,
    left: n.x,
    bottom: r.y,
    right: r.x
  }
}

function Po(e) {
  return e === void 0 || e === 1
}

function Oa({
  scale: e,
  scaleX: t,
  scaleY: n
}) {
  return !Po(e) || !Po(t) || !Po(n)
}

function Qt(e) {
  return Oa(e) || gm(e) || e.z || e.rotate || e.rotateX || e.rotateY || e.skewX || e.skewY
}

function gm(e) {
  return cd(e.x) || cd(e.y)
}

function cd(e) {
  return e && e !== "0%"
}

function ws(e, t, n) {
  const r = e - n,
    i = t * r;
  return n + i
}

function dd(e, t, n, r, i) {
  return i !== void 0 && (e = ws(e, i, r)), ws(e, n, r) + t
}

function Fa(e, t = 0, n = 1, r, i) {
  e.min = dd(e.min, t, n, r, i), e.max = dd(e.max, t, n, r, i)
}

function vm(e, {
  x: t,
  y: n
}) {
  Fa(e.x, t.translate, t.scale, t.originPoint), Fa(e.y, n.translate, n.scale, n.originPoint)
}
const fd = .999999999999,
  pd = 1.0000000000001;

function v1(e, t, n, r = !1) {
  const i = n.length;
  if (!i) return;
  t.x = t.y = 1;
  let s, o;
  for (let a = 0; a < i; a++) {
    s = n[a], o = s.projectionDelta;
    const {
      visualElement: l
    } = s.options;
    l && l.props.style && l.props.style.display === "contents" || (r && s.options.layoutScroll && s.scroll && s !== s
      .root && bn(e, {
        x: -s.scroll.offset.x,
        y: -s.scroll.offset.y
      }), o && (t.x *= o.x.scale, t.y *= o.y.scale, vm(e, o)), r && Qt(s.latestValues) && bn(e, s.latestValues))
  }
  t.x < pd && t.x > fd && (t.x = 1), t.y < pd && t.y > fd && (t.y = 1)
}

function En(e, t) {
  e.min = e.min + t, e.max = e.max + t
}

function hd(e, t, n, r, i = .5) {
  const s = H(e.min, e.max, i);
  Fa(e, t, n, s, r)
}

function bn(e, t) {
  hd(e.x, t.x, t.scaleX, t.scale, t.originX), hd(e.y, t.y, t.scaleY, t.scale, t.originY)
}

function xm(e, t) {
  return mm(g1(e.getBoundingClientRect(), t))
}

function x1(e, t, n) {
  const r = xm(e, n),
    {
      scroll: i
    } = t;
  return i && (En(r.x, i.offset.x), En(r.y, i.offset.y)), r
}
const ym = ({
    current: e
  }) => e ? e.ownerDocument.defaultView : null,
  y1 = new WeakMap;
class w1 {
  constructor(t) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = {
      x: 0,
      y: 0
    }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = Z(), this.visualElement = t
  }
  start(t, {
    snapToCursor: n = !1
  } = {}) {
    const {
      presenceContext: r
    } = this.visualElement;
    if (r && r.isPresent === !1) return;
    const i = d => {
        const {
          dragSnapToOrigin: f
        } = this.getProps();
        f ? this.pauseAnimation() : this.stopAnimation(), n && this.snapToCursor(ri(d).point)
      },
      s = (d, f) => {
        const {
          drag: p,
          dragPropagation: v,
          onDragStart: x
        } = this.getProps();
        if (p && !v && (this.openDragLock && this.openDragLock(), this.openDragLock = fx(p), !this.openDragLock))
          return;
        this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement
          .projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection
            .target = void 0), De(S => {
            let m = this.getAxisMotionValue(S).get() || 0;
            if (tt.test(m)) {
              const {
                projection: h
              } = this.visualElement;
              if (h && h.layout) {
                const g = h.layout.layoutBox[S];
                g && (m = Ae(g) * (parseFloat(m) / 100))
              }
            }
            this.originPoint[S] = m
          }), x && U.postRender(() => x(d, f)), za(this.visualElement, "transform");
        const {
          animationState: y
        } = this.visualElement;
        y && y.setActive("whileDrag", !0)
      },
      o = (d, f) => {
        const {
          dragPropagation: p,
          dragDirectionLock: v,
          onDirectionLock: x,
          onDrag: y
        } = this.getProps();
        if (!p && !this.openDragLock) return;
        const {
          offset: S
        } = f;
        if (v && this.currentDirection === null) {
          this.currentDirection = k1(S), this.currentDirection !== null && x && x(this.currentDirection);
          return
        }
        this.updateAxis("x", f.point, S), this.updateAxis("y", f.point, S), this.visualElement.render(), y && y(d, f)
      },
      a = (d, f) => this.stop(d, f),
      l = () => De(d => {
        var f;
        return this.getAnimationState(d) === "paused" && ((f = this.getAxisMotionValue(d).animation) === null ||
          f === void 0 ? void 0 : f.play())
      }),
      {
        dragSnapToOrigin: c
      } = this.getProps();
    this.panSession = new dm(t, {
      onSessionStart: i,
      onStart: s,
      onMove: o,
      onSessionEnd: a,
      resumeAnimation: l
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: c,
      contextWindow: ym(this.visualElement)
    })
  }
  stop(t, n) {
    const r = this.isDragging;
    if (this.cancel(), !r) return;
    const {
      velocity: i
    } = n;
    this.startAnimation(i);
    const {
      onDragEnd: s
    } = this.getProps();
    s && U.postRender(() => s(t, n))
  }
  cancel() {
    this.isDragging = !1;
    const {
      projection: t,
      animationState: n
    } = this.visualElement;
    t && (t.isAnimationBlocked = !1), this.panSession && this.panSession.end(), this.panSession = void 0;
    const {
      dragPropagation: r
    } = this.getProps();
    !r && this.openDragLock && (this.openDragLock(), this.openDragLock = null), n && n.setActive("whileDrag", !1)
  }
  updateAxis(t, n, r) {
    const {
      drag: i
    } = this.getProps();
    if (!r || !Ci(t, i, this.currentDirection)) return;
    const s = this.getAxisMotionValue(t);
    let o = this.originPoint[t] + r[t];
    this.constraints && this.constraints[t] && (o = u1(o, this.constraints[t], this.elastic[t])), s.set(o)
  }
  resolveConstraints() {
    var t;
    const {
      dragConstraints: n,
      dragElastic: r
    } = this.getProps(), i = this.visualElement.projection && !this.visualElement.projection.layout ? this
      .visualElement.projection.measure(!1) : (t = this.visualElement.projection) === null || t === void 0 ? void 0 :
      t.layout, s = this.constraints;
    n && Pn(n) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : n && i ? this.constraints =
      c1(i.layoutBox, n) : this.constraints = !1, this.elastic = h1(r), s !== this.constraints && i && this
      .constraints && !this.hasMutatedConstraints && De(o => {
        this.constraints !== !1 && this.getAxisMotionValue(o) && (this.constraints[o] = p1(i.layoutBox[o], this
          .constraints[o]))
      })
  }
  resolveRefConstraints() {
    const {
      dragConstraints: t,
      onMeasureDragConstraints: n
    } = this.getProps();
    if (!t || !Pn(t)) return !1;
    const r = t.current,
      {
        projection: i
      } = this.visualElement;
    if (!i || !i.layout) return !1;
    const s = x1(r, i.root, this.visualElement.getTransformPagePoint());
    let o = d1(i.layout.layoutBox, s);
    if (n) {
      const a = n(m1(o));
      this.hasMutatedConstraints = !!a, a && (o = mm(a))
    }
    return o
  }
  startAnimation(t) {
    const {
      drag: n,
      dragMomentum: r,
      dragElastic: i,
      dragTransition: s,
      dragSnapToOrigin: o,
      onDragTransitionEnd: a
    } = this.getProps(), l = this.constraints || {}, c = De(d => {
      if (!Ci(d, n, this.currentDirection)) return;
      let f = l && l[d] || {};
      o && (f = {
        min: 0,
        max: 0
      });
      const p = i ? 200 : 1e6,
        v = i ? 40 : 1e7,
        x = {
          type: "inertia",
          velocity: r ? t[d] : 0,
          bounceStiffness: p,
          bounceDamping: v,
          timeConstant: 750,
          restDelta: 1,
          restSpeed: 10,
          ...s,
          ...f
        };
      return this.startAxisValueAnimation(d, x)
    });
    return Promise.all(c).then(a)
  }
  startAxisValueAnimation(t, n) {
    const r = this.getAxisMotionValue(t);
    return za(this.visualElement, t), r.start(gu(t, r, 0, n, this.visualElement, !1))
  }
  stopAnimation() {
    De(t => this.getAxisMotionValue(t).stop())
  }
  pauseAnimation() {
    De(t => {
      var n;
      return (n = this.getAxisMotionValue(t).animation) === null || n === void 0 ? void 0 : n.pause()
    })
  }
  getAnimationState(t) {
    var n;
    return (n = this.getAxisMotionValue(t).animation) === null || n === void 0 ? void 0 : n.state
  }
  getAxisMotionValue(t) {
    const n = `_drag${t.toUpperCase()}`,
      r = this.visualElement.getProps(),
      i = r[n];
    return i || this.visualElement.getValue(t, (r.initial ? r.initial[t] : void 0) || 0)
  }
  snapToCursor(t) {
    De(n => {
      const {
        drag: r
      } = this.getProps();
      if (!Ci(n, r, this.currentDirection)) return;
      const {
        projection: i
      } = this.visualElement, s = this.getAxisMotionValue(n);
      if (i && i.layout) {
        const {
          min: o,
          max: a
        } = i.layout.layoutBox[n];
        s.set(t[n] - H(o, a, .5))
      }
    })
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return;
    const {
      drag: t,
      dragConstraints: n
    } = this.getProps(), {
      projection: r
    } = this.visualElement;
    if (!Pn(n) || !r || !this.constraints) return;
    this.stopAnimation();
    const i = {
      x: 0,
      y: 0
    };
    De(o => {
      const a = this.getAxisMotionValue(o);
      if (a && this.constraints !== !1) {
        const l = a.get();
        i[o] = f1({
          min: l,
          max: l
        }, this.constraints[o])
      }
    });
    const {
      transformTemplate: s
    } = this.visualElement.getProps();
    this.visualElement.current.style.transform = s ? s({}, "") : "none", r.root && r.root.updateScroll(), r
      .updateLayout(), this.resolveConstraints(), De(o => {
        if (!Ci(o, t, null)) return;
        const a = this.getAxisMotionValue(o),
          {
            min: l,
            max: c
          } = this.constraints[o];
        a.set(H(l, c, i[o]))
      })
  }
  addListeners() {
    if (!this.visualElement.current) return;
    y1.set(this.visualElement, this);
    const t = this.visualElement.current,
      n = Nr(t, "pointerdown", l => {
        const {
          drag: c,
          dragListener: d = !0
        } = this.getProps();
        c && d && this.start(l)
      }),
      r = () => {
        const {
          dragConstraints: l
        } = this.getProps();
        Pn(l) && l.current && (this.constraints = this.resolveRefConstraints())
      },
      {
        projection: i
      } = this.visualElement,
      s = i.addEventListener("measure", r);
    i && !i.layout && (i.root && i.root.updateScroll(), i.updateLayout()), U.read(r);
    const o = Qr(window, "resize", () => this.scalePositionWithinConstraints()),
      a = i.addEventListener("didUpdate", ({
        delta: l,
        hasLayoutChanged: c
      }) => {
        this.isDragging && c && (De(d => {
          const f = this.getAxisMotionValue(d);
          f && (this.originPoint[d] += l[d].translate, f.set(f.get() + l[d].translate))
        }), this.visualElement.render())
      });
    return () => {
      o(), n(), s(), a && a()
    }
  }
  getProps() {
    const t = this.visualElement.getProps(),
      {
        drag: n = !1,
        dragDirectionLock: r = !1,
        dragPropagation: i = !1,
        dragConstraints: s = !1,
        dragElastic: o = _a,
        dragMomentum: a = !0
      } = t;
    return {
      ...t,
      drag: n,
      dragDirectionLock: r,
      dragPropagation: i,
      dragConstraints: s,
      dragElastic: o,
      dragMomentum: a
    }
  }
}

function Ci(e, t, n) {
  return (t === !0 || t === e) && (n === null || n === e)
}

function k1(e, t = 10) {
  let n = null;
  return Math.abs(e.y) > t ? n = "y" : Math.abs(e.x) > t && (n = "x"), n
}
class S1 extends Bt {
  constructor(t) {
    super(t), this.removeGroupControls = be, this.removeListeners = be, this.controls = new w1(t)
  }
  mount() {
    const {
      dragControls: t
    } = this.node.getProps();
    t && (this.removeGroupControls = t.subscribe(this.controls)), this.removeListeners = this.controls
    .addListeners() || be
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners()
  }
}
const md = e => (t, n) => {
  e && U.postRender(() => e(t, n))
};
class j1 extends Bt {
  constructor() {
    super(...arguments), this.removePointerDownListener = be
  }
  onPointerDown(t) {
    this.session = new dm(t, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: ym(this.node)
    })
  }
  createPanHandlers() {
    const {
      onPanSessionStart: t,
      onPanStart: n,
      onPan: r,
      onPanEnd: i
    } = this.node.getProps();
    return {
      onSessionStart: md(t),
      onStart: md(n),
      onMove: r,
      onEnd: (s, o) => {
        delete this.session, i && U.postRender(() => i(s, o))
      }
    }
  }
  mount() {
    this.removePointerDownListener = Nr(this.node.current, "pointerdown", t => this.onPointerDown(t))
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers())
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end()
  }
}
const $i = {
  hasAnimatedSinceResize: !0,
  hasEverUpdated: !1
};

function gd(e, t) {
  return t.max === t.min ? 0 : e / (t.max - t.min) * 100
}
const or = {
    correct: (e, t) => {
      if (!t.target) return e;
      if (typeof e == "string")
        if (A.test(e)) e = parseFloat(e);
        else return e;
      const n = gd(e, t.target.x),
        r = gd(e, t.target.y);
      return `${n}% ${r}%`
    }
  },
  N1 = {
    correct: (e, {
      treeScale: t,
      projectionDelta: n
    }) => {
      const r = e,
        i = It.parse(e);
      if (i.length > 5) return r;
      const s = It.createTransformer(e),
        o = typeof i[0] != "number" ? 1 : 0,
        a = n.x.scale * t.x,
        l = n.y.scale * t.y;
      i[0 + o] /= a, i[1 + o] /= l;
      const c = H(a, l, .5);
      return typeof i[2 + o] == "number" && (i[2 + o] /= c), typeof i[3 + o] == "number" && (i[3 + o] /= c), s(i)
    }
  };
class P1 extends C.Component {
  componentDidMount() {
    const {
      visualElement: t,
      layoutGroup: n,
      switchLayoutGroup: r,
      layoutId: i
    } = this.props, {
      projection: s
    } = t;
    Hv(T1), s && (n.group && n.group.add(s), r && r.register && i && r.register(s), s.root.didUpdate(), s
      .addEventListener("animationComplete", () => {
        this.safeToRemove()
      }), s.setOptions({
        ...s.options,
        onExitComplete: () => this.safeToRemove()
      })), $i.hasEverUpdated = !0
  }
  getSnapshotBeforeUpdate(t) {
    const {
      layoutDependency: n,
      visualElement: r,
      drag: i,
      isPresent: s
    } = this.props, o = r.projection;
    return o && (o.isPresent = s, i || t.layoutDependency !== n || n === void 0 ? o.willUpdate() : this
      .safeToRemove(), t.isPresent !== s && (s ? o.promote() : o.relegate() || U.postRender(() => {
        const a = o.getStack();
        (!a || !a.members.length) && this.safeToRemove()
      }))), null
  }
  componentDidUpdate() {
    const {
      projection: t
    } = this.props.visualElement;
    t && (t.root.didUpdate(), Hl.postRender(() => {
      !t.currentAnimation && t.isLead() && this.safeToRemove()
    }))
  }
  componentWillUnmount() {
    const {
      visualElement: t,
      layoutGroup: n,
      switchLayoutGroup: r
    } = this.props, {
      projection: i
    } = t;
    i && (i.scheduleCheckAfterUnmount(), n && n.group && n.group.remove(i), r && r.deregister && r.deregister(i))
  }
  safeToRemove() {
    const {
      safeToRemove: t
    } = this.props;
    t && t()
  }
  render() {
    return null
  }
}

function wm(e) {
  const [t, n] = nh(), r = C.useContext(Il);
  return u.jsx(P1, {
    ...e,
    layoutGroup: r,
    switchLayoutGroup: C.useContext(ch),
    isPresent: t,
    safeToRemove: n
  })
}
const T1 = {
  borderRadius: {
    ...or,
    applyTo: ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius"]
  },
  borderTopLeftRadius: or,
  borderTopRightRadius: or,
  borderBottomLeftRadius: or,
  borderBottomRightRadius: or,
  boxShadow: N1
};

function C1(e, t, n) {
  const r = me(e) ? e : Kr(e);
  return r.start(gu("", r, t, n)), r.animation
}

function E1(e) {
  return e instanceof SVGElement && e.tagName !== "svg"
}
const b1 = (e, t) => e.depth - t.depth;
class z1 {
  constructor() {
    this.children = [], this.isDirty = !1
  }
  add(t) {
    su(this.children, t), this.isDirty = !0
  }
  remove(t) {
    ou(this.children, t), this.isDirty = !0
  }
  forEach(t) {
    this.isDirty && this.children.sort(b1), this.isDirty = !1, this.children.forEach(t)
  }
}

function A1(e, t) {
  const n = nt.now(),
    r = ({
      timestamp: i
    }) => {
      const s = i - n;
      s >= t && (Lt(r), e(s - t))
    };
  return U.read(r, !0), () => Lt(r)
}
const km = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
  V1 = km.length,
  vd = e => typeof e == "string" ? parseFloat(e) : e,
  xd = e => typeof e == "number" || A.test(e);

function M1(e, t, n, r, i, s) {
  i ? (e.opacity = H(0, n.opacity !== void 0 ? n.opacity : 1, R1(r)), e.opacityExit = H(t.opacity !== void 0 ? t
    .opacity : 1, 0, D1(r))) : s && (e.opacity = H(t.opacity !== void 0 ? t.opacity : 1, n.opacity !== void 0 ? n
    .opacity : 1, r));
  for (let o = 0; o < V1; o++) {
    const a = `border${km[o]}Radius`;
    let l = yd(t, a),
      c = yd(n, a);
    if (l === void 0 && c === void 0) continue;
    l || (l = 0), c || (c = 0), l === 0 || c === 0 || xd(l) === xd(c) ? (e[a] = Math.max(H(vd(l), vd(c), r), 0), (tt
      .test(c) || tt.test(l)) && (e[a] += "%")) : e[a] = c
  }(t.rotate || n.rotate) && (e.rotate = H(t.rotate || 0, n.rotate || 0, r))
}

function yd(e, t) {
  return e[t] !== void 0 ? e[t] : e.borderRadius
}
const R1 = Sm(0, .5, Fh),
  D1 = Sm(.5, .95, be);

function Sm(e, t, n) {
  return r => r < e ? 0 : r > t ? 1 : n($n(e, t, r))
}

function wd(e, t) {
  e.min = t.min, e.max = t.max
}

function Re(e, t) {
  wd(e.x, t.x), wd(e.y, t.y)
}

function kd(e, t) {
  e.translate = t.translate, e.scale = t.scale, e.originPoint = t.originPoint, e.origin = t.origin
}

function Sd(e, t, n, r, i) {
  return e -= t, e = ws(e, 1 / n, r), i !== void 0 && (e = ws(e, 1 / i, r)), e
}

function L1(e, t = 0, n = 1, r = .5, i, s = e, o = e) {
  if (tt.test(t) && (t = parseFloat(t), t = H(o.min, o.max, t / 100) - o.min), typeof t != "number") return;
  let a = H(s.min, s.max, r);
  e === s && (a -= t), e.min = Sd(e.min, t, n, a, i), e.max = Sd(e.max, t, n, a, i)
}

function jd(e, t, [n, r, i], s, o) {
  L1(e, t[n], t[r], t[i], t.scale, s, o)
}
const I1 = ["x", "scaleX", "originX"],
  _1 = ["y", "scaleY", "originY"];

function Nd(e, t, n, r) {
  jd(e.x, t, I1, n ? n.x : void 0, r ? r.x : void 0), jd(e.y, t, _1, n ? n.y : void 0, r ? r.y : void 0)
}

function Pd(e) {
  return e.translate === 0 && e.scale === 1
}

function jm(e) {
  return Pd(e.x) && Pd(e.y)
}

function Td(e, t) {
  return e.min === t.min && e.max === t.max
}

function O1(e, t) {
  return Td(e.x, t.x) && Td(e.y, t.y)
}

function Cd(e, t) {
  return Math.round(e.min) === Math.round(t.min) && Math.round(e.max) === Math.round(t.max)
}

function Nm(e, t) {
  return Cd(e.x, t.x) && Cd(e.y, t.y)
}

function Ed(e) {
  return Ae(e.x) / Ae(e.y)
}

function bd(e, t) {
  return e.translate === t.translate && e.scale === t.scale && e.originPoint === t.originPoint
}
class F1 {
  constructor() {
    this.members = []
  }
  add(t) {
    su(this.members, t), t.scheduleRender()
  }
  remove(t) {
    if (ou(this.members, t), t === this.prevLead && (this.prevLead = void 0), t === this.lead) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n)
    }
  }
  relegate(t) {
    const n = this.members.findIndex(i => t === i);
    if (n === 0) return !1;
    let r;
    for (let i = n; i >= 0; i--) {
      const s = this.members[i];
      if (s.isPresent !== !1) {
        r = s;
        break
      }
    }
    return r ? (this.promote(r), !0) : !1
  }
  promote(t, n) {
    const r = this.lead;
    if (t !== r && (this.prevLead = r, this.lead = t, t.show(), r)) {
      r.instance && r.scheduleRender(), t.scheduleRender(), t.resumeFrom = r, n && (t.resumeFrom.preserveOpacity = !
        0), r.snapshot && (t.snapshot = r.snapshot, t.snapshot.latestValues = r.animationValues || r.latestValues), t
        .root && t.root.isUpdating && (t.isLayoutDirty = !0);
      const {
        crossfade: i
      } = t.options;
      i === !1 && r.hide()
    }
  }
  exitAnimationComplete() {
    this.members.forEach(t => {
      const {
        options: n,
        resumingFrom: r
      } = t;
      n.onExitComplete && n.onExitComplete(), r && r.options.onExitComplete && r.options.onExitComplete()
    })
  }
  scheduleRender() {
    this.members.forEach(t => {
      t.instance && t.scheduleRender(!1)
    })
  }
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0)
  }
}

function B1(e, t, n) {
  let r = "";
  const i = e.x.translate / t.x,
    s = e.y.translate / t.y,
    o = (n == null ? void 0 : n.z) || 0;
  if ((i || s || o) && (r = `translate3d(${i}px, ${s}px, ${o}px) `), (t.x !== 1 || t.y !== 1) && (r +=
      `scale(${1/t.x}, ${1/t.y}) `), n) {
    const {
      transformPerspective: c,
      rotate: d,
      rotateX: f,
      rotateY: p,
      skewX: v,
      skewY: x
    } = n;
    c && (r = `perspective(${c}px) ${r}`), d && (r += `rotate(${d}deg) `), f && (r += `rotateX(${f}deg) `), p && (r +=
      `rotateY(${p}deg) `), v && (r += `skewX(${v}deg) `), x && (r += `skewY(${x}deg) `)
  }
  const a = e.x.scale * t.x,
    l = e.y.scale * t.y;
  return (a !== 1 || l !== 1) && (r += `scale(${a}, ${l})`), r || "none"
}
const Yt = {
    type: "projectionFrame",
    totalNodes: 0,
    resolvedTargetDeltas: 0,
    recalculatedProjection: 0
  },
  pr = typeof window < "u" && window.MotionDebug !== void 0,
  To = ["", "X", "Y", "Z"],
  U1 = {
    visibility: "hidden"
  },
  zd = 1e3;
let $1 = 0;

function Co(e, t, n, r) {
  const {
    latestValues: i
  } = t;
  i[e] && (n[e] = i[e], t.setStaticValue(e, 0), r && (r[e] = 0))
}

function Pm(e) {
  if (e.hasCheckedOptimisedAppear = !0, e.root === e) return;
  const {
    visualElement: t
  } = e.options;
  if (!t) return;
  const n = Mh(t);
  if (window.MotionHasOptimisedAnimation(n, "transform")) {
    const {
      layout: i,
      layoutId: s
    } = e.options;
    window.MotionCancelOptimisedAnimation(n, "transform", U, !(i || s))
  }
  const {
    parent: r
  } = e;
  r && !r.hasCheckedOptimisedAppear && Pm(r)
}

function Tm({
  attachResizeListener: e,
  defaultParent: t,
  measureScroll: n,
  checkIsScrollRoot: r,
  resetTransform: i
}) {
  return class {
    constructor(o = {}, a = t == null ? void 0 : t()) {
      this.id = $1++, this.animationId = 0, this.children = new Set, this.options = {}, this.isTreeAnimating = !1,
        this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this
        .isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this
        .updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this
        .shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = {
          x: 1,
          y: 1
        }, this.eventHandlers = new Map, this.hasTreeAnimated = !1, this.updateScheduled = !1, this.scheduleUpdate =
        () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
          this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots())
        }, this.updateProjection = () => {
          this.projectionUpdateScheduled = !1, pr && (Yt.totalNodes = Yt.resolvedTargetDeltas = Yt
              .recalculatedProjection = 0), this.nodes.forEach(K1), this.nodes.forEach(Z1), this.nodes.forEach(q1),
            this.nodes.forEach(G1), pr && window.MotionDebug.record(Yt)
        }, this.resolvedRelativeTargetAt = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress =
        0, this.sharedNodes = new Map, this.latestValues = o, this.root = a ? a.root || a : this, this.path = a ? [
          ...a.path, a
        ] : [], this.parent = a, this.depth = a ? a.depth + 1 : 0;
      for (let l = 0; l < this.path.length; l++) this.path[l].shouldResetTransform = !0;
      this.root === this && (this.nodes = new z1)
    }
    addEventListener(o, a) {
      return this.eventHandlers.has(o) || this.eventHandlers.set(o, new au), this.eventHandlers.get(o).add(a)
    }
    notifyListeners(o, ...a) {
      const l = this.eventHandlers.get(o);
      l && l.notify(...a)
    }
    hasListeners(o) {
      return this.eventHandlers.has(o)
    }
    mount(o, a = this.root.hasTreeAnimated) {
      if (this.instance) return;
      this.isSVG = E1(o), this.instance = o;
      const {
        layoutId: l,
        layout: c,
        visualElement: d
      } = this.options;
      if (d && !d.current && d.mount(o), this.root.nodes.add(this), this.parent && this.parent.children.add(this),
        a && (c || l) && (this.isLayoutDirty = !0), e) {
        let f;
        const p = () => this.root.updateBlockedByResize = !1;
        e(o, () => {
          this.root.updateBlockedByResize = !0, f && f(), f = A1(p, 250), $i.hasAnimatedSinceResize && ($i
            .hasAnimatedSinceResize = !1, this.nodes.forEach(Vd))
        })
      }
      l && this.root.registerSharedNode(l, this), this.options.animate !== !1 && d && (l || c) && this
        .addEventListener("didUpdate", ({
          delta: f,
          hasLayoutChanged: p,
          hasRelativeTargetChanged: v,
          layout: x
        }) => {
          if (this.isTreeAnimationBlocked()) {
            this.target = void 0, this.relativeTarget = void 0;
            return
          }
          const y = this.options.transition || d.getDefaultTransition() || rw,
            {
              onLayoutAnimationStart: S,
              onLayoutAnimationComplete: m
            } = d.getProps(),
            h = !this.targetLayout || !Nm(this.targetLayout, x) || v,
            g = !p && v;
          if (this.options.layoutRoot || this.resumeFrom && this.resumeFrom.instance || g || p && (h || !this
              .currentAnimation)) {
            this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0),
              this.setAnimationOrigin(f, g);
            const w = {
              ...tu(y, "layout"),
              onPlay: S,
              onComplete: m
            };
            (d.shouldReduceMotion || this.options.layoutRoot) && (w.delay = 0, w.type = !1), this.startAnimation(
              w)
          } else p || Vd(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
          this.targetLayout = x
        })
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const o = this.getStack();
      o && o.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, Lt(this
        .updateProjection)
    }
    blockUpdate() {
      this.updateManuallyBlocked = !0
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1
    }
    startUpdate() {
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(J1), this.animationId++)
    }
    getTransformTemplate() {
      const {
        visualElement: o
      } = this.options;
      return o && o.getProps().transformTemplate
    }
    willUpdate(o = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && Pm(this), !this.root
        .isUpdating && this.root.startUpdate(), this.isLayoutDirty) return;
      this.isLayoutDirty = !0;
      for (let d = 0; d < this.path.length; d++) {
        const f = this.path[d];
        f.shouldResetTransform = !0, f.updateScroll("snapshot"), f.options.layoutRoot && f.willUpdate(!1)
      }
      const {
        layoutId: a,
        layout: l
      } = this.options;
      if (a === void 0 && !l) return;
      const c = this.getTransformTemplate();
      this.prevTransformTemplateValue = c ? c(this.latestValues, "") : void 0, this.updateSnapshot(), o && this
        .notifyListeners("willUpdate")
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(Ad);
        return
      }
      this.isUpdating || this.nodes.forEach(Y1), this.isUpdating = !1, this.nodes.forEach(X1), this.nodes.forEach(
        W1), this.nodes.forEach(H1), this.clearAllSnapshots();
      const a = nt.now();
      le.delta = mt(0, 1e3 / 60, a - le.timestamp), le.timestamp = a, le.isProcessing = !0, vo.update.process(le),
        vo.preRender.process(le), vo.render.process(le), le.isProcessing = !1
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, Hl.read(this.scheduleUpdate))
    }
    clearAllSnapshots() {
      this.nodes.forEach(Q1), this.sharedNodes.forEach(ew)
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, U.preRender(this.updateProjection, !1,
        !0))
    }
    scheduleCheckAfterUnmount() {
      U.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed()
      })
    }
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure())
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this
          .isLayoutDirty)) return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let l = 0; l < this.path.length; l++) this.path[l].updateScroll();
      const o = this.layout;
      this.layout = this.measure(!1), this.layoutCorrected = Z(), this.isLayoutDirty = !1, this.projectionDelta =
        void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const {
        visualElement: a
      } = this.options;
      a && a.notify("LayoutMeasure", this.layout.layoutBox, o ? o.layoutBox : void 0)
    }
    updateScroll(o = "measure") {
      let a = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === o && (a = !1),
        a) {
        const l = r(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: o,
          isRoot: l,
          offset: n(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : l
        }
      }
    }
    resetTransform() {
      if (!i) return;
      const o = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout,
        a = this.projectionDelta && !jm(this.projectionDelta),
        l = this.getTransformTemplate(),
        c = l ? l(this.latestValues, "") : void 0,
        d = c !== this.prevTransformTemplateValue;
      o && (a || Qt(this.latestValues) || d) && (i(this.instance, c), this.shouldResetTransform = !1, this
        .scheduleRender())
    }
    measure(o = !0) {
      const a = this.measurePageBox();
      let l = this.removeElementScroll(a);
      return o && (l = this.removeTransform(l)), iw(l), {
        animationId: this.root.animationId,
        measuredBox: a,
        layoutBox: l,
        latestValues: {},
        source: this.id
      }
    }
    measurePageBox() {
      var o;
      const {
        visualElement: a
      } = this.options;
      if (!a) return Z();
      const l = a.measureViewportBox();
      if (!(((o = this.scroll) === null || o === void 0 ? void 0 : o.wasRoot) || this.path.some(sw))) {
        const {
          scroll: d
        } = this.root;
        d && (En(l.x, d.offset.x), En(l.y, d.offset.y))
      }
      return l
    }
    removeElementScroll(o) {
      var a;
      const l = Z();
      if (Re(l, o), !((a = this.scroll) === null || a === void 0) && a.wasRoot) return l;
      for (let c = 0; c < this.path.length; c++) {
        const d = this.path[c],
          {
            scroll: f,
            options: p
          } = d;
        d !== this.root && f && p.layoutScroll && (f.wasRoot && Re(l, o), En(l.x, f.offset.x), En(l.y, f.offset.y))
      }
      return l
    }
    applyTransform(o, a = !1) {
      const l = Z();
      Re(l, o);
      for (let c = 0; c < this.path.length; c++) {
        const d = this.path[c];
        !a && d.options.layoutScroll && d.scroll && d !== d.root && bn(l, {
          x: -d.scroll.offset.x,
          y: -d.scroll.offset.y
        }), Qt(d.latestValues) && bn(l, d.latestValues)
      }
      return Qt(this.latestValues) && bn(l, this.latestValues), l
    }
    removeTransform(o) {
      const a = Z();
      Re(a, o);
      for (let l = 0; l < this.path.length; l++) {
        const c = this.path[l];
        if (!c.instance || !Qt(c.latestValues)) continue;
        Oa(c.latestValues) && c.updateSnapshot();
        const d = Z(),
          f = c.measurePageBox();
        Re(d, f), Nd(a, c.latestValues, c.snapshot ? c.snapshot.layoutBox : void 0, d)
      }
      return Qt(this.latestValues) && Nd(a, this.latestValues), a
    }
    setTargetDelta(o) {
      this.targetDelta = o, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0
    }
    setOptions(o) {
      this.options = {
        ...this.options,
        ...o,
        crossfade: o.crossfade !== void 0 ? o.crossfade : !0
      }
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0,
        this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== le.timestamp && this.relativeParent
        .resolveTargetDelta(!0)
    }
    resolveTargetDelta(o = !1) {
      var a;
      const l = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = l.isProjectionDirty), this.isTransformDirty || (this
        .isTransformDirty = l.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = l
        .isSharedProjectionDirty);
      const c = !!this.resumingFrom || this !== l;
      if (!(o || c && this.isSharedProjectionDirty || this.isProjectionDirty || !((a = this.parent) === null ||
            a === void 0) && a.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root
          .updateBlockedByResize)) return;
      const {
        layout: f,
        layoutId: p
      } = this.options;
      if (!(!this.layout || !(f || p))) {
        if (this.resolvedRelativeTargetAt = le.timestamp, !this.targetDelta && !this.relativeTarget) {
          const v = this.getClosestProjectingParent();
          v && v.layout && this.animationProgress !== 1 ? (this.relativeParent = v, this
            .forceRelativeParentToResolveTarget(), this.relativeTarget = Z(), this.relativeTargetOrigin = Z(), Tr(
              this.relativeTargetOrigin, this.layout.layoutBox, v.layout.layoutBox), Re(this.relativeTarget, this
              .relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0
        }
        if (!(!this.relativeTarget && !this.targetDelta)) {
          if (this.target || (this.target = Z(), this.targetWithTransforms = Z()), this.relativeTarget && this
            .relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this
              .forceRelativeParentToResolveTarget(), l1(this.target, this.relativeTarget, this.relativeParent
                .target)) : this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout
              .layoutBox) : Re(this.target, this.layout.layoutBox), vm(this.target, this.targetDelta)) : Re(this
              .target, this.layout.layoutBox), this.attemptToResolveRelativeTarget) {
            this.attemptToResolveRelativeTarget = !1;
            const v = this.getClosestProjectingParent();
            v && !!v.resumingFrom == !!this.resumingFrom && !v.options.layoutScroll && v.target && this
              .animationProgress !== 1 ? (this.relativeParent = v, this.forceRelativeParentToResolveTarget(), this
                .relativeTarget = Z(), this.relativeTargetOrigin = Z(), Tr(this.relativeTargetOrigin, this.target, v
                  .target), Re(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this
              .relativeTarget = void 0
          }
          pr && Yt.resolvedTargetDeltas++
        }
      }
    }
    getClosestProjectingParent() {
      if (!(!this.parent || Oa(this.parent.latestValues) || gm(this.parent.latestValues))) return this.parent
        .isProjecting() ? this.parent : this.parent.getClosestProjectingParent()
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout)
    }
    calcProjection() {
      var o;
      const a = this.getLead(),
        l = !!this.resumingFrom || this !== a;
      let c = !0;
      if ((this.isProjectionDirty || !((o = this.parent) === null || o === void 0) && o.isProjectionDirty) && (c = !
          1), l && (this.isSharedProjectionDirty || this.isTransformDirty) && (c = !1), this
        .resolvedRelativeTargetAt === le.timestamp && (c = !1), c) return;
      const {
        layout: d,
        layoutId: f
      } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this
          .pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this
        .layout || !(d || f)) return;
      Re(this.layoutCorrected, this.layout.layoutBox);
      const p = this.treeScale.x,
        v = this.treeScale.y;
      v1(this.layoutCorrected, this.treeScale, this.path, l), a.layout && !a.target && (this.treeScale.x !== 1 ||
        this.treeScale.y !== 1) && (a.target = a.layout.layoutBox, a.targetWithTransforms = Z());
      const {
        target: x
      } = a;
      if (!x) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return
      }!this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (kd(this
          .prevProjectionDelta.x, this.projectionDelta.x), kd(this.prevProjectionDelta.y, this.projectionDelta.y)),
        Pr(this.projectionDelta, this.layoutCorrected, x, this.latestValues), (this.treeScale.x !== p || this
          .treeScale.y !== v || !bd(this.projectionDelta.x, this.prevProjectionDelta.x) || !bd(this.projectionDelta
            .y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this
          .notifyListeners("projectionUpdate", x)), pr && Yt.recalculatedProjection++
    }
    hide() {
      this.isVisible = !1
    }
    show() {
      this.isVisible = !0
    }
    scheduleRender(o = !0) {
      var a;
      if ((a = this.options.visualElement) === null || a === void 0 || a.scheduleRender(), o) {
        const l = this.getStack();
        l && l.scheduleRender()
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0)
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = Cn(), this.projectionDelta = Cn(), this.projectionDeltaWithTransform = Cn()
    }
    setAnimationOrigin(o, a = !1) {
      const l = this.snapshot,
        c = l ? l.latestValues : {},
        d = {
          ...this.latestValues
        },
        f = Cn();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this
        .relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !a;
      const p = Z(),
        v = l ? l.source : void 0,
        x = this.layout ? this.layout.source : void 0,
        y = v !== x,
        S = this.getStack(),
        m = !S || S.members.length <= 1,
        h = !!(y && !m && this.options.crossfade === !0 && !this.path.some(nw));
      this.animationProgress = 0;
      let g;
      this.mixTargetDelta = w => {
        const k = w / 1e3;
        Md(f.x, o.x, k), Md(f.y, o.y, k), this.setTargetDelta(f), this.relativeTarget && this
          .relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (Tr(p, this
              .layout.layoutBox, this.relativeParent.layout.layoutBox), tw(this.relativeTarget, this
              .relativeTargetOrigin, p, k), g && O1(this.relativeTarget, g) && (this.isProjectionDirty = !1), g ||
            (g = Z()), Re(g, this.relativeTarget)), y && (this.animationValues = d, M1(d, c, this.latestValues, k,
            h, m)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = k
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0)
    }
    startAnimation(o) {
      this.notifyListeners("animationStart"), this.currentAnimation && this.currentAnimation.stop(), this
        .resumingFrom && this.resumingFrom.currentAnimation && this.resumingFrom.currentAnimation.stop(), this
        .pendingAnimation && (Lt(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = U
        .update(() => {
          $i.hasAnimatedSinceResize = !0, this.currentAnimation = C1(0, zd, {
              ...o,
              onUpdate: a => {
                this.mixTargetDelta(a), o.onUpdate && o.onUpdate(a)
              },
              onComplete: () => {
                o.onComplete && o.onComplete(), this.completeAnimation()
              }
            }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this
            .pendingAnimation = void 0
        })
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity =
      void 0);
      const o = this.getStack();
      o && o.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0,
        this.notifyListeners("animationComplete")
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(zd), this.currentAnimation.stop()), this
        .completeAnimation()
    }
    applyTransformsToTarget() {
      const o = this.getLead();
      let {
        targetWithTransforms: a,
        target: l,
        layout: c,
        latestValues: d
      } = o;
      if (!(!a || !l || !c)) {
        if (this !== o && this.layout && c && Cm(this.options.animationType, this.layout.layoutBox, c.layoutBox)) {
          l = this.target || Z();
          const f = Ae(this.layout.layoutBox.x);
          l.x.min = o.target.x.min, l.x.max = l.x.min + f;
          const p = Ae(this.layout.layoutBox.y);
          l.y.min = o.target.y.min, l.y.max = l.y.min + p
        }
        Re(a, l), bn(a, d), Pr(this.projectionDeltaWithTransform, this.layoutCorrected, a, d)
      }
    }
    registerSharedNode(o, a) {
      this.sharedNodes.has(o) || this.sharedNodes.set(o, new F1), this.sharedNodes.get(o).add(a);
      const c = a.options.initialPromotionConfig;
      a.promote({
        transition: c ? c.transition : void 0,
        preserveFollowOpacity: c && c.shouldPreserveFollowOpacity ? c.shouldPreserveFollowOpacity(a) : void 0
      })
    }
    isLead() {
      const o = this.getStack();
      return o ? o.lead === this : !0
    }
    getLead() {
      var o;
      const {
        layoutId: a
      } = this.options;
      return a ? ((o = this.getStack()) === null || o === void 0 ? void 0 : o.lead) || this : this
    }
    getPrevLead() {
      var o;
      const {
        layoutId: a
      } = this.options;
      return a ? (o = this.getStack()) === null || o === void 0 ? void 0 : o.prevLead : void 0
    }
    getStack() {
      const {
        layoutId: o
      } = this.options;
      if (o) return this.root.sharedNodes.get(o)
    }
    promote({
      needsReset: o,
      transition: a,
      preserveFollowOpacity: l
    } = {}) {
      const c = this.getStack();
      c && c.promote(this, l), o && (this.projectionDelta = void 0, this.needsReset = !0), a && this.setOptions({
        transition: a
      })
    }
    relegate() {
      const o = this.getStack();
      return o ? o.relegate(this) : !1
    }
    resetSkewAndRotation() {
      const {
        visualElement: o
      } = this.options;
      if (!o) return;
      let a = !1;
      const {
        latestValues: l
      } = o;
      if ((l.z || l.rotate || l.rotateX || l.rotateY || l.rotateZ || l.skewX || l.skewY) && (a = !0), !a) return;
      const c = {};
      l.z && Co("z", o, c, this.animationValues);
      for (let d = 0; d < To.length; d++) Co(`rotate${To[d]}`, o, c, this.animationValues), Co(`skew${To[d]}`, o, c,
        this.animationValues);
      o.render();
      for (const d in c) o.setStaticValue(d, c[d]), this.animationValues && (this.animationValues[d] = c[d]);
      o.scheduleRender()
    }
    getProjectionStyles(o) {
      var a, l;
      if (!this.instance || this.isSVG) return;
      if (!this.isVisible) return U1;
      const c = {
          visibility: ""
        },
        d = this.getTransformTemplate();
      if (this.needsReset) return this.needsReset = !1, c.opacity = "", c.pointerEvents = Bi(o == null ? void 0 : o
        .pointerEvents) || "", c.transform = d ? d(this.latestValues, "") : "none", c;
      const f = this.getLead();
      if (!this.projectionDelta || !this.layout || !f.target) {
        const y = {};
        return this.options.layoutId && (y.opacity = this.latestValues.opacity !== void 0 ? this.latestValues
            .opacity : 1, y.pointerEvents = Bi(o == null ? void 0 : o.pointerEvents) || ""), this.hasProjected && !
          Qt(this.latestValues) && (y.transform = d ? d({}, "") : "none", this.hasProjected = !1), y
      }
      const p = f.animationValues || f.latestValues;
      this.applyTransformsToTarget(), c.transform = B1(this.projectionDeltaWithTransform, this.treeScale, p), d && (
        c.transform = d(p, c.transform));
      const {
        x: v,
        y: x
      } = this.projectionDelta;
      c.transformOrigin = `${v.origin*100}% ${x.origin*100}% 0`, f.animationValues ? c.opacity = f === this ? (l = (
          a = p.opacity) !== null && a !== void 0 ? a : this.latestValues.opacity) !== null && l !== void 0 ? l :
        1 : this.preserveOpacity ? this.latestValues.opacity : p.opacityExit : c.opacity = f === this ? p
        .opacity !== void 0 ? p.opacity : "" : p.opacityExit !== void 0 ? p.opacityExit : 0;
      for (const y in ms) {
        if (p[y] === void 0) continue;
        const {
          correct: S,
          applyTo: m
        } = ms[y], h = c.transform === "none" ? p[y] : S(p[y], f);
        if (m) {
          const g = m.length;
          for (let w = 0; w < g; w++) c[m[w]] = h
        } else c[y] = h
      }
      return this.options.layoutId && (c.pointerEvents = f === this ? Bi(o == null ? void 0 : o.pointerEvents) ||
        "" : "none"), c
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0
    }
    resetTree() {
      this.root.nodes.forEach(o => {
        var a;
        return (a = o.currentAnimation) === null || a === void 0 ? void 0 : a.stop()
      }), this.root.nodes.forEach(Ad), this.root.sharedNodes.clear()
    }
  }
}

function W1(e) {
  e.updateLayout()
}

function H1(e) {
  var t;
  const n = ((t = e.resumeFrom) === null || t === void 0 ? void 0 : t.snapshot) || e.snapshot;
  if (e.isLead() && e.layout && n && e.hasListeners("didUpdate")) {
    const {
      layoutBox: r,
      measuredBox: i
    } = e.layout, {
      animationType: s
    } = e.options, o = n.source !== e.layout.source;
    s === "size" ? De(f => {
      const p = o ? n.measuredBox[f] : n.layoutBox[f],
        v = Ae(p);
      p.min = r[f].min, p.max = p.min + v
    }) : Cm(s, n.layoutBox, r) && De(f => {
      const p = o ? n.measuredBox[f] : n.layoutBox[f],
        v = Ae(r[f]);
      p.max = p.min + v, e.relativeTarget && !e.currentAnimation && (e.isProjectionDirty = !0, e.relativeTarget[f]
        .max = e.relativeTarget[f].min + v)
    });
    const a = Cn();
    Pr(a, r, n.layoutBox);
    const l = Cn();
    o ? Pr(l, e.applyTransform(i, !0), n.measuredBox) : Pr(l, r, n.layoutBox);
    const c = !jm(a);
    let d = !1;
    if (!e.resumeFrom) {
      const f = e.getClosestProjectingParent();
      if (f && !f.resumeFrom) {
        const {
          snapshot: p,
          layout: v
        } = f;
        if (p && v) {
          const x = Z();
          Tr(x, n.layoutBox, p.layoutBox);
          const y = Z();
          Tr(y, r, v.layoutBox), Nm(x, y) || (d = !0), f.options.layoutRoot && (e.relativeTarget = y, e
            .relativeTargetOrigin = x, e.relativeParent = f)
        }
      }
    }
    e.notifyListeners("didUpdate", {
      layout: r,
      snapshot: n,
      delta: l,
      layoutDelta: a,
      hasLayoutChanged: c,
      hasRelativeTargetChanged: d
    })
  } else if (e.isLead()) {
    const {
      onExitComplete: r
    } = e.options;
    r && r()
  }
  e.options.transition = void 0
}

function K1(e) {
  pr && Yt.totalNodes++, e.parent && (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty), e
    .isSharedProjectionDirty || (e.isSharedProjectionDirty = !!(e.isProjectionDirty || e.parent.isProjectionDirty || e
      .parent.isSharedProjectionDirty)), e.isTransformDirty || (e.isTransformDirty = e.parent.isTransformDirty))
}

function G1(e) {
  e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1
}

function Q1(e) {
  e.clearSnapshot()
}

function Ad(e) {
  e.clearMeasurements()
}

function Y1(e) {
  e.isLayoutDirty = !1
}

function X1(e) {
  const {
    visualElement: t
  } = e.options;
  t && t.getProps().onBeforeLayoutMeasure && t.notify("BeforeLayoutMeasure"), e.resetTransform()
}

function Vd(e) {
  e.finishAnimation(), e.targetDelta = e.relativeTarget = e.target = void 0, e.isProjectionDirty = !0
}

function Z1(e) {
  e.resolveTargetDelta()
}

function q1(e) {
  e.calcProjection()
}

function J1(e) {
  e.resetSkewAndRotation()
}

function ew(e) {
  e.removeLeadSnapshot()
}

function Md(e, t, n) {
  e.translate = H(t.translate, 0, n), e.scale = H(t.scale, 1, n), e.origin = t.origin, e.originPoint = t.originPoint
}

function Rd(e, t, n, r) {
  e.min = H(t.min, n.min, r), e.max = H(t.max, n.max, r)
}

function tw(e, t, n, r) {
  Rd(e.x, t.x, n.x, r), Rd(e.y, t.y, n.y, r)
}

function nw(e) {
  return e.animationValues && e.animationValues.opacityExit !== void 0
}
const rw = {
    duration: .45,
    ease: [.4, 0, .1, 1]
  },
  Dd = e => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(e),
  Ld = Dd("applewebkit/") && !Dd("chrome/") ? Math.round : be;

function Id(e) {
  e.min = Ld(e.min), e.max = Ld(e.max)
}

function iw(e) {
  Id(e.x), Id(e.y)
}

function Cm(e, t, n) {
  return e === "position" || e === "preserve-aspect" && !a1(Ed(t), Ed(n), .2)
}

function sw(e) {
  var t;
  return e !== e.root && ((t = e.scroll) === null || t === void 0 ? void 0 : t.wasRoot)
}
const ow = Tm({
    attachResizeListener: (e, t) => Qr(e, "resize", t),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop
    }),
    checkIsScrollRoot: () => !0
  }),
  Eo = {
    current: void 0
  },
  Em = Tm({
    measureScroll: e => ({
      x: e.scrollLeft,
      y: e.scrollTop
    }),
    defaultParent: () => {
      if (!Eo.current) {
        const e = new ow({});
        e.mount(window), e.setOptions({
          layoutScroll: !0
        }), Eo.current = e
      }
      return Eo.current
    },
    resetTransform: (e, t) => {
      e.style.transform = t !== void 0 ? t : "none"
    },
    checkIsScrollRoot: e => window.getComputedStyle(e).position === "fixed"
  }),
  aw = {
    pan: {
      Feature: j1
    },
    drag: {
      Feature: S1,
      ProjectionNode: Em,
      MeasureLayout: wm
    }
  };

function _d(e, t, n) {
  const {
    props: r
  } = e;
  e.animationState && r.whileHover && e.animationState.setActive("whileHover", n === "Start");
  const i = "onHover" + n,
    s = r[i];
  s && U.postRender(() => s(t, ri(t)))
}
class lw extends Bt {
  mount() {
    const {
      current: t
    } = this.node;
    t && (this.unmount = ax(t, n => (_d(this.node, n, "Start"), r => _d(this.node, r, "End"))))
  }
  unmount() {}
}
class uw extends Bt {
  constructor() {
    super(...arguments), this.isActive = !1
  }
  onFocus() {
    let t = !1;
    try {
      t = this.node.current.matches(":focus-visible")
    } catch {
      t = !0
    }!t || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0)
  }
  onBlur() {
    !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this
      .isActive = !1)
  }
  mount() {
    this.unmount = ni(Qr(this.node.current, "focus", () => this.onFocus()), Qr(this.node.current, "blur", () => this
      .onBlur()))
  }
  unmount() {}
}

function Od(e, t, n) {
  const {
    props: r
  } = e;
  e.animationState && r.whileTap && e.animationState.setActive("whileTap", n === "Start");
  const i = "onTap" + (n === "End" ? "" : n),
    s = r[i];
  s && U.postRender(() => s(t, ri(t)))
}
class cw extends Bt {
  mount() {
    const {
      current: t
    } = this.node;
    t && (this.unmount = dx(t, n => (Od(this.node, n, "Start"), (r, {
      success: i
    }) => Od(this.node, r, i ? "End" : "Cancel")), {
      useGlobalTarget: this.node.props.globalTapTarget
    }))
  }
  unmount() {}
}
const Ba = new WeakMap,
  bo = new WeakMap,
  dw = e => {
    const t = Ba.get(e.target);
    t && t(e)
  },
  fw = e => {
    e.forEach(dw)
  };

function pw({
  root: e,
  ...t
}) {
  const n = e || document;
  bo.has(n) || bo.set(n, {});
  const r = bo.get(n),
    i = JSON.stringify(t);
  return r[i] || (r[i] = new IntersectionObserver(fw, {
    root: e,
    ...t
  })), r[i]
}

function hw(e, t, n) {
  const r = pw(t);
  return Ba.set(e, n), r.observe(e), () => {
    Ba.delete(e), r.unobserve(e)
  }
}
const mw = {
  some: 0,
  all: 1
};
class gw extends Bt {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1
  }
  startObserver() {
    this.unmount();
    const {
      viewport: t = {}
    } = this.node.getProps(), {
      root: n,
      margin: r,
      amount: i = "some",
      once: s
    } = t, o = {
      root: n ? n.current : void 0,
      rootMargin: r,
      threshold: typeof i == "number" ? i : mw[i]
    }, a = l => {
      const {
        isIntersecting: c
      } = l;
      if (this.isInView === c || (this.isInView = c, s && !c && this.hasEnteredView)) return;
      c && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView",
        c);
      const {
        onViewportEnter: d,
        onViewportLeave: f
      } = this.node.getProps(), p = c ? d : f;
      p && p(l)
    };
    return hw(this.node.current, o, a)
  }
  mount() {
    this.startObserver()
  }
  update() {
    if (typeof IntersectionObserver > "u") return;
    const {
      props: t,
      prevProps: n
    } = this.node;
    ["amount", "margin", "root"].some(vw(t, n)) && this.startObserver()
  }
  unmount() {}
}

function vw({
  viewport: e = {}
}, {
  viewport: t = {}
} = {}) {
  return n => e[n] !== t[n]
}
const xw = {
    inView: {
      Feature: gw
    },
    tap: {
      Feature: cw
    },
    focus: {
      Feature: uw
    },
    hover: {
      Feature: lw
    }
  },
  yw = {
    layout: {
      ProjectionNode: Em,
      MeasureLayout: wm
    }
  },
  Ua = {
    current: null
  },
  bm = {
    current: !1
  };

function ww() {
  if (bm.current = !0, !!Fl)
    if (window.matchMedia) {
      const e = window.matchMedia("(prefers-reduced-motion)"),
        t = () => Ua.current = e.matches;
      e.addListener(t), t()
    } else Ua.current = !1
}
const kw = [...em, pe, It],
  Sw = e => kw.find(Jh(e)),
  Fd = new WeakMap;

function jw(e, t, n) {
  for (const r in t) {
    const i = t[r],
      s = n[r];
    if (me(i)) e.addValue(r, i);
    else if (me(s)) e.addValue(r, Kr(i, {
      owner: e
    }));
    else if (s !== i)
      if (e.hasValue(r)) {
        const o = e.getValue(r);
        o.liveStyle === !0 ? o.jump(i) : o.hasAnimated || o.set(i)
      } else {
        const o = e.getStaticValue(r);
        e.addValue(r, Kr(o !== void 0 ? o : i, {
          owner: e
        }))
      }
  }
  for (const r in n) t[r] === void 0 && e.removeValue(r);
  return t
}
const Bd = ["AnimationStart", "AnimationComplete", "Update", "BeforeLayoutMeasure", "LayoutMeasure",
  "LayoutAnimationStart", "LayoutAnimationComplete"
];
class Nw {
  scrapeMotionValuesFromProps(t, n, r) {
    return {}
  }
  constructor({
    parent: t,
    props: n,
    presenceContext: r,
    reducedMotionConfig: i,
    blockInitialAnimation: s,
    visualState: o
  }, a = {}) {
    this.current = null, this.children = new Set, this.isVariantNode = !1, this.isControllingVariants = !1, this
      .shouldReduceMotion = null, this.values = new Map, this.KeyframeResolver = pu, this.features = {}, this
      .valueSubscriptions = new Map, this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {},
      this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
        this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style,
          this.projection))
      }, this.renderScheduledAt = 0, this.scheduleRender = () => {
        const v = nt.now();
        this.renderScheduledAt < v && (this.renderScheduledAt = v, U.render(this.render, !1, !0))
      };
    const {
      latestValues: l,
      renderState: c,
      onUpdate: d
    } = o;
    this.onUpdate = d, this.latestValues = l, this.baseTarget = {
        ...l
      }, this.initialValues = n.initial ? {
        ...l
      } : {}, this.renderState = c, this.parent = t, this.props = n, this.presenceContext = r, this.depth = t ? t
      .depth + 1 : 0, this.reducedMotionConfig = i, this.options = a, this.blockInitialAnimation = !!s, this
      .isControllingVariants = Fs(n), this.isVariantNode = lh(n), this.isVariantNode && (this.variantChildren =
        new Set), this.manuallyAnimateOnMount = !!(t && t.current);
    const {
      willChange: f,
      ...p
    } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const v in p) {
      const x = p[v];
      l[v] !== void 0 && me(x) && x.set(l[v], !1)
    }
  }
  mount(t) {
    this.current = t, Fd.set(t, this), this.projection && !this.projection.instance && this.projection.mount(t), this
      .parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent
        .addVariantChild(this)), this.values.forEach((n, r) => this.bindToMotionValue(r, n)), bm.current || ww(), this
      .shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 :
      Ua.current, this.parent && this.parent.children.add(this), this.update(this.props, this.presenceContext)
  }
  unmount() {
    Fd.delete(this.current), this.projection && this.projection.unmount(), Lt(this.notifyUpdate), Lt(this.render),
      this.valueSubscriptions.forEach(t => t()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this
      .removeFromVariantTree(), this.parent && this.parent.children.delete(this);
    for (const t in this.events) this.events[t].clear();
    for (const t in this.features) {
      const n = this.features[t];
      n && (n.unmount(), n.isMounted = !1)
    }
    this.current = null
  }
  bindToMotionValue(t, n) {
    this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)();
    const r = dn.has(t),
      i = n.on("change", a => {
        this.latestValues[t] = a, this.props.onUpdate && U.preRender(this.notifyUpdate), r && this.projection && (
          this.projection.isTransformDirty = !0)
      }),
      s = n.on("renderRequest", this.scheduleRender);
    let o;
    window.MotionCheckAppearSync && (o = window.MotionCheckAppearSync(this, t, n)), this.valueSubscriptions.set(t,
    () => {
        i(), s(), o && o(), n.owner && n.stop()
      })
  }
  sortNodePosition(t) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== t.type ? 0 : this
      .sortInstanceNodePosition(this.current, t.current)
  }
  updateFeatures() {
    let t = "animation";
    for (t in Wn) {
      const n = Wn[t];
      if (!n) continue;
      const {
        isEnabled: r,
        Feature: i
      } = n;
      if (!this.features[t] && i && r(this.props) && (this.features[t] = new i(this)), this.features[t]) {
        const s = this.features[t];
        s.isMounted ? s.update() : (s.mount(), s.isMounted = !0)
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props)
  }
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : Z()
  }
  getStaticValue(t) {
    return this.latestValues[t]
  }
  setStaticValue(t, n) {
    this.latestValues[t] = n
  }
  update(t, n) {
    (t.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this
      .props = t, this.prevPresenceContext = this.presenceContext, this.presenceContext = n;
    for (let r = 0; r < Bd.length; r++) {
      const i = Bd[r];
      this.propEventSubscriptions[i] && (this.propEventSubscriptions[i](), delete this.propEventSubscriptions[i]);
      const s = "on" + i,
        o = t[s];
      o && (this.propEventSubscriptions[i] = this.on(i, o))
    }
    this.prevMotionValues = jw(this, this.scrapeMotionValuesFromProps(t, this.prevProps, this), this
      .prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue(), this.onUpdate && this
      .onUpdate(this)
  }
  getProps() {
    return this.props
  }
  getVariant(t) {
    return this.props.variants ? this.props.variants[t] : void 0
  }
  getDefaultTransition() {
    return this.props.transition
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0
  }
  addVariantChild(t) {
    const n = this.getClosestVariantNode();
    if (n) return n.variantChildren && n.variantChildren.add(t), () => n.variantChildren.delete(t)
  }
  addValue(t, n) {
    const r = this.values.get(t);
    n !== r && (r && this.removeValue(t), this.bindToMotionValue(t, n), this.values.set(t, n), this.latestValues[t] =
      n.get())
  }
  removeValue(t) {
    this.values.delete(t);
    const n = this.valueSubscriptions.get(t);
    n && (n(), this.valueSubscriptions.delete(t)), delete this.latestValues[t], this.removeValueFromRenderState(t,
      this.renderState)
  }
  hasValue(t) {
    return this.values.has(t)
  }
  getValue(t, n) {
    if (this.props.values && this.props.values[t]) return this.props.values[t];
    let r = this.values.get(t);
    return r === void 0 && n !== void 0 && (r = Kr(n === null ? void 0 : n, {
      owner: this
    }), this.addValue(t, r)), r
  }
  readValue(t, n) {
    var r;
    let i = this.latestValues[t] !== void 0 || !this.current ? this.latestValues[t] : (r = this
      .getBaseTargetFromProps(this.props, t)) !== null && r !== void 0 ? r : this.readValueFromInstance(this
      .current, t, this.options);
    return i != null && (typeof i == "string" && (Zh(i) || Uh(i)) ? i = parseFloat(i) : !Sw(i) && It.test(n) && (i =
      Qh(t, n)), this.setBaseTarget(t, me(i) ? i.get() : i)), me(i) ? i.get() : i
  }
  setBaseTarget(t, n) {
    this.baseTarget[t] = n
  }
  getBaseTarget(t) {
    var n;
    const {
      initial: r
    } = this.props;
    let i;
    if (typeof r == "string" || typeof r == "object") {
      const o = Gl(this.props, r, (n = this.presenceContext) === null || n === void 0 ? void 0 : n.custom);
      o && (i = o[t])
    }
    if (r && i !== void 0) return i;
    const s = this.getBaseTargetFromProps(this.props, t);
    return s !== void 0 && !me(s) ? s : this.initialValues[t] !== void 0 && i === void 0 ? void 0 : this.baseTarget[t]
  }
  on(t, n) {
    return this.events[t] || (this.events[t] = new au), this.events[t].add(n)
  }
  notify(t, ...n) {
    this.events[t] && this.events[t].notify(...n)
  }
}
class zm extends Nw {
  constructor() {
    super(...arguments), this.KeyframeResolver = tm
  }
  sortInstanceNodePosition(t, n) {
    return t.compareDocumentPosition(n) & 2 ? 1 : -1
  }
  getBaseTargetFromProps(t, n) {
    return t.style ? t.style[n] : void 0
  }
  removeValueFromRenderState(t, {
    vars: n,
    style: r
  }) {
    delete n[t], delete r[t]
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const {
      children: t
    } = this.props;
    me(t) && (this.childSubscription = t.on("change", n => {
      this.current && (this.current.textContent = `${n}`)
    }))
  }
}

function Pw(e) {
  return window.getComputedStyle(e)
}
class Tw extends zm {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = vh
  }
  readValueFromInstance(t, n) {
    if (dn.has(n)) {
      const r = fu(n);
      return r && r.default || 0
    } else {
      const r = Pw(t),
        i = (hh(n) ? r.getPropertyValue(n) : r[n]) || 0;
      return typeof i == "string" ? i.trim() : i
    }
  }
  measureInstanceViewportBox(t, {
    transformPagePoint: n
  }) {
    return xm(t, n)
  }
  build(t, n, r) {
    Xl(t, n, r.transformTemplate)
  }
  scrapeMotionValuesFromProps(t, n, r) {
    return eu(t, n, r)
  }
}
class Cw extends zm {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = Z
  }
  getBaseTargetFromProps(t, n) {
    return t[n]
  }
  readValueFromInstance(t, n) {
    if (dn.has(n)) {
      const r = fu(n);
      return r && r.default || 0
    }
    return n = xh.has(n) ? n : Wl(n), t.getAttribute(n)
  }
  scrapeMotionValuesFromProps(t, n, r) {
    return kh(t, n, r)
  }
  build(t, n, r) {
    Zl(t, n, this.isSVGTag, r.transformTemplate)
  }
  renderInstance(t, n, r, i) {
    yh(t, n, r, i)
  }
  mount(t) {
    this.isSVGTag = Jl(t.tagName), super.mount(t)
  }
}
const Ew = (e, t) => Kl(e) ? new Cw(t) : new Tw(t, {
    allowProjection: e !== C.Fragment
  }),
  bw = ex({
    ...qy,
    ...xw,
    ...aw,
    ...yw
  }, Ew),
  b = mv(bw),
  zo = [{
    label: "Come funziona",
    href: "come-funziona"
  }, {
    label: "Servizi",
    href: "servizi"
  }, {
    label: "Risultati",
    href: "risultati"
  }, {
    label: "Vision",
    href: "vision"
  }, {
    label: "Prezzi",
    href: "prezzi"
  }, {
    label: "Executive",
    href: "corporate"
  }],
  zw = () => {
    const [e, t] = C.useState(!1), [n, r] = C.useState(!1);
    C.useEffect(() => {
      const s = () => t(window.scrollY > 60);
      return window.addEventListener("scroll", s), () => window.removeEventListener("scroll", s)
    }, []);
    const i = s => {
      var o;
      r(!1), (o = document.getElementById(s)) == null || o.scrollIntoView({
        behavior: "smooth",
        block: "start"
      })
    };
    return u.jsxs(u.Fragment, {
      children: [u.jsx(b.nav, {
        initial: {
          y: -80,
          opacity: 0
        },
        animate: {
          y: 0,
          opacity: 1
        },
        transition: {
          duration: .7,
          ease: [.22, 1, .36, 1]
        },
        className: `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${e?"bg-dark-900/95 backdrop-blur-xl border-b border-gold-500/10 py-5":"bg-transparent py-8"}`,
        children: u.jsxs("div", {
          className: "max-w-[1280px] mx-auto px-6 md:px-10 w-full flex items-center justify-between",
          children: [u.jsxs("a", {
            href: "#hero",
            onClick: s => {
              s.preventDefault(), i("hero")
            },
            className: "font-serif text-[28px] md:text-[34px] tracking-[0.18em] text-white hover:text-gold-400 transition-colors drop-shadow-md",
            children: ["VIRTUAL", u.jsx("span", {
              className: "text-gold-500",
              children: "BNB"
            })]
          }), u.jsx("ul", {
            className: "hidden md:flex gap-10 list-none",
            children: zo.map(s => u.jsx("li", {
              children: u.jsxs("a", {
                href: `#${s.href}`,
                onClick: o => {
                  o.preventDefault(), i(s.href)
                },
                className: "font-sans text-[14px] tracking-[0.1em] uppercase text-cream-100/90 hover:text-white transition-colors relative group",
                children: [s.label, u.jsx("span", {
                  className: "absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-px bg-gold-500 group-hover:w-full transition-all duration-300"
                })]
              })
            }, s.href))
          }), u.jsx("a", {
            href: "#analisi",
            onClick: s => {
              s.preventDefault(), i("analisi")
            },
            className: "hidden md:inline-flex font-sans text-[13px] font-medium tracking-[0.12em] uppercase text-gold-500 border border-gold-500/60 px-7 py-3 hover:bg-gold-500 hover:text-black transition-all duration-300",
            children: "Analisi gratuita"
          }), u.jsx("button", {
            className: "md:hidden text-white p-2",
            onClick: () => r(!n),
            "aria-label": "Menu",
            children: u.jsxs("div", {
              className: "w-8 flex flex-col gap-2",
              children: [u.jsx("span", {
                className: `h-px bg-white transition-all duration-300 ${n?"rotate-45 translate-y-2.5":""}`
              }), u.jsx("span", {
                className: `h-px bg-white transition-all duration-300 ${n?"opacity-0":""}`
              }), u.jsx("span", {
                className: `h-px bg-white transition-all duration-300 ${n?"-rotate-45 -translate-y-2.5":""}`
              })]
            })
          })]
        })
      }), u.jsx(rt, {
        children: n && u.jsxs(b.div, {
          initial: {
            opacity: 0
          },
          animate: {
            opacity: 1
          },
          exit: {
            opacity: 0
          },
          className: "fixed inset-0 z-40 bg-dark-900/98 backdrop-blur-xl flex flex-col items-center justify-center gap-10 md:hidden",
          children: [zo.map((s, o) => u.jsx(b.a, {
            href: `#${s.href}`,
            onClick: a => {
              a.preventDefault(), i(s.href)
            },
            initial: {
              y: 24,
              opacity: 0
            },
            animate: {
              y: 0,
              opacity: 1
            },
            transition: {
              delay: o * .07,
              duration: .5
            },
            className: "font-serif text-[42px] font-light text-white hover:text-gold-400 hover:italic transition-all cursor-pointer",
            children: s.label
          }, s.href)), u.jsx(b.a, {
            href: "#analisi",
            onClick: s => {
              s.preventDefault(), i("analisi")
            },
            initial: {
              y: 24,
              opacity: 0
            },
            animate: {
              y: 0,
              opacity: 1
            },
            transition: {
              delay: zo.length * .07 + .1
            },
            className: "font-sans text-[14px] tracking-[0.15em] uppercase text-gold-500 border border-gold-500 px-8 py-4 hover:bg-gold-500 hover:text-black transition-all duration-300 mt-4",
            children: "Analisi gratuita"
          })]
        })
      })]
    })
  },
  Aw = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80",
  Vw = () => {
    const e = n => {
        var r;
        return (r = document.getElementById(n)) == null ? void 0 : r.scrollIntoView({
          behavior: "smooth",
          block: "start"
        })
      },
      t = [{
        num: "Top",
        label: "Portfolio Selezionato",
        sub: "Per garantire cura estrema"
      }, {
        num: "100%",
        label: "Dedizione Assoluta",
        sub: "Come se fosse casa nostra"
      }, {
        num: "Zero",
        label: "Pensieri per te",
        sub: "Gestiamo ogni singolo dettaglio"
      }, {
        num: "90s",
        label: "Attenzione all'Ospite",
        sub: "Risposte immediate 24/7"
      }];
    return u.jsxs("section", {
      id: "hero",
      className: "relative min-h-screen flex flex-col overflow-hidden text-left",
      style: {
        background: "#0A0A0A"
      },
      children: [u.jsxs("div", {
        className: "absolute inset-0 z-0",
        children: [u.jsx("img", {
          src: Aw,
          alt: "VirtualBNB Luxury Stay",
          className: "w-full h-full object-cover",
          style: {
            objectPosition: "center"
          }
        }), u.jsx("div", {
          className: "absolute inset-0",
          style: {
            background: "linear-gradient(105deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.85) 45%, rgba(10,10,10,0.4) 100%)"
          }
        }), u.jsx("div", {
          className: "absolute bottom-0 left-0 right-0 h-72",
          style: {
            background: "linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 100%)"
          }
        })]
      }), u.jsxs("div", {
        className: "relative z-10 flex-1 flex flex-col justify-between min-h-screen",
        children: [u.jsx("div", {
          className: "flex-1 flex items-center",
          children: u.jsxs("div", {
            className: "max-w-[1280px] mx-auto px-6 md:px-10 w-full pt-32 pb-12",
            children: [u.jsxs(b.div, {
              initial: {
                opacity: 0,
                x: -24
              },
              animate: {
                opacity: 1,
                x: 0
              },
              transition: {
                duration: .7,
                delay: .1
              },
              className: "flex items-center gap-4 mb-8",
              children: [u.jsx("span", {
                className: "w-10 h-px bg-gold-500 inline-block"
              }), u.jsx("span", {
                className: "font-sans text-[13px] tracking-[0.25em] uppercase text-gold-400 font-medium",
                children: "Il futuro dell'ospitalità"
              })]
            }), u.jsxs(b.h1, {
              initial: {
                opacity: 0,
                y: 40
              },
              animate: {
                opacity: 1,
                y: 0
              },
              transition: {
                duration: 1,
                delay: .2,
                ease: [.22, 1, .36, 1]
              },
              className: "font-serif font-light text-white leading-[1.05] max-w-2xl mb-8",
              style: {
                fontSize: "clamp(56px, 7vw, 96px)",
                letterSpacing: "-0.02em"
              },
              children: ["Property", u.jsx("br", {}), "Management", u.jsx("br", {}), u.jsx(
                "em", {
                  className: "italic text-gold-400",
                  style: {
                    fontStyle: "italic"
                  },
                  children: "d'Eccellenza"
                })]
            }), u.jsx(b.p, {
              initial: {
                opacity: 0,
                y: 24
              },
              animate: {
                opacity: 1,
                y: 0
              },
              transition: {
                duration: .8,
                delay: .4
              },
              className: "font-sans font-light text-[19px] text-cream-100/90 max-w-lg leading-relaxed mt-4 mb-14",
              children: "7 anni di esperienza nella gestione immobiliare, potenziata dall'Intelligenza Artificiale. Trasformiamo proprietà in investimenti redditizi con professionalità, eleganza e risultati misurabili."
            }), u.jsxs(b.div, {
              initial: {
                opacity: 0,
                y: 16
              },
              animate: {
                opacity: 1,
                y: 0
              },
              transition: {
                duration: .7,
                delay: .55
              },
              className: "flex items-center gap-6 flex-wrap",
              children: [u.jsx("button", {
                onClick: () => e("analisi"),
                className: "font-sans text-[13px] font-medium tracking-[0.15em] uppercase px-10 py-5 transition-all duration-300",
                style: {
                  background: "#B8963E",
                  color: "#000",
                  boxShadow: "0 4px 20px rgba(184,150,62,0.35)"
                },
                onMouseEnter: n => n.currentTarget.style.background = "#D4AF6A",
                onMouseLeave: n => n.currentTarget.style.background = "#B8963E",
                children: "Analisi gratuita del tuo immobile"
              }), u.jsxs("button", {
                onClick: () => e("come-funziona"),
                className: "font-sans text-[13px] tracking-[0.15em] uppercase text-white/80 hover:text-white flex items-center gap-3 transition-colors ml-4",
                children: ["Scopri come funziona", u.jsx("span", {
                  className: "inline-block transition-transform duration-300",
                  children: "↓"
                })]
              })]
            })]
          })
        }), u.jsx("div", {
          className: "max-w-[1280px] mx-auto px-6 md:px-10 w-full pb-14 md:pb-20",
          children: u.jsx(b.div, {
            initial: {
              opacity: 0,
              y: 20
            },
            animate: {
              opacity: 1,
              y: 0
            },
            transition: {
              duration: .8,
              delay: .8
            },
            className: "flex gap-4 border-t border-white/12 pt-10 max-w-3xl flex-wrap",
            children: t.map((n, r) => u.jsxs(b.div, {
              initial: {
                opacity: 0,
                y: 12
              },
              animate: {
                opacity: 1,
                y: 0
              },
              transition: {
                delay: .85 + r * .07
              },
              className: `flex-[1_1_40%] md:flex-1 mb-8 md:mb-0 ${r!==0?"md:border-l md:border-white/10 md:pl-8":"md:pl-0"}`,
              children: [u.jsx("span", {
                className: "font-serif text-[42px] font-light text-gold-400 block leading-none mb-4",
                children: n.num
              }), u.jsx("span", {
                className: "font-sans text-[12px] md:text-[13px] font-medium tracking-[0.1em] uppercase text-white block",
                children: n.label
              }), u.jsx("span", {
                className: "font-sans text-[13px] text-white/50 italic block mt-1.5",
                children: n.sub
              })]
            }, n.label))
          })
        })]
      })]
    })
  },
  Ao = (e = 0) => ({
    initial: {
      opacity: 0,
      y: 36
    },
    whileInView: {
      opacity: 1,
      y: 0
    },
    viewport: {
      once: !0,
      margin: "-50px"
    },
    transition: {
      duration: .75,
      delay: e,
      ease: [.22, 1, .36, 1]
    }
  }),
  Mw = () => {
    const e = [{
      num: "01",
      tag: "Analisi · Studio di fattibilità",
      title: "Valutazione e proiezioni di mercato",
      desc: "Non accettiamo ogni immobile. Partiamo da un audit rigoroso del tuo asset. Incrociamo i dati reali del tuo indirizzo con i nostri benchmark per offrirti tre proiezioni di guadagno realistiche (conservativa, media, ottima). Solo numeri, niente promesse fittizie."
    }, {
      num: "02",
      tag: "Setup · Ottimizzazione Asset",
      title: "Preparazione e scatti editoriali",
      desc: "Trasformiamo l'immobile in un prodotto premium progettato per convertire. Installazione sistemi smart, styling d'interni minimale, servizio fotografico professionale e copywriting neuromarketing. Tutto orchestrato per massimizzare la visibilità."
    }, {
      num: "03",
      tag: "Go Live · Intelligenza Artificiale",
      title: "Distribuzione e Dynamic Pricing",
      desc: "Sincronizzazione simultanea su Airbnb, Booking.com, VRBO e i nostri canali B2B Executive. I nostri algoritmi proprietari aggiornano le tue tariffe ogni 6 ore analizzando centinaia di variabili, garantendo il prezzo perfetto per ogni singola notte."
    }, {
      num: "04",
      tag: "Gestione · Trasparenza 100%",
      title: "Tu hai il controllo. Noi facciamo il lavoro.",
      desc: "Il nostro team multilingua gestisce il 100% dell'ospite H24 e delle manutenzioni. Tu non pensi a nulla, ma vedi tutto: tramite il tuo Owner Portal monitori in diretta le prenotazioni, il tasso di occupazione e le rendite nette. Bonifico e report automatici ogni mese."
    }];
    return u.jsxs("section", {
      id: "come-funziona",
      className: "bg-dark-900 relative overflow-hidden text-left",
      children: [u.jsx("div", {
        className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none",
        style: {
          background: "radial-gradient(ellipse, rgba(184,150,62,0.06) 0%, transparent 70%)"
        }
      }), u.jsx("div", {
        className: "py-28 md:py-36 relative z-10",
        children: u.jsxs("div", {
          className: "max-w-[1280px] mx-auto px-6 md:px-10",
          children: [u.jsxs(b.p, {
            ...Ao(0),
            className: "flex items-center gap-3 font-sans text-[13px] tracking-[0.25em] uppercase text-gold-500 mb-6",
            children: [u.jsx("span", {
              className: "w-8 h-px bg-gold-500"
            }), "Il Metodo VirtualBNB"]
          }), u.jsxs(b.h2, {
            ...Ao(.08),
            className: "font-serif font-light text-white leading-[1.1] mb-6",
            style: {
              fontSize: "clamp(42px, 5vw, 64px)"
            },
            children: ["Dall'analisi alla messa a reddito:", u.jsx("br", {}), u.jsx("em", {
              className: "italic text-gold-400",
              children: "un processo ingegnerizzato."
            })]
          }), u.jsx(b.p, {
            ...Ao(.16),
            className: "font-sans font-light text-[19px] text-dark-100 max-w-2xl leading-relaxed mb-20",
            children: "Non crediamo nelle formule magiche. Applichiamo un metodo rigoroso ed esclusivo per trasformare il tuo immobile in un vero asset ad alto rendimento, tutelando te e la tua proprietà."
          }), u.jsx("div", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-6",
            children: e.map((t, n) => u.jsxs(b.div, {
              initial: {
                opacity: 0,
                y: 40
              },
              whileInView: {
                opacity: 1,
                y: 0
              },
              viewport: {
                once: !0,
                margin: "-40px"
              },
              transition: {
                duration: .7,
                delay: n * .1,
                ease: [.22, 1, .36, 1]
              },
              className: "group relative p-10 md:p-14 bg-dark-800 border border-dark-700 hover:border-gold-500/40 transition-all duration-500 hover:-translate-y-2 cursor-default",
              style: {
                boxShadow: "0 4px 24px rgba(0,0,0,0.3)"
              },
              whileHover: {
                boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(184,150,62,0.08)"
              },
              children: [u.jsx("span", {
                className: "absolute top-6 right-8 font-serif font-light select-none pointer-events-none transition-all duration-500",
                style: {
                  fontSize: "140px",
                  lineHeight: 1,
                  color: "rgba(184,150,62,0.06)",
                  letterSpacing: "-0.02em"
                },
                children: t.num
              }), u.jsx("p", {
                className: "font-mono text-[12px] tracking-[0.2em] uppercase text-gold-500 mb-6 relative z-10",
                children: t.tag
              }), u.jsx("h3", {
                className: "font-serif text-[26px] font-normal text-white leading-snug mb-5 group-hover:text-gold-300 transition-colors duration-400 relative z-10",
                children: t.title
              }), u.jsx("p", {
                className: "font-sans font-light text-[18px] text-dark-100 leading-relaxed relative z-10",
                children: t.desc
              })]
            }, t.num))
          })]
        })
      })]
    })
  },
  Rw = () => {
    const e = () => {
        var n;
        return (n = document.getElementById("analisi")) == null ? void 0 : n.scrollIntoView({
          behavior: "smooth",
          block: "start"
        })
      },
      t = [{
        num: "01",
        icon: "⟳",
        title: "AI WhatsApp per i proprietari",
        desc: 'Scrivi qualsiasi domanda sul tuo appartamento via WhatsApp — in linguaggio naturale. "Quanto ho guadagnato questa settimana?" Risposta in 3 secondi. Nessun PM in Italia lo fa.',
        badge: "Esclusivo VirtualBNB"
      }, {
        num: "02",
        icon: "↗",
        title: "Direct booking engine",
        desc: "Ogni prenotazione diretta su VirtualBNB risparmia il 15-17% di commissione Airbnb. Quel risparmio si divide tra proprietario e noi. Tutti vincono — tranne le OTA.",
        badge: "Revenue aggiuntivo"
      }, {
        num: "03",
        icon: "◎",
        title: "Pricing AI — ogni 6 ore",
        desc: "200+ variabili in tempo reale: occupazione zona, eventi, meteo, trend. Il prezzo si ottimizza mentre dormi. +20% revenue medio vs prezzo fisso.",
        badge: "Pricelabs + Wheelhouse"
      }, {
        num: "04",
        icon: "▣",
        title: "Owner portal real-time",
        desc: "Dashboard personalizzata: revenue, occupazione, prenotazioni future, log manutenzioni aggiornati al secondo. Non aspetti il mese: vedi tutto adesso.",
        badge: "Accesso H24"
      }, {
        num: "05",
        icon: "✦",
        title: "Standard boutique hotel",
        desc: "Protocolli di pulizia da hotel. Checklist fotografica ad ogni checkout, manutenzione proattiva ogni 90 giorni, intervento entro 24h su ogni segnalazione.",
        badge: "Rating medio 4.9 ★"
      }, {
        num: "06",
        icon: "⬡",
        title: "Canale corporate B2B",
        desc: "Accordi diretti con aziende per alloggiare team in trasferta. Revenue garantito, contratti mensili. Un canale esclusivo che Airbnb non offre.",
        badge: "Esclusivo VirtualBNB"
      }];
    return u.jsxs("section", {
      id: "servizi",
      className: "bg-cream-100 relative text-left",
      children: [u.jsx("div", {
        className: "absolute top-0 left-0 right-0 h-12 pointer-events-none",
        style: {
          background: "linear-gradient(to bottom, rgba(10,10,10,0.08) 0%, transparent 100%)"
        }
      }), u.jsx("div", {
        className: "py-28 md:py-36",
        children: u.jsxs("div", {
          className: "max-w-[1280px] mx-auto px-6 md:px-10",
          children: [u.jsxs(b.p, {
            initial: {
              opacity: 0,
              x: -20
            },
            whileInView: {
              opacity: 1,
              x: 0
            },
            viewport: {
              once: !0
            },
            transition: {
              duration: .7
            },
            className: "flex items-center gap-3 font-sans text-[13px] tracking-[0.25em] uppercase text-gold-600 mb-6",
            children: [u.jsx("span", {
              className: "w-8 h-px bg-gold-600"
            }), "Perché VirtualBNB"]
          }), u.jsxs(b.h2, {
            initial: {
              opacity: 0,
              y: 36
            },
            whileInView: {
              opacity: 1,
              y: 0
            },
            viewport: {
              once: !0
            },
            transition: {
              duration: .8,
              delay: .08,
              ease: [.22, 1, .36, 1]
            },
            className: "font-serif font-light text-dark-900 leading-[1.1] mb-6",
            style: {
              fontSize: "clamp(42px, 5vw, 64px)"
            },
            children: ["Quello che nessun altro", u.jsx("br", {}), "property manager in Italia", u
              .jsx("em", {
                className: "italic text-gold-600",
                children: " offre."
              })
            ]
          }), u.jsx(b.p, {
            initial: {
              opacity: 0,
              y: 20
            },
            whileInView: {
              opacity: 1,
              y: 0
            },
            viewport: {
              once: !0
            },
            transition: {
              duration: .7,
              delay: .16
            },
            className: "font-sans font-light text-[19px] text-dark-200 max-w-xl leading-relaxed mb-20",
            children: "Sei differenziatori reali — non promesse generiche."
          }), u.jsx("div", {
            className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-10",
            children: t.map((n, r) => u.jsxs(b.div, {
              initial: {
                opacity: 0,
                y: 40
              },
              whileInView: {
                opacity: 1,
                y: 0
              },
              viewport: {
                once: !0,
                margin: "-30px"
              },
              transition: {
                duration: .7,
                delay: r * .08,
                ease: [.22, 1, .36, 1]
              },
              className: "group relative bg-white p-10 md:p-12 border border-cream-200 hover:border-gold-500/30 transition-all duration-500 hover:-translate-y-2 cursor-default",
              style: {
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)"
              },
              whileHover: {
                boxShadow: "0 20px 48px rgba(0,0,0,0.12)"
              },
              children: [u.jsx("span", {
                className: "absolute top-6 right-8 font-serif font-light select-none pointer-events-none transition-opacity duration-500",
                style: {
                  fontSize: "130px",
                  lineHeight: 1,
                  color: "rgba(184,150,62,0.07)",
                  letterSpacing: "-0.02em"
                },
                children: n.num
              }), u.jsx("span", {
                className: "font-mono text-[32px] text-gold-500 mb-6 block leading-none relative z-10",
                children: n.icon
              }), u.jsx("h3", {
                className: "font-serif text-[22px] font-normal text-dark-900 mb-4 leading-snug group-hover:text-gold-600 transition-colors duration-300 relative z-10",
                children: n.title
              }), u.jsx("p", {
                className: "font-sans font-light text-[17px] text-dark-200 leading-relaxed mb-6 relative z-10",
                children: n.desc
              }), u.jsx("span", {
                className: "font-mono text-[11px] tracking-[0.12em] uppercase text-gold-600 border-b border-gold-500/30 pb-0.5 relative z-10",
                children: n.badge
              })]
            }, n.title))
          }), u.jsxs(b.div, {
            initial: {
              opacity: 0,
              y: 32
            },
            whileInView: {
              opacity: 1,
              y: 0
            },
            viewport: {
              once: !0
            },
            transition: {
              duration: .8,
              delay: .2,
              ease: [.22, 1, .36, 1]
            },
            className: "bg-dark-900 p-12 md:p-16 flex items-center justify-between gap-12 flex-wrap",
            style: {
              boxShadow: "0 8px 40px rgba(0,0,0,0.25)"
            },
            children: [u.jsxs("div", {
              children: [u.jsx("p", {
                className: "font-mono text-[12px] tracking-[0.2em] uppercase text-gold-500 mb-4",
                children: "Prodotto premium"
              }), u.jsx("h3", {
                className: "font-serif text-[32px] font-normal text-white mb-4",
                children: "Guaranteed Yield — The Minimum Guaranteed Income"
              }), u.jsx("p", {
                className: "font-sans font-light text-[18px] text-dark-100 leading-relaxed max-w-2xl",
                children: "Per i proprietari che vogliono certezza totale: VirtualBNB garantisce una rendita mensile minima contrattuale. Se superiamo il target, dividiamo il surplus. Zero rischio per te, massimo incentivo per noi."
              })]
            }), u.jsx("button", {
              onClick: e,
              className: "whitespace-nowrap font-sans text-[13px] font-medium tracking-[0.15em] uppercase bg-gold-500 text-black px-10 py-5 hover:bg-gold-400 transition-all duration-300 flex-shrink-0 hover:-translate-y-0.5",
              style: {
                boxShadow: "0 4px 20px rgba(184,150,62,0.3)"
              },
              children: "Scopri se sei idoneo →"
            })]
          })]
        })
      })]
    })
  },
  Dw = () => {
    const e = [{
      type: "Da Affitto Tradizionale a VirtualBNB",
      title: "Bilocale in Zona Porta Romana",
      oldRevenue: "€1.100/mese",
      newRevenue: "€3.450/mese",
      increase: "+213%",
      story: "Il proprietario aveva l'appartamento in affitto tradizionale 4+4 a 1.100€ al mese, spesso in ritardo coi pagamenti. Grazie a VirtualBNB e all'implementazione del nostro AI Pricing, intercetta costantemente i viaggiatori corporate e gli eventi di Milano (Design Week, Fashion Week). L'appartamento è curato, controllato giornalmente tramite la nostra checklist fotografica da hotel e non si usura.",
      guestType: "Clientela B2B & Manager in Trasferta",
      photo: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80"
    }, {
      type: "Da Ex Property Manager a Noi",
      title: "Trilocale Luxury Navigli",
      oldRevenue: "€3.200/mese",
      newRevenue: "€5.100/mese",
      increase: "+59%",
      story: "Affidato inizialmente a una nota agenzia tradizionale che operava con un prezzo semi-fisso tutto l'anno. Il nostro tool di Wheelhouse & Pricelabs aggiorna i prezzi ogni 6 ore analizzando fiera per fiera. Durante il Salone del Mobile abbiamo massimizzato a 1.200€/notte, occupandolo non solo su Airbnb ma tramite le nostre partnership dirette a commissione zero.",
      guestType: "Famiglie Premium & Design Week",
      photo: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
    }];
    return u.jsxs("section", {
      id: "risultati",
      className: "bg-dark-900 relative overflow-hidden text-left border-y border-gold-500/10",
      children: [u.jsx("div", {
        className: "absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none",
        style: {
          background: "radial-gradient(circle at right, rgba(184,150,62,0.05) 0%, transparent 60%)"
        }
      }), u.jsx("div", {
        className: "py-28 md:py-36 relative z-10",
        children: u.jsxs("div", {
          className: "max-w-[1280px] mx-auto px-6 md:px-10",
          children: [u.jsx(b.p, {
            initial: {
              opacity: 0,
              x: -20
            },
            whileInView: {
              opacity: 1,
              x: 0
            },
            viewport: {
              once: !0
            },
            transition: {
              duration: .7
            },
            className: "flex flex-col gap-1 font-sans text-[13px] md:text-[14px] tracking-[0.25em] uppercase text-gold-500 mb-6",
            children: u.jsxs("span", {
              className: "flex items-center gap-3",
              children: [u.jsx("span", {
                className: "w-8 h-px bg-gold-500"
              }), "Esempi Storici & Simulazioni"]
            })
          }), u.jsxs(b.h2, {
            initial: {
              opacity: 0,
              y: 36
            },
            whileInView: {
              opacity: 1,
              y: 0
            },
            viewport: {
              once: !0
            },
            transition: {
              duration: .8,
              delay: .08,
              ease: [.22, 1, .36, 1]
            },
            className: "font-serif font-light text-white leading-[1.1] mb-16",
            style: {
              fontSize: "clamp(42px, 5vw, 64px)"
            },
            children: ["Risultati che", u.jsx("br", {}), u.jsx("em", {
              className: "italic text-gold-400",
              children: "prendono vita."
            })]
          }), u.jsx("div", {
            className: "flex flex-col gap-12 md:gap-16",
            children: e.map((t, n) => u.jsxs(b.div, {
              initial: {
                opacity: 0,
                y: 40
              },
              whileInView: {
                opacity: 1,
                y: 0
              },
              viewport: {
                once: !0,
                margin: "-50px"
              },
              transition: {
                duration: .8,
                delay: n * .15,
                ease: [.22, 1, .36, 1]
              },
              className: `group flex flex-col ${n%2!==0?"md:flex-row-reverse":"md:flex-row"} gap-10 md:gap-16 items-center p-8 md:p-12 bg-dark-800 border border-dark-700`,
              style: {
                boxShadow: "0 8px 30px rgba(0,0,0,0.3)"
              },
              children: [u.jsxs("div", {
                className: "w-full md:w-1/2 relative h-[300px] md:h-[400px]",
                children: [u.jsx("img", {
                  src: t.photo,
                  alt: t.title,
                  className: "w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                }), u.jsx("div", {
                  className: "absolute inset-0 border border-gold-500/20"
                })]
              }), u.jsxs("div", {
                className: "w-full md:w-1/2 flex flex-col justify-center",
                children: [u.jsx("p", {
                  className: "font-mono text-[13px] tracking-[0.15em] uppercase text-gold-500 mb-3",
                  children: t.type
                }), u.jsx("h3", {
                  className: "font-serif text-[32px] md:text-[38px] text-white font-normal mb-8 leading-snug",
                  children: t.title
                }), u.jsxs("div", {
                  className: "flex flex-wrap gap-8 mb-8 pb-8 border-b border-white/10",
                  children: [u.jsxs("div", {
                    children: [u.jsx("p", {
                      className: "font-sans text-[12px] uppercase tracking-widest text-dark-200 mb-1",
                      children: "Precedente"
                    }), u.jsx("p", {
                      className: "font-mono text-[24px] text-dark-100 line-through decoration-red-500/50",
                      children: t.oldRevenue
                    })]
                  }), u.jsxs("div", {
                    children: [u.jsx("p", {
                      className: "font-sans text-[12px] uppercase tracking-widest text-gold-500 mb-1",
                      children: "Con VirtualBNB"
                    }), u.jsxs("p", {
                      className: "font-mono text-[34px] text-white",
                      children: [t.newRevenue, u.jsx("span", {
                        className: "text-green-400 text-[18px] ml-3 align-middle",
                        children: t.increase
                      })]
                    })]
                  })]
                }), u.jsx("p", {
                  className: "font-sans font-light text-[17px] md:text-[18px] text-dark-100 leading-relaxed max-w-xl mb-6",
                  children: t.story
                }), u.jsxs("p", {
                  className: "font-sans font-medium text-[13px] tracking-[0.1em] uppercase text-dark-200",
                  children: [u.jsx("span", {
                    className: "text-gold-500",
                    children: "Ospiti tipo:"
                  }), " ", t.guestType]
                })]
              })]
            }, t.title))
          })]
        })
      })]
    })
  },
  Vo = (e = 0) => ({
    initial: {
      opacity: 0,
      y: 36
    },
    whileInView: {
      opacity: 1,
      y: 0
    },
    viewport: {
      once: !0,
      margin: "-40px"
    },
    transition: {
      duration: .75,
      delay: e,
      ease: [.22, 1, .36, 1]
    }
  }),
  Lw = () => {
    const e = () => {
        var n;
        return (n = document.getElementById("analisi")) == null ? void 0 : n.scrollIntoView({
          behavior: "smooth",
          block: "start"
        })
      },
      t = [{
        tier: "01",
        name: "Essenziale",
        desc: "Per chi inizia o vuole testare il mercato con una gestione base.",
        price: "25%",
        priceNote: "sul revenue netto",
        setup: "Setup: €350 una tantum",
        features: ["Check-in/out digitale via Smart Lock", "Gestione multi-calendario (Airbnb, Booking)",
          "Pricing Dinamico base", "Report mensile semplice"
        ],
        featured: !1,
        cta: "Inizia con Essenziale"
      }, {
        tier: "02",
        name: "Smart",
        desc: "Il sistema completo per massimizzare la rendita col minimo impegno.",
        price: "28%",
        priceNote: "sul revenue netto",
        setup: "Setup: €450 una tantum",
        features: ["Assistenza ospiti attiva H24", "AI WhatsApp per il proprietario",
          "Manutenzione proattiva inclusa (max €100)", "Distribuzione Premium Multi-Canale",
          "Opzione Guaranteed Yield"
        ],
        featured: !0,
        cta: "Scegli Smart — Il più Popolare"
      }, {
        tier: "03",
        name: "Premium",
        desc: "Per appartamenti luxury o investitori multi-property. Servizio white-glove.",
        price: "€650",
        priceNote: "/mese fisso",
        setup: "Zero commissioni sul revenue",
        features: ["Revenue management proattivo umano", "Concierge VIP per ospiti", "Shooting fotografico annuale",
          "Account manager dedicato", "SLA: Risposta garantita entro 2 ore"
        ],
        featured: !1,
        cta: "Richiedi Premium"
      }];
    return u.jsxs("section", {
      id: "prezzi",
      className: "bg-dark-900 relative overflow-hidden text-left",
      children: [u.jsx("div", {
        className: "absolute top-0 left-0 right-0 h-16 pointer-events-none",
        style: {
          background: "linear-gradient(to bottom, rgba(245,240,232,0.05) 0%, transparent 100%)"
        }
      }), u.jsx("div", {
        className: "py-28 md:py-36",
        children: u.jsxs("div", {
          className: "max-w-[1280px] mx-auto px-6 md:px-10",
          children: [u.jsxs(b.p, {
            ...Vo(0),
            className: "flex items-center gap-3 font-sans text-[14px] tracking-[0.25em] uppercase text-gold-500 mb-6",
            children: [u.jsx("span", {
              className: "w-8 h-px bg-gold-500"
            }), "Commissioni"]
          }), u.jsxs(b.h2, {
            ...Vo(.08),
            className: "font-serif font-light text-white leading-[1.1] mb-6",
            style: {
              fontSize: "clamp(42px, 5vw, 64px)"
            },
            children: ["Trasparenza totale,", u.jsx("br", {}), "anche sul nostro ", u.jsx("em", {
              className: "italic text-gold-400",
              children: "guadagno."
            })]
          }), u.jsx(b.p, {
            ...Vo(.16),
            className: "font-sans font-light text-[19px] text-dark-100 max-w-2xl leading-relaxed mb-24",
            children: "Nessuna commissione nascosta. Nessuna sorpresa. Solo performance — e i tuoi numeri che aumentano."
          }), u.jsx("div", {
            className: "grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10",
            children: t.map((n, r) => u.jsxs(b.div, {
              initial: {
                opacity: 0,
                y: 48
              },
              whileInView: {
                opacity: 1,
                y: 0
              },
              viewport: {
                once: !0,
                margin: "-20px"
              },
              transition: {
                duration: .75,
                delay: r * .12,
                ease: [.22, 1, .36, 1]
              },
              className: `relative flex flex-col pt-12 p-8 md:p-12 transition-all duration-500 hover:-translate-y-2 ${n.featured?"border border-gold-500 bg-dark-800":"border border-dark-700 bg-dark-800/80 hover:border-gold-500/40"}`,
              style: {
                boxShadow: n.featured ?
                  "0 12px 60px rgba(184,150,62,0.15), 0 4px 20px rgba(0,0,0,0.4)" :
                  "0 8px 30px rgba(0,0,0,0.2)"
              },
              children: [n.featured && u.jsx("div", {
                className: "absolute top-0 left-0 right-0 bg-gold-500 text-black font-sans text-[12px] font-semibold tracking-[0.15em] uppercase text-center py-3",
                children: "★ Tier Più Scelto"
              }), u.jsxs("div", {
                className: "flex flex-col flex-1",
                children: [u.jsxs("h3", {
                  className: "font-serif text-[32px] font-normal text-white mb-2 flex items-center justify-between",
                  children: [n.name, u.jsx("span", {
                    className: "font-mono text-[16px] tracking-widest text-gold-500/60 uppercase",
                    children: n.tier
                  })]
                }), u.jsx("p", {
                  className: "font-sans font-light text-[17px] text-dark-100 leading-relaxed mb-8 h-16",
                  children: n.desc
                }), u.jsxs("div", {
                  className: "mb-6 pb-6 border-b border-white/10",
                  children: [u.jsxs("div", {
                    children: [u.jsx("span", {
                      className: "font-mono text-[64px] font-light leading-none text-white tracking-tighter",
                      children: n.price
                    }), u.jsx("span", {
                      className: "font-sans text-[15px] font-light text-gold-500 ml-2 block mt-2",
                      children: n.priceNote
                    })]
                  }), u.jsx("p", {
                    className: "font-mono text-[13px] text-dark-200 mt-4 px-4 py-2 bg-dark-700 inline-block",
                    children: n.setup
                  })]
                }), u.jsx("ul", {
                  className: "flex-1 mb-12 space-y-5",
                  children: n.features.map(i => u.jsxs("li", {
                    className: "flex items-start gap-4 font-sans font-light text-[17px] text-dark-100 leading-snug",
                    children: [u.jsx("span", {
                      className: "text-gold-500 flex-shrink-0 text-[18px]",
                      children: "✓"
                    }), i]
                  }, i))
                }), u.jsx("button", {
                  onClick: e,
                  className: `w-full font-sans text-[14px] font-semibold tracking-[0.15em] uppercase py-6 transition-all duration-300 mt-auto ${n.featured?"bg-gold-500 text-black hover:bg-gold-400":"bg-dark-700 text-white hover:bg-gold-500 hover:text-black"}`,
                  children: n.cta
                })]
              })]
            }, n.name))
          })]
        })
      })]
    })
  },
  Ei = (e = 0) => ({
    initial: {
      opacity: 0,
      y: 36
    },
    whileInView: {
      opacity: 1,
      y: 0
    },
    viewport: {
      once: !0,
      margin: "-40px"
    },
    transition: {
      duration: .75,
      delay: e,
      ease: [.22, 1, .36, 1]
    }
  }),
  Iw = () => {
    const [e, t] = C.useState(0), n = [{
      title: "Pricing & Revenue",
      competitor: "Prezzi fissi per alta e bassa stagione, o aggiustamenti manuali una volta al mese. Poca flessibilità.",
      us: "Prezzi dinamici aggiornati ogni 6 ore dall'AI. Analizziamo micro-dati locali, eventi e trend per massimizzare ogni singola notte."
    }, {
      title: "Contratti & Rischio",
      competitor: "Gestione standard o affitto lungo 4+4. In caso di morosità, l'iter legale dura mesi ed è a tue spese.",
      us: "Opzione Guaranteed Yield: concordiamo una rendita fissa, e il rischio di sfitto ce lo assumiamo noi. Entrata garantita."
    }, {
      title: "Reportistica & Dati",
      competitor: "Un PDF mensile confuso inviato per email, difficile da leggere e spesso in ritardo.",
      us: "Owner Portal digitale live con metriche real-time accessibile H24, più report automatici completi il primo del mese."
    }, {
      title: "Canali di Vendita",
      competitor: "Il tuo appartamento è visibile quasi esclusivamente su Airbnb, subendo le bizze del loro algoritmo.",
      us: "Multi-OTA Premium (Booking, VRBO, etc.) e, soprattutto, un network B2B diretto per aziende a zero commissioni esterne."
    }, {
      title: "Cura & Manutenzione",
      competitor: "Pulizie di base, interventi reattivi solo quando l'ospite si lamenta. L'immobile si deperisce velocemente.",
      us: "Manutenzione proattiva, check fotografici a ogni checkout e consulenza di Home Staging iniziale. L'asset migliora nel tempo."
    }];
    return u.jsxs("section", {
      id: "confronto",
      className: "bg-dark-900 relative overflow-hidden text-left py-28 md:py-36 border-t border-gold-500/10",
      children: [u.jsx("div", {
        className: "absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none",
        style: {
          background: "radial-gradient(circle at center, rgba(184,150,62,0.06) 0%, transparent 60%)"
        }
      }), u.jsxs("div", {
        className: "max-w-[1280px] mx-auto px-6 md:px-10 relative z-10",
        children: [u.jsxs(b.p, {
          ...Ei(0),
          className: "flex items-center gap-3 font-sans text-[13px] tracking-[0.25em] uppercase text-gold-500 mb-6",
          children: [u.jsx("span", {
            className: "w-8 h-px bg-gold-500"
          }), "Il Divario"]
        }), u.jsxs(b.h2, {
          ...Ei(.08),
          className: "font-serif font-light text-white leading-[1.1] mb-20",
          style: {
            fontSize: "clamp(42px, 5vw, 64px)"
          },
          children: ["Cosa ci distingue", u.jsx("br", {}), "dal ", u.jsx("em", {
            className: "italic text-gold-400",
            children: "mercato tradizionale."
          })]
        }), u.jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start",
          children: [u.jsx(b.div, {
            ...Ei(.15),
            className: "lg:col-span-4 flex flex-col gap-2",
            children: n.map((r, i) => {
              const s = e === i;
              return u.jsxs("button", {
                onClick: () => t(i),
                className: `text-left px-6 py-5 transition-all duration-300 font-sans tracking-wide ${s?"bg-dark-800 text-gold-400 border-l-2 border-gold-500 shadow-[0_4px_24px_rgba(0,0,0,0.3)]":"bg-transparent text-dark-200 border-l-2 border-dark-700 hover:text-white hover:border-dark-400 hover:bg-dark-800/50"}`,
                children: [u.jsxs("span", {
                  className: "font-mono text-[12px] opacity-50 mr-4",
                  children: ["0", i + 1]
                }), u.jsx("span", {
                  className: `text-[17px] md:text-[19px] ${s?"font-medium":"font-light"}`,
                  children: r.title
                })]
              }, r.title)
            })
          }), u.jsx(b.div, {
            ...Ei(.25),
            className: "lg:col-span-8",
            children: u.jsxs("div", {
              className: "bg-dark-800 border border-dark-700 p-8 md:p-14 relative",
              style: {
                minHeight: "400px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
              },
              children: [u.jsx("div", {
                className: "absolute top-0 right-0 w-32 h-32 bg-gold-500/10 blur-[50px] pointer-events-none"
              }), u.jsx(rt, {
                mode: "wait",
                children: u.jsxs(b.div, {
                  initial: {
                    opacity: 0,
                    x: 20
                  },
                  animate: {
                    opacity: 1,
                    x: 0
                  },
                  exit: {
                    opacity: 0,
                    x: -20
                  },
                  transition: {
                    duration: .4,
                    ease: [.22, 1, .36, 1]
                  },
                  className: "flex flex-col h-full justify-between",
                  children: [u.jsxs("div", {
                    className: "mb-14",
                    children: [u.jsx("p", {
                      className: "font-mono text-[13px] tracking-widest text-dark-300 uppercase mb-4",
                      children: "Metodo Tradizionale"
                    }), u.jsxs("div", {
                      className: "flex gap-4 items-start",
                      children: [u.jsx("span", {
                        className: "text-red-500/80 font-serif text-[24px] leading-none mt-1",
                        children: "✕"
                      }), u.jsxs("p", {
                        className: "font-sans font-light text-[18px] md:text-[20px] text-dark-200 leading-relaxed italic",
                        children: ['"', n[e].competitor, '"']
                      })]
                    })]
                  }), u.jsxs("div", {
                    className: "relative p-8 md:p-10 border border-gold-500/30 bg-dark-900 shadow-[0_0_40px_rgba(184,150,62,0.08)]",
                    children: [u.jsx("div", {
                      className: "absolute -top-3 left-8 bg-dark-900 px-3 font-mono text-[11px] font-semibold tracking-widest text-gold-500 uppercase",
                      children: "L'Approccio VirtualBNB"
                    }), u.jsxs("div", {
                      className: "flex gap-4 items-start",
                      children: [u.jsx("span", {
                        className: "text-gold-500 font-serif text-[28px] leading-none mt-1",
                        children: "✓"
                      }), u.jsx("p", {
                        className: "font-sans font-normal text-[19px] md:text-[22px] text-white leading-relaxed",
                        children: n[e].us
                      })]
                    })]
                  })]
                }, e)
              })]
            })
          })]
        })]
      })]
    })
  },
  Mo = (e = 0) => ({
    initial: {
      opacity: 0,
      y: 36
    },
    whileInView: {
      opacity: 1,
      y: 0
    },
    viewport: {
      once: !0,
      margin: "-40px"
    },
    transition: {
      duration: .75,
      delay: e,
      ease: [.22, 1, .36, 1]
    }
  }),
  _w = () => {
    const [e, t] = C.useState(0), n = () => {
      var i;
      return (i = document.getElementById("contatti")) == null ? void 0 : i.scrollIntoView({
        behavior: "smooth",
        block: "start"
      })
    }, r = [{
      label: "Executive Travel",
      num: "01",
      title: "Consulenti e manager in trasferta",
      desc: "Soggiorni 2-8 settimane. Appartamenti premium, fattura aziendale, check-in autonomo H24. Risparmio del 35-40% vs hotel.",
      revenue: "€90-120/notte · Contratti annuali",
      pitchQuote: `"Riduciamo il vostro budget accommodation del 35%, eliminiamo la gestione operativa, e vi diamo un'unica fattura mensile."`,
      savings: [{
        num: "-35%",
        label: "Risparmio vs hotel per soggiorni lunghi"
      }, {
        num: "H24",
        label: "Check-in digitale senza attese"
      }, {
        num: "1",
        label: "Singola fattura mensile consolidata"
      }, {
        num: "0",
        label: "Gestione operativa richiesta all'HR"
      }]
    }, {
      label: "Relocation",
      num: "02",
      title: "Dipendenti in relocation",
      desc: 'Soggiorni 1-6 mesi. Appartamento arredato, bollette incluse, logistica. Pacchetto "Soft Landing" per nuovi assunti e manager.',
      revenue: "€2k-4k/mese · Contratti stabili",
      pitchQuote: `"Offrite ai vostri talenti un'esperienza di atterraggio di classe, ovunque si trovino, con utenze pre-attivate e un concierge dedicato."`,
      savings: [{
        num: "100%",
        label: "Bollette e oneri già inclusi"
      }, {
        num: "VIP",
        label: "Executive Soft Landing package"
      }, {
        num: "FAST",
        label: "Burocrazia e contratti istantanei"
      }, {
        num: "24h",
        label: "Supporto per manutenzioni"
      }]
    }, {
      label: "Shooting & Events",
      num: "03",
      title: "Produzioni e brand internazionali",
      desc: "Fashion week, shooting, team creativi. Appartamenti premium con fattura, altissima professionalità e massima privacy.",
      revenue: "Tariffa 2-3x · Alta marginalità",
      pitchQuote: '"Spazi iconici pronti per la produzione. Alta redditività per il proprietario, set perfetto e flessibile per le agenzie creative."',
      savings: [{
        num: "TOP",
        label: "Location esclusive e luminose"
      }, {
        num: "FLEX",
        label: "Check-in/out elastici per crew"
      }, {
        num: "1",
        label: "Fatturazione business immediata"
      }, {
        num: "PRO",
        label: "Pulizie profonde post-produzione"
      }]
    }, {
      label: "Aviation & Crew",
      num: "04",
      title: "Academy e Hostess/Steward",
      desc: "Alloggi per corsisti di compagnie aeree (es. Ryanair) in addestramento vicino ai grandi Hub. Flussi costanti garantiti da turnover continuo.",
      revenue: "Guadagno costante senza stagionalità",
      pitchQuote: '"Il massimo del comfort casalingo per i vostri corsisti: logistica e fatturazione azzerate per la vostra accademia di volo."',
      savings: [{
        num: "365d",
        label: "Domanda del tutto destagionalizzata"
      }, {
        num: "HUB",
        label: "Perfetto per immobili vicini agli aeroporti"
      }, {
        num: "B2B",
        label: "Fatturazione diretta alla compagnia"
      }, {
        num: "100%",
        label: "Turnover mensile costante e prevedibile"
      }]
    }];
    return u.jsxs("section", {
      id: "corporate",
      className: "bg-dark-800 relative overflow-hidden text-left",
      children: [u.jsx("div", {
        className: "absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none",
        style: {
          background: "radial-gradient(circle, rgba(184,150,62,0.07) 0%, transparent 70%)"
        }
      }), u.jsx("div", {
        className: "py-28 md:py-36 relative z-10",
        children: u.jsxs("div", {
          className: "max-w-[1280px] mx-auto px-6 md:px-10",
          children: [u.jsxs(b.p, {
            ...Mo(0),
            className: "flex items-center gap-3 font-sans text-[13px] tracking-[0.25em] uppercase text-gold-500 mb-6",
            children: [u.jsx("span", {
              className: "w-8 h-px bg-gold-500"
            }), "Network Executive"]
          }), u.jsxs(b.h2, {
            ...Mo(.08),
            className: "font-serif font-light text-white leading-[1.1] mb-20",
            style: {
              fontSize: "clamp(42px, 5vw, 64px)"
            },
            children: ["Per le aziende che", u.jsx("br", {}), u.jsx("em", {
              className: "italic text-gold-400",
              children: "viaggiano e si espandono."
            })]
          }), u.jsxs("div", {
            className: "grid grid-cols-1 lg:grid-cols-2 gap-14 items-start relative",
            children: [u.jsx("div", {
              className: "flex flex-col gap-6",
              children: r.map((i, s) => {
                const o = e === s;
                return u.jsxs(b.div, {
                  initial: {
                    opacity: 0,
                    x: -32
                  },
                  whileInView: {
                    opacity: 1,
                    x: 0
                  },
                  viewport: {
                    once: !0
                  },
                  transition: {
                    delay: s * .12,
                    duration: .7,
                    ease: [.22, 1, .36, 1]
                  },
                  onClick: () => t(s),
                  className: `group relative p-10 md:p-12 transition-all duration-500 cursor-pointer ${o?"bg-dark-900 border border-gold-500":"bg-dark-900/50 border border-dark-700 hover:border-gold-500/40 hover:-translate-y-1.5"}`,
                  style: {
                    boxShadow: o ? "0 12px 40px rgba(184,150,62,0.15)" :
                      "0 4px 24px rgba(0,0,0,0.3)"
                  },
                  children: [u.jsx("span", {
                    className: "absolute top-6 right-8 font-serif font-light select-none pointer-events-none transition-colors duration-500",
                    style: {
                      fontSize: "110px",
                      lineHeight: 1,
                      color: o ? "rgba(184,150,62,0.1)" :
                        "rgba(184,150,62,0.05)"
                    },
                    children: i.num
                  }), u.jsx("p", {
                    className: `font-mono text-[12px] tracking-[0.2em] uppercase mb-4 relative z-10 transition-colors ${o?"text-white":"text-gold-500"}`,
                    children: i.label
                  }), u.jsx("h3", {
                    className: `font-serif text-[24px] font-normal mb-4 relative z-10 transition-colors duration-300 ${o?"text-gold-400":"text-white group-hover:text-gold-300"}`,
                    children: i.title
                  }), u.jsx("p", {
                    className: "font-sans font-light text-[18px] text-dark-100 leading-relaxed mb-6 relative z-10",
                    children: i.desc
                  }), u.jsx("p", {
                    className: "font-mono text-[13px] text-gold-600 relative z-10",
                    children: i.revenue
                  })]
                }, i.title)
              })
            }), u.jsx("div", {
              className: "lg:sticky lg:top-32",
              children: u.jsxs(b.div, {
                ...Mo(.2),
                className: "bg-cream-100 p-12 md:p-16 relative overflow-hidden",
                style: {
                  boxShadow: "0 20px 70px rgba(0,0,0,0.4)"
                },
                children: [u.jsx("div", {
                  className: "absolute top-0 left-0 right-0 h-1.5 bg-gold-500"
                }), u.jsx(rt, {
                  mode: "wait",
                  children: u.jsxs(b.div, {
                    initial: {
                      opacity: 0,
                      y: 10
                    },
                    animate: {
                      opacity: 1,
                      y: 0
                    },
                    exit: {
                      opacity: 0,
                      y: -10
                    },
                    transition: {
                      duration: .3
                    },
                    children: [u.jsx("p", {
                      className: "font-serif text-[22px] font-light italic leading-relaxed text-dark-900 mb-10 pb-10 border-b border-cream-300 min-h-[140px]",
                      children: r[e].pitchQuote
                    }), u.jsx("div", {
                      className: "grid grid-cols-2 gap-10 mb-12",
                      children: r[e].savings.map((i, s) => u.jsxs("div", {
                        children: [u.jsx("span", {
                          className: "font-mono text-[42px] font-light text-gold-600 block leading-none",
                          children: i.num
                        }), u.jsx("p", {
                          className: "font-sans font-light text-[17px] text-dark-200 mt-3 leading-relaxed",
                          children: i.label
                        })]
                      }, s))
                    })]
                  }, e)
                }), u.jsx("button", {
                  onClick: n,
                  className: "w-full font-sans text-[13px] font-medium tracking-[0.15em] uppercase bg-dark-900 text-white py-5 hover:bg-gold-500 hover:text-black transition-all duration-400 relative z-20",
                  style: {
                    boxShadow: "0 4px 20px rgba(0,0,0,0.25)"
                  },
                  children: "Parla con noi per il Business"
                })]
              })
            })]
          })]
        })
      })]
    })
  },
  Ow = () => {
    const [e, t] = C.useState(0), n = [{
      num: "€2.847",
      label: "Revenue mese"
    }, {
      num: "84%",
      label: "Occupazione"
    }, {
      num: "€112",
      label: "RevPAR/notte"
    }, {
      num: "4.9 ★",
      label: "Rating medio"
    }], r = [{
      guest: "Sarah K. 🇬🇧 — 22-26 Apr",
      amount: "€448",
      active: !0
    }, {
      guest: "Marco B. — 28 Apr - 3 Mag",
      amount: "€535",
      active: !0
    }, {
      guest: "10-15 Mag — Disponibile",
      amount: "—",
      active: !1
    }], i = [{
      num: "01",
      title: "Dashboard real-time",
      desc: "Revenue, occupazione, RevPAR, prossimi ospiti. Aggiornato in tempo reale — non aspetti più fine mese per sapere come va il tuo investimento."
    }, {
      num: "02",
      title: "AI WhatsApp H24",
      desc: 'Nessun portale complesso. Chiedi al nostro sistema via WhatsApp in linguaggio naturale: "Quanto ho guadagnato?" e ricevi i dati istantaneamente.'
    }, {
      num: "03",
      title: "Report automatico",
      desc: "Il primo del mese ricevi il riepilogo fiscale perfetto da inviare al tuo commercialista. Revenue, tasse, spese di manutenzione e fatture deduci."
    }, {
      num: "04",
      title: "Benchmark di Mercato",
      desc: "Non ci basiamo su sensazioni. Confrontiamo il tuo appartamento con le medie esatte della tua città e quartiere, ottimizzando i prezzi."
    }];
    return u.jsxs("section", {
      id: "portale",
      className: "bg-cream-100 relative text-left",
      children: [u.jsx("div", {
        className: "absolute top-0 left-0 right-0 h-12 pointer-events-none",
        style: {
          background: "linear-gradient(to bottom, rgba(10,10,10,0.07) 0%, transparent 100%)"
        }
      }), u.jsx("div", {
        className: "py-28 md:py-36",
        children: u.jsxs("div", {
          className: "max-w-[1280px] mx-auto px-6 md:px-10",
          children: [u.jsxs(b.p, {
            initial: {
              opacity: 0,
              x: -20
            },
            whileInView: {
              opacity: 1,
              x: 0
            },
            viewport: {
              once: !0
            },
            transition: {
              duration: .7
            },
            className: "flex items-center gap-3 font-sans text-[13px] tracking-[0.25em] uppercase text-gold-600 mb-6",
            children: [u.jsx("span", {
              className: "w-8 h-px bg-gold-600"
            }), "Owner Portal"]
          }), u.jsxs(b.h2, {
            initial: {
              opacity: 0,
              y: 36
            },
            whileInView: {
              opacity: 1,
              y: 0
            },
            viewport: {
              once: !0
            },
            transition: {
              duration: .8,
              delay: .08,
              ease: [.22, 1, .36, 1]
            },
            className: "font-serif font-light text-dark-900 leading-[1.1] mb-20",
            style: {
              fontSize: "clamp(42px, 5vw, 64px)"
            },
            children: ["Il tuo asset, sempre", u.jsx("br", {}), u.jsx("em", {
              className: "italic text-gold-600",
              children: "davanti ai tuoi occhi."
            })]
          }), u.jsxs("div", {
            className: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-start",
            children: [u.jsxs(b.div, {
              initial: {
                opacity: 0,
                y: 40,
                scale: .97
              },
              whileInView: {
                opacity: 1,
                y: 0,
                scale: 1
              },
              viewport: {
                once: !0
              },
              transition: {
                duration: .9,
                ease: [.22, 1, .36, 1]
              },
              className: "bg-dark-900 p-8 md:p-10 font-mono relative overflow-hidden min-h-[500px]",
              style: {
                boxShadow: "0 24px 80px rgba(0,0,0,0.28), 0 4px 20px rgba(0,0,0,0.14)"
              },
              children: [u.jsxs("div", {
                className: "flex justify-between items-center text-[13px] text-dark-200 mb-8 pb-5 border-b border-gold-500/20 z-10 relative",
                children: [u.jsxs("span", {
                  className: "text-white flex items-center",
                  children: ["VirtualBNB · Insights", u.jsx("span", {
                    className: "text-[9px] text-gold-500 ml-3 border border-gold-500/30 px-2 py-0.5 rounded-sm bg-gold-500/10",
                    children: "SIMULAZIONE VISTA"
                  })]
                }), u.jsxs("span", {
                  className: "text-gold-500 flex items-center gap-2",
                  children: [u.jsx("span", {
                    className: "w-2 h-2 rounded-full bg-green-500 animate-pulse"
                  }), "Live"]
                })]
              }), u.jsxs(rt, {
                mode: "wait",
                children: [e === 0 && u.jsxs(b.div, {
                  initial: {
                    opacity: 0,
                    x: 20
                  },
                  animate: {
                    opacity: 1,
                    x: 0
                  },
                  exit: {
                    opacity: 0,
                    x: -20
                  },
                  transition: {
                    duration: .3
                  },
                  children: [u.jsx("div", {
                    className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8",
                    children: n.map(s => u.jsxs("div", {
                      className: "bg-dark-800 border border-gold-500/15 p-4 hover:border-gold-500/40 transition-colors",
                      children: [u.jsx("span", {
                        className: "text-gold-400 text-[22px] font-light block leading-none",
                        children: s.num
                      }), u.jsx("span", {
                        className: "text-[10px] text-dark-200 uppercase tracking-[0.07em] mt-3 block leading-tight",
                        children: s.label
                      })]
                    }, s.label))
                  }), u.jsx("p", {
                    className: "text-[12px] text-gold-500 uppercase tracking-[0.12em] mb-4",
                    children: "Prossime Prenotazioni"
                  }), r.map(s => u.jsxs("div", {
                    className: `flex justify-between items-center text-[13px] py-3.5 border-b border-white/5 ${s.active?"":"opacity-40"}`,
                    children: [u.jsxs("span", {
                      className: "text-white flex items-center gap-3",
                      children: [s.active && u.jsx("span", {
                        className: "w-1.5 h-1.5 rounded-full bg-gold-500"
                      }), s.guest]
                    }), u.jsx("span", {
                      className: "text-dark-100 font-medium",
                      children: s.amount
                    })]
                  }, s.guest))]
                }, "tab0"), e === 1 && u.jsx(b.div, {
                  initial: {
                    opacity: 0,
                    x: 20
                  },
                  animate: {
                    opacity: 1,
                    x: 0
                  },
                  exit: {
                    opacity: 0,
                    x: -20
                  },
                  transition: {
                    duration: .3
                  },
                  className: "flex flex-col h-full",
                  children: u.jsxs("div", {
                    className: "bg-dark-800 border border-white/5 p-4 rounded-t-lg mb-1",
                    children: [u.jsx("p", {
                      className: "text-[11px] text-dark-200 uppercase tracking-[0.15em] mb-2 text-center",
                      children: "Oggi"
                    }), u.jsx("div", {
                      className: "flex justify-end mb-4",
                      children: u.jsx("div", {
                        className: "bg-white text-dark-900 p-3 rounded-l-xl rounded-tr-xl max-w-[80%]",
                        children: u.jsx("p", {
                          className: "font-sans text-[14px]",
                          children: "Quanto ha generato l'appartamento in Via Roma questo mese?"
                        })
                      })
                    }), u.jsx("div", {
                      className: "flex justify-start",
                      children: u.jsx("div", {
                        className: "bg-gold-500/10 border border-gold-500/30 text-white p-4 rounded-r-xl rounded-tl-xl max-w-[90%]",
                        children: u.jsxs("p", {
                          className: "font-sans text-[14px] leading-relaxed",
                          children: [
                            "Questo mese hai generato ", u
                            .jsx("strong", {
                              className: "text-gold-400",
                              children: "€2.847 netti"
                            }), " (occupazione 84%).", u.jsx(
                              "br", {}), u.jsx("br", {}),
                            "Hai un prossimo check-in domani alle 15:00 (Sarah K., Londra). La pulizia è già stata completata e supervisionata."
                          ]
                        })
                      })
                    })]
                  })
                }, "tab1"), e === 2 && u.jsx(b.div, {
                  initial: {
                    opacity: 0,
                    x: 20
                  },
                  animate: {
                    opacity: 1,
                    x: 0
                  },
                  exit: {
                    opacity: 0,
                    x: -20
                  },
                  transition: {
                    duration: .3
                  },
                  children: u.jsxs("div", {
                    className: "border-2 border-dashed border-dark-700 p-10 flex flex-col items-center justify-center text-center bg-dark-800/50",
                    children: [u.jsx("div", {
                      className: "w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center mb-6",
                      children: u.jsx("svg", {
                        className: "w-8 h-8 text-gold-500",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        children: u.jsx("path", {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 1,
                          d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        })
                      })
                    }), u.jsx("h4", {
                      className: "font-serif text-[24px] text-white mb-2",
                      children: "Report Mensile Generato"
                    }), u.jsx("p", {
                      className: "font-sans font-light text-[15px] text-dark-200 mb-8 max-w-xs",
                      children: "Il report fiscale per il tuo commercialista è pronto per l'export."
                    }), u.jsx("button", {
                      className: "font-sans text-[12px] uppercase tracking-widest bg-gold-500 text-black px-8 py-3 hover:bg-white transition-colors",
                      children: "Scarica PDF"
                    })]
                  })
                }, "tab2"), e === 3 && u.jsx(b.div, {
                  initial: {
                    opacity: 0,
                    x: 20
                  },
                  animate: {
                    opacity: 1,
                    x: 0
                  },
                  exit: {
                    opacity: 0,
                    x: -20
                  },
                  transition: {
                    duration: .3
                  },
                  children: u.jsxs("div", {
                    className: "space-y-6",
                    children: [u.jsxs("div", {
                      children: [u.jsxs("div", {
                        className: "flex justify-between items-end mb-2",
                        children: [u.jsx("p", {
                          className: "font-sans text-[14px] text-white",
                          children: "Tuo RevPAR Medio"
                        }), u.jsx("p", {
                          className: "font-mono text-[18px] text-gold-400",
                          children: "€112"
                        })]
                      }), u.jsx("div", {
                        className: "w-full bg-dark-700 h-2 rounded-full overflow-hidden",
                        children: u.jsx("div", {
                          className: "bg-gold-500 h-full w-[85%]"
                        })
                      })]
                    }), u.jsxs("div", {
                      children: [u.jsxs("div", {
                        className: "flex justify-between items-end mb-2",
                        children: [u.jsx("p", {
                          className: "font-sans text-[14px] text-dark-200",
                          children: "Media Competitors (Stessa Zona)"
                        }), u.jsx("p", {
                          className: "font-mono text-[18px] text-dark-200",
                          children: "€84"
                        })]
                      }), u.jsx("div", {
                        className: "w-full bg-dark-800 h-2 rounded-full overflow-hidden",
                        children: u.jsx("div", {
                          className: "bg-dark-400 h-full w-[55%]"
                        })
                      })]
                    }), u.jsx("div", {
                      className: "mt-10 p-5 border border-gold-500/20 bg-dark-800",
                      children: u.jsxs("p", {
                        className: "font-sans font-light text-[15px] text-dark-100",
                        children: [
                          "Il tuo asset sta performando nel ", u
                          .jsx("strong", {
                            className: "text-white",
                            children: "Top 15%"
                          }),
                          " del mercato locale grazie alle strategie proattive di dynamic pricing."
                        ]
                      })
                    })]
                  })
                }, "tab3")]
              })]
            }), u.jsx(b.div, {
              initial: {
                opacity: 0,
                x: 32
              },
              whileInView: {
                opacity: 1,
                x: 0
              },
              viewport: {
                once: !0
              },
              transition: {
                duration: .8,
                delay: .15,
                ease: [.22, 1, .36, 1]
              },
              children: i.map((s, o) => {
                const a = e === o;
                return u.jsxs("div", {
                  onClick: () => t(o),
                  className: `group flex gap-6 md:gap-8 items-start py-6 md:py-8 border-b border-dark-900/10 cursor-pointer transition-all duration-300 ${a?"opacity-100":"opacity-100 hover:bg-black/5 px-4 -mx-4 rounded-xl"}`,
                  children: [u.jsx("span", {
                    className: `font-mono text-[14px] flex-shrink-0 mt-1 transition-colors ${a?"text-gold-600 font-bold":"text-dark-700 font-medium group-hover:text-gold-600"}`,
                    children: s.num
                  }), u.jsxs("div", {
                    className: "flex-1",
                    children: [u.jsxs("div", {
                      className: "flex justify-between items-center mb-2",
                      children: [u.jsx("h3", {
                        className: `font-serif text-[22px] md:text-[24px] font-normal transition-colors duration-300 ${a?"text-dark-900":"text-dark-700 group-hover:text-dark-900"}`,
                        children: s.title
                      }), !a && u.jsxs("div", {
                        className: "flex items-center gap-2 text-dark-500 group-hover:text-gold-600 transition-colors",
                        children: [u.jsx("span", {
                          className: "font-mono text-[10px] tracking-widest uppercase border border-dark-900/20 px-2 py-1 rounded-sm group-hover:border-gold-500/50 group-hover:bg-gold-500/10",
                          children: "Anteprima"
                        }), u.jsx("svg", {
                          className: "w-5 h-5",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          children: u.jsx("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 1.5,
                            d: "M19 9l-7 7-7-7"
                          })
                        })]
                      })]
                    }), u.jsx(rt, {
                      children: a && u.jsx(b.p, {
                        initial: {
                          opacity: 0,
                          height: 0,
                          marginTop: 0
                        },
                        animate: {
                          opacity: 1,
                          height: "auto",
                          marginTop: "12px"
                        },
                        exit: {
                          opacity: 0,
                          height: 0,
                          marginTop: 0
                        },
                        className: "font-sans font-light text-[17px] md:text-[18px] text-dark-800 leading-relaxed overflow-hidden",
                        children: s.desc
                      })
                    })]
                  })]
                }, s.num)
              })
            })]
          })]
        })
      })]
    })
  },
  Fw = "https://hook.eu2.make.com/ktuw8uc8ommcsopo9db6gltpqd36xrsj",
  Bw = () => {
    const [e, t] = C.useState("idle"), n = async s => {
        s.preventDefault(), t("loading");
        const o = s.currentTarget,
          a = {
            tipo: "analisi_gratuita",
            nome: o.elements.namedItem("nome").value,
            email: o.elements.namedItem("email").value,
            indirizzo: o.elements.namedItem("indirizzo").value,
            tipologia: o.elements.namedItem("tipologia").value,
            stato: o.elements.namedItem("stato").value,
            telefono: o.elements.namedItem("telefono").value,
            messaggio: o.elements.namedItem("messaggio").value,
            timestamp: new Date().toISOString()
          };
        try {
          await fetch(Fw, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(a)
          }), t("success")
        } catch {
          t("error")
        }
      }, r =
      "w-full bg-transparent border-0 border-b border-white/20 focus:border-gold-500 text-white font-sans font-light text-[16px] py-4 outline-none transition-colors duration-300 placeholder:text-dark-200/50",
      i = "font-sans text-[12px] tracking-[0.2em] uppercase text-gold-500/80 block mb-2";
    return u.jsxs("section", {
      id: "analisi",
      className: "bg-dark-900 relative overflow-hidden text-left",
      children: [u.jsx("div", {
        className: "absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] pointer-events-none",
        style: {
          background: "radial-gradient(ellipse, rgba(184,150,62,0.08) 0%, transparent 70%)"
        }
      }), u.jsx("div", {
        className: "py-28 md:py-36 relative z-10",
        children: u.jsx("div", {
          className: "max-w-[1280px] mx-auto px-6 md:px-10",
          children: u.jsxs("div", {
            className: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-start",
            children: [u.jsxs(b.div, {
              initial: {
                opacity: 0,
                y: 40
              },
              whileInView: {
                opacity: 1,
                y: 0
              },
              viewport: {
                once: !0
              },
              transition: {
                duration: .85,
                ease: [.22, 1, .36, 1]
              },
              children: [u.jsxs("p", {
                className: "flex items-center gap-3 font-sans text-[13px] tracking-[0.25em] uppercase text-gold-500 mb-6",
                children: [u.jsx("span", {
                  className: "w-8 h-px bg-gold-500"
                }), "Inizia adesso"]
              }), u.jsxs("h2", {
                className: "font-serif font-light text-white leading-[1.1] mb-8",
                style: {
                  fontSize: "clamp(42px, 5vw, 64px)"
                },
                children: ["Scopri quanto rende", u.jsx("br", {}), u.jsx("em", {
                  className: "italic text-gold-400",
                  children: "davvero"
                }), " il tuo immobile."]
              }), u.jsx("p", {
                className: "font-sans font-light text-[19px] text-dark-100 leading-relaxed mb-12 max-w-lg",
                children: "Analisi gratuita e personalizzata basata su dati reali di mercato. Nessun impegno. Risposta in 24 ore con 3 scenari di revenue."
              }), u.jsx("div", {
                className: "flex flex-col gap-0",
                children: [{
                  num: "01",
                  text: "RevPAR stimato per il tuo indirizzo specifico"
                }, {
                  num: "02",
                  text: "Confronto con 5 proprietà simili nella tua zona"
                }, {
                  num: "03",
                  text: "Proiezione revenue: base, buono, ottimo"
                }, {
                  num: "04",
                  text: "Indicazione del tier di gestione più adatto"
                }].map((s, o) => u.jsxs(b.div, {
                  initial: {
                    opacity: 0,
                    x: -20
                  },
                  whileInView: {
                    opacity: 1,
                    x: 0
                  },
                  viewport: {
                    once: !0
                  },
                  transition: {
                    delay: o * .1,
                    duration: .6
                  },
                  className: "flex gap-6 items-start py-5 border-b border-white/7",
                  children: [u.jsx("span", {
                    className: "font-mono text-[12px] text-gold-500 flex-shrink-0 mt-1",
                    children: s.num
                  }), u.jsx("p", {
                    className: "font-sans font-light text-[18px] text-dark-100 leading-relaxed",
                    children: s.text
                  })]
                }, s.num))
              })]
            }), u.jsx(b.div, {
              initial: {
                opacity: 0,
                y: 48,
                scale: .97
              },
              whileInView: {
                opacity: 1,
                y: 0,
                scale: 1
              },
              viewport: {
                once: !0
              },
              transition: {
                duration: .9,
                delay: .15,
                ease: [.22, 1, .36, 1]
              },
              className: "bg-dark-800 p-10 md:p-14 border border-dark-700",
              style: {
                boxShadow: "0 20px 70px rgba(0,0,0,0.4)"
              },
              children: e === "success" ? u.jsxs(b.div, {
                initial: {
                  opacity: 0
                },
                animate: {
                  opacity: 1
                },
                className: "py-12 text-center",
                children: [u.jsx("p", {
                  className: "font-mono text-[14px] text-green-400 mb-4",
                  children: "✓ Richiesta inviata"
                }), u.jsxs("p", {
                  className: "font-sans font-light text-[18px] text-dark-100 leading-relaxed",
                  children: ["Ti contatteremo entro 24 ore.", " ", u.jsx("a", {
                    href: "https://wa.me/393393522164",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "text-gold-400 border-b border-gold-400/30",
                    children: "WhatsApp →"
                  })]
                })]
              }) : u.jsxs("form", {
                className: "flex flex-col gap-8",
                onSubmit: n,
                children: [u.jsxs("div", {
                  className: "grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8",
                  children: [u.jsxs("div", {
                    children: [u.jsx("label", {
                      className: i,
                      children: "Nome e cognome"
                    }), u.jsx("input", {
                      name: "nome",
                      type: "text",
                      className: r,
                      placeholder: "Marco Rossi",
                      required: !0
                    })]
                  }), u.jsxs("div", {
                    children: [u.jsx("label", {
                      className: i,
                      children: "Email"
                    }), u.jsx("input", {
                      name: "email",
                      type: "email",
                      className: r,
                      placeholder: "marco@email.com",
                      required: !0
                    })]
                  })]
                }), u.jsxs("div", {
                  children: [u.jsx("label", {
                    className: i,
                    children: "Indirizzo immobile (via e zona)"
                  }), u.jsx("input", {
                    name: "indirizzo",
                    type: "text",
                    className: r,
                    placeholder: "Via Tortona 12, Navigli",
                    required: !0
                  })]
                }), u.jsxs("div", {
                  className: "grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8",
                  children: [u.jsxs("div", {
                    children: [u.jsx("label", {
                      className: i,
                      children: "Tipologia"
                    }), u.jsxs("select", {
                      name: "tipologia",
                      className: r,
                      style: {
                        appearance: "none",
                        cursor: "pointer"
                      },
                      required: !0,
                      defaultValue: "",
                      children: [u.jsx("option", {
                        value: "",
                        disabled: !0,
                        children: "Seleziona"
                      }), ["Monolocale", "Bilocale", "Trilocale",
                        "Quadrilocale o più"
                      ].map(s => u.jsx("option", {
                        style: {
                          background: "#111111"
                        },
                        children: s
                      }, s))]
                    })]
                  }), u.jsxs("div", {
                    children: [u.jsx("label", {
                      className: i,
                      children: "Stato attuale"
                    }), u.jsxs("select", {
                      name: "stato",
                      className: r,
                      style: {
                        appearance: "none",
                        cursor: "pointer"
                      },
                      required: !0,
                      defaultValue: "",
                      children: [u.jsx("option", {
                        value: "",
                        disabled: !0,
                        children: "Seleziona"
                      }), ["Sfitto", "Già su Airbnb (autonomo)",
                        "Con altro property manager",
                        "Affitto tradizionale"
                      ].map(s => u.jsx("option", {
                        style: {
                          background: "#111111"
                        },
                        children: s
                      }, s))]
                    })]
                  })]
                }), u.jsxs("div", {
                  children: [u.jsx("label", {
                    className: i,
                    children: "Telefono (opzionale)"
                  }), u.jsx("input", {
                    name: "telefono",
                    type: "tel",
                    className: r,
                    placeholder: "+39 02..."
                  })]
                }), u.jsxs("div", {
                  children: [u.jsx("label", {
                    className: i,
                    children: "Note aggiuntive (opzionale)"
                  }), u.jsx("textarea", {
                    name: "messaggio",
                    rows: 3,
                    className: `${r} resize-none`,
                    placeholder: "Descrivi brevemente eventuali necessità o dettagli dell'immobile..."
                  })]
                }), u.jsx("button", {
                  type: "submit",
                  disabled: e === "loading",
                  className: "mt-6 font-sans text-[13px] font-medium tracking-[0.15em] uppercase bg-gold-500 text-black py-5 hover:bg-gold-400 transition-all duration-300 disabled:opacity-60",
                  style: {
                    boxShadow: "0 4px 24px rgba(184,150,62,0.3)"
                  },
                  children: e === "loading" ? "Invio in corso..." :
                    "Ricevi l'analisi gratuita →"
                }), e === "error" && u.jsxs("p", {
                  className: "font-sans text-[14px] text-red-400 mt-2",
                  children: ["Errore. Scrivi a ", u.jsx("a", {
                    href: "mailto:contatti@virtualbnb.it",
                    className: "text-gold-400",
                    children: "contatti@virtualbnb.it"
                  })]
                }), u.jsxs("p", {
                  className: "font-sans text-[13px] text-dark-200 mt-2 flex items-start gap-3",
                  children: [u.jsx("span", {
                      className: "w-5 h-px bg-gold-500/30 inline-block flex-shrink-0 mt-2.5"
                    }),
                    "Nessun impegno. L'analisi è 100% gratuita e senza vincoli."]
                })]
              })
            })]
          })
        })
      })]
    })
  },
  Uw = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
  $w = "https://www.dropbox.com/scl/fi/qwqs12w3qcvbeycdpyk7p/me.jpg?rlkey=4jmmxxvnrihx4vzutj9jc6ncl&st=sjkmvmel&raw=1",
  Ww = () => {
    const [e, t] = C.useState(!1), [n, r] = C.useState(0), i = [{
      key: "Dati > opinioni",
      text: "Ogni decisione — pricing, valutazione, report — si basa su dati misurabili. Mai generalizzazioni. Solo numeri reali analizzati ogni 6 ore."
    }, {
      key: "AI-first",
      text: "Il 90% dell'operativo è automatizzato dal primo giorno per azzerare gli errori. Il nostro intervento umano si concentra sul 10% che richiede empatia e giudizio strategico."
    }, {
      key: "Trasparenza radicale",
      text: "Il proprietario sa sempre tutto. Non aspetta il PDF a fine mese. Ha una finestra sempre aperta e in tempo reale sul suo asset tramite un portal digitale dedicato."
    }, {
      key: "Direct-first",
      text: "Ogni prenotazione diretta è una commissione (15-20%) OTA risparmiata. Costruiamo canali B2B propri che generano reddito netto per i proprietari senza intermediari costi."
    }, {
      key: "Zero franchising",
      text: "Gestiamo direttamente, senza affiliati o sub-appalti scadenti. L'eccellenza non è scalabile compromettendo la qualità: chi gestisce il tuo appartamento è il nostro team."
    }];
    return u.jsxs(u.Fragment, {
      children: [u.jsxs("section", {
        id: "vision",
        className: "bg-dark-900 relative overflow-hidden",
        children: [u.jsx("div", {
          className: "absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none",
          style: {
            background: "radial-gradient(circle at top right, rgba(184,150,62,0.06) 0%, transparent 60%)"
          }
        }), u.jsx("div", {
          className: "py-28 md:py-36 relative z-10",
          children: u.jsxs("div", {
            className: "max-w-[1280px] mx-auto px-6 md:px-10",
            children: [u.jsxs(b.p, {
              initial: {
                opacity: 0,
                x: -20
              },
              whileInView: {
                opacity: 1,
                x: 0
              },
              viewport: {
                once: !0
              },
              transition: {
                duration: .7
              },
              className: "flex items-center gap-3 font-sans text-[13px] tracking-[0.25em] uppercase text-gold-500 mb-6",
              children: [u.jsx("span", {
                className: "w-8 h-px bg-gold-500"
              }), "La nostra missione"]
            }), u.jsxs(b.h2, {
              initial: {
                opacity: 0,
                y: 36
              },
              whileInView: {
                opacity: 1,
                y: 0
              },
              viewport: {
                once: !0
              },
              transition: {
                duration: .8,
                delay: .08,
                ease: [.22, 1, .36, 1]
              },
              className: "font-serif font-light text-white leading-[1.1] mb-16",
              style: {
                fontSize: "clamp(38px, 5vw, 60px)"
              },
              children: ["La visione di", u.jsx("br", {}), u.jsxs("button", {
                onClick: () => t(!0),
                className: "group relative cursor-pointer outline-none overflow-hidden inline-block",
                children: [u.jsx("em", {
                  className: "italic text-gold-400 group-hover:text-gold-300 transition-colors duration-500 inline-block transform group-hover:scale-[1.02]",
                  children: "Michael Jara"
                }), u.jsx("span", {
                  className: "absolute bottom-1 left-0 w-full h-[1px] bg-gold-400/50 transform origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-500"
                }), u.jsx("span", {
                  className: "absolute bottom-1 right-0 w-full h-[1px] bg-gold-300 transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100"
                })]
              })]
            }), u.jsxs("div", {
              className: "grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start",
              children: [u.jsxs(b.div, {
                initial: {
                  opacity: 0,
                  y: 40
                },
                whileInView: {
                  opacity: 1,
                  y: 0
                },
                viewport: {
                  once: !0
                },
                transition: {
                  duration: .9,
                  ease: [.22, 1, .36, 1]
                },
                className: "flex flex-col",
                children: [u.jsxs("button", {
                  onClick: () => t(!0),
                  className: "group relative mb-12 overflow-hidden w-full text-left cursor-pointer outline-none block",
                  style: {
                    boxShadow: "0 30px 80px rgba(0,0,0,0.6)"
                  },
                  children: [u.jsx("div", {
                    className: "h-[400px] w-full overflow-hidden",
                    children: u.jsx("img", {
                      src: Uw,
                      alt: "Appartamento VirtualBNB",
                      className: "w-full h-full object-cover grayscale opacity-90 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 ease-[0.22,1,0.36,1]"
                    })
                  }), u.jsx("div", {
                    className: "absolute inset-0 transition-opacity duration-700 pointer-events-none",
                    style: {
                      background: "linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.2) 50%, transparent 100%)"
                    }
                  }), u.jsx("div", {
                    className: "absolute bottom-0 left-0 right-0 p-8 flex justify-between items-end",
                    children: u.jsxs("div", {
                      children: [u.jsx("p", {
                        className: "font-mono text-[12px] tracking-[0.15em] uppercase text-gold-500 mb-3 opacity-80 group-hover:opacity-100 transition-opacity",
                        children: "Italia · Portfolio VirtualBNB"
                      }), u.jsx("p", {
                        className: "font-serif text-[28px] text-white leading-none",
                        children: "Michael Jara"
                      }), u.jsxs("p", {
                        className: "font-sans text-[12px] tracking-[0.2em] uppercase text-dark-200 mt-2 flex items-center gap-2 group-hover:text-gold-400 transition-colors",
                        children: ["Founder & CEO ", u.jsx(
                        "span", {
                          className: "transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300",
                          children: "→"
                        })]
                      })]
                    })
                  })]
                }), u.jsxs("div", {
                  className: "relative pl-8 mb-8",
                  children: [u.jsx("span", {
                    className: "absolute left-0 top-0 text-gold-500/20 font-serif text-8xl leading-none -mt-4 -ml-2",
                    children: '"'
                  }), u.jsx("blockquote", {
                    className: "font-serif text-[26px] md:text-[30px] font-light italic leading-relaxed text-white relative z-10",
                    children: "Il vero lusso per un proprietario non è avere un appartamento stupendo. È poter generare ricchezza senza mai dover pensare a quel che accade dentro."
                  })]
                }), u.jsx("p", {
                  className: "font-sans font-light text-[18px] md:text-[20px] text-dark-100 leading-relaxed pl-8",
                  children: "La visione di VirtualBNB unisce la tradizionale cura italiana per l'immobile con l'efficienza chirurgica dei più moderni sistemi AI di Pricing e gestione patrimoniale. Non gestiamo prenotazioni: custodiamo e moltiplichiamo il valore del tuo asset nel tempo."
                })]
              }), u.jsxs(b.div, {
                initial: {
                  opacity: 0
                },
                whileInView: {
                  opacity: 1
                },
                viewport: {
                  once: !0
                },
                transition: {
                  duration: .6,
                  delay: .2
                },
                className: "pt-8",
                children: [u.jsx("p", {
                  className: "font-sans text-[13px] tracking-[0.25em] uppercase text-dark-300 mb-8 border-b border-dark-700 pb-4",
                  children: "I Principi Fondatori"
                }), u.jsx("div", {
                  className: "flex flex-col gap-2",
                  children: i.map((s, o) => {
                    const a = n === o;
                    return u.jsxs(b.div, {
                      initial: {
                        opacity: 0,
                        x: 28
                      },
                      whileInView: {
                        opacity: 1,
                        x: 0
                      },
                      viewport: {
                        once: !0
                      },
                      transition: {
                        delay: .15 + o * .1,
                        duration: .5,
                        ease: [.22, 1, .36, 1]
                      },
                      className: `group px-6 py-6 border transition-all duration-500 cursor-pointer ${a?"bg-dark-800 border-gold-500 shadow-[0_10px_30px_rgba(184,150,62,0.1)]":"bg-transparent border-white/5 hover:border-gold-500/30 hover:bg-dark-800/50"}`,
                      onClick: () => r(a ? null : o),
                      children: [u.jsxs("div", {
                        className: "flex items-center justify-between",
                        children: [u.jsxs("h4", {
                          className: `font-mono text-[14px] md:text-[15px] tracking-[0.15em] uppercase transition-colors duration-300 ${a?"text-gold-400 font-semibold":"text-dark-200 group-hover:text-gold-500"}`,
                          children: [u.jsxs("span", {
                            className: "opacity-40 mr-4",
                            children: ["0", o + 1]
                          }), s.key]
                        }), u.jsx("span", {
                          className: `flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${a?"border-gold-500 bg-gold-500/10 rotate-180":"border-dark-600 group-hover:border-gold-500/50"}`,
                          children: u.jsx("svg", {
                            className: `w-4 h-4 transition-colors ${a?"text-gold-500":"text-dark-300 group-hover:text-gold-500"}`,
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: u.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: a ? 2 :
                                1.5,
                              d: a ? "M5 15l7-7 7 7" :
                                "M19 9l-7 7-7-7"
                            })
                          })
                        })]
                      }), u.jsx(rt, {
                        children: a && u.jsx(b.div, {
                          initial: {
                            opacity: 0,
                            height: 0,
                            marginTop: 0
                          },
                          animate: {
                            opacity: 1,
                            height: "auto",
                            marginTop: "20px"
                          },
                          exit: {
                            opacity: 0,
                            height: 0,
                            marginTop: 0
                          },
                          transition: {
                            duration: .4,
                            ease: [.22, 1, .36, 1]
                          },
                          className: "overflow-hidden",
                          children: u.jsx("p", {
                            className: "font-sans font-light text-[17px] md:text-[19px] text-white leading-relaxed pb-2",
                            children: s.text
                          })
                        })
                      })]
                    }, s.key)
                  })
                }), u.jsxs(b.div, {
                  initial: {
                    opacity: 0,
                    y: 20
                  },
                  whileInView: {
                    opacity: 1,
                    y: 0
                  },
                  viewport: {
                    once: !0
                  },
                  transition: {
                    delay: .6
                  },
                  className: "mt-14 p-10 border border-gold-500/20 relative overflow-hidden group",
                  style: {
                    background: "rgba(184,150,62,0.03)"
                  },
                  children: [u.jsx("div", {
                    className: "absolute inset-0 bg-gold-500/5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.22,1,0.36,1]"
                  }), u.jsxs("div", {
                    className: "relative z-10",
                    children: [u.jsxs("p", {
                      className: "font-sans font-light text-[19px] text-white leading-relaxed mb-8",
                      children: [
                        "Vuoi capire se il tuo immobile è un asset ",
                        u.jsx("strong", {
                          className: "font-normal text-gold-400",
                          children: "ideale"
                        }),
                        " per gli affitti brevi? La prima analisi strategica sul tuo immobile è gratuita."
                      ]
                    }), u.jsx("button", {
                      onClick: () => {
                        var s;
                        return (s = document.getElementById(
                            "analisi")) == null ? void 0 : s
                          .scrollIntoView({
                            behavior: "smooth"
                          })
                      },
                      className: "font-sans text-[13px] font-medium tracking-[0.15em] uppercase text-black bg-gold-500 px-8 py-4 hover:bg-white hover:scale-105 transition-all duration-300",
                      children: "Ricevi la tua analisi →"
                    })]
                  })]
                })]
              })]
            })]
          })
        })]
      }), u.jsx(rt, {
        children: e && u.jsx(b.div, {
          initial: {
            opacity: 0
          },
          animate: {
            opacity: 1
          },
          exit: {
            opacity: 0
          },
          className: "fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8",
          style: {
            background: "rgba(10,10,10,0.95)",
            backdropFilter: "blur(15px)"
          },
          onClick: () => t(!1),
          children: u.jsxs(b.div, {
            initial: {
              y: 40,
              opacity: 0,
              scale: .95
            },
            animate: {
              y: 0,
              opacity: 1,
              scale: 1
            },
            exit: {
              y: 30,
              opacity: 0,
              scale: .95
            },
            transition: {
              duration: .6,
              ease: [.22, 1, .36, 1]
            },
            onClick: s => s.stopPropagation(),
            className: "w-full max-w-5xl bg-dark-900 border border-gold-500/20 shadow-[-20px_20px_80px_rgba(0,0,0,0.8)] flex flex-col md:flex-row relative cursor-auto",
            children: [u.jsx("button", {
              onClick: () => t(!1),
              className: "absolute top-4 right-4 md:top-6 md:right-6 z-20 w-12 h-12 flex items-center justify-center bg-dark-800 border border-white/10 hover:bg-gold-500 hover:text-black hover:border-gold-500 text-white rounded-full transition-all duration-300",
              children: u.jsx("svg", {
                className: "w-5 h-5",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                children: u.jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 1.5,
                  d: "M6 18L18 6M6 6l12 12"
                })
              })
            }), u.jsxs("div", {
              className: "w-full md:w-[45%] relative min-h-[300px] md:min-h-[600px] bg-dark-900 line-height-0 overflow-hidden",
              children: [u.jsx("img", {
                src: $w,
                alt: "Michael Jara",
                className: "absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-80 hover:mix-blend-normal hover:opacity-100 transition-all duration-1000 transform hover:scale-105"
              }), u.jsx("div", {
                className: "absolute inset-0 pointer-events-none",
                style: {
                  background: "linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.2) 50%, transparent 100%)"
                }
              }), u.jsxs("div", {
                className: "absolute bottom-8 left-8 text-left z-10",
                children: [u.jsx("h3", {
                  className: "font-serif text-[40px] font-light text-white mb-1",
                  children: "Michael Jara"
                }), u.jsx("p", {
                  className: "font-mono text-[12px] tracking-[0.25em] uppercase text-gold-500",
                  children: "Founder & CEO"
                })]
              })]
            }), u.jsxs("div", {
              className: "w-full md:w-[55%] p-8 md:p-14 overflow-y-auto max-h-[85vh] text-left bg-dark-900 relative",
              children: [u.jsx("div", {
                className: "absolute top-0 right-0 w-64 h-64 bg-gold-500/5 blur-[80px] pointer-events-none"
              }), u.jsx("p", {
                className: "font-mono text-[12px] tracking-[0.2em] uppercase text-gold-600 mb-6",
                children: "Executive Profile"
              }), u.jsxs("h2", {
                className: "font-serif font-light text-white leading-[1.05] mb-10",
                style: {
                  fontSize: "clamp(32px, 4vw, 48px)"
                },
                children: ["L'Arte dell'Ospitalità,", u.jsx("br", {}), u.jsx("em", {
                  className: "italic text-gold-500",
                  children: "Ridefinita."
                })]
              }), u.jsxs("div", {
                className: "font-sans font-light text-[17px] md:text-[18px] text-dark-100 leading-relaxed space-y-6",
                children: [u.jsx("p", {
                  children: "Michael Jara è un imprenditore visionario che ha dedicato gli ultimi 7 anni a perfezionare l'arte del Property Management. Costruendo un background internazionale e una profonda conoscenza analitica, ha fondato VirtualBNB per elevare drasticamente gli standard asfissianti del settore."
                }), u.jsx("p", {
                  className: "text-white text-[19px] italic border-l-2 border-gold-500 pl-6 my-8",
                  children: `"Ogni proprietà ha un'anima, e la tecnologia serve a farla risplendere massimizzandone il guadagno, non a sostituirla con freddi codici seriali."`
                }), u.jsx("p", {
                  children: "Pioniere nell'adozione di algoritmi di Intelligenza Artificiale per il Dynamic Pricing in Italia, Michael ha creato un ecosistema dove l'efficienza digitale si fonde armoniosamente con la cura umana. VirtualBNB non gestisce semplicemente immobili: ingegnerizza la tua rendita passiva tutelando il tuo immobile."
                })]
              }), u.jsxs("div", {
                className: "mt-14 pt-8 border-t border-gold-500/20",
                children: [u.jsxs("p", {
                  className: "font-sans text-[14px] text-dark-200",
                  children: [u.jsx("strong", {
                      className: "font-serif text-2xl font-light text-white block mb-3",
                      children: "Parla con la direzione."
                    }),
                    "Per grandi portafogli, opportunità di business B2B o investimenti immobiliari:"
                  ]
                }), u.jsx("a", {
                  href: "mailto:contatti@virtualbnb.it",
                  className: "inline-block mt-4 font-mono text-[13px] tracking-[0.1em] text-black bg-gold-500 px-8 py-3 hover:bg-white transition-colors uppercase",
                  children: "Contatta il CEO"
                })]
              })]
            })]
          })
        })
      })]
    })
  },
  Hw = "https://wa.me/393393522164",
  Kw = () => u.jsxs("section", {
    id: "contatti",
    className: "bg-cream-100 relative text-center",
    children: [u.jsx("div", {
      className: "absolute top-0 left-0 right-0 h-12 pointer-events-none",
      style: {
        background: "linear-gradient(to bottom, rgba(10,10,10,0.06) 0%, transparent 100%)"
      }
    }), u.jsx("div", {
      className: "py-24 md:py-32",
      children: u.jsxs("div", {
        className: "max-w-[1000px] mx-auto px-6 md:px-10",
        children: [u.jsxs(b.p, {
          initial: {
            opacity: 0,
            y: 10
          },
          whileInView: {
            opacity: 1,
            y: 0
          },
          viewport: {
            once: !0
          },
          transition: {
            duration: .7
          },
          className: "flex items-center justify-center gap-3 font-sans text-[13px] tracking-[0.25em] uppercase text-gold-600 mb-6",
          children: [u.jsx("span", {
            className: "w-8 h-px bg-gold-600"
          }), "Contattaci", u.jsx("span", {
            className: "w-8 h-px bg-gold-600"
          })]
        }), u.jsxs(b.h2, {
          initial: {
            opacity: 0,
            y: 30
          },
          whileInView: {
            opacity: 1,
            y: 0
          },
          viewport: {
            once: !0
          },
          transition: {
            duration: .8,
            delay: .08,
            ease: [.22, 1, .36, 1]
          },
          className: "font-serif font-light text-dark-900 leading-[1.1] mb-16",
          style: {
            fontSize: "clamp(38px, 5vw, 56px)"
          },
          children: ["Siamo a tua disposizione — ", u.jsx("br", {}), u.jsx("em", {
            className: "italic text-gold-600",
            children: "senza intermediari."
          })]
        }), u.jsxs(b.div, {
          initial: {
            opacity: 0,
            y: 28
          },
          whileInView: {
            opacity: 1,
            y: 0
          },
          viewport: {
            once: !0
          },
          transition: {
            duration: .8,
            delay: .15
          },
          className: "grid grid-cols-1 md:grid-cols-3 gap-12 text-center",
          children: [u.jsxs("div", {
            children: [u.jsx("p", {
              className: "font-sans text-[12px] tracking-[0.18em] uppercase text-dark-200 mb-3 block",
              children: "Direzione Generale"
            }), u.jsx("a", {
              href: "mailto:contatti@virtualbnb.it",
              className: "font-serif text-[24px] text-dark-900 hover:text-gold-600 transition-colors break-all border-b border-transparent hover:border-gold-600",
              children: "contatti@virtualbnb.it"
            }), u.jsx("p", {
              className: "font-sans font-light text-[15px] text-dark-200 mt-3 max-w-[200px] mx-auto",
              children: "Partnership, Corporate e Investitori."
            })]
          }), u.jsxs("div", {
            className: "mt-0 relative before:content-[''] md:before:absolute before:left-0 before:top-4 before:-bottom-4 before:w-px md:after:w-px before:bg-cream-300 after:content-[''] md:after:absolute after:right-0 after:top-4 after:-bottom-4 after:bg-cream-300",
            children: [u.jsx("p", {
              className: "font-sans text-[12px] tracking-[0.18em] uppercase text-dark-200 mb-3 block",
              children: "Linea Diretta 24/7"
            }), u.jsx("a", {
              href: Hw,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "font-serif text-[24px] text-gold-600 hover:text-dark-900 transition-colors",
              children: "WhatsApp →"
            }), u.jsx("p", {
              className: "font-sans font-light text-[15px] text-dark-200 mt-3 max-w-[200px] mx-auto",
              children: "Per urgenze o supporto rapido per i tuoi immobili."
            })]
          }), u.jsxs("div", {
            children: [u.jsx("p", {
              className: "font-sans text-[12px] tracking-[0.18em] uppercase text-dark-200 mb-3 block",
              children: "Quartier Generale"
            }), u.jsx("p", {
              className: "font-serif text-[24px] text-dark-900",
              children: "Milano, Italia"
            }), u.jsx("p", {
              className: "font-sans font-light text-[15px] text-dark-200 mt-3 max-w-[200px] mx-auto",
              children: "Operiamo su tutta la rete immobiliare Italiana."
            })]
          })]
        })]
      })
    })]
  }),
  Gw = () => {
    const [e, t] = C.useState(null), n = r => {
      var i;
      return (i = document.getElementById(r)) == null ? void 0 : i.scrollIntoView({
        behavior: "smooth",
        block: "start"
      })
    };
    return u.jsxs(u.Fragment, {
      children: [u.jsx("footer", {
        className: "bg-dark-900 border-t border-gold-500/12",
        children: u.jsxs("div", {
          className: "max-w-[1280px] mx-auto px-6 md:px-10 py-16 flex items-center justify-between flex-wrap gap-8",
          children: [u.jsxs("div", {
            className: "font-serif text-[20px] tracking-widest",
            children: ["VIRTUAL", u.jsx("span", {
              className: "text-gold-500",
              children: "BNB"
            })]
          }), u.jsxs("div", {
            className: "flex gap-6 md:gap-8 flex-wrap items-center",
            children: [
              [{
                label: "Servizi",
                id: "servizi"
              }, {
                label: "Prezzi",
                id: "prezzi"
              }, {
                label: "Executive",
                id: "corporate"
              }, {
                label: "Vision",
                id: "vision"
              }].map(r => u.jsx("button", {
                onClick: () => n(r.id),
                className: "font-sans text-[13px] tracking-[0.08em] text-dark-200 hover:text-white transition-colors uppercase",
                children: r.label
              }, r.id)), u.jsx("span", {
                className: "w-px h-4 bg-dark-700 hidden md:block"
              }), u.jsx("div", {
                className: "flex gap-6 w-full md:w-auto mt-4 md:mt-0",
                children: [{
                  label: "Privacy",
                  key: "privacy"
                }, {
                  label: "Termini",
                  key: "terms"
                }, {
                  label: "Cookie",
                  key: "cookies"
                }].map(r => u.jsx("button", {
                  onClick: () => t(r.key),
                  className: "font-sans text-[13px] tracking-[0.08em] text-dark-200 hover:text-white transition-colors uppercase",
                  children: r.label
                }, r.key))
              })
            ]
          }), u.jsxs("div", {
            className: "font-sans text-[13px] text-dark-200 leading-relaxed text-left md:text-right w-full md:w-auto",
            children: ["© 2026 VirtualBNB · P.IVA IT14379200968", u.jsx("br", {}),
              "Sede Legale: Milano, Italia"
            ]
          })]
        })
      }), u.jsx(rt, {
        children: e && u.jsx(b.div, {
          initial: {
            opacity: 0
          },
          animate: {
            opacity: 1
          },
          exit: {
            opacity: 0
          },
          className: "fixed inset-0 z-[200] flex items-center justify-center p-6",
          style: {
            background: "rgba(0,0,0,0.88)",
            backdropFilter: "blur(8px)"
          },
          onClick: () => t(null),
          children: u.jsxs(b.div, {
            initial: {
              y: 32,
              opacity: 0
            },
            animate: {
              y: 0,
              opacity: 1
            },
            exit: {
              y: 32,
              opacity: 0
            },
            transition: {
              duration: .4,
              ease: [.22, 1, .36, 1]
            },
            className: "bg-dark-700 border border-gold-500/15 max-w-3xl w-full max-h-[85vh] overflow-y-auto p-10 md:p-14 relative",
            onClick: r => r.stopPropagation(),
            children: [u.jsx("button", {
              onClick: () => t(null),
              className: "absolute top-6 right-6 text-dark-100 hover:text-white transition-colors text-2xl font-light",
              children: "✕"
            }), e === "privacy" && u.jsxs(u.Fragment, {
              children: [u.jsx("h2", {
                className: "font-serif text-[32px] md:text-[40px] font-light mb-8 text-white",
                children: "Privacy Policy"
              }), u.jsxs("div", {
                className: "font-sans font-light text-[17px] md:text-[18px] text-dark-100 leading-relaxed space-y-6",
                children: [u.jsx("p", {
                  children: "In conformità con il GDPR (UE) 2016/679 e il D.Lgs. 196/2003, i dati personali raccolti sono trattati da VirtualBNB (Insolito Experiences di Michael Jara), con sede in Milano, Italia."
                }), u.jsx("h3", {
                  className: "font-serif text-[22px] text-white mt-8 mb-2",
                  children: "Dati raccolti"
                }), u.jsx("p", {
                  children: "Nome, email, telefono, informazioni sull'immobile fornite volontariamente attraverso i form di contatto."
                }), u.jsx("h3", {
                  className: "font-serif text-[22px] text-white mt-8 mb-2",
                  children: "Finalità"
                }), u.jsx("p", {
                  children: "Rispondere alle richieste di contatto, fornire analisi gratuite, inviare comunicazioni commerciali previo consenso esplicito."
                }), u.jsx("h3", {
                  className: "font-serif text-[22px] text-white mt-8 mb-2",
                  children: "I tuoi diritti"
                }), u.jsxs("p", {
                  children: [
                    "Hai diritto di accesso, rettifica, e cancellazione dei tuoi dati. Scrivi a ",
                    u.jsx("a", {
                      href: "mailto:contatti@virtualbnb.it",
                      className: "text-gold-500 border-b border-gold-500/30",
                      children: "contatti@virtualbnb.it"
                    }), " per far valere i tuoi diritti."
                  ]
                }), u.jsx("p", {
                  className: "font-mono text-[12px] text-dark-200 mt-10 pt-6 border-t border-gold-500/15",
                  children: "Insolito Experiences · P.IVA IT14379200968 · Aggiornato Aprile 2026"
                })]
              })]
            }), e === "terms" && u.jsxs(u.Fragment, {
              children: [u.jsx("h2", {
                className: "font-serif text-[32px] md:text-[40px] font-light mb-8 text-white",
                children: "Termini di Servizio"
              }), u.jsxs("div", {
                className: "font-sans font-light text-[17px] md:text-[18px] text-dark-100 leading-relaxed space-y-6",
                children: [u.jsx("p", {
                  children: "Le presenti Condizioni Generali regolano l'accesso e l'utilizzo del sito web VirtualBNB.it, gestito da Insolito Experiences."
                }), u.jsx("h3", {
                  className: "font-serif text-[22px] text-white mt-8 mb-2",
                  children: "1. Natura dei Servizi"
                }), u.jsx("p", {
                  children: `VirtualBNB fornisce servizi di Property Management avanzato e consulenza per affitti brevi. Le simulazioni e le proiezioni di revenue mostrate sul sito ("Analisi Gratuita") sono stime basate sull'analisi algoritmica del mercato locale e non costituiscono garanzia assoluta di rendimento futuro.`
                }), u.jsx("h3", {
                  className: "font-serif text-[22px] text-white mt-8 mb-2",
                  children: "2. Contrattualistica"
                }), u.jsx("p", {
                  children: "L'effettiva presa in gestione di un immobile è soggetta alla firma di un formale contratto di Property Management, nel quale verranno definiti nel dettaglio le fee (25% o 28%), gli obblighi normativi e i servizi erogati."
                }), u.jsx("h3", {
                  className: "font-serif text-[22px] text-white mt-8 mb-2",
                  children: "3. Proprietà Intellettuale"
                }), u.jsx("p", {
                  children: "I contenuti del sito, il marchio, il logo e l'algoritmo visivo sono di proprietà intellettuale di Michael Jara / Insolito Experiences. È severamente vietata la riproduzione, anche parziale, senza autorizzazione esplicita."
                }), u.jsx("p", {
                  className: "font-mono text-[12px] text-dark-200 mt-10 pt-6 border-t border-gold-500/15",
                  children: "Insolito Experiences · P.IVA IT14379200968 · Aggiornato Aprile 2026"
                })]
              })]
            }), e === "cookies" && u.jsxs(u.Fragment, {
              children: [u.jsx("h2", {
                className: "font-serif text-[32px] md:text-[40px] font-light mb-8 text-white",
                children: "Cookie Policy"
              }), u.jsxs("div", {
                className: "font-sans font-light text-[17px] md:text-[18px] text-dark-100 leading-relaxed space-y-6",
                children: [u.jsx("p", {
                  children: "Questo sito fa uso di cookie tecnici necessari e di tracciamento di terze parti per offrire un'esperienza di navigazione fluida e analizzare in modo anonimo le visite, al fine di migliorare il nostro servizio."
                }), u.jsx("h3", {
                  className: "font-serif text-[22px] text-white mt-8 mb-2",
                  children: "Cookie Tecnici"
                }), u.jsx("p", {
                  children: 'Necessari per il funzionamento basilare del sito (ad esempio, per ricordare se hai già chiuso o visualizzato la schermata di introduzione iniziale "Splash Screen"). Non richiedono consenso profilato.'
                }), u.jsx("h3", {
                  className: "font-serif text-[22px] text-white mt-8 mb-2",
                  children: "Cookie Analitici"
                }), u.jsx("p", {
                  children: "Utilizziamo strumenti di profilazione leggera (ad esempio Google Analytics o Meta Pixel) solo per capire come i nostri visitatori interagiscono con la piattaforma, al fine di migliorare l'interfaccia utente. Le informazioni raccolte sono in forma aggregata."
                }), u.jsx("h3", {
                  className: "font-serif text-[22px] text-white mt-8 mb-2",
                  children: "Disattivazione"
                }), u.jsx("p", {
                  children: "Puoi gestire le tue preferenze sui cookie o disattivarli interamente dalle impostazioni del tuo browser web. Tieni presente che disattivare i cookie tecnici potrebbe compromettere la navigazione del sito."
                }), u.jsx("p", {
                  className: "font-mono text-[12px] text-dark-200 mt-10 pt-6 border-t border-gold-500/15",
                  children: "Insolito Experiences · P.IVA IT14379200968 · Aggiornato Aprile 2026"
                })]
              })]
            })]
          })
        })
      })]
    })
  },
  Qw = "VIRTUALBNB",
  Yw = 7,
  Xw = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: .07,
        delayChildren: .4
      }
    },
    exit: {
      y: "-100%",
      transition: {
        duration: 1.1,
        ease: [.76, 0, .24, 1]
      }
    }
  },
  Zw = {
    hidden: {
      opacity: 0,
      y: 28
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: .7,
        ease: [.22, 1, .36, 1]
      }
    }
  },
  qw = ({
    onEnter: e
  }) => u.jsxs(b.div, {
    className: "fixed inset-0 z-[10000] bg-dark-900 flex flex-col items-center justify-center",
    variants: Xw,
    initial: "hidden",
    animate: "visible",
    exit: "exit",
    children: [u.jsx("div", {
      className: "absolute inset-0 pointer-events-none",
      style: {
        background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(184,150,62,0.09) 0%, transparent 70%)"
      }
    }), u.jsxs("div", {
      className: "relative z-10 flex flex-col items-center",
      children: [u.jsx("div", {
        className: "flex overflow-hidden mb-8",
        children: Qw.split("").map((t, n) => u.jsx(b.span, {
          variants: Zw,
          className: `font-serif tracking-[0.12em] font-light ${n>=Yw?"text-gold-500":"text-white"}`,
          style: {
            fontSize: "clamp(40px, 10vw, 80px)"
          },
          children: t
        }, n))
      }), u.jsx(b.div, {
        initial: {
          width: 0,
          opacity: 0
        },
        animate: {
          width: 80,
          opacity: 1
        },
        transition: {
          delay: 1.4,
          duration: .9,
          ease: [.22, 1, .36, 1]
        },
        className: "h-px bg-gold-500 mb-12"
      }), u.jsxs(b.button, {
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          delay: 1.9,
          duration: .7
        },
        onClick: e,
        className: "group relative px-10 py-4 overflow-hidden font-sans text-[11px] tracking-[0.35em] uppercase",
        children: [u.jsx("span", {
          className: "relative z-10 text-white group-hover:text-black transition-colors duration-500",
          children: "Enter Experience"
        }), u.jsx("span", {
          className: "absolute inset-0 bg-gold-500 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out"
        }), u.jsx("span", {
          className: "absolute inset-0 border border-gold-500/40 group-hover:border-transparent transition-colors duration-500"
        })]
      })]
    }), u.jsx(b.p, {
      initial: {
        opacity: 0
      },
      animate: {
        opacity: 1
      },
      transition: {
        delay: 2.4,
        duration: 1
      },
      className: "absolute bottom-12 font-mono text-[10px] tracking-[0.25em] text-gold-500/35 uppercase",
      children: "Insolito Experiences"
    })]
  }),
  Jw = () => {
    const [e, t] = C.useState(!1);
    C.useEffect(() => {
      localStorage.getItem("vbnb_cookie_consent") || setTimeout(() => t(!0), 1800)
    }, []);
    const n = () => {
        localStorage.setItem("vbnb_cookie_consent", "all"), t(!1)
      },
      r = () => {
        localStorage.setItem("vbnb_cookie_consent", "necessary"), t(!1)
      };
    return u.jsx(rt, {
      children: e && u.jsxs(b.div, {
        initial: {
          y: 80,
          opacity: 0
        },
        animate: {
          y: 0,
          opacity: 1
        },
        exit: {
          y: 80,
          opacity: 0
        },
        transition: {
          duration: .5,
          ease: [.22, 1, .36, 1]
        },
        className: "fixed bottom-6 left-6 right-6 z-[150] max-w-2xl bg-dark-700 border border-gold-500/15 p-6 flex items-center gap-6 flex-wrap shadow-2xl",
        children: [u.jsxs("p", {
          className: "font-sans font-light text-[13px] text-dark-100 leading-6 flex-1 min-w-[200px]",
          children: [
            "Utilizziamo cookie tecnici necessari al funzionamento del sito e cookie analitici anonimi per migliorare l'esperienza.",
            " ", u.jsx("button", {
              onClick: () => {
                var i;
                return (i = document.getElementById("contatti")) == null ? void 0 : i
                  .scrollIntoView({
                    behavior: "smooth"
                  })
              },
              className: "text-gold-500 hover:text-gold-400 transition-colors underline",
              children: "Privacy Policy"
            })
          ]
        }), u.jsxs("div", {
          className: "flex gap-3 flex-shrink-0",
          children: [u.jsx("button", {
            onClick: r,
            className: "font-sans text-[11px] tracking-[0.08em] uppercase text-gold-500 border border-gold-500/40 px-5 py-2.5 hover:bg-gold-500/10 transition-all duration-300",
            children: "Solo necessari"
          }), u.jsx("button", {
            onClick: n,
            className: "font-sans text-[11px] font-medium tracking-[0.08em] uppercase bg-gold-500 text-black px-5 py-2.5 hover:bg-gold-400 transition-all duration-300",
            children: "Accetta tutti"
          })]
        })]
      })
    })
  },
  Ud = "vbnb_splash_seen";

function e2() {
  const e = typeof window < "u" && sessionStorage.getItem(Ud) === "true",
    [t, n] = C.useState(e);
  C.useEffect(() => {
    document.body.style.overflow = t ? "" : "hidden", t || window.scrollTo(0, 0)
  }, [t]);
  const r = () => {
    sessionStorage.setItem(Ud, "true"), n(!0)
  };
  return u.jsxs("div", {
    className: "relative bg-dark-900 text-white min-h-screen",
    children: [u.jsx(rt, {
      mode: "wait",
      children: !t && u.jsx(qw, {
        onEnter: r
      })
    }), u.jsx(zw, {}), u.jsxs("main", {
      children: [u.jsx(Vw, {}), u.jsx(Mw, {}), u.jsx(Rw, {}), u.jsx(Dw, {}), u.jsx(Lw, {}), u.jsx(Iw, {}), u
        .jsx(_w, {}), u.jsx(Ow, {}), u.jsx(Bw, {}), u.jsx(Ww, {}), u.jsx(Kw, {})
      ]
    }), u.jsx(Gw, {}), u.jsx(Jw, {})]
  })
}
const Am = document.getElementById("root");
if (!Am) throw new Error("Could not find root element to mount to");
const t2 = Ro.createRoot(Am);
t2.render(u.jsx(C.StrictMode, {
  children: u.jsx(e2, {})
}));