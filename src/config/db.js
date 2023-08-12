const mysql = require('mysql');

// const db = mysql.createConnection({
// host:'localhost',
// user: 'root',
// password:'',
// database: 'react_db'
const db = mysql.createConnection({
    host:'45.77.37.85',
    user: 'wanabedev',
    password:'12345678',
    database: 'wbd_db'

});
//ເຊື່ອມຕໍ່ຖານຂໍ້ມູນ
db.connect((err) => { 
    if(err) ;
    console.log('Database connected');
});
module.exports = db;