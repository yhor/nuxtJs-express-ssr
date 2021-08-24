const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.send('여기는 APIAP22I');
});

module.exports = router;