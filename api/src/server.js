const http = require("http");

const server = http.createServer((req, res) => {
  res.end("API rodando 🚀");
});

server.listen(3000, () => {
  console.log("Servidor na porta 3000");
});