import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../components/store/useAuth"

export const About = () => {
    const {user} = useAuth();

    const {authorizationToken, isLoggedIn} = useAuth();
    const[users, setUsers] = useState([]);
    const getAllUsersData = useCallback(async() => {
        try {
                const response = await fetch("https://campus-info-server.onrender.com/api/admin/users", {
                    method: "GET",
                    headers:{
                        Authorization: authorizationToken
                    },
                });
                const data = await response.json();
                //console.log(`users ${data}`);
                setUsers(data);
                // setUsers(Array.isArray(data) ? data : []);

                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    console.error('Expected an array but got:', data);
                    setUsers([]); // Set to empty array to avoid further issues
                }
        } catch (error) {
            console.log(error);
        }
    },[authorizationToken]);
    useEffect(() => {
        getAllUsersData();
    }, [getAllUsersData]);


    const userLength = users.length;

    return <>
        <main>
                <section className="section-hero">
                    <div className="container grid grid-two-cols">
                        <div className="hero-content">
                            <p>Welcome, {user ? `${user.studentName} to our website` : ` to our website`}</p>
                            <h1>Why Choose Us?</h1>
                            <p>
                                Expertise: Our team consists of experienced developers who are passionate 
                                about staying up-to-date with the latest Student Information.
                                <br/>
                                <br/>
                                Customizaion: We understand that every business is unique. So we
                                create solutions that are tailored to your specific needs and goals.
                                <br/>
                                <br/>
                                Customer-Centric Approach: We prioritize your satisfaction and provide
                                support to address your concerns.
                                <br/>
                                <br/>
                                Realiability: Count on us to be there when you need us. We are committed to
                                ensuring your environment is reliable and available 24/7;
                            </p>
                            <div className="btn btn-group">
                                <a href="/contact">
                                    <br/>
                                    <button className="btn">connect now</button>
                                </a>
                                {/* <a href="/services">
                                    <button className="btn secondary-btn">learn more</button>
                                </a> */}
                            </div>
                        </div>
                        {/* hero images */}
                        <div className="hero-image">
                            <img src="/images/notify.jpg" alt="image" width="400" height="500"></img>
                        </div>
                    </div>
                </section>
            </main>

            <section className="section-analytics">
                <div className="container grid grid-three-cols">
                    <div className="div1">
                    <h2>{isLoggedIn ? userLength : "100+"}</h2>
                        <p>Registered Students</p>
                    </div>
                    {/* <div className="div2">
                        <h2>1</h2>
                        <p>Happy Users</p>
                    </div> */}
                    <div className="div3">
                        <h2>1</h2>
                        <p>Developers</p>
                    </div>
                    <div className="div4">
                        <h2>24/7</h2>
                        <p>service</p>
                    </div>
                </div>
            </section>

            <section className="section-hero">
                    <div className="container grid grid-two-cols">
                        {/* hero images */}
                        <div className="hero-image">
                            <img src="/images/campus1.jpg" alt="image" width="400" height="500"></img>
                        </div>
                        <div className="hero-content">
                            <p>We are happy to help you</p>
                            <h2>Get Started Today</h2>
                            <br/>
                            <p>
                            Stay informed with the latest announcements, news, and updates about everything happening on campus drive. From important initiatives to interview rounds, you will always know what is going on. Never miss an important date with timely updations. This way, you can stay organized and on top of your commitments.
                            </p>
                            <div className="btn btn-group">
                                <a href="/contact">
                                    <br/>
                                    <button className="btn">connect now</button>
                                </a>
                                {/* <a href="/services">
                                    <button className="btn secondary-btn">learn more</button>
                                </a> */}
                            </div>
                        </div>
                    </div>
            </section>
    </>
}
