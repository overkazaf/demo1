;
define(function(require) {
    var EventHandler = function() {

    };



    EventHandler.prototype = {
        getDefaultsActions: function() {
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
                    action: function(e, t, n) {
                        $(this).show(), $("bmt-page")[0].animatePlugin(this)
                    }
                },
                hide: {
                    type: "other",
                    text: "\u9690\u85cf\u5143\u7d20",
                    defaultValue: {
                        elems: []
                    },
                    action: function(e, t, n) {
                        $(this).hide()
                    }
                },
                toggle: {
                    type: "other",
                    text: "\u9690\u85cf/\u663e\u793a",
                    defaultValue: {
                        elems: []
                    },
                    action: function(e, t, n) {
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
                    action: function(e, t) {
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
                            data: function(e) {
                                return e.createPageArr(e.getPageLength())
                            }
                        }
                    },
                    action: function(e, t) {
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
                    action: function(e, t) {
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
                    action: function(e, t, n) {
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
                            data: function(e, t) {
                                var n = $("#" + t[0])[0],
                                    r = [];
                                r.push({
                                    name: "\u65e0",
                                    value: ""
                                });
                                if (n) {
                                    var i = $.extend(!0, n.getDefaultEvents(), n.getEvents());
                                    $.each(i, function(e, t) {
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
                    action: function(e, t, n) {
                        t.value.value && $(this).trigger(t.value.value)
                    }
                }
            }
        },
        getDefaultEvents: function() {
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
        },
        getActions : function () {
        	return {};
        },
        getEvents : function () {
        	return {};
        }
    };


    return EventHandler;
});
