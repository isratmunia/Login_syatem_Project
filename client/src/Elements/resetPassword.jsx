import React from 'react'
import { useState } from 'react'
import '../App.css'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PasswordChecklist from "react-password-checklist"

const resetPassword = () => {
    const [password, setPassword] = useState('')
    const [Confirmpassword, setConfirmPassword] = useState('');
    const [showChecklist, setShowChecklist] = useState(false);
    const { token } = useParams()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:2027/auth/resetPassword/${token}`, {
            password,
        }).then(response => {
            if (response.data.status) {
                navigate('/login')
            }
            console.log(response.data)
        }).catch(error => {
            console.log(error.response)
        })
    }
    return (
        <div class='Sign-up'>
            <form class='sign-up-form' onSubmit={handleSubmit}>
                <h2>Reset your password</h2>

                <label>New password</label>
                <input type='password' autoComplete='off' placeholder='Password'
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
                    <button type='submit'>Reset</button>
                </div>
            </form>
        </div>
    )
}

export default resetPassword