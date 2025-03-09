import React from 'react'
import { useState } from 'react'
import '../App.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:2027/auth/login", {
            email,
            password
        }).then(response => {
            if (response.data.status) {
                navigate('/dashboard')
            }
        }).catch(error => {
            console.log(error.response)
        })
    }
    return (
        <div class='Sign-up'>
            <form class='sign-up-form' onSubmit={handleSubmit}>
                <h2>Log in to system</h2>
                <label>Email</label>
                <input type='email' autoComplete='off' placeholder='Email address'
                    onChange={(e) => setEmail(e.target.value)} />

                <label>Password</label>
                <input type='password' autoComplete='off' placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)} />

                <div class='button-container'>
                    <button type='submit'>Log in</button>
                </div>
                <div class='forgotpass'>
                    <Link to='/forgotPassword'>Forgot password?</Link>
                </div>
                <h5>or</h5>
                <div class='link'>
                    <button>
                        <Link to='/signup' className="custom-link">Create new account</Link>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default login