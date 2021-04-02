const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const uuid = require('uuid');
const getDateTime = require('./util/fecha-hora.js')
const create = require("./perdurarMensajes");
const productos = require('./routes/productos');
const mensajes = require('./routes/mensajes');
const upProductos = require("./createTableMysql")
const upMensajes = require('./createTableSqlite3');
const dbmysql = require("./dbmysql");

const server = app.listen(process.env.PORT || 8080);
const io = require("socket.io")(server);

// Crea Tablas si no existen
upProductos();
upMensajes();

global.administrador = true;
let users = [];
let connnections = [];

//Carga en arrayProductos para enviar lista producto por socket
global.arrayProductos = [];


//Middlewares
app.use(bodyParser.json());
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static('./public'));
app.use("/mensajes", mensajes);
app.use("/productos", productos);
app.use('/', router);

//listen conección socket 
io.on('connection', (socket) => {
    console.log('New user connected');
    connnections.push(socket)
    socket.username = 'Anonymous';

    //broadcast productos 
    setInterval(function () {
       
        updateArrayProductos = dbmysql('productos').select('*')
    .then(function (resultado) {
        arrayProductos = resultado;
    });
        socket.broadcast.emit('arrayProductos', arrayProductos);
    }, 3000);

    //listen  change_username
    socket.on('change_username', data => {
        let id = uuid.v4();
        socket.id = id;
        socket.username = data.nickName;
        users.push({ id, username: socket.username, color: socket.color });
        updateUsernames();
    })

    //update Usernames en cliente
    const updateUsernames = () => {
        io.sockets.emit('get users', users);
    }

    //listen nuevo mensaje
    socket.on('new_message', (data) => {

        //broadcast nuevo mensaje
        const messageEmit = { message: data.message, username: socket.username, date: getDateTime() }
        const obj = { message: data.message, username: socket.username }
        console.log(messageEmit);
        create(obj);
        io.sockets.emit('new_message', messageEmit);
    })

    //listen tipeo en chat
    socket.on('typing', data => {
        socket.broadcast.emit('typing', { username: socket.username });
    })

    //Desconeccion de usuario
    socket.on('disconnect', data => {
        if (!socket.username)
            return;
        //encontrar usuario y borrarlo de la lista de conectados
        let user = undefined;
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === socket.id) {
                user = users[i];
                break;
            }
        }
        users = users.filter(x => x !== user);

        //actualiza lista usuarios conectados
        updateUsernames();
        connnections.splice(connnections.indexOf(socket), 1);
    })
})