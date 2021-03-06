"use strict";
const http = require("http");
const pug = require("pug");
const server = http
  .createServer((req, res) => {
    console.info(" Requested by " + req.connection.remoteAddress);
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });

    switch (req.method) {
      case "GET":
        if (req.url === "/enquetes/beaf-chiken") {
          res.write(
            pug.renderFile("./form.pug", {
              path: req.url,
              firstItem: "Beaf",
              secondItem: "Chicken",
            })
          );
        } else if (req.url === "/enquetes/rice-bread") {
          res.write(
            pug.renderFile("./form.pug", {
              path: req.url,
              firstItem: "Rice",
              secondItem: "Bread",
            })
          );
        } else if (req.url === "/enquetes/sushi-pizza") {
          res.write(
            pug.renderFile("./form.pug", {
              path: req.url,
              firstItem: "Sushi",
              secondItem: "Pizza",
            })
          );
        }
        res.end();
        break;
      case "POST":
        let rawData = "";
        req
          .on("data", (chunk) => {
            rawData = rawData + chunk;
          })
          .on("end", () => {
            const qs = require("querystring");
            const answer = qs.parse(rawData);
            const body =
              answer["name"] + " submited " + answer["favorite"] + " !!!!!";
            res.write(
              '<!DOCTYPE html><html lang="en"><body><h1>' +
                body +
                "</h1></body></html>"
            );
            res.end();
          });
        break;
      default:
        break;
    }
  })
  .on("error", (e) => {
    console.error(" Server Error", e);
  })
  .on("clientError", (e) => {
    console.error(" Client Error", e);
  });
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.info(" Listening on " + port);
});
