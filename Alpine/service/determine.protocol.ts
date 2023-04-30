function determineProtocol(data:String) {
    if(data.includes("soap:Envelope")){
      return "SOAP";
    }
    else if (data.startsWith('GET') || data.startsWith('POST') || data.startsWith('PUT') || data.startsWith('DELETE')) {
      return 'HTTP';
    } else if (data.startsWith('EHLO') || data.startsWith('HELO') || data.startsWith('MAIL FROM') || data.startsWith('RCPT TO')) {
      return 'SMTP';
    } else if (data.startsWith('USER') || data.startsWith('PASS') || data.startsWith('QUIT') || data.startsWith('RETR')) {
      return 'FTP';
    } else {
      console.log({data})
      return null;
    }
}
export {}
module.exports = determineProtocol