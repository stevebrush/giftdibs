'use strict';

const DatabaseObject = require('../../libs/database-object');
const utils = require('../../libs/utils');
const randomstring = require('randomstring');
const sha1 = require('sha1');

function Service(options) {
    DatabaseObject.call(this, options);
}

utils.mixin(Service, DatabaseObject);

Service.prototype.create = function (data) {
    if (!data.password) {
        data.password = this.getRandomPassword();
    }
    return this.register(data.emailAddress, data.password, data._role);
};

Service.prototype.createResetPasswordToken = function (emailAddress) {
    var self;

    self = this;

    return self.getByEmailAddress(emailAddress)
        .then(function (user) {
            if (!user) {
                return Promise.reject(new Error("That email address wasn't found in our records."));
            }
            user.resetPasswordToken = sha1(emailAddress + ':' + Date.now());

            return user.save();
        });
};

Service.prototype.getAll = function () {
    return this.model.find({}).populate('_role').exec();
};

Service.prototype.getAllByRole = function (roleName) {
    roleName = roleName.toLowerCase();
    return this.getAll().then(function (users) {
        var byRole;
        byRole = users.filter(function (user) {
            return (user._role.name.toLowerCase() === roleName);
        });
        return Promise.resolve(byRole);
    });
};

Service.prototype.getByEmailAddress = function (emailAddress) {
    return this.model.findOne({
        'emailAddress': emailAddress
    }).exec().then(function (user) {
        if (!user) {
            return Promise.reject(new Error("User not found with email address, " + emailAddress));
        }
        return Promise.resolve(user);
    });
};

Service.prototype.getByResetPasswordToken = function (token) {
    if (!token) {
        return Promise.reject(new Error("Please provide a reset token with request!"));
    }
    return this.model.findOne({
        'resetPasswordToken': token
    }).exec().then(function (user) {
        if (!user) {
            return Promise.reject(new Error("User not found with that token!"));
        }
        return Promise.resolve(user);
    });
};

Service.prototype.getRandomPassword = function () {
    return randomstring.generate(4) + ' ' + randomstring.generate(4) + ' ' + randomstring.generate(4);
};

Service.prototype.register = function (emailAddress, password, roleId) {
    var RoleService,
        self;

    self = this;
    RoleService = require(__dirname + '/role');

    function createUserWithRole(roleId) {
        return new Promise(function (resolve, reject) {
            self.model.register(new self.model({
                emailAddress: emailAddress,
                _role: roleId
            }), password, function (err, user) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(user);
            });
        });
    }

    if (!emailAddress) {
        return Promise.reject(new Error("Please provide a valid email address."));
    }

    if (!password) {
        return Promise.reject(new Error("Please provide a valid password."));
    }

    if (roleId) {
        return createUserWithRole(roleId);
    } else {
        return RoleService.getDefault().then(function (role) {
            return createUserWithRole(role._id);
        });
    }
};

module.exports = new Service({
    model: require('../models/user'),
    populate: '_role'
});
