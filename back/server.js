
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
// var fs = require('fs');

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
    secret: `Dj=yr456_m9+F.rMM65_-.eug20864G*$sv#&hWQ-^:;&8328649cDR`
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



// app.post('/deletePicture', (req, res) => {
//     (async ()=>{
//         const _id = req.body._id;
//         if(!_id) {
//             res.end(JSON.stringify({msg: 'ERROR'}));
//         }

//         User.findByIdAndUpdate(_id, { avatar: 'false' },
//             function(err, result) {
//                 if (err) {
//                     res.end(JSON.stringify({msg: 'ERROR'}));
//                 } else if (result) {
//                     res.end(JSON.stringify({msg: 'DELETE'}));
//                 } else 
//                 res.end(JSON.stringify({msg: 'ERROR'}));
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




app.post('/user/findposts', function (req, res) {    //Use
    (async()=>{

        const {userId, skip, firstTime} = req.body;
        
        let resObj ={}, postsArr =[];

        if(!userId) {
            res.end(JSON.stringify({msg: 'ERROR'}));
        }

        if(firstTime === true){
            await Post.count({ userId }, function (err, count) {
                if (err) {
                    res.end(JSON.stringify({msg: 'ERROR2'}));
                } else {
                    resObj ={...{count}}
                }
            });

            
            let user = await User.findById({_id: userId});

            if(user) {
                let {_id, nick, email, avatar, active, admin} = user;

                resObj = {...resObj, ...{_id, nick, email, avatar, active, admin}}
                
            } else {
                res.end(JSON.stringify({msg: 'ERROR3'}));
            }
        }



        let posts = await Post.find({userId}).skip(skip).limit(20).sort({_id:-1});
        
        if(posts.length !==0) {
            for (let post of posts) {

                const {_id, userId, title, text, active} = post
                let obj = { _id, userId, title, text, active, time: post._id.getTimestamp() }
                
                postsArr.push(obj)
            }
            
            res.end(JSON.stringify({...resObj, ...{postsArr}}));
        }
        res.end(JSON.stringify({msg: 'ERROR4'}));
    })()
});


app.put('/posts/count', function (req, res) {               //Use
    (async()=>{
        Post.count({ active: true }, function (err, count) {
            if (err) {
                res.end(JSON.stringify({msg: 'ERROR'}));
            } else {
                res.end(JSON.stringify({msg: count}));
            }
            res.end(JSON.stringify({msg: 'ERROR'}));
        });
    })()
});



app.post('/user/restore_delete', function (req, res) {
    (async()=>{
        const {nick} = req.body;

        if(!nick|| Object.keys(req.body).length !== 1) {
            res.end(JSON.stringify({msg: 'ERROR'}));
        }

        let user = await User.findOne({nick});

        if (user && user.active === true) {
            await User.findOneAndRemove({nick}, async function(err, ok) {
                if (err){ 
                    res.end(JSON.stringify({msg: 'ERROR'}));
                } 
                else { 
                    await Post.deleteMany({ 'userId':  ok._id}).then(function(){ 
                        res.end(JSON.stringify({msg: 'DELETE'}));  // Success 
                    }).catch(function(error){ 
                        res.end(JSON.stringify({msg: 'ERROR'})); 
                    }); 
                } 
            }) 
            
        } else 
        res.end(JSON.stringify({msg: 'NOT_FOUND'}));
    })();
});




app.post('/posts/find', function (req, res) { //Use
    (async()=>{
        const {find} = req.body;
        let arr =[];

        if(!find || Object.keys(req.body).length !== 1) {
            res.end(JSON.stringify({msg: 'ERROR'}));
        }

        let posts = await Post.find({$or: [
                                            {title: new RegExp(find, 'i')},
                                            {text: new RegExp(find, 'i')}
                                        ]}).sort({_id:-1});
        if (posts.length !==0) {
            for(let key in posts) {
                let post = posts[key];

                user = await User.findById({_id: `${post.userId}`});
                

                if (user.active){
                    let obj ={
                        _id: post._id,
                        time: post._id.getTimestamp(),
                        title: post.title,
                        text: post.text,
                        userId: post.userId,
                        nick: user.nick,
                        avatar: user.avatar};
                        
                    arr.push(obj);
                }
            }
            res.end(JSON.stringify({postsArr: arr}));
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

        if(user._id) {

            let {_id, nick, email, avatar, active, admin} = user;
            res.end(JSON.stringify({_id, nick, email, avatar, active, admin}));

        } else
        res.end(JSON.stringify({msg: 'ERROR'}));

    })();
});



app.post('/posts/get', function (req, res) {        //Use
    (async()=>{
        const {skip, userId} = req.body;
        let arr =[], obj={};

        if(userId) {
            let posts = await Post.find({userId}).skip(skip).limit(20).sort({_id:-1});
            if(posts.length !==0) {
                res.end(JSON.stringify({postsArr: posts}));
            }
        } else {
            let posts = await Post.find().skip(skip).limit(20).sort({_id:-1});
            
            if(posts.length !==0) {
                for(let key in posts) {
                    let post = posts[key];
                    
                    
                    if (post.userId){
                        user = await User.findById({_id: `${post.userId}`});
                        // console.log(JSON.stringify({r:user.active}, null, 6))
                        if (user.active){
                            obj ={
                                _id: post._id,
                                title: post.title,
                                text: post.text,
                                userId: post.userId,
                                nick: user.nick,
                                avatar: user.avatar,
                                time: post._id.getTimestamp()}

                                
                            arr.push(obj);
                    }
                    }
                    
                }
                res.end(JSON.stringify({postsArr: arr}));
            }
        }
    })()
});



app.post('/users/findone', function (req, res) {
    (async()=>{
        const {nick} = req.body;

        if(!nick || Object.keys(req.body).length !== 1) {
            res.end(JSON.stringify({msg: 'ERROR'}));
        }

        let user = await User.findOne({nick});
        if (user.nick) {
            let {_id, nick, email, avatar, active, admin} = user;

            res.end(JSON.stringify({_id, nick, email, avatar, active, admin}));
            
        }
        
    })()
});

app.post('/users/delete', function (req, res) {
    (async()=>{
        const {_id} = req.body;

        if(!_id || Object.keys(req.body).length !== 1) {
            res.end(JSON.stringify({msg: 'ERROR'}));
        }

        User.findByIdAndUpdate(_id, { active: false },
            async function(err, result) {
                if (err) {
                    res.end(JSON.stringify({msg: 'ERROR'}));
                } else if (result) {

                    const posts = await Person.updateMany({ userId: _id }, { active: false });
                    res.end(JSON.stringify({msg: 'DELETE'}));

                } else 
                res.end(JSON.stringify({msg: 'ERROR'}));
        })
        
    })()
});

app.delete('/posts/delete', function (req, res) {
    (async()=>{
        const {_id} = req.body;

        if(!_id || Object.keys(req.body).length !== 1) {
            res.end(JSON.stringify({msg: 'ERROR'}));
        }
        Post.findByIdAndDelete(_id, function (err, result) { 
            if (err){ 
                res.end(JSON.stringify({msg: 'ERROR'}));
            } else if(result){ 
                res.end(JSON.stringify({msg: 'DELETE'}));
            } 
            else res.end(JSON.stringify({msg: 'ERROR'}));
        }) 
        
    })()
});


app.post('/posts/update', function (req, res) {
    (async()=>{
        const {_id, title, text} = req.body;

        if(!_id || !title || !text || Object.keys(req.body).length !== 3) {
            res.end(JSON.stringify({msg: 'ERROR'}));
        }
        Post.findByIdAndUpdate(_id, { title, text },
            function(err, result) {
                if (err) {
                    res.end(JSON.stringify({msg: 'ERROR'}));
                } else if (result) {
                    res.end(JSON.stringify({msg: 'SAVE'}));
                } else 
                res.end(JSON.stringify({msg: 'ERROR'}));
        })
    })()
});

app.post('/posts/new', function (req, res) {
    (async()=>{
        const {userId, title, text} = req.body;
        console.log(userId, title, text)
        if(!userId || !title || !text || Object.keys(req.body).length !== 3) {
            res.end(JSON.stringify({msg: 'ERROR1'}));
        }

        let newPost = await new Post({userId, title, text, active: true});
        await newPost.save(function (err, ans) {
            if (err) {
                res.end(JSON.stringify({msg: 'ERROR2'}));
                console.log('Error2')
            } else {
                console.log(ans)
            }
        })

        res.end(JSON.stringify({msg: 'SAVE'}));
    })()
});


app.post('/users/new', function (req, res) {        //Use
    (async()=>{
        const {nick, email, password} = req.body;

        if(!nick || !email || !password || Object.keys(req.body).length !== 3) {
            res.end(JSON.stringify({msg: 'ERROR'}));
        }

        let check = await User.find({$or: [{nick}, {email}]});

        if (check.length === 0) {
            let newUser = await new User({nick, email, password, avatar: 'false', active: true, admin: false});
            await newUser.save(function (err) {
                if (err) return console.error(err);
            })

            let token = jwt.sign({_id: newUser._id, nick, email, avatar: 'false', active: true, admin: false}, config.secret);
            res.end(JSON.stringify({_id: newUser._id, nick, email, avatar: 'false', active: true, admin: false , token}));
        }

        else {
            res.end(JSON.stringify({msg: 'USER_OR_EMAIL_EXIST'}));
        }
    })()
});


app.post('/users/get', function (req, res) {        //Use
    (async()=>{
        const {email, password} = req.body;

        if(!email || !password || Object.keys(req.body).length !== 2) {
            res.end(JSON.stringify({msg: 'ERROR'}));
        }

        let user = await User.findOne({email, password});

        if (user && user.active) {
            let {_id, nick, email, avatar, active, admin} = user;

            let token = jwt.sign({ _id, nick, email, avatar, active, admin }, config.secret);
            res.end(JSON.stringify({_id, nick, email, avatar, active, admin, token}));
            
        } else {
            res.end(JSON.stringify({msg: 'SOMETHING_WRONG'}));
        }
    })()
});



app.post('/', function (req, res) {                 //Use
    (async ()=>{
        if (req.headers.authorization) {
            const token = req.headers.authorization.slice('Bearer '.length);
            let decoded;
            try {
                decoded = jwt.verify(token, config.secret);
            } catch(err) {
                console.log('\n\nWRONG__JWT\n\n');
                res.end(JSON.stringify({msg: 'WRONG_JWT'}));
            }
            

            const {nick, email} = decoded;
            
            let user = await User.findOne({nick, email});
                if (user && user.active) {
                    let {_id, nick, email, avatar, active, admin} = user;

                    res.end(JSON.stringify({_id, nick, email, avatar, active, admin, token}));
                }
        }
        res.end(JSON.stringify({msg: 'NO_JWT'}));
    })();
});


// app.get('/', function (req, res) {
//     res.end('Hello World!');
// });

app.listen(4000, function () {
    console.log('Example app listening on port 4000!');
});













// (async ()=>{
//     let ans = await new User({nick: 'Dima Arulov', email: 'dima@gmail.com', password: '12345678', avatar: 'false', active: true, admin: true})
//         await ans.save();
//     let ans1 = await new User({nick: 'Vasya 123', email: 'vasya@gmail.com', password: '1234', avatar: 'false', active: true, admin: false})
//         await ans1.save();
//     let ans2 = await new User({nick: 'Nikita black', email: 'ktoto@gmail.com', password: '2234', avatar: 'false', active: true, admin: false})
//         await ans2.save();
//     let ans3 = await new User({nick: 'Super Person', email: 'rreett@gmail.com', password: '3234', avatar: 'false', active: true, admin: false})
//         await ans3.save();
//     let ans4 = await new User({nick: 'Cat and Dog', email: 'catdog1@gmail.com', password: '4234', avatar: 'false', active: true, admin: false})
//         await ans4.save();
//     let ans5 = await new User({nick: 'Tanks Player', email: 'tank@gmail.com', password: '5234', avatar: 'false', active: true, admin: false})
//         await ans5.save();
// })();

// (async ()=>{
//     let _id= "5f23ac2c665c69301c8a2367";   
//     let newPost = await new Post({userId: _id, title: 'Java', text: '"At vero eos et accusamus et iusto odio dignissimos ducimus quirsus mi at, aliquam mauris. Integer tortor ipsum, bibendum nec odio eu, aliquam interdum odio. Nunc urna magna, volutpat vitae dignissim sed, euismod in elit. Nam nibh lacus, vestibulum vel nulla porttitor, aliquam fringilla enim. Sed tristique justo quis odio facilisis, at porttitor dui suscipit. Proin suscipit mattis urna vitae bibendum. Maecenas aliquam quam vel ex hendrerit mattis. Etiam lorem est, ullamcorper et placerat quis, venenatis vitae odio. Vestibulum vestibulum placerat leo, in hendrerit nisi semper nec. blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias', active: true});
//         await newPost.save(); 
//     let newPost1 = await new Post({userId: _id, title: 'JavaScript', text: 'Fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minu', active: true});
//         await newPost1.save();
//     let newPost2 = await new Post({userId: _id, title: 'Super Game', text: '"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue rsus mi at, aliquam mauris. Integer tortor ipsum, bibendum nec odio eu, aliquam interdum odio. Nunc urna magna, volutpat vitae dignissim sed, euismod in elit. Nam nibh lacus, vestibulum vel nulla porttitor, aliquam fringilla enim. Sed tristique justo quis odio facilisis, at porttitor dui suscipit. Proin suscipit mattis urna vitae bibendum. Maecenas aliquam quam vel ex hendrerit mattis. Etiam lorem est, ullamcorper et placerat quis, venenatis vitae odio. Vestibulum vestibulum placerat leo, in hendrerit nisi semper nec. pleasure rationally encounter consequences that are extremely painful.', active: true});
//         await newPost2.save();
//     let newPost3 = await new Post({userId: _id, title: 'Callback', text: '"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.', active: true});
//         await newPost3.save();
//     let newPost4 = await new Post({userId: _id, title: 'Yes, it is code', text: 'Integer vel metus imperdiet, cursus mi at, aliquam mauris. Integer tortor ipsum, bibendum nec odio eu, aliquam interdum odio. Nunc urna magna, volutpat vitae dignissim sed, euismod in elit. Nam nibh lacus, vestibulum vel nulla porttitor, aliquam fringilla enim. Sed tristique justo quis odio facilisis, at porttitor dui suscipit. Proin suscipit mattis urna vitae bibendum. Maecenas aliquam quam vel ex hendrerit mattis. Etiam lorem est, ullamcorper et placerat quis, venenatis vitae odio. Vestibulum vestibulum placerat leo, in hendrerit nisi semper nec.', active: true});
//         await newPost4.save();
//     let newPost5 = await new Post({userId: _id, title: 'My dog', text: 'Integer vel metus imperdiet, cursus mi at, aliquam mauris. Integer tortor ipsum, bibendum nec odio eu, aliquam interdum odio. Nunc urna magna, volutpat vitae dignissim sed, euismod in elit. Nam nibh lacus, vestibulum vel nulla porttitor, aliquam fringilla enim. Sed tristique justo quis odio facilisis, at porttitor dui suscipit. Proin suscipit mattis urna vitae bibendum. Maecenas aliquam quam vel ex hendrerit mattis. Etiam lorem est, ullamcorper et placerat quis, venenatis vitae odio. Vestibulum vestibulum placerat leo, in hendrerit nisi semper nec.', active: true});
//         await newPost5.save();
//     let newPost6 = await new Post({userId: _id, title: 'Super Robot', text: 'Maecenas venenatis eros tortor, id ullamcorper mi hendrerit vel. Nunc aliquet venenatis odio pellentesque tempor. Nunc convallis enim in velit imperdiet, quis maximus ligula ullamcorper. Integer in mauris laoreet, viverra lectus sed, accumsan nunc. Duis ac mi vestibulum, sagittis nisi ut, fringilla velit. Vivamus a lacus ac nibh lacinia placerat non id felis. Etiam nec ante rhoncus, egestas tellus id, interdum tortor.', active: true});
//         await newPost6.save();
//     let newPost7 = await new Post({userId: _id, title: 'Maybe yes', text: 'Fuga. Et harum quidem rerumo you how all this mistaken idea ofInteger vel metus imperdiet, cursus mi at, aliquam mauris. Integer tortor ipsum, bibendum nec odio eu, aliquam interdum odio. Nunc urna magna, volutpat vitae dignissim sed, euismod in elit. Nam nibh lacus, vestibulum ve denouncing pleasure  facilis est et expedita distinctio. Nam libero tempore, rsus mi at, aliquam mauris. Integer tortor ipsum, bibendum nec odio eu, aliquam interdum odio. Nunc urna magna, volutpat vitae dignissim sed, euismod in elit. Nam nibh lacus, vestibulum vel nulla porttitor, aliquam fringilla enim. Sed tristique justo quis odio facilisis, at porttitor dui suscipit. Proin suscipit mattis urna vitae bibendum. Maecenas aliquam quam vel ex hendrerit mattis. Etiam lorem est, ullamcorper et placerat quis, venenatis vitae odio. Vestibulum vestibulum placerat leo, in hendrerit nisi semper nec. cum soluta nobis est eligendi optio cumque nihil impedit quo minu', active: true});
//         await newPost7.save();
//     let newPost8 = await new Post({userId: _id, title: 'But no', text: 'Integer vel metus imperdiet, cursus mi at, aliquam mauris. Integer tortor ipsum, bibendum nec odio eu, aliquam interdum odio. Nunc urna magna, volutpat vitae dignissim sed, euismod in elit. Nam nibh lacus, vestibulum vel nulla porttitor, aliquam fringilla enim. Sed tristique justo quis odio facilisis, at porttitor dui suscipit. Proin suscipit mattis urna vitae bibendum. Maecenas aliquam quam vel ex hendrerit mattis. Etiam lorem est, ullamcorper et placerat quis, venenatis vitae odio. Vestibulum vestibulum placerat leo, in hendrerit nisi semper nec.', active: true});
//         await newPost8.save();
//     let newPost9 = await new Post({userId: _id, title: 'Yes, it is code', text: 'Integer vel metus imperdiet, cursus mi at, aliquam mauris. Integer tortor ipsum, bibendum nec odio eu, aliquam interdum odio. Nunc urna magna, volutpat vitae dignissim sed, euismod in elit. Nam nibh lacus, vestibulum vel nulla porttitor, aliquam fringilla enim. Sed tristique justo quis odio facilisis, at porttitor dui suscipit. Proin suscipit mattis urna vitae bibendum. Maecenas aliquam quam vel ex hendrerit mattis. Etiam lorem est, ullamcorper et placerat quis, venenatis vitae odio. Vestibulum vestibulum placerat leo, in hendrerit nisi semper nec.', active: true});
//         await newPost9.save();
// })();
