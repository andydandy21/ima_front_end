import { Link } from "react-router-dom"


export default function Resgister() {
    return (
        <div>
            <h1 className="form-title">Register</h1> 
            <form className="form-flow">
                <input placeholder="username"/>
                <input placeholder="email"/>
                <input placeholder="password"/>
                <input placeholder="password (again)"/>
                <div className="form-flow">
                    <p>Already have an account? <Link to='/login'>Click here</Link></p>
                    <button>Submit</button>
                </div>
            </form>
        </div>
    )
}