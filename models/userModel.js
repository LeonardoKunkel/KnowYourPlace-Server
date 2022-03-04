const { model, Schema } = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true,
        default: ''
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: Boolean,
        default: false
    },
    field: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    reservations: {
        type: Array
    }
});

module.exports = model('User', userSchema);
