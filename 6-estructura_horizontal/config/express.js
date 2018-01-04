

// configuración de express

const express = require('express');
const morgan = require('morgan');//middleware de simple logger
const compress = require('compression')// comprimir response middleware
const bodyParser = require('body-parser'); //para manejar datos de la requests
const methodOverride = require('method-override')//provee verbos PUT Y DELETE




module.exports = function(){
  const app = express();

  // VARIABLE DE ENTORNO

  if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
  }else if (process.env.NODE_ENV === 'production'){
    app.use(compress());
  }

  app.use(bodyParser.urlencoded({ extended: true}));

  app.use(bodyParser.json());
  app.use(methodOverride());


// configurar motor de vistas

app.set('views', './app/views');
app.set('view engine','ejs');


  // requiere el archivo de esta ruta y lo llama como una función pasando como argumento
  //la aplicación
  require('../app/routes/index.server.routes')(app);

  return app;
}
