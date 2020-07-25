var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send(JSON.stringify({msg: 'hello'}));
});
app.get('/a', function (req, res) {
    res.send(JSON.stringify({msg: 'hello ffff'}));
});

app.listen(4000, function () {
    console.log('Example app listening on port 4000!');
});