const ftp = require("basic-ftp");

const sendSOAPRequest = async () => {
  try {
    // Define the SOAP envelope
    const soapEnvelope = `<?xml version="1.0"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" soap:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
  <soap:Body>
    <!-- Your SOAP request goes here -->
  </soap:Body>
</soap:Envelope>`;

    // Set up FTP client
    const client = new ftp.Client();
    client.ftp.verbose = true;

    // Connect to your FTP server
    await client.access({
      host: "127.0.0.1",
      port: 21,
      user: "test",
      password: "test",
    });

    // Upload the SOAP envelope as a file
    const fileName = "soap-request.xml";
    const buffer = Buffer.from(soapEnvelope, "utf8");
    await client.uploadFrom(buffer, fileName);

    // Close the FTP connection
    await client.close();
  } catch (error) {
    console.error("Error sending SOAP request:", error);
  }
};

sendSOAPRequest();
