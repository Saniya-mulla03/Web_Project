import { NavLink } from "react-router-dom"
import "./Navbar.css";
import { useAuth } from "./store/useAuth";

export const Navbar = () => {
    const {isLoggedIn, user} = useAuth();
    const isAdminLoggedIn = user.isAdmin == "true";
    return <>
        <header>
            <div className="container">
                {/* <img src="/images/logo.jpg" style={{ height: '50px', width: '100px' }} alt="logo"></img> */}
                <div className="logo-brand">
                    <NavLink to="/">Web-Tech</NavLink>
                </div>
                <nav>
                    <ul>
                        <li> <NavLink to="/">Home</NavLink></li>
                        <li> <NavLink to="/about">About</NavLink></li>
                        <li> <NavLink to="/contact">Contact</NavLink></li>
                        {isLoggedIn ? (<><li> <NavLink to="/campusInfo">CampusInfo</NavLink></li>{user && isAdminLoggedIn && <li><NavLink to="/admin">Admin</NavLink></li>}<li> <NavLink to="/logout">Logout</NavLink></li></>) : <><li> <NavLink to="/register">Register</NavLink></li>
                            <li> <NavLink to="/login">Login</NavLink></li></> 
                        }
                    </ul>
                </nav>
            </div>
        </header>
    </>
}