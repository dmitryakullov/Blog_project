export default class gotService {

    makeCheckIn = async (nick, email, password) => {  //Use
        let res = await fetch("/users/new", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({nick, email, password})
        })
        
        if (!res.ok) {
            throw new Error(`COULD_NOT_GET_DATA`);
        } else{
            return await res.json();
        }
    }

    makeEnter = async (email, password) => {  //Use
        let res = await fetch("/users/get", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({email, password})
        })
        
        if (!res.ok) {
            throw new Error(`COULD_NOT_GET_DATA`);
        } else{
            return await res.json();
        }
    }
    
    createPost = async (token, userId, title, text) => {  //Use
        let res = await fetch("/posts/new", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({token, userId, title, text})
        })
        
        if (!res.ok) {
            throw new Error(`COULD_NOT_GET_DATA`);
        } else{
            return await res.json();
        }
    }
    
    updatePost = async (token, userId, _id, title, text) => {  //Use
        let res = await fetch("/posts/update", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({token, userId, _id, title, text})
        })
        
        if (!res.ok) {
            throw new Error(`COULD_NOT_GET_DATA`);
        } else{
            return await res.json();
        }
    }
    deletePost = async (_id, userId, token) => {  //Use
        let res = await fetch("/posts/delete", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "DELETE",
            body: JSON.stringify({_id, userId, token})
        })
        
        if (!res.ok) {
            throw new Error(`COULD_NOT_GET_DATA`);
        } else{
            return await res.json();
        }
    }


    getJWT = async (JWT) => {  //Use
        let res = await fetch("/", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + JWT
            }
        })
        
        if (!res.ok) {
            throw new Error(`COULD_NOT_GET_DATA`);
        } else{
            return await res.json();
        }
    }

    
    deleteUser = async (_id) => {
        let res = await fetch("/users/delete", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({_id})
        })
        
        if (!res.ok) {
            throw new Error(`COULD_NOT_GET_DATA`);
        } else{
            return await res.json();
        }
    }

    findUser = async (skip, token, userId, nickOrEmail) => {     //Use
        let res = await fetch("/user/find", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({skip, token, userId, nickOrEmail})
        })
        
        if (!res.ok) {
            throw new Error(`COULD_NOT_GET_DATA`);
        } else{
            return await res.json();
        }
    }

    
    getPosts = async (skip, userId) => {    //Use
        let res = await fetch("/posts/get", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({skip, userId})
        })
        
        if (!res.ok) {
            throw new Error(`COULD_NOT_GET_DATA`);
        } else{
            return await res.json();
        }
    }

    getUserById = async (id) => {
        let res = await fetch(`/users/${id}`, {method: "PUT"});
        if (!res.ok) {
            throw new Error(`COULD_NOT_GET_DATA`);
        } else{
            return await res.json();
        }
    }
    

    findUsersAndPosts = async (find) => {   //Use
        let res = await fetch("/posts&users/find", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({find})
        })
        if (!res.ok) {
            throw new Error(`COULD_NOT_GET_DATA`);
        } else{
            return await res.json();
        }
    }

    findAmountPosts = async () => {  //Use
        let res = await fetch("/posts/count",{method: 'PUT'});
        if (!res.ok) {
            throw new Error(`COULD_NOT_GET_DATA`);
        } else{
            return await res.json();
        }
    }
    findAmountUsersPosts = async (userId, skip, firstTime) => { //Use
        let res = await fetch("/user/findposts", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({userId, skip, firstTime})
        })
        if (!res.ok) {
            throw new Error(`COULD_NOT_GET_DATA`);
        } else{
            return await res.json();
        }
    }
    
    restoreOrDelete = async (nick) => {
        let res = await fetch("/user/restore_delete", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({nick})
        })
        
        if (!res.ok) {
            throw new Error(`COULD_NOT_GET_DATA`);
        } else{
            return await res.json();
        }
    }

}


