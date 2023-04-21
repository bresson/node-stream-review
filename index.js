const https = require('https');

console.log('node');
//URL for request
const url = 'https://jsonplaceholder.typicode.com/todos/';

// Function that receives response stream to respond to event
const responseHandler = (res) => {
  //String Variable to hold the incoming data
  let data = '';

  // data event triggered when a chunk of data arrives, we assemble our response string incrementally
  res.on('data', (chunk) => {
    console.log(chunk);
    data += chunk;
  });

  // The end event is triggered when the stream is no longer sending data so we can make use of our complete response
  res.on('end', () => {
    console.log('ENDED');
    console.log(JSON.parse(data));
  });

  // handling an error event is the stream errors
  res.on('error', (err) => {
    console.log('Error: ' + err.message);
  });
};

// use the https.get passing the url and responseHandler
// https.get(url, responseHandler);

function getHttpsData(url, callback) {
  https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      callback(null, data);
    });

    res.on('error', (err) => {
      callback(err);
    });
  });
}

getHttpsData(url, (err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }

  const jsonData = JSON.parse(data);
  console.log('Received data:', jsonData);
});
