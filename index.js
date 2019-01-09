console.log("texan cat: meowdy");

console.log(require("module").builtinModules);

const http = require("http");
const StringDecoder = require("string_decoder").StringDecoder;

const httpServer = http.createServer((request /*response*/) => {
  let route = request.url;
  const method = request.method;
  let dynamicArguments = request.url.split("/");
  route = dynamicArguments[1];
  dynamicArguments = dynamicArguments.splice(2);
  const headers = request.headers;
  const decoder = new StringDecoder("utf8");
  let payload = "";
  request.on("data", data => {
    payload += decoder.write(data);
  });
  request.on("end", () => {
    payload += decoder.end();

    console.log({
      route,
      dynamicArguments,
      method,
      headers,
      payload
    });
  });
});

httpServer.listen(1338, () => console.log("Servern lyssnar nu på port 1338"));
