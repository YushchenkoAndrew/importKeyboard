const ks = require("node-key-sender");

const http = require("http");
const PORT = 1337;

const server = http.createServer((req, res) => {
  let data = "";

  req.on("data", (chuck) => {
    data += chuck;
  });

  req.on("end", () => {
    data = JSON.parse(data);
    ks.sendText(data.key);
    console.log("Received:", data);
  });

  res.statusCode = 200;
  res.end();
});

server.listen(PORT, () => {
  console.log("Start Clint Server");
});
