const express = require('express')
const path = require('path');
const mysql = require('mysql2');

const app = express();

app.set('view engine', 'ejs');

// __dirname 현재 디렉토리의 절대 경로 (C: 까지 나옴)
// path.join() : 경로 지정자( \ or / )를 운영체제와 맞추어 줌
app.set('views', path.join(__dirname, 'views'));

const travelList = ['뉴욕', '파리', '서울', '도쿄'];

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mirim1',
    database: 'traveldb'
})

db.connect((err) => {
    if(err) {
        console.log("MYSQL 연결 실패: ", err);
        return;
    }
    console.log('MYSQL 연결 성공');
})

app.get('/', (req, res) => {

})

app.get('/travel', (req, res) => {
    res.render('travel', {travelList});
})

app.use((req, res) => {

})

app.listen(3000, () => {
    console.log("서버가 3000에서 실행중");
})