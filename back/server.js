
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var fs = require('fs');

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
app.use(express.static('public'));


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



// (async ()=>{
//     let ans = await new User({nick: 'Dima', email: 'dima@gmail.com', password: '12345678', avatar: 'false', active: true, admin: true})
//         await ans.save();
//     let ans1 = await new User({nick: 'Dima1', email: 'dima1@gmail.com', password: '1234', avatar: 'false', active: true, admin: false})
//         await ans1.save();
//     let ans2 = await new User({nick: 'Dima2', email: 'dima2@gmail.com', password: '2234', avatar: 'false', active: true, admin: false})
//         await ans2.save();
//     let ans3 = await new User({nick: 'Dima3', email: 'dima3@gmail.com', password: '3234', avatar: 'false', active: true, admin: false})
//         await ans3.save();
//     let ans4 = await new User({nick: 'Dima4', email: 'dima4@gmail.com', password: '4234', avatar: 'false', active: true, admin: false})
//         await ans4.save();
//     let ans5 = await new User({nick: 'Dima5', email: 'dima5@gmail.com', password: '5234', avatar: 'false', active: true, admin: false})
//         await ans5.save();
// })();

// (async ()=>{
//     let _id= "5f20809aa3b74d194071a7ca";
//     let newPost = await new Post({userId: _id, title: 'hello', text: 'world', active: true});
//         await newPost.save(); 
//     let newPost1 = await new Post({userId: _id, title: 'hello1', text: 'world1', active: true});
//         await newPost1.save();
//     let newPost2 = await new Post({userId: _id, title: 'hello2', text: 'world2', active: true});
//         await newPost2.save();
//     let newPost3 = await new Post({userId: _id, title: 'hello3', text: 'world3', active: true});
//         await newPost3.save();
//     let newPost4 = await new Post({userId: _id, title: 'hello4', text: 'world4', active: true});
//         await newPost4.save();
// })();



// (async ()=>{
//     let token = jwt.sign({ "email" : "dima5@gmail.com", "password" : "5234" }, config.secret);
//     console.log(token)
// })();

// (async ()=>{
//     let posts = await Post.findOne();
//     console.log(`${posts._id}`.constructor.name);

// })();



// app.post('/deletePicture', (req, res) => {
//     (async ()=>{
//         const _id = req.body._id;
//         if(!_id) {
//             res.end(JSON.stringify({msg: 'ERROR'}));
//         }

//         User.findByIdAndUpdate(_id, { avatar: 'false' },
//             function(err, result) {
//                 if (err) {
//                     res.send(JSON.stringify({msg: 'ERROR'}));
//                 } else if (result) {
//                     res.send(JSON.stringify({msg: 'DELETE'}));
//                 } else 
//                 res.send(JSON.stringify({msg: 'ERROR'}));
//         })
//     })();
// })

// app.post('/uploadPicture/:id', (req, res) => {
//     (async ()=>{
//         const _id = req.params.id;
//         let fileName = Math.random().toString('36')
//         fileName     = `upload/${fileName}`
//         let fileStream = fs.createWriteStream('public/' + fileName);
//         req.pipe(fileStream)

//         // req.on('end', () =>{
//         //     res.end(fileName)
//         // })
//     })();
// })


app.post('/posts/find', function (req, res) {
    (async()=>{
        const {find} = req.body;
        let arr =[];

        if(!find || Object.keys(req.body).length !== 1) {
            res.send(JSON.stringify({msg: 'ERROR'}));
        }

        let posts = await Post.find({$or: [
                                            {title: new RegExp(find, 'i')},
                                            {text: new RegExp(find, 'i')}
                                        ]});
        if (posts.length !==0) {
            for(let key in posts) {
                let post = posts[key];

                user = await User.findById({_id: `${post.userId}`});

                if (user.active){
                    let obj ={
                        _id: post._id,
                        title: post.title,
                        text: post.text,
                        userId: post.userId,
                        nick: user.nick,
                        avatar: user.avatar};
                        
                    console.log(obj)
                    arr.push(obj);
                }
            }
            res.send(JSON.stringify({postsArr: arr}));
        } else
        res.end(JSON.stringify({msg: 'ERROR'}));

    })();
});


app.put('/users/:id', function (req, res) {
    (async ()=>{
        const _id = req.params.id;

        if(!_id) {
            res.end(JSON.stringify({msg: 'ERROR'}));
        }
        
        let user = await User.findById(_id);
        console.log(user);
        if(user._id) {

            let {_id, nick, email, avatar, active, admin} = user;
            res.end(JSON.stringify({_id, nick, email, avatar, active, admin}));

        } else
        res.end(JSON.stringify({msg: 'ERROR'}));

    })();
});



app.post('/posts/get', function (req, res) {
    (async()=>{
        const {skip, userId} = req.body;
        let arr =[];

        if(userId) {
            let posts = await Post.find({userId}).skip(skip).limit(20);
            if(posts.length !==0) {
                res.send(JSON.stringify({postsArr: posts}));
            }
        } else {
            let posts = await Post.find().skip(skip).limit(20);

            if(posts.length !==0) {
                for(let key in posts) {
                    let post = posts[key];
                    
                    user = await User.findById({_id: `${post.userId}`});

                    if (user.active){
                        let obj ={
                            _id: post._id,
                            title: post.title,
                            text: post.text,
                            userId: post.userId,
                            nick: user.nick,
                            avatar: user.avatar};
                            
                        arr.push(obj);
                    }
                }
                res.send(JSON.stringify({postsArr: arr}));
            }
        }
    })()
});

app.post('/users/findone', function (req, res) {
    (async()=>{
        const {nick} = req.body;

        if(!nick || Object.keys(req.body).length !== 1) {
            res.send(JSON.stringify({msg: 'ERROR'}));
        }

        let user = await User.findOne({nick});
        if (user.nick) {
            let {_id, nick, email, avatar, active, admin} = user;

            res.send(JSON.stringify({_id, nick, email, avatar, active, admin}));
            
        }
        
    })()
});

app.post('/users/delete', function (req, res) {
    (async()=>{
        const {_id} = req.body;

        if(!_id || Object.keys(req.body).length !== 1) {
            res.send(JSON.stringify({msg: 'ERROR'}));
        }

        User.findByIdAndUpdate(_id, { active: false },
            function(err, result) {
                if (err) {
                    res.send(JSON.stringify({msg: 'ERROR'}));
                } else if (result) {
                    res.send(JSON.stringify({msg: 'DELETE'}));
                } else 
                res.send(JSON.stringify({msg: 'ERROR'}));
        })
        
    })()
});

app.delete('/posts/delete', function (req, res) {
    (async()=>{
        const {_id} = req.body;

        if(!_id || Object.keys(req.body).length !== 1) {
            res.send(JSON.stringify({msg: 'ERROR'}));
        }
        Post.findByIdAndDelete(_id, function (err, result) { 
            if (err){ 
                res.send(JSON.stringify({msg: 'ERROR'}));
            } else if(result){ 
                res.send(JSON.stringify({msg: 'DELETE'}));
            } 
            else res.send(JSON.stringify({msg: 'ERROR'}));
        }) 
        
    })()
});


app.post('/posts/update', function (req, res) {
    (async()=>{
        const {_id, title, text} = req.body;

        if(!_id || !title || !text || Object.keys(req.body).length !== 3) {
            res.send(JSON.stringify({msg: 'ERROR'}));
        }
        Post.findByIdAndUpdate(_id, { title, text },
            function(err, result) {
                if (err) {
                    res.send(JSON.stringify({msg: 'ERROR'}));
                } else if (result) {
                    res.send(JSON.stringify({msg: 'SAVE'}));
                } else 
                res.send(JSON.stringify({msg: 'ERROR'}));
        })
    })()
});

app.post('/posts/new', function (req, res) {
    (async()=>{
        const {userId, title, text} = req.body;

        if(!userId || !title || !text || Object.keys(req.body).length !== 3) {
            res.send(JSON.stringify({msg: 'ERROR'}));
        }

        let newPost = await new Post({userId, title, text, active: true});
        await newPost.save(function (err) {
            if (err) res.send(JSON.stringify({msg: 'ERROR'}));
        })

        res.send(JSON.stringify({msg: 'SAVE'}));
    })()
});


app.post('/users/new', function (req, res) {
    (async()=>{
        const {nick, email, password} = req.body;

        if(!nick || !email || !password || Object.keys(req.body).length !== 3) {
            res.send(JSON.stringify({msg: 'ERROR'}));
        }

        let check = await User.find({$or: [{nick}, {email}]});

        if (check.length === 0) {
            let newUser = await new User({nick, email, password, avatar: 'false', active: true, admin: false});
            await newUser.save(function (err) {
                if (err) return console.error(err);
            })

            let token = jwt.sign({ nick, password }, config.secret);
            res.send(JSON.stringify({_id: newUser._id, nick, email, avatar: 'false', active: true, admin: false , token}));
        }

        else {
            res.send(JSON.stringify({msg: 'USER_OR_EMAIL_EXIST'}));
        }
    })()
});


app.post('/users/get', function (req, res) {
    (async()=>{
        const {email, password} = req.body;

        if(!email || !password || Object.keys(req.body).length !== 2) {
            res.send(JSON.stringify({msg: 'ERROR'}));
        }

        let user = await User.findOne({email, password});
        if (user.nick) {
            let {_id, nick, email, avatar, active, admin} = user;

            let token = jwt.sign({ nick, password }, config.secret);
            res.send(JSON.stringify({_id, nick, email, avatar, active, admin, token}));
            
        } else {
            res.send(JSON.stringify({msg: 'SOMETHING_WRONG'}));
        }
    })()
});



app.post('/', function (req, res) {
    (async ()=>{
        if (req.headers.authorization) {
            const token = req.headers.authorization.slice('Bearer '.length);
            const decoded = jwt.verify(token, config.secret);
            const {email, password} = decoded;

            let user = await User.findOne({email, password});
                if (user.nick) {
                    let {_id, nick, email, avatar, active, admin} = user;
                    res.send(JSON.stringify({_id, nick, email, avatar, active, admin}));
                }
        }
        res.send(JSON.stringify({msg: 'NO_JWT'}));
    })();
});


app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(4000, function () {
    console.log('Example app listening on port 4000!');
});