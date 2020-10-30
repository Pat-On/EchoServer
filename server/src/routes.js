var express = require("express");
const path = require("path");

var router = express.Router();

var echo = require("./echo");

router.get("/", function (req, res, next) {
  res.send(echo(req));
});

// serve static files
router.use(
  express.static(path.join(__dirname, "..", "..", "echo-client", "build"))
);

router.get("/echo-ui", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "echo-client", "build", "index.html")
  );
});

router.all("*", (req, res) => {
  res.send(echo(req));
});

module.exports = router;
