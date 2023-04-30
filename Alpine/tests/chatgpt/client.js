const { soap } = require('strong-soap');

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

const operationName = 'MyFunction'; // Replace with the actual operation name
const operationArgs = {
  input: 'Sample Input', // Replace with the actual input arguments for the operation
};

soap.createClient(wsdl, (err, client) => {
  if (err) {
    console.error('Error creating SOAP client:', err);
    return;
  }

  client[operationName](operationArgs, (err, result) => {
    if (err) {
      console.error('Error processing SOAP request:', err);
      return;
    }

    console.log('SOAP response:', result);
  });
});
