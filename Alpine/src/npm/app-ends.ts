const express = require('express');

// Initialize Express app
const app = express();
const xmlBodyParser = require('express-xml-bodyparser');


// Register the XML body parser middleware for SOAP requests
app.use(xmlBodyParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// Middleware to handle all requests
const handleAllRequests = (req:any, res:any) => {
  console.log('Received request:', req.method, req.url, req.body);
  res.send({ message: `Handled request for ${req.method} ${req.url}` });
};

// Define a route handler for XML requests
app.post('/xml', (req:any, res:any) => {
  console.log('Received XML data:', req.body);
  // Process the XML data and send a response
  res.set('Content-Type', 'application/xml');
  res.send('<response><message>XML data received</message></response>');
});

// Register the wildcard route handler
app.all('*', handleAllRequests);

// Start the Express server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});