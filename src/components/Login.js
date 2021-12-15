import { Link } from 'react-router-dom'


export default function Login() {
    return (
        <div>
            <h1 className="form-title">Login</h1> 
            <form className='form-flow'>
                <input placeholder="email" />
                <input placeholder="password" />
                <div className='form-flow'>
                    <p>Forgot your password? <Link to="/password-reset">reset password</Link></p>
                    <button>Submit</button>
                </div>
            </form>
            <div className='custom-hr'/>
            <div className='new-account-container'>
                <Link to='/register'><button className='new-account'>Create a new account</button></Link>
                <p>or</p>
                <img className='google-signin' />
            </div>
        </div>
    )
}