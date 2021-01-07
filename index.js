const express = require('express');
const mysql =  require('mysql');

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'pat',
    password: 'thegeniesnamewasnotthis',
    database: 'runcounter'
});

db.connect();

app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';

    db.query(sql, (err, result) => {
        res.send(result);
    });
});
app.listen(5000, () => console.log('Server started'));