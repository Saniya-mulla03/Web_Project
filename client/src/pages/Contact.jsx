import { useState } from "react";
import { useAuth } from "../components/store/useAuth";
import {toast} from "react-toastify";

const defaultContactFormData = {
    studentName: "",
    email: "",
    message: "",
};

export const Contact = () => {

    const [contact, setContact] = useState(defaultContactFormData);

    const [userData, setUserData] = useState(true);
    
    const {user} = useAuth();

    if(userData && user){
        setContact({
            studentName: user.studentName,
            email: user.email,
            message: "",
        });
        setUserData(false);
    }

    // lets tackle our handleInput
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setContact({
            ...contact,
            [name]: value,
        });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            const response = await fetch("http://localhost:5000/api/form/contact", {
                method: "POST",
                headers: {
                    'Content-Type':"application/json"
                },
                body:JSON.stringify(contact),
            });

            if(response.ok){
                setContact(defaultContactFormData);
                const data = await response.json();
                console.log(data);
                toast.success("Message send successfully");
            }
        } catch (error) {
            toast.error("Message not send");
            console.log(error);
        }
    };

    return <>
        <section className="section-contact">
            <div className="contact-content container">
                <h1 className="main-heading">𝑪𝒐𝒏𝒕𝒂𝒄𝒕 𝑼𝒔</h1>
            </div>
            {/* contact page */}
            <div className="container grid grid-two-cols">
                <div className="contact-img">
                    <img src="/images/notify.jpg" alt="image"></img>
                </div>
                {/* contact content */}
                <section>
                    <form action="https://formspree.io/f/meqyvvaw" method="POST" className="section-form" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="studentName">studentName</label>
                            <input 
                                type="text" 
                                name="studentName"
                                id="studentName"
                                autoComplete="off"
                                value={contact.studentName}
                                onChange={handleInput}
                                required   
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="email">email</label>
                            <input 
                                type="email" 
                                name="email"
                                id="email"
                                value={contact.email}
                                onChange={handleInput}
                                autoComplete="off"
                                required   
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="message">message</label>
                            <textarea 
                                name="message" 
                                id="message" 
                                autoComplete="off"
                                required
                                value={contact.message}
                                onChange={handleInput}
                                cols="30" 
                                rows="5"
                            ></textarea>
                        </div>
                        
                        <div>
                            <button type="submit">submit</button>
                        </div>
                    </form>
                </section>
            </div>

            <section className="mb-3">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.8930404340317!2d74.467805074918!3d16.68223498408959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc0e26e0a8944ed%3A0x2abc23be634e333f!2sDKTE%20Society&#39;s%20Textile%20%26%20Engineering%20Institute%20(An%20Empowered%20Autonomous%20Institute)!5e0!3m2!1sen!2sin!4v1715608271180!5m2!1sen!2sin" 
                    title="DKTE Society's Textile & Engineering Institute Location"
                    width="100%" 
                    height="300" 
                    style={{ border: "0"}}
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </section>
        </section>
    </>
}