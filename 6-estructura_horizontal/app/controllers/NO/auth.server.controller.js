const User = require('mongoose').model('User');
const passport = require('passport');



//metodo privado no exportado
/**
obtener el mensaje de error del objeto error de Mongoose
*/

function getErrorMessage(err) {
    let message = '';
    if (err.code) {
          switch (err.code) {
            case 11000:
            case 11001:
                    message = 'Username already exists';
                      break;
            default:
                        message = 'Something went wrong';
            }
    } else {
          for (var errName in err.errors) {
              if (err.errors[errName].message) message =
                  err.errors[errName].message;
          }
  }
  return message;
  };


// renderizar vistas signin
  exports.renderSignin = function(req, res, next) {
      if (!req.user) {
                res.render('signin', {
                    title: 'Sign-in Form',
                    messages: req.flash('error') || req.flash('info')
                });
      } else {
          return res.redirect('/');
        }
  };

// renderizar vista signup
  exports.renderSignup = function(req, res, next) {
      if (!req.user) {
          res.render('signup', {
            title: 'Sign-up Form',
            messages: req.flash('error')
          });
      } else {
          return res.redirect('/');
      }
  };


// crear un nuevo usuario
  exports.signup = function(req, res, next) {
      if (!req.user) {
        const user = new User(req.body);
        user.provider = 'local';

        user.save((err) => {
                  if (err) {
                      const message = getErrorMessage(err);
                      req.flash('error', message);
                    return res.redirect('/signup');
                }
                //login() metodo de Passport para establecer el login de sesion
              req.login(user, (err) => {
                    if (err) return next(err);
                              return res.redirect('/');
              });
        });
      } else {
            return res.redirect('/');
    }
};



exports.signout = function(req, res) {
          req.logout();
            res.redirect('/');
};
