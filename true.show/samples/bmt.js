"use strict";
define("module/components/plugin-behavior/event_behavior", [], function () {
        var e = {
            props: {
                eventData: Array
            },
            createdHandler: function () {
                var e = this;
                this.app = $(this).parents("bmt-app")[0];
                if (!this.app) return;
                var t = e.actions = $.extend({}, e.getDefaultActions(), e.getActions()),
                    n = e.events = $.extend({}, e.getDefaultEvents(), e.getEvents());
                $.each(t, function (t, n) {
                    n.type == "other" && e.$.on(t, n.action)
                }), $.each(n, function (t, n) {
                    if (n.type != "none") {
                        var r = e.hasEvent(t);
                        r != 0 && e._initEvents(t, r)
                    }
                })
            }, _initEvents: function (t, n) {
                var r = this;
                this.$.on(t, function (e) {
                    return e.preventDefault(), r.actionHandler(n), !1
                })
            }, eventHandler: function (t, n) {
                var r = this,
                    i = r.hasEvent(t);
                i != 0 && r.actionHandler(i)
            }, actionHandler: function (t) {
                var n = this;
                if (!(t instanceof Array)) {
                    var i = $.Deferred();
                    return t.value.elems ? t.value.elems.length != 0 && setTimeout(function () {
                        $.each(t.value.elems, function (e, r) {
                            $("#" + r).triggerHandler(t.type, [t, n])
                        }), i.resolve()
                    }, parseFloat(t.delay) * 1e3) : setTimeout(function () {
                        n.actions[t.type].action && n.actions[t.type].action(t, n), i.resolve()
                    }, parseFloat(t.delay) * 1e3), i
                }
                var r = 0;
                (function s() {
                    r < t.length && n.actionHandler(t[r]).then(function () {
                        r++, s()
                    })
                })()
            }, hasEvent: function (t) {
                var n = this;
                if (!n.eventData || n.eventData.length == 0) return !1;
                var r = !1;
                return $.each(n.eventData, function (e, n) {
                    if (n.name == t) return r = $.extend(!0, [], n.actions), !1
                }), r
            }, getDefaultEvents: function () {
                return {
                    click: {
                        type: "self",
                        text: "\u70b9\u51fb"
                    },
                    longTap: {
                        type: "self",
                        text: "\u957f\u6309"
                    },
                    animationEnd: {
                        type: "self",
                        text: "\u52a8\u753b\u7ed3\u675f"
                    }
                }
            }, getDefaultActions: function () {
                return {
                    none: {
                        type: "self",
                        text: "\u65e0",
                        defaultValue: "",
                        action: null
                    },
                    show: {
                        type: "other",
                        text: "\u663e\u793a\u5143\u7d20",
                        defaultValue: {
                            elems: []
                        },
                        action: function (e, t, n) {
                            $(this).show(), $("bmt-page")[0].animatePlugin(this)
                        }
                    },
                    hide: {
                        type: "other",
                        text: "\u9690\u85cf\u5143\u7d20",
                        defaultValue: {
                            elems: []
                        },
                        action: function (e, t, n) {
                            $(this).hide()
                        }
                    },
                    toggle: {
                        type: "other",
                        text: "\u9690\u85cf/\u663e\u793a",
                        defaultValue: {
                            elems: []
                        },
                        action: function (e, t, n) {
                            var r = $(this).css("display") == "none";
                            r ? ($(this).show(), $("bmt-page")[0].animatePlugin(this)) : $(this).hide()
                        }
                    },
                    href: {
                        type: "self",
                        text: "\u5916\u94fe\u8df3\u8f6c",
                        defaultValue: {
                            value: "http://www.baomitu.com"
                        },
                        control: {
                            self: {
                                type: "textarea",
                                text: "\u94fe\u63a5\u5730\u5740"
                            }
                        },
                        action: function (e, t) {
                            var n = e.value.value;
                            n && (location.href = n)
                        }
                    },
                    paging: {
                        type: "self",
                        text: "\u9875\u5185\u8df3\u8f6c",
                        defaultValue: {
                            value: "1"
                        },
                        control: {
                            self: {
                                type: "control-select",
                                text: "\u8df3\u8f6c\u5230",
                                data: function (e) {
                                    return e.createPageArr(e.getPageLength())
                                }
                            }
                        },
                        action: function (e, t) {
                            var n = e.value.value;
                            n && $(t.app).find("page-transition")[0].switchTo(n - 1)
                        }
                    },
                    tel: {
                        type: "self",
                        text: "\u62e8\u6253\u7535\u8bdd",
                        defaultValue: {
                            value: ""
                        },
                        control: {
                            self: {
                                type: "input",
                                text: "\u7535\u8bdd\u53f7\u7801"
                            }
                        },
                        action: function (e, t) {
                            var n = e.value.value;
                            n && (location.href = "tel:" + n)
                        }
                    },
                    animate: {
                        type: "other",
                        text: "\u64ad\u653e\u52a8\u753b",
                        defaultValue: {
                            elems: []
                        },
                        action: function (e, t, n) {
                            $("bmt-page")[0].animatePlugin(this)
                        }
                    },
                    trigger: {
                        type: "other",
                        text: "\u6a21\u62df\u4e8b\u4ef6",
                        isSingle: !0,
                        defaultValue: {
                            elems: [],
                            value: ""
                        },
                        control: {
                            self: {
                                type: "control-select",
                                text: "\u4e8b\u4ef6\u540d\u79f0",
                                data: function (e, t) {
                                    var n = $("#" + t[0])[0],
                                        r = [];
                                    r.push({
                                        name: "\u65e0",
                                        value: ""
                                    });
                                    if (n) {
                                        var i = $.extend(!0, n.getDefaultEvents(), n.getEvents());
                                        $.each(i, function (e, t) {
                                            if (t.type != "none") {
                                                var n = {};
                                                n.name = t.text, n.value = e, r.push(n)
                                            }
                                        })
                                    }
                                    return r
                                }
                            }
                        },
                        action: function (e, t, n) {
                            t.value.value && $(this).trigger(t.value.value)
                        }
                    }
                }
            }, getActions: function () {
                return {}
            }, getEvents: function () {
                return {}
            }
        };
        return e
    }), "use strict",
    function (e) {
        define("module/components/plugin-behavior/main", ["module/components/plugin-behavior/event_behavior"], e)
    }(function (e) {
        var t = 320,
            n = 504,
            r = {
                _viewport: {
                    vw: window.innerWidth,
                    vh: window.innerHeight
                },
                props: {
                    commonStyles: {
                        type: Object,
                        value: function () {
                            return {
                                position: "absolute",
                                boxSizing: "border-box",
                                zIndex: 10,
                                display: "block"
                            }
                        }
                    },
                    animationStyle: {
                        type: Array,
                        value: function () {
                            return []
                        }
                    },
                    styles: Object,
                    formId: {
                        type: String,
                        value: ""
                    }
                },
                createdHandler: function () {
                    var t = this;
                    this.app = $(this).parents("bmt-app")[0], this.$ = $(this), this.$.attr("id", this.id), this._initStyle(), this.formId && this.app && this._initSubmitBtn()
                }, _initStyle: function () {
                    var r = $.extend(this.commonStyles, this.styles);
                    if (r.width && r.height) {
                        var i = this._getOffsetPercentage(r.top || "0px", n),
                            s = this._getOffsetPercentage(r.left || "0px", t),
                            o = this._getOffsetPercentage(r.width, t),
                            u = this._getOffsetPercentage(r.height, n);
                        $.extend(r, {
                            top: i + "%",
                            left: s + "%",
                            width: o + "%",
                            height: u + "%"
                        }), u != 100 && i + u >= 100 && (r.top = "auto", r.bottom = 100 - (i + u) + "%"), this.stickRatio && (r.height = u * (this._viewport.vw / this._viewport.vh) * (n / t) + "%")
                    }
                    this.styles = r, this.$.css(r)
                }, _getOffsetPercentage: function (t, n) {
                    return t = t.toString(), t.indexOf("%") >= 0 ? parseFloat(t) : parseFloat(t) * 100 / n
                }, encode4Html: function (t) {
                    var n = document.createElement("pre"),
                        r = document.createTextNode(t);
                    n.appendChild(r);
                    var i = n.innerHTML.replace(/'/g, "&#39;").replace(/"/g, "&quot;");
                    return console.log(t, i), i
                }, _initSubmitBtn: function () {
                    var t = this,
                        n = t.formId,
                        r = t.app.getAttribute("app-id"),
                        i = document.querySelector("#" + n);
                    $(this).on("click", function (e) {
                        e.preventDefault(), i.trigger("formSubmit", [n, r])
                    })
                }
            };
        return [r, e]
    }), window.Modernizr = function (e, t, n) {
        function r(e) {
            v.cssText = e
        }

        function i(e, t) {
            return r(y.join(e + ";") + (t || ""))
        }

        function s(e, t) {
            return typeof e === t
        }

        function o(e, t) {
            return !!~("" + e).indexOf(t)
        }

        function u(e, t) {
            for (var r in e) {
                var i = e[r];
                if (!o(i, "-") && v[i] !== n) return t == "pfx" ? i : !0
            }
            return !1
        }

        function a(e, t, r) {
            for (var i in e) {
                var o = t[e[i]];
                if (o !== n) return r === !1 ? e[i] : s(o, "function") ? o.bind(r || t) : o
            }
            return !1
        }

        function f(e, t, n) {
            var r = e.charAt(0).toUpperCase() + e.slice(1),
                i = (e + " " + w.join(r + " ") + r).split(" ");
            return s(t, "string") || s(t, "undefined") ? u(i, t) : (i = (e + " " + E.join(r + " ") + r).split(" "), a(i, t, n))
        }
        var l = "2.8.3",
            c = {},
            h = t.documentElement,
            p = "modernizr",
            d = t.createElement(p),
            v = d.style,
            m, g = {}.toString,
            y = " -webkit- -moz- -o- -ms- ".split(" "),
            b = "Webkit Moz O ms",
            w = b.split(" "),
            E = b.toLowerCase().split(" "),
            S = {},
            x = {},
            T = {},
            N = [],
            C = N.slice,
            k, L = function (e, n, r, i) {
                var s, o, u, a, f = t.createElement("div"),
                    l = t.body,
                    c = l || t.createElement("body");
                if (parseInt(r, 10))
                    while (r--) u = t.createElement("div"), u.id = i ? i[r] : p + (r + 1), f.appendChild(u);
                return s = ["&#173;", '<style id="s', p, '">', e, "</style>"].join(""), f.id = p, (l ? f : c).innerHTML += s, c.appendChild(f), l || (c.style.background = "", c.style.overflow = "hidden", a = h.style.overflow, h.style.overflow = "hidden", h.appendChild(c)), o = n(f, e), l ? f.parentNode.removeChild(f) : (c.parentNode.removeChild(c), h.style.overflow = a), !!o
            },
            A = function () {
                function e(e, i) {
                    i = i || t.createElement(r[e] || "div"), e = "on" + e;
                    var o = e in i;
                    return o || (i.setAttribute || (i = t.createElement("div")), i.setAttribute && i.removeAttribute && (i.setAttribute(e, ""), o = s(i[e], "function"), s(i[e], "undefined") || (i[e] = n), i.removeAttribute(e))), i = null, o
                }
                var r = {
                    select: "input",
                    change: "input",
                    submit: "form",
                    reset: "form",
                    error: "img",
                    load: "img",
                    abort: "img"
                };
                return e
            }(),
            O = {}.hasOwnProperty,
            M;
        !s(O, "undefined") && !s(O.call, "undefined") ? M = function (e, t) {
            return O.call(e, t)
        } : M = function (e, t) {
            return t in e && s(e.constructor.prototype[t], "undefined")
        }, Function.prototype.bind || (Function.prototype.bind = function (e) {
            var t = this;
            if (typeof t != "function") throw new TypeError;
            var n = C.call(arguments, 1),
                r = function () {
                    if (this instanceof r) {
                        var i = function () {};
                        i.prototype = t.prototype;
                        var s = new i,
                            o = t.apply(s, n.concat(C.call(arguments)));
                        return Object(o) === o ? o : s
                    }
                    return t.apply(e, n.concat(C.call(arguments)))
                };
            return r
        }), S.cssanimations = function () {
            return f("animationName")
        }, S.csstransforms3d = function () {
            var e = !!f("perspective");
            return e && "webkitPerspective" in h.style && L("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function (t, n) {
                e = t.offsetLeft === 9 && t.offsetHeight === 3
            }), e
        };
        for (var _ in S) M(S, _) && (k = _.toLowerCase(), c[k] = S[_](), N.push((c[k] ? "" : "no-") + k));
        return c.addTest = function (e, t) {
            if (typeof e == "object")
                for (var r in e) M(e, r) && c.addTest(r, e[r]);
            else {
                e = e.toLowerCase();
                if (c[e] !== n) return c;
                t = typeof t == "function" ? t() : t, typeof enableClasses != "undefined" && enableClasses && (h.className += " " + (t ? "" : "no-") + e), c[e] = t
            }
            return c
        }, r(""), d = m = null, c._version = l, c._prefixes = y, c._domPrefixes = E, c._cssomPrefixes = w, c.hasEvent = A, c.testProp = function (e) {
            return u([e])
        }, c.testAllProps = f, c.testStyles = L, c.prefixed = function (e, t, n) {
            return t ? f(e, t, n) : f(e, "pfx")
        }, c
    }(this, this.document), window.define && window.define("module/components/page-transition/modernizr.custom", function () {}),
    function (e) {
        function n(e) {
            var n = e.length,
                r = t.type(e);
            return r === "function" || t.isWindow(e) ? !1 : e.nodeType === 1 && n ? !0 : r === "array" || n === 0 || typeof n == "number" && n > 0 && n - 1 in e
        }
        if (e.jQuery) return;
        var t = function (e, n) {
            return new t.fn.init(e, n)
        };
        t.isWindow = function (e) {
            return e != null && e == e.window
        }, t.type = function (e) {
            return e == null ? e + "" : typeof e == "object" || typeof e == "function" ? i[o.call(e)] || "object" : typeof e
        }, t.isArray = Array.isArray || function (e) {
            return t.type(e) === "array"
        }, t.isPlainObject = function (e) {
            var n;
            if (!e || t.type(e) !== "object" || e.nodeType || t.isWindow(e)) return !1;
            try {
                if (e.constructor && !s.call(e, "constructor") && !s.call(e.constructor.prototype, "isPrototypeOf")) return !1
            } catch (r) {
                return !1
            }
            for (n in e);
            return n === undefined || s.call(e, n)
        }, t.each = function (e, t, r) {
            var i, s = 0,
                o = e.length,
                u = n(e);
            if (r)
                if (u)
                    for (; s < o; s++) {
                        i = t.apply(e[s], r);
                        if (i === !1) break
                    } else
                        for (s in e) {
                            i = t.apply(e[s], r);
                            if (i === !1) break
                        } else if (u)
                            for (; s < o; s++) {
                                i = t.call(e[s], s, e[s]);
                                if (i === !1) break
                            } else
                                for (s in e) {
                                    i = t.call(e[s], s, e[s]);
                                    if (i === !1) break
                                }
                        return e
        }, t.data = function (e, n, i) {
            if (i === undefined) {
                var s = e[t.expando],
                    o = s && r[s];
                if (n === undefined) return o;
                if (o && n in o) return o[n]
            } else if (n !== undefined) {
                var s = e[t.expando] || (e[t.expando] = ++t.uuid);
                return r[s] = r[s] || {}, r[s][n] = i, i
            }
        }, t.removeData = function (e, n) {
            var i = e[t.expando],
                s = i && r[i];
            s && t.each(n, function (e, t) {
                delete s[t]
            })
        }, t.extend = function () {
            var e, n, r, i, s, o, u = arguments[0] || {},
                a = 1,
                f = arguments.length,
                l = !1;
            typeof u == "boolean" && (l = u, u = arguments[a] || {}, a++), typeof u != "object" && t.type(u) !== "function" && (u = {}), a === f && (u = this, a--);
            for (; a < f; a++)
                if ((s = arguments[a]) != null)
                    for (i in s) {
                        e = u[i], r = s[i];
                        if (u === r) continue;
                        l && r && (t.isPlainObject(r) || (n = t.isArray(r))) ? (n ? (n = !1, o = e && t.isArray(e) ? e : []) : o = e && t.isPlainObject(e) ? e : {}, u[i] = t.extend(l, o, r)) : r !== undefined && (u[i] = r)
                    }
                return u
        }, t.queue = function (e, r, i) {
            function s(e, t) {
                var r = t || [];
                return e != null && (n(Object(e)) ? function (e, t) {
                    var n = +t.length,
                        r = 0,
                        i = e.length;
                    while (r < n) e[i++] = t[r++];
                    if (n !== n)
                        while (t[r] !== undefined) e[i++] = t[r++];
                    return e.length = i, e
                }(r, typeof e == "string" ? [e] : e) : [].push.call(r, e)), r
            }
            if (!e) return;
            r = (r || "fx") + "queue";
            var o = t.data(e, r);
            return i ? (!o || t.isArray(i) ? o = t.data(e, r, s(i)) : o.push(i), o) : o || []
        }, t.dequeue = function (e, n) {
            t.each(e.nodeType ? [e] : e, function (e, r) {
                n = n || "fx";
                var i = t.queue(r, n),
                    s = i.shift();
                s === "inprogress" && (s = i.shift()), s && (n === "fx" && i.unshift("inprogress"), s.call(r, function () {
                    t.dequeue(r, n)
                }))
            })
        }, t.fn = t.prototype = {
            init: function (e) {
                if (e.nodeType) return this[0] = e, this;
                throw new Error("Not a DOM node.")
            }, offset: function () {
                var t = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : {
                    top: 0,
                    left: 0
                };
                return {
                    top: t.top + (e.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
                    left: t.left + (e.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
                }
            }, position: function () {
                function e() {
                    var e = this.offsetParent || document;
                    while (e && !e.nodeType.toLowerCase === "html" && e.style.position === "static") e = e.offsetParent;
                    return e || document
                }
                var n = this[0],
                    e = e.apply(n),
                    r = this.offset(),
                    i = /^(?:body|html)$/i.test(e.nodeName) ? {
                        top: 0,
                        left: 0
                    } : t(e).offset();
                return r.top -= parseFloat(n.style.marginTop) || 0, r.left -= parseFloat(n.style.marginLeft) || 0, e.style && (i.top += parseFloat(e.style.borderTopWidth) || 0, i.left += parseFloat(e.style.borderLeftWidth) || 0), {
                    top: r.top - i.top,
                    left: r.left - i.left
                }
            }
        };
        var r = {};
        t.expando = "velocity" + (new Date).getTime(), t.uuid = 0;
        var i = {},
            s = i.hasOwnProperty,
            o = i.toString,
            u = "Boolean Number String Function Array Date RegExp Object Error".split(" ");
        for (var a = 0; a < u.length; a++) i["[object " + u[a] + "]"] = u[a].toLowerCase();
        t.fn.init.prototype = t.fn, e.Velocity = {
            Utilities: t
        }
    }(window),
    function (e) {
        typeof module == "object" && typeof module.exports == "object" ? module.exports = e() : typeof define == "function" && define.amd ? define("module/velocity/velocity", e) : e()
    }(function () {
        return function (e, t, n, r) {
            function o(e) {
                var t = -1,
                    n = e ? e.length : 0,
                    r = [];
                while (++t < n) {
                    var i = e[t];
                    i && r.push(i)
                }
                return r
            }

            function u(e) {
                return a.isWrapped(e) ? e = [].slice.call(e) : a.isNode(e) && (e = [e]), e
            }

            function d(e) {
                var t = f.data(e, "velocity");
                return t === null ? r : t
            }

            function v(e) {
                return function (t) {
                    return Math.round(t * e) * (1 / e)
                }
            }

            function m(e, n, r, i) {
                function d(e, t) {
                    return 1 - 3 * t + 3 * e
                }

                function v(e, t) {
                    return 3 * t - 6 * e
                }

                function m(e) {
                    return 3 * e
                }

                function g(e, t, n) {
                    return ((d(t, n) * e + v(t, n)) * e + m(t)) * e
                }

                function y(e, t, n) {
                    return 3 * d(t, n) * e * e + 2 * v(t, n) * e + m(t)
                }

                function b(t, n) {
                    for (var i = 0; i < s; ++i) {
                        var o = y(n, e, r);
                        if (o === 0) return n;
                        var u = g(n, e, r) - t;
                        n -= u / o
                    }
                    return n
                }

                function w() {
                    for (var t = 0; t < f; ++t) p[t] = g(t * l, e, r)
                }

                function E(t, n, i) {
                    var s, o, f = 0;
                    do o = n + (i - n) / 2, s = g(o, e, r) - t, s > 0 ? i = o : n = o; while (Math.abs(s) > u && ++f < a);
                    return o
                }

                function S(t) {
                    var n = 0,
                        i = 1,
                        s = f - 1;
                    for (; i != s && p[i] <= t; ++i) n += l;
                    --i;
                    var u = (t - p[i]) / (p[i + 1] - p[i]),
                        a = n + u * l,
                        c = y(a, e, r);
                    return c >= o ? b(t, a) : c == 0 ? a : E(t, n, n + l)
                }

                function T() {
                    x = !0, (e != n || r != i) && w()
                }
                var s = 4,
                    o = .001,
                    u = 1e-7,
                    a = 10,
                    f = 11,
                    l = 1 / (f - 1),
                    c = "Float32Array" in t;
                if (arguments.length !== 4) return !1;
                for (var h = 0; h < 4; ++h)
                    if (typeof arguments[h] != "number" || isNaN(arguments[h]) || !isFinite(arguments[h])) return !1;
                e = Math.min(e, 1), r = Math.min(r, 1), e = Math.max(e, 0), r = Math.max(r, 0);
                var p = c ? new Float32Array(f) : new Array(f),
                    x = !1,
                    N = function (t) {
                        return x || T(), e === n && r === i ? t : t === 0 ? 0 : t === 1 ? 1 : g(S(t), n, i)
                    };
                N.getControlPoints = function () {
                    return [{
                        x: e,
                        y: n
                    }, {
                        x: r,
                        y: i
                    }]
                };
                var C = "generateBezier(" + [e, n, r, i] + ")";
                return N.toString = function () {
                    return C
                }, N
            }

            function y(e, t) {
                var n = e;
                return a.isString(e) ? p.Easings[e] || (n = !1) : a.isArray(e) && e.length === 1 ? n = v.apply(null, e) : a.isArray(e) && e.length === 2 ? n = g.apply(null, e.concat([t])) : a.isArray(e) && e.length === 4 ? n = m.apply(null, e) : n = !1, n === !1 && (p.Easings[p.defaults.easing] ? n = p.defaults.easing : n = h), n
            }

            function S(e) {
                if (e) {
                    var t = (new Date).getTime(),
                        n = p.State.calls.length;
                    n > 1e4 && (p.State.calls = o(p.State.calls));
                    for (var i = 0; i < n; i++) {
                        if (!p.State.calls[i]) continue;
                        var s = p.State.calls[i],
                            u = s[0],
                            l = s[2],
                            c = s[3],
                            h = !!c,
                            v = null;
                        c || (c = p.State.calls[i][3] = t - 16);
                        var m = Math.min((t - c) / l.duration, 1);
                        for (var g = 0, y = u.length; g < y; g++) {
                            var w = u[g],
                                T = w.element;
                            if (!d(T)) continue;
                            var N = !1;
                            if (l.display !== r && l.display !== null && l.display !== "none") {
                                if (l.display === "flex") {
                                    var C = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];
                                    f.each(C, function (e, t) {
                                        b.setPropertyValue(T, "display", t)
                                    })
                                }
                                b.setPropertyValue(T, "display", l.display)
                            }
                            l.visibility !== r && l.visibility !== "hidden" && b.setPropertyValue(T, "visibility", l.visibility);
                            for (var k in w)
                                if (k !== "element") {
                                    var L = w[k],
                                        A, O = a.isString(L.easing) ? p.Easings[L.easing] : L.easing;
                                    if (m === 1) A = L.endValue;
                                    else {
                                        var M = L.endValue - L.startValue;
                                        A = L.startValue + M * O(m, l, M);
                                        if (!h && A === L.currentValue) continue
                                    }
                                    L.currentValue = A;
                                    if (k === "tween") v = A;
                                    else {
                                        if (b.Hooks.registered[k]) {
                                            var _ = b.Hooks.getRoot(k),
                                                D = d(T).rootPropertyValueCache[_];
                                            D && (L.rootPropertyValue = D)
                                        }
                                        var P = b.setPropertyValue(T, k, L.currentValue + (parseFloat(A) === 0 ? "" : L.unitType), L.rootPropertyValue, L.scrollData);
                                        b.Hooks.registered[k] && (b.Normalizations.registered[_] ? d(T).rootPropertyValueCache[_] = b.Normalizations.registered[_]("extract", null, P[1]) : d(T).rootPropertyValueCache[_] = P[1]), P[0] === "transform" && (N = !0)
                                    }
                                }
                            l.mobileHA && d(T).transformCache.translate3d === r && (d(T).transformCache.translate3d = "(0px, 0px, 0px)", N = !0), N && b.flushTransformCache(T)
                        }
                        l.display !== r && l.display !== "none" && (p.State.calls[i][2].display = !1), l.visibility !== r && l.visibility !== "hidden" && (p.State.calls[i][2].visibility = !1), l.progress && l.progress.call(s[1], s[1], m, Math.max(0, c + l.duration - t), c, v), m === 1 && x(i)
                    }
                }
                p.State.isTicking && E(S)
            }

            function x(e, t) {
                if (!p.State.calls[e]) return !1;
                var n = p.State.calls[e][0],
                    i = p.State.calls[e][1],
                    s = p.State.calls[e][2],
                    o = p.State.calls[e][4],
                    u = !1;
                for (var a = 0, l = n.length; a < l; a++) {
                    var c = n[a].element;
                    !t && !s.loop && (s.display === "none" && b.setPropertyValue(c, "display", s.display), s.visibility === "hidden" && b.setPropertyValue(c, "visibility", s.visibility));
                    if (s.loop !== !0 && (f.queue(c)[1] === r || !/\.velocityQueueEntryFlag/i.test(f.queue(c)[1])) && d(c)) {
                        d(c).isAnimating = !1, d(c).rootPropertyValueCache = {};
                        var h = !1;
                        f.each(b.Lists.transforms3D, function (e, t) {
                            var n = /^scale/.test(t) ? 1 : 0,
                                i = d(c).transformCache[t];
                            d(c).transformCache[t] !== r && (new RegExp("^\\(" + n + "[^.]")).test(i) && (h = !0, delete d(c).transformCache[t])
                        }), s.mobileHA && (h = !0, delete d(c).transformCache.translate3d), h && b.flushTransformCache(c), b.Values.removeClass(c, "velocity-animating")
                    }
                    if (!t && s.complete && !s.loop && a === l - 1) try {
                        s.complete.call(i, i)
                    } catch (v) {
                        setTimeout(function () {
                            throw v
                        }, 1)
                    }
                    o && s.loop !== !0 && o(i), d(c) && s.loop === !0 && !t && (f.each(d(c).tweensContainer, function (e, t) {
                        /^rotate/.test(e) && parseFloat(t.endValue) === 360 && (t.endValue = 0, t.startValue = 360), /^backgroundPosition/.test(e) && parseFloat(t.endValue) === 100 && t.unitType === "%" && (t.endValue = 0, t.startValue = 100)
                    }), p(c, "reverse", {
                        loop: !0,
                        delay: s.delay
                    })), s.queue !== !1 && f.dequeue(c, s.queue)
                }
                p.State.calls[e] = !1;
                for (var m = 0, g = p.State.calls.length; m < g; m++)
                    if (p.State.calls[m] !== !1) {
                        u = !0;
                        break
                    }
                u === !1 && (p.State.isTicking = !1, delete p.State.calls, p.State.calls = [])
            }
            var i = function () {
                    if (n.documentMode) return n.documentMode;
                    for (var e = 7; e > 4; e--) {
                        var t = n.createElement("div");
                        t.innerHTML = "<!--[if IE " + e + "]><span></span><![endif]-->";
                        if (t.getElementsByTagName("span").length) return t = null, e
                    }
                    return r
                }(),
                s = function () {
                    var e = 0;
                    return t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || function (t) {
                        var n = (new Date).getTime(),
                            r;
                        return r = Math.max(0, 16 - (n - e)), e = n + r, setTimeout(function () {
                            t(n + r)
                        }, r)
                    }
                }(),
                a = {
                    isString: function (e) {
                        return typeof e == "string"
                    }, isArray: Array.isArray || function (e) {
                        return Object.prototype.toString.call(e) === "[object Array]"
                    }, isFunction: function (e) {
                        return Object.prototype.toString.call(e) === "[object Function]"
                    }, isNode: function (e) {
                        return e && e.nodeType
                    }, isNodeList: function (e) {
                        return typeof e == "object" && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e)) && e.length !== r && (e.length === 0 || typeof e[0] == "object" && e[0].nodeType > 0)
                    }, isWrapped: function (e) {
                        return e && (e.jquery || t.Zepto && t.Zepto.zepto.isZ(e))
                    }, isSVG: function (e) {
                        return t.SVGElement && e instanceof t.SVGElement
                    }, isEmptyObject: function (e) {
                        for (var t in e) return !1;
                        return !0
                    }
                },
                f, l = !1;
            e.fn && e.fn.jquery ? (f = e, l = !0) : f = t.Velocity.Utilities;
            if (i <= 8 && !l) throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
            if (i <= 7) {
                jQuery.fn.velocity = jQuery.fn.animate;
                return
            }
            var c = 400,
                h = "swing",
                p = {
                    State: {
                        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                        isAndroid: /Android/i.test(navigator.userAgent),
                        isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
                        isChrome: t.chrome,
                        isFirefox: /Firefox/i.test(navigator.userAgent),
                        prefixElement: n.createElement("div"),
                        prefixMatches: {},
                        scrollAnchor: null,
                        scrollPropertyLeft: null,
                        scrollPropertyTop: null,
                        isTicking: !1,
                        calls: []
                    },
                    CSS: {},
                    Utilities: f,
                    Redirects: {},
                    Easings: {},
                    Promise: t.Promise,
                    defaults: {
                        queue: "",
                        duration: c,
                        easing: h,
                        begin: r,
                        complete: r,
                        progress: r,
                        display: r,
                        visibility: r,
                        loop: !1,
                        delay: !1,
                        mobileHA: !0,
                        _cacheValues: !0
                    },
                    init: function (e) {
                        f.data(e, "velocity", {
                            isSVG: a.isSVG(e),
                            isAnimating: !1,
                            computedStyle: null,
                            tweensContainer: null,
                            rootPropertyValueCache: {},
                            transformCache: {}
                        })
                    }, hook: null,
                    mock: !1,
                    version: {
                        major: 1,
                        minor: 2,
                        patch: 2
                    },
                    debug: !1
                };
            t.pageYOffset !== r ? (p.State.scrollAnchor = t, p.State.scrollPropertyLeft = "pageXOffset", p.State.scrollPropertyTop = "pageYOffset") : (p.State.scrollAnchor = n.documentElement || n.body.parentNode || n.body, p.State.scrollPropertyLeft = "scrollLeft", p.State.scrollPropertyTop = "scrollTop");
            var g = function () {
                function e(e) {
                    return -e.tension * e.x - e.friction * e.v
                }

                function t(t, n, r) {
                    var i = {
                        x: t.x + r.dx * n,
                        v: t.v + r.dv * n,
                        tension: t.tension,
                        friction: t.friction
                    };
                    return {
                        dx: i.v,
                        dv: e(i)
                    }
                }

                function n(n, r) {
                    var i = {
                            dx: n.v,
                            dv: e(n)
                        },
                        s = t(n, r * .5, i),
                        o = t(n, r * .5, s),
                        u = t(n, r, o),
                        a = 1 / 6 * (i.dx + 2 * (s.dx + o.dx) + u.dx),
                        f = 1 / 6 * (i.dv + 2 * (s.dv + o.dv) + u.dv);
                    return n.x = n.x + a * r, n.v = n.v + f * r, n
                }
                return function r(e, t, i) {
                    var s = {
                            x: -1,
                            v: 0,
                            tension: null,
                            friction: null
                        },
                        o = [0],
                        u = 0,
                        a = 1e-4,
                        f = .016,
                        l, c, h;
                    e = parseFloat(e) || 500, t = parseFloat(t) || 20, i = i || null, s.tension = e, s.friction = t, l = i !== null, l ? (u = r(e, t), c = u / i * f) : c = f;
                    for (;;) {
                        h = n(h || s, c), o.push(1 + h.x), u += 16;
                        if (!(Math.abs(h.x) > a && Math.abs(h.v) > a)) break
                    }
                    return l ? function (e) {
                        return o[e * (o.length - 1) | 0]
                    } : u
                }
            }();
            p.Easings = {
                linear: function (e) {
                    return e
                }, swing: function (e) {
                    return .5 - Math.cos(e * Math.PI) / 2
                }, spring: function (e) {
                    return 1 - Math.cos(e * 4.5 * Math.PI) * Math.exp(-e * 6)
                }
            }, f.each([
                ["ease", [.25, .1, .25, 1]],
                ["ease-in", [.42, 0, 1, 1]],
                ["ease-out", [0, 0, .58, 1]],
                ["ease-in-out", [.42, 0, .58, 1]],
                ["easeInSine", [.47, 0, .745, .715]],
                ["easeOutSine", [.39, .575, .565, 1]],
                ["easeInOutSine", [.445, .05, .55, .95]],
                ["easeInQuad", [.55, .085, .68, .53]],
                ["easeOutQuad", [.25, .46, .45, .94]],
                ["easeInOutQuad", [.455, .03, .515, .955]],
                ["easeInCubic", [.55, .055, .675, .19]],
                ["easeOutCubic", [.215, .61, .355, 1]],
                ["easeInOutCubic", [.645, .045, .355, 1]],
                ["easeInQuart", [.895, .03, .685, .22]],
                ["easeOutQuart", [.165, .84, .44, 1]],
                ["easeInOutQuart", [.77, 0, .175, 1]],
                ["easeInQuint", [.755, .05, .855, .06]],
                ["easeOutQuint", [.23, 1, .32, 1]],
                ["easeInOutQuint", [.86, 0, .07, 1]],
                ["easeInExpo", [.95, .05, .795, .035]],
                ["easeOutExpo", [.19, 1, .22, 1]],
                ["easeInOutExpo", [1, 0, 0, 1]],
                ["easeInCirc", [.6, .04, .98, .335]],
                ["easeOutCirc", [.075, .82, .165, 1]],
                ["easeInOutCirc", [.785, .135, .15, .86]]
            ], function (e, t) {
                p.Easings[t[0]] = m.apply(null, t[1])
            });
            var b = p.CSS = {
                RegEx: {
                    isHex: /^#([A-f\d]{3}){1,2}$/i,
                    valueUnwrap: /^[A-z]+\((.*)\)$/i,
                    wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
                    valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/ig
                },
                Lists: {
                    colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
                    transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
                    transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"]
                },
                Hooks: {
                    templates: {
                        textShadow: ["Color X Y Blur", "black 0px 0px 0px"],
                        boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
                        clip: ["Top Right Bottom Left", "0px 0px 0px 0px"],
                        backgroundPosition: ["X Y", "0% 0%"],
                        transformOrigin: ["X Y Z", "50% 50% 0px"],
                        perspectiveOrigin: ["X Y", "50% 50%"]
                    },
                    registered: {},
                    register: function () {
                        for (var e = 0; e < b.Lists.colors.length; e++) {
                            var t = b.Lists.colors[e] === "color" ? "0 0 0 1" : "255 255 255 1";
                            b.Hooks.templates[b.Lists.colors[e]] = ["Red Green Blue Alpha", t]
                        }
                        var n, r, s;
                        if (i)
                            for (n in b.Hooks.templates) {
                                r = b.Hooks.templates[n], s = r[0].split(" ");
                                var o = r[1].match(b.RegEx.valueSplit);
                                s[0] === "Color" && (s.push(s.shift()), o.push(o.shift()), b.Hooks.templates[n] = [s.join(" "), o.join(" ")])
                            }
                        for (n in b.Hooks.templates) {
                            r = b.Hooks.templates[n], s = r[0].split(" ");
                            for (var e in s) {
                                var u = n + s[e],
                                    a = e;
                                b.Hooks.registered[u] = [n, a]
                            }
                        }
                    }, getRoot: function (e) {
                        var t = b.Hooks.registered[e];
                        return t ? t[0] : e
                    }, cleanRootPropertyValue: function (e, t) {
                        return b.RegEx.valueUnwrap.test(t) && (t = t.match(b.RegEx.valueUnwrap)[1]), b.Values.isCSSNullValue(t) && (t = b.Hooks.templates[e][1]), t
                    }, extractValue: function (e, t) {
                        var n = b.Hooks.registered[e];
                        if (n) {
                            var r = n[0],
                                i = n[1];
                            return t = b.Hooks.cleanRootPropertyValue(r, t), t.toString().match(b.RegEx.valueSplit)[i]
                        }
                        return t
                    }, injectValue: function (e, t, n) {
                        var r = b.Hooks.registered[e];
                        if (r) {
                            var i = r[0],
                                s = r[1],
                                o, u;
                            return n = b.Hooks.cleanRootPropertyValue(i, n), o = n.toString().match(b.RegEx.valueSplit), o[s] = t, u = o.join(" "), u
                        }
                        return n
                    }
                },
                Normalizations: {
                    registered: {
                        clip: function (e, t, n) {
                            switch (e) {
                            case "name":
                                return "clip";
                            case "extract":
                                var r;
                                return b.RegEx.wrappedValueAlreadyExtracted.test(n) ? r = n : (r = n.toString().match(b.RegEx.valueUnwrap), r = r ? r[1].replace(/,(\s+)?/g, " ") : n), r;
                            case "inject":
                                return "rect(" + n + ")"
                            }
                        }, blur: function (e, t, n) {
                            switch (e) {
                            case "name":
                                return p.State.isFirefox ? "filter" : "-webkit-filter";
                            case "extract":
                                var r = parseFloat(n);
                                if (!r && r !== 0) {
                                    var i = n.toString().match(/blur\(([0-9]+[A-z]+)\)/i);
                                    i ? r = i[1] : r = 0
                                }
                                return r;
                            case "inject":
                                return parseFloat(n) ? "blur(" + n + ")" : "none"
                            }
                        }, opacity: function (e, t, n) {
                            if (i <= 8) switch (e) {
                            case "name":
                                return "filter";
                            case "extract":
                                var r = n.toString().match(/alpha\(opacity=(.*)\)/i);
                                return r ? n = r[1] / 100 : n = 1, n;
                            case "inject":
                                return t.style.zoom = 1, parseFloat(n) >= 1 ? "" : "alpha(opacity=" + parseInt(parseFloat(n) * 100, 10) + ")"
                            } else switch (e) {
                            case "name":
                                return "opacity";
                            case "extract":
                                return n;
                            case "inject":
                                return n
                            }
                        }
                    },
                    register: function () {
                        !(i <= 9) && !p.State.isGingerbread && (b.Lists.transformsBase = b.Lists.transformsBase.concat(b.Lists.transforms3D));
                        for (var e = 0; e < b.Lists.transformsBase.length; e++)(function () {
                            var t = b.Lists.transformsBase[e];
                            b.Normalizations.registered[t] = function (e, n, i) {
                                switch (e) {
                                case "name":
                                    return "transform";
                                case "extract":
                                    return d(n) === r || d(n).transformCache[t] === r ? /^scale/i.test(t) ? 1 : 0 : d(n).transformCache[t].replace(/[()]/g, "");
                                case "inject":
                                    var s = !1;
                                    switch (t.substr(0, t.length - 1)) {
                                    case "translate":
                                        s = !/(%|px|em|rem|vw|vh|\d)$/i.test(i);
                                        break;
                                    case "scal":
                                    case "scale":
                                        p.State.isAndroid && d(n).transformCache[t] === r && i < 1 && (i = 1), s = !/(\d)$/i.test(i);
                                        break;
                                    case "skew":
                                        s = !/(deg|\d)$/i.test(i);
                                        break;
                                    case "rotate":
                                        s = !/(deg|\d)$/i.test(i)
                                    }
                                    return s || (d(n).transformCache[t] = "(" + i + ")"), d(n).transformCache[t]
                                }
                            }
                        })();
                        for (var e = 0; e < b.Lists.colors.length; e++)(function () {
                            var t = b.Lists.colors[e];
                            b.Normalizations.registered[t] = function (e, n, s) {
                                switch (e) {
                                case "name":
                                    return t;
                                case "extract":
                                    var o;
                                    if (b.RegEx.wrappedValueAlreadyExtracted.test(s)) o = s;
                                    else {
                                        var u, a = {
                                            black: "rgb(0, 0, 0)",
                                            blue: "rgb(0, 0, 255)",
                                            gray: "rgb(128, 128, 128)",
                                            green: "rgb(0, 128, 0)",
                                            red: "rgb(255, 0, 0)",
                                            white: "rgb(255, 255, 255)"
                                        };
                                        /^[A-z]+$/i.test(s) ? a[s] !== r ? u = a[s] : u = a.black : b.RegEx.isHex.test(s) ? u = "rgb(" + b.Values.hexToRgb(s).join(" ") + ")" : /^rgba?\(/i.test(s) || (u = a.black), o = (u || s).toString().match(b.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ")
                                    }
                                    return !(i <= 8) && o.split(" ").length === 3 && (o += " 1"), o;
                                case "inject":
                                    return i <= 8 ? s.split(" ").length === 4 && (s = s.split(/\s+/).slice(0, 3).join(" ")) : s.split(" ").length === 3 && (s += " 1"), (i <= 8 ? "rgb" : "rgba") + "(" + s.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")"
                                }
                            }
                        })()
                    }
                },
                Names: {
                    camelCase: function (e) {
                        return e.replace(/-(\w)/g, function (e, t) {
                            return t.toUpperCase()
                        })
                    }, SVGAttribute: function (e) {
                        var t = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
                        if (i || p.State.isAndroid && !p.State.isChrome) t += "|transform";
                        return (new RegExp("^(" + t + ")$", "i")).test(e)
                    }, prefixCheck: function (e) {
                        if (p.State.prefixMatches[e]) return [p.State.prefixMatches[e], !0];
                        var t = ["", "Webkit", "Moz", "ms", "O"];
                        for (var n = 0, r = t.length; n < r; n++) {
                            var i;
                            n === 0 ? i = e : i = t[n] + e.replace(/^\w/, function (e) {
                                return e.toUpperCase()
                            });
                            if (a.isString(p.State.prefixElement.style[i])) return p.State.prefixMatches[e] = i, [i, !0]
                        }
                        return [e, !1]
                    }
                },
                Values: {
                    hexToRgb: function (e) {
                        var t = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                            n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
                            r;
                        return e = e.replace(t, function (e, t, n, r) {
                            return t + t + n + n + r + r
                        }), r = n.exec(e), r ? [parseInt(r[1], 16), parseInt(r[2], 16), parseInt(r[3], 16)] : [0, 0, 0]
                    }, isCSSNullValue: function (e) {
                        return e == 0 || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)
                    }, getUnitType: function (e) {
                        return /^(rotate|skew)/i.test(e) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e) ? "" : "px"
                    }, getDisplayType: function (e) {
                        var t = e && e.tagName.toString().toLowerCase();
                        return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t) ? "inline" : /^(li)$/i.test(t) ? "list-item" : /^(tr)$/i.test(t) ? "table-row" : /^(table)$/i.test(t) ? "table" : /^(tbody)$/i.test(t) ? "table-row-group" : "block"
                    }, addClass: function (e, t) {
                        e.classList ? e.classList.add(t) : e.className += (e.className.length ? " " : "") + t
                    }, removeClass: function (e, t) {
                        e.classList ? e.classList.remove(t) : e.className = e.className.toString().replace(new RegExp("(^|\\s)" + t.split(" ").join("|") + "(\\s|$)", "gi"), " ")
                    }
                },
                getPropertyValue: function (e, n, s, o) {
                    function u(e, n) {
                        var s = 0;
                        if (i <= 8) s = f.css(e, n);
                        else {
                            var a = !1;
                            /^(width|height)$/.test(n) && b.getPropertyValue(e, "display") === 0 && (a = !0, b.setPropertyValue(e, "display", b.Values.getDisplayType(e)));
                            var l = function () {
                                a && b.setPropertyValue(e, "display", "none")
                            };
                            if (!o) {
                                if (n === "height" && b.getPropertyValue(e, "boxSizing").toString().toLowerCase() !== "border-box") {
                                    var c = e.offsetHeight - (parseFloat(b.getPropertyValue(e, "borderTopWidth")) || 0) - (parseFloat(b.getPropertyValue(e, "borderBottomWidth")) || 0) - (parseFloat(b.getPropertyValue(e, "paddingTop")) || 0) - (parseFloat(b.getPropertyValue(e, "paddingBottom")) || 0);
                                    return l(), c
                                }
                                if (n === "width" && b.getPropertyValue(e, "boxSizing").toString().toLowerCase() !== "border-box") {
                                    var h = e.offsetWidth - (parseFloat(b.getPropertyValue(e, "borderLeftWidth")) || 0) - (parseFloat(b.getPropertyValue(e, "borderRightWidth")) || 0) - (parseFloat(b.getPropertyValue(e, "paddingLeft")) || 0) - (parseFloat(b.getPropertyValue(e, "paddingRight")) || 0);
                                    return l(), h
                                }
                            }
                            var p;
                            d(e) === r ? p = t.getComputedStyle(e, null) : d(e).computedStyle ? p = d(e).computedStyle : p = d(e).computedStyle = t.getComputedStyle(e, null), n === "borderColor" && (n = "borderTopColor"), i === 9 && n === "filter" ? s = p.getPropertyValue(n) : s = p[n];
                            if (s === "" || s === null) s = e.style[n];
                            l()
                        } if (s === "auto" && /^(top|right|bottom|left)$/i.test(n)) {
                            var v = u(e, "position");
                            if (v === "fixed" || v === "absolute" && /top|left/i.test(n)) s = f(e).position()[n] + "px"
                        }
                        return s
                    }
                    var a;
                    if (b.Hooks.registered[n]) {
                        var l = n,
                            c = b.Hooks.getRoot(l);
                        s === r && (s = b.getPropertyValue(e, b.Names.prefixCheck(c)[0])), b.Normalizations.registered[c] && (s = b.Normalizations.registered[c]("extract", e, s)), a = b.Hooks.extractValue(l, s)
                    } else if (b.Normalizations.registered[n]) {
                        var h, v;
                        h = b.Normalizations.registered[n]("name", e), h !== "transform" && (v = u(e, b.Names.prefixCheck(h)[0]), b.Values.isCSSNullValue(v) && b.Hooks.templates[n] && (v = b.Hooks.templates[n][1])), a = b.Normalizations.registered[n]("extract", e, v)
                    }
                    if (!/^[\d-]/.test(a))
                        if (d(e) && d(e).isSVG && b.Names.SVGAttribute(n))
                            if (/^(height|width)$/i.test(n)) try {
                                a = e.getBBox()[n]
                            } catch (m) {
                                a = 0
                            } else a = e.getAttribute(n);
                            else a = u(e, b.Names.prefixCheck(n)[0]);
                    return b.Values.isCSSNullValue(a) && (a = 0), p.debug >= 2 && console.log("Get " + n + ": " + a), a
                }, setPropertyValue: function (e, n, r, s, o) {
                    var u = n;
                    if (n === "scroll") o.container ? o.container["scroll" + o.direction] = r : o.direction === "Left" ? t.scrollTo(r, o.alternateValue) : t.scrollTo(o.alternateValue, r);
                    else if (b.Normalizations.registered[n] && b.Normalizations.registered[n]("name", e) === "transform") b.Normalizations.registered[n]("inject", e, r), u = "transform", r = d(e).transformCache[n];
                    else {
                        if (b.Hooks.registered[n]) {
                            var a = n,
                                f = b.Hooks.getRoot(n);
                            s = s || b.getPropertyValue(e, f), r = b.Hooks.injectValue(a, r, s), n = f
                        }
                        b.Normalizations.registered[n] && (r = b.Normalizations.registered[n]("inject", e, r), n = b.Normalizations.registered[n]("name", e)), u = b.Names.prefixCheck(n)[0];
                        if (i <= 8) try {
                            e.style[u] = r
                        } catch (l) {
                            p.debug && console.log("Browser does not support [" + r + "] for [" + u + "]")
                        } else d(e) && d(e).isSVG && b.Names.SVGAttribute(n) ? e.setAttribute(n, r) : e.style[u] = r;
                        p.debug >= 2 && console.log("Set " + n + " (" + u + "): " + r)
                    }
                    return [u, r]
                }, flushTransformCache: function (e) {
                    var t = "";
                    if ((i || p.State.isAndroid && !p.State.isChrome) && d(e).isSVG) {
                        var n = function (t) {
                                return parseFloat(b.getPropertyValue(e, t))
                            },
                            r = {
                                translate: [n("translateX"), n("translateY")],
                                skewX: [n("skewX")],
                                skewY: [n("skewY")],
                                scale: n("scale") !== 1 ? [n("scale"), n("scale")] : [n("scaleX"), n("scaleY")],
                                rotate: [n("rotateZ"), 0, 0]
                            };
                        f.each(d(e).transformCache, function (e) {
                            /^translate/i.test(e) ? e = "translate" : /^scale/i.test(e) ? e = "scale" : /^rotate/i.test(e) && (e = "rotate"), r[e] && (t += e + "(" + r[e].join(" ") + ")" + " ", delete r[e])
                        })
                    } else {
                        var s, o;
                        f.each(d(e).transformCache, function (n) {
                            s = d(e).transformCache[n];
                            if (n === "transformPerspective") return o = s, !0;
                            i === 9 && n === "rotateZ" && (n = "rotate"), t += n + s + " "
                        }), o && (t = "perspective" + o + " " + t)
                    }
                    b.setPropertyValue(e, "transform", t)
                }
            };
            b.Hooks.register(), b.Normalizations.register(), p.hook = function (e, t, n) {
                var i = r;
                return e = u(e), f.each(e, function (e, s) {
                    d(s) === r && p.init(s);
                    if (n === r) i === r && (i = p.CSS.getPropertyValue(s, t));
                    else {
                        var o = p.CSS.setPropertyValue(s, t, n);
                        o[0] === "transform" && p.CSS.flushTransformCache(s), i = o
                    }
                }), i
            };
            var w = function () {
                function e() {
                    return s ? C.promise || null : o
                }

                function H() {
                    function u(u) {
                        if (i.begin && E === 0) try {
                            i.begin.call(h, h)
                        } catch (l) {
                            setTimeout(function () {
                                throw l
                            }, 1)
                        }
                        if (k === "scroll") {
                            var c = /^x$/i.test(i.axis) ? "Left" : "Top",
                                w = parseFloat(i.offset) || 0,
                                x, T, N;
                            i.container ? a.isWrapped(i.container) || a.isNode(i.container) ? (i.container = i.container[0] || i.container, x = i.container["scroll" + c], N = x + f(e).position()[c.toLowerCase()] + w) : i.container = null : (x = p.State.scrollAnchor[p.State["scrollProperty" + c]], T = p.State.scrollAnchor[p.State["scrollProperty" + (c === "Left" ? "Top" : "Left")]], N = f(e).offset()[c.toLowerCase()] + w), s = {
                                scroll: {
                                    rootPropertyValue: !1,
                                    startValue: x,
                                    currentValue: x,
                                    endValue: N,
                                    unitType: "",
                                    easing: i.easing,
                                    scrollData: {
                                        container: i.container,
                                        direction: c,
                                        alternateValue: T
                                    }
                                },
                                element: e
                            }, p.debug && console.log("tweensContainer (scroll): ", s.scroll, e)
                        } else if (k === "reverse") {
                            if (!d(e).tweensContainer) {
                                f.dequeue(e, i.queue);
                                return
                            }
                            d(e).opts.display === "none" && (d(e).opts.display = "auto"), d(e).opts.visibility === "hidden" && (d(e).opts.visibility = "visible"), d(e).opts.loop = !1, d(e).opts.begin = null, d(e).opts.complete = null, m.easing || delete i.easing, m.duration || delete i.duration, i = f.extend({}, d(e).opts, i);
                            var L = f.extend(!0, {}, d(e).tweensContainer);
                            for (var A in L)
                                if (A !== "element") {
                                    var O = L[A].startValue;
                                    L[A].startValue = L[A].currentValue = L[A].endValue, L[A].endValue = O, a.isEmptyObject(m) || (L[A].easing = i.easing), p.debug && console.log("reverse tweensContainer (" + A + "): " + JSON.stringify(L[A]), e)
                                }
                            s = L
                        } else if (k === "start") {
                            var L;
                            d(e).tweensContainer && d(e).isAnimating === !0 && (L = d(e).tweensContainer);
                            var M = function (t, n) {
                                var s = r,
                                    o = r,
                                    u = r;
                                if (a.isArray(t)) {
                                    s = t[0];
                                    if (!a.isArray(t[1]) && /^[\d-]/.test(t[1]) || a.isFunction(t[1]) || b.RegEx.isHex.test(t[1])) u = t[1];
                                    else if (a.isString(t[1]) && !b.RegEx.isHex.test(t[1]) || a.isArray(t[1])) o = n ? t[1] : y(t[1], i.duration), t[2] !== r && (u = t[2])
                                } else s = t;
                                return n || (o = o || i.easing), a.isFunction(s) && (s = s.call(e, E, g)), a.isFunction(u) && (u = u.call(e, E, g)), [s || 0, o, u]
                            };
                            f.each(v, function (e, t) {
                                if (RegExp("^" + b.Lists.colors.join("$|^") + "$").test(e)) {
                                    var n = M(t, !0),
                                        i = n[0],
                                        s = n[1],
                                        o = n[2];
                                    if (b.RegEx.isHex.test(i)) {
                                        var u = ["Red", "Green", "Blue"],
                                            a = b.Values.hexToRgb(i),
                                            f = o ? b.Values.hexToRgb(o) : r;
                                        for (var l = 0; l < u.length; l++) {
                                            var c = [a[l]];
                                            s && c.push(s), f !== r && c.push(f[l]), v[e + u[l]] = c
                                        }
                                        delete v[e]
                                    }
                                }
                            });
                            for (var _ in v) {
                                var H = M(v[_]),
                                    B = H[0],
                                    j = H[1],
                                    F = H[2];
                                _ = b.Names.camelCase(_);
                                var I = b.Hooks.getRoot(_),
                                    q = !1;
                                if (!d(e).isSVG && I !== "tween" && b.Names.prefixCheck(I)[1] === !1 && b.Normalizations.registered[I] === r) {
                                    p.debug && console.log("Skipping [" + I + "] due to a lack of browser support.");
                                    continue
                                }(i.display !== r && i.display !== null && i.display !== "none" || i.visibility !== r && i.visibility !== "hidden") && /opacity|filter/.test(_) && !F && B !== 0 && (F = 0), i._cacheValues && L && L[_] ? (F === r && (F = L[_].endValue + L[_].unitType), q = d(e).rootPropertyValueCache[I]) : b.Hooks.registered[_] ? F === r ? (q = b.getPropertyValue(e, I), F = b.getPropertyValue(e, _, q)) : q = b.Hooks.templates[I][1] : F === r && (F = b.getPropertyValue(e, _));
                                var R, U, z, W = !1,
                                    X = function (e, t) {
                                        var n, r;
                                        return r = (t || "0").toString().toLowerCase().replace(/[%A-z]+$/, function (e) {
                                            return n = e, ""
                                        }), n || (n = b.Values.getUnitType(e)), [r, n]
                                    };
                                R = X(_, F), F = R[0], z = R[1], R = X(_, B), B = R[0].replace(/^([+-\/*])=/, function (e, t) {
                                    return W = t, ""
                                }), U = R[1], F = parseFloat(F) || 0, B = parseFloat(B) || 0, U === "%" && (/^(fontSize|lineHeight)$/.test(_) ? (B /= 100, U = "em") : /^scale/.test(_) ? (B /= 100, U = "") : /(Red|Green|Blue)$/i.test(_) && (B = B / 100 * 255, U = ""));
                                var V = function () {
                                    var r = {
                                            myParent: e.parentNode || n.body,
                                            position: b.getPropertyValue(e, "position"),
                                            fontSize: b.getPropertyValue(e, "fontSize")
                                        },
                                        i = r.position === D.lastPosition && r.myParent === D.lastParent,
                                        s = r.fontSize === D.lastFontSize;
                                    D.lastParent = r.myParent, D.lastPosition = r.position, D.lastFontSize = r.fontSize;
                                    var o = 100,
                                        u = {};
                                    if (!s || !i) {
                                        var a = d(e).isSVG ? n.createElementNS("http://www.w3.org/2000/svg", "rect") : n.createElement("div");
                                        p.init(a), r.myParent.appendChild(a), f.each(["overflow", "overflowX", "overflowY"], function (e, t) {
                                            p.CSS.setPropertyValue(a, t, "hidden")
                                        }), p.CSS.setPropertyValue(a, "position", r.position), p.CSS.setPropertyValue(a, "fontSize", r.fontSize), p.CSS.setPropertyValue(a, "boxSizing", "content-box"), f.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function (e, t) {
                                            p.CSS.setPropertyValue(a, t, o + "%")
                                        }), p.CSS.setPropertyValue(a, "paddingLeft", o + "em"), u.percentToPxWidth = D.lastPercentToPxWidth = (parseFloat(b.getPropertyValue(a, "width", null, !0)) || 1) / o, u.percentToPxHeight = D.lastPercentToPxHeight = (parseFloat(b.getPropertyValue(a, "height", null, !0)) || 1) / o, u.emToPx = D.lastEmToPx = (parseFloat(b.getPropertyValue(a, "paddingLeft")) || 1) / o, r.myParent.removeChild(a)
                                    } else u.emToPx = D.lastEmToPx, u.percentToPxWidth = D.lastPercentToPxWidth, u.percentToPxHeight = D.lastPercentToPxHeight;
                                    return D.remToPx === null && (D.remToPx = parseFloat(b.getPropertyValue(n.body, "fontSize")) || 16), D.vwToPx === null && (D.vwToPx = parseFloat(t.innerWidth) / 100, D.vhToPx = parseFloat(t.innerHeight) / 100), u.remToPx = D.remToPx, u.vwToPx = D.vwToPx, u.vhToPx = D.vhToPx, p.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(u), e), u
                                };
                                if (/[\/*]/.test(W)) U = z;
                                else if (z !== U && F !== 0)
                                    if (B === 0) U = z;
                                    else {
                                        o = o || V();
                                        var J = /margin|padding|left|right|width|text|word|letter/i.test(_) || /X$/.test(_) || _ === "x" ? "x" : "y";
                                        switch (z) {
                                        case "%":
                                            F *= J === "x" ? o.percentToPxWidth : o.percentToPxHeight;
                                            break;
                                        case "px":
                                            break;
                                        default:
                                            F *= o[z + "ToPx"]
                                        }
                                        switch (U) {
                                        case "%":
                                            F *= 1 / (J === "x" ? o.percentToPxWidth : o.percentToPxHeight);
                                            break;
                                        case "px":
                                            break;
                                        default:
                                            F *= 1 / o[U + "ToPx"]
                                        }
                                    }
                                switch (W) {
                                case "+":
                                    B = F + B;
                                    break;
                                case "-":
                                    B = F - B;
                                    break;
                                case "*":
                                    B = F * B;
                                    break;
                                case "/":
                                    B = F / B
                                }
                                s[_] = {
                                    rootPropertyValue: q,
                                    startValue: F,
                                    currentValue: F,
                                    endValue: B,
                                    unitType: U,
                                    easing: j
                                }, p.debug && console.log("tweensContainer (" + _ + "): " + JSON.stringify(s[_]), e)
                            }
                            s.element = e
                        }
                        s.element && (b.Values.addClass(e, "velocity-animating"), P.push(s), i.queue === "" && (d(e).tweensContainer = s, d(e).opts = i), d(e).isAnimating = !0, E === g - 1 ? (p.State.calls.push([P, h, i, null, C.resolver]), p.State.isTicking === !1 && (p.State.isTicking = !0, S())) : E++)
                    }
                    var e = this,
                        i = f.extend({}, p.defaults, m),
                        s = {},
                        o;
                    d(e) === r && p.init(e), parseFloat(i.delay) && i.queue !== !1 && f.queue(e, i.queue, function (t) {
                        p.velocityQueueEntryFlag = !0, d(e).delayTimer = {
                            setTimeout: setTimeout(t, parseFloat(i.delay)),
                            next: t
                        }
                    });
                    switch (i.duration.toString().toLowerCase()) {
                    case "fast":
                        i.duration = 200;
                        break;
                    case "normal":
                        i.duration = c;
                        break;
                    case "slow":
                        i.duration = 600;
                        break;
                    default:
                        i.duration = parseFloat(i.duration) || 1
                    }
                    p.mock !== !1 && (p.mock === !0 ? i.duration = i.delay = 1 : (i.duration *= parseFloat(p.mock) || 1, i.delay *= parseFloat(p.mock) || 1)), i.easing = y(i.easing, i.duration), i.begin && !a.isFunction(i.begin) && (i.begin = null), i.progress && !a.isFunction(i.progress) && (i.progress = null), i.complete && !a.isFunction(i.complete) && (i.complete = null), i.display !== r && i.display !== null && (i.display = i.display.toString().toLowerCase(), i.display === "auto" && (i.display = p.CSS.Values.getDisplayType(e))), i.visibility !== r && i.visibility !== null && (i.visibility = i.visibility.toString().toLowerCase()), i.mobileHA = i.mobileHA && p.State.isMobile && !p.State.isGingerbread, i.queue === !1 ? i.delay ? setTimeout(u, i.delay) : u() : f.queue(e, i.queue, function (e, t) {
                        if (t === !0) return C.promise && C.resolver(h), !0;
                        p.velocityQueueEntryFlag = !0, u(e)
                    }), (i.queue === "" || i.queue === "fx") && f.queue(e)[0] !== "inprogress" && f.dequeue(e)
                }
                var i = arguments[0] && (arguments[0].p || f.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || a.isString(arguments[0].properties)),
                    s, o, l, h, v, m;
                a.isWrapped(this) ? (s = !1, l = 0, h = this, o = this) : (s = !0, l = 1, h = i ? arguments[0].elements || arguments[0].e : arguments[0]), h = u(h);
                if (!h) return;
                i ? (v = arguments[0].properties || arguments[0].p, m = arguments[0].options || arguments[0].o) : (v = arguments[l], m = arguments[l + 1]);
                var g = h.length,
                    E = 0;
                if (!/^(stop|finish)$/i.test(v) && !f.isPlainObject(m)) {
                    var T = l + 1;
                    m = {};
                    for (var N = T; N < arguments.length; N++)!a.isArray(arguments[N]) && (/^(fast|normal|slow)$/i.test(arguments[N]) || /^\d/.test(arguments[N])) ? m.duration = arguments[N] : a.isString(arguments[N]) || a.isArray(arguments[N]) ? m.easing = arguments[N] : a.isFunction(arguments[N]) && (m.complete = arguments[N])
                }
                var C = {
                    promise: null,
                    resolver: null,
                    rejecter: null
                };
                s && p.Promise && (C.promise = new p.Promise(function (e, t) {
                    C.resolver = e, C.rejecter = t
                }));
                var k;
                switch (v) {
                case "scroll":
                    k = "scroll";
                    break;
                case "reverse":
                    k = "reverse";
                    break;
                case "finish":
                case "stop":
                    f.each(h, function (e, t) {
                        d(t) && d(t).delayTimer && (clearTimeout(d(t).delayTimer.setTimeout), d(t).delayTimer.next && d(t).delayTimer.next(), delete d(t).delayTimer)
                    });
                    var L = [];
                    return f.each(p.State.calls, function (e, t) {
                        t && f.each(t[1], function (n, i) {
                            var s = m === r ? "" : m;
                            if (s !== !0 && t[2].queue !== s && (m !== r || t[2].queue !== !1)) return !0;
                            f.each(h, function (n, r) {
                                if (r === i) {
                                    if (m === !0 || a.isString(m)) f.each(f.queue(r, a.isString(m) ? m : ""), function (e, t) {
                                        a.isFunction(t) && t(null, !0)
                                    }), f.queue(r, a.isString(m) ? m : "", []);
                                    v === "stop" ? (d(r) && d(r).tweensContainer && s !== !1 && f.each(d(r).tweensContainer, function (e, t) {
                                        t.endValue = t.currentValue
                                    }), L.push(e)) : v === "finish" && (t[2].duration = 1)
                                }
                            })
                        })
                    }), v === "stop" && (f.each(L, function (e, t) {
                        x(t, !0)
                    }), C.promise && C.resolver(h)), e();
                default:
                    if (!f.isPlainObject(v) || !!a.isEmptyObject(v)) {
                        if (a.isString(v) && p.Redirects[v]) {
                            var A = f.extend({}, m),
                                O = A.duration,
                                M = A.delay || 0;
                            return A.backwards === !0 && (h = f.extend(!0, [], h).reverse()), f.each(h, function (e, t) {
                                parseFloat(A.stagger) ? A.delay = M + parseFloat(A.stagger) * e : a.isFunction(A.stagger) && (A.delay = M + A.stagger.call(t, e, g)), A.drag && (A.duration = parseFloat(O) || (/^(callout|transition)/.test(v) ? 1e3 : c), A.duration = Math.max(A.duration * (A.backwards ? 1 - e / g : (e + 1) / g), A.duration * .75, 200)), p.Redirects[v].call(t, t, A || {}, e, g, h, C.promise ? C : r)
                            }), e()
                        }
                        var _ = "Velocity: First argument (" + v + ") was not a property map, a known action, or a registered redirect. Aborting.";
                        return C.promise ? C.rejecter(new Error(_)) : console.log(_), e()
                    }
                    k = "start"
                }
                var D = {
                        lastParent: null,
                        lastPosition: null,
                        lastFontSize: null,
                        lastPercentToPxWidth: null,
                        lastPercentToPxHeight: null,
                        lastEmToPx: null,
                        remToPx: null,
                        vwToPx: null,
                        vhToPx: null
                    },
                    P = [];
                f.each(h, function (e, t) {
                    a.isNode(t) && H.call(t)
                });
                var A = f.extend({}, p.defaults, m),
                    B;
                A.loop = parseInt(A.loop), B = A.loop * 2 - 1;
                if (A.loop)
                    for (var j = 0; j < B; j++) {
                        var F = {
                            delay: A.delay,
                            progress: A.progress
                        };
                        j === B - 1 && (F.display = A.display, F.visibility = A.visibility, F.complete = A.complete), w(h, "reverse", F)
                    }
                return e()
            };
            p = f.extend(w, p), p.animate = w;
            var E = t.requestAnimationFrame || s;
            return !p.State.isMobile && n.hidden !== r && n.addEventListener("visibilitychange", function () {
                n.hidden ? (E = function (e) {
                    return setTimeout(function () {
                        e(!0)
                    }, 16)
                }, S()) : E = t.requestAnimationFrame || s
            }), e.Velocity = p, e !== t && (e.fn.velocity = w, e.fn.velocity.defaults = p.defaults), f.each(["Down", "Up"], function (e, t) {
                p.Redirects["slide" + t] = function (e, n, i, s, o, u) {
                    var a = f.extend({}, n),
                        l = a.begin,
                        c = a.complete,
                        h = {
                            height: "",
                            marginTop: "",
                            marginBottom: "",
                            paddingTop: "",
                            paddingBottom: ""
                        },
                        d = {};
                    a.display === r && (a.display = t === "Down" ? p.CSS.Values.getDisplayType(e) === "inline" ? "inline-block" : "block" : "none"), a.begin = function () {
                        l && l.call(o, o);
                        for (var n in h) {
                            d[n] = e.style[n];
                            var r = p.CSS.getPropertyValue(e, n);
                            h[n] = t === "Down" ? [r, 0] : [0, r]
                        }
                        d.overflow = e.style.overflow, e.style.overflow = "hidden"
                    }, a.complete = function () {
                        for (var t in d) e.style[t] = d[t];
                        c && c.call(o, o), u && u.resolver(o)
                    }, p(e, h, a)
                }
            }), f.each(["In", "Out"], function (e, t) {
                p.Redirects["fade" + t] = function (e, n, i, s, o, u) {
                    var a = f.extend({}, n),
                        l = {
                            opacity: t === "In" ? 1 : 0
                        },
                        c = a.complete;
                    i !== s - 1 ? a.complete = a.begin = null : a.complete = function () {
                        c && c.call(o, o), u && u.resolver(o)
                    }, a.display === r && (a.display = t === "In" ? "auto" : "none"), p(this, l, a)
                }
            }), p
        }(window.jQuery || window.Zepto || window, window, document)
    }),
    function (e) {
        typeof require == "function" && typeof exports == "object" ? module.exports = e() : typeof define == "function" && define.amd ? define("module/velocity/velocity-ui", ["module/velocity/velocity"], e) : e()
    }(function () {
        return function (e, t, n, r) {
            function a(e, t) {
                var n = [];
                return !e || !t ? !1 : (s.each([e, t], function (e, t) {
                    var r = [];
                    s.each(t, function (e, t) {
                        while (t.toString().length < 5) t = "0" + t;
                        r.push(t)
                    }), n.push(r.join(""))
                }), parseFloat(n[0]) > parseFloat(n[1]))
            }
            if (!e.Velocity || !e.Velocity.Utilities) {
                t.console && console.log("Velocity UI Pack: Velocity must be loaded first. Aborting.");
                return
            }
            var i = e.Velocity,
                s = i.Utilities,
                o = i.version,
                u = {
                    major: 1,
                    minor: 1,
                    patch: 0
                };
            if (a(u, o)) {
                var f = "Velocity UI Pack: You need to update Velocity (jquery.velocity.js) to a newer version. Visit http://github.com/julianshapiro/velocity.";
                throw alert(f), new Error(f)
            }
            i.RegisterEffect = i.RegisterUI = function (e, t) {
                function n(e, t, n, r) {
                    var o = 0,
                        u;
                    s.each(e.nodeType ? [e] : e, function (e, t) {
                        r && (n += e * r), u = t.parentNode, s.each(["height", "paddingTop", "paddingBottom", "marginTop", "marginBottom"], function (e, n) {
                            o += parseFloat(i.CSS.getPropertyValue(t, n))
                        })
                    }), i.animate(u, {
                        height: (t === "In" ? "+" : "-") + "=" + o
                    }, {
                        queue: !1,
                        easing: "ease-in-out",
                        duration: n * (t === "In" ? .6 : 1)
                    })
                }
                return i.Redirects[e] = function (o, u, a, f, l, c) {
                    var h = a === f - 1;
                    typeof t.defaultDuration == "function" ? t.defaultDuration = t.defaultDuration.call(l, l) : t.defaultDuration = parseFloat(t.defaultDuration);
                    for (var p = 0; p < t.calls.length; p++) {
                        var d = t.calls[p],
                            v = d[0],
                            m = u.duration || t.defaultDuration || 1e3,
                            g = d[1],
                            y = d[2] || {},
                            b = {};
                        b.duration = m * (g || 1), b.queue = u.queue || "", b.easing = y.easing || "linear", b.delay = parseFloat(y.delay) || 0, b._cacheValues = y._cacheValues || !0;
                        if (p === 0) {
                            b.delay += parseFloat(u.delay) || 0, a === 0 && (b.begin = function () {
                                u.begin && u.begin.call(l, l);
                                var t = e.match(/(In|Out)$/);
                                t && t[0] === "In" && v.opacity !== r && s.each(l.nodeType ? [l] : l, function (e, t) {
                                    i.CSS.setPropertyValue(t, "opacity", 0)
                                }), u.animateParentHeight && t && n(l, t[0], m + b.delay, u.stagger)
                            });
                            if (u.display !== null)
                                if (u.display !== r && u.display !== "none") b.display = u.display;
                                else if (/In$/.test(e)) {
                                var w = i.CSS.Values.getDisplayType(o);
                                b.display = w === "inline" ? "inline-block" : w
                            }
                            u.visibility && u.visibility !== "hidden" && (b.visibility = u.visibility)
                        }
                        if (p === t.calls.length - 1) {
                            var E = function () {
                                (u.display === r || u.display === "none") && /Out$/.test(e) && s.each(l.nodeType ? [l] : l, function (e, t) {
                                    i.CSS.setPropertyValue(t, "display", "none")
                                }), u.complete && u.complete.call(l, l), c && c.resolver(l || o)
                            };
                            b.complete = function () {
                                if (t.reset) {
                                    for (var e in t.reset) {
                                        var n = t.reset[e];
                                        i.CSS.Hooks.registered[e] === r && (typeof n == "string" || typeof n == "number") && (t.reset[e] = [t.reset[e], t.reset[e]])
                                    }
                                    var s = {
                                        duration: 0,
                                        queue: !1
                                    };
                                    h && (s.complete = E), i.animate(o, t.reset, s)
                                } else h && E()
                            }, u.visibility === "hidden" && (b.visibility = u.visibility)
                        }
                        i.animate(o, v, b)
                    }
                }, i
            }, i.RegisterEffect.packagedEffects = {
                "callout.bounce": {
                    defaultDuration: 550,
                    calls: [
                        [{
                            translateY: -30
                        }, .25],
                        [{
                            translateY: 0
                        }, .125],
                        [{
                            translateY: -15
                        }, .125],
                        [{
                            translateY: 0
                        }, .25]
                    ]
                },
                "callout.shake": {
                    defaultDuration: 800,
                    calls: [
                        [{
                            translateX: -11
                        }, .125],
                        [{
                            translateX: 11
                        }, .125],
                        [{
                            translateX: -11
                        }, .125],
                        [{
                            translateX: 11
                        }, .125],
                        [{
                            translateX: -11
                        }, .125],
                        [{
                            translateX: 11
                        }, .125],
                        [{
                            translateX: -11
                        }, .125],
                        [{
                            translateX: 0
                        }, .125]
                    ]
                },
                "callout.flash": {
                    defaultDuration: 1100,
                    calls: [
                        [{
                            opacity: [0, "easeInOutQuad", 1]
                        }, .25],
                        [{
                            opacity: [1, "easeInOutQuad"]
                        }, .25],
                        [{
                            opacity: [0, "easeInOutQuad"]
                        }, .25],
                        [{
                            opacity: [1, "easeInOutQuad"]
                        }, .25]
                    ]
                },
                "callout.pulse": {
                    defaultDuration: 825,
                    calls: [
                        [{
                            scaleX: 1.1,
                            scaleY: 1.1
                        }, .5, {
                            easing: "easeInExpo"
                        }],
                        [{
                            scaleX: 1,
                            scaleY: 1
                        }, .5]
                    ]
                },
                "callout.swing": {
                    defaultDuration: 950,
                    calls: [
                        [{
                            rotateZ: 15
                        }, .2],
                        [{
                            rotateZ: -10
                        }, .2],
                        [{
                            rotateZ: 5
                        }, .2],
                        [{
                            rotateZ: -5
                        }, .2],
                        [{
                            rotateZ: 0
                        }, .2]
                    ]
                },
                "callout.tada": {
                    defaultDuration: 1e3,
                    calls: [
                        [{
                            scaleX: .9,
                            scaleY: .9,
                            rotateZ: -3
                        }, .1],
                        [{
                            scaleX: 1.1,
                            scaleY: 1.1,
                            rotateZ: 3
                        }, .1],
                        [{
                            scaleX: 1.1,
                            scaleY: 1.1,
                            rotateZ: -3
                        }, .1],
                        ["reverse", .125],
                        ["reverse", .125],
                        ["reverse", .125],
                        ["reverse", .125],
                        ["reverse", .125],
                        [{
                            scaleX: 1,
                            scaleY: 1,
                            rotateZ: 0
                        }, .2]
                    ]
                },
                "transition.fadeIn": {
                    defaultDuration: 500,
                    calls: [
                        [{
                            opacity: [1, 0]
                        }]
                    ]
                },
                "transition.fadeOut": {
                    defaultDuration: 500,
                    calls: [
                        [{
                            opacity: [0, 1]
                        }]
                    ]
                },
                "transition.flipXIn": {
                    defaultDuration: 700,
                    calls: [
                        [{
                            opacity: [1, 0],
                            transformPerspective: [800, 800],
                            rotateY: [0, -55]
                        }]
                    ],
                    reset: {
                        transformPerspective: 0
                    }
                },
                "transition.flipXOut": {
                    defaultDuration: 700,
                    calls: [
                        [{
                            opacity: [0, 1],
                            transformPerspective: [800, 800],
                            rotateY: 55
                        }]
                    ],
                    reset: {
                        transformPerspective: 0,
                        rotateY: 0
                    }
                },
                "transition.flipYIn": {
                    defaultDuration: 800,
                    calls: [
                        [{
                            opacity: [1, 0],
                            transformPerspective: [800, 800],
                            rotateX: [0, -45]
                        }]
                    ],
                    reset: {
                        transformPerspective: 0
                    }
                },
                "transition.flipYOut": {
                    defaultDuration: 800,
                    calls: [
                        [{
                            opacity: [0, 1],
                            transformPerspective: [800, 800],
                            rotateX: 25
                        }]
                    ],
                    reset: {
                        transformPerspective: 0,
                        rotateX: 0
                    }
                },
                "transition.flipBounceXIn": {
                    defaultDuration: 900,
                    calls: [
                        [{
                            opacity: [.725, 0],
                            transformPerspective: [400, 400],
                            rotateY: [-10, 90]
                        }, .5],
                        [{
                            opacity: .8,
                            rotateY: 10
                        }, .25],
                        [{
                            opacity: 1,
                            rotateY: 0
                        }, .25]
                    ],
                    reset: {
                        transformPerspective: 0
                    }
                },
                "transition.flipBounceXOut": {
                    defaultDuration: 800,
                    calls: [
                        [{
                            opacity: [.9, 1],
                            transformPerspective: [400, 400],
                            rotateY: -10
                        }, .5],
                        [{
                            opacity: 0,
                            rotateY: 90
                        }, .5]
                    ],
                    reset: {
                        transformPerspective: 0,
                        rotateY: 0
                    }
                },
                "transition.flipBounceYIn": {
                    defaultDuration: 850,
                    calls: [
                        [{
                            opacity: [.725, 0],
                            transformPerspective: [400, 400],
                            rotateX: [-10, 90]
                        }, .5],
                        [{
                            opacity: .8,
                            rotateX: 10
                        }, .25],
                        [{
                            opacity: 1,
                            rotateX: 0
                        }, .25]
                    ],
                    reset: {
                        transformPerspective: 0
                    }
                },
                "transition.flipBounceYOut": {
                    defaultDuration: 800,
                    calls: [
                        [{
                            opacity: [.9, 1],
                            transformPerspective: [400, 400],
                            rotateX: -15
                        }, .5],
                        [{
                            opacity: 0,
                            rotateX: 90
                        }, .5]
                    ],
                    reset: {
                        transformPerspective: 0,
                        rotateX: 0
                    }
                },
                "transition.swoopIn": {
                    defaultDuration: 850,
                    calls: [
                        [{
                            opacity: [1, 0],
                            transformOriginX: ["100%", "50%"],
                            transformOriginY: ["100%", "100%"],
                            scaleX: [1, 0],
                            scaleY: [1, 0],
                            translateX: [0, -700],
                            translateZ: 0
                        }]
                    ],
                    reset: {
                        transformOriginX: "50%",
                        transformOriginY: "50%"
                    }
                },
                "transition.swoopOut": {
                    defaultDuration: 850,
                    calls: [
                        [{
                            opacity: [0, 1],
                            transformOriginX: ["50%", "100%"],
                            transformOriginY: ["100%", "100%"],
                            scaleX: 0,
                            scaleY: 0,
                            translateX: -700,
                            translateZ: 0
                        }]
                    ],
                    reset: {
                        transformOriginX: "50%",
                        transformOriginY: "50%",
                        scaleX: 1,
                        scaleY: 1,
                        translateX: 0
                    }
                },
                "transition.whirlIn": {
                    defaultDuration: 850,
                    calls: [
                        [{
                                opacity: [1, 0],
                                transformOriginX: ["50%", "50%"],
                                transformOriginY: ["50%", "50%"],
                                scaleX: [1, 0],
                                scaleY: [1, 0],
                                rotateY: [0, 160]
                            },
                            1, {
                                easing: "easeInOutSine"
                            }
                        ]
                    ]
                },
                "transition.whirlOut": {
                    defaultDuration: 750,
                    calls: [
                        [{
                                opacity: [0, "easeInOutQuint", 1],
                                transformOriginX: ["50%", "50%"],
                                transformOriginY: ["50%", "50%"],
                                scaleX: 0,
                                scaleY: 0,
                                rotateY: 160
                            },
                            1, {
                                easing: "swing"
                            }
                        ]
                    ],
                    reset: {
                        scaleX: 1,
                        scaleY: 1,
                        rotateY: 0
                    }
                },
                "transition.shrinkIn": {
                    defaultDuration: 750,
                    calls: [
                        [{
                            opacity: [1, 0],
                            transformOriginX: ["50%", "50%"],
                            transformOriginY: ["50%", "50%"],
                            scaleX: [1, 1.5],
                            scaleY: [1, 1.5],
                            translateZ: 0
                        }]
                    ]
                },
                "transition.shrinkOut": {
                    defaultDuration: 600,
                    calls: [
                        [{
                            opacity: [0, 1],
                            transformOriginX: ["50%", "50%"],
                            transformOriginY: ["50%", "50%"],
                            scale: [2, 0],
                            translateZ: 100
                        }]
                    ],
                    reset: {
                        scaleX: 1,
                        scaleY: 1
                    }
                },
                "transition.expandIn": {
                    defaultDuration: 700,
                    calls: [
                        [{
                            opacity: [1, 0],
                            transformOriginX: ["50%", "50%"],
                            transformOriginY: ["50%", "50%"],
                            scaleX: [1, .625],
                            scaleY: [1, .625],
                            translateZ: 0
                        }]
                    ]
                },
                "transition.expandOut": {
                    defaultDuration: 700,
                    calls: [
                        [{
                            opacity: [0, 1],
                            transformOriginX: ["50%", "50%"],
                            transformOriginY: ["50%", "50%"],
                            scaleX: .5,
                            scaleY: .5,
                            translateZ: 0
                        }]
                    ],
                    reset: {
                        scaleX: 1,
                        scaleY: 1
                    }
                },
                "transition.bounceIn": {
                    defaultDuration: 800,
                    calls: [
                        [{
                            opacity: [1, 0],
                            scaleX: [1.05, .3],
                            scaleY: [1.05, .3]
                        }, .4],
                        [{
                            scaleX: .9,
                            scaleY: .9,
                            translateZ: 0
                        }, .2],
                        [{
                            scaleX: 1,
                            scaleY: 1
                        }, .5]
                    ]
                },
                "transition.bounceOut": {
                    defaultDuration: 800,
                    calls: [
                        [{
                            scaleX: .95,
                            scaleY: .95
                        }, .35],
                        [{
                            scaleX: 1.1,
                            scaleY: 1.1,
                            translateZ: 0
                        }, .35],
                        [{
                            opacity: [0, 1],
                            scaleX: .3,
                            scaleY: .3
                        }, .3]
                    ],
                    reset: {
                        scaleX: 1,
                        scaleY: 1
                    }
                },
                "transition.bounceUpIn": {
                    defaultDuration: 800,
                    calls: [
                        [{
                            opacity: [1, 0],
                            translateY: [-30, 1e3]
                        }, .6, {
                            easing: "easeOutCirc"
                        }],
                        [{
                            translateY: 10
                        }, .2],
                        [{
                            translateY: 0
                        }, .2]
                    ]
                },
                "transition.bounceUpOut": {
                    defaultDuration: 1e3,
                    calls: [
                        [{
                            translateY: 20
                        }, .2],
                        [{
                            opacity: [0, "easeInCirc", 1],
                            translateY: -1e3
                        }, .8]
                    ],
                    reset: {
                        translateY: 0
                    }
                },
                "transition.bounceDownIn": {
                    defaultDuration: 800,
                    calls: [
                        [{
                            opacity: [1, 0],
                            translateY: [30, -1e3]
                        }, .6, {
                            easing: "easeOutCirc"
                        }],
                        [{
                            translateY: -10
                        }, .2],
                        [{
                            translateY: 0
                        }, .2]
                    ]
                },
                "transition.bounceDownOut": {
                    defaultDuration: 1e3,
                    calls: [
                        [{
                            translateY: -20
                        }, .2],
                        [{
                            opacity: [0, "easeInCirc", 1],
                            translateY: 1e3
                        }, .8]
                    ],
                    reset: {
                        translateY: 0
                    }
                },
                "transition.bounceLeftIn": {
                    defaultDuration: 750,
                    calls: [
                        [{
                            opacity: [1, 0],
                            translateX: [30, -1250]
                        }, .6, {
                            easing: "easeOutCirc"
                        }],
                        [{
                            translateX: -10
                        }, .2],
                        [{
                            translateX: 0
                        }, .2]
                    ]
                },
                "transition.bounceLeftOut": {
                    defaultDuration: 750,
                    calls: [
                        [{
                            translateX: 30
                        }, .2],
                        [{
                            opacity: [0, "easeInCirc", 1],
                            translateX: -1250
                        }, .8]
                    ],
                    reset: {
                        translateX: 0
                    }
                },
                "transition.bounceRightIn": {
                    defaultDuration: 750,
                    calls: [
                        [{
                            opacity: [1, 0],
                            translateX: [-30, 1250]
                        }, .6, {
                            easing: "easeOutCirc"
                        }],
                        [{
                            translateX: 10
                        }, .2],
                        [{
                            translateX: 0
                        }, .2]
                    ]
                },
                "transition.bounceRightOut": {
                    defaultDuration: 750,
                    calls: [
                        [{
                            translateX: -30
                        }, .2],
                        [{
                            opacity: [0, "easeInCirc", 1],
                            translateX: 1250
                        }, .8]
                    ],
                    reset: {
                        translateX: 0
                    }
                },
                "transition.slideUpIn": {
                    defaultDuration: 900,
                    calls: [
                        [{
                            opacity: [1, 0],
                            translateY: [0, 20],
                            translateZ: 0
                        }]
                    ]
                },
                "transition.slideUpOut": {
                    defaultDuration: 900,
                    calls: [
                        [{
                            opacity: [0, 1],
                            translateY: -20,
                            translateZ: 0
                        }]
                    ],
                    reset: {
                        translateY: 0
                    }
                },
                "transition.slideDownIn": {
                    defaultDuration: 900,
                    calls: [
                        [{
                            opacity: [1, 0],
                            translateY: [0, -20],
                            translateZ: 0
                        }]
                    ]
                },
                "transition.slideDownOut": {
                    defaultDuration: 900,
                    calls: [
                        [{
                            opacity: [0, 1],
                            translateY: 20,
                            translateZ: 0
                        }]
                    ],
                    reset: {
                        translateY: 0
                    }
                },
                "transition.slideLeftIn": {
                    defaultDuration: 1e3,
                    calls: [
                        [{
                            opacity: [1, 0],
                            translateX: [0, -20],
                            translateZ: 0
                        }]
                    ]
                },
                "transition.slideLeftOut": {
                    defaultDuration: 1050,
                    calls: [
                        [{
                            opacity: [0, 1],
                            translateX: -20,
                            translateZ: 0
                        }]
                    ],
                    reset: {
                        translateX: 0
                    }
                },
                "transition.slideRightIn": {
                    defaultDuration: 1e3,
                    calls: [
                        [{
                            opacity: [1, 0],
                            translateX: [0, 20],
                            translateZ: 0
                        }]
                    ]
                },
                "transition.slideRightOut": {
                    defaultDuration: 1050,
                    calls: [
                        [{
                            opacity: [0, 1],
                            translateX: 20,
                            translateZ: 0
                        }]
                    ],
                    reset: {
                        translateX: 0
                    }
                },
                "transition.slideUpBigIn": {
                    defaultDuration: 850,
                    calls: [
                        [{
                            opacity: [1, 0],
                            translateY: [0, 75],
                            translateZ: 0
                        }]
                    ]
                },
                "transition.slideUpBigOut": {
                    defaultDuration: 800,
                    calls: [
                        [{
                            opacity: [0, 1],
                            translateY: -75,
                            translateZ: 0
                        }]
                    ],
                    reset: {
                        translateY: 0
                    }
                },
                "transition.slideDownBigIn": {
                    defaultDuration: 850,
                    calls: [
                        [{
                            opacity: [1, 0],
                            translateY: [0, -75],
                            translateZ: 0
                        }]
                    ]
                },
                "transition.slideDownBigOut": {
                    defaultDuration: 800,
                    calls: [
                        [{
                            opacity: [0, 1],
                            translateY: 75,
                            translateZ: 0
                        }]
                    ],
                    reset: {
                        translateY: 0
                    }
                },
                "transition.slideLeftBigIn": {
                    defaultDuration: 800,
                    calls: [
                        [{
                            opacity: [1, 0],
                            translateX: [0, -75],
                            translateZ: 0
                        }]
                    ]
                },
                "transition.slideLeftBigOut": {
                    defaultDuration: 750,
                    calls: [
                        [{
                            opacity: [0, 1],
                            translateX: -75,
                            translateZ: 0
                        }]
                    ],
                    reset: {
                        translateX: 0
                    }
                },
                "transition.slideRightBigIn": {
                    defaultDuration: 800,
                    calls: [
                        [{
                            opacity: [1, 0],
                            translateX: [0, 75],
                            translateZ: 0
                        }]
                    ]
                },
                "transition.slideRightBigOut": {
                    defaultDuration: 750,
                    calls: [
                        [{
                            opacity: [0, 1],
                            translateX: 75,
                            translateZ: 0
                        }]
                    ],
                    reset: {
                        translateX: 0
                    }
                },
                "transition.perspectiveUpIn": {
                    defaultDuration: 800,
                    calls: [
                        [{
                            opacity: [1, 0],
                            transformPerspective: [800, 800],
                            transformOriginX: [0, 0],
                            transformOriginY: ["100%", "100%"],
                            rotateX: [0, -180]
                        }]
                    ],
                    reset: {
                        transformPerspective: 0,
                        transformOriginX: "50%",
                        transformOriginY: "50%"
                    }
                },
                "transition.perspectiveUpOut": {
                    defaultDuration: 850,
                    calls: [
                        [{
                            opacity: [0, 1],
                            transformPerspective: [800, 800],
                            transformOriginX: [0, 0],
                            transformOriginY: ["100%", "100%"],
                            rotateX: -180
                        }]
                    ],
                    reset: {
                        transformPerspective: 0,
                        transformOriginX: "50%",
                        transformOriginY: "50%",
                        rotateX: 0
                    }
                },
                "transition.perspectiveDownIn": {
                    defaultDuration: 800,
                    calls: [
                        [{
                            opacity: [1, 0],
                            transformPerspective: [800, 800],
                            transformOriginX: [0, 0],
                            transformOriginY: [0, 0],
                            rotateX: [0, 180]
                        }]
                    ],
                    reset: {
                        transformPerspective: 0,
                        transformOriginX: "50%",
                        transformOriginY: "50%"
                    }
                },
                "transition.perspectiveDownOut": {
                    defaultDuration: 850,
                    calls: [
                        [{
                            opacity: [0, 1],
                            transformPerspective: [800, 800],
                            transformOriginX: [0, 0],
                            transformOriginY: [0, 0],
                            rotateX: 180
                        }]
                    ],
                    reset: {
                        transformPerspective: 0,
                        transformOriginX: "50%",
                        transformOriginY: "50%",
                        rotateX: 0
                    }
                },
                "transition.perspectiveLeftIn": {
                    defaultDuration: 950,
                    calls: [
                        [{
                            opacity: [1, 0],
                            transformPerspective: [2e3, 2e3],
                            transformOriginX: [0, 0],
                            transformOriginY: [0, 0],
                            rotateY: [0, -180]
                        }]
                    ],
                    reset: {
                        transformPerspective: 0,
                        transformOriginX: "50%",
                        transformOriginY: "50%"
                    }
                },
                "transition.perspectiveLeftOut": {
                    defaultDuration: 950,
                    calls: [
                        [{
                            opacity: [0, 1],
                            transformPerspective: [2e3, 2e3],
                            transformOriginX: [0, 0],
                            transformOriginY: [0, 0],
                            rotateY: -180
                        }]
                    ],
                    reset: {
                        transformPerspective: 0,
                        transformOriginX: "50%",
                        transformOriginY: "50%",
                        rotateY: 0
                    }
                },
                "transition.perspectiveRightIn": {
                    defaultDuration: 950,
                    calls: [
                        [{
                            opacity: [1, 0],
                            transformPerspective: [2e3, 2e3],
                            transformOriginX: ["100%", "100%"],
                            transformOriginY: [0, 0],
                            rotateY: [0, 180]
                        }]
                    ],
                    reset: {
                        transformPerspective: 0,
                        transformOriginX: "50%",
                        transformOriginY: "50%"
                    }
                },
                "transition.perspectiveRightOut": {
                    defaultDuration: 950,
                    calls: [
                        [{
                            opacity: [0, 1],
                            transformPerspective: [2e3, 2e3],
                            transformOriginX: ["100%", "100%"],
                            transformOriginY: [0, 0],
                            rotateY: 180
                        }]
                    ],
                    reset: {
                        transformPerspective: 0,
                        transformOriginX: "50%",
                        transformOriginY: "50%",
                        rotateY: 0
                    }
                }
            };
            for (var l in i.RegisterEffect.packagedEffects) i.RegisterEffect(l, i.RegisterEffect.packagedEffects[l]);
            i.RunSequence = function (e) {
                var t = s.extend(!0, [], e);
                t.length > 1 && (s.each(t.reverse(), function (e, n) {
                    var r = t[e + 1];
                    if (r) {
                        var o = n.o || n.options,
                            u = r.o || r.options,
                            a = o && o.sequenceQueue === !1 ? "begin" : "complete",
                            f = u && u[a],
                            l = {};
                        l[a] = function () {
                            var e = r.e || r.elements,
                                t = e.nodeType ? [e] : e;
                            f && f.call(t, t), i(n)
                        }, r.o ? r.o = s.extend({}, u, l) : r.options = s.extend({}, u, l)
                    }
                }), t.reverse()), i(t[0])
            }
        }(window.jQuery || window.Zepto || window, window, document)
    }),
    function (e) {
        typeof require == "function" && typeof exports == "object" ? module.exports = e(require("module/velocity/velocity"), require("module/velocity/velocity-ui")) : typeof define == "function" && define.amd ? define("module/velocity/velocity-animation", ["module/velocity/velocity", "module/velocity/velocity-ui"], e) : e()
    }(function (e, t) {
        return function (e, t, n, r) {
            function f(e, t, n) {
                e = e || "", t = parseFloat(t) || 1, n = parseFloat(n) || 0;
                if (o[e]) {
                    var r = o[e].calls;
                    s.each(r, function (r, i) {
                        var o = i[0] && i[0].opacity,
                            u = i[0] && i[0].rotateZ;
                        s.isArray(o) ? s.each(o, function (e, n) {
                            n == 1 && (i[0].opacity[e] = t)
                        }) : o == 1 && (i[0].opacity = t);
                        var f = a[e].calls[r][0].rotateZ;
                        s.isArray(u) ? s.each(u, function (e) {
                            i[0].rotateZ[e] = n + f[e]
                        }) : i[0].rotateZ && (i[0].rotateZ = n + f)
                    }), i.RegisterEffect(e, o[e])
                }
            }

            function l(t, n, r) {
                function o(e, t) {
                    var n = [];
                    if (t == 1) return [e];
                    for (var r = 0; r < t; r++) {
                        var i = s.extend(!0, {}, e);
                        r != 0 && delete i.o.delay, n.push(i)
                    }
                    return n
                }

                function u(e, t) {
                    function r(e, t) {
                        var n = [],
                            r = {
                                e: s(e)[0],
                                p: "",
                                o: {}
                            },
                            i = parseFloat(t.animationDuration) * 1e3,
                            u = parseFloat(t.animationDelay) * 1e3,
                            a = parseInt(t.animationIterationCount),
                            f = t.animationIterationCount == "infinite" ? 20 : a ? a : 1;
                        return r.o.duration = i, r.o.delay = u, r.o.mobileHA = !1, r.p = t.animationName, n = o(r, f), n
                    }
                    var n = [];
                    return s.isPlainObject(t) ? r(e, t) : (s.each(t, function (t, i) {
                        var s = r(e, i);
                        n = n.concat(s)
                    }), n)
                }
                var s = e,
                    a = u(t, n);
                if (a.length == 0) return;
                a[a.length - 1].o.complete = r ? r : null, i.RunSequence(a)
            }

            function c(t) {
                var n = e,
                    r = n(t),
                    i = JSON.parse(r.attr("styles") || "[]"),
                    s = i.transform && i.transform.match(/rotateZ?\(((?:-|)\d+)deg\)/),
                    o = s ? s[1] : 0;
                r.velocity("stop", !0).velocity("finish").velocity({
                    translate: 0,
                    translateX: 0,
                    translateY: 0,
                    translateZ: 0,
                    rotate: 0,
                    rotateX: 0,
                    rotateY: 0,
                    rotateZ: o,
                    scale: 1,
                    scaleX: 1,
                    scaleY: 1,
                    scaleZ: 1,
                    skew: 0,
                    skewX: 0,
                    skewY: 0
                }, {
                    duration: 10
                })
            }
            if (!e.Velocity || !e.Velocity.Utilities) {
                t.console && console.log("Velocity animation: Velocity must be loaded first. Aborting.");
                return
            }
            var i = e.Velocity,
                s = i.Utilities,
                o = {
                    noeffect: {
                        defaultDuration: 825,
                        calls: [
                            [{
                                    opacity: 1
                                },
                                1
                            ]
                        ],
                        desc: "\u65e0\u52a8\u753b",
                        type: "none"
                    },
                    none: {
                        defaultDuration: 825,
                        calls: [
                            [{
                                    opacity: 1
                                },
                                1
                            ]
                        ],
                        desc: "\u65e0\u52a8\u753b",
                        type: "none"
                    },
                    circleRotate: {
                        defaultDuration: 825,
                        calls: [
                            [{
                                    rotateZ: [360, 0],
                                    opacity: 1
                                },
                                1
                            ]
                        ],
                        desc: "\u8f6c\u5708",
                        type: "special"
                    },
                    bounce: {
                        defaultDuration: 550,
                        calls: [
                            [{
                                translateY: -30,
                                opacity: 1
                            }, .25],
                            [{
                                translateY: 0
                            }, .125],
                            [{
                                translateY: -15
                            }, .125],
                            [{
                                translateY: 0
                            }, .25]
                        ],
                        desc: "\u5f39\u8df3",
                        type: "special"
                    },
                    flash: {
                        defaultDuration: 1100,
                        calls: [
                            [{
                                opacity: [0, "linear", 1]
                            }, .25],
                            [{
                                opacity: [1, "linear"]
                            }, .25],
                            [{
                                opacity: [0, "linear"]
                            }, .25],
                            [{
                                opacity: [1, "linear"]
                            }, .25]
                        ],
                        desc: "\u95ea\u70c1",
                        type: "special"
                    },
                    pulse: {
                        defaultDuration: 825,
                        calls: [
                            [{
                                scale: 1.1,
                                opacity: 1
                            }, .5],
                            [{
                                scale: 1
                            }, .5]
                        ],
                        desc: "\u5fc3\u8df3",
                        type: "special"
                    },
                    shake: {
                        defaultDuration: 800,
                        calls: [
                            [{
                                translateX: -11,
                                opacity: 1
                            }, .125],
                            [{
                                translateX: 11
                            }, .125],
                            [{
                                translateX: -11
                            }, .125],
                            [{
                                translateX: 11
                            }, .125],
                            [{
                                translateX: -11
                            }, .125],
                            [{
                                translateX: 11
                            }, .125],
                            [{
                                translateX: -11
                            }, .125],
                            [{
                                translateX: 0
                            }, .125]
                        ],
                        desc: "\u9707\u52a8",
                        type: "special"
                    },
                    swing: {
                        defaultDuration: 950,
                        calls: [
                            [{
                                rotateZ: 15,
                                opacity: 1
                            }, .2],
                            [{
                                rotateZ: -10
                            }, .2],
                            [{
                                rotateZ: 5
                            }, .2],
                            [{
                                rotateZ: -5
                            }, .2],
                            [{
                                rotateZ: 0
                            }, .2]
                        ],
                        desc: "\u6447\u6446",
                        type: "special"
                    },
                    rubberBand: {
                        defaultDuration: 800,
                        calls: [
                            [{
                                    scaleX: 1,
                                    scaleY: 1,
                                    opacity: 1
                                },
                                1 / 7
                            ],
                            [{
                                    scaleX: 1.25,
                                    scaleY: .75
                                },
                                1 / 7
                            ],
                            [{
                                    scaleX: .75,
                                    scaleY: 1.25
                                },
                                1 / 7
                            ],
                            [{
                                    scaleX: 1.15,
                                    scaleY: .85
                                },
                                1 / 7
                            ],
                            [{
                                    scaleX: .95,
                                    scaleY: 1.05
                                },
                                1 / 7
                            ],
                            [{
                                    scaleX: 1.05,
                                    scaleY: .95
                                },
                                1 / 7
                            ],
                            [{
                                    scaleX: 1,
                                    scaleY: 1
                                },
                                1 / 7
                            ]
                        ],
                        desc: "\u6a61\u76ae\u7b4b",
                        type: "special"
                    },
                    flip: {
                        defaultDuration: 800,
                        calls: [
                            [{
                                transformPerspective: 400,
                                rotateY: -180,
                                scale: 1.5,
                                opacity: 1
                            }, .5],
                            [{
                                transformPerspective: 400,
                                rotateY: -360,
                                scale: 1
                            }, .5]
                        ],
                        desc: "\u7ffb\u8f6c",
                        type: "special"
                    },
                    wobble: {
                        defaultDuration: 800,
                        calls: [
                            [{
                                    translateX: "-35%",
                                    rotateZ: -5,
                                    opacity: 1
                                },
                                1 / 6
                            ],
                            [{
                                    translateX: "20%",
                                    rotateZ: 3
                                },
                                1 / 6
                            ],
                            [{
                                    translateX: "-15%",
                                    rotateZ: -3
                                },
                                1 / 6
                            ],
                            [{
                                    translateX: "10%",
                                    rotateZ: 2
                                },
                                1 / 6
                            ],
                            [{
                                    translateX: "-5%",
                                    rotateZ: -1
                                },
                                1 / 6
                            ],
                            [{
                                    translateX: 0,
                                    rotateZ: 0
                                },
                                1 / 6
                            ]
                        ],
                        desc: "\u6447\u6643",
                        type: "special"
                    },
                    hinge: {
                        defaultDuration: 800,
                        calls: [
                            [{
                                    transformOriginX: "top",
                                    transformOriginY: "left",
                                    opacity: 1
                                },
                                1 / 6, {
                                    easing: "ease-in-out"
                                }
                            ],
                            [{
                                    transformOriginX: "top",
                                    transformOriginY: "left",
                                    rotateZ: 80
                                },
                                1 / 6, {
                                    easing: "ease-in-out"
                                }
                            ],
                            [{
                                    transformOriginX: "top",
                                    transformOriginY: "left",
                                    rotateZ: 60,
                                    opacity: 1
                                },
                                1 / 6, {
                                    easing: "ease-in-out"
                                }
                            ],
                            [{
                                    transformOriginX: "top",
                                    transformOriginY: "left",
                                    rotateZ: 80
                                },
                                1 / 6, {
                                    easing: "ease-in-out"
                                }
                            ],
                            [{
                                    transformOriginX: "top",
                                    transformOriginY: "left",
                                    rotateZ: [0, 60],
                                    opacity: 1
                                },
                                1 / 6, {
                                    easing: "ease-in-out"
                                }
                            ],
                            [{
                                    translateY: 700,
                                    opacity: 0,
                                    rotateZ: 0
                                },
                                1 / 6
                            ]
                        ],
                        desc: "\u6447\u6447\u6b32\u5760",
                        type: "special"
                    },
                    moveAround: {
                        defaultDuration: 800,
                        calls: [
                            [{
                                translateX: ["-100px", 0],
                                opacity: 1
                            }, .25],
                            [{
                                translateX: [0, "-100px"]
                            }, .25],
                            [{
                                translateX: ["100px", 0]
                            }, .25],
                            [{
                                translateX: [0, "100px"]
                            }, .25]
                        ],
                        desc: "\u5de6\u53f3\u79fb\u52a8",
                        type: "special"
                    },
                    tada: {
                        defaultDuration: 1e3,
                        calls: [
                            [{
                                scaleX: .9,
                                scaleY: .9,
                                rotateZ: -3,
                                opacity: 1
                            }, .1],
                            [{
                                scaleX: 1.1,
                                scaleY: 1.1,
                                rotateZ: 3
                            }, .1],
                            [{
                                scaleX: 1.1,
                                scaleY: 1.1,
                                rotateZ: -3
                            }, .1],
                            ["reverse", .125],
                            ["reverse", .125],
                            ["reverse", .125],
                            ["reverse", .125],
                            ["reverse", .125],
                            [{
                                scaleX: 1,
                                scaleY: 1,
                                rotateZ: 0
                            }, .2]
                        ],
                        desc: "\u5de6\u53f3\u6296\u52a8",
                        type: "special"
                    },
                    boingInUp: {
                        defaultDuration: 800,
                        calls: [
                            [{
                                    opacity: 1,
                                    perspectiveOrigin: "800px",
                                    rotateX: -50,
                                    transformOriginX: "50%",
                                    transformOriginY: 0
                                },
                                1 / 3
                            ],
                            [{
                                    opacity: 1,
                                    perspectiveOrigin: "800px",
                                    rotateX: 50,
                                    transformOriginX: "50%",
                                    transformOriginY: 0
                                },
                                1 / 3
                            ],
                            [{
                                    opacity: 1,
                                    perspectiveOrigin: "800px",
                                    rotateX: 0,
                                    transformOriginX: "50%",
                                    transformOriginY: 0
                                },
                                1 / 3
                            ]
                        ],
                        desc: "\u5439\u98ce\u6548\u679c",
                        type: "special"
                    },
                    zoomIn: {
                        defaultDuration: 800,
                        calls: [
                            [{
                                opacity: 0,
                                scale: .3
                            }, .5],
                            [{
                                opacity: 1,
                                scale: 1
                            }, .5]
                        ],
                        desc: "\u653e\u5927\u8fdb\u5165",
                        type: "in"
                    },
                    swashIn: {
                        defaultDuration: 800,
                        calls: [
                            [{
                                    opacity: 0,
                                    scale: 0,
                                    transformOrigin: "50%"
                                },
                                1 / 3
                            ],
                            [{
                                    opacity: 1,
                                    scale: .9,
                                    transformOrigin: "50%"
                                },
                                1 / 3
                            ],
                            [{
                                    opacity: 1,
                                    scale: 1,
                                    transformOrigin: "50%"
                                },
                                1 / 3
                            ]
                        ],
                        desc: "\u653e\u5927\u9707\u5165",
                        type: "in"
                    },
                    vanishIn: {
                        defaultDuration: 800,
                        calls: [
                            [{
                                opacity: 0,
                                scale: 2,
                                transformOrigin: "50%",
                                blur: 90
                            }, .5],
                            [{
                                opacity: 1,
                                scale: 1,
                                transformOrigin: "50%",
                                blur: 0
                            }, .5]
                        ],
                        desc: "\u6a21\u7cca\u8fdb\u5165",
                        type: "in"
                    },
                    swap: {
                        defaultDuration: 850,
                        calls: [
                            [{
                                opacity: [1, 0],
                                transformOriginX: ["50%", "0"],
                                transformOriginY: ["50%", "0"],
                                scaleX: [1, 0],
                                scaleY: [1, 0],
                                translateX: [0, -700],
                                translateZ: 0
                            }]
                        ],
                        reset: {
                            transformOriginX: "50%",
                            transformOriginY: "50%"
                        },
                        desc: "\u7531\u8fdc\u53ca\u8fd1",
                        type: "in"
                    },
                    zoomInUp: {
                        defaultDuration: 800,
                        calls: [
                            [{
                                    opacity: 0,
                                    scale: .1
                                },
                                1 / 3, {
                                    easing: "cubic-bezier(0.550, 0.055, 0.675, 0.190)"
                                }
                            ],
                            [{
                                    opacity: 1,
                                    scale: .475,
                                    translateY: "-60px"
                                },
                                1 / 3, {
                                    easing: "cubic-bezier(0.175, 0.885, 0.320, 1)"
                                }
                            ],
                            [{
                                    opacity: 1,
                                    scale: 1,
                                    translateY: 0
                                },
                                1 / 3
                            ]
                        ],
                        desc: "\u4ece\u4e0b\u653e\u5927",
                        type: "in"
                    },
                    bounceIn: {
                        defaultDuration: 800,
                        calls: [
                            [{
                                    opacity: 1,
                                    scale: .3
                                },
                                1 / 6, {
                                    easing: "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
                                }
                            ],
                            [{
                                    opacity: 1,
                                    scale: 1.1
                                },
                                1 / 6, {
                                    easing: "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
                                }
                            ],
                            [{
                                    opacity: 1,
                                    scale: .9
                                },
                                1 / 6, {
                                    easing: "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
                                }
                            ],
                            [{
                                    opacity: 1,
                                    scale: 1.03
                                },
                                1 / 6, {
                                    easing: "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
                                }
                            ],
                            [{
                                    opacity: 1,
                                    scale: .97
                                },
                                1 / 6, {
                                    easing: "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
                                }
                            ],
                            [{
                                    opacity: 1,
                                    scale: 1
                                },
                                1 / 6, {
                                    easing: "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
                                }
                            ]
                        ],
                        desc: "\u5f39\u5165",
                        type: "in"
                    },
                    bounceInUp: {
                        defaultDuration: 800,
                        calls: [
                            [{
                                opacity: [1, 0],
                                translateY: [-30, 1e3]
                            }, .6, {
                                easing: "easeOutCirc"
                            }],
                            [{
                                translateY: 10
                            }, .2],
                            [{
                                translateY: 0
                            }, .2]
                        ],
                        desc: "\u4ece\u4e0b\u5f39\u5165",
                        type: "in"
                    },
                    bounceInDown: {
                        defaultDuration: 800,
                        calls: [
                            [{
                                opacity: [1, 0],
                                translateY: [30, -1e3]
                            }, .6, {
                                easing: "easeOutCirc"
                            }],
                            [{
                                translateY: -10
                            }, .2],
                            [{
                                translateY: 0
                            }, .2]
                        ],
                        desc: "\u4ece\u4e0a\u5f39\u5165",
                        type: "in"
                    },
                    bounceInRight: {
                        defaultDuration: 750,
                        calls: [
                            [{
                                opacity: [1, 0],
                                translateX: [-30, 1250]
                            }, .6, {
                                easing: "easeOutCirc"
                            }],
                            [{
                                translateX: 10
                            }, .2],
                            [{
                                translateX: 0
                            }, .2]
                        ],
                        desc: "\u4ece\u53f3\u5f39\u5165",
                        type: "in"
                    },
                    bounceInLeft: {
                        defaultDuration: 750,
                        calls: [
                            [{
                                opacity: [1, 0],
                                translateX: [30, -1250]
                            }, .6, {
                                easing: "easeOutCirc"
                            }],
                            [{
                                translateX: -10
                            }, .2],
                            [{
                                translateX: 0
                            }, .2]
                        ],
                        desc: "\u4ece\u5de6\u5f39\u5165",
                        type: "in"
                    },
                    fadeIn: {
                        defaultDuration: 500,
                        calls: [
                            [{
                                opacity: [1, 0]
                            }]
                        ],
                        desc: "\u6de1\u5165",
                        type: "in"
                    },
                    fadeInUp: {
                        defaultDuration: 500,
                        calls: [
                            [{
                                opacity: [1, 0],
                                translateY: [0, "100%"]
                            }]
                        ],
                        desc: "\u4ece\u4e0b\u6de1\u5165",
                        type: "in"
                    },
                    fadeInDown: {
                        defaultDuration: 500,
                        calls: [
                            [{
                                opacity: [1, 0],
                                translateY: [0, "-100%"]
                            }]
                        ],
                        desc: "\u4ece\u4e0a\u6de1\u5165",
                        type: "in"
                    },
                    fadeInLeft: {
                        defaultDuration: 500,
                        calls: [
                            [{
                                opacity: [1, 0],
                                translateX: [0, "-100%"]
                            }]
                        ],
                        desc: "\u4ece\u5de6\u6de1\u5165",
                        type: "in"
                    },
                    fadeInRight: {
                        defaultDuration: 500,
                        calls: [
                            [{
                                opacity: [1, 0],
                                translateX: [0, "100%"]
                            }]
                        ],
                        desc: "\u4ece\u53f3\u6de1\u5165",
                        type: "in"
                    },
                    fadeInUpBig: {
                        defaultDuration: 500,
                        calls: [
                            [{
                                opacity: [1, 0],
                                translateY: [0, "2000px"]
                            }]
                        ],
                        desc: "\u4ece\u4e0b\u8fdb\u5165",
                        type: "in"
                    },
                    fadeInDownBig: {
                        defaultDuration: 500,
                        calls: [
                            [{
                                opacity: [1, 0],
                                translateY: [0, "-2000px"]
                            }]
                        ],
                        desc: "\u4ece\u4e0a\u8fdb\u5165",
                        type: "in"
                    },
                    fadeInLeftBig: {
                        defaultDuration: 500,
                        calls: [
                            [{
                                opacity: [1, 0],
                                translateX: [0, "-2000px"]
                            }]
                        ],
                        desc: "\u4ece\u5de6\u8fdb\u5165",
                        type: "in"
                    },
                    fadeInRightBig: {
                        defaultDuration: 500,
                        calls: [
                            [{
                                opacity: [1, 0],
                                translateX: [0, "2000px"]
                            }]
                        ],
                        desc: "\u4ece\u53f3\u8fdb\u5165",
                        type: "in"
                    },
                    flipInY: {
                        defaultDuration: 700,
                        calls: [
                            [{
                                opacity: [1, 0],
                                transformPerspective: [800, 800],
                                rotateY: [0, -90]
                            }]
                        ],
                        reset: {
                            transformPerspective: 0
                        },
                        desc: "Y\u8f74\u8f6c\u5165",
                        type: "in"
                    },
                    flipInX: {
                        defaultDuration: 800,
                        calls: [
                            [{
                                opacity: [1, 0],
                                transformPerspective: [800, 800],
                                rotateX: [0, -90]
                            }]
                        ],
                        reset: {
                            transformPerspective: 0
                        },
                        desc: "X\u8f74\u8f6c\u5165",
                        type: "in"
                    },
                    lightSpeedIn: {
                        defaultDuration: 800,
                        calls: [
                            [{
                                translateX: [0, "100%"],
                                skewX: -30,
                                opacity: [1, 0]
                            }, .25],
                            [{
                                skewX: 20
                            }, .25],
                            [{
                                skewX: -5
                            }, .25],
                            [{
                                translateX: 0,
                                skewX: 0
                            }, .25]
                        ],
                        desc: "\u5149\u901f\u8fdb\u5165",
                        type: "in"
                    },
                    rotateIn: {
                        defaultDuration: 800,
                        calls: [
                            [{
                                transformOriginX: ["50%", "50%"],
                                transformOriginY: ["50%", "50%"],
                                rotateZ: [0, -360],
                                opacity: [1, 0]
                            }]
                        ],
                        desc: "\u65cb\u8f6c\u8fdb\u5165",
                        type: "in"
                    },
                    rotateInDownLeft: {
                        defaultDuration: 800,
                        calls: [
                            [{
                                transformOriginX: ["0", "0"],
                                transformOriginY: ["100%", "100%"],
                                rotateZ: [0, -90],
                                opacity: [1, 0]
                            }]
                        ],
                        desc: "\u5de6\u5411\u4e0b\u8f6c",
                        type: "in"
                    },
                    rotateInDownRight: {
                        defaultDuration: 800,
                        calls: [
                            [{
                                transformOriginX: ["100%", "100%"],
                                transformOriginY: ["100%", "100%"],
                                rotateZ: [0, 90],
                                opacity: [1, 0]
                            }]
                        ],
                        desc: "\u53f3\u5411\u4e0b\u8f6c",
                        type: "in"
                    },
                    rotateInUpLeft: {
                        defaultDuration: 800,
                        calls: [
                            [{
                                transformOriginX: ["0", "0"],
                                transformOriginY: ["100%", "100%"],
                                rotateZ: [0, 90],
                                opacity: [1, 0]
                            }]
                        ],
                        desc: "\u5de6\u5411\u4e0a\u8f6c",
                        type: "in"
                    },
                    rotateInUpRight: {
                        defaultDuration: 800,
                        calls: [
                            [{
                                transformOriginX: ["100%", "100%"],
                                transformOriginY: ["100%", "100%"],
                                rotateZ: [0, -90],
                                opacity: [1, 0]
                            }]
                        ],
                        desc: "\u53f3\u5411\u4e0a\u8f6c",
                        type: "in"
                    },
                    rollIn: {
                        defaultDuration: 800,
                        calls: [
                            [{
                                translateX: [0, "-100%"],
                                rotateZ: [0, -120],
                                opacity: [1, 0]
                            }]
                        ],
                        desc: "\u6eda\u5165",
                        type: "in"
                    },
                    slideInUp: {
                        defaultDuration: 900,
                        calls: [
                            [{
                                opacity: [1, 0],
                                translateY: [0, 100],
                                translateZ: 0
                            }]
                        ],
                        desc: "\u4ece\u4e0b\u6ed1\u5165",
                        type: "in"
                    },
                    slideInDown: {
                        defaultDuration: 900,
                        calls: [
                            [{
                                opacity: [1, 0],
                                translateY: [0, -100],
                                translateZ: 0
                            }]
                        ],
                        desc: "\u4ece\u4e0a\u6ed1\u5165",
                        type: "in"
                    },
                    slideInLeft: {
                        defaultDuration: 1e3,
                        calls: [
                            [{
                                opacity: [1, 0],
                                translateX: [0, -100],
                                translateZ: 0
                            }]
                        ],
                        desc: "\u4ece\u5de6\u6ed1\u5165",
                        type: "in"
                    },
                    slideInRight: {
                        defaultDuration: 1e3,
                        calls: [
                            [{
                                opacity: [1, 0],
                                translateX: [0, 100],
                                translateZ: 0
                            }]
                        ],
                        desc: "\u4ece\u53f3\u6ed1\u5165",
                        type: "in"
                    },
                    spaceInRight: {
                        defaultDuration: 1e3,
                        calls: [
                            [{
                                opacity: [1, 0],
                                translateX: ["200%", 0],
                                scale: .2,
                                transformOriginX: "100%",
                                transformOriginY: "50%"
                            }, .5],
                            [{
                                translateX: 0,
                                scale: 1,
                                transformOriginX: "100%",
                                transformOriginY: "50%"
                            }, .5]
                        ],
                        desc: "\u7a7a\u95f4\u53f3\u5165",
                        type: "in"
                    },
                    spaceInLeft: {
                        defaultDuration: 1e3,
                        calls: [
                            [{
                                opacity: [1, 0],
                                translateX: ["-200%", 0],
                                scale: .2,
                                transformOriginX: 0,
                                transformOriginY: "50%"
                            }, .5],
                            [{
                                translateX: 0,
                                scale: 1,
                                transformOriginX: 0,
                                transformOriginY: "50%"
                            }, .5]
                        ],
                        desc: "\u7a7a\u95f4\u5de6\u5165",
                        type: "in"
                    },
                    spaceInDown: {
                        defaultDuration: 1e3,
                        calls: [
                            [{
                                opacity: [1, 0],
                                translateY: ["200%", 0],
                                scale: .2,
                                transformOriginX: "50%",
                                transformOriginY: "100%"
                            }, .5],
                            [{
                                translateY: 0,
                                scale: 1,
                                transformOriginX: "50%",
                                transformOriginY: "100%"
                            }, .5]
                        ],
                        desc: "\u7a7a\u95f4\u4e0a\u5165",
                        type: "in"
                    },
                    spaceInUp: {
                        defaultDuration: 1e3,
                        calls: [
                            [{
                                opacity: [1, 0],
                                translateY: [0, "-200%"],
                                scale: .2,
                                transformOriginX: "50%",
                                transformOriginY: 0
                            }, .5],
                            [{
                                translateY: 0,
                                scale: 1,
                                transformOriginX: "50%",
                                transformOriginY: 0
                            }, .5]
                        ],
                        desc: "\u7a7a\u95f4\u4e0b\u5165",
                        type: "in"
                    },
                    boomIn: {
                        defaultDuration: 1e3,
                        calls: [
                            [{
                                opacity: 0,
                                scale: 2
                            }, .25],
                            [{
                                opacity: .5,
                                scale: 3
                            }, .25],
                            [{
                                opacity: .8,
                                scale: .7
                            }, .25],
                            [{
                                opacity: 1,
                                scale: 1
                            }, .25]
                        ],
                        desc: "\u7206\u70b8\u6548\u679c",
                        type: "in"
                    },
                    tinUpIn: {
                        defaultDuration: 1e3,
                        calls: [
                            [{
                                    opacity: 1,
                                    translateY: "-900%",
                                    scale: 1
                                },
                                1 / 7
                            ],
                            [{
                                    opacity: 1,
                                    translateY: 0,
                                    scale: 1.1
                                },
                                1 / 7
                            ],
                            [{
                                    opacity: 1,
                                    translateY: 0,
                                    scale: 1
                                },
                                1 / 7
                            ],
                            [{
                                    opacity: 1,
                                    translateY: 0,
                                    scale: 1.1
                                },
                                1 / 7
                            ],
                            [{
                                    opacity: 1,
                                    translateY: 0,
                                    scale: 1
                                },
                                1 / 7
                            ],
                            [{
                                    opacity: 1,
                                    translateY: 0,
                                    scale: 1.1
                                },
                                1 / 7
                            ],
                            [{
                                    opacity: 1,
                                    translateY: 0,
                                    scale: 1
                                },
                                1 / 7
                            ]
                        ],
                        desc: "\u94c3\u58f0\u4e0a\u5165",
                        type: "in"
                    },
                    tinDownIn: {
                        defaultDuration: 1e3,
                        calls: [
                            [{
                                    opacity: 1,
                                    translateY: "900%",
                                    scale: 1
                                },
                                1 / 7
                            ],
                            [{
                                    opacity: 1,
                                    translateY: 0,
                                    scale: 1.1
                                },
                                1 / 7
                            ],
                            [{
                                    opacity: 1,
                                    translateY: 0,
                                    scale: 1
                                },
                                1 / 7
                            ],
                            [{
                                    opacity: 1,
                                    translateY: 0,
                                    scale: 1.1
                                },
                                1 / 7
                            ],
                            [{
                                    opacity: 1,
                                    translateY: 0,
                                    scale: 1
                                },
                                1 / 7
                            ],
                            [{
                                    opacity: 1,
                                    translateY: 0,
                                    scale: 1.1
                                },
                                1 / 7
                            ],
                            [{
                                    opacity: 1,
                                    translateY: 0,
                                    scale: 1
                                },
                                1 / 7
                            ]
                        ],
                        desc: "\u94c3\u58f0\u4e0b\u5165",
                        type: "in"
                    },
                    foolishIn: {
                        defaultDuration: 1e3,
                        calls: [
                            [{
                                scale: 0,
                                rotate: 360,
                                transformOrigin: "50%"
                            }, .25],
                            [{
                                opacity: 1,
                                scale: .5,
                                rotate: 0,
                                transformOriginX: 0,
                                transformOriginY: "100%"
                            }, .25],
                            [{
                                opacity: 1,
                                scale: .5,
                                rotate: 0,
                                transformOriginX: "100%"
                            }, .25],
                            [{
                                opacity: 1,
                                scale: .5,
                                rotate: 0,
                                transformOrigin: 0
                            }, .25],
                            [{
                                opacity: 1,
                                scale: 1,
                                rotate: 0,
                                transformOrigin: "50%"
                            }, .25]
                        ],
                        desc: "\u4e71\u5165",
                        type: "in"
                    },
                    puffIn: {
                        defaultDuration: 1e3,
                        calls: [
                            [{
                                scale: 2,
                                opacity: 0,
                                transformOrigin: "50%",
                                blur: 2
                            }, .5],
                            [{
                                scale: 1,
                                opacity: 1,
                                transformOrigin: "50%",
                                blur: 0
                            }, .5]
                        ],
                        desc: "\u95ea\u5165",
                        type: "in"
                    },
                    slideRight: {
                        defaultDuration: 1e3,
                        calls: [
                            [{
                                opacity: [1, 1],
                                transformOrigin: 0,
                                translateX: [0, "-100%"]
                            }]
                        ],
                        desc: "\u53f3\u79fb\u52a8",
                        type: "in"
                    },
                    twisterInUp: {
                        defaultDuration: 1e3,
                        calls: [
                            [{
                                    opacity: 0,
                                    scale: 0,
                                    rotateZ: 360,
                                    translateY: "100%",
                                    transformOriginX: "100%",
                                    transformOriginY: 0
                                },
                                1 / 3
                            ],
                            [{
                                    opacity: 1,
                                    scale: 0,
                                    rotateZ: 360,
                                    translateY: "100%",
                                    transformOriginX: "100%",
                                    transformOriginY: 0
                                },
                                1 / 3
                            ],
                            [{
                                    opacity: 1,
                                    scale: 1,
                                    rotateZ: 0,
                                    translateY: 0,
                                    transformOriginX: 0,
                                    transformOriginY: 0
                                },
                                1 / 3
                            ]
                        ],
                        desc: "\u4e0a\u65cb\u8f6c\u5165",
                        type: "in"
                    },
                    zoomOut: {
                        defaultDuration: 800,
                        calls: [
                            [{
                                opacity: 1,
                                scale: 1
                            }, .5],
                            [{
                                opacity: 0,
                                scale: .3
                            }, .5]
                        ],
                        reset: {
                            scale: 1
                        },
                        desc: "\u7f29\u5c0f\u9000\u51fa",
                        type: "out"
                    },
                    bounceOut: {
                        defaultDuration: 800,
                        calls: [
                            [{
                                    opacity: 1,
                                    scale: 1
                                },
                                1 / 6, {
                                    easing: "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
                                }
                            ],
                            [{
                                    opacity: 1,
                                    scale: .97
                                },
                                1 / 6, {
                                    easing: "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
                                }
                            ],
                            [{
                                    opacity: 1,
                                    scale: 1.03
                                },
                                1 / 6, {
                                    easing: "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
                                }
                            ],
                            [{
                                    opacity: 1,
                                    scale: .9
                                },
                                1 / 6, {
                                    easing: "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
                                }
                            ],
                            [{
                                    opacity: 1,
                                    scale: 1.1
                                },
                                1 / 6, {
                                    easing: "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
                                }
                            ],
                            [{
                                    opacity: 1,
                                    scale: 0
                                },
                                1 / 6, {
                                    easing: "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
                                }
                            ]
                        ],
                        reset: {
                            scale: 1
                        },
                        desc: "\u5f39\u51fa",
                        type: "out"
                    },
                    bounceOutUp: {
                        defaultDuration: 1e3,
                        calls: [
                            [{
                                translateY: 20
                            }, .2],
                            [{
                                opacity: [0, "easeInCirc", 1],
                                translateY: -1e3
                            }, .8]
                        ],
                        reset: {
                            translateY: 0
                        },
                        desc: "\u5411\u4e0a\u5f39\u51fa",
                        type: "out"
                    },
                    bounceOutDown: {
                        defaultDuration: 1e3,
                        calls: [
                            [{
                                translateY: -20
                            }, .2],
                            [{
                                opacity: [0, "easeInCirc", 1],
                                translateY: 1e3
                            }, .8]
                        ],
                        reset: {
                            translateY: 0
                        },
                        desc: "\u5411\u4e0b\u5f39\u51fa",
                        type: "out"
                    },
                    bounceOutRight: {
                        defaultDuration: 750,
                        calls: [
                            [{
                                translateX: -30
                            }, .2],
                            [{
                                opacity: [0, "easeInCirc", 1],
                                translateX: 1250
                            }, .8]
                        ],
                        reset: {
                            translateX: 0
                        },
                        desc: "\u4ece\u53f3\u5f39\u51fa",
                        type: "out"
                    },
                    bounceOutLeft: {
                        defaultDuration: 750,
                        calls: [
                            [{
                                translateX: 30
                            }, .2],
                            [{
                                opacity: [0, "easeInCirc", 1],
                                translateX: -1250
                            }, .8]
                        ],
                        reset: {
                            translateX: 0
                        },
                        desc: "\u4ece\u5de6\u5f39\u51fa",
                        type: "out"
                    },
                    fadeOut: {
                        defaultDuration: 500,
                        calls: [
                            [{
                                opacity: [0, 1]
                            }]
                        ],
                        desc: "\u6de1\u51fa",
                        type: "out"
                    },
                    fadeOutUp: {
                        defaultDuration: 500,
                        calls: [
                            [{
                                opacity: [0, 1],
                                translateY: ["-100%", 0]
                            }]
                        ],
                        reset: {
                            translateY: 0
                        },
                        desc: "\u5411\u4e0a\u6de1\u51fa",
                        type: "out"
                    },
                    fadeOutDown: {
                        defaultDuration: 500,
                        calls: [
                            [{
                                opacity: [0, 1],
                                translateY: ["100%", 0]
                            }]
                        ],
                        reset: {
                            translateY: 0
                        },
                        desc: "\u5411\u4e0b\u6de1\u51fa",
                        type: "out"
                    },
                    fadeOutLeft: {
                        defaultDuration: 500,
                        calls: [
                            [{
                                opacity: [0, 1],
                                translateX: ["-100%", 0]
                            }]
                        ],
                        reset: {
                            translateX: 0
                        },
                        desc: "\u4ece\u5de6\u6de1\u51fa",
                        type: "out"
                    },
                    fadeOutRight: {
                        defaultDuration: 500,
                        calls: [
                            [{
                                opacity: [0, 1],
                                translateX: ["100%", 0]
                            }]
                        ],
                        reset: {
                            translateX: 0
                        },
                        desc: "\u4ece\u53f3\u6de1\u51fa",
                        type: "out"
                    },
                    flipOutY: {
                        defaultDuration: 800,
                        calls: [
                            [{
                                opacity: [0, 1],
                                transformPerspective: [800, 800],
                                rotateX: 90
                            }]
                        ],
                        reset: {
                            transformPerspective: 0,
                            rotateX: 0
                        },
                        desc: "Y\u8f74\u8f6c\u51fa",
                        type: "out"
                    },
                    flipOutX: {
                        defaultDuration: 700,
                        calls: [
                            [{
                                opacity: [0, 1],
                                transformPerspective: [800, 800],
                                rotateY: 90
                            }]
                        ],
                        reset: {
                            transformPerspective: 0,
                            rotateY: 0
                        },
                        desc: "X\u8f74\u8f6c\u51fa",
                        type: "out"
                    },
                    lightSpeedOut: {
                        defaultDuration: 800,
                        calls: [
                            [{
                                translateX: ["100%", 0],
                                skewX: [30, 0],
                                opacity: [0, 1]
                            }]
                        ],
                        reset: {
                            skewX: 0,
                            translateX: 0
                        },
                        desc: "\u5149\u901f\u8fdb\u51fa",
                        type: "out"
                    },
                    rollOut: {
                        defaultDuration: 800,
                        calls: [
                            [{
                                translateX: ["100%", 0],
                                rotateZ: [120, 0],
                                opacity: [0, 1]
                            }]
                        ],
                        reset: {
                            rotateZ: 0,
                            translateX: 0
                        },
                        desc: "\u6eda\u51fa",
                        type: "out"
                    },
                    slideOutUp: {
                        defaultDuration: 900,
                        calls: [
                            [{
                                opacity: [0, 1],
                                translateY: -100,
                                translateZ: 0
                            }]
                        ],
                        reset: {
                            translateY: 0,
                            translateZ: 0
                        },
                        desc: "\u4ece\u4e0a\u6ed1\u51fa",
                        type: "out"
                    },
                    slideOutDown: {
                        defaultDuration: 900,
                        calls: [
                            [{
                                opacity: [0, 1],
                                translateY: 100,
                                translateZ: 0
                            }]
                        ],
                        reset: {
                            translateY: 0,
                            translateZ: 0
                        },
                        desc: "\u4ece\u4e0b\u6ed1\u51fa",
                        type: "out"
                    },
                    slideOutLeft: {
                        defaultDuration: 1050,
                        calls: [
                            [{
                                opacity: [0, 1],
                                translateX: -100,
                                translateZ: 0
                            }]
                        ],
                        reset: {
                            translateX: 0,
                            translateZ: 0
                        },
                        desc: "\u4ece\u5de6\u6ed1\u51fa",
                        type: "out"
                    },
                    slideOutRight: {
                        defaultDuration: 1050,
                        calls: [
                            [{
                                opacity: [0, 1],
                                translateX: 100,
                                translateZ: 0
                            }]
                        ],
                        reset: {
                            translateX: 0,
                            translateZ: 0
                        },
                        desc: "\u4ece\u53f3\u6ed1\u51fa",
                        type: "out"
                    }
                };
            for (var u in o) i.RegisterEffect(u, o[u]);
            var a = s.extend(!0, {}, o);
            return t.bmtResetAnimation = c, t.bmtRunSequence = l, {
                registAnimation: f,
                bmtResetAnimation: c,
                bmtRunSequence: l,
                packagedEffects: o
            }
        }(window.jQuery || window.Zepto || window, window, document)
    }),
    function () {
        var e = 0,
            t = ["ms", "moz", "webkit", "o"];
        for (var n = 0; n < t.length && !window.requestAnimationFrame; ++n) window.requestAnimationFrame = window[t[n] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[n] + "CancelAnimationFrame"] || window[t[n] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function (t, n) {
            var r = (new Date).getTime(),
                i = Math.max(0, 16 - (r - e)),
                s = window.setTimeout(function () {
                    t(r + i)
                }, i);
            return e = r + i, s
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (e) {
            clearTimeout(e)
        })
    }(), window.define && window.define("js/libs/raf", function () {}), "use strict",
    function () {
        (function (e, t) {
            if (typeof exports == "object") module.exports = t(require("module/components/page-transition/modernizr.custom"), require("module/velocity/velocity-animation"), require("js/libs/raf"));
            else if (typeof define == "function" && define.amd) define("module/components/page-transition/main", ["module/components/page-transition/modernizr.custom", "module/velocity/velocity-animation", "js/libs/raf"], t);
            else {
                var n = "PageTransition",
                    r = n.split("."),
                    i = e;
                for (var s = 0; s < r.length - 1; s++) i[r[s]] === undefined && (i[r[s]] = {}), i = i[r[s]];
                i[r[r.length - 1]] = t(e._3, e.velocityAnimation, e._4)
            }
        })(this, function (e, t, n) {
            function r(r) {
                return {
                    "module/components/page-transition/modernizr.custom": e,
                    "module/velocity/velocity-animation": t,
                    "js/libs/raf": n
                }[r]
            }

            function s() {
                if (!window.getComputedStyle) return !1;
                var e = document.createElement("p"),
                    t, n = {
                        webkitTransform: "-webkit-transform",
                        OTransform: "-o-transform",
                        msTransform: "-ms-transform",
                        MozTransform: "-moz-transform",
                        transform: "transform"
                    };
                document.body.insertBefore(e, null);
                for (var r in n) e.style[r] !== undefined && (e.style[r] = "translate3d(1px,1px,1px)", t = window.getComputedStyle(e).getPropertyValue(n[r]));
                return document.body.removeChild(e), t !== undefined && t.length > 0 && t !== "none"
            }
            var i = undefined;
            return NovaExports.__fixedUglify = "script>", NovaExports.exports = {
                    stylesheet: ":host{position:relative;display:block;width:100%;height:100%;-webkit-perspective:1200px;perspective:1200px}:host ::content .pt-page{width:100%;height:100%;position:absolute;top:0;left:0;visibility:hidden;overflow:hidden;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform-style:preserve-3d;transform-style:preserve-3d}:host ::content .pt-page-transform3d{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}:host ::content .pt-page-current{visibility:visible;z-index:11!important}:host ::content .pt-page-ontop{z-index:1}.disable-swipable{pointer-events:none}",
                    template: "\n        <content></content>\n    "
                },
                function () {
                    window.PageTransition = NovaExports({
                        is: "page-transition",
                        props: {
                            index: {
                                type: Number,
                                value: -1
                            },
                            count: {
                                type: Number,
                                value: 0
                            },
                            loop: {
                                type: Boolean,
                                value: !1
                            },
                            swipable: {
                                type: Boolean,
                                value: !0
                            },
                            enableSwipable: {
                                type: Boolean,
                                value: !0
                            },
                            direction: {
                                type: String,
                                value: "vertical"
                            },
                            transitionType: {
                                type: String,
                                value: "slide"
                            },
                            selectors: {
                                type: Object,
                                value: function () {
                                    return {
                                        ptPage: "pt-page",
                                        current: "pt-page-current"
                                    }
                                }
                            }
                        },
                        createdHandler: function () {
                            var t = this,
                                n = t.selectors,
                                r = t.swipable;
                            t.initTransitionClass(), t.initAminEndEventName(), t.$ptPages = $(t).children("." + n.ptPage), t.$arrow = $(t).children(".arrow"), t.count = t.$ptPages.length, t.get("count") > 0 && t.get("index") == -1 && t.set("index", 0), t.initPtPages(t.$ptPages, t.$arrow), r && t.bindSwipeEvent(), $(this.$ptPages[this.get("index")]).addClass("current"), $(this.$ptPages[this.get("index")]).addClass("hardware-accelerated");
                            var i = this.$ptPages[this.get("index")];
                            Nova.ready(i, function () {
                                i.setPreHideEles(), Nova.ready($(i).children().toArray(), function () {
                                    $(i).trigger("pageIn")
                                }), t.runElementsAnimation(t.get("index"))
                            }), this.on("runPageAnimation", function (e, n) {
                                t.runElementsAnimation(n)
                            });
                            var s = location.search.split(/\?|&|=/);
                            for (var o = 0, u = s.length; o < u; o++)(s[o] === "likePageId" || s[o] === "commentPageId") && function () {
                                var e = s[o + 1],
                                    n = $("#" + e).index();
                                setTimeout(function () {
                                    t.switchTo(n, "next")
                                }, 100), o = u
                            }()
                        }, tagAnimationElements: function (t, n) {
                            var r = $(this.$ptPages[n]).children();
                            r.hasClass("wrap") && (r = $(this.$ptPages[n]).children().children()), $.each(r, function (e, t) {
                                Nova.ready([t], function () {
                                    var e = t.animationStyle;
                                    e.length && $(t).addClass("with-animation")
                                })
                            })
                        }, getHasAnimationElems: function (t) {
                            t = $(t);
                            var n = [],
                                r = JSON.parse(t.attr("event-data")) || [];
                            return $.each(r, function (e, t) {
                                var r = t.actions;
                                $.each(r, function (e, t) {
                                    var r = t.value.elems;
                                    r && $.each(r, function (e, t) {
                                        var r = $("#" + t).length ? $("#" + t).attr("animation-style") : "[]",
                                            i = JSON.parse(r);
                                        i.length && n.push(t)
                                    })
                                })
                            }), n
                        }, initDomStatus: function () {
                            var t = this.$ptPages;
                            $.each(t, function (e, t) {
                                var n = $(t).children();
                                $.each(n, function (e, t) {
                                    Nova.ready([t], function () {
                                        var e = t.animationStyle;
                                        e.length ? $(t).css("opacity", "0") : $(t).css("opacity", "1")
                                    })
                                })
                            })
                        }, bindSwipeEvent: function () {
                            var t = this,
                                n = t.direction;
                            document.addEventListener("touchmove", function (e) {
                                e.preventDefault()
                            }, !1);
                            var r = n == "vertical" ? "swipeUp" : "swipeLeft",
                                i = n == "vertical" ? "swipeDown" : "swipeRight";
                            $(t).on(i, function (e) {
                                t.enableSwipable && (e.stopPropagation(), t.prev())
                            }), $(t).on(r, function (e) {
                                t.enableSwipable && (e.stopPropagation(), t.next())
                            }), $(t).on("click", ".arrow", function () {
                                t.next()
                            })
                        }, initAminEndEventName: function () {
                            var t = this,
                                n = {
                                    WebkitAnimation: "webkitAnimationEnd",
                                    OAnimation: "oAnimationEnd",
                                    msAnimation: "MSAnimationEnd",
                                    animation: "webkitAnimationEnd"
                                };
                            t.animEndEventName = n[Modernizr.prefixed("animation")], t.isAnimating = !1, t.endOutPage = !1, t.endInPage = !1, t.support = Modernizr.cssanimations
                        }, initPtPages: function (t, n) {
                            var r = this.get("direction"),
                                i = this.get("swipable");
                            i && (r == "vertical" ? n.addClass("arrow-vertical") : n.addClass("arrow-horizonal")), this.get("index") == this.count - 1 ? (n.hide(), setTimeout(function () {
                                $(".last-ads").addClass("surfaced")
                            }, 1e3)) : n.show(), t.each(function () {
                                var e = $(this);
                                e.data("originalClassList", e.attr("class"))
                            }), t.eq(this.get("index")).addClass(this.get("selectors").current)
                        }, switchTo: function (t, n) {
                            var r = this;
                            if (t > r.count - 1) return !1;
                            r.loop || (t == r.count - 1 ? r.$arrow.hide() : r.$arrow.show());
                            if (r.isAnimating) return !1;
                            var i = r.index,
                                n = n != undefined ? n : i < t ? "next" : "prev",
                                o = $(r.$ptPages[i]),
                                u = $(r.$ptPages[t]),
                                a = r.direction,
                                f = r.transitionType;
                            u[0].setPreHideEles(), r.isAnimating = !0, r.index = t, r.support || r.onEndAnimation(o, u), o.on(r.animEndEventName, function () {
                                o.off(r.animEndEventName), r.endOutPage = !0, r.endInPage && r.onEndAnimation(o, u)
                            }), u.on(r.animEndEventName, function () {
                                u.off(r.animEndEventName), r.endInPage = !0, r.endOutPage && r.onEndAnimation(o, u)
                            }), s() ? a == "vertical" ? n == "next" ? (o.addClass(r.upOutClass), u.addClass(r.upInClass + " " + this.get("selectors").current)) : n == "prev" && (o.addClass(r.downOutClass), u.addClass(r.downInClass + " " + this.get("selectors").current)) : a == "horizonal" && (n == "next" ? (o.addClass(r.leftOutClass), u.addClass(r.leftInClass + " " + this.get("selectors").current)) : n == "prev" && (o.addClass(r.rightOutClass), u.addClass(r.rightInClass + " " + this.get("selectors").current))) : (o.removeClass(this.get("selectors").current), u.addClass(this.get("selectors").current), r.onEndAnimation(o, u)), r.trigger("switch", [t]), $(this.$ptPages[this.get("index")]).addClass("hardware-accelerated"), t == r.count - 1 ? setTimeout(function () {
                                $(".last-ads").addClass("surfaced")
                            }, 1e3) : $(".last-ads").removeClass("surfaced")
                        }, onEndAnimation: function (t, n) {
                            this.endOutPage = !1, this.endInPage = !1, this.resetPage(t, n), this.isAnimating = !1, this.trigger("afterSwitch", [t[0], n[0]]), $(this.$ptPages[this.get("index")]).addClass("current"), $(this.$ptPages[this.get("index")]).addClass("hardware-accelerated"), t.trigger("pageOut"), n.trigger("pageIn"), this.runElementsAnimation(this.get("index"))
                        }, stopElementsAnimation: function (t) {
                            var n = this,
                                r = $(this.$ptPages[t])[0];
                            if (!r) return;
                            Nova.ready([r], function () {
                                r.stopPlugins()
                            })
                        }, runElementsAnimation: function (t) {
                            var n = this,
                                r = $(this.$ptPages[t])[0];
                            if (r) {
                                r.animatePlugins();
                                return
                            }
                            Nova.ready([r], function () {
                                r.animatePlugins()
                            })
                        }, resetPage: function (t, n) {
                            t.attr("class", t.data("originalClassList")), n.attr("class", n.data("originalClassList") + " " + this.get("selectors").current)
                        }, prev: function e() {
                            var e = this.getPrevIndex();
                            if (e != -1) {
                                this.switchTo(e, "prev");
                                var t = this.getNextIndex();
                                return this.stopElementsAnimation(t), this.stopElementsAnimation(e), !0
                            }
                            return !1
                        }, next: function t() {
                            var e = this.get("index"),
                                t = this.getNextIndex();
                            if (t != -1) {
                                this.switchTo(t, "next");
                                var n = this.getPrevIndex();
                                return this.stopElementsAnimation(n), this.stopElementsAnimation(t), !0
                            }
                            return !1
                        }, getPrevIndex: function () {
                            var t = this.index,
                                n = -1,
                                r = this.count;
                            return this.loop ? n = (t - 1 + r) % r : t - 1 >= 0 && (n = t - 1), n
                        }, getNextIndex: function () {
                            var t = this.index,
                                n = -1,
                                r = this.count;
                            return this.loop ? n = (t + 1) % r : t + 1 < r && (n = t + 1), n
                        }, initTransitionClass: function () {
                            var t = this,
                                n = t.transitionType,
                                r = t.direction;
                            switch (n) {
                            case "slide":
                                r == "vertical" ? (t.upInClass = "pt-page-moveFromBottom", t.upOutClass = "pt-page-moveToTop", t.downInClass = "pt-page-moveFromTop", t.downOutClass = "pt-page-moveToBottom") : r == "horizonal" && (t.leftInClass = "pt-page-moveFromRight", t.leftOutClass = "pt-page-moveToLeft", t.rightInClass = "pt-page-moveFromLeft", t.rightOutClass = "pt-page-moveToRight");
                                break;
                            case "fade":
                                r == "vertical" ? (t.upInClass = "pt-page-moveFromBottomFade", t.upOutClass = "pt-page-moveToTopFade", t.downInClass = "pt-page-moveFromTopFade", t.downOutClass = "pt-page-moveToBottomFade") : r == "horizonal" && (t.leftInClass = "pt-page-moveFromRightFade", t.leftOutClass = "pt-page-moveToLeftFade", t.rightInClass = "pt-page-moveFromLeftFade", t.rightOutClass = "pt-page-moveToRightFade");
                                break;
                            case "easingOutSlideIn":
                                r == "vertical" ? (t.upInClass = "pt-page-moveFromBottom", t.upOutClass = "pt-page-moveToTopEasing pt-page-ontop", t.downInClass = "pt-page-moveFromTop", t.downOutClass = "pt-page-moveToBottomEasing pt-page-ontop") : r == "horizonal" && (t.leftInClass = "pt-page-moveFromRight", t.leftOutClass = "pt-page-moveToLeftEasing pt-page-ontop", t.rightInClass = "pt-page-moveFromLeft", t.rightOutClass = "pt-page-moveToRightEasing pt-page-ontop");
                                break;
                            case "scaleDown":
                                r == "vertical" ? (t.upInClass = t.downInClass = "pt-page-scaleUpDown pt-page-delay300", t.upOutClass = t.downOutClass = "pt-page-scaleDown") : r == "horizonal" && (t.leftInClass = t.rightInClass = "pt-page-scaleUpDown pt-page-delay300", t.leftOutClass = t.rightOutClass = "pt-page-scaleDown");
                                break;
                            case "scaleUp":
                                r == "vertical" ? (t.upInClass = t.downInClass = "pt-page-scaleUp pt-page-delay300", t.upOutClass = t.downOutClass = "pt-page-scaleDownUp") : r == "horizonal" && (t.leftInClass = t.rightInClass = "pt-page-scaleUp pt-page-delay300", t.leftOutClass = t.rightOutClass = "pt-page-scaleDownUp");
                                break;
                            case "scaleUpInSlideOut":
                                r == "vertical" ? (t.upInClass = "pt-page-scaleUp", t.upOutClass = "pt-page-moveToTop pt-page-ontop", t.downInClass = "pt-page-scaleUp", t.downOutClass = "pt-page-moveToBottom pt-page-ontop") : r == "horizonal" && (t.leftInClass = "pt-page-scaleUp", t.leftOutClass = "pt-page-moveToLeft pt-page-ontop", t.rightInClass = "pt-page-scaleUp", t.rightOutClass = "pt-page-moveToRight pt-page-ontop");
                                break;
                            case "scaleUpInScaleDownOut":
                                r == "vertical" ? (t.upInClass = t.downInClass = "pt-page-scaleUpCenter pt-page-delay400", t.upOutClass = t.downOutClass = "pt-page-scaleDownCenter") : r == "horizonal" && (t.leftInClass = t.rightInClass = "pt-page-scaleUpCenter pt-page-delay400", t.leftOutClass = t.rightOutClass = "pt-page-scaleDownCenter");
                                break;
                            case "SlideInRotateOut":
                                r == "vertical" ? (t.upInClass = "pt-page-moveFromBottom pt-page-delay200 pt-page-ontop", t.upOutClass = "pt-page-rotateBottomSideFirst", t.downInClass = "pt-page-moveFromTop pt-page-delay200 pt-page-ontop", t.downOutClass = "pt-page-rotateTopSideFirst") : r == "horizonal" && (t.leftInClass = "pt-page-moveFromRight pt-page-delay200 pt-page-ontop", t.leftOutClass = "pt-page-rotateRightSideFirst", t.rightInClass = "pt-page-moveFromLeft pt-page-delay200 pt-page-ontop", t.rightOutClass = "pt-page-rotateLeftSideFirst");
                                break;
                            case "flip":
                                r == "vertical" ? (t.upInClass = "pt-page-flipInBottom pt-page-delay500", t.upOutClass = "pt-page-flipOutTop", t.downInClass = "pt-page-flipInTop pt-page-delay500", t.downOutClass = "pt-page-flipOutBottom") : r == "horizonal" && (t.leftInClass = "pt-page-flipInRight pt-page-delay500", t.leftOutClass = "pt-page-flipOutLeft", t.rightInClass = "pt-page-flipInLeft pt-page-delay500", t.rightOutClass = "pt-page-flipOutRight");
                                break;
                            case "rotateFall":
                                r == "vertical" ? (t.upInClass = t.downInClass = "pt-page-scaleUp", t.upOutClass = t.downOutClass = "pt-page-rotateFall pt-page-ontop") : r == "horizonal" && (t.leftInClass = t.rightInClass = "pt-page-scaleUp", t.leftOutClass = t.rightOutClass = "pt-page-rotateFall pt-page-ontop");
                                break;
                            case "rotateCircle":
                                r == "vertical" ? (t.upInClass = t.downInClass = "pt-page-rotateInNewspaper pt-page-delay500", t.upOutClass = t.downOutClass = "pt-page-rotateOutNewspaper") : r == "horizonal" && (t.leftInClass = t.rightInClass = "pt-page-rotateInNewspaper pt-page-delay500", t.leftOutClass = t.rightOutClass = "pt-page-rotateOutNewspaper");
                                break;
                            case "slideInPushOut":
                                r == "vertical" ? (t.upInClass = "pt-page-moveFromBottom", t.upOutClass = "pt-page-rotatePushTop", t.downInClass = "pt-page-moveFromTop", t.downOutClass = "pt-page-rotatePushBottom") : r == "horizonal" && (t.leftInClass = "pt-page-moveFromRight", t.leftOutClass = "pt-page-rotatePushLeft", t.rightInClass = "pt-page-moveFromLeft", t.rightOutClass = "pt-page-rotatePushRight");
                                break;
                            case "pullInPushOut":
                                r == "vertical" ? (t.upInClass = "pt-page-rotatePullBottom pt-page-delay180", t.upOutClass = "pt-page-rotatePushTop", t.downInClass = "pt-page-rotatePullTop pt-page-delay180", t.downOutClass = "pt-page-rotatePushBottom") : r == "horizonal" && (t.leftInClass = "pt-page-rotatePullRight pt-page-delay180", t.leftOutClass = "pt-page-rotatePushLeft", t.rightInClass = "pt-page-rotatePullLeft pt-page-delay180", t.rightOutClass = "pt-page-rotatePushRight");
                                break;
                            case "room":
                                r == "vertical" ? (t.upInClass = "pt-page-rotateRoomTopIn", t.upOutClass = "pt-page-rotateRoomTopOut pt-page-ontop", t.downInClass = "pt-page-rotateRoomBottomIn", t.downOutClass = "pt-page-rotateRoomBottomOut pt-page-ontop") : r == "horizonal" && (t.leftInClass = "pt-page-rotateRoomLeftIn", t.leftOutClass = "pt-page-rotateRoomLeftOut pt-page-ontop", t.rightInClass = "pt-page-rotateRoomRightIn", t.rightOutClass = "pt-page-rotateRoomRightOut pt-page-ontop");
                                break;
                            case "cube":
                                r == "vertical" ? (t.upInClass = "pt-page-rotateCubeTopIn pt-page-transform3d", t.upOutClass = "pt-page-rotateCubeTopOut pt-page-transform3d pt-page-ontop", t.downInClass = "pt-page-rotateCubeBottomIn pt-page-transform3d", t.downOutClass = "pt-page-rotateCubeBottomOut pt-page-transform3d pt-page-ontop") : r == "horizonal" && (t.leftInClass = "pt-page-rotateCubeLeftIn pt-page-transform3d", t.leftOutClass = "pt-page-rotateCubeLeftOut pt-page-transform3d pt-page-ontop", t.rightInClass = "pt-page-rotateCubeRightIn pt-page-transform3d", t.rightOutClass = "pt-page-rotateCubeRightOut pt-page-transform3d pt-page-ontop");
                                break;
                            case "carousel":
                                r == "vertical" ? (t.upInClass = "pt-page-rotateCarouselTopIn", t.upOutClass = "pt-page-rotateCarouselTopOut pt-page-ontop", t.downInClass = "pt-page-rotateCarouselBottomIn", t.downOutClass = "pt-page-rotateCarouselBottomOut pt-page-ontop") : r == "horizonal" && (t.leftInClass = "pt-page-rotateCarouselLeftIn", t.leftOutClass = "pt-page-rotateCarouselLeftOut pt-page-ontop", t.rightInClass = "pt-page-rotateCarouselRightIn", t.rightOutClass = "pt-page-rotateCarouselRightOut pt-page-ontop")
                            }
                        }
                    })
                }(), i
        })
    }.call(window), define("module/components/bmt-loader/webp_checker", function () {
        function n() {
            return e
        }
        var e, t = $("html").attr("data-features") || "";
        return t = t.split(","), e = t.indexOf("webp") >= 0, window.hasWebp = n, {
            hasWebp: n
        }
    }), "use strict",
    function () {
        (function (e, t) {
            if (typeof exports == "object") module.exports = t(require("module/components/plugin-behavior/main"), require("module/velocity/velocity-animation"), require("module/components/bmt-loader/webp_checker"));
            else if (typeof define == "function" && define.amd) define("module/components/bmt-page/main", ["module/components/plugin-behavior/main", "module/velocity/velocity-animation", "module/components/bmt-loader/webp_checker"], t);
            else {
                var n = "BmtPage",
                    r = n.split("."),
                    i = e;
                for (var s = 0; s < r.length - 1; s++) i[r[s]] === undefined && (i[r[s]] = {}), i = i[r[s]];
                i[r[r.length - 1]] = t(e.PluginBehaviors, e.velocityAnimation, e.WebpChecker)
            }
        })(this, function (e, t, n) {
            function r(r) {
                return {
                    "module/components/plugin-behavior/main": e,
                    "module/velocity/velocity-animation": t,
                    "module/components/bmt-loader/webp_checker": n
                }[r]
            }
            var i = undefined;
            NovaExports.__fixedUglify = "script>", NovaExports.exports = {
                stylesheet: ":host{display:table-cell;background-size:cover;background-position:50% 50%;position:absolute;width:100%;top:0;left:0;height:100%;overflow:hidden}:host.hardware-accelerated ::content>.with-animation{will-change:transform;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-perspective:1;perspective:1}:host:not(.current) ::content>.with-animation{opacity:0!important}:host.active{visibility:visible;z-index:1}",
                template: "\n        <content></content>\n    "
            };
            var s = 320,
                o = 504,
                u = s / o;
            return window.bmtPage = NovaExports({
                is: "bmt-page",
                behaviors: e,
                props: {
                    styles: {
                        type: Object,
                        observer: "stylesChangedHandler"
                    },
                    eventData: {
                        type: Object,
                        value: []
                    },
                    disSwipable: {
                        type: Boolean,
                        value: !1
                    }
                },
                createdHandler: function () {
                    var t = this;
                    this.$.css(this.styles), this.$.on("pageIn", function (e) {
                        t.disableSwipable(), $(t).find("plugin-audio").triggerHandler("pageIn"), t.shakingHandler()
                    }), this.$.on("pageOut", function (e) {
                        $(t).find("plugin-audio").triggerHandler("pageOut"), $(t).find("plugin-video").triggerHandler("pageOut"), $(window).off("devicemotion")
                    })
                }, disableSwipable: function (t) {
                    var n = this;
                    if ($(n).find("plugin-fingerprint").length > 0 || $(n).find("plugin-scratch").length > 0) t = !0;
                    t = t || !1;
                    var r = $(n).parent()[0],
                        i = $(r).find(".arrow")[0];
                    n.disSwipable || t ? (r.enableSwipable = !1, $(i).hide(), $(n).attr("not-swipable", !0)) : (r.enableSwipable = !0, $(r).attr("count") != 1 && ($(r).attr("index") < $(r).attr("count") - 1 || $(r).attr("loop")) && $(i).show(), $(n).removeAttr("not-swipable"))
                }, stylesChangedHandler: function () {
                    var t = $.extend(!0, {
                        backgroundColor: "transparent",
                        backgroundImage: "none"
                    }, this.styles);
                    t.backgroundImage != "none" && t.backgroundImage ? n.hasWebp() ? t.backgroundImage = 'url("' + t.backgroundImage.replace(/\.(jpg|png|jpeg)$/, ".webp") + '")' : t.backgroundImage = 'url("' + t.backgroundImage + '")' : t.backgroundImage = "none", $(this).attr("style", "").css(t)
                }, animatePlugins: function () {
                    var t = this,
                        n = Array.prototype.slice.call(this.children);
                    Nova.ready(n, function () {
                        n.forEach(function (e, n) {
                            e.animationStyle && e.animationStyle.length > 0 && $(e).attr("stopAnimate") != "true" && t.animatePlugin(e)
                        })
                    })
                }, animatePlugin: function (n) {
                    var r = n.styles.opacity,
                        i = n.animationStyle;
                    if (!i[0]) return;
                    $(n).show();
                    var s = i[0].animationName || "";
                    s.indexOf("Out") == -1 ? $(n).css("opacity", 0) : $(n).css("opacity", r);
                    var o = n.styles.transform && n.styles.transform.match(/rotate\(((?:-|)\d+)deg\)/),
                        u = o ? o[1] : 0;
                    i.forEach(function (e, n) {
                        t.registAnimation(e.animationName, r, u)
                    }), t.bmtResetAnimation(n), t.bmtRunSequence(n, i, function () {
                        requestAnimationFrame(function () {
                            t.bmtResetAnimation(n), n.$.trigger("animationEnd")
                        })
                    })
                }, stopPlugins: function () {
                    var t = this,
                        n = Array.prototype.slice.call(this.children);
                    Nova.ready(n, function () {
                        n.forEach(function (e, n) {
                            t.stopPlugin(e)
                        })
                    })
                }, stopPlugin: function (n) {
                    t.bmtResetAnimation(n)
                }, shakingHandler: function () {
                    var t = this,
                        n = t.hasEvent("shaking");
                    if (n != 0 && window.DeviceMotionEvent) {
                        var r = 20,
                            i, s, o, u, a, f;
                        i = s = o = u = a = f = 0;
                        var l, c = !1;
                        $(window).on("devicemotion", function () {
                            var e = event.accelerationIncludingGravity;
                            i = e.x, s = e.y, o = e.z;
                            if (Math.abs(i - u) > r && Math.abs(s - a) > r || Math.abs(o - f) > r && Math.abs(s - a) > r || Math.abs(i - u) > r && Math.abs(o - f) > r) c ? (clearTimeout(l), l = setTimeout(function () {
                                c = !1
                            }, 500)) : (t.actionHandler(n), c = !0, l = setTimeout(function () {
                                c = !1
                            }, 500));
                            u = i, a = s, f = o
                        })
                    }
                }, setPreHideEles: function () {
                    var t = Array.prototype.slice.call(this.children),
                        n = this.eventData || [];
                    Nova.ready(t, function () {
                        n.forEach(function (e, t) {
                            var n = e.actions;
                            $.each(n, function (e, t) {
                                var n = t.value.elems,
                                    r = t.type;
                                r == "show" ? n.forEach(function (e) {
                                    $("#" + e).attr("stopAnimate", "true").hide()
                                }) : r == "animate" && n.forEach(function (e) {
                                    $("#" + e).attr("stopAnimate", "true").show()
                                })
                            })
                        }), t.forEach(function (e, t) {
                            var n = JSON.parse($(e).attr("event-data")) || [];
                            $.each(n, function (e, t) {
                                var n = t.actions;
                                $.each(n, function (e, t) {
                                    var n = t.value.elems,
                                        r = t.type;
                                    r == "show" ? n.forEach(function (e) {
                                        $("#" + e).attr("stopAnimate", "true").hide()
                                    }) : r == "animate" && n.forEach(function (e) {
                                        $("#" + e).attr("stopAnimate", "true").show()
                                    })
                                })
                            })
                        })
                    })
                }, getEvents: function () {
                    return {
                        pageIn: {
                            type: "other",
                            text: "\u9875\u9762\u6ed1\u5165"
                        },
                        shaking: {
                            type: "other",
                            text: "\u6447\u4e00\u6447"
                        },
                        animationEnd: {
                            type: "none"
                        }
                    }
                }
            }), i
        })
    }.call(window), "use strict",
    function () {
        (function (e, t) {
            if (typeof exports == "object") module.exports = t();
            else if (typeof define == "function" && define.amd) define("module/components/bmt-app/main", [], t);
            else {
                var n = "BmtApp",
                    r = n.split("."),
                    i = e;
                for (var s = 0; s < r.length - 1; s++) i[r[s]] === undefined && (i[r[s]] = {}), i = i[r[s]];
                i[r[r.length - 1]] = t()
            }
        })(this, function () {
            function e(e) {
                return {}[e]
            }
            var t = undefined;
            return NovaExports.__fixedUglify = "script>", NovaExports.exports = {
                    stylesheet: ":host{display:block;height:100%}.arrow{border:0;display:block;height:40px;position:fixed;width:40px;z-index:100}.arrow-vertical{background:url(http://p3.qhimg.com/t01981a116582ae8759.png) no-repeat;background-size:100% auto;bottom:-15px;left:50%;margin-left:-20px;-webkit-animation:touchstyle-arrow-vertical-animate 2s infinite;animation:touchstyle-arrow-vertical-animate 2s infinite}.arrow-horizonal{background:url(http://p0.qhimg.com/t01c6b35fa226a3a213.png) no-repeat;background-size:auto 100%;right:-15px;top:50%;margin-top:-20px;-webkit-animation:touchstyle-arrow-horizonal-animate 2s infinite;animation:touchstyle-arrow-horizonal-animate 2s infinite}@keyframes touchstyle-arrow-vertical-animate{0%{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}33%,66%{opacity:.8}50%{opacity:.8;-webkit-transform:translateY(-8px);transform:translateY(-8px)}100%{opacity:0;-webkit-transform:translateY(-16px);transform:translateY(-16px)}}@-webkit-keyframes touchstyle-arrow-vertical-animate{0%{opacity:0;-webkit-transform:translateY(0)}33%,66%{opacity:.8}50%{opacity:.8;-webkit-transform:translateY(-8px)}100%{opacity:0;-webkit-transform:translateY(-16px)}}@keyframes touchstyle-arrow-horizonal-animate{0%{opacity:0;-webkit-transform:translateX(0);transform:translateX(0)}33%,66%{opacity:.8}50%{opacity:.8;-webkit-transform:translateX(-8px);transform:translateX(-8px)}100%{opacity:0;-webkit-transform:translateX(-16px);transform:translateX(-16px)}}@-webkit-keyframes touchstyle-arrow-horizonal-animate{0%{opacity:0;-webkit-transform:translateX(0)}33%,66%{opacity:.8}50%{opacity:.8;-webkit-transform:translateX(-8px)}100%{opacity:0;-webkit-transform:translateX(-16px)}}",
                    template: '\n        <page-transition transition-type="{{carousel.transitionType}}" direction="{{carousel.direction}}" loop="{{carousel.loop}}" swipable="{{carousel.swipable}}">\n                <content select="bmt-page"></content>\n                <div class="arrow"></div>\n        </page-transition>\n        <content></content>\n    '
                },
                function () {
                    window.BtmApp = NovaExports({
                        is: "bmt-app",
                        props: {
                            carousel: {
                                type: Object,
                                value: function () {
                                    return {
                                        direction: "horizonal",
                                        swipable: !0,
                                        loop: !1,
                                        transitionType: "cube"
                                    }
                                }
                            },
                            appId: {
                                type: String,
                                value: ""
                            }
                        },
                        createdHandler: function () {
                            var t = this;
                            window.bmtLoader.complete(function () {
                                t.initCarousel(), t.createBmtStatics(), t.trigger("ready"), t.isReady = !0
                            })
                        }, createBmtStatics: function () {
                            var t = this,
                                n = document.createElement("script");
                            n.src = "//hm.baidu.com/hm.js?acd7c493d6f9918deb8fcc535e5d71d2";
                            var r = document.getElementsByTagName("script")[0];
                            r.parentNode.insertBefore(n, r);
                            var i = t.getPerfStaticsData();
                            window.performance && _hmt.push(["_trackEvent", "\u6027\u80fd_3.0_\u8fdb\u5165\u7f51\u9875\u5230\u5f00\u59cb\u89e3\u6790", "\u8fdb\u5165", "\u6027\u80fd", i.beforeParse])
                        }, getPerfStaticsData: function () {
                            var t = {};
                            return window.performance && (t.beforeParse = performance.timing.domLoading - performance.timing.navigationStart), t
                        }, initCarousel: function () {
                            var t = this;
                            setTimeout(function () {
                                window.bmtLoader.hide(), t.on("switch", function (e, n) {
                                    $(t).children("page-transition")[0] && $(t).children("page-transition")[0]["switch"](n)
                                })
                            }, 300)
                        }
                    })
                }(), t
        })
    }.call(window), "use strict",
    function () {
        window.bmt = {
            ready: function (t, n) {
                var r = $("page-transition"),
                    i = $("plugin-music");
                typeof t == "object" ? t = t.length ? t : [r[0], i[0]] : (n = t, t = [r[0], i[0]]), bmt.music = i.find("audio")[0], bmt.carousel = r[0], NovaExports.ready(t, n)
            }, carousel: {}, music: {}
        }
    }(), window.define && window.define("module/components/bmt-app/interface", function () {}), ! function (e, t) {
        "function" == typeof define && (define.amd || define.cmd) ? define("module/components/plugin-weixin/jweixin-1.0.0", function () {
            return t(e)
        }) : t(e, !0)
    }(this, function (e, t) {
        function n(t, n, r) {
            e.WeixinJSBridge ? WeixinJSBridge.invoke(t, i(n), function (e) {
                o(t, e, r)
            }) : f(t, r)
        }

        function r(t, n, r) {
            e.WeixinJSBridge ? WeixinJSBridge.on(t, function (e) {
                r && r.trigger && r.trigger(e), o(t, e, n)
            }) : r ? f(t, r) : f(t, n)
        }

        function i(e) {
            return e = e || {}, e.appId = N.appId, e.verifyAppId = N.appId, e.verifySignType = "sha1", e.verifyTimestamp = N.timestamp + "", e.verifyNonceStr = N.nonceStr, e.verifySignature = N.signature, e
        }

        function s(e) {
            return {
                timeStamp: e.timestamp + "",
                nonceStr: e.nonceStr,
                "package": e.package,
                paySign: e.paySign,
                signType: e.signType || "SHA1"
            }
        }

        function o(e, t, n) {
            var r, i, s;
            switch (delete t.err_code, delete t.err_desc, delete t.err_detail, r = t.errMsg, r || (r = t.err_msg, delete t.err_msg, r = u(e, r, n), t.errMsg = r), n = n || {}, n._complete && (n._complete(t), delete n._complete), r = t.errMsg || "", N.debug && !n.isInnerInvoke && alert(JSON.stringify(t)), i = r.indexOf(":"), s = r.substring(i + 1)) {
            case "ok":
                n.success && n.success(t);
                break;
            case "cancel":
                n.cancel && n.cancel(t);
                break;
            default:
                n.fail && n.fail(t)
            }
            n.complete && n.complete(t)
        }

        function u(e, t) {
            var n, r, i, s;
            if (t) {
                switch (n = t.indexOf(":"), e) {
                case d.config:
                    r = "config";
                    break;
                case d.openProductSpecificView:
                    r = "openProductSpecificView";
                    break;
                default:
                    r = t.substring(0, n), r = r.replace(/_/g, " "), r = r.replace(/\b\w+\b/g, function (e) {
                        return e.substring(0, 1).toUpperCase() + e.substring(1)
                    }), r = r.substring(0, 1).toLowerCase() + r.substring(1), r = r.replace(/ /g, ""), -1 != r.indexOf("Wcpay") && (r = r.replace("Wcpay", "WCPay")), i = v[r], i && (r = i)
                }
                s = t.substring(n + 1), "confirm" == s && (s = "ok"), "failed" == s && (s = "fail"), -1 != s.indexOf("failed_") && (s = s.substring(7)), -1 != s.indexOf("fail_") && (s = s.substring(5)), s = s.replace(/_/g, " "), s = s.toLowerCase(), ("access denied" == s || "no permission to execute" == s) && (s = "permission denied"), "config" == r && "function not exist" == s && (s = "ok"), t = r + ":" + s
            }
            return t
        }

        function a(e) {
            var t, n, r, i;
            if (e) {
                for (t = 0, n = e.length; n > t; ++t) r = e[t], i = d[r], i && (e[t] = i);
                return e
            }
        }

        function f(e, t) {
            if (!(!N.debug || t && t.isInnerInvoke)) {
                var n = v[e];
                n && (e = n), t && t._complete && delete t._complete, console.log('"' + e + '",', t || "")
            }
        }

        function l() {
            if (!("6.0.2" > S || T.systemType < 0)) {
                var e = new Image;
                T.appId = N.appId, T.initTime = x.initEndTime - x.initStartTime, T.preVerifyTime = x.preVerifyEndTime - x.preVerifyStartTime, L.getNetworkType({
                    isInnerInvoke: !0,
                    success: function (t) {
                        T.networkType = t.networkType;
                        var n = "https://open.weixin.qq.com/sdk/report?v=" + T.version + "&o=" + T.isPreVerifyOk + "&s=" + T.systemType + "&c=" + T.clientVersion + "&a=" + T.appId + "&n=" + T.networkType + "&i=" + T.initTime + "&p=" + T.preVerifyTime + "&u=" + T.url;
                        e.src = n
                    }
                })
            }
        }

        function c() {
            return (new Date).getTime()
        }

        function h(t) {
            b && (e.WeixinJSBridge ? t() : m.addEventListener && m.addEventListener("WeixinJSBridgeReady", t, !1))
        }

        function p() {
            L.invoke || (L.invoke = function (t, n, r) {
                e.WeixinJSBridge && WeixinJSBridge.invoke(t, i(n), r)
            }, L.on = function (t, n) {
                e.WeixinJSBridge && WeixinJSBridge.on(t, n)
            })
        }
        var d, v, m, g, y, b, w, E, S, x, T, N, C, k, L;
        if (!e.jWeixin) return d = {
            config: "preVerifyJSAPI",
            onMenuShareTimeline: "menu:share:timeline",
            onMenuShareAppMessage: "menu:share:appmessage",
            onMenuShareQQ: "menu:share:qq",
            onMenuShareWeibo: "menu:share:weiboApp",
            onMenuShareQZone: "menu:share:QZone",
            previewImage: "imagePreview",
            getLocation: "geoLocation",
            openProductSpecificView: "openProductViewWithPid",
            addCard: "batchAddCard",
            openCard: "batchViewCard",
            chooseWXPay: "getBrandWCPayRequest"
        }, v = function () {
            var e, t = {};
            for (e in d) t[d[e]] = e;
            return t
        }(), m = e.document, g = m.title, y = navigator.userAgent.toLowerCase(), b = -1 != y.indexOf("micromessenger"), w = -1 != y.indexOf("android"), E = -1 != y.indexOf("iphone") || -1 != y.indexOf("ipad"), S = function () {
            var e = y.match(/micromessenger\/(\d+\.\d+\.\d+)/) || y.match(/micromessenger\/(\d+\.\d+)/);
            return e ? e[1] : ""
        }(), x = {
            initStartTime: c(),
            initEndTime: 0,
            preVerifyStartTime: 0,
            preVerifyEndTime: 0
        }, T = {
            version: 1,
            appId: "",
            initTime: 0,
            preVerifyTime: 0,
            networkType: "",
            isPreVerifyOk: 1,
            systemType: E ? 1 : w ? 2 : -1,
            clientVersion: S,
            url: encodeURIComponent(location.href)
        }, N = {}, C = {
            _completes: []
        }, k = {
            state: 0,
            res: {}
        }, h(function () {
            x.initEndTime = c()
        }), L = {
            config: function (e) {
                N = e, f("config", e);
                var t = N.check === !1 ? !1 : !0;
                h(function () {
                    var e, r, i;
                    if (t) n(d.config, {
                        verifyJsApiList: a(N.jsApiList)
                    }, function () {
                        C._complete = function (e) {
                            x.preVerifyEndTime = c(), k.state = 1, k.res = e
                        }, C.success = function () {
                            T.isPreVerifyOk = 0
                        }, C.fail = function (e) {
                            C._fail ? C._fail(e) : k.state = -1
                        };
                        var e = C._completes;
                        return e.push(function () {
                            N.debug || l()
                        }), C.complete = function () {
                            for (var t = 0, n = e.length; n > t; ++t) e[t]();
                            C._completes = []
                        }, C
                    }()), x.preVerifyStartTime = c();
                    else {
                        for (k.state = 1, e = C._completes, r = 0, i = e.length; i > r; ++r) e[r]();
                        C._completes = []
                    }
                }), N.beta && p()
            }, ready: function (e) {
                0 != k.state ? e() : (C._completes.push(e), !b && N.debug && e())
            }, error: function (e) {
                "6.0.2" > S || (-1 == k.state ? e(k.res) : C._fail = e)
            }, checkJsApi: function (e) {
                var t = function (e) {
                    var t, n, r = e.checkResult;
                    for (t in r) n = v[t], n && (r[n] = r[t], delete r[t]);
                    return e
                };
                n("checkJsApi", {
                    jsApiList: a(e.jsApiList)
                }, function () {
                    return e._complete = function (e) {
                        if (w) {
                            var n = e.checkResult;
                            n && (e.checkResult = JSON.parse(n))
                        }
                        e = t(e)
                    }, e
                }())
            }, onMenuShareTimeline: function (e) {
                r(d.onMenuShareTimeline, {
                    complete: function () {
                        n("shareTimeline", {
                            title: e.title || g,
                            desc: e.title || g,
                            img_url: e.imgUrl || "",
                            link: e.link || location.href
                        }, e)
                    }
                }, e)
            }, onMenuShareAppMessage: function (e) {
                r(d.onMenuShareAppMessage, {
                    complete: function () {
                        n("sendAppMessage", {
                            title: e.title || g,
                            desc: e.desc || "",
                            link: e.link || location.href,
                            img_url: e.imgUrl || "",
                            type: e.type || "link",
                            data_url: e.dataUrl || ""
                        }, e)
                    }
                }, e)
            }, onMenuShareQQ: function (e) {
                r(d.onMenuShareQQ, {
                    complete: function () {
                        n("shareQQ", {
                            title: e.title || g,
                            desc: e.desc || "",
                            img_url: e.imgUrl || "",
                            link: e.link || location.href
                        }, e)
                    }
                }, e)
            }, onMenuShareWeibo: function (e) {
                r(d.onMenuShareWeibo, {
                    complete: function () {
                        n("shareWeiboApp", {
                            title: e.title || g,
                            desc: e.desc || "",
                            img_url: e.imgUrl || "",
                            link: e.link || location.href
                        }, e)
                    }
                }, e)
            }, onMenuShareQZone: function (e) {
                r(d.onMenuShareQZone, {
                    complete: function () {
                        n("shareQZone", {
                            title: e.title || g,
                            desc: e.desc || "",
                            img_url: e.imgUrl || "",
                            link: e.link || location.href
                        }, e)
                    }
                }, e)
            }, startRecord: function (e) {
                n("startRecord", {}, e)
            }, stopRecord: function (e) {
                n("stopRecord", {}, e)
            }, onVoiceRecordEnd: function (e) {
                r("onVoiceRecordEnd", e)
            }, playVoice: function (e) {
                n("playVoice", {
                    localId: e.localId
                }, e)
            }, pauseVoice: function (e) {
                n("pauseVoice", {
                    localId: e.localId
                }, e)
            }, stopVoice: function (e) {
                n("stopVoice", {
                    localId: e.localId
                }, e)
            }, onVoicePlayEnd: function (e) {
                r("onVoicePlayEnd", e)
            }, uploadVoice: function (e) {
                n("uploadVoice", {
                    localId: e.localId,
                    isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                }, e)
            }, downloadVoice: function (e) {
                n("downloadVoice", {
                    serverId: e.serverId,
                    isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                }, e)
            }, translateVoice: function (e) {
                n("translateVoice", {
                    localId: e.localId,
                    isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                }, e)
            }, chooseImage: function (e) {
                n("chooseImage", {
                    scene: "1|2",
                    count: e.count || 9,
                    sizeType: e.sizeType || ["original", "compressed"],
                    sourceType: e.sourceType || ["album", "camera"]
                }, function () {
                    return e._complete = function (e) {
                        if (w) {
                            var t = e.localIds;
                            t && (e.localIds = JSON.parse(t))
                        }
                    }, e
                }())
            }, previewImage: function (e) {
                n(d.previewImage, {
                    current: e.current,
                    urls: e.urls
                }, e)
            }, uploadImage: function (e) {
                n("uploadImage", {
                    localId: e.localId,
                    isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                }, e)
            }, downloadImage: function (e) {
                n("downloadImage", {
                    serverId: e.serverId,
                    isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                }, e)
            }, getNetworkType: function (e) {
                var t = function (e) {
                    var t, n, r, i = e.errMsg;
                    if (e.errMsg = "getNetworkType:ok", t = e.subtype, delete e.subtype, t) e.networkType = t;
                    else switch (n = i.indexOf(":"), r = i.substring(n + 1)) {
                    case "wifi":
                    case "edge":
                    case "wwan":
                        e.networkType = r;
                        break;
                    default:
                        e.errMsg = "getNetworkType:fail"
                    }
                    return e
                };
                n("getNetworkType", {}, function () {
                    return e._complete = function (e) {
                        e = t(e)
                    }, e
                }())
            }, openLocation: function (e) {
                n("openLocation", {
                    latitude: e.latitude,
                    longitude: e.longitude,
                    name: e.name || "",
                    address: e.address || "",
                    scale: e.scale || 28,
                    infoUrl: e.infoUrl || ""
                }, e)
            }, getLocation: function (e) {
                e = e || {}, n(d.getLocation, {
                    type: e.type || "wgs84"
                }, function () {
                    return e._complete = function (e) {
                        delete e.type
                    }, e
                }())
            }, hideOptionMenu: function (e) {
                n("hideOptionMenu", {}, e)
            }, showOptionMenu: function (e) {
                n("showOptionMenu", {}, e)
            }, closeWindow: function (e) {
                e = e || {}, n("closeWindow", {
                    immediate_close: e.immediateClose || 0
                }, e)
            }, hideMenuItems: function (e) {
                n("hideMenuItems", {
                    menuList: e.menuList
                }, e)
            }, showMenuItems: function (e) {
                n("showMenuItems", {
                    menuList: e.menuList
                }, e)
            }, hideAllNonBaseMenuItem: function (e) {
                n("hideAllNonBaseMenuItem", {}, e)
            }, showAllNonBaseMenuItem: function (e) {
                n("showAllNonBaseMenuItem", {}, e)
            }, scanQRCode: function (e) {
                e = e || {}, n("scanQRCode", {
                    needResult: e.needResult || 0,
                    scanType: e.scanType || ["qrCode", "barCode"]
                }, function () {
                    return e._complete = function (e) {
                        var t, n;
                        E && (t = e.resultStr, t && (n = JSON.parse(t), e.resultStr = n && n.scan_code && n.scan_code.scan_result))
                    }, e
                }())
            }, openProductSpecificView: function (e) {
                n(d.openProductSpecificView, {
                    pid: e.productId,
                    view_type: e.viewType || 0,
                    ext_info: e.extInfo
                }, e)
            }, addCard: function (e) {
                var t, r, i, s, o = e.cardList,
                    u = [];
                for (t = 0, r = o.length; r > t; ++t) i = o[t], s = {
                    card_id: i.cardId,
                    card_ext: i.cardExt
                }, u.push(s);
                n(d.addCard, {
                    card_list: u
                }, function () {
                    return e._complete = function (e) {
                        var t, n, r, i = e.card_list;
                        if (i) {
                            for (i = JSON.parse(i), t = 0, n = i.length; n > t; ++t) r = i[t], r.cardId = r.card_id, r.cardExt = r.card_ext, r.isSuccess = r.is_succ ? !0 : !1, delete r.card_id, delete r.card_ext, delete r.is_succ;
                            e.cardList = i, delete e.card_list
                        }
                    }, e
                }())
            }, chooseCard: function (e) {
                n("chooseCard", {
                    app_id: N.appId,
                    location_id: e.shopId || "",
                    sign_type: e.signType || "SHA1",
                    card_id: e.cardId || "",
                    card_type: e.cardType || "",
                    card_sign: e.cardSign,
                    time_stamp: e.timestamp + "",
                    nonce_str: e.nonceStr
                }, function () {
                    return e._complete = function (e) {
                        e.cardList = e.choose_card_info, delete e.choose_card_info
                    }, e
                }())
            }, openCard: function (e) {
                var t, r, i, s, o = e.cardList,
                    u = [];
                for (t = 0, r = o.length; r > t; ++t) i = o[t], s = {
                    card_id: i.cardId,
                    code: i.code
                }, u.push(s);
                n(d.openCard, {
                    card_list: u
                }, e)
            }, chooseWXPay: function (e) {
                n(d.chooseWXPay, s(e), e)
            }
        }, t && (e.wx = e.jWeixin = L), L
    }), "use strict",
    function () {
        (function (e, t) {
            if (typeof exports == "object") module.exports = t(require("module/components/plugin-weixin/jweixin-1.0.0"));
            else if (typeof define == "function" && define.amd) define("module/components/plugin-weixin/main", ["module/components/plugin-weixin/jweixin-1.0.0"], t);
            else {
                var n = "PluginWeixin",
                    r = n.split("."),
                    i = e;
                for (var s = 0; s < r.length - 1; s++) i[r[s]] === undefined && (i[r[s]] = {}), i = i[r[s]];
                i[r[r.length - 1]] = t(e.wx)
            }
        })(this, function (e) {
            function t(t) {
                return {
                    "module/components/plugin-weixin/jweixin-1.0.0": e
                }[t]
            }
            var n = undefined;
            return NovaExports.__fixedUglify = "script>", NovaExports.exports = {
                stylesheet: ".share-hint{background:url(http://p0.qhimg.com/t017d01d4f9b3faf004.png) top center no-repeat;background-color:rgba(0,0,0,.5);background-size:320px 250px;bottom:0;color:#fff;font-size:20px;left:0;line-height:32px;padding-top:185px;position:fixed;right:0;text-align:center;top:0;z-index:10000;display:none}",
                template: '\n        <div class="share-hint">\n            <span>\n                &#x70B9;&#x51FB;&#x53F3;&#x4E0A;&#x89D2;<br>\n                &#x9A6C;&#x4E0A;&#x5206;&#x4EAB;&#x5230;&#x670B;&#x53CB;&#x5708;&#x5427;\n            </span>\n        </div>\n    '
            }, window.PluginWeixin = NovaExports({
                is: "plugin-weixin",
                props: {
                    weixinAccount: {
                        type: String,
                        value: "BaoMiTu"
                    },
                    weixinList: {
                        type: Array,
                        value: function () {
                            return []
                        }
                    },
                    desc: String,
                    link: {
                        type: String,
                        value: location.href
                    },
                    imgUrl: String,
                    appId: "",
                    shareTrigger: {
                        type: String,
                        value: ".js-wx-share"
                    }
                },
                createdHandler: function () {
                    var t = this;
                    this._debug = !1, this._bindEvents(), this._getAppKey().then(function (e) {
                        t._initWeixinApi(e)
                    })
                }, _bindEvents: function () {
                    var t = $(".share-hint");
                    $(document.body).on("click", this.shareTrigger, function () {
                        t.show()
                    }), t.on("click", function (e) {
                        t.hide()
                    })
                }, _getAppKey: function () {
                    var t = $.Deferred();
                    return $.ajax({
                        url: "http://misc.hao.360.cn/weixin/api",
                        data: {
                            appKey: this.weixinAccount + ":baomitu:bmt_" + this.appId,
                            url: window.location.href.split("#")[0],
                            format: "json"
                        },
                        type: "get",
                        dataType: "jsonp",
                        jsonpCallback: "_callback",
                        success: function (n) {
                            n.errno == 0 && n.data ? t.resolve(n.data) : t.reject()
                        }, fail: function () {
                            t.reject()
                        }
                    }), t.promise()
                }, _initWeixinApi: function (n) {
                    var r = this,
                        i = r.weixinList || [],
                        s = i.length,
                        o = Math.floor(Math.random() * s),
                        u = {};
                    s > 0 ? (u = i[o] || {}, u.link = location.href) : u = {
                        title: this.getAttribute("title"),
                        desc: this.desc,
                        link: this.link,
                        imgUrl: this.imgUrl
                    }, this._initWeixinConf(n), e.ready(function () {
                        r.trigger("ready", [e]), e.onMenuShareTimeline({
                            title: u.desc,
                            link: u.link,
                            imgUrl: u.imgUrl,
                            trigger: function () {
                                r.trigger("ready.onMenuShareTimeline")
                            }, cancel: function (t) {
                                r.trigger("cancel.onMenuShareTimeline", [t])
                            }, fail: function (t) {
                                r.trigger("fail.onMenuShareTimeline", [t])
                            }, success: function (t) {
                                r.trigger("success.onMenuShareTimeline", [t])
                            }, complete: function (t, n) {
                                r.trigger("complete.onMenuShareTimeline", [t, n])
                            }
                        }), e.onMenuShareAppMessage({
                            title: u.title,
                            desc: u.desc,
                            link: u.link,
                            imgUrl: u.imgUrl,
                            trigger: function () {
                                r.trigger("ready.onMenuShareAppMessage")
                            }, cancel: function (t) {
                                r.trigger("cancel.onMenuShareAppMessage", [t])
                            }, fail: function (t) {
                                r.trigger("fail.onMenuShareAppMessage", [t])
                            }, success: function (t) {
                                r.trigger("success.onMenuShareAppMessage", [t])
                            }, complete: function (t, n) {
                                r.trigger("complete.onMenuShareAppMessage", [t, n])
                            }
                        })
                    })
                }, _initWeixinConf: function (n) {
                    e ? e.config({
                        debug: this._debug,
                        appId: n.appId,
                        timestamp: n.timestamp,
                        nonceStr: n.nonceStr,
                        signature: n.signature,
                        jsApiList: ["checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"]
                    }) : console.log("weixin:\u5fae\u4fe1API\u52a0\u8f7d\u5931\u8d25")
                }
            }), n
        })
    }.call(window),
    function e(t, n, r) {
        function i(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;
                    if (!u && a) return a(o, !0);
                    if (s) return s(o, !0);
                    var f = new Error("Cannot find module '" + o + "'");
                    throw f.code = "MODULE_NOT_FOUND", f
                }
                var l = n[o] = {
                    exports: {}
                };
                t[o][0].call(l.exports, function (e) {
                    var n = t[o][1][e];
                    return i(n ? n : e)
                }, l, l.exports, e, t, n, r)
            }
            return n[o].exports
        }
        var s = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++) i(r[o]);
        return i
    }({
        1: [
            function (e, t, n) {
                function s() {
                    return {
                        a: ["target", "href", "title"],
                        abbr: ["title"],
                        address: [],
                        area: ["shape", "coords", "href", "alt"],
                        article: [],
                        aside: [],
                        audio: ["autoplay", "controls", "loop", "preload", "src"],
                        b: [],
                        bdi: ["dir"],
                        bdo: ["dir"],
                        big: [],
                        blockquote: ["cite"],
                        br: [],
                        caption: [],
                        center: [],
                        cite: [],
                        code: [],
                        col: ["align", "valign", "span", "width"],
                        colgroup: ["align", "valign", "span", "width"],
                        dd: [],
                        del: ["datetime"],
                        details: ["open"],
                        div: [],
                        dl: [],
                        dt: [],
                        em: [],
                        font: ["color", "size", "face"],
                        footer: [],
                        h1: [],
                        h2: [],
                        h3: [],
                        h4: [],
                        h5: [],
                        h6: [],
                        header: [],
                        hr: [],
                        i: [],
                        img: ["src", "alt", "title", "width", "height"],
                        ins: ["datetime"],
                        li: [],
                        mark: [],
                        nav: [],
                        ol: [],
                        p: [],
                        pre: [],
                        s: [],
                        section: [],
                        small: [],
                        span: [],
                        sub: [],
                        sup: [],
                        strong: [],
                        table: ["width", "border", "align", "valign"],
                        tbody: ["align", "valign"],
                        td: ["width", "colspan", "align", "valign"],
                        tfoot: ["align", "valign"],
                        th: ["width", "colspan", "align", "valign"],
                        thead: ["align", "valign"],
                        tr: ["rowspan", "align", "valign"],
                        tt: [],
                        u: [],
                        ul: [],
                        video: ["autoplay", "controls", "loop", "preload", "src", "height", "width"]
                    }
                }

                function u(e, t, n) {}

                function a(e, t, n) {}

                function f(e, t, n) {}

                function l(e, t, n) {}

                function c(e) {
                    return e.replace(p, "&lt;").replace(d, "&gt;")
                }

                function h(e, t, n, r) {
                    r = r || o, n = M(n);
                    if (t === "href" || t === "src") {
                        n = i.trim(n);
                        if (n === "#") return "#";
                        if (n.substr(0, 7) !== "http://" && n.substr(0, 8) !== "https://" && n.substr(0, 7) !== "mailto:" && n[0] !== "#" && n[0] !== "/") return ""
                    } else if (t === "background") {
                        E.lastIndex = 0;
                        if (E.test(n)) return ""
                    } else if (t === "style") {
                        T.lastIndex = 0;
                        if (T.test(n)) return "";
                        N.lastIndex = 0;
                        if (N.test(n)) {
                            E.lastIndex = 0;
                            if (E.test(n)) return ""
                        }
                        n = r.process(n)
                    }
                    return n = _(n), n
                }

                function C(e) {
                    return e.replace(v, "&quot;")
                }

                function k(e) {
                    return e.replace(m, '"')
                }

                function L(e) {
                    return e.replace(g, function (t, n) {
                        return n[0] === "x" || n[0] === "X" ? String.fromCharCode(parseInt(n.substr(1), 16)) : String.fromCharCode(parseInt(n, 10))
                    })
                }

                function A(e) {
                    return e.replace(y, ":").replace(b, " ")
                }

                function O(e) {
                    var t = "";
                    for (var n = 0, r = e.length; n < r; n++) t += e.charCodeAt(n) < 32 ? " " : e.charAt(n);
                    return i.trim(t)
                }

                function M(e) {
                    return e = k(e), e = L(e), e = A(e), e = O(e), e
                }

                function _(e) {
                    return e = C(e), e = c(e), e
                }

                function D() {
                    return ""
                }

                function P(e, t) {
                    function r(t) {
                        return n ? !0 : i.indexOf(e, t) !== -1
                    }
                    typeof t != "function" && (t = function () {});
                    var n = !Array.isArray(e),
                        s = [],
                        o = !1;
                    return {
                        onIgnoreTag: function (e, n, i) {
                            if (r(e)) {
                                if (i.isClosing) {
                                    var u = "[/removed]",
                                        a = i.position + u.length;
                                    return s.push([o !== !1 ? o : i.position, a]), o = !1, u
                                }
                                return o || (o = i.position), "[removed]"
                            }
                            return t(e, n, i)
                        }, remove: function (e) {
                            var t = "",
                                n = 0;
                            return i.forEach(s, function (r) {
                                t += e.slice(n, r[0]), n = r[1]
                            }), t += e.slice(n), t
                        }
                    }
                }

                function H(e) {
                    return e.replace(B, "")
                }

                function j(e) {
                    var t = e.split("");
                    return t = t.filter(function (e) {
                        var t = e.charCodeAt(0);
                        return t === 127 ? !1 : t <= 31 ? t === 10 || t === 13 ? !0 : !1 : !0
                    }), t.join("")
                }
                var r = e("cssfilter").FilterCSS,
                    i = e("./util"),
                    o = new r,
                    p = /</g,
                    d = />/g,
                    v = /"/g,
                    m = /&quot;/g,
                    g = /&#([a-zA-Z0-9]*);?/img,
                    y = /&colon;?/img,
                    b = /&newline;?/img,
                    w = /\/\*|\*\//mg,
                    E = /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a)\:/ig,
                    S = /^[\s"'`]*(d\s*a\s*t\s*a\s*)\:/ig,
                    x = /^[\s"'`]*(d\s*a\s*t\s*a\s*)\:\s*image\//ig,
                    T = /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/ig,
                    N = /u\s*r\s*l\s*\(.*/ig,
                    B = /<!--[\s\S]*?-->/g;
                n.whiteList = s(), n.getDefaultWhiteList = s, n.onTag = u, n.onIgnoreTag = a, n.onTagAttr = f, n.onIgnoreTagAttr = l, n.safeAttrValue = h, n.escapeHtml = c, n.escapeQuote = C, n.unescapeQuote = k, n.escapeHtmlEntities = L, n.escapeDangerHtml5Entities = A, n.clearNonPrintableCharacter = O, n.friendlyAttrValue = M, n.escapeAttrValue = _, n.onIgnoreTagStripAll = D, n.StripTagBody = P, n.stripCommentTag = H, n.stripBlankChar = j, n.cssFilter = o
            }, {
                "./util": 4,
                cssfilter: 8
            }
        ],
        2: [
            function (e, t, n) {
                function o(e, t) {
                    var n = new s(t);
                    return n.process(e)
                }
                var r = e("./default"),
                    i = e("./parser"),
                    s = e("./xss");
                n = t.exports = o, n.FilterXSS = s;
                for (var u in r) n[u] = r[u];
                for (var u in i) n[u] = i[u];
                typeof define == "function" && define.amd && define("js/libs/xss", function () {
                    return t.exports
                }), typeof window != "undefined" && (window.filterXSS = t.exports)
            }, {
                "./default": 1,
                "./parser": 3,
                "./xss": 5
            }
        ],
        3: [
            function (e, t, n) {
                function i(e) {
                    var t = e.indexOf(" ");
                    if (t === -1) var n = e.slice(1, -1);
                    else var n = e.slice(1, t + 1);
                    return n = r.trim(n).toLowerCase(), n.slice(0, 1) === "/" && (n = n.slice(1)), n.slice(-1) === "/" && (n = n.slice(0, -1)), n
                }

                function s(e) {
                    return e.slice(0, 2) === "</"
                }

                function o(e, t, n) {
                    "user strict";
                    var r = "",
                        o = 0,
                        u = !1,
                        a = !1,
                        f = 0,
                        l = e.length,
                        c = "",
                        h = "";
                    for (f = 0; f < l; f++) {
                        var p = e.charAt(f);
                        if (u === !1) {
                            if (p === "<") {
                                u = f;
                                continue
                            }
                        } else if (a === !1) {
                            if (p === "<") {
                                r += n(e.slice(o, f)), u = f, o = f;
                                continue
                            }
                            if (p === ">") {
                                r += n(e.slice(o, u)), c = e.slice(u, f + 1), h = i(c), r += t(u, r.length, h, c, s(c)), o = f + 1, u = !1;
                                continue
                            }
                            if ((p === '"' || p === "'") && e.charAt(f - 1) === "=") {
                                a = p;
                                continue
                            }
                        } else if (p === a) {
                            a = !1;
                            continue
                        }
                    }
                    return o < e.length && (r += n(e.substr(o))), r
                }

                function a(e, t) {
                    "user strict";

                    function a(e, n) {
                        e = r.trim(e), e = e.replace(u, "").toLowerCase();
                        if (e.length < 1) return;
                        var s = t(e, n || "");
                        s && i.push(s)
                    }
                    var n = 0,
                        i = [],
                        s = !1,
                        o = e.length;
                    for (var c = 0; c < o; c++) {
                        var p = e.charAt(c),
                            d, v;
                        if (s === !1 && p === "=") {
                            s = e.slice(n, c), n = c + 1;
                            continue
                        }
                        if (s !== !1 && c === n && (p === '"' || p === "'") && e.charAt(c - 1) === "=") {
                            v = e.indexOf(p, c + 1);
                            if (v === -1) break;
                            d = r.trim(e.slice(n + 1, v)), a(s, d), s = !1, c = v, n = c + 1;
                            continue
                        }
                        if (p === " ") {
                            if (s === !1) {
                                v = f(e, c);
                                if (v === -1) {
                                    d = r.trim(e.slice(n, c)), a(d), s = !1, n = c + 1;
                                    continue
                                }
                                c = v - 1;
                                continue
                            }
                            v = l(e, c - 1);
                            if (v === -1) {
                                d = r.trim(e.slice(n, c)), d = h(d), a(s, d), s = !1, n = c + 1;
                                continue
                            }
                            continue
                        }
                    }
                    return n < e.length && (s === !1 ? a(e.slice(n)) : a(s, h(r.trim(e.slice(n))))), r.trim(i.join(" "))
                }

                function f(e, t) {
                    for (; t < e.length; t++) {
                        var n = e[t];
                        if (n === " ") continue;
                        return n === "=" ? t : -1
                    }
                }

                function l(e, t) {
                    for (; t > 0; t--) {
                        var n = e[t];
                        if (n === " ") continue;
                        return n === "=" ? t : -1
                    }
                }

                function c(e) {
                    return e[0] === '"' && e[e.length - 1] === '"' || e[0] === "'" && e[e.length - 1] === "'" ? !0 : !1
                }

                function h(e) {
                    return c(e) ? e.substr(1, e.length - 2) : e
                }
                var r = e("./util"),
                    u = /[^a-zA-Z0-9_:\.\-]/img;
                n.parseTag = o, n.parseAttr = a
            }, {
                "./util": 4
            }
        ],
        4: [
            function (e, t, n) {
                t.exports = {
                    indexOf: function (e, t) {
                        var n, r;
                        if (Array.prototype.indexOf) return e.indexOf(t);
                        for (n = 0, r = e.length; n < r; n++)
                            if (e[n] === t) return n;
                        return -1
                    }, forEach: function (e, t, n) {
                        var r, i;
                        if (Array.prototype.forEach) return e.forEach(t, n);
                        for (r = 0, i = e.length; r < i; r++) t.call(n, e[r], r, e)
                    }, trim: function (e) {
                        return String.prototype.trim ? e.trim() : e.replace(/(^\s*)|(\s*$)/g, "")
                    }
                }
            }, {}
        ],
        5: [
            function (e, t, n) {
                function f(e) {
                    return e === undefined || e === null
                }

                function l(e) {
                    var t = e.indexOf(" ");
                    if (t === -1) return {
                        html: "",
                        closing: e[e.length - 2] === "/"
                    };
                    e = a.trim(e.slice(t + 1, -1));
                    var n = e[e.length - 1] === "/";
                    return n && (e = a.trim(e.slice(0, -1))), {
                        html: e,
                        closing: n
                    }
                }

                function c(e) {
                    e = e || {}, e.stripIgnoreTag && (e.onIgnoreTag && console.error('Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time'), e.onIgnoreTag = i.onIgnoreTagStripAll), e.whiteList = e.whiteList || i.whiteList, e.onTag = e.onTag || i.onTag, e.onTagAttr = e.onTagAttr || i.onTagAttr, e.onIgnoreTag = e.onIgnoreTag || i.onIgnoreTag, e.onIgnoreTagAttr = e.onIgnoreTagAttr || i.onIgnoreTagAttr, e.safeAttrValue = e.safeAttrValue || i.safeAttrValue, e.escapeHtml = e.escapeHtml || i.escapeHtml, e.css = e.css || {}, this.options = e, this.cssFilter = new r(e.css)
                }
                var r = e("cssfilter").FilterCSS,
                    i = e("./default"),
                    s = e("./parser"),
                    o = s.parseTag,
                    u = s.parseAttr,
                    a = e("./util");
                c.prototype.process = function (e) {
                    e = e || "", e = e.toString();
                    if (!e) return "";
                    var t = this,
                        n = t.options,
                        r = n.whiteList,
                        s = n.onTag,
                        c = n.onIgnoreTag,
                        h = n.onTagAttr,
                        p = n.onIgnoreTagAttr,
                        d = n.safeAttrValue,
                        v = n.escapeHtml,
                        m = t.cssFilter;
                    n.stripBlankChar && (e = i.stripBlankChar(e)), n.allowCommentTag || (e = i.stripCommentTag(e));
                    var g = !1;
                    if (n.stripIgnoreTagBody) {
                        var g = i.StripTagBody(n.stripIgnoreTagBody, c);
                        c = g.onIgnoreTag
                    }
                    var y = o(e, function (e, t, n, i, o) {
                        var g = {
                                sourcePosition: e,
                                position: t,
                                isClosing: o,
                                isWhite: n in r
                            },
                            y = s(n, i, g);
                        if (!f(y)) return y;
                        if (g.isWhite) {
                            if (g.isClosing) return "</" + n + ">";
                            var b = l(i),
                                w = r[n],
                                E = u(b.html, function (e, t) {
                                    var r = a.indexOf(w, e) !== -1,
                                        i = h(n, e, t, r);
                                    if (!f(i)) return i;
                                    if (r) return t = d(n, e, t, m), t ? e + '="' + t + '"' : e;
                                    var i = p(n, e, t, r);
                                    if (!f(i)) return i;
                                    return
                                }),
                                i = "<" + n;
                            return E && (i += " " + E), b.closing && (i += " /"), i += ">", i
                        }
                        var y = c(n, i, g);
                        return f(y) ? v(i) : y
                    }, v);
                    return g && (y = g.remove(y)), y
                }, t.exports = c
            }, {
                "./default": 1,
                "./parser": 3,
                "./util": 4,
                cssfilter: 8
            }
        ],
        6: [
            function (e, t, n) {
                function o(e) {
                    return e === undefined || e === null
                }

                function u(e) {
                    e = e || {}, e.whiteList = e.whiteList || r.whiteList, e.onAttr = e.onAttr || r.onAttr, e.onIgnoreAttr = e.onIgnoreAttr || r.onIgnoreAttr, this.options = e
                }
                var r = e("./default"),
                    i = e("./parser"),
                    s = e("./util");
                u.prototype.process = function (e) {
                    e = e || "", e = e.toString();
                    if (!e) return "";
                    var t = this,
                        n = t.options,
                        r = n.whiteList,
                        s = n.onAttr,
                        u = n.onIgnoreAttr,
                        a = i(e, function (e, t, n, i, a) {
                            var f = r[n],
                                l = !1;
                            f === !0 ? l = f : typeof f == "function" ? l = f(i) : f instanceof RegExp && (l = f.test(i)), l !== !0 && (l = !1);
                            var c = {
                                position: t,
                                sourcePosition: e,
                                source: a,
                                isWhite: l
                            };
                            if (l) {
                                var h = s(n, i, c);
                                return o(h) ? n + ":" + i : h
                            }
                            var h = u(n, i, c);
                            if (!o(h)) return h
                        });
                    return a
                }, t.exports = u
            }, {
                "./default": 7,
                "./parser": 9,
                "./util": 10
            }
        ],
        7: [
            function (e, t, n) {
                function r() {
                    var e = {};
                    return e["align-content"] = !1, e["align-items"] = !1, e["align-self"] = !1, e["alignment-adjust"] = !1, e["alignment-baseline"] = !1, e.all = !1, e["anchor-point"] = !1, e.animation = !1, e["animation-delay"] = !1, e["animation-direction"] = !1, e["animation-duration"] = !1, e["animation-fill-mode"] = !1, e["animation-iteration-count"] = !1, e["animation-name"] = !1, e["animation-play-state"] = !1, e["animation-timing-function"] = !1, e.azimuth = !1, e["backface-visibility"] = !1, e.background = !0, e["background-attachment"] = !0, e["background-clip"] = !0, e["background-color"] = !0, e["background-image"] = !0, e["background-origin"] = !0, e["background-position"] = !0, e["background-repeat"] = !0, e["background-size"] = !0, e["baseline-shift"] = !1, e.binding = !1, e.bleed = !1, e["bookmark-label"] = !1, e["bookmark-level"] = !1, e["bookmark-state"] = !1, e.border = !0, e["border-bottom"] = !0, e["border-bottom-color"] = !0, e["border-bottom-left-radius"] = !0, e["border-bottom-right-radius"] = !0, e["border-bottom-style"] = !0, e["border-bottom-width"] = !0, e["border-collapse"] = !0, e["border-color"] = !0, e["border-image"] = !0, e["border-image-outset"] = !0, e["border-image-repeat"] = !0, e["border-image-slice"] = !0, e["border-image-source"] = !0, e["border-image-width"] = !0, e["border-left"] = !0, e["border-left-color"] = !0, e["border-left-style"] = !0, e["border-left-width"] = !0, e["border-radius"] = !0, e["border-right"] = !0, e["border-right-color"] = !0, e["border-right-style"] = !0, e["border-right-width"] = !0, e["border-spacing"] = !0, e["border-style"] = !0, e["border-top"] = !0, e["border-top-color"] = !0, e["border-top-left-radius"] = !0, e["border-top-right-radius"] = !0, e["border-top-style"] = !0, e["border-top-width"] = !0, e["border-width"] = !0, e.bottom = !1, e["box-decoration-break"] = !0, e["box-shadow"] = !0, e["box-sizing"] = !0, e["box-snap"] = !0, e["box-suppress"] = !0, e["break-after"] = !0, e["break-before"] = !0, e["break-inside"] = !0, e["caption-side"] = !1, e.chains = !1, e.clear = !0, e.clip = !1, e["clip-path"] = !1, e["clip-rule"] = !1, e.color = !0, e["color-interpolation-filters"] = !0, e["column-count"] = !1, e["column-fill"] = !1, e["column-gap"] = !1, e["column-rule"] = !1, e["column-rule-color"] = !1, e["column-rule-style"] = !1, e["column-rule-width"] = !1, e["column-span"] = !1, e["column-width"] = !1, e.columns = !1, e.contain = !1, e.content = !1, e["counter-increment"] = !1, e["counter-reset"] = !1, e["counter-set"] = !1, e.crop = !1, e.cue = !1, e["cue-after"] = !1, e["cue-before"] = !1, e.cursor = !1, e.direction = !1, e.display = !0, e["display-inside"] = !0, e["display-list"] = !0, e["display-outside"] = !0, e["dominant-baseline"] = !1, e.elevation = !1, e["empty-cells"] = !1, e.filter = !1, e.flex = !1, e["flex-basis"] = !1, e["flex-direction"] = !1, e["flex-flow"] = !1, e["flex-grow"] = !1, e["flex-shrink"] = !1, e["flex-wrap"] = !1, e["float"] = !1, e["float-offset"] = !1, e["flood-color"] = !1, e["flood-opacity"] = !1, e["flow-from"] = !1, e["flow-into"] = !1, e.font = !0, e["font-family"] = !0, e["font-feature-settings"] = !0, e["font-kerning"] = !0, e["font-language-override"] = !0, e["font-size"] = !0, e["font-size-adjust"] = !0, e["font-stretch"] = !0, e["font-style"] = !0, e["font-synthesis"] = !0, e["font-variant"] = !0, e["font-variant-alternates"] = !0, e["font-variant-caps"] = !0, e["font-variant-east-asian"] = !0, e["font-variant-ligatures"] = !0, e["font-variant-numeric"] = !0, e["font-variant-position"] = !0, e["font-weight"] = !0, e.grid = !1, e["grid-area"] = !1, e["grid-auto-columns"] = !1, e["grid-auto-flow"] = !1, e["grid-auto-rows"] = !1, e["grid-column"] = !1, e["grid-column-end"] = !1, e["grid-column-start"] = !1, e["grid-row"] = !1, e["grid-row-end"] = !1, e["grid-row-start"] = !1, e["grid-template"] = !1, e["grid-template-areas"] = !1, e["grid-template-columns"] = !1, e["grid-template-rows"] = !1, e["hanging-punctuation"] = !1, e.height = !0, e.hyphens = !1, e.icon = !1, e["image-orientation"] = !1, e["image-resolution"] = !1, e["ime-mode"] = !1, e["initial-letters"] = !1, e["inline-box-align"] = !1, e["justify-content"] = !1, e["justify-items"] = !1, e["justify-self"] = !1, e.left = !1, e["letter-spacing"] = !0, e["lighting-color"] = !0, e["line-box-contain"] = !1, e["line-break"] = !1, e["line-grid"] = !1, e["line-height"] = !1, e["line-snap"] = !1, e["line-stacking"] = !1, e["line-stacking-ruby"] = !1, e["line-stacking-shift"] = !1, e["line-stacking-strategy"] = !1, e["list-style"] = !0, e["list-style-image"] = !0, e["list-style-position"] = !0, e["list-style-type"] = !0, e.margin = !0, e["margin-bottom"] = !0, e["margin-left"] = !0, e["margin-right"] = !0, e["margin-top"] = !0, e["marker-offset"] = !1, e["marker-side"] = !1, e.marks = !1, e.mask = !1, e["mask-box"] = !1, e["mask-box-outset"] = !1, e["mask-box-repeat"] = !1, e["mask-box-slice"] = !1, e["mask-box-source"] = !1, e["mask-box-width"] = !1, e["mask-clip"] = !1, e["mask-image"] = !1, e["mask-origin"] = !1, e["mask-position"] = !1, e["mask-repeat"] = !1, e["mask-size"] = !1, e["mask-source-type"] = !1, e["mask-type"] = !1, e["max-height"] = !0, e["max-lines"] = !1, e["max-width"] = !0, e["min-height"] = !0, e["min-width"] = !0, e["move-to"] = !1, e["nav-down"] = !1, e["nav-index"] = !1, e["nav-left"] = !1, e["nav-right"] = !1, e["nav-up"] = !1, e["object-fit"] = !1, e["object-position"] = !1, e.opacity = !1, e.order = !1, e.orphans = !1, e.outline = !1, e["outline-color"] = !1, e["outline-offset"] = !1, e["outline-style"] = !1, e["outline-width"] = !1, e.overflow = !1, e["overflow-wrap"] = !1, e["overflow-x"] = !1, e["overflow-y"] = !1, e.padding = !0, e["padding-bottom"] = !0, e["padding-left"] = !0, e["padding-right"] = !0, e["padding-top"] = !0, e.page = !1, e["page-break-after"] = !1, e["page-break-before"] = !1, e["page-break-inside"] = !1, e["page-policy"] = !1, e.pause = !1, e["pause-after"] = !1, e["pause-before"] = !1, e.perspective = !1, e["perspective-origin"] = !1, e.pitch = !1, e["pitch-range"] = !1, e["play-during"] = !1, e.position = !1, e["presentation-level"] = !1, e.quotes = !1, e["region-fragment"] = !1, e.resize = !1, e.rest = !1, e["rest-after"] = !1, e["rest-before"] = !1, e.richness = !1, e.right = !1, e.rotation = !1, e["rotation-point"] = !1, e["ruby-align"] = !1, e["ruby-merge"] = !1, e["ruby-position"] = !1, e["shape-image-threshold"] = !1, e["shape-outside"] = !1, e["shape-margin"] = !1, e.size = !1, e.speak = !1, e["speak-as"] = !1, e["speak-header"] = !1, e["speak-numeral"] = !1, e["speak-punctuation"] = !1, e["speech-rate"] = !1, e.stress = !1, e["string-set"] = !1, e["tab-size"] = !1, e["table-layout"] = !1, e["text-align"] = !0, e["text-align-last"] = !0, e["text-combine-upright"] = !0, e["text-decoration"] = !0, e["text-decoration-color"] = !0, e["text-decoration-line"] = !0, e["text-decoration-skip"] = !0, e["text-decoration-style"] = !0, e["text-emphasis"] = !0, e["text-emphasis-color"] = !0, e["text-emphasis-position"] = !0, e["text-emphasis-style"] = !0, e["text-height"] = !0, e["text-indent"] = !0, e["text-justify"] = !0, e["text-orientation"] = !0, e["text-overflow"] = !0, e["text-shadow"] = !0, e["text-space-collapse"] = !0, e["text-transform"] = !0, e["text-underline-position"] = !0, e["text-wrap"] = !0, e.top = !1, e.transform = !1, e["transform-origin"] = !1, e["transform-style"] = !1, e.transition = !1, e["transition-delay"] = !1, e["transition-duration"] = !1, e["transition-property"] = !1, e["transition-timing-function"] = !1, e["unicode-bidi"] = !1, e["vertical-align"] = !1, e.visibility = !1, e["voice-balance"] = !1, e["voice-duration"] = !1, e["voice-family"] = !1, e["voice-pitch"] = !1, e["voice-range"] = !1, e["voice-rate"] = !1, e["voice-stress"] = !1, e["voice-volume"] = !1, e.volume = !1, e["white-space"] = !1, e.widows = !1, e.width = !0, e["will-change"] = !1, e["word-break"] = !0, e["word-spacing"] = !0, e["word-wrap"] = !0, e["wrap-flow"] = !1, e["wrap-through"] = !1, e["writing-mode"] = !1, e["z-index"] = !1, e
                }

                function i(e, t, n) {}

                function s(e, t, n) {}
                n.whiteList = r(), n.getDefaultWhiteList = r, n.onAttr = i, n.onIgnoreAttr = s
            }, {}
        ],
        8: [
            function (e, t, n) {
                function s(e, t) {
                    var n = new i(t);
                    return n.process(e)
                }
                var r = e("./default"),
                    i = e("./css");
                n = t.exports = s, n.FilterCSS = i;
                for (var o in r) n[o] = r[o];
                typeof define == "function" && define.amd && define("js/libs/xss", function () {
                    return t.exports
                }), typeof window != "undefined" && (window.filterCSS = t.exports)
            }, {
                "./css": 6,
                "./default": 7
            }
        ],
        9: [
            function (e, t, n) {
                function i(e, t) {
                    function a() {
                        if (!i) {
                            var n = r.trim(e.slice(s, o)),
                                a = n.indexOf(":");
                            if (a !== -1) {
                                var f = r.trim(n.slice(0, a)),
                                    l = r.trim(n.slice(a + 1));
                                if (f) {
                                    var c = t(s, u.length, f, l, n);
                                    c && (u += c + "; ")
                                }
                            }
                        }
                        s = o + 1
                    }
                    e = r.trimRight(e), e[e.length - 1] !== ";" && (e += ";");
                    var n = e.length,
                        i = !1,
                        s = 0,
                        o = 0,
                        u = "";
                    for (; o < n; o++) {
                        var f = e[o];
                        if (f === "/" && e[o + 1] === "*") {
                            var l = e.indexOf("*/", o + 2);
                            if (l === -1) break;
                            o = l + 1, s = o + 1, i = !1
                        } else f === "(" ? i = !0 : f === ")" ? i = !1 : f === ";" ? i || a() : f === "\n" && a()
                    }
                    return r.trim(u)
                }
                var r = e("./util");
                t.exports = i
            }, {
                "./util": 10
            }
        ],
        10: [
            function (e, t, n) {
                t.exports = {
                    indexOf: function (e, t) {
                        var n, r;
                        if (Array.prototype.indexOf) return e.indexOf(t);
                        for (n = 0, r = e.length; n < r; n++)
                            if (e[n] === t) return n;
                        return -1
                    }, forEach: function (e, t, n) {
                        var r, i;
                        if (Array.prototype.forEach) return e.forEach(t, n);
                        for (r = 0, i = e.length; r < i; r++) t.call(n, e[r], r, e)
                    }, trim: function (e) {
                        return String.prototype.trim ? e.trim() : e.replace(/(^\s*)|(\s*$)/g, "")
                    }, trimRight: function (e) {
                        return String.prototype.trimRight ? e.trimRight() : e.replace(/(\s*$)/g, "")
                    }
                }
            }, {}
        ]
    }, {}, [2]), "use strict",
    function () {
        (function (e, t) {
            if (typeof exports == "object") module.exports = t(require("module/components/plugin-behavior/main"), require("js/libs/xss"));
            else if (typeof define == "function" && define.amd) define("module/components/plugin-text/main", ["module/components/plugin-behavior/main", "js/libs/xss"], t);
            else {
                var n = "PluginText",
                    r = n.split("."),
                    i = e;
                for (var s = 0; s < r.length - 1; s++) i[r[s]] === undefined && (i[r[s]] = {}), i = i[r[s]];
                i[r[r.length - 1]] = t(e.PluginBehaviors, e._13)
            }
        })(this, function (e, t) {
            function n(n) {
                return {
                    "module/components/plugin-behavior/main": e,
                    "js/libs/xss": t
                }[n]
            }
            var r = undefined;
            return NovaExports.__fixedUglify = "script>", NovaExports.exports = {
                stylesheet: ":host{white-space:normal!important}:host .text-wrap{width:100%;height:100%;display:table;white-space:pre-wrap;word-break:break-all;text-decoration:inherit}:host .text-inner{display:table-cell;vertical-align:middle;width:100%;height:100%;text-decoration:inherit}",
                template: '\n        <div class="text-wrap">\n            <div class="text-inner"></div>\n        </div>\n    '
            }, window.PluginText = NovaExports({
                is: "plugin-text",
                behaviors: e,
                props: {
                    text: {
                        type: String,
                        value: ""
                    },
                    styles: {
                        type: Object
                    }
                },
                attachedHander: function () {}, createdHandler: function () {
                    this.myxss = this.getXssFilter(), this.querySelector(".text-inner").innerHTML = this.myxss.process(this.text)
                }, getXssFilter: function (t) {
                    var n = t ? t.split(",") : [],
                        r = {},
                        i = [];
                    for (var s in filterXSS.whiteList) filterXSS.whiteList.hasOwnProperty(s) && (i = filterXSS.whiteList[s] || [], i = i.concat(["id", "title", "class", "style", "alt"]), r[s] = i);
                    var o = {
                        whiteList: r
                    };
                    n.length > 0 && (o.onIgnoreTag = function (e, t, r) {
                        if (n.indexOf(e) > -1) return t
                    });
                    var u = new filterXSS.FilterXSS(o);
                    return u
                }
            }), r
        })
    }.call(window), "use strict",
    function () {
        (function (e, t) {
            if (typeof exports == "object") module.exports = t(require("module/components/plugin-behavior/main"), require("module/components/bmt-loader/webp_checker"));
            else if (typeof define == "function" && define.amd) define("module/components/plugin-image/main", ["module/components/plugin-behavior/main", "module/components/bmt-loader/webp_checker"], t);
            else {
                var n = "PluginImage",
                    r = n.split("."),
                    i = e;
                for (var s = 0; s < r.length - 1; s++) i[r[s]] === undefined && (i[r[s]] = {}), i = i[r[s]];
                i[r[r.length - 1]] = t(e.PluginBehaviors, e.WebpChecker)
            }
        })(this, function (e, t) {
            function n(n) {
                return {
                    "module/components/plugin-behavior/main": e,
                    "module/components/bmt-loader/webp_checker": t
                }[n]
            }
            var r = undefined;
            return NovaExports.__fixedUglify = "script>", NovaExports.exports = {
                stylesheet: "img{width:100%;height:100%}",
                template: '\n        <img draggable="false" src_="{{_src}}">\n    '
            }, window.PluginImage = NovaExports({
                is: "plugin-image",
                behaviors: e,
                stickRatio: !0,
                props: {
                    _src: String,
                    src: String,
                    maskType: {
                        type: String,
                        value: "none"
                    },
                    maskImage: String,
                    styles: {
                        type: Object,
                        observer: "stylesChangedHandler"
                    }
                },
                createdHandler: function () {
                    var n = this,
                        r = n.maskImage || n.src || "";
                    t.hasWebp() && (r = r.replace(/\.(jpg|png|jpeg)$/, ".webp")), n._src = r
                }, attachedHandler: function () {
                    var t = $(this).find("img");
                    t && t.css("borderRadius", this.styles.borderRadius)
                }, stylesChangedHandler: function (t, n, r, i) {
                    var s = $(this).find("img");
                    s && s.css("borderRadius", this.styles.borderRadius)
                }
            }), r
        })
    }.call(window),
    function () {
        require(["module/components/plugin-behavior/main", "module/components/page-transition/main", "module/components/bmt-page/main", "module/components/bmt-app/main", "module/components/bmt-app/interface", "module/components/plugin-weixin/main", "module/components/plugin-text/main", "module/components/plugin-image/main"])
    }();