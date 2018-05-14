const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/messages');
var db = mongoose.connection; db.once('open', function callback() { console.log('Connected to mongo server.'); });