import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";


export default function VerifyEmailKey() {

    const params = useParams()
    const navigate = useNavigate()
    const [responseMessage, setResponseMessage] = React.useState({})
    const [formEmail, setFormEmail] = React.useState('')
    const [errorMessages, setErrorMessages] = React.useState({})

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}dj-rest-auth/registration/verify-email/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({'key':params.key})
        }).then(res => res.json()).then(data => setResponseMessage(data))
        .catch(error => console.error(error))
    }, [])

    function resendEmail(event) {
        event.preventDefault();

        fetch(`${process.env.REACT_APP_BACKEND_URL}dj-rest-auth/registration/resend-email/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            }, 
            body: JSON.stringify({'email':formEmail})
        }).then(res => {
            if (res.status === 200) {
                navigate('/verify-email')
            } else if (res.status === 400) {
                return res.json()
            } else if (res.status === 500) {
                return 'Could not locate an account with that email'
            }
        }).then(data => setErrorMessages(data)).catch(error => console.error(error))
    }

    let responseElement
    if (responseMessage.hasOwnProperty('detail') && responseMessage['detail']==='ok') {
        responseElement = (
            <div>
                <h1 className="form-title">Success!</h1>
                <p>You're email has been successfully verified. <Link to='/login'>Click here</Link> to log in.</p>
            </div>
        )
    } else {
        responseElement = (
            <div>
                <h1 className="form-title">Oops! Something went wrong.</h1>
                <p>Enter your email below to receive another verification link</p>
                <form className="form-flow" onSubmit={resendEmail}>
                    <input type='email' placeholder="email" name='email' onChange={(event) => setFormEmail(event.target.value)}/>
                    {errorMessages && <div className="error-box">{errorMessages}</div>}
                    <button>Send</button>
                </form>
            </div>
        )
    }

    return (
        <div>
            {responseElement}
        </div>
    )
}