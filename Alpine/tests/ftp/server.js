const FtpSrv = require('ftp-srv');

// Create the FTP server
const ftpServer = new FtpSrv('ftp://0.0.0.0:21'); // Replace 0.0.0.0 with your desired IP address, and 21 with your desired port

// Define authentication (optional)
ftpServer.on('login', (data, resolve, reject) => {
  const username = data.username;
  const password = data.password;

  // Perform authentication (you can replace this with your desired logic)
  if (username === 'test' && password === 'test') {
    resolve({ root: './ftp-root' }); // Change './ftp-root' to the desired directory for the authenticated user
  } else {
    reject(new Error('Invalid username or password'));
  }
});

// Log errors
ftpServer.on('client-error', (connection, context, error) => {
  console.error('Client error:', error);
});

// Start the FTP server
ftpServer.listen()
  .then(() => {
    console.log(`FTP server listening on ${ftpServer.url}`);
  })
  .catch(error => {
    console.error('Error starting FTP server:', error);
  });
