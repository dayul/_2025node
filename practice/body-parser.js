const express = require('express');

const app = express();

// 모든 경로, 파싱
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/submit', (req, res) => {
    const { name, year } = req.body;
    res.send(`Name: ${name}, Year: ${year}`);
})

app.listen(3000, () => {
    console.log('3000에서 서버 실행');
});