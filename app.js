const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, Express! (GET) ');
});

app.get('/api/:person', (req, res) => {
    const person = req.params.person;
    res.status(200).send(person);
});

app.get('/api', (req, res) => {
    res.status(200).send('Get API');
});

app.post('/api', (req, res) => {
    res.status(200).send('Post API');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});