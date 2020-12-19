const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let leagueSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Debe indicar un nombre de la liga'],
    },
    country: {
        type: String,
        required: [true, 'Se debe indicar un nombre de país para la liga'],
    },
    code: {
        type: String,
        required: [true, 'Se necesita un código de liga'],
    },
    state: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model('league', leagueSchema);