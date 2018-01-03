"use strict";

const express = require('express');
const app = express();

app.use('/',(req,res)=>{
	res.status(200).send('JAreina');
});

app.listen(3001);
console.log("SERVIDOR EN PUERTO 3001");


module.exports= app;

