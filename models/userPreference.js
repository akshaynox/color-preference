const { Schema, model } = require('mongoose');

const UserPreferenceSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    colorPreference: {
        type: String,
        required: false
    }
});

const UserPreference = model('UserPreference', UserPreferenceSchema);

module.exports = UserPreference;