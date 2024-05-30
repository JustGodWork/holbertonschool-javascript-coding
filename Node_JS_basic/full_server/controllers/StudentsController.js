import readDatabase from '../utils';

export default class StudentsController {
  static async getAllStudents(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    try {
      const studentsByField = await readDatabase(process.argv[2]);
      let response = 'This is the list of our students\n';
      const csStudents = studentsByField.find(({ field }) => field === 'CS');
      const sweStudents = studentsByField.find(({ field }) => field === 'SWE');
      studentsByField.forEach(({ field, students }) => {
        if (field === 'CS' || field === 'SWE') {
          const count = field === 'CS' ? csStudents.students.length : sweStudents.students.length;
          response += `Number of students in ${field}: ${count}. List: ${students.join(', ')}\n`;
        }
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
      const studentsByField = await readDatabase(process.argv[2]);
      const studentsInMajor = studentsByField.find(({ field }) => field === req.params.major);
      res.status(200).send(`List: ${studentsInMajor.students.join(', ')}`);
    } catch (err) {
      res.status(500).send('Cannot load the database');
    }
  }
}
