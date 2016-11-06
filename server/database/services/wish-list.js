'use strict';

const DatabaseObject = require('../../libs/database-object');
const utils = require('../../libs/utils');

function Service(options) {
    DatabaseObject.call(this, options);
}

utils.mixin(Service, DatabaseObject);

Service.prototype.getAllByUserId = function (id) {
    return this.model.find({
        '_user': id
    }).exec();
};

module.exports = new Service({
    model: require('../models/wish-list')
});
