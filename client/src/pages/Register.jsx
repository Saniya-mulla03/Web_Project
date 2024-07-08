import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../components/store/useAuth";
import {toast} from "react-toastify";

const URL = "https://campus-info-server.onrender.com";

export const Register = () => {

    const [user, setUser] = useState({
        prn: "",
        studentName: "",
        email: "",
        phone: "",
        password: "",
    });

    const navigate = useNavigate();

    const {storeTokenInLS} = useAuth();

    // handling the input values
    const handleInput = (e) => {
        //console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value, 
        });
    };

    // handling form submission
    
        const handleSubmit = async(e) => {
            e.preventDefault();
            //console.log(user);
        try{
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify(user),
            });
            const res_data = await response.json();
            //console.log("res from server", res_data.message);
            if(response.ok){
                storeTokenInLS(res_data.token);
                setUser({prn: "", studentName: "", email: "", phone: "", password: ""});
                toast.success("Registration Successfull");
                navigate("/");
            }else{
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        }
        catch (error){
            console.log("register", error);
        }
    }

    return (
        <>
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="section-registration-image">
                            <img src="/images/notify.jpg" alt="image" width="500" height="500"></img>
                        </div>
                        <div className="registration-form">
                            {/* registration form */}
                            <h1 className="main-heading mb-3">𝑹𝒆𝒈𝒊𝒔𝒕𝒓𝒂𝒕𝒊𝒐𝒏 𝑭𝒐𝒓𝒎</h1>
                            <br/>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="prn" className="labels">PRN</label>
                                    <input className="registration-form-input"
                                        type="text" 
                                        name="prn"  
                                        placeholder="prn" 
                                        id="prn" 
                                        required 
                                        autoComplete="off"
                                        value={user.prn}
                                        onChange={handleInput}
                                     />
                                </div>
                                <div>
                                    <label htmlFor="studentname" className="labels">student Name</label>
                                    <input className="registration-form-input"
                                        type="text" 
                                        name="studentName"  
                                        placeholder="studentName" 
                                        id="studentName" 
                                        required 
                                        autoComplete="off"
                                        value={user.studentName}
                                        onChange={handleInput}
                                     />
                                </div>
                                <div>
                                    <label htmlFor="email" className="labels">email</label>
                                    <input className="registration-form-input"
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
                                    <label htmlFor="phone" className="labels">phone</label>
                                    <input className="registration-form-input"
                                        type="text" 
                                        name="phone"  
                                        placeholder="enter your phone" 
                                        id="phone" 
                                        required 
                                        autoComplete="off"
                                        value={user.phone}
                                        onChange={handleInput}
                                     />
                                </div>
                                <div>
                                    <label htmlFor="password" className="labels">password</label>
                                    <input className="registration-form-input"
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
                                <button type="submit" className="btn btn-submit">Register Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    </>
    )
}
