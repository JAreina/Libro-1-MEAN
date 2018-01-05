//controllador Usuario

const Usuario = require('mongoose').model('Usuario');


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
