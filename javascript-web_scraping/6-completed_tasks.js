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
        const completed_by_users = {};

        todos.forEach((todo) => {
            if (todo.completed) {
                if (completed_by_users[todo.userId]) {
                    completed_by_users[todo.userId]++;
                } else {
                    completed_by_users[todo.userId] = 1;
                };
            };
        });

        console.log(completed_by_users);
    }
});
