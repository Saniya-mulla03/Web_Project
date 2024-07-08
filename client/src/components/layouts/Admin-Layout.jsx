import { NavLink, Outlet, Navigate} from "react-router-dom";
import {FaUser/*, FaRegListAlt, FaHome*/} from "react-icons/fa";
import {FaMessage} from "react-icons/fa6";
import { useAuth } from "../store/useAuth";

export const AdminLayout = () => {
    const {user, isLoading} = useAuth();
    //console.log("admin Layout: ",user);

    if(isLoading){
        return <h1>Loading...</h1>
    }

    if(user.isAdmin == "false"){
        console.log("Redirecting to home because user is not admin");
        return <Navigate to="/" />;
    }
    
    return (
        <>
            <header>
                <div className="container">
                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/admin/users"><FaUser/> users</NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/contacts"><FaMessage/> contacts</NavLink>
                            </li>
                            {/* <li>
                                <NavLink to="/campusInfo"><FaRegListAlt/> campusInfo</NavLink>
                            </li>
                            <li>
                                <NavLink to="/"><FaHome/> home</NavLink>
                            </li> */}
                        </ul>
                    </nav>
                </div>
            </header>
            <Outlet/>
        </>
    );
}