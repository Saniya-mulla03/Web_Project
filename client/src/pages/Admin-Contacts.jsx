import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../components/store/useAuth";
import { toast } from "react-toastify";

export const AdminContacts = () => {
    const {authorizationToken} = useAuth();
    const [contactData, setContactData] = useState([]);

    const getContactsData = useCallback(async() => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/contacts", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });
            const data = await response.json();
            //console.log(data);
            if(response.ok){
                setContactData(data);
            }
        } catch (error) {
            console.log(error);
        }
    }, [authorizationToken]);

    const deleteContactById = async(id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: authorizationToken,
                }
            });
            if(response.ok){
                getContactsData();
                toast.success("Deleted Successfully");
            }else{
                toast.error("Not deleted");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getContactsData();
    }, [getContactsData]);

    return <>
        <section className="admin-contacts-section">
            <h1 className="admin-contact-data">𝑨𝒅𝒎𝒊𝒏 𝑪𝒐𝒏𝒕𝒂𝒄𝒕 𝑫𝒂𝒕𝒂</h1>

            <div className="container admin-users">
                {/* {contactData.map((curContactData, index) => {
                    const {studentName, email, message, _id} = curContactData;
                    return (
                        <div key={index}>
                            <p>{studentName}</p>
                            <p>{email}</p>
                            <p>{message}</p>
                            <button className="btn" onClick={() => deleteContactById(_id)}>Delete</button>
                        </div>
                    )
                })} */}

                <div className="container grid grid-three-cols">
                {contactData.map((curContactData, index) => {
                    const {studentName, email, message, _id} = curContactData;
                    return (
                        //     <div className="card card-body bg-light-info" key={index}>
                        //         <h5 className="card-title">{studentName}</h5>
                        //         <p className="card-text">{email}</p>
                        //         <p className="card-text">{message}</p>
                        //     <div>
                        //         <button className="btn" onClick={() => deleteContactById(_id)}>Delete</button>
                        //     </div>
                        // </div>

                        <div className="col-sm-6 col-lg-6 col-xl-3" key={index}>
                            <div className="card">
                            {/* <img alt="Card image cap" src="/images/logo.jpg" className="card-img"/> */}
                            <div className="p-4 card-body">
                                <p className="card-title"><b>Student Name:</b> {studentName}</p>
                                <div 	className="card-subtitle">
                                    <p><b>Student Email:</b> {email}</p>
                                </div>
                                <p className="mt-3 card-text"><b>Message:</b> {message}</p>
                                </div>
                                <div>
                                    <button className="btn" onClick={() => deleteContactById(_id)} style={{marginBottom: '10px', marginLeft: '10px'}}>Delete</button>
                                </div>
                            </div>
                        </div>

                    )
                })}
                </div>

            </div>

        </section>
    </>
};