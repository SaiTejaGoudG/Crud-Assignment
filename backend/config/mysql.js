const mysql = require('mysql2')

export const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Saiteja@35',
    database: 'student_management'
  });