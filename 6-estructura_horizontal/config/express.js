

// configuración de express

const express = require('express');


module.exports = function(){
  const app = express();

  // requiere el archivo de esta ruta y lo llama como una función pasando como argumento
  //la aplicación
  require('../app/routes/index.server.routes')(app);

  return app;
}
