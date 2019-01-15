console.log("texan cat: meowdy");

console.log(require("module").builtinModules);

const http = require("http");
const StringDecoder = require("string_decoder").StringDecoder;

const httpServer = http.createServer((request, response) => {
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

    if (route === "forum" && method === "GET") {
      response.setHeader("Content-Type", "application/json");
      response.writeHead(200);
      response.end(JSON.stringify({ post: "En forum post" }));
    } else if (route === "forum" && method === "POST") {
      response.setHeader("Content-Type", "application/json");
      response.writeHead(200);
      response.end(JSON.stringify({ meddelande: "Forum tråden lades till" }));
    } else {
      response.writeHead(404);
      response.end("Sidan kunde inte hittas");
    }
  });
});

httpServer.listen(1338, () => console.log("Servern lyssnar nu på port 1338"));
