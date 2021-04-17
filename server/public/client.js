
console.log('JAVAJAVAJAVA');

let numObject = {
        operation: null
    }

$(document).ready(readyOn);

function readyOn() {
    console.log('JQ');

    $('#addition').on('click', function(event){
        numObject.operation = "add";
        event.preventDefault();
        console.log(numObject);
        return numObject;
    })
    $('#subtraction').on('click', function(event){
        numObject.operation = "subtract";
        event.preventDefault();
        console.log(numObject);
        return numObject;
    })
    $('#multiplication').on('click', function(event){
        numObject.operation = "multiply";
        event.preventDefault();
        console.log(numObject);
        return numObject;
    })
    $('#division').on('click', function(event){
        numObject.operation = "divide";
        event.preventDefault();
        console.log(numObject);
        return numObject;
    })


}