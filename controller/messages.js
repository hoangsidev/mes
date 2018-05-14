const models = require('../model/Messages.js');
const bodyParser = require('body-parser');
module.exports = function (app, io) {
    /* socket */
    var users = ['Welcome'];
    io.on('connection', (socket) => {
        socket.emit('my_socket', socket.id);

        users.push(socket.id);
        io.sockets.emit('server_users', users);

        

        socket.on('user_room_name', (socket_id_remote) => {
            // Nối socket.id vào thành room name
            var room_name = socket.id + socket_id_remote; // tên room

            socket.join(room_name); // người bấm join            
            var socket_remote = io.sockets.connected[socket_id_remote];
            socket_remote.join(room_name);

            socket.room_chat = room_name;
            // console.log(room_name);
            
        });
   
        socket.on('user_send_mes', (message) => {
            io.sockets.in(socket.room_chat).emit('server_send_mes', message, socket.room_chat);
        });

        socket.on('disconnect', () => {
            users.splice(users.indexOf(socket.id), 1);
            io.sockets.emit('server_users', users, );
        });

    });
    /* end socket */

    /* routes */
    app.get('/', (req, res) => {
        res.render('index.ejs')
    });
    app.get('/tabs', (req, res) => {
        res.render('tabs.ejs')
    });
    /* end routes */
}