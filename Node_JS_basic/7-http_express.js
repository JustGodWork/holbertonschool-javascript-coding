const express = require('express');
const fs = require('fs').promises;

const app = express();
const PORT = 1245;
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

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.write('This is the list of our students\n');
  try {
    const students = await getStudents(DB_FILE);
    res.write(students);
  } catch (err) {
    res.write('Cannot load the database');
  }
  res.end();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
