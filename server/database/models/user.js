const mongoose = require('mongoose');
const mongoosePassport = require('passport-local-mongoose');
const collection = 'User';
const schema = new mongoose.Schema({
    _role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    resetPasswordToken: String
}, {
    collection: collection
});

schema.plugin(mongoosePassport, {
    usernameField: 'emailAddress',
    usernameQueryFields: ['emailAddress']
});

module.exports = mongoose.model(collection, schema);
