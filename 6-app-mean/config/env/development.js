
//configurar modulos de terceros
module.exports = {
  // opciones de configuración en desarrollo
sessionSecret: "8dfdfdjerekre0dgfgfhh234sfADFDFGherdffd",
db: 'mongodb://localhost:27017/mean',
facebook: {
              clientID: 'AQUI TU ID CLIENTE DADO POR FACEBOOK',
              clientSecret: 'AQUI TU CLIENT SECRET DADO POR FACEBOOK',
              callbackURL: 'http://localhost:3001/oauth/facebook/callback'
}

}
