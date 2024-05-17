#!/usr/bin/node
const request = require('request');
const args = process.argv.slice(2);
const fs = require('fs');

const url = args[0];
const filePath = args[1];

request(url, (error, response, body) => {
  if (error) {
    console.error('Error:', error);
  } else if (response.statusCode !== 200) {
    console.error('Status:', response.statusCode);
  } else {
    fs.writeFile(filePath, body, 'utf8', (err) => {
      if (err) console.error('Error writing file:', err);
    });
  }
});
