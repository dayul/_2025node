const express = require('express');
const router = express.Router();

router.get("/:person", (req, res) => {
  const person = req.params.person;
  res.status(200).send(person);
});

router.get("/", (req, res) => {
  res.status(200).send("Get API");
});

router.post("/", (req, res) => {
  res.status(200).send("Post API");
});

module.exports = router;