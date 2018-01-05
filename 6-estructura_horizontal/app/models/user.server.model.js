//schema configureMongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const UserSchema = new Schema({
  nombre: String,
  apellido: String,
  email: String,
  nombreUsuario: {
    type: String,
    trim: true,
    unique:true,
    required:true
  },
  password: {
    type:String,
    index:true,
    required: true,
    match: /.+\@.+\..+/,
    validate:[
      function(password){
        return password.length>=6;
      },'PASSWORD DEBE SER MAYOR DE 6 CARACTERES'
    ]
  },
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

UserSchema.methods.autentica = function(password){
  return this.password = password;
}

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





UserSchema.set('toJSON',{getter: true, virtuals: true})
mongoose.model('Usuario',UserSchema);
