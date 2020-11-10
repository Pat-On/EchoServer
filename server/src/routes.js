var express = require("express");
const path = require("path");

var router = express.Router();

var echo = require("./echo");
var storageProvider = require("./storage/storageProvider")();

router.get("/", async (req, res, next) => {
  const echoMessage = echo(req);
  await storageProvider.storeEchoMessage(echoMessage);
  res.send(echoMessage);
});

// serve static files
router.use(
  express.static(path.join(__dirname, "..", "..", "echo-client", "build"))
);

router.get("/echo-ui", async (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "echo-client", "build", "index.html")
  );
});

router.get("/echo-ui/messages", async (req, res) => {
  const echoMessages = await sequelize.models.EchoMessage.findAll({
    include: { model: sequelize.models.Header, as: "headers" },
  });
  res.send(JSON.stringify(echoMessages));
});

router.all("*", async (req, res) => {
  const echoMessage = echo(req);
  await storageProvider.storeEchoMessage(echoMessage);
  res.send(echoMessage);
});

module.exports = router;
