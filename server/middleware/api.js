const CrudRouter = require('../libs/crud-router');
const UserService = require('../database/services/user');
const utils = require('../libs/utils');

const permissionRouter = new CrudRouter({
    resourceName: 'permissions',
    service: require('../database/services/permission'),
    authorization: {
        post: {
            permission: 'CREATE_PERMISSION'
        },
        delete: {
            permission: 'DELETE_PERMISSION'
        },
        put: {
            permission: 'UPDATE_PERMISSION'
        }
    }
});

const roleRouter = new CrudRouter({
    resourceName: 'roles',
    service: require('../database/services/role'),
    authorization: {
        post: {
            permission: 'CREATE_ROLE'
        },
        delete: {
            permission: 'DELETE_ROLE'
        },
        put: {
            permission: 'UPDATE_ROLE'
        }
    }
});

const userRouter = new CrudRouter({
    resourceName: 'users',
    service: UserService,
    authorization: {
        post: {
            permission: 'CREATE_USER'
        },
        delete: {
            permission: 'DELETE_USER'
        },
        put: {
            permission: 'UPDATE_USER'
        }
    }
});

const wishListRouter = new CrudRouter({
    resourceName: 'wish-lists',
    service: require('../database/services/wish-list'),
    authorization: {
        post: {
            permission: 'CREATE_WISH_LIST'
        },
        delete: {
            permission: 'DELETE_WISH_LIST'
        },
        put: {
            permission: 'UPDATE_WISH_LIST'
        }
    }
});

module.exports = function (router) {
    permissionRouter.attach(router);
    roleRouter.attach(router);
    userRouter.attach(router);
    wishListRouter.attach(router);

    router.route('/api/users/role/:name')
        .get(function (req, res, next) {
            UserService
                .getAllByRole(req.params.name)
                .then(function (data) {
                    utils.parseSuccess(res, data);
                })
                .catch(next);
        });

    router.route('/api/users/reset-password-request')
        .post(function (req, res, next) {
            UserService
                .createResetPasswordToken(req.body.emailAddress)
                .then(function (user) {
                    utils.parseSuccess(res, {
                        url: req.headers.referrer + '#/reset-password/' + user.resetPasswordToken
                    });
                })
                .catch(next);
        });

    router.route('/api/users/reset-password/:token')
        .post(function (req, res, next) {
            UserService
                .getByResetPasswordToken(req.params.token)
                .then(function (user) {
                    delete user.resetPasswordToken;
                    user.setPassword(req.body.password, function (error) {
                        if (error) {
                            next(error);
                            return;
                        }
                        user
                            .save()
                            .then(function () {
                                utils.parseSuccess(res);
                            })
                            .catch(next);
                    });
                })
                .catch(next);
        });
};
