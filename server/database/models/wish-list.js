const mongoose = require('mongoose');
const collection = 'WishList';
const schema = new mongoose.Schema({
    _gifts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gift'
    }],
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    }
}, {
    collection: collection
});

module.exports = mongoose.model(collection, schema);
