/**
 * [j2s nodejs tools for transforming raw JSON string to inline style string format]
 * @param  {[string]} json [input stringified json]
 * @return {[String]}     [target string]
 */

module.exports.j2s = function(raw) {
    var json = JSON.parse(raw);
    var result = '';
    for (var key in json) {
        var val = json[key];
        result += key + ':' + val + ';';
    }
    return result;
};
