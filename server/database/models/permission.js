const mongoose = require('mongoose');
const collection = 'Permission';
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        uppercase: true,
        unique: true
    }
}, {
    collection: collection
});

module.exports = mongoose.model(collection, schema);
