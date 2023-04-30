import os
from ftplib import FTP
from zeep import Client

# FTP server details
ftp_server = 'ftp://127.0.0.1:21'

# SOAP request details
wsdl = '/Users/mantragohil/Documents/code/Nirma/Alpine/tests/chatgpt/service.wsdl'  # Replace with the actual WSDL URL
operation_name = 'MyFunction'  # Replace with the actual operation name
operation_args = {
    'input': 'Sample Input',  # Replace with the actual input arguments for the operation
}

# Create a SOAP client
client = Client(wsdl)

# Generate SOAP request XML
soap_request = client.create_message(client.service, operation_name, **operation_args)
soap_request_xml = str(soap_request)

# Save SOAP request XML to a file
filename = 'soap_request.xml'
with open(filename, 'w') as f:
    f.write(soap_request_xml)

# Upload SOAP request XML to the FTP server
with FTP(ftp_server) as ftp:
    with open(filename, 'rb') as f:
        ftp.storbinary(f'STOR {filename}', f)

# Remove the local SOAP request XML file
os.remove(filename)

# Notify the server-side application to process the SOAP request and send the SOAP response
# This step depends on the server-side implementation, as there is no standard way to do this
