const express = require('express');
const app = express();
const port = 8081;

app.get('/', (req, res) => {
  res.send('Hello World!');
  console.log("lfnsldkjds")
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});