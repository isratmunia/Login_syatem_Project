import react from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const dashboard = () => {
    const navigate = useNavigate()
    const handleLogOut = () => {
        axios.get('http://localhost:2027/auth/logout')
            .then(res => {
                if (res.data.status) {
                    navigate('/login')
                }
            }).catch(error => {
                console.log(error)
            })
    }

return (
    <div>
        <h2>Welcome to the Dashboard!</h2>
        <div class='link'>
            <button onClick={handleLogOut}>log out</button>
        </div>
    </div>
);
}

export default dashboard;