'use strict';

const DatabaseObject = require('../../libs/database-object');
const utils = require('../../libs/utils');

function Service(options) {
    DatabaseObject.call(this, options);
}

utils.mixin(Service, DatabaseObject);

Service.prototype.getAllByUserId = function (id, doPopulate) {
    return this.getMany({
        '_user': id
    }, doPopulate);
};

module.exports = new Service({
    model: require('../models/wish-list'),
    populate: [
        {
            path: '_user',
            select: '_id, emailAddress'
        }
    ]
});
