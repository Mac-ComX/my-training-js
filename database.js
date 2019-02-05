const mongoose = require('mongoose');

mongoose.connect('mongodb://MacComX:Mac1209@ds247430.mlab.com:47430/uplimg', {
    useNewUrlParser: true
})
    .then(db => console.log('La base de donnée est connecté'))
    .catch(err => console.log(err));