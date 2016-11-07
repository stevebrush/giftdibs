var utils;

utils = require(__dirname + '/utils');

function CrudRouter(options) {
    var defaults,
        k,
        merge,
        self,
        service;

    self = this;
    defaults = {
        authorization: {
            delete: {
                permission: null,
                message: "You do not have permission to delete that resource."
            },
            get: {
                permission: null,
                message: "You do not have permission to read that resource."
            },
            getAll: {
                permission: null,
                message: "You do not have permission to read those resources."
            },
            post: {
                permission: null,
                message: "You do not have permission to create that resource."
            },
            put: {
                permission: null,
                message: "You do not have permission to update that resource."
            }
        },
        resourceName: null,
        service: null
    };

    merge = require('merge');

    self.settings = merge.recursive({}, defaults, options);
    service = self.settings.service;

    self.routes = {
        delete: [function (req, res, next) {
            return service.deleteById(req.params.id).then(function (data) {
                utils.parseSuccess(res, data);
            }).catch(next);
        }],
        get: [function (req, res, next) {
            return service.getById(req.params.id, req.query.doPopulate).then(function (data) {
                utils.parseSuccess(res, data);
            }).catch(next);
        }],
        getAll: [function (req, res, next) {
            if (req.query.ids) {
                return service.getByIds(req.query.ids, req.query.doPopulate).then(function (data) {
                    utils.parseSuccess(res, data);
                }).catch(next);
            }
            return service.getAll(req.query.doPopulate).then(function (data) {
                utils.parseSuccess(res, data);
            }).catch(next);
        }],
        post: [function (req, res, next) {
            return service.create(req.body).then(function (data) {
                utils.parseSuccess(res, data);
            }).catch(next);
        }],
        put: [function (req, res, next) {
            return service.updateById(req.params.id, req.body).then(function (data) {
                utils.parseSuccess(res, data);
            }).catch(next);
        }]
    };

    self.delete = function (callbacks) {
        self.routes.delete = callbacks;
    };

    self.get = function (callbacks) {
        self.routes.get = callbacks;
    };

    self.getAll = function (callbacks) {
        self.routes.getAll = callbacks;
    };

    self.post = function (callbacks) {
        self.routes.post = callbacks;
    };

    self.put = function (callbacks) {
        self.routes.put = callbacks;
    };

    self.attach = function (router) {
        var addRequestObjectToService,
            checkPermissionMiddleware;

        // Add permission checks to the middleware arrays, if applicable.
        checkPermissionMiddleware = function (req, res, next) {
            next(req.isAuthorized(self.settings.authorization[k].permission));
        };

        // Add the request object to the service so we can access it, if needed.
        addRequestObjectToService = function (req, res, next) {
            service.request = req;
            next();
        };

        for (k in self.routes) {
            if (self.routes.hasOwnProperty(k)) {
                if (self.settings.authorization[k] && self.settings.authorization[k].permission) {
                    self.routes[k].unshift(checkPermissionMiddleware);
                }
                //self.routes[k].unshift(addRequestObjectToService);
            }
        }

        router.route('/api/' + self.settings.resourceName)
            .get(self.routes.getAll)
            .post(self.routes.post);
        router.route('/api/' + self.settings.resourceName + '/:id')
            .delete(self.routes.delete)
            .get(self.routes.get)
            .put(self.routes.put);
    };
}

module.exports = CrudRouter;
