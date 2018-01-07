//schema configureMongoose
const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;



const UserSchema = new Schema({
  nombre: String,
  apellido: String,
  email: {
    type: String,
      match: [ /.+\@.+\..+/,"Por favor introduce un email válido"]
  },
  nombreUsuario: {
    type: String,
    trim: true
  },
  password: {
    type:String,
  //  required: true,
    index: true,
    validate:[
      function(password){
        return password.length>=6;
      },'PASSWORD DEBE SER MAYOR DE 6 CARACTERES'
    ]
  },
  salt: {
      type: String
},
provider: {
        type: String,
        required: 'Provider is required'
},
providerId: String,
providerData: {}
,
  created:{
    type: Date,
    default: Date.now
  },
  website: {
          type: String,
          set: function(url) {
                  if (!url) {
                  return url;
                  } else {
                    if (url.indexOf('http://') !== 0 &&
                    url.indexOf('https://') !== 0) {
                    url = 'http://' + url;
                    }
                    return url;
                  }
          }
},
website: {
          type: String,
          get: function(url) {
                if (!url) {
                return url;
                } else {
                    if (url.indexOf('http://') !== 0 &&
                    url.indexOf('https://') !== 0) {
                    url = 'http://' + url;
                    }
                    return url;
                }
            }
},
role: {
  type: String,
  enum: ['Admin','Owner','User']
}
})


// salt propiedad: se usa para hash el PASSWORD
// provider propiedad : indica la estrategia usada
// providerId : idenfiticador de usuario para la estrategia de autenticación
// providerData :  almacenar el objeto del user con OAuth providers




// atributos virtuales

UserSchema.virtual('fullName').get(function(){
return this.nombre + ' ' + this.apellido;
}).set(function(fullName){
  const splitName = fullName.split(' ');
  this.nombre = splitName[0] || ' ';
  this.apellido = splitName[1] || ' ';
})
//metodos estaticos personalizados
UserSchema.statics.findUnoPorNombre = function(nombre,callback){
  this.findOne({nombre: new RegExp(nombre,'i')},callback);
}

//metodos de instancia personalizados
/*
UserSchema.methods.autentica = function(password){
  return this.password = password;
}*/

//validar datos en el modelo: validadores predefinidos y personalizados por ejemplo : required, match: expresionReg, rol  ----------enum['Admin',"User"]

//************************

// middlewares pre y post
/*
UserSchema.pre('save', function(next){
if (...) {
next()
} else {
next(new Error('An Error Occurred'));
}
});
-------------------------------------
UserSchema.post('save', function(next){
console.log('The user "' + this.username + '"
details were saved.');
});

*/


// pre-save middleware// encriptar contraseña
UserSchema.pre('save', function(next) {
        if (this.password) {
            this.salt = new
            Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
            this.password = this.hashPassword(this.password);
        }
next();
});

// hashPassword reemplaza la clave por la creada auto generada aleatoria
UserSchema.methods.hashPassword = function(password) {
                    return crypto.pbkdf2Sync(password, this.salt, 10000,
                    64).toString('base64');
};


UserSchema.methods.authenticate = function(password) {
      return this.password === this.hashPassword(password);
};



// metodo estatico
//que se utiliza para encontrar un único disponible
//nombre de usuario para nuevos usuarios.

UserSchema.statics.findUniqueUsername = function(username, suffix,
callback) {
      var possibleUsername = username + (suffix || '');
            this.findOne({username: possibleUsername}, (err, user) => {
                      if (!err) {
                        if (!user) {
                            callback(possibleUsername);
                        } else {
                           return this.findUniqueUsername(username,
                                                             (suffix ||   0)+1, callback);
                        }
                      } else {
                          callback(null);
                      }
                  });
};




UserSchema.set('toJSON',{getter: true, virtuals: true})
mongoose.model('Usuario',UserSchema);
