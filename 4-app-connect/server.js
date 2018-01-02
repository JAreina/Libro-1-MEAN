const connect = require('connect');
const app = connect();


/* middlewares*/

function hola(req,res,next){
	res.setHeader('Content-type','text/plain')
	res.write("HOLA");
	res.end();
}

app.use(hola);




app.listen(3001);

console.log("servidor puerto 3001")