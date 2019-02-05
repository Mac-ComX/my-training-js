let mongoose = require('mongoose')
let bcrypt = require('bcryptjs')

//User Schema
let UserSchema = mongoose.Schema({
    filename: {type: String},
    originalname: {type: String},
    mimetype: {type: String},
    path: {type: String},
    size: { type: Number},
    user: {type:String, require: true},
    username:{type:String, index:true},
    password:{type:String, index:true},
    email:{type:String},
    Token: String,
    active: Boolean,
    name:{type:String},
    created_at: {type: Date, default: Date.now()}
})

let User = module.exports = mongoose.model('User', UserSchema)

module.exports.createUser = function (newUser, callBack) {
    bcrypt.genSalt (10, function (err , salt) {   
        bcrypt.hash (newUser.password, salt, function (err, hash) {   
            newUser.password = hash
            newUser.save(callBack)
        })
    })
}

module.exports.getUserByUsername = function (username, callBack) {
    var query = {username: username}
    User.findOne(query, callBack)
}

module.exports.getUserById = function (id, callBack) {
    User.findById(id, callBack)
}

module.exports.comparePassword = function (candidatePassword, hash, callBack) {
bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
    if (err) throw err
    callBack(null, isMatch)
})
}