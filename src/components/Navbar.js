import Navlink from "./Navlink";


export default function Navbar() {

    return (
        <nav className="navbar">
            <Navlink to='/'></Navlink>
            <Navlink to='/room1'></Navlink>
            <Navlink to='/room2'></Navlink>
            <Navlink to='/room3'></Navlink>
        </nav>
    )
}