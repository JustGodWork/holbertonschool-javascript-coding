const utils = require('../utils');

module.exports = class StudentsController {
  static async getAllStudents(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    try {
      const studentsByField = await utils.readDatabase(process.argv[2]);
      let response = 'This is the list of our students\n';
      studentsByField.forEach(({ field, students }) => {
        response += `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`;
      });
      res.status(200).send(response);
    } catch (err) {
      res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    if (!['CS', 'SWE'].includes(req.params.major)) {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }
    try {
      const studentsByField = await utils.readDatabase(process.argv[2]);
      const studentsInMajor = studentsByField.find(({ field }) => field === req.params.major);
      res.status(200).send(`List: ${studentsInMajor.students.join(', ')}`);
    } catch (err) {
      res.status(500).send('Cannot load the database');
    }
  }
};
