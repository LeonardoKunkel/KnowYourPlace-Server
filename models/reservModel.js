const { model, Schema } = require('mongoose');

const reservSchema = Schema({
    floor: {
        type: Number,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = model('Reserv', reservSchema)
