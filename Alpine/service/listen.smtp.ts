const Imap = require('imap');
const { simpleParser } = require('mailparser');

const imap = new Imap({
  user: 'no-reply@dicot.tech', // Replace with your email address
  password: 'Dicot@2401', // Replace with your email password
  host: 'imappro.zoho.in', // Replace with your IMAP server
  port: 993,
});

function openInbox(cb: (err: Error | null, box: any) => void) {
  imap.openBox('INBOX', false, cb);
}

imap.once('ready', function () {
  openInbox((err:any, box:any) => {
    if (err) throw err;
    imap.search(['UNSEEN', ['SUBJECT', 'SOAP Request']], (err:any, results:any) => {
      if (err) throw err;
      if (!results || results.length === 0) {
        console.log('No unread SOAP request emails found.');
        imap.end();
        return;
      }

      const fetch = imap.fetch(results, { bodies: '' });
      fetch.on('message', (msg:any, seqno:any) => {
        msg.on('body', (stream:any, info:any) => {
          simpleParser(stream, (err:any, parsed:any) => {
            if (err) throw err;
            console.log('SOAP Request:', parsed.text);
            // Process the SOAP request here
          });
        });
      });

      fetch.once('error', (err:any) => {
        console.error('Fetch error:', err);
      });

      fetch.once('end', () => {
        console.log('Done fetching all messages.');
        imap.end();
      });
    });
  });
});

imap.once('error', function (err:any) {
  console.error('Connection error:', err);
});

imap.connect();
