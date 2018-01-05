

process.env.NODE_ENV = (process.env.NODE_ENV  || 'development');

const configureExpress = require('./config/express');

//inicializar config de mongose
const configureMongoose = require('./config/mongoose');
// requerir PASSPORT
const configurePassport= require('./config/passport');

//configuración de mongoose cargado antes de otras
const db = configureMongoose()

const app = configureExpress();

const passport = configurePassport();

app.listen(3001);

module.exports = app;

console.log('Server running at http://localhost:3001/');
