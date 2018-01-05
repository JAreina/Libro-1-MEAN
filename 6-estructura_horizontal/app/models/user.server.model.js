//schema configureMongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const UserSchema = new Schema({
  nombre: String,
  apellido: String,
  email: String,
  nombreUsuario: {
    type: String,
    trim: true
  },
  password: String,
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


UserSchema.set('toJSON',{getter: true, virtuals: true})
mongoose.model('Usuario',UserSchema);
