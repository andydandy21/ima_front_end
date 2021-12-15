import { Link } from "react-router-dom";

export default function PasswordReset() {
    return (
        <div>
            <h1 className="form-title">Password Reset</h1>
            <p>
                Enter your email and we'll send you
                instructions to reset your password
            </p>
            <form className="form-flow"> 
                <input placeholder="email"/>
                <div className="form-flow">
                    <p><Link to='/login'>Cancel</Link></p>
                    <button>Send</button>
                </div>
            </form>
        </div>
    )
}