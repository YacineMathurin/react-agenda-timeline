const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Salaam");
  }
});

server.listen(3000, () => {
  console.log(`Server Listening on port: ${server.address().port}`);
});
