const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    res.send("Hello from trade route /");
})


module.exports = router;