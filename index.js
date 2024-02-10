const http = require("http");

function requesController() {
  console.log("Hello");
}

// Create server
const server = http.createServer(requesController);

server.listen(4000);
