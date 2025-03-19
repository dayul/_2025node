const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, Express! (GET) ');
});

app.post('/hi', (req, res) => {
    res.send(req.body);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});