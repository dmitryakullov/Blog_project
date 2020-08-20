export default class gotService {

    makeCheckIn = async (nick, email, password) => {
        let res = await fetch("/users/new", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({nick, email, password})
        })
        
        if (!res.ok) throw new Error(`COULD_NOT_GET_DATA`);
        else return await res.json();
    }

    makeEnter = async (email, password) => {
        let res = await fetch("/users/get", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({email, password})
        })
        
        if (!res.ok) throw new Error(`COULD_NOT_GET_DATA`);
        else return await res.json();
    }
    
    createPost = async (token, userId, title, text) => {
        let res = await fetch("/posts/new", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({token, userId, title, text})
        })
        
        if (!res.ok) throw new Error(`COULD_NOT_GET_DATA`);
        else return await res.json();
    }
    
    updatePost = async (token, userId, _id, title, text) => {
        let res = await fetch("/posts/update", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({token, userId, _id, title, text})
        })
        
        if (!res.ok) throw new Error(`COULD_NOT_GET_DATA`);
        else return await res.json();
    }


    deletePost = async (_id, token, userId) => {
        let res = await fetch("/posts/delete", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "DELETE",
            body: JSON.stringify({_id, token, userId})
        })
        
        if (!res.ok) throw new Error(`COULD_NOT_GET_DATA`);
        else return await res.json();
    }


    getJWT = async (JWT) => {
        let res = await fetch("/", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + JWT
            }
        })
        
        if (!res.ok) throw new Error(`COULD_NOT_GET_DATA`);
        else return await res.json();
    }



    findUser = async (skip, token, userId, nickOrEmail) => {
        let res = await fetch("/user/find", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({skip, token, userId, nickOrEmail})
        })
        
        if (!res.ok) throw new Error(`COULD_NOT_GET_DATA`);
        else return await res.json();
    }

    
    getPosts = async (skip, userId) => {
        let res = await fetch("/posts/get", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({skip, userId})
        })
        
        if (!res.ok) throw new Error(`COULD_NOT_GET_DATA`);
        else return await res.json();
    }


    findUsersAndPosts = async (find) => {
        let res = await fetch("/posts&users/find", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({find})
        })

        if (!res.ok) throw new Error(`COULD_NOT_GET_DATA`);
        else return await res.json();
    }

    findAmountPosts = async () => {
        let res = await fetch("/posts/count",{method: 'PUT'});
        
        if (!res.ok) throw new Error(`COULD_NOT_GET_DATA`);
        else return await res.json();
    }

    findAmountUsersPosts = async (userId, skip, firstTime) => {
        let res = await fetch("/user/findposts", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({userId, skip, firstTime})
        })

        if (!res.ok) throw new Error(`COULD_NOT_GET_DATA`);
        else return await res.json();
    }
    
    deleteUser = async (_id, token) => {
        let res = await fetch("/user/delete", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({_id, token})
        })
        
        if (!res.ok) throw new Error(`COULD_NOT_GET_DATA`);
        else return await res.json();
    }

    getStatistics = async (token) => {
        let res = await fetch("/statistics", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({token})
        })
        
        if (!res.ok) throw new Error(`COULD_NOT_GET_DATA`);
        else return await res.json();
    }


    blockUnblock = async (_id, token) => {
        let res = await fetch("/user/block&unblock", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({_id, token})
        })
        
        if (!res.ok) throw new Error(`COULD_NOT_GET_DATA`);
        else return await res.json();
    }

    trackUser = async (token) => {
        let res = await fetch("/user/track", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({token})
        })
        
        if (!res.ok) throw new Error(`COULD_NOT_GET_DATA`);
        else return await res.json();
    }

    changeNickEmail = async (nick, email, token) => {
        let res = await fetch("/user/changenickemail", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({nick, email, token})
        })
        
        if (!res.ok) throw new Error(`COULD_NOT_GET_DATA`);
        else return await res.json();
    }

    changePassword = async (oldPass, NewPass, token) => {
        let res = await fetch("/user/changepassword", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({oldPass, NewPass, token})
        })
        
        if (!res.ok) throw new Error(`COULD_NOT_GET_DATA`);
        else return await res.json();
    }

    deletePicture = async (token) => {
        let res = await fetch("/user/changepassword", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({token})
        })
        
        if (!res.ok) throw new Error(`COULD_NOT_GET_DATA`);
        else return await res.json();
    }

    header = {};
}