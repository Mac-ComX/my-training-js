const { Schema, model } = require('mongoose')

const imageSchema = new Schema({
    user: {type: String, require:true},
    title: {type: String, require: true},
    description: {type: String, require: true},
    filename: {type: String, require: true},
    path: {type: String, require: true},
    originalname: {type: String, require: true},
    mimetype: {type: String, require: true},
    size: { type: Number, require: true},
    created_at: {type: Date, default: Date.now()}
});

module.exports = model('Image', imageSchema)