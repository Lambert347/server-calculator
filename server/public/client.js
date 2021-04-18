
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
    //also prevents the page refresh from occuring.
    $('#addition').on('click', function(event){
        numObject.operation = "+";
        event.preventDefault();
        console.log(numObject);
        
    })
    //similar to above but with subtraction.
    $('#subtraction').on('click', function(event){
        numObject.operation = "-";
        event.preventDefault();
        console.log(numObject);
    })
    //similar to above but with multiplication.
    $('#multiplication').on('click', function(event){
        numObject.operation = "*";
        event.preventDefault();
        console.log(numObject);
    })
    //similar to above but with division.
    $('#division').on('click', function(event){
        numObject.operation = "/";
        event.preventDefault();
        console.log(numObject);
    })
    //function that runs when the submit button (the = button) is clicked
    $('#submit').on('click', function(event){
        //if the operation in the numObject is left as null (meaning that the user did not click any of the operator buttons)
        //then the user is alerted, and an error code of 1 is returned.
        //The page is prevented from refreshing so that the user does not need to re-enter their inputs
        if (numObject.operation === null){
            alert('Please choose an operation')
            event.preventDefault();
            return 1;
        }
        //if either of the number inputs are left empty, then the user is alerted and an error code of 2 is returned
        //also does not refresh the page, so that the user does not need to click an operator or enter a number again
        if ($('#number1').val() === '' || $('#number2').val() === ''){
            alert('Please Check number inputs and try again')
            event.preventDefault();
            return 2;
        }
        numberOperation();
        clearInputs();
    })
    //when the clear button ("C" button) is clicked, runs the clearInputs function
    //while keeping the page from refreshing.
    $('#clear').on('click', function(event){
        event.preventDefault();
        clearInputs();
    })
    //When the delete all history button is clicked, runs the delete numbers function
    $('#delete').on('click', function(event){
        deleteNumbers();
    })
    getNumbers();
}

//function to send the numObject to the server
function numberOperation() {
    //adds two properties to the numObject with the values of the two number inputs
    numObject.number1 = $('#number1').val();
    numObject.number2 = $('#number2').val();
    //sends the numObject package with the properties of number1, number2, and the operator to the server
    $.ajax({
        method: 'POST',
        url: '/numbers',
        data: numObject,
    })
        //runs the getNumbers function after
        .then (function (response){
            getNumbers();
        })
        //error for when the number fails to be sent
        .catch(function(error){
            console.log('Error from server', error)
            alert('Could not add to number history, try again later')
        })
}

//function to append the numbers in the number history to the dom
function getNumbers(){
    //gets the numbers array from the server
    $.ajax({
        method: 'GET',
        url: '/numbers',
    })
        //first empties the location on the dom
        .then (function(response){
            console.log('Response from the server', response);
            $('#numberHistory').empty();
            console.log('Adding numbers to the DOM');
            //for each object in the numbers array on the server, appends number1, number2, the operator, and the solutuion from the server
            //appended as a list item in the format of a mathematical equation (example: 1 + 2 = 3)
            for (let number of response){
                $('#numberHistory').append(`
                    <div class="numbers">
                    <li>${number.number1} ${number.operation} ${number.number2} 
                    = ${number.solution}</li>
                    </div>
                `);
            }

        })
        //function for the event in which there is an error with getting the numbers array from the server
        .catch(function(error){
            console.log('error from server', error);
            alert('Sorry, could not get number history. Try again later');
        })
    console.log('After making server request');
    //runs the get solution function when the submit button is clicked as well
    getSolution();
}

//function to clear the inputs when the clear button is clicked
function clearInputs(){
    $('#number1').val('');
    $('#number2').val('');
}
//function to receive the solution to the operation from the server
function getSolution(){
    //receives the numbers array again
    $.ajax({
        method: 'GET',
        url: '/numbers',
    })
        //this function is only to display the most recent solution to the math problem.
        .then (function(response){
            console.log('Response from the server', response);
            //empties the recentSum element in the index file
            $('#recentSum').empty();
            console.log('Adding just recent sum to DOM');
            //appends in the number.solution property of the most recent problem
            //empties the element every time to achieve that result. 
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
//function to delete the entire number history
function deleteNumbers(){
    //sets up the delete function
    $.ajax({
        method: 'DELETE',
        url: '/numbers',
    })
        //prints to the console log that the data is being cleared
        .then(function(response){
            console.log('Clearing Data');
            
        })
        //error in the event that the server is unable to clear the data 
        .catch(function(error){
            console.log('Error from the server', error)
            alert('Could not clear history, try again later');
        })
}