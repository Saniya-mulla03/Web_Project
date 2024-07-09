import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../components/store/useAuth";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CampusInfoEdit = () => {
    
    const navigate = useNavigate();
    const {authorizationToken} = useAuth();
    const params = useParams();
    //console.log("params single user: ", params);
    const [data, setData] = useState({
        company_name: "",
        company_package: "",
        details: "",
    });

    const getCampusInfoData = useCallback(async() => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/campusInfo/${params.id}`, {
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
        getCampusInfoData();
    }, [getCampusInfoData]);

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
            const response = await fetch(`http://localhost:5000/api/admin/campusInfo/${params.id}/edit`, {
                    method: "PATCH",
                    headers:{
                        "Content-Type": "application/json",     
                        Authorization: authorizationToken,
                    },
                    body: JSON.stringify(data),
                }
            );
            if(response.ok){
                toast.success("Updated Successfully from CampusInfo");
                localStorage.setItem("reloadPage", "true");
                navigate('/campusInfo');
            }else{
                toast.error("Not Updated  from CampusInfo");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <section className="section-contact">
                <div className="contact-content container">
                    <h1 className="main-heading">Edit Campus Info</h1>
                </div>
                <div className="container grid grid-two-cols">
                    <section className="section-form">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="company_name">Company Name</label>
                                <input
                                    type="text"
                                    name="company_name"
                                    id="company_name"
                                    autoComplete="off"
                                    value={data.company_name}
                                    onChange={handleInput}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="company_package">Company Package</label>
                                <input
                                    type="text"
                                    name="company_package"
                                    id="company_package"
                                    autoComplete="off"
                                    value={data.company_package}
                                    onChange={handleInput}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="details">Details</label>
                                <input
                                    type="text"
                                    name="details"
                                    id="details"
                                    autoComplete="off"
                                    value={data.details}
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