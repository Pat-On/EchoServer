// importing the dependencies
const express = require("express");
const http = require("http");

// defining the Express app
// ~~ Declaring it without var or const will make it available globally in other files ~~
app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

server = http.createServer(app);
socketProvider = require("./socketProvider")(server);
socketProvider.listen();
socketProvider.broadcast("test");

//Routes
app.use(require("./routes"));

// starting the server
server.listen(3001, () => {
  console.log("listening on port 3001");
});
