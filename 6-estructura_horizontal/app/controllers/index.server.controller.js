

//controlador del index

exports.render = function(req,res){
  //res.status(200).send('xxxx');


// session
  if(req.session.lastVisit){
    console.log(req.session.lastVisit);
  }

  req.session.lastVisit = new Date();

  // renderizar vista
  res.render('index',{
    title: 'fluctuat nec mergitur',
    userFullName: req.user ? req.user.fullName: ''
  })
}
