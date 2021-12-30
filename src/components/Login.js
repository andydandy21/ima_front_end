import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


export default function Login() {

    const navigate = useNavigate()
    const [formData, setFormData] = React.useState({
        'email':'',
        'password':'',
    })
    const [rememberMe, setRememberMe] = React.useState(false)
    const [errorMessages, setErrorMessages] = React.useState({})

    function changeFormData(event) {
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    function login(event) {
        event.preventDefault()
        fetch(`${process.env.REACT_APP_BACKEND_URL}dj-rest-auth/login/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(res => {
            if (res.status !== 200) {
                return res.text().then(text => {throw JSON.parse(text)})
            }
            return res.json()
        }).then(data => {
            localStorage.setItem('remember_me', JSON.stringify(rememberMe))
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('refresh_token', data.refresh_token)
            navigate('/')

        }).catch(error => {
            setErrorMessages(error)
        })
    }

    const emailMessages = errorMessages.hasOwnProperty('email') 
        ? errorMessages['email'].map(msg => <p className='error-msg'>{msg}</p>)
        : null
    const passwordMessages = errorMessages.hasOwnProperty('password') 
        ? errorMessages['password'].map(msg => <p className='error-msg'>{msg}</p>)
        : null
    const miscMessages = errorMessages.hasOwnProperty('non_field_errors') 
        ? errorMessages['non_field_errors'].map(msg => <p className='error-msg'>{msg}</p>)
        : null


    return (
        <div>
            <h1 className="form-title">Login</h1> 
            <form className='form-flow' onSubmit={login}>
                <input name='email' type='email' placeholder="email" onChange={changeFormData} />
                {emailMessages && <div className='error-box'>{emailMessages}</div>}
                <input name='password' type='password' placeholder="password" onChange={changeFormData} />
                {passwordMessages && <div className='error-box'>{passwordMessages}</div>}
                {miscMessages && <div className='error-box'>{miscMessages}</div>}
                <div className='form-flow'>
                    <p>Forgot your password? <Link to="/password-reset">reset password</Link></p>
                    <button>Submit</button>
                </div>
            </form>
            <input type='checkbox' id='remember-me' onChange={() => setRememberMe(prev => !prev)} checked={rememberMe} />
            <label htmlFor='remember-me' value='true'>Remember me</label>
            <div className='custom-hr'/>
            <div className='new-account-container'>
                <Link to='/register'><button className='new-account'>Create a new account</button></Link>
                <p>or</p>
                <img className='google-signin' />
            </div>
        </div>
    )
}