#!/usr/bin/node
const request = require('request');
const args = process.argv.slice(2);

const apiUrl = args[0];

request(apiUrl, (error, response, body) => {
  if (error) {
    console.error('Error:', error);
  } else if (response.statusCode !== 200) {
    console.error('Status:', response.statusCode);
  } else {
    const todos = JSON.parse(body);
    const completedByUsers = {};

    todos.forEach((todo) => {
      if (todo.completed) {
        if (completedByUsers[todo.userId]) {
          completedByUsers[todo.userId]++;
        } else {
          completedByUsers[todo.userId] = 1;
        }
      }
    });

    console.log(completedByUsers);
  }
});
