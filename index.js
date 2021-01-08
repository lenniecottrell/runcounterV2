require('dotenv').config()
const express = require('express');
const mysql =  require('mysql');
const app = express();
const dbPassword = process.env.dbPassword;

//create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'pat',
    password: dbPassword,
    database: 'runcounter'
});

//connect
db.connect();

app.get('/run_length', (req, res) => {
    const sql = 'SELECT * FROM stats WHERE run_length';
    db.query(sql, (err, result) => {
        res.send(result);
    });
});



app.listen(5000, () => console.log('ur doing it!'));