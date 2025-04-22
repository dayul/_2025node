const db = require("../dbConnection");
const express = require("express");
const router = express.Router();

// READ : 전체 게시글 조회
router.get("/", async (req, res) => {
  try {
    const _query = "SELECT id, name FROM travelList";
    const [results] = await db.query(_query);
    const travelList = results;
    res.render("travel", { travelList });
  } catch (err) {
    console.log("데이터베이스 쿼리 실패 : ", err);
    res.status(500).send("Internal Server Error");
  }
});

// 정적인 것을 먼저 올려주기
// 게시글 추가 페이지로 이동
router.get("/add", (req, res) => {
  res.render("addTravel");
});

// CREATE : 게시글 추가
router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const _query = "INSERT INTO travelList (name) VALUES (?)";
    await db.query(_query, [name]);
    res.redirect("/travel");
  } catch (err) {
    console.log("데이터베이스 쿼리 실패: ", err);
    res.status(500).send("Internal Server Error");
  }
});

// add가 :id에 들어올 수도 있음
// 해당 게시글 내용 읽기
router.get("/:id", async (req, res) => {
  const travelId = req.params.id;
  try {
    const _query = "SELECT * FROM travelList WHERE id = ?";
    const [results] = await db.query(_query, [travelId]);

    if (results.length === 0) {
      res.status(404).send("여행지를 찾을 수 없습니다.");
      return;
    }

    const travel = results[0];
    res.render("travelDetail", { travel });
  } catch (err) {
    console.error("데이터베이스 쿼리 실패: ", err);
    res.status(500).send("Internal Server Error");
  }
});

// 게시글 수정하는 페이지로 이동
router.get("/:id/edit", async (req, res) => {
  const travelId = req.params.id;
  try {
    const _query = "SELECT * FROM travelList WHERE id = ?";
    const [results] = await db.query(_query, [travelId]);

    if (results.length === 0) {
      res.status(404).send("여행지를 찾을 수 없습니다.");
      return;
    }

    const travel = results[0];
    res.render("editTravel", { travel });
  } catch (err) {
    console.error("데이터베이스 쿼리 실패: ", err);
    res.status(500).send("Internal Server Error");
  }
});

// UPDATE : 게시글 수정
router.put("/:id", async (req, res) => {
  const travelId = req.params.id;
  const { name } = req.body;
  try {
    const _query = "UPDATE travelList SET name=? WHERE id =?";
    await db.query(_query, [name, travelId]);
    res.render("updateSuccess");
  } catch (err) {
    console.error("데이터베이스 쿼리 실패");
    res.status(500).send("데이터베이스 서버 에러");
  }
});

// DELETE : 게시글 삭제
router.delete("/:id", async (req, res) => {
  const travelId = req.params.id;
  try {
    const _query = "DELETE FROM travelList WHERE id = ?";
    await db.query(_query, [travelId]);
    res.render("deleteSuccess");
  } catch (err) {
    console.log("데이터베이스 쿼리 실패", err);
    res.status(500).send("데이터베이스 서버 에러");
  }
});

module.exports = router;
