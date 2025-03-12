// const http = require('http');

// // callback 함수
// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type' : 'text/plain'});

//     // 클라이언트에게 응답 내용 전송
//     res.end('Hello, Node.js!');
// })

// // 서버가 3000번 포트에서 요청을 기다리도록 설정
// const PORT = 3000;
// server.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// })

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});