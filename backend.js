//required packages
const express = require('express');
const path = require('path');
const cors = require('cors');
const fallback = require('express-history-api-fallback');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const jwt = require('jsonwebtoken');


const app = express();
const port = 3000;
const root = path.join(__dirname,'./frontend/build');

app.use(express.static(root));
app.use(fallback('index.html', { root: root }))
app.use(cors());
app.use(bodyParser.json());

//Database constants
// const db = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: true,
// })

const db = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'final',
    password: 'nipun',
    port: 5432,
  })

db.connect();

app.get('/', (req, res) => {
    res.sendFile(root + 'index.html');
});

//Sign in request
app.post('/signin', (req, res) => {
    db.query(`SELECT * FROM CUSTOMER WHERE PHONE_NO='${req.body.phoneNumber}' AND PASSWORD='${req.body.password}'`, (error, results) => {
        if(error){
            res.status(400).send(false);
        }
        else if(results.rowCount = 0){
            res.status(400).send(false);
        }
        else{
            jwt.sign(req.body, 'b9e88579af34e13717f84345039b8b4d', function(err, token) {
                res.status(200).send({token});
            });            
        }
      })
});

//Sign up request
app.post('/signup',(req, res) => {
    db.query(`INSERT INTO CUSTOMER VALUES ('${req.body.name}',${req.body.aadhar},'${req.body.password}',DEFAULT,${req.body.phoneNumber})`,(error,results) => {
        if(error){
            res.send(false);
        }
        else{
            jwt.sign(req.body, 'b9e88579af34e13717f84345039b8b4d', function(err, token) {
                res.status(200).send({token});
            });
        }
    })    
})

//Home request
app.post('/home',(req,res) => {
    jwt.verify(req.body.token, 'b9e88579af34e13717f84345039b8b4d', function(err, decoded) {
        if(decoded){
            db.query(`SELECT * FROM CUSTOMER VALUES WHERE PHONE_NO = ${decoded.phoneNumber}`,(error,results) => {
                console.log(results.rows);
                res.status(200).send(results.rows[0]);
            })            
        }
        else if(err){
            console.log(err);
            res.status(400).send(false);
        }
      });
})

//Listening to port
app.listen(process.env.PORT || port, () => console.log(`App listening on port ${process.env.PORT}!`));