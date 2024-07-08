import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const CampusInfoUpdate = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        company_name: "",
        company_package: "",
        details: "",
    });
    // console.log("Data fron campusInfo update : ", data);
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setData({
            ...data,
            [name]: value,
        })
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        //console.log(user);
    try{
        const response = await fetch("https://campus-info-server.onrender.com", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(data),
        });
        const res_data = await response.json();
        console.log("res from server", res_data.message);
        
        if(response.ok){
            toast.success("Added Campus Info");
            localStorage.setItem("reloadPage", "true");
            navigate('/campusInfo');
        }else{
            toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        }
    }
    catch (error){
        console.log("Error adding Campus Info:", error);
        toast.error("An error occurred. Please try again.");
    }
};
    return (
        <>
            <section className="section-contact">
                <div className="contact-content container">
                    <h1 className="main-heading">Add Campus Info</h1>
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
