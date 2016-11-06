'use strict';

const DatabaseObject = require('../../libs/database-object');
const utils = require('../../libs/utils');

function Service(options) {
    DatabaseObject.call(this, options);
}

utils.mixin(Service, DatabaseObject);

Service.prototype.getByName = function (name) {
    return this.model
        .findOne({
            'name': name
        })
        .exec()
        .then(function (doc) {
            if (!doc) {
                return Promise.reject("Role not found named '" + name + "'!");
            }
            return Promise.resolve(doc);
        })
        .catch(function (error) {
            return Promise.reject(error);
        });
};

Service.prototype.getDefault = function () {
    return this.model
        .findOne({
            'isDefault': true
        })
        .exec();
};

module.exports = new Service({
    model: require('../models/role')
});
