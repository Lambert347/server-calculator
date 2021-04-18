//sets up express and makes sure that the server uses it
const express = require('express');
const app = express();
//sets the port as localhost:5000
const port = 5000;
//includes bodyParser to ensure that data is moved from the client to the server correctly
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
//ensures that the server uses the files present in both the server and public files 
app.use(express.static('server/public'));
//declares a global solution variable and the global numbers array for data from the client to be stored in.
let solution = 0;
let numbers = [];

//function to delete data in the array
app.delete('/numbers', (req, res) => {
    console.log('Clearing number history')
    //"deletes" the data by just resetting the numbers array to an empty array. Clearing eveything from it.
    numbers = [];
})

//function to send the numbers array to client on request
app.get('/numbers', (req, res) => {
    res.send(numbers);
    console.log('Sending number history', numbers);
})
//function to push numObject received from the client into the numbers array, and calculate solution.
app.post('/numbers', (req, res) => {
    //declares a newNumber variable and sets it equal to the data package received from the client
    let newNumber = req.body;
    console.log('got a new number package', newNumber);
    //sends a status back the the object was created
    res.sendStatus(201);
    //"reads" the operator sent as part of the numObject from the client
    //conduct the mathematical operation corresponding with the operator sent over
    //updates the value of solution to that result from the operation
    //then adds a new property to the newNumber object with that value of solution BEFORE pushing the object to the array
    if (newNumber.operation === "+"){
        solution = Number(newNumber.number1) + Number(newNumber.number2);
        newNumber.solution = solution;
    }
    else if (newNumber.operation === "-"){
        solution = Number(newNumber.number1) - Number(newNumber.number2);
        newNumber.solution = solution;
    }
    else if (newNumber.operation === "*"){
        solution = Number(newNumber.number1) * Number(newNumber.number2);
        newNumber.solution = solution;
    }
    else if (newNumber.operation === "/"){
        solution = Number(newNumber.number1) / Number(newNumber.number2);
        newNumber.solution = solution;
    }
    //pushes the newNumber object, now with the solution property to the array of numbers. 
    numbers.push(newNumber);
})

//function to get the server to listen on the port specified above, in this case 5000.
app.listen(port, () => {
    console.log(`Listening on port ${port}....`);
})