console.log("texan cat: meowdy");

const blogPosts = require("./blogPosts.js");
console.log(require("module").builtinModules);

const http = require("http");
const StringDecoder = require("string_decoder").StringDecoder;

const httpServer = http.createServer((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Request-Method", "*");
  response.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  response.setHeader("Access-Control-Allow-Headers", "*");
  if (request.method === "OPTIONS") {
    response.writeHead(200);
    response.end();
    return;
  }

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
    } else if (route === "posts" && method === "POST") {
      const data = JSON.parse(payload);
      const blogPost = {
        writtenBy: data.name,
        content: data.content,
        excerpt: data.content,
        title: data.title,
        id: blogPosts.length + 1
      };
      blogPosts.push(blogPost);
      response.writeHead(200);
      response.end();
    } else if (route === "posts" && method === "GET") {
      if (dynamicArguments.length === 0) {
        response.setHeader("Content-Type", "application/json");
        response.writeHead(200);
        response.end(JSON.stringify(blogPosts));
      } else if (dynamicArguments.length === 1) {
        const result = blogPosts.filter(post => post.id == dynamicArguments[0]);
        response.writeHead(200);
        response.end(JSON.stringify(result));
      } else {
        response.writeHead(404);
        response.end("Sidan kunde inte hittas");
      }
    }
  });
});

httpServer.listen(8000, () => console.log("Servern lyssnar nu på port 8000"));
