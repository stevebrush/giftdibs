'use strict';

var async,
    merge,
    mongoose;

async = require('async');
merge = require('merge');
mongoose = require('mongoose');

function DatabaseObject(options) {
    var defaults,
        self;

    self = this;
    defaults = {

        /**
         * populate: {}
         * Can be one of String (eg. 'name group') or,
         * of type Array:
         * [{
             path: '_log',
             select: 'author dateCreated description'
         * }]
         */
        populate: ''
    };
    self.settings = merge.recursive(true, defaults, options || {});
    self.model = self.settings.model;

    function getPopulations(doPopulate) {
        var populations;
        switch (doPopulate) {
            case 'false':
            case false:
                populations = '';
            break;
            default:
                populations = self.settings.populate;
            break;
        }
        return populations;
    }

    self.getMany = function (conditions, doPopulate) {
        return self.model
            .find(conditions || {})
            .populate(getPopulations(doPopulate))
            .exec();
    };

    self.getOne = function (conditions, doPopulate) {
        return self.model
            .findOne(conditions || {})
            .populate(getPopulations(doPopulate))
            .exec();
    };
}

DatabaseObject.prototype = {
    create: function (data) {
        let self = this;

        function afterCreate(doc, data) {
            if (typeof self.settings.onAfterCreate === 'function') {
                return self.settings.onAfterCreate.call(self, doc, data);
            }
            return doc;
        }

        function beforeCreate(data) {
            if (typeof self.settings.onBeforeCreate === 'function') {
                return self.settings.onBeforeCreate.call(self, data)
                    .then(function (data) {
                        return create(data);
                    });
            }
            return create(data);
        }

        function create(data) {
            let newDocument = new self.model(data);
            return newDocument.save(self.request)
                .then(function (doc) {
                    return afterCreate(doc, data);
                });
        }

        return beforeCreate(data);
    },
    deleteAll: function () {
        let self = this;
        return self.model
            .remove({})
            .exec()
            .then(new Promise(function (resolve, reject) {
                self.model.collection.dropAllIndexes(function (error) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve();
                });
            }));
    },
    deleteById: function (id) {
        return this.model
            .findOne({
                _id: id
            })
            .then(function (model) {
                return model.remove();
            });
    },
    getAll: function (doPopulate) {
        let self = this;
        return self
            .getMany({}, doPopulate)
            .then(function (data) {
                if (typeof self.settings.onAfterGetAll === 'function') {
                    return self.settings.onAfterGetAll.call(self, data);
                }
                return data;
            });
    },
    getById: function (id, doPopulate) {
        let self = this;
        return this
            .getOne({
                _id: id
            }, doPopulate)
            .then(function (data) {
                if (typeof self.settings.onAfterGetById === 'function') {
                    return self.settings.onAfterGetById.call(self, data);
                }
                return data;
            });
    },
    getByIds: function (ids, doPopulate) {
        return this.getMany({
            '_id': { $in: ids }
        }, doPopulate);
    },
    getBySlug: function (slug, doPopulate) {
        let self = this;
        return this
            .getOne({
                slug: slug
            }, doPopulate)
            .then(function (data) {
                if (typeof self.settings.onAfterGetBySlug === 'function') {
                    return self.settings.onAfterGetBySlug.call(self, data);
                }
                return data;
            });
    },
    updateById: function (id, data) {
        let self = this;

        function afterUpdate(doc) {
            if (typeof self.settings.onAfterUpdate === 'function') {
                return self.settings.onAfterUpdate.call(self, doc, data);
            }
            return doc;
        }

        function update() {
            return self.getById(id, false).then(function (doc) {
                var k;
                for (k in data) {
                    if (data.hasOwnProperty(k)) {
                        doc[k] = data[k];
                    }
                }
                return doc.save(self.request).then(function (doc) {
                    return afterUpdate(doc);
                });
            });
        }

        if (typeof self.settings.onBeforeUpdate === 'function') {
            return self.settings.onBeforeUpdate.call(self, data).then(update);
        }

        return update();
    }
};

module.exports = DatabaseObject;
