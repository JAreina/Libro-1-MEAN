

process.env.NODE_ENV = (process.env.NODE_ENV  || 'development');

const configureExpress = require('./config/express');

//inicializar config de mongose
const configureMongoose = require('./config/mongoose');


//configuración de mongoose cargado antes de otras
const db = configureMongoose()

const app = configureExpress();

app.listen(3001);


console.log('Server running at http://localhost:3001/');

module.exports = app;
