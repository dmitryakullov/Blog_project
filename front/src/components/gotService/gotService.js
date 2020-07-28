export default class gotService {

    makeCheckIn = async (nick, email, password) => {
        let res = await fetch("/checkinform", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({nick, email, password})
        })
        
        if (!res.ok) {
            console.log(`Could not get data`);
        } else{
            return await res.json();
        }
    }

    makeEnter = async (email, password) => {
        let res = await fetch("/enterform", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({email, password})
        })
        
        if (!res.ok) {
            console.log(`Could not get data`);
        } else{
            return await res.json();
        }
    }
    
    createPost = async (_id, title, text) => {
        let res = await fetch("/createPost", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({_id, title, text})
        })
        
        if (!res.ok) {
            console.log(`Could not get data`);
        } else{
            return await res.json();
        }
    }
    
    updatePost = async (userId, title, text) => {
        let res = await fetch("/updatePost", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({userId, title, text})
        })
        
        if (!res.ok) {
            console.log(`Could not get data`);
        } else{
            return await res.json();
        }
    }
    deletePost = async (_id) => {
        let res = await fetch("/deletePost", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({_id})
        })
        
        if (!res.ok) {
            console.log(`Could not get data`);
        } else{
            return await res.json();
        }
    }
}
