

//controlador del index

exports.render = function(req,res){
  //res.status(200).send('xxxx');
  res.render('index',{
    title: 'fluctuat nec mergitur'
  })
}
