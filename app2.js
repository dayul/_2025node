const express = require('express')
const path = require('path');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const methodOverride = require('method-override');

dotenv.config();
const app = express();

// BODY를 파싱할 수 있도록
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));     // PUT을 사용하기 위해

app.set('view engine', 'ejs');

// __dirname 현재 디렉토리의 절대 경로 (C: 까지 나옴)
// path.join() : 경로 지정자( \ or / )를 운영체제와 맞추어 줌
app.set('views', path.join(__dirname, 'views'));

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
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

// READ
app.get('/travel', (req, res) => {
    const _query = 'SELECT id, name FROM travelList';
    db.query(_query, (err, results) => {
        if(err) {
            console.log("데이터베이스 쿼리 실패 : ", err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const travelList = results;
        res.render('travel', { travelList });
    });
});

app.get('/travel/:id', (req, res) => {
    const travelId = req.params.id;
    const query = 'SELECT * FROM travelList WHERE id = ?';
    db.query(query, [travelId], (err, result) => {
        if(err) {
            console.error('데이터베이스 쿼리 실패: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if(result.length === 0) {
            res.status(404).send('여행지를 찾을 수 없습니다.');
            return;
        }
        const travel = result[0];
        res.render('travelDetail', { travel });
    });
});

// CREATE
app.post('/travel', (req, res) => {
    const { name } = req.body;
    const _query = 'INSERT INTO travelList (name) VALUES (?)';
    db.query(_query, [name], (err, results) => {
        if(err) {
            console.log('데이터베이스 쿼리 실패: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.redirect('/travel');
    });
});

// UPDATE
app.put('/travel/:id', (req, res) => {
    const travelId = req.params.id;
    const { name }  = req.body;
    const _query = 'UPDATE travelList SET name=? WHERE id =?';
    db.query(_query, [name, travelId], (err, results) => {
        if(err) {
            console.error('데이터베이스 쿼리 실패');
            res.status(500).send('데이터베이스 서버 에러');
            return;
        }
        res.render('updateSuccess');
    });
});

app.get('/travel/:id/edit', (req, res) => {
    const travelId = req.params.id;
    const query = 'SELECT * FROM travelList WHERE id = ?';
    db.query(query, [travelId], (err, result) => {
        if(err) {
            console.error('데이터베이스 쿼리 실패: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if(result.length === 0) {
            res.status(404).send('여행지를 찾을 수 없습니다.');
            return;
        }
        const travel = result[0];
        res.render('editTravel', { travel });
    });
});

// DELETE
app.delete('/travel/:id', (req, res) => {
    const travelId = req.params.id;
    const _query = 'DELETE FROM travelList WHERE id = ?';
    db.query(_query, [travelId], (err, results) => {
        if(err) {
            console.log('데이터베이스 쿼리 실패', err);
            res.status(500).send('데이터베이스 서버 에러');
            return;
        }
        res.render('deleteSuccess');
    })
})

app.get('/add-travel', (req, res) => {
    res.render('addTravel');
});

// 모든 경로에 대해 처리 (나중에 404 처리예정)
app.use((req, res) => {

})

app.listen(3000, () => {
    console.log("서버가 3000에서 실행중");
})