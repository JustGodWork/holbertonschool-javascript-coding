#!/usr/bin/node
/* Reads and prints the content of a file. */

/* eslint-disable */
const args = process.argv.slice(2);
const fs = require('fs');

fs.readFile(args[0], 'utf8', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});
