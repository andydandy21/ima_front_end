import Navlink from "./Navlink";
import Logout from "./Logout";


export default function Navbar() {

    return (
        <nav className="navbar">
            <div className="navbar">
                <Navlink to='/'></Navlink>
                <Navlink to='/room1'></Navlink>
                <Navlink to='/room2'></Navlink>
                <Navlink to='/room3'></Navlink>
            </div>
            <Logout />
        </nav>
    )
}