const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('mongoose').model('Usuario');


module.exports = function() {

  //registrar la estrategia local , instancia de LocalStrategy
passport.use(new LocalStrategy((username, password, done) => {
Usuario.findOne({  nombreUsuario: username}
, (err, user) => {
            if (err) {
            return done(err);
            }
            if (!user) {
                  return done(null, false, {
                      message: 'Unknown user'
                    });
            }
            if (!user.authenticate(password)) {
                        return done(null, false, {
                        message: 'Invalid password'
                        });
            }
            return done(null, user);
});
}));
};
