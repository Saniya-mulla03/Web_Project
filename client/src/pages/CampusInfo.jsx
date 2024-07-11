import { NavLink } from "react-router-dom";
import { useAuth } from "../components/store/useAuth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CampusInfo = () => {
    
    const {campusInfosCard, user, authorizationToken} = useAuth();
    const [userDeleted, setUserDeleted] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("reloadPage")) {
            localStorage.removeItem("reloadPage");
            window.location.reload();
        }
    }, []);
    
    //console.log("user details: ",user);
    const isAdminLoggedIn = user.isAdmin == "true";

    const deleteCampusInfo = async(id) => {
        try {
                const response = await fetch(`https://campus-info-server.onrender.com/api/admin/campusInfo/delete/${id}`, {
                    method: "DELETE",
                    headers:{
                        Authorization: authorizationToken
                    },
                });

                const data = await response.json();
                console.log(`users after delete: ${data}`);

                if(response.ok){
                    setUserDeleted(true);
                    localStorage.setItem("reloadPage", "true");
                    window.location.reload();
                }

        } catch (error) {
            console.log(error);      
        }
    }

    useEffect(() => {
        if (userDeleted) {
            toast.success("CampusInfo deleted Successfully");
            setUserDeleted(false); // Reset the state after showing toast
        }
    }, [userDeleted]);


    return (
        <section className="section-campusInfos">
            {isAdminLoggedIn && (
                <><p><NavLink to="/admin/campusInfo/add" className="add-campusInfo">Add Campus Info</NavLink></p></>
            )}
            <div className="container">
                <h1 className="main-heading">𝑪𝒂𝒎𝒑𝒖𝒔 𝑰𝒏𝒇𝒐</h1>
            </div>

            <div className="container grid grid-three-cols">
                {
                    campusInfosCard.map((curElem, index) => {
                        //const {price, description, provider, service} = curElem;
                        const {company_name, company_package, details} = curElem;
                        return (
                            // <div className="card" key={index}>
                            //     <div className="card-img">
                            //         <img src="/images/logo.jpg" alt="Our Campus Info" className="campusInfo-img"></img>
                            //     </div>

                            //     <div className="card-details">
                            //         <div className="grid grid-two-cols">
                            //             <p className="card-p">{provider}</p>
                            //             <p className="card-p">{price}</p>
                            //         </div>
                            //         <h2>{service}</h2>
                            //         <p>{description}</p>
                            //     </div>
                            // </div>

                            <div className="col-sm-6 col-lg-6 col-xl-3" key={index}><div className="card">
                            {/* <img alt="Card image cap" src="/images/logo.jpg" className="card-img"/> */}
                            <div className="p-4 card-body">
                                <p className="card-title"><b>Company Name:</b> {company_name}</p>
                                <div 	className="card-subtitle">
                                    <p><b>Company Package:</b> {company_package}</p>
                                </div>
                                <p className="mt-3 card-text"><b>Details:</b> {details}</p>
                                </div>
                                {isAdminLoggedIn &&
                                            <ul>
                                                <li><button onClick={() => deleteCampusInfo(curElem._id)} style={{ marginLeft: '20px', marginBottom: '10px' }}>Delete</button></li>
                                                <li><NavLink to={`/admin/campusInfo/${curElem._id}/edit`} style={{ marginLeft: '20px',marginBottom: '10px'}}>Edit</NavLink></li>
                                            </ul>
                                        }
                            </div>
                            </div>
                        );
                    })
                }
                
    </div>

        </section>
    );
}



