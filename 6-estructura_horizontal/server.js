

process.env.NODE_ENV = (process.env.NODE_ENV  || 'development');

const configureExpress = require('./config/express');
const app = configureExpress();

app.listen(3001);


console.log('Server running at http://localhost:3001/');

module.exports = app;
