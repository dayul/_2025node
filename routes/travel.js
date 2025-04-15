const db = require("../dbConnection");
const express = require("express");
const router = express.Router();

// READ : 전체 게시글 조회
router.get("/", (req, res) => {
  const _query = "SELECT id, name FROM travelList";
  db.query(_query, (err, results) => {
    if (err) {
      console.log("데이터베이스 쿼리 실패 : ", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    const travelList = results;
    res.render("travel", { travelList });
  });
});

// 정적인 것을 먼저 올려주기
// 게시글 추가 페이지로 이동
router.get("/add", (req, res) => {
  res.render("addTravel");
});

// CREATE : 게시글 추가
router.post("/", (req, res) => {
  const { name } = req.body;
  const _query = "INSERT INTO travelList (name) VALUES (?)";
  db.query(_query, [name], (err, results) => {
    if (err) {
      console.log("데이터베이스 쿼리 실패: ", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.redirect("/travel");
  });
});

// add가 :id에 들어올 수도 있음
// 해당 게시글 내용 읽기
router.get("/:id", (req, res) => {
  const travelId = req.params.id;
  const query = "SELECT * FROM travelList WHERE id = ?";
  db.query(query, [travelId], (err, result) => {
    if (err) {
      console.error("데이터베이스 쿼리 실패: ", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    if (result.length === 0) {
      res.status(404).send("여행지를 찾을 수 없습니다.");
      return;
    }
    const travel = result[0];
    res.render("travelDetail", { travel });
  });
});

// 게시글 수정하는 페이지로 이동
router.get("/:id/edit", (req, res) => {
  const travelId = req.params.id;
  const query = "SELECT * FROM travelList WHERE id = ?";
  db.query(query, [travelId], (err, result) => {
    if (err) {
      console.error("데이터베이스 쿼리 실패: ", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    if (result.length === 0) {
      res.status(404).send("여행지를 찾을 수 없습니다.");
      return;
    }
    const travel = result[0];
    res.render("editTravel", { travel });
  });
});

// UPDATE : 게시글 수정
router.put("/:id", (req, res) => {
  const travelId = req.params.id;
  const { name } = req.body;
  const _query = "UPDATE travelList SET name=? WHERE id =?";
  db.query(_query, [name, travelId], (err, results) => {
    if (err) {
      console.error("데이터베이스 쿼리 실패");
      res.status(500).send("데이터베이스 서버 에러");
      return;
    }
    res.render("updateSuccess");
  });
});

// DELETE : 게시글 삭제
router.delete("/:id", (req, res) => {
  const travelId = req.params.id;
  const _query = "DELETE FROM travelList WHERE id = ?";
  db.query(_query, [travelId], (err, results) => {
    if (err) {
      console.log("데이터베이스 쿼리 실패", err);
      res.status(500).send("데이터베이스 서버 에러");
      return;
    }
    res.render("deleteSuccess");
  });
});

module.exports = router;
