const express = require('express');

const app = express();
const port = 5000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));
let sum = 0;
const numbers = [];

app.get('/numbers', (req, res) => {
    res.send(numbers);
    console.log('Sending number history', numbers);
})

app.post('/numbers', (req, res) => {
    let newNumber = req.body;
    console.log('got a new number package', newNumber);
    numbers.push(newNumber);
    res.sendStatus(201);

    
})

app.listen(port, () => {
    console.log(`Listening on port ${port}....`);
})