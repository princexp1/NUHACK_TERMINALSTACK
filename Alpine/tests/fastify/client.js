const axios = require('axios');
const url = 'http://localhost:3434/xml';
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n' +
'  <soap:Body>\n' +
'    <ns1:RequestMessage xmlns:ns1="http://example.com/soap">\n' +
'      <ns1:param>S,m m </ns1:param>\n' +
'    </ns1:RequestMessage>\n' +
'  </soap:Body>\n' +
'</soap:Envelope>';

axios.post(url, xml, { headers: { 'Content-Type': 'application/xml' } })
  .then((response) => {
    console.log('SOAP response:', response.data);
  })
  .catch((error) => {
    console.error('Error sending SOAP request:', error);
  });
