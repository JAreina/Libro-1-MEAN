// ruta a Usuario
const usuarios = require('../controllers/usuario.server.controller');
module.exports= function(app){
  app.route('/usuarios')
        .post(usuarios.create)
        .get(usuarios.list);

  app.route('/usuarios/:userId')
        .get(usuarios.read)

  app.param('userId', usuarios.userByID);
}
