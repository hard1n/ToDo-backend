require("dotenv").config();
const http = require("http");

function requesController() {
  console.log("Hello");
}

const PORT = process.env.PORT;

// Create server
const server = http.createServer(requesController);

server.listen(PORT, () => {
  console.log(`App running in port: ${PORT}`);
});
