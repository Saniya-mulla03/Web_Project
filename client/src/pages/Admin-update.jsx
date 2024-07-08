import { useState, useCallback, useEffect } from "react";
import {toast} from "react-toastify";
import { useAuth } from "../components/store/useAuth";
import { useParams } from "react-router-dom";

export const AdminUpdate = () => {
    const {authorizationToken} = useAuth();
    const params = useParams();
    //console.log("params single user: ", params);
    const [data, setData] = useState({
        prn: "",
        studentName: "",
        email: "",
        phone: "",
    });

    const getSingleUserData = useCallback(async() => {
        try {
            const response = await fetch('https://campus-info-server.onrender.com', {
                method: "GET",
                headers:{
                    Authorization: authorizationToken
                },
            });
            const data = await response.json();
            //console.log(`users ${data}`);
            setData(data);
        
        } catch (error) {
            console.log(error);
        }
    },[authorizationToken, params.id]);

    useEffect(() => {
        getSingleUserData();
    }, [getSingleUserData]);

    // handling the input values
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setData({
            ...data,
            [name]: value,
        })
    };

    // to update data dynamically
    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://campus-info-server.onrender.com', {
                    method: "PATCH",
                    headers:{
                        "Content-Type": "application/json",     
                        Authorization: authorizationToken,
                    },
                    body: JSON.stringify(data),
                }
            );
            if(response.ok){
                toast.success("Updated Successfully");
            }else{
                toast.error("Not Updated");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <section className="section-contact">
                <div className="contact-content container">
                    <h1 className="main-heading">Update User Data</h1>
                </div>
                <div className="container grid grid-two-cols">
                    <section className="section-form">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="PRN">PRN</label>
                                <input
                                    type="text"
                                    name="prn"
                                    id="prn"
                                    autoComplete="off"
                                    value={data.prn}
                                    onChange={handleInput}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="studentName">Student Name</label>
                                <input
                                    type="text"
                                    name="studentName"
                                    id="studentName"
                                    autoComplete="off"
                                    value={data.studentName}
                                    onChange={handleInput}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="off"
                                    value={data.email}
                                    onChange={handleInput}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="phone">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    autoComplete="off"
                                    value={data.phone}
                                    onChange={handleInput}
                                    required
                                />
                            </div>
                            <br/>
                            <div>
                            <button type="submit">Update</button>
                            </div>
                        </form>
                    </section>
                </div>
            </section>
        </>
    )
}
