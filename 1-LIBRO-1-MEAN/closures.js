"use strict";



function parent() {
const message = 'Hello World';
function child() {
   console.log(message);
}
child()
}
parent()


/**/

function parent2() {
const message = 'Hello World2';
function child2() {
    console.log(message);
}
return child2;
}
const childFN = parent2();
childFN();