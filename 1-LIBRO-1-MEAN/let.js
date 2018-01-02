function iterateVar() {
		for(var i = 0; i < 10; i++) {
		console.log(i);
		}
		console.log("CON VAR "+i)
		}


function iterateLet() {

//let i = "hola let";

	for(let i = 0; i < 10; i++) {
			console.log("LET DENTRO DE FOR " +i);
		}

		console.log("LET FUERA DEL FOR "+i)
}


iterateVar();
iterateLet();
