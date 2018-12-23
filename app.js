'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes/api');
var mysql = require('mysql');


var app = express();
//app.use('/api', routes);
app.use(bodyParser.json());

app.use(express.static('./public'));



var mysqlConnection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'

});

mysqlConnection.connect((err) => {
    if (err) {
        console.log("canot connect with database");

    }
    else {
        console.log(" connected with database");
    }
});



app.get('/api/ninjas', function (req, res) {

    mysqlConnection.query("CALL GetAll()", function (err, rows, fields) {

    //mysqlConnection.query("select * from employee", function (err, rows, fields) {
        if (!err) {
            console.log(rows[0]);

            //  res.render('main', { rows: rows });
            
            res.send(rows[0]);


        }
        else {
            res.status(404).send({ error: err });
        }


    });

});


app.get('/api/ninjas/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);

   /*
     /*procedure
     *
     * CREATE PROCEDURE getEmp(IN eid INT)
     * BEGIN SELECT * FROM employee WHERE id = eid;
     * END
      /
    */


   // mysqlConnection.query("select * from employee where id= '" + id + "'", function (err, rows, fields) {
    mysqlConnection.query("CALL getEmp('"+id+"')", function (err, rows, fields) {
        if (!err) {
            res.send(rows[0]);
        }
        else {
            res.status(404).send({ error: err });
        }


    });

});


app.post('/api/ninjas', function (req, res) {

    
    var ename = req.body.name;
    var epoints = req.body.points;


    mysqlConnection.query("insert into employee(name,points) values('" + ename + "','" + epoints + "') ", function (err, rows, fields) {

        if (!err) {

            res.send(rows);

        }
        else {
            res.status(404).send({ error: err });
        }


    });
});

app.put('/api/ninjas/:id', function (req, res) {
  
    var id = req.params.id;
    console.log(id);
    console.log(req.body);
    var name = req.body.name
    var points = req.body.points;
    
    
    mysqlConnection.query("update employee set name='" + name + "' ,points='" + points + "' where id='" + id + "'", function (err, rows, fields) {


        if (!err) {
            res.send(rows);
        }
        else {
            res.status(500).send({ error: err });
        }

    });

});



app.delete('/api/ninjas/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    mysqlConnection.query("delete from employee where id= '" + id + "'", function (err, rows) {

        if (!err) {
           
            res.send(rows);
        }
        else {
            res.status(404).send({ error: err });
        }


    });
   
});










app.listen(process.env.PORT || 3000, function () {
    console.log("connected");
});
