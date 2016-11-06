
/**
 * Returns a duplicate of an object.
 */
function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Class prototype mixin
 */
function mixin(destination, source) {
    var k;
    for (k in source.prototype) {
        if (destination.prototype.hasOwnProperty(k) === false) {
            destination.prototype[k] = source.prototype[k];
        }
    }
}


/**
 * Formats the response to send a success.
 */
function parseSuccess(response, data) {
    response.status(200);
    if (data.length) {
        return response.json({
            count: data.length || 0,
            value: data
        });
    }
    return response.json(data);
}

module.exports = {
    clone: clone,
    mixin: mixin,
    parseSuccess: parseSuccess
};
