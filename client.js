// const { StringDecoder } = require("string_decoder");
// const robot = require("robotjs");
// const decoder = new StringDecoder("utf-8");

// robot.typeString(decoder.write(Buffer.from([0x4c])));
const http = require("http");
const PORT = 1337;

const server = http.createServer((req, res) => {
  let data = "";

  req.on("data", (chuck) => {
    data += chuck;
  });

  req.on("end", () => {
    console.log("Received:", JSON.parse(data));
  });

  res.statusCode = 200;
  res.end();
});

server.listen(PORT, () => {
  console.log("Start Clint Server");
});
