#!/usr/bin/node
/* Prints the status code of a GET request. */

/* eslint-disable */
const args = process.argv.slice(2);
const request = require('request');

request(args[0], (error, response) => {
  if (error) {
    console.log(error);
  } else {
    console.log('code:', response.statusCode);
  }
});
