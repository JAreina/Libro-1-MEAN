//schema configureMongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const UserSchema = new Schema({
  nombre: String,
  apellido: String,
  email: String,
  nombreUsuario: String,
  password: String
})
mongoose.model('Usuario',UserSchema);
