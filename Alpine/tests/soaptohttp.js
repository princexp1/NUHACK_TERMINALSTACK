const express = require('express');
const bodyParser = require('body-parser');
const soap = require('soap');
const xml2js = require('xml2js');
const app = express();

// Middleware to parse SOAP requests
const soapRequestParser = async (req, res, next) => {
  if (req.headers['content-type'] === 'application/soap+xml') {
    try {
      const xml = await new Promise((resolve, reject) => {
        let data = '';
        req.on('data', chunk => {
          data += chunk;
        });
        req.on('end', () => {
          resolve(data);
        });
      });

      const parser = new xml2js.Parser({ explicitArray: false });
      const parsedXml = await parser.parseStringPromise(xml);

      req.body = parsedXml['soap:Envelope']['soap:Body'];
      next();
    } catch (error) {
      res.status(400).send({ error: 'Invalid SOAP request' });
    }
  } else {
    next();
  }
};

app.use(bodyParser.json());
app.use(soapRequestParser);

app.get('/', async (req, res) => {
  // Handle the SOAP request here
  console.log(req.body);
  res.status(200).send({ message: 'SOAP request converted to HTTP' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
