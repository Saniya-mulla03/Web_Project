import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/store/useAuth";
import {toast} from "react-toastify";

const URL = "http://localhost:5000/api/auth/login";

export const Login = () => {

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const {storeTokenInLS} = useAuth();

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body:JSON.stringify(user),
            });

            //console.log("login form", response);
            const res_data = await response.json();
            if(response.ok){
                // alert("Login Successfully");
                storeTokenInLS(res_data.token);
                setUser({email: "", password: ""});
                toast.success("Login Successfull");
                navigate("/");
            }else{
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
                console.log("invalid credential");
            }
        } catch(error){
            console.log(user);
        }
    }

    return <>
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="registration-image">
                            <img src="/images/notify.jpg" alt="image" width="500" height="500"></img>
                        </div>
                        <div className="registration-form">
                            {/* registration form */}
                            <h1 className="main-heading mb-3">𝑳𝒐𝒈𝒊𝒏 𝑭𝒐𝒓𝒎</h1>
                            <br/>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="labels">email</label>
                                    <input 
                                        type="email" 
                                        name="email"  
                                        placeholder="enter your email" 
                                        id="email" 
                                        required 
                                        autoComplete="off"
                                        value={user.email}
                                        onChange={handleInput}
                                     />
                                </div>
                                <div>
                                    <label htmlFor="password" className="labels">password</label>
                                    <input 
                                        type="password" 
                                        name="password"  
                                        placeholder="enter your password" 
                                        id="password" 
                                        required 
                                        autoComplete="off"
                                        value={user.password}
                                        onChange={handleInput}
                                     />
                                </div>
                                <br/>
                                <button type="submit" className="btn btn-submit">Login Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    </>
}