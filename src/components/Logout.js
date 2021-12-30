import React from 'react'

import { useNavigate } from 'react-router-dom'


export default function Logout() {

    const navigate = useNavigate()
    const [isLoggingOut, setIsLoggingOut] = React.useState(false)

    function logout(event) {
        event.preventDefault()
        setIsLoggingOut(prev => !prev)
    }

    function reallyLogout(event) {
        event.preventDefault()
        localStorage.setItem('remember_me', 'false')
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        document.cookie = 'loginstatus=loggedout'
        navigate('/login')
    }


    let doubleCheck = <div className="logout--double-check-container">
        <div className="logout--double-check">
            <h1>Are you sure you'd like to logout?</h1>
            <a onClick={logout} href="#">No, Cancel</a>
            <button onClick={reallyLogout}>Yes, logout</button>
        </div>
    </div>
    
    return (
        <div className="logout--container">
            <a onClick={logout} href="#">Logout</a>
            {isLoggingOut && doubleCheck}
        </div>
    )
}