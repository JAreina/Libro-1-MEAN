const passport = require('passport');
const mongoose = require('mongoose');

// configurar la estrategia local de passport

module.exports = function() {
const User = mongoose.model('Usuario');


// manejar la serialización del usuario
passport.serializeUser((user, done) => {
                    done(null, user.id);
        });

passport.deserializeUser((id, done) => {

            User.findOne({_id: id}, '-password -salt', (err, user) => {
                  done(err, user);
                  });
});

// incluir configurarción de estrategia local
require('./strategies/local.js')();
//cargar estrategia Facebook
require('./strategies/facebook.js')();
}
