const args = process.argv.slice(2);
const request = require('request');

const movieId = args[0];
const url = `https://swapi-api.hbtn.io/api/films/${movieId}`;

request(url, (error, response, body) => {
    if (error) {
        console.error(error);
    } else {
        const movie = JSON.parse(body);
        console.log(movie.title);
    }
});
