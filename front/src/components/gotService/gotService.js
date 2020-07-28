export default class gotService {

    getCheckIn(nick, email, password) {
        fetch("/checkinform", {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({nick, email, password})
        })
    }
}