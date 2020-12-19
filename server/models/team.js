const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const League = require("../models/league");

let teamSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre del club es necesario'],
    },
    img: {
        type: String,
        required: false,
    },
    league: {
        type: [{type: Schema.Types.ObjectId, ref: 'League'}]
    },
    state: {
        type: Boolean,
        default: true
    },
});

module.exports = mongoose.model('team', teamSchema);