const express = require('express');

const app = express();
const port = 5000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));
let solution = 0;
const numbers = [];

app.get('/numbers', (req, res) => {
    res.send(numbers);
    console.log('Sending number history', numbers);
})

app.post('/numbers', (req, res) => {
    let newNumber = req.body;
    console.log('got a new number package', newNumber);
    
    res.sendStatus(201);
    if (newNumber.operation === "add"){
        solution = Number(newNumber.number1) + Number(newNumber.number2);
        newNumber.solution = solution;
    }
    else if (newNumber.operation === "subtract"){
        solution = Number(newNumber.number1) - Number(newNumber.number2);
        newNumber.solution = solution;
    }
    else if (newNumber.operation === "multiply"){
        solution = Number(newNumber.number1) * Number(newNumber.number2);
        newNumber.solution = solution;
    }
    else if (newNumber.operation === "divide"){
        solution = Number(newNumber.number1) / Number(newNumber.number2);
        newNumber.solution = solution;
    }
    numbers.push(newNumber);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}....`);
})