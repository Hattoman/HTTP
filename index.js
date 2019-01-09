console.log("texan cat: meowdy");

console.log(require("module").builtinModules);

const http = require("http");

const httpServer = http.createServer((request, response) => {
  const route = request.url;
  const method = request.method;
  console.log(route);
  console.log(method);
});

httpServer.listen(1337, () => console.log("Webbserver startad på port 1337"));
