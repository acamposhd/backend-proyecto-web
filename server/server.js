/*jshint esversion: 8*/

//////////////////// Conexiones necesarias///////////////////
require('./config/config');
require('colors'); // instalar colors

const hostname = '127.0.0.1'; // cambiar por la ipv4 de nuestra maquina para poder utilizar las apis desde otro dispositivo.
const express = require('express'); // instalar express
const cors = require('cors'); // instalar cors
const bodyParser = require('body-parser'); // instalar body-parser
const mongoose = require('mongoose'); // instalar mongoose
const app = express();

// Habilitar Cors
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(bodyParser.json());
////////////////////////////////////////////////////////////

app.use('/api', require('./routes/index'));

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then((resp) => {
    console.log('[SERVER]'.green, `Base de datos ONLINE en ${process.env.URLDB}`);
}).catch((err) => {
    console.log('[SERVER]'.red, `Conexion fallida: ${err}`);
});

app.use((req, res, next) => {
    return res.status(404).send({
        resp: '404',
        err: true,
        msg: `URL ${req.url} Not Found`,
        cont: {}
    });
});

server = app.listen(process.env.PORT, hostname, () => {
    console.log('[SERVER]'.green, `running at http://${hostname}:${process.env.PORT}`);
});