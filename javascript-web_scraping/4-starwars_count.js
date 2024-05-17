const args = process.argv.slice(2);
const request = require('request');

const apiUrl = args[0];
const characterId = 18;

request(apiUrl, function (error, _, body) {
  if (error) {
    console.error('Error:', error);
  } else {
    /** @type {Array} */
    const films = JSON.parse(body).results;
    let count = 0;
    films.forEach(function (film) {
      /** @type {Array} */
      const characters = film.characters;
      if (characters.includes(`https://swapi-api.hbtn.io/api/people/${characterId}/`)) {
        count++;
      }
    });
    console.log(count);
  }
});
