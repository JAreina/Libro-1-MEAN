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
