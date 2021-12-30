import React from "react"
import { Link, useNavigate } from "react-router-dom"


export default function Resgister() {

    const navigate = useNavigate()

    const [formData, setFormData] = React.useState({
        'profile_name': '',
        'email':'',
        'password1':'',
        'password2': '',
    })

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

    function register(event) {
        event.preventDefault()
        fetch(`${process.env.REACT_APP_BACKEND_URL}dj-rest-auth/registration/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(formData)
        }).then(res => {
            console.log(res.status)
            if (res.status === 400) {
                res.text().then(text => setErrorMessages(JSON.parse(text)))
            }else if (res.status === 201) {
                navigate('/verify-email')
            } else {
                return res.json()
            }
        }).then(data => {
            console.log(data)
        }).catch(error => console.error(error))
    }

    const emailMessages = errorMessages.hasOwnProperty('email') 
        ? errorMessages['email'].map(msg => <p className="error-msg">{msg}</p>) 
        : null
    const passwordMessages = errorMessages.hasOwnProperty('password1')
        ? errorMessages['password1'].map(msg => <p className="error-msg">{msg}</p>) 
        : null
    const miscMessages = errorMessages.hasOwnProperty('non_field_errors') 
        ? errorMessages['non_field_errors'].map(msg => <p className="error-msg">{msg}</p>) 
        : null

    return (
        <div>
            <h1 className="form-title">Register</h1> 
            <form className="form-flow" onSubmit={register}>
                <input type="text" placeholder="username" name='profile_name' onChange={changeFormData} required />
                <input type="email" placeholder="email" name='email' onChange={changeFormData} required />
                {emailMessages && <div className="error-box">{emailMessages}</div>}
                <input type="password" placeholder="password" name='password1' onChange={changeFormData} required />
                {passwordMessages && <div className="error-box">{passwordMessages}</div>}
                <input type="password" placeholder="password (again)" name='password2' onChange={changeFormData} required />
                {miscMessages && <div className="error-box">{miscMessages}</div>}
                <div className="form-flow">
                    <p>Already have an account? <Link to='/login'>Click here</Link></p>
                    <button>Submit</button>
                </div>
            </form>
        </div>
    )
}