const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// 모든 경로, 파싱
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/submit', (req, res) => {
    const { name, year } = req.body;
    res.send(`Name: ${name}, Year: ${year}`);
})

app.listen(3000, () => {
    console.log('3000에서 서버 실행');
});