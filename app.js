const express = require('express'); 
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
app.use(express.static('./assets'));

require("./controller/messages.js")(app, io);
server.listen(3000, () => { console.log('App start with port 3000!'); });