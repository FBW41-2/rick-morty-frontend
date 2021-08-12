import { useState } from "react";
import axios from "axios"

export default function() {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    async function onSubmit(e) {
        e.preventDefault()
        try {
            const res = await axios.post('/users/login', {user, password})
            const token = res.headers['x-auth']
            if ( ! token ) throw new Error('login failed');
            // login successfull
            axios.defaults.headers.common['x-auth'] = token;
            // TODO: store token in localStorage
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <input type="text" value={user} onChange={(e)=>setUser(e.target.value)} name="user" />
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} name="password" />
            <input type="submit" value="log in" />
        </form>
    )
}
