const { StringDecoder } = require("string_decoder");
const http = require("http");

const options = {
  hostname: "127.0.0.1",
  port: 1337,
  path: "/",
  method: "POST",
};

function requestHandler(options, body) {
  return new Promise((resolve, rejects) => {
    let data = "";

    let req = http.request(options, (res) => {
      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        resolve(data);
      });
    });

    req.on("error", (err) => {
      rejects(err);
    });

    req.write(body);
    req.end();
  });
}

process.stdin._decoder = new StringDecoder("utf8");

process.stdin.on("keypress", (a, b) => {
  console.log(a, b);
});

process.stdin.on("data", function (chunk) {
  console.log(this._decoder.write(chunk));
  requestHandler(options, JSON.stringify({ key: this._decoder.write(chunk) }));
  console.log(chunk);
});

process.stdin.setRawMode(true);
console.log("Start Server:");
