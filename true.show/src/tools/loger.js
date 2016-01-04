;
define(function(require) {
    'use strict';
    var logs = {
        log: function() {
            var i = 0,
                l = arguments.length;
            if (l == 2) {
                if (console && console.log) console.log(arguments[0], arguments[1]);
            } else {
                for (; i < l; i++) {
                    if (console && console.log) console.log(arguments[i]);
                }
            }
        }
    };
    return logs;
});
