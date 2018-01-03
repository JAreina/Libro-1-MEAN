const connect = require('connect');
const app = connect();


/* middlewares*/
function logger ( req,res,next){
	console.log(req.method,req.url);
	next();
}



function hola(req,res,next){
	res.setHeader('Content-type','text/plain')
	res.write("HOLA");
	res.end();
}

function adios(req,res,next){
	res.setHeader('Content-type','text/plain');
	res.write("ADIOS");
	res.end();
}




app.use(logger);
//app.use(hola);

//rutas
app.use('/',logger)
app.use('/hola',hola);
app.use('/adios',adios);



app.listen(3001);

console.log("servidor puerto 3001")