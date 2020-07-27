var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/project', {useNewUrlParser: true});
var Schema = mongoose.Schema;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));






app.get('/', function (req, res) {
    res.send(JSON.stringify({msg: 'hello'}));
});
app.get('/a', function (req, res) {
    res.send(JSON.stringify({msg: 'hello ffff'}));
});

app.listen(4000, function () {
    console.log('Example app listening on port 4000!');
});