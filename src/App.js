import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";


export default function App() {

    window.addEventListener('storage', () => window.location.reload())

    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = React.useState()

    React.useEffect(() => {
        if (getCookie('loginstatus') !== 'loggedin' 
        && JSON.parse(localStorage.getItem('remember_me')) === false) {            
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            navigate('/login')
        } else if (tokenVerifyOrRefresh()) {
            createCurrentUserState()
        }
    }, [])

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
    }

    async function tokenVerifyOrRefresh() {
        
        let tokenVerify = ''
        let tokenRefresh = ''

        tokenVerify = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}dj-rest-auth/token/verify/`, 
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    'token': JSON.parse(localStorage.getItem('access_token'))
                })
            }
        ).then(res => res.json())

        if (tokenVerify.code === 'token_not_valid') {
            tokenRefresh = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}dj-rest-auth/token/refresh/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        'refresh': JSON.parse(localStorage.getItem('refresh_token'))
                    })
                }
            ).then(res => res.json())
        } else {
            return true
        }
        if (tokenRefresh.code === 'token_not_valid') {
            console.log(tokenRefresh)
            return false
        } else {
            localStorage.setItem('refresh_token', JSON.stringify(tokenRefresh.refresh))
            localStorage.setItem('access_token', JSON.stringify(tokenRefresh.access))
            return true
        }

    }

    async function createCurrentUserState() {
        let userId = await fetch(`${process.env.REACT_APP_BACKEND_URL}dj-rest-auth/user/`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('access_token'))}`
            }
        }).then(res => res.json()).then(data => data.pk)

        fetch(`${process.env.REACT_APP_BACKEND_URL}users/${userId}/`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            }
        }).then(res => res.json()).then(data => setCurrentUser(data))
    }

    const context = {
        user: currentUser
    }

    return(
        <div className='app'>
            <Navbar />
            {currentUser && <Outlet context={ context }/>}
        </div>
    )
}