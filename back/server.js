var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/project', {useNewUrlParser: true});

try {
    mongoose.connect('mongodb://localhost/project', {useNewUrlParser: true});
} catch (error) {
    handleError(error);
}
var Schema = mongoose.Schema;



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


var userSchema = new Schema({
    nick:  String,
    email: String,
    password: String,
    avatar: String,
    active: Boolean,
    admin: Boolean
    }
);
var User = mongoose.model('User', userSchema);


var postSchema = new Schema({
    userId:  String,
    title: String,
    text: String,
    active: Boolean
    }
);
var Post = mongoose.model('Post', postSchema);



app.get('/', function (req, res) {
    res.send(JSON.stringify({msg: 'hello'}));
});
app.get('/a', function (req, res) {
    res.send(JSON.stringify({msg: 'hello ffff'}));
});

app.listen(4000, function () {
    console.log('Example app listening on port 4000!');
});