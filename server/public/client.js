
console.log('JAVAJAVAJAVA');
//Created global object to be where the operation and the number inputs go into to be sent to the server.
//the operation is initally set to null for data-checking purposes that is explained later. 
//operation is updated depending on what button is pressed. 
let numObject = {
    operation: null
}
//ready the document for manipulation 
$(document).ready(readyOn);

//function to ready the document
function readyOn() {
    console.log('JQ');
    //when the addition button is clicked on the dom, this function replaces the null in the numObject for operation with +

    $('#addition').on('click', function(event){
        numObject.operation = "+";
        event.preventDefault();
        console.log(numObject);
        
    })
    $('#subtraction').on('click', function(event){
        numObject.operation = "-";
        event.preventDefault();
        console.log(numObject);
    })
    $('#multiplication').on('click', function(event){
        numObject.operation = "*";
        event.preventDefault();
        console.log(numObject);
    })
    $('#division').on('click', function(event){
        numObject.operation = "/";
        event.preventDefault();
        console.log(numObject);
    })
    $('#submit').on('click', function(event){
        //
        if (numObject.operation === null){
            alert('Please choose an operation')
            event.preventDefault();
            return 1;
        }
        if ($('#number1').val() === '' || $('#number2').val() === ''){
            alert('Please Check number inputs and try again')
            event.preventDefault();
            return 1;
        }
        numberOperation();
        clearInputs();
    })
    $('#clear').on('click', function(event){
        event.preventDefault();
        clearInputs();
    })
    $('#delete').on('click', function(event){
        deleteNumbers();
    })
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
                    <li>${number.number1} ${number.operation} ${number.number2} 
                    = ${number.solution}</li>
                    </div>
                `);
            }

        })
        .catch(function(error){
            console.log('error from server', error);
            alert('Sorry, could not get number history. Try again later');
        })
    console.log('After making server request');
    getSum();
}

function clearInputs(){
    $('#number1').val('');
    $('#number2').val('');
}

function getSum(){
    $.ajax({
        method: 'GET',
        url: '/numbers',
    })
        .then (function(response){
            console.log('Response from the server', response);
            $('#recentSum').empty();
            console.log('Adding just recent sum to DOM');
            for (let number of response){
                $('#recentSum').empty();
                $('#recentSum').append(`
                    <div class="sum">
                        <h2>${number.solution}</h2>
                    </div>
                `);
            }

        })
}
//Stretch goals: delete data on request
function deleteNumbers(){
    $.ajax({
        method: 'DELETE',
        url: '/numbers',
    })
        .then(function(response){
            console.log('Clearing Data');
            
        })
        .catch(function(error){
            console.log('Error from the server', error)
            alert('Could not clear history, try again later');
        })
}