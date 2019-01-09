console.log("texan cat: meowdy");

console.log(require("module").builtinModules);

const http = require("http");

const httpServer = http.createServer((request /*response*/) => {
  let route = request.url;
  const method = request.method;
  let dynamicArguments = request.url.split("/");
  route = dynamicArguments[1];
  dynamicArguments = dynamicArguments.splice(2);
  const headers = request.headers;
  console.log(route);
  console.log(method);
  console.log(dynamicArguments);
  console.log(headers);
});

httpServer.listen(1338, () => console.log("Servern lyssnar nu på port 1338"));
