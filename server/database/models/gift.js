const mongoose = require('mongoose');
const collection = 'Gift';
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
}, {
    collection: collection
});

module.exports = mongoose.model(collection, schema);
