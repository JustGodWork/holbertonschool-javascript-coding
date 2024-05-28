module.exports = class AppController {
  static getHomepage(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('Hello Holberton School!');
  }
};
