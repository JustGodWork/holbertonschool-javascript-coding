const args = process.argv.slice(2);
const request = require('request');

request(args[0], (error, response, body) => {
  if (error) {
    console.log(error);
  } else {
    console.log('code:', response.statusCode);
  }
});
