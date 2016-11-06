'use strict';

const DatabaseObject = require('../../libs/database-object');
const utils = require('../../libs/utils');

function Service(options) {
    DatabaseObject.call(this, options);
}

utils.mixin(Service, DatabaseObject);

module.exports = new Service({
    model: require('../models/permission')
});
