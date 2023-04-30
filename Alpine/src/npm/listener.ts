// Import the 'net' module
require("dotenv").config({path: "/Users/mantragohil/Documents/code/Nirma/Alpine/.env"});
const net = require('net');
const express = require('express');
// Initialize Express app
const app = express();
const http = require('http');
const xmlBodyParser = require('express-xml-bodyparser');
const bodyParser = require('body-parser');
// Access and parse command-line flags
const args = process.argv.slice(2);

let flags:any = {
    port: null,
    host: null,
    send: null
};

args.map(async (element:any, key:any)=>{
        if(element == "--port" || element == "-p"){
            flags["port"] = args[key+1];
        }
        else if(element == "--host" || element == "-h"){
            flags["host"] = args[key+1];
        }
        else if(element == "-s" || element == "--send"){
            flags["send"] = args[key+1];
        }
});

if(flags.port == null || flags.host == null){
    throw new Error("No target port and host provided,\n try adding port and host using -p/--port and -h/--host.")
}
else if(flags.send == null){
    throw new Error("No destination format intended\n try adding destination format using '-s json/xml' ")
}

//local-modules
const protocol = require("../../service/determine.protocol");
const {xmlToJson, jsonToXml} = require("../../service/converter");

// Define local consts
const port = process.env.port;

// Create a TCP server using the 'net' module
const handleSocketConnection = (socket:any, data:any) => {
    console.log('New socket connection');
    // Forward the socket to the custom HTTP server
    customHttpServer.emit('connection', socket);
  };
  
    // Create a custom HTTP server and pass it to the Express app
    const customHttpServer = http.createServer(app);
    
    // Start the custom HTTP server
    const PORT = 3001;
    customHttpServer.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

    app.use(bodyParser.text({ type: 'application/xml' }));
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    // Middleware to handle all requests
    let BODY:any;
    const handleAllRequests = (req:any, res:any) => {
        console.log("headers", req.rawHeaders)
        console.log('Received request:', req.headers, req.body);
        //save in database
        console.log("req.body", req.body)
        const foundProtocol2 = protocol(req.body);
        console.log({foundProtocol2})
        res.send({ message: `Handled request for ${req.method} ${req.url}` , json: xmlToJson(req.body)});
    };
    app.all('*', handleAllRequests);
    const expressNetServer = net.createServer(handleSocketConnection);
    const netServer = net.createServer((socket:any) => {
    // When a new connection is established

    // Set the encoding for the data received from the client
    socket.setEncoding('utf8');

  // Listen for data from the client
    socket.on('data', (data:any) => {
    console.log("-------", {data})
    const foundProtocol = protocol(data)
    console.log(String(foundProtocol).toLocaleLowerCase(), String(flags.send).toLocaleLowerCase());

    if(String(foundProtocol).toLocaleLowerCase() == String(flags.send).toLocaleLowerCase()){
        //same protocol transfer
        console.log("-------------")
        var client = new net.Socket();
        console.log(data)


            client.connect(Number(flags.port), flags.host, function(DATA:any) {
                console.log(`sending to server: a.random.test`);
                client.write(data)
            });
    
            client.on("data", (chunk:any)=>{
                socket.write(chunk.toString())
            })

            client.on("error", (error:any)=>{
                
                if(String(error).includes("Error: connect ECONNREFUSED")){
                    console.log("server aint live rn, so were storing data in backend rn");
                    socket.write(`server offline`)

                    //store data in backend
                }
            })

    }

    else{ 
        console.log("diff protocls -- ", {data})
        var client = new net.Socket();
        if(String(foundProtocol).toLocaleLowerCase() == "http"){
            //http protocol
            client.connect(5001, "localhost", function(DATA:any) {
                client.write(data)
            });
    
            client.on("data", (chunk:any)=>{
                console.log(chunk.toString())
                socket.write(chunk.toString())
            })
        }
        else{
            //soap protocol
            client.connect(5001, "localhost", function(DATA:any) {
                client.write(data)
            });
    
            client.on("data", (chunk:any)=>{
                console.log(chunk.toString())
                socket.write(chunk.toString())
            })
        }

    }
  });
  
  // Listen for the 'end' event, which is triggered when the client disconnects
  socket.on('end', () => {
    console.log('Client disconnected');
  });

  // Handle errors
  socket.on('error', (error:any) => {
    console.error(`Error: ${error.message}`);
  });
});


// Start the server and listen for incoming connections on the specified port
// const netServer = net.createServer(handleSocketConnection, (socket:any)=>{
//     socket.on('data', (data:any) => {
//         console.log({data})
//     })
// });

// Start the net server on another port
expressNetServer.listen(5001, () => {
    console.log(`express Net server is running on port ${process.env.expressport}`);
});
netServer.listen(process.env.port, () => {
  console.log(`Net server is running on port ${process.env.port}`);
});


// Handle server errors
netServer.on('error', (error:any) => {
  console.error(`Server error: ${error.message}`);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
export {}