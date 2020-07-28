
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
mongoose.connect('mongodb://localhost/project', {useNewUrlParser: true});


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

try {
    mongoose.connect('mongodb://localhost/project', {useNewUrlParser: true});
} catch (error) {
    handleError(error);
}
var Schema = mongoose.Schema;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const config = {
    secret: `Dj=yr456_m9+F.rMM65_-.eug20864G` //тот самый секретный ключ, которым подписывается каждый токен, выдаваемый клиенту
}


var userSchema = new Schema({
    nick:  String,
    email: String,
    password: String,
    avatar: Boolean,
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




// (async ()=>{
//     let ans = await new User({nick: 'Dima3', email: 'dima3@gmail.com', password: '3234', avatar: false, active: true, admin: false})
//     ans.save(function (err) {
//         if (err) return console.error(err);
//     })
// })();



app.post('/checkinform', function (req, res) {
    (async()=>{
        const {nick, email, password} = req.body;
        // console.log(nick, email, password);
        let check = await User.find({$or: [{nick:null}, {email}]})
        if (check.length === 0) {

        }
        console.log(JSON.stringify(check));
        console.log(check.length);
        res.send('POST request to the homepage');
    })()
});


app.post('/enterform', function (req, res) {
    (async()=>{
        console.log(req.body);
        res.send('POST request to the homepage');
    })()
});


app.get('/', function (req, res) {
    res.send(JSON.stringify({msg: 'hello'}));
});


app.listen(4000, function () {
    console.log('Example app listening on port 4000!');
});