import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../components/store/useAuth";

export const Home = () => {

    const {authorizationToken, isLoggedIn} = useAuth();
    const[users, setUsers] = useState([]);
    const getAllUsersData = useCallback(async() => {
        try {
                const response = await fetch("https://campus-info-server.onrender.com", {
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

    return (
        <>
            <main>
                <section className="section-hero">
                    <div className="container grid grid-two-cols">
                        <div className="hero-content">
                            {/* <p>This is the Best Website</p> */}
                            <h2>Welcome to Campus Info System</h2>
                            <br/>
                            <p>
                            Stay updated with the latest campus information through our efficient communication platform. Designed to keep students informed and engaged, this system ensures you never miss important updates and events. This platform ensures you are always in the loop, making it easier to manage your academic and extracurricular activities seamlessly. Stay connected, stay informed, and make the most of your campus experience.
                            </p>
                            <div className="btn btn-group">
                                <a href="/contact">
                                    <br/>
                                    <button className="btn">connect now</button>
                                </a>
                                {/* <a href="/campusInfo">
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
                        <h2>{userLength}</h2>
                        <p>Happy Users</p>
                    </div> */}
                    <div className="div3">
                        <h2>1</h2>
                        <p>Developer</p>
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
                                {/* <a href="/campusInfo">
                                    <button className="btn secondary-btn">learn more</button>
                                </a> */}
                            </div>
                        </div>
                    </div>
            </section>
        </>
    )
}
