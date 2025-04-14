const express = require('express')
const path = require('path');
const methodOverride = require('method-override');
const travelRoutes = require('./routes/travel');

const app = express();

// BODY를 파싱할 수 있도록
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));     // PUT을 사용하기 위해

// 라우팅
app.use('/travel', travelRoutes);

app.set('view engine', 'ejs');

// __dirname 현재 디렉토리의 절대 경로 (C: 까지 나옴)
// path.join() : 경로 지정자( \ or / )를 운영체제와 맞추어 줌
app.set('views', path.join(__dirname, 'views'));

// use(전체 메소드에 대해) + 모든 경로
// 위의 엔드포인트에 해당하지 않으면 유효하지 않은 페이지로 간주
app.use((req, res) => {
    res.status(404).send('404 NOT FOUND');
})

app.get('/', (req, res) => {

})

app.listen(3000, () => {
    console.log("서버가 3000에서 실행중");
})