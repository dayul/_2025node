const db = require('../dbConnection');
const express = require('express')
const router = express.Router();

router.get('/add', (req, res) => {
    res.render('addTravel');
});

// READ
router.get('/', (req, res) => {
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

router.get('/:id', (req, res) => {
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
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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

router.get('/:id/edit', (req, res) => {
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
router.delete('/:id', (req, res) => {
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

module.exports = router;