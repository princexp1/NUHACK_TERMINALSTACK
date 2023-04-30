const express = require('express');
const { soap } = require('strong-soap');
const FtpSrv = require('ftp-srv');
const dgram = require('dgram');

// SOAP Service definition
const service = {
  MyService: {
    MyPort: {
      MyFunction: (args, callback) => {
        console.log('SOAP Request received:', args);
        callback(null, { result: 'Success' });
      },
    },
  },
};

// WSDL definition
const wsdl = `
<definitions name="MyService"
   targetNamespace="http://www.example.com/myservice"
   xmlns="http://schemas.xmlsoap.org/wsdl/"
   xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
   xmlns:tns="http://www.example.com/myservice"
   xmlns:xsd="http://www.w3.org/2001/XMLSchema">

   <message name="MyFunctionRequest">
      <part name="input" type="xsd:string"/>
   </message>
   <message name="MyFunctionResponse">
      <part name="output" type="xsd:string"/>
   </message>

   <portType name="MyPort">
      <operation name="MyFunction">
         <input message="tns:MyFunctionRequest"/>
         <output message="tns:MyFunctionResponse"/>
      </operation>
   </portType>

   <binding name="MyBinding" type="tns:MyPort">
      <soap:binding style="rpc"
         transport="http://schemas.xmlsoap.org/soap/http"/>
      <operation name="MyFunction">
         <soap:operation soapAction="http://www.example.com/myservice/MyFunction"/>
         <input>
            <soap:body namespace="http://www.example.com/myservice"
               encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"/>
         </input>
         <output>
            <soap:body namespace="http://www.example.com/myservice"
               encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"/>
         </output>
      </operation>
   </binding>

   <service name="MyService">
      <port name="MyPort" binding="tns:MyBinding">
         <soap:address location="http://localhost:8000/myservice"/>
      </port>
   </service>
</definitions>
`;

// HTTP server setup
const app = express();
const soapServer = soap.listen(app, '/myservice', service, wsdl);
app.listen(8000, () => {
  console.log('SOAP HTTP server listening on port 8000');
});

// FTP server setup
const ftpServer = new FtpSrv({
  url: 'ftp://127.0.0.1:21',
  anonymous: true,
  greeting: ['Welcome to the SOAP FTP server!'],
});

ftpServer.on('login', (data, resolve, reject) => {
  resolve({ root: './ftp_root' });
});

ftpServer.on('client-error', ({ connection, context, error }) => {
  console.error('FTP client error:', error);
});

ftpServer.listen().then(() => {
  console.log('SOAP FTP server listening on port 21');
})

// UDP server setup
const udpServer = dgram.createSocket('udp4');

udpServer.on('error', (err) => {
  console.log(`UDP server error:\n${err.stack}`);
  udpServer.close();
});

udpServer.on('message', (msg, rinfo) => {
  console.log(`UDP server received SOAP request from ${rinfo.address}:${rinfo.port}`);
  const options = {
    url: 'http://localhost:8000/myservice',
    headers: {
      'Content-Type': 'text/xml;charset=utf-8',
      'SOAPAction': 'http://www.example.com/myservice/MyFunction',
    },
  };

  soap.createClient(wsdl, (err, client) => {
    if (err) {
      console.error('Error creating SOAP client:', err);
      return;
    }

    client.MyFunction({ input: msg.toString() }, (err, result) => {
      if (err) {
        console.error('Error processing SOAP request:', err);
        return;
      }

      console.log('SOAP request processed successfully:', result);
    });
  });
});

udpServer.on('listening', () => {
  const address = udpServer.address();
  console.log(`SOAP UDP server listening on ${address.address}:${address.port}`);
});

udpServer.bind(41234);
