#!/usr/bin/node
/* Writes a string to a file. */

/* eslint-disable */
const args = process.argv.slice(2);
const fs = require('fs');

fs.writeFile(args[0], args[1], 'utf8', (err) => {
  if (err) {
    console.log(err);
  }
});
