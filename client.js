const { exec } = require("child_process");
const http = require("http");

const PORT = 1337;
const SCRIPT = "pressKey.py";

function execute(...params) {
  return new Promise((resolve, reject) => {
    exec(`python ${SCRIPT} ${params.map((key) => `'${key}'`).join(" ")}`, (err, stdout, stderr) => {
      if (err) reject(err, stdout, stderr);
      else resolve(stdout, stderr);
    });
  });
}

const server = http.createServer((req, res) => {
  let data = "";

  req.on("data", (chuck) => {
    data += chuck;
  });

  req.on("end", () => {
    const { key } = JSON.parse(data);
    execute(key);
    console.log("Received:", data);
  });

  res.statusCode = 200;
  res.end();
});

server.listen(PORT, () => {
  console.log("Start Clint Server");
});
