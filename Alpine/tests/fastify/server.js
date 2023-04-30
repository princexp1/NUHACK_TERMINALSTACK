// Import Fastify and fast-xml-parser
const fastify = require('fastify')({ logger: true });
var parseString = require('xml2js').parseString;

// Add a custom content type parser for 'application/xml'
fastify.addContentTypeParser('application/xml', { parseAs: 'buffer' }, (req, body, done) => {
  try {
    const xml = body.toString('utf-8');
    console.log({xml})
    var convert = require('xml-js');
    var result1 = convert.xml2json(xml, {compact: true, spaces: 4});
    console.log(result1);
    done(null, result1);
  } catch (error) {
    done(error);
  }
});

// Define your route handler
fastify.post('/xml', async (req, reply) => {
  if (!req.body) {
    reply
      .code(400)
      .send({ statusCode: 400, error: 'Bad Request', message: 'Request body is missing or malformed.' });
    return;
  }

  // Log the parsed JSON object
  console.log('Parsed XML request:', req.body);

  // Process the JSON object and send a response
  reply
    .code(200)
    .send({ message: 'XML request processed successfully.' });
});

// Set the server to listen on a specific port and IP address
// Start the server
const startFastifyMiddleware = (port, host)=>{
    fastify
    .listen(port, host, (err, address) => {
        if (err) {
          fastify.log.error(err);
          process.exit(1);
        }
        fastify.log.info(`Server is running at ${address}`);
      });
      
}
startFastifyMiddleware(9900, "localhost")
