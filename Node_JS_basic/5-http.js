const http = require('http');
const fs = require('fs').promises;

const PORT = 1245;
const HOST = 'localhost';
const DB_FILE = process.argv[2];

/**
 * Get the students from the database file (CSV format)
 * @param {string} database
 * @returns {string}
 */
async function getStudents(database) {
  const data = await fs.readFile(database, 'utf8');
  const lines = data.split('\n').filter((line) => line);
  const students = lines.map((line) => line.split(','));
  const csStudents = students.filter((student) => student[3] === 'CS');
  const sweStudents = students.filter((student) => student[3] === 'SWE');
  const totalStudents = csStudents.length + sweStudents.length;
  const totalCsStudents = csStudents.length;
  const totalSweStudents = sweStudents.length;
  const csStudentsList = csStudents.map((student) => student[0]).join(', ');
  const sweStudentsList = sweStudents.map((student) => student[0]).join(', ');

  return [
    `Number of students: ${totalStudents}`,
    `Number of students in CS: ${totalCsStudents}. List: ${csStudentsList}`,
    `Number of students in SWE: ${totalSweStudents}. List: ${sweStudentsList}`,
  ].join('\n');
}

/**
 * Create a server with two routes
 * - /: returns a welcome message
 * - /students: returns the list of students from the database (CSV format)
 */
const app = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  if (req.url === '/') {
    res.write('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.write('This is the list of our students\n');
    try {
      const students = await getStudents(DB_FILE);
      res.write(students);
    } catch (err) {
      res.write('Cannot load the database');
    }
  } else {
    res.write('URL not found');
  }
  res.end();
});

app.listen(PORT, HOST, () => {
  process.stdout.write(`Server listening at -> http://${HOST}:${PORT}\n`);
});

module.exports = app;
