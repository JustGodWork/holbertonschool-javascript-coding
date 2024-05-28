const http = require('http');
const fs = require('fs');

const PORT = 1245;
const HOST = 'localhost';
const app = http.createServer();
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

const countStudents = (dataPath) => new Promise((resolve, reject) => {
  if (!dataPath) reject(new Error('Cannot load the database'));
  fs.readFile(dataPath, (err, data) => {
    if (err || !data) reject(new Error('Cannot load the database'));
    const baseText = [];
    const fileLines = data.toString('utf-8').trim().split('\n');
    const studentGroups = {};
    const dbFieldNames = fileLines[0].split(',');
    const studentPropNames = dbFieldNames.slice(
      0,
      dbFieldNames.length - 1,
    );

    for (const line of fileLines.slice(1)) {
      const studentRecord = line.split(',');
      const studentPropValues = studentRecord.slice(
        0,
        studentRecord.length - 1,
      );
      const field = studentRecord[studentRecord.length - 1];

      if (!Object.keys(studentGroups).includes(field)) {
        studentGroups[field] = [];
      }

      const studentEntries = studentPropNames.map((propName, idx) => [
        propName,
        studentPropValues[idx],
      ]);

      studentGroups[field].push(Object.fromEntries(studentEntries));
    }

    const totalStudents = Object.values(studentGroups).reduce(
      (pre, cur) => (pre || []).length + cur.length,
    );

    baseText.push(`Number of students: ${totalStudents}`);
    for (const [field, group] of Object.entries(studentGroups)) {
      baseText.push([
        `Number of students in ${field}: ${group.length}.`,
        'List:',
        group.map((student) => student.firstname).join(', '),
      ].join(' '));
    }
    resolve(baseText.join('\n'));
  });
});

const ROUTES = [
  {
    route: '/',
    handler(_, res) {
      const text = 'Hello Holberton School!';

      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', text.length);
      res.statusCode = 200;
      res.write(Buffer.from(text));
    },
  },
  {
    route: '/students',
    /**
     *
     * @param {Request} _
     * @param {Response} res
     */
    handler(_, res) {
      const baseText = ['This is the list of our students'];

      countStudents(DB_FILE)
        .then((report) => {
          baseText.push(report);

          const text = baseText.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', text.length);
          res.statusCode = 200;
          res.write(Buffer.from(text));
        })
        .catch((err) => {
          baseText.push(err instanceof Error ? err.message : err.toString());

          const text = baseText.join('\n');

          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', text.length);
          res.statusCode = 200;
          res.write(Buffer.from(text));
        });
    },
  },
];

app.on('request', (req, res) => {
  for (const routeHandler of ROUTES) {
    if (routeHandler.route === req.url) {
      routeHandler.handler(req, res);
      break;
    }
  }
});

app.listen(PORT, HOST, () => {
  process.stdout.write(`Server listening at -> http://${HOST}:${PORT}\n`);
});

module.exports = app;
