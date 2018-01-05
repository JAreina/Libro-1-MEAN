//controllador Usuario

const Usuario = require('mongoose').model('Usuario');


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
  Usuario.find({},(err,usuarios)=>{
    if(err){
       next(err);
    }else{
      res.status(200).json(usuarios)
    }
  }
)
}
