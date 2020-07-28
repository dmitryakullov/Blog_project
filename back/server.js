
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
mongoose.connect('mongodb://localhost/project', {useNewUrlParser: true});


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


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


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

// (async ()=>{
//     let getId = await User.findOne({nick: 'Dima3', password: '3234'});
//     console.log(getId._id)
// })();


app.post('/updatePost', function (req, res) {
    (async()=>{
        const {_id, title, text} = req.body;

        if(!_id|| !title || !text || Object.keys(req.body).length !== 3) {
            res.send(JSON.stringify({msg: 'ERROR'}));
        }

        

        res.send(JSON.stringify({msg: 'SAVE'}));
    })()
});

app.post('/createPost', function (req, res) {
    (async()=>{
        const {_id, title, text} = req.body;

        if(!_id|| !title || !text || Object.keys(req.body).length !== 3) {
            res.send(JSON.stringify({msg: 'ERROR'}));
        }

        let newPost = await new Post({_id, title, text, active: true});
        await newPost.save(function (err) {
            if (err) return console.error(err);
        })
        console.log(newPost);

        res.send(JSON.stringify({msg: 'SAVE'}));
    })()
});


app.post('/checkinform', function (req, res) {
    (async()=>{
        const {nick, email, password} = req.body;

        if(!nick || !email || !password || Object.keys(req.body).length !== 3) {
            res.send(JSON.stringify({msg: 'ERROR'}));
        }

        let check = await User.find({$or: [{nick}, {email}]});

        if (check.length === 0) {
            let newUser = await new User({nick, email, password, avatar: false, active: true, admin: false});
            await newUser.save(function (err) {
                if (err) return console.error(err);
            })

            let token = jwt.sign({ nick, password }, config.secret);
            res.send(JSON.stringify({_id: newUser._id, nick, email, avatar: false, active: true, admin: false , token}));
        }

        else {
            res.send(JSON.stringify({msg: 'USER_OR_EMAIL_EXIST'}));
        }
    })()
});


app.post('/enterform', function (req, res) {
    (async()=>{
        const {email, password} = req.body;

        if(!email || !password || Object.keys(req.body).length !== 2) {
            res.end(JSON.stringify({msg: 'ERROR'}));
        }

        let check = await User.findOne({email, password});
        if (check.nick) {
            let {_id, nick, email, avatar, active, admin} = check;

            let token = jwt.sign({ nick, password }, config.secret);
            res.send(JSON.stringify({_id, nick, email, avatar, active, admin, token}));
            
        } else {
            res.send(JSON.stringify({msg: 'SOMETHING_WRONG'}));
        }
    })()
});



app.get('/', function (req, res) {
    (async ()=>{

    })();
});


app.listen(4000, function () {
    console.log('Example app listening on port 4000!');
});