import React from 'react'
import { useState } from 'react'
import '../App.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import PasswordChecklist from "react-password-checklist"

const signup = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [Confirmpassword, setConfirmPassword] = useState('');
    const [showChecklist, setShowChecklist] = useState(false);


    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:2027/auth/signup", {
            username,
            email,
            password
        }).then(response => {
            if (response.data.status) {
                navigate('/login')
            }
        }).catch(error => {
            console.log(error.response)
        })
    }
    return (
        <div class='Sign-up'>
            <form class='sign-up-form' onSubmit={handleSubmit}>
                <h2>Create a new account</h2>
                <label>Username</label>
                <input type='text' placeholder='Username'
                    onChange={(e) => setUsername(e.target.value)} />

                <label>Email</label>
                <input type='email' autoComplete='off' placeholder='Email address'
                    onChange={(e) => setEmail(e.target.value)} />

                <label>Password</label>
                <input type='password' autoComplete='off' placeholder='New password'
                onFocus={() => setShowChecklist(true)}
                    onChange={(e) => setPassword(e.target.value)} />

                <label>Confirm password</label>
                <input type='password' autoComplete='off' placeholder='Confirm password'
                    onChange={(e) => setConfirmPassword(e.target.value)} />

                {showChecklist && (
                    <PasswordChecklist
                        rules={["minLength", "specialChar", "number", "capital", "match"]}
                        minLength={8}
                        value={password}
                        valueAgain={Confirmpassword}
                        iconComponents={{
                            valid: <span className="valid-icon">✔</span>,
                            invalid: <span className="invalid-icon">✘</span>,
                          }}
                    />
                )}

                <div class='button-container'>
                    <button type='submit'>Sign up</button>
                </div>
                <div class='link'>
                    <Link to='/login'>Already have an account?</Link>
                </div>
            </form>
        </div>
    )
}

export default signup