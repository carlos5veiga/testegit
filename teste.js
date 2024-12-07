import http from "http";
import fs from "fs";

http.createServer(function (req, res) {
    fs.readFile('teste.txt', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
  }).listen(3000);
