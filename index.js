require('dotenv').config();
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
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySQL connected!');
});

// app.get('/run_total', (req, res) => {
//     const sql = 'SELECT * FROM stats WHERE run_total ORDER BY id DESC LIMIT 1';
//     db.query(sql, (err, result) => {
//         if (err) throw 'bad vibe';
//         console.log(result);
//         res.send(result);
//     });
// });

app.post('/stats', (req, res) => {
    const sql = 'INSERT INTO `stats` (`id`, `run_date`, `run_length`, `run_total`) VALUES (?, ?, ?, ?)';
    db.query(sql, (err, result) => {
        if (err) throw 'bad vibe';
        res.send(result);
    });
});

app.get('/stats', (req, res) => {
    const sql = 'SELECT * from `stats`';
    db.query(sql, (err, result) => {
        if (err) throw 'bad vibe';
        res.send(result);
    });
});

app.get('/stats/run_total', (req, res) => {
    const sql = 'SELECT run_total FROM stats WHERE run_total ORDER BY id DESC LIMIT 1';
    db.query(sql, (err, result) => {
        if (err) throw 'bad vibe';
        res.send(result);
    });
});

app.listen(5000, () => console.log('ur doing it!'));

//put latest run on as lastrun, put lastrun to total

//sql line for inserting new run ---> INSERT INTO `stats` (`id`, `run_date`, `run_length`, `run_total`) VALUES (NULL, '2021-01-08', '6', '48');
//sql line for just getting most recent run_total 'SELECT run_total FROM stats WHERE run_total ORDER BY id DESC LIMIT 1'