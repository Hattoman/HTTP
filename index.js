console.log("texan cat: meowdy");

console.log(require("module").builtinModules);

const http = require("http");

const httpServer = http.createServer((request, response) => {
  const route = request.url;
  console.log(route);
});

httpServer.listen(1337, () => console.log("Webbserver startad på port 1337"));
