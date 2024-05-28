const fs = require('fs').promises;

export default function readDatabase(database) {
  return new Promise((resolve, reject) => {
    fs.readFile(database, 'utf8').then((data) => {
      const lines = data.split('\n').filter((line) => line);
      const students = lines.map((line) => line.split(','));
      const fields = [...new Set(students.map((student) => student[3]))];
      const studentsByField = fields.map((field) => ({
        field,
        students: students.filter((student) => student[3] === field).map((student) => student[0]),
      }));
      resolve(studentsByField);
    }).catch((error) => reject(error));
  });
}
