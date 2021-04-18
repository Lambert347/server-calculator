
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
    $('#submit').on('click', function(event){
        event.preventDefault();
    })
    $('#submit').on('click', numberOperation)
    $('#clear').on('click', clearInputs)
    getNumbers();
}

function numberOperation() {
    numObject.number1 = $('#number1').val();
    numObject.number2 = $('#number2').val();
    $.ajax({
        method: 'POST',
        url: '/numbers',
        data: numObject,
    })
        .then (function (response){
            getNumbers();
        })
        .catch(function(error){
            console.log('Error from server', error)
            alert('Could not add to number history, try again later')
        })
}

function getNumbers(){
    $.ajax({
        method: 'GET',
        url: '/numbers',
    })
        .then (function(response){
            console.log('Response from the server', response);
            $('#numberHistory').empty();
            console.log('Adding numbers to the DOM');
            for (let number of response){
                $('#numberHistory').append(`
                    <div class="numbers">
                        <p>First Number: ${number.number1}</p>
                        <p>Second Number: ${number.number2}</p>
                        <p>Operation: ${number.operation}</p>
                        <p>Solution: ${number.solution}</p>
                    </div>
                `);
            }

        })
        .catch(function(error){
            console.log('error from server', error);
            alert('Sorry, could not get number history. Try again later');
        })
    console.log('After making server request');
}

function clearInputs(){
    $('#number1').val('');
    $('#number2').val('');
}