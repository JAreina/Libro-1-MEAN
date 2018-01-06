// configuracion de mongoose
const config = require('./env/development');
const mongoose = require('mongoose');


module.exports = function(){
  const db= mongoose.connect(config.db);


// incluir Schemas
require('../app/models/user.server.model');


return db;
}
