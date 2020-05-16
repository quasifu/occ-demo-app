const express = require("express");
const cors = require("cors");
const server = express();
const routes = require("./routes");
const authMiddleware = require("./auth");
var proxy = require("express-http-proxy");

server.use(cors());
server.use(express.urlencoded({ extended: true, strict: false }));
server.use(express.json());
server.use(authMiddleware);

server.get("/v1/printers", routes.doSomething);
server.get("/api/v1/:containerName", routes.listContainer);
server.get(
  "/api/v1/:containerName/*",
  proxy(`https://${process.env.ACCOUNT}.blob.core.windows.net`, {
    limit: "5mb",
    proxyReqPathResolver: function (req) {
      return new Promise(function (resolve, reject) {
        resolve(
          `/${req.params.containerName}/${req.params[0]}${process.env.SAS_TOKEN}`
        );
      });
    },
  })
);
server.get("/", routes.getStatus);

const port = process.env.PORT ? process.env.PORT : 1337;

server.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
