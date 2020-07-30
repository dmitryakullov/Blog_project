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
        
        if (!res.ok) {
            throw new Error(`COULD_NOT_GET_DATA`);
        } else{
            return await res.json();
        }
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
        
        if (!res.ok) {
            throw new Error(`COULD_NOT_GET_DATA`);
        } else{
            return await res.json();
        }
    }
    
    createPost = async (_id, title, text) => {
        let res = await fetch("/posts/new", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({_id, title, text})
        })
        
        if (!res.ok) {
            throw new Error(`COULD_NOT_GET_DATA`);
        } else{
            return await res.json();
        }
    }
    
    updatePost = async (userId, title, text) => {
        let res = await fetch("/posts/update", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({userId, title, text})
        })
        
        if (!res.ok) {
            throw new Error(`COULD_NOT_GET_DATA`);
        } else{
            return await res.json();
        }
    }
    deletePost = async (_id) => {
        let res = await fetch("/posts/delete", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "DELETE",
            body: JSON.stringify({_id})
        })
        
        if (!res.ok) {
            throw new Error(`COULD_NOT_GET_DATA`);
        } else{
            return await res.json();
        }
    }


    getJWT = async (JWT) => {
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

    findUser = async (nick) => {
        let res = await fetch("/users/findone", {
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

    
    getPosts = async (skip, userId) => {
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
    

    findPosts = async (find) => {
        let res = await fetch("/posts/find", {
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

    findAmountPosts = async () => {
        let res = await fetch("/posts/count",{method: 'PUT'});
        if (!res.ok) {
            throw new Error(`COULD_NOT_GET_DATA`);
        } else{
            return await res.json();
        }
    }
}


