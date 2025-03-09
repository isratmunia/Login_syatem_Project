import React from 'react'
import { useState } from 'react'
import '../App.css'
import axios from 'axios'
import {Link,useNavigate} from 'react-router-dom'

const forgotPassword = () => {
    const [email, setEmail] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e)=> {
        e.preventDefault()
        axios.post("http://localhost:2027/auth/forgotPassword", {
            email,
        }).then(response => {
            if(response.data.status){
                alert("Email Sent!")
                    navigate('/login')
            }
        }).catch(error => {
            console.log(error.response)
        })
    }
    return (
        <div class='Sign-up'>
            <form class='sign-up-form' onSubmit={handleSubmit}>
                <h2>Forgot your password</h2>

                <label>Email</label>
                <input type='email' autoComplete='off' placeholder='Email address'
                    onChange={(e) => setEmail(e.target.value)} />

                <div class='button-container'>
                    <button type='submit'>Next</button>
                </div>
            </form>
        </div>
    )
}

export default forgotPassword