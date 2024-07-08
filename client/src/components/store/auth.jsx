import {createContext, useEffect, useState, useCallback } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvided = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [campusInfosCard, setCampusInfos] = useState([]);
    const authorizationToken = `Bearer ${token}`;

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    };

    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    }

    let isLoggedIn = !!token;
    //console.log("isLoggedIn",isLoggedIn);

    //Jwt Authentication - to get currently loggedIn user data

    // const userAuthentication = async() => {
    //     try {
    //         const response = await fetch("http://localhost:5000/api/auth/user", {
    //             method: "GET",
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    //         if(response.ok){
    //             const data = await response.json();
    //             console.log("user data ",data.userData);
    //             setUser(data.userData);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching user data");
    //     }
    // };

    const userAuthentication = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await fetch("https://campus-info-server.onrender.com/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (response.ok) {
                const data = await response.json();
                //console.log("user data ", data.userData);
                setUser(data.userData);
                setIsLoading(false);
            }else{
                console.error("Error fetching user data");
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching user data");
        }
    }, [authorizationToken]);

    // to fetch the campus info from the database
    // const getCampusInfo = async() => {
    //     try {
    //         const response = await fetch("http://localhost:5000/api/data/campusInfo", {
    //             method: "GET",
    //         });
    //         if(response.ok){
    //             const data = await response.json();
    //             console.log(data.msg);
    //             setCampusInfos(data.msg);
    //         }
    //     } catch (error) {
    //         console.log(`Campus Info frontend error: ${error}`);
    //     }
    // };

    const getCampusInfo = useCallback(async () => {
        try {
            const response = await fetch("https://campus-info-server.onrender.com/api/data/campusInfo", {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                //console.log(data.msg);
                setCampusInfos(data.msg);
            }
        } catch (error) {
            console.log(`Campus Info frontend error: ${error}`);
        }
    }, []);

    useEffect(() => {
        getCampusInfo();
        userAuthentication();
    },[userAuthentication, getCampusInfo]);

    return (
    <AuthContext.Provider value={{isLoggedIn, storeTokenInLS, LogoutUser, user, campusInfosCard, authorizationToken, isLoading}}>
        {children}
    </AuthContext.Provider>
    );
};
