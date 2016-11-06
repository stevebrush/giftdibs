const mongoose = require('mongoose');
const collection = 'Role';
const schema = new mongoose.Schema({
    _permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission',
        unique: true
    }],
    isDefault: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        uppercase: true,
        unique: true,
        required: true
    }
}, {
    collection: collection
});

module.exports = mongoose.model(collection, schema);
