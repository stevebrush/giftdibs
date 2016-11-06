const PermissionService = require('../database/services/permission');
const RoleService = require('../database/services/role');
const passport = require('passport');

module.exports = function (router) {

    // Add role and permissions to the request.
    router.use(function (req, res, next) {
        req.role = null;
        req.permissions = [];

        if (!req.isAuthenticated()) {
            return next();
        }

        RoleService.getById(req.user._role).then(function (role) {
            if (!role) {
                return next();
            }

            req.role = role.name;

            PermissionService.getByIds(role._permissions).then(function (permissions) {
                req.permissions = permissions.map(function (permission) {
                    return permission.name;
                });
                next();
            }).catch(next);
        }).catch(next);
    });

    // Add a method to the request to check permissions.
    router.use(function (req, res, next) {
        req.isAuthorized = function (permission) {

            var err;
            err = new Error("Forbidden.");
            err.status = 403;

            if (!req.isAuthenticated() || !req.permissions || req.permissions.indexOf(permission) === -1) {
                return err;
            }

            return null;
        };
        next();
    });

    router.post('/session/login', function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next(info);
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next('Could not log in user!');
                }
                res.status(200).json({
                    message: 'Login successful!',
                    user: {
                        _id: user._id,
                        emailAddress: user.emailAddress
                    }
                });
            });
        })(req, res, next);
    });

    router.get('/session/logout', function (req, res) {
        req.logout();
        res.status(200).json({
            status: 'Bye!'
        });
    });

    router.get('/session/status', function (req, res) {
        if (!req.isAuthenticated()) {
            return res.status(403).json({
                status: false,
                user: null
            });
        }
        res.status(200).json({
            status: true,
            user: {
                _id: req.user._id,
                emailAddress: req.user.emailAddress,
                permissions: req.permissions,
                role: req.role
            }
        });
    });
};
