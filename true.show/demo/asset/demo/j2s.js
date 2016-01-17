/**
 * [j2s nodejs tools for transforming raw JSON string to inline style string format]
 * @param  {[string]} json [input stringified json]
 * @return {[String]}     [target string]
 */

module.exports = {
    toS: function(raw) {
        var json = JSON.parse(raw);
        var result = '';
        for (var key in json) {
            var val = json[key];
            result += key + ':' + val + ';';
        }
        return result;
    },
    toJ: function(raw) {
        var json = {};
        var toCamelCase = function(str) {
            return str.replace(/-([a-z])/g, function(m, w) {
                return w.toUpperCase();
            });
        };

        try {
            var group = raw.split(';');
            for (var i = 0, css; css = group[i++];) {
                var ary = css.split(':'),
                    k = ary[0],
                    v = ary[1];
                k = toCamelCase(k);
                json[k] = v;
            }
            return json;
        } catch (ex) {
            console.error('Parse error', ex);
        }
    }
}
