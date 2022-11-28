const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'mobin',
  password: 'Mobin@1380',
  database: 'firstDatabase'
});

// setTimeout(() => {
//   connect.end((err) => {
//       console.log(err);
//   })
//   console.log('end the connection');
// },5000)

module.exports = con;