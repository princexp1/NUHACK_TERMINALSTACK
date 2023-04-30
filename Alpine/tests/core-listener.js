const http = require("http");

const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const soap = require("soap");

const service = {
  MyService: {
    MyPort: {
      MyFunction: function (args) {
        console.log("console");
        return {
          result: args.a + args.b,
        };
      },
    },
  },
};

const xml = require("fs").readFileSync("myservice.wsdl", "utf8");

server.listen(3000, function () {
  const soapServer = soap.listen(server, "/wsdl", service, xml, function () {
    console.log("SOAP server listening on http://localhost:3000/wsdl");
  });
});
