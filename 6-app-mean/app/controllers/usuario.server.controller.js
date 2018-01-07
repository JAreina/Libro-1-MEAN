//controllador Usuario

const Usuario = require('mongoose').model('Usuario');
const passport = require('passport');

// crear usuario
exports.create = function(req,res,next){
  const user = new Usuario(req.body);

  user.save((err)=>{
    if(err) {
      return console.log(err);
  }else{
    res.status(200).json(user);
  }
});
};
// buscar usuarios
exports.list = function(req,res,next){
  Usuario.find({},'nombre email',(err,usuarios)=>{
    if(err){
       next(err);
    }else{
      res.status(200).json(usuarios)
    }
  })
}
// encontrar uno
exports.read = function(req, res) {
             res.json(req.user);
};
exports.userByID = function(req, res, next, id) {
       Usuario.findOne({_id: id}, (err, usuario) => {
                    if (err) {
                    return next(err);
                    } else {
                    req.user = usuario;
                    next();
                    }
});
};
/// actualizar uno
exports.update = function(req, res, next) {
        Usuario.findByIdAndUpdate(req.user.id, req.body,
          {'new': true  }, (err, user) => {
                    if (err) {
                    return next(err);
                    } else {
                    res.status(200).json(user);
                    }
});
};
// borrar
exports.delete = function(req, res, next) {
              req.user.remove(err => {
                if (err) {
                return next(err);
                } else {
                res.status(200).json(req.user);
                }
})
};



/* AUTENTICACIÓN */
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
        const user = new Usuario(req.body);
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
/* aUTH AUTENTENICACION DE USUARIO*/
exports.saveOAuthUserProfile = function(req, profile, done) {
	// Try finding a user document that was registered using the current OAuth provider
	Usuario.findOne({
		provider: profile.provider,
		providerId: profile.providerId
	}, (err, user) => {
		// If an error occurs continue to the next middleware
		if (err) {
			return done(err);
		} else {
			// If a user could not be found, create a new user, otherwise, continue to the next middleware
			if (!user) {
				// Set a possible base username
				const possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');

				// Find a unique available username
				Usuario.findUniqueUsername(possibleUsername, null, (availableUsername) => {
					// Set the available user name
					profile.username = availableUsername;

					// Create the user
					user = new Usuario(profile);

					// Try saving the new user document
					user.save(function(err) {
						// Continue to the next middleware
						return done(err, user);
					});
				});
			} else {
				// Continue to the next middleware
				return done(err, user);
			}
		}
	});
};
