#!/usr/bin/node
const args = process.argv.slice(2);
const fs = require('fs');

fs.writeFile(args[0], args[1], 'utf8', (err) => {
  if (err) {
    console.log(err);
  }
});
