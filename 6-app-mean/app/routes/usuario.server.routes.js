// ruta a Usuario
const usuarios = require('../controllers/usuario.server.controller');
const passport = require('passport');


module.exports= function(app){
  app.route('/usuarios')
        .post(usuarios.create)
        .get(usuarios.list);

  app.route('/usuarios/:userId')
        .get(usuarios.read)
        .put(usuarios.update)
        .delete(usuarios.delete)

  app.param('userId', usuarios.userByID);

  /* AUTENTICACIÓN*/
  app.route('/signup')
        .get(usuarios.renderSignup)
        .post(usuarios.signup);

  app.route('/signin')
        .get(usuarios.renderSignin)
        .post(passport.authenticate('local', {
                          successRedirect: '/', // DONDE REDIRECCIONAR SI SE AUTENTICA
                          failureRedirect: '/signin', // DONDE SI FALLA AUTENTICACIÓN
                          failureFlash: true // DICE A PASSPOR SI USA O NO FLASH MENSAJES
        }));
app.get('/signout', usuarios.signout);
}
